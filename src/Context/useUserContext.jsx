import React, { createContext, useContext, useEffect, useState } from "react";

// Create the UserContext
const UserContext = createContext(null);

// Custom Hook to Use UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

// UserProvider Component
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  // Fetch initial data from the JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json"); // Path to your JSON file
        const data = await response.json();
        
        setUsers(data.users || []);
        setRoles(data.roles || []);
        setPermissions(data.permissions || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        roles,
        setRoles,
        permissions,
        setPermissions,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
