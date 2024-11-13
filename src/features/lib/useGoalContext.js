import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useFilesRoles } from "./useFilesRolesContext";
import { addToast } from "../lib/useToastContext";

function fetchGoals(accessToken, apiUrl) {
  const headers = {
    Token: `${accessToken}`,
  };
  return axios.get(`${apiUrl}/goals`, { headers });
}

function fetchUserSummaryGoals(accessToken, apiUrl, payload) {
  const headers = {
    Token: `${accessToken}`,
  };
  return axios.post(`${apiUrl}/goal-summary`, payload, { headers });
}


function useGoals() {
  const { hasAuthenticated } = useAuth();
  const { selectedDropdown } = useFilesRoles();
  const [Goals, setGoals] = useState([]);
  const [ userSummary, setUserSummary ] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchUserGoals = useCallback(() => {
    fetchGoals(hasAuthenticated, apiUrl)
      .then((response) => {
        setGoals(response.data);
      })
      .catch((err) => {
        console.log(err)
      });
  }, [hasAuthenticated, apiUrl]);


  useEffect(() => {
    if (hasAuthenticated) {
        fetchUserGoals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAuthenticated]);

  useEffect(() => {
    if (hasAuthenticated) {
      const payload = {
        tag: selectedDropdown
      };
      fetchUserSummaryGoals(hasAuthenticated, apiUrl, payload)
      .then((response) => {
        if (response.data.goal_summary !== '') {
          setUserSummary(`This is user ${selectedDropdown} goals - ${response.data.goal_summary} This is the user question, answer accordingly if question matches with his/her goals otherwisse give general answer-`);

        }
      })
      .catch((err) => {
        console.log(err)
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDropdown, hasAuthenticated])

  const gooalDelete = async (goal_id) => {
    try {
      console.log(goal_id)
      const response = await axios.delete(`http://localhost:8000/goals/${goal_id}`, {
        headers: {
          Token: `${hasAuthenticated}`,
        },
      });
      console.log('Goal deleted successfully:', response.data);
      addToast({
        type: "success",
        message: `Goal is deleted`,
      });
      fetchUserGoals();
    } catch (error) {
      addToast({
        type: "error",
        message: `Error in deleting goals`,
      });
      return;
    }
  }

  return {
    setGoals,
    Goals,
    fetchUserGoals,
    userSummary,
    gooalDelete,
  };
}

export default useGoals;