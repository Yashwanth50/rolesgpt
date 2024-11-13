// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useAuth } from "./AuthContext";
// import { useNavigate } from "react-router-dom";
// import { toastMessage } from "../components/common/Constants";

// function fetchProfile(accessToken, apiUrl) {
//   const headers = {
//     Token: `${accessToken}`,
//   };
//   return axios.get(`${apiUrl}/auth/profile`, { headers });
// }

// function useProfile() {
//   const { hasAuthenticated, logout } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const apiUrl = process.env.REACT_APP_API_URL;
//   const navigate = useNavigate();

//   const handleTokenExpiration = useCallback(() => {
//     logout();
//     navigate("/");
//     toastMessage({
//       content: "Token expired",
//     });
//   }, [logout, navigate]);

//   const checkTokenExpiration = useCallback(() => {
//     if (hasAuthenticated) {
//       setLoading(true);
//       fetchProfile(hasAuthenticated, apiUrl)
//         .then((response) => {
//           setProfile(response.data);
//           setLoading(false);
//         })

//         .catch((err) => {
//           if (err.response?.status === 401) {
//             handleTokenExpiration();
//           }
//         });
//     }
//   }, [hasAuthenticated, apiUrl, handleTokenExpiration]);

//   useEffect(() => {
//     if (hasAuthenticated) {
//       checkTokenExpiration();

//       const intervalId = setInterval(checkTokenExpiration, 86400000);

//       return () => clearInterval(intervalId);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [apiUrl, hasAuthenticated]);

//   return {
//     profile,
//     loading,
//   };
// }

// export default useProfile;

// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useAuth } from "./AuthContext";
// import { useNavigate } from "react-router-dom";
// import { toastMessage } from "../components/common/Constants";
// import { jwtDecode } from "jwt-decode"; // Correct import for jwtDecode as a named export

// function fetchProfile(accessToken, apiUrl) {
//   const headers = {
//     Token: `${accessToken}`,
//   };
//   return axios.get(`${apiUrl}/auth/profile`, { headers });
// }

// function useProfile() {
//   const { hasAuthenticated, logout } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [tokenExpired, setTokenExpired] = useState(false); // Flag for token expiration

//   const apiUrl = process.env.REACT_APP_API_URL;
//   const navigate = useNavigate();

//   const handleTokenExpiration = useCallback(() => {
//     if (!tokenExpired) {
//       setTokenExpired(true); // Set flag to true
//       logout();
//       navigate("/");
//       toastMessage({
//         content: "Token expired",
//       });
//     }
//   }, [tokenExpired, logout, navigate]);

//   const checkTokenExpiration = useCallback(() => {
//     if (hasAuthenticated) {
//       try {
//         const decodedToken = jwtDecode(hasAuthenticated); // Corrected import for jwtDecode
//         const expirationTime = decodedToken.exp * 1000; // Token expiration time in milliseconds
//         const currentTime = Date.now();

//         // If token has expired
//         if (expirationTime <= currentTime) {
//           handleTokenExpiration();
//         } else {
//           // Set a timer to check when the token will expire
//           const timeoutId = setTimeout(() => {
//             handleTokenExpiration();
//           }, expirationTime - currentTime);

//           return () => clearTimeout(timeoutId);
//         }
//       } catch (error) {
//         console.error("Error decoding token:", error);
//         handleTokenExpiration();
//       }
//     }
//   }, [hasAuthenticated]);

//   const fetchUserProfile = useCallback(() => {
//     setLoading(true);
//     fetchProfile(hasAuthenticated, apiUrl)
//       .then((response) => {
//         setProfile(response.data);
//         setLoading(false);
//         setTokenExpired(false); // Reset token expiration flag after successful fetch
//       })
//       .catch((err) => {
//         if (err.response?.status === 401) {
//           handleTokenExpiration();
//         }
//         setLoading(false);
//       });
//   }, [hasAuthenticated, apiUrl, handleTokenExpiration]);

//   useEffect(() => {
//     if (hasAuthenticated) {
//       // Check token expiration on mount
//       checkTokenExpiration();
//       // Fetch user profile
//       fetchUserProfile();

//       // Optional: You can also refresh the profile every day
//       const intervalId = setInterval(fetchUserProfile, 86400000);

//       return () => clearInterval(intervalId);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [apiUrl, hasAuthenticated]);

//   return {
//     profile,
//     loading,
//   };
// }

// export default useProfile;

// import { useState, useEffect, useCallback, useRef } from "react";
// import axios from "axios";
// import { useAuth } from "./AuthContext";
// import { toastMessage } from "../components/common/Constants";
// import { jwtDecode } from "jwt-decode";

// function fetchProfile(accessToken, apiUrl) {
//   const headers = {
//     Token: `${accessToken}`,
//   };
//   return axios.get(`${apiUrl}/auth/profile`, { headers });
// }

// function useProfile() {
//   const { hasAuthenticated, logout } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [tokenExpired, setTokenExpired] = useState(false);
//   const [toastVisible, setToastVisible] = useState(false);
//   const hasShownToast = useRef(false);
//   const apiUrl = process.env.REACT_APP_API_URL;

//   const handleTokenExpiration = useCallback(() => {
//     if (!tokenExpired) {
//       setTokenExpired(true);
//       setToastVisible(true);

//       setTimeout(() => {
//         logout();
//         // navigate("/");
//       }, 3000);
//     }
//   }, [tokenExpired, logout]);

//   useEffect(() => {
//     if (toastVisible && !hasShownToast.current) {
//       toastMessage({
//         content: "Session expired. Please login again",
//         option: {
//           autoClose: 3000,
//         },
//       });
//       hasShownToast.current = true;

//       setTimeout(() => {
//         hasShownToast.current = false;
//       }, 3000);
//     }
//   }, [toastVisible]);

//   const checkTokenExpiration = useCallback(() => {
//     if (hasAuthenticated) {
//       try {
//         const decodedToken = jwtDecode(hasAuthenticated);
//         const expirationTime = decodedToken.exp * 1000;
//         const currentTime = Date.now();

//         if (expirationTime <= currentTime) {
//           handleTokenExpiration();
//         } else {
//           const timeoutId = setTimeout(() => {
//             handleTokenExpiration();
//           }, expirationTime - currentTime);

//           return () => clearTimeout(timeoutId);
//         }
//       } catch (error) {
//         handleTokenExpiration();
//       }
//     }
//   }, [hasAuthenticated, handleTokenExpiration]);

//   const fetchUserProfile = useCallback(() => {
//     setLoading(true);
//     fetchProfile(hasAuthenticated, apiUrl)
//       .then((response) => {
//         setProfile(response.data);
//         setLoading(false);
//         setTokenExpired(false);
//       })
//       .catch((err) => {
//         if (err.response?.status === 401) {
//           handleTokenExpiration();
//         }
//         setLoading(false);
//       });
//   }, [hasAuthenticated, apiUrl, handleTokenExpiration]);

//   useEffect(() => {
//     if (hasAuthenticated) {
//       checkTokenExpiration();
//       fetchUserProfile();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [apiUrl, hasAuthenticated]);

//   return {
//     profile,
//     loading,
//     toastVisible,
//     setToastVisible,
//   };
// }

// export default useProfile;

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

function fetchProfile(accessToken, apiUrl) {
  const headers = {
    Token: `${accessToken}`,
  };
  return axios.get(`${apiUrl}/auth/profile`, { headers });
}

function useProfile() {
  const { hasAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleTokenExpiration = useCallback(() => {
    if (!tokenExpired) {
      setTokenExpired(true);
    }
  }, [tokenExpired]);

  const checkTokenExpiration = useCallback(() => {
    if (hasAuthenticated) {
      try {
        const decodedToken = jwtDecode(hasAuthenticated);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();

        if (expirationTime <= currentTime) {
          handleTokenExpiration();
        } else {
          const timeoutId = setTimeout(() => {
            handleTokenExpiration();
          }, expirationTime - currentTime);

          return () => clearTimeout(timeoutId);
        }
      } catch (error) {
        handleTokenExpiration();
      }
    }
  }, [hasAuthenticated, handleTokenExpiration]);

  const fetchUserProfile = useCallback(() => {
    setLoading(true);
    fetchProfile(hasAuthenticated, apiUrl)
      .then((response) => {
        setProfile(response.data);
        setLoading(false);
        setTokenExpired(false);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          handleTokenExpiration();
        }
        setLoading(false);
      });
  }, [hasAuthenticated, apiUrl, handleTokenExpiration]);

  useEffect(() => {
    if (hasAuthenticated) {
      checkTokenExpiration();
      fetchUserProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl, hasAuthenticated]);

  return {
    profile,
    loading,
    tokenExpired,
    setTokenExpired,
  };
}

export default useProfile;
