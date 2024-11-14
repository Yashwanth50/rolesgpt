import React, { ReactNode } from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import { PermissionsProvider } from "./Permission";

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <PermissionsProviderWrapper>{children}</PermissionsProviderWrapper>
    </AuthProvider>
  );
};

const PermissionsProviderWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { userDetails } = useAuth(); // Access userDetails from AuthContext
  const permissions = userDetails?.permissions || []; // Get permissions from userDetails

  return (
    <PermissionsProvider permissions={permissions}>
      {children}
    </PermissionsProvider>
  );
};

export default AppProviders;
