import React, { createContext, useContext, ReactNode } from "react";

interface Permission {
  subject: string;
  actions: string[];
}

interface PermissionsContextProps {
  permissions: Permission[];
  hasPermission: (subject: string, action: string) => boolean;
}

const PermissionsContext = createContext<PermissionsContextProps | undefined>(
  undefined
);

interface PermissionsProviderProps {
  permissions: Permission[];
  children: ReactNode;
}

export const PermissionsProvider: React.FC<PermissionsProviderProps> = ({
  permissions,
  children,
}) => {
  const hasPermission = (subject: string, action: string): boolean => {
    const permission = permissions.find((perm) => perm.subject === subject);
    return permission ? permission.actions.includes(action) : false;
  };

  return (
    <PermissionsContext.Provider value={{ permissions, hasPermission }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = (): PermissionsContextProps => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionsProvider");
  }
  return context;
};
