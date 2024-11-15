import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const MsCallback = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const location = useLocation();
    const hasFetched = useRef(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        const fetchUser = async () => {
            const queryParams = new URLSearchParams(location.search);
            const code = queryParams.get("code");

            if (code) {
                try {
                    const response = await axios.post(
                        `${apiUrl}/ms/callback?code=${code}`
                    );
                    console.log(response?.data)
                    const access_token = response?.data?.access_token;
                    //   localStorage.setItem("accessToken", access_token);
                    //   login(access_token);
                    navigate('/');
                } catch (error) {
                    console.error("Error during authentication", error);
                }
            }
        };
        fetchUser();
    }, [apiUrl, location.search]);


    return (
        <div className="flex items-center justify-center min-h-screen">
            <img
                src="/images/logo.gif"
                alt="logo"
                className=" my-4"
                style={{ width: "140px", height: "140px" }}
            ></img>
        </div>
    );
};

export default MsCallback;
