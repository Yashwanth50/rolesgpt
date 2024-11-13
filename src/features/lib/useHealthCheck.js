// HealthCheckContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const HealthCheckContext = createContext();

const HealthCheckProvider = ({ children }) => {
  const [isHealthCheck, setIsHealthCheck] = useState(false);
  const externalHealthCheck = process.env.REACT_APP_EXTERNAL_API_URL;

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await axios.get(
          `${externalHealthCheck}/api/health-check`
        );

        setIsHealthCheck(response.data.message === "API running at PORT:443");
      } catch (error) {
        setIsHealthCheck(false);
      }
    };
    checkHealth();
  }, [externalHealthCheck]);

  return (
    <HealthCheckContext.Provider value={isHealthCheck}>
      {children}
    </HealthCheckContext.Provider>
  );
};

const useHealthCheck = () => useContext(HealthCheckContext);
export { useHealthCheck, HealthCheckProvider };
