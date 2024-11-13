import React from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { hasAuthenticated } = useAuth();
  const location = useLocation();
  const { boardId, chatId } = useParams();
  if (hasAuthenticated) {
    return <>{<Outlet />}</>;
  } else {
    if (
      location.pathname.includes(`/new-chat/project/`) ||
      location.pathname.includes(`/chat/${chatId}/project/`) ||
      location.pathname.includes(`/project/`) ||
      location.pathname.includes(`/project-mobile/`)
    ) {
      return <Navigate to={`/share-project/${boardId}`} />;
    }
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
