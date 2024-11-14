import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

// Define Permission interface for permissions inside UserDetails
export interface Permission {
  subject: string;
  actions: string[];
}

// Define UserDetails interface with all fields
export interface UserDetails {
  username: string;
  userid: string;
  email: string;
  access_token: string;
  organization_name: string | null;
  job_name: string | null;
  role: string[];
  permissions: Permission[];
}

interface AuthContextProps {
  isAuthenticated: AuthToken | null;
  login: (accessToken: AuthToken) => void;
  logout: () => void;
  userDetails: UserDetails | null;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails | null>>;
  hasAuthenticated: string | undefined;
  googleAccessToken: string | null;
  setGoogleAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  googleRefreshToken: string | null;
  setGoogleRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
  isGoogleAuthorized: boolean;
  setIsGoogleAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  handleVisibilityChange: () => void;
}

interface AuthToken {
  access_token: string;
}

// Extend Window type to support Google OAuth methods
declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          revoke: (token: string, callback: () => void) => void;
        };
      };
    };
  }
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function revokeGoogleTokens(
  accessToken: string | null,
  refreshToken: string | null
): void {
  if (accessToken && window.google) {
    window.google.accounts.oauth2.revoke(accessToken, () => {
      console.log("Google access token revoked");
    });
  }

  if (refreshToken) {
    fetch(`https://oauth2.googleapis.com/revoke?token=${refreshToken}`, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    })
      .then(() => {
        console.log("Google refresh token revoked");
      })
      .catch((error) => {
        console.error("Error revoking refresh token:", error);
      });
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<AuthToken | null>(
    () => {
      const initialAccessToken = localStorage.getItem("accessToken");
      return initialAccessToken ? { access_token: initialAccessToken } : null;
    }
  );

  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(
    () => sessionStorage.getItem("googleAccessToken")
  );
  const [googleRefreshToken, setGoogleRefreshToken] = useState<string | null>(
    () => sessionStorage.getItem("googleRefreshToken")
  );
  const [isGoogleAuthorized, setIsGoogleAuthorized] = useState<boolean>(
    !!googleAccessToken
  );
  const hasAuthenticated = isAuthenticated?.access_token;
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const apiUrl = process.env.REACT_APP_API_URL || "";

  const login = (accessToken: AuthToken): void => {
    if (accessToken?.access_token) {
      localStorage.setItem("accessToken", accessToken.access_token);
      setIsAuthenticated(accessToken);
      sessionStorage.removeItem("chats");
    }
  };

  const logout = (): void => {
    revokeGoogleTokens(googleAccessToken, googleRefreshToken);

    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("googleAccessToken");
    sessionStorage.removeItem("googleRefreshToken");
    sessionStorage.removeItem("googleTokenExpiryTime");
    localStorage.removeItem("selectedBoardId");
    localStorage.removeItem("selectedBoardName");

    setGoogleAccessToken(null);
    setGoogleRefreshToken(null);
    setIsGoogleAuthorized(false);
    setUserDetails(null);
    setIsAuthenticated(null);
  };

  const fetchProfileToken = (accessToken: string, apiUrl: string) => {
    const headers = {
      Token: accessToken,
    };
    return axios.get(`${apiUrl}/auth/profile`, { headers });
  };

  const handleVisibilityChange = (): void => {
    if (document.visibilityState === "visible" && hasAuthenticated) {
      fetchProfileToken(hasAuthenticated, apiUrl)
        .then(() => {
          setIsLogin(false);
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            console.log(err.response);
            setIsLogin(true);
          }
        });
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userDetails,
        setUserDetails,
        hasAuthenticated,
        googleAccessToken,
        setGoogleAccessToken,
        googleRefreshToken,
        setGoogleRefreshToken,
        isGoogleAuthorized,
        setIsGoogleAuthorized,
        isLogin,
        setIsLogin,
        handleVisibilityChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
