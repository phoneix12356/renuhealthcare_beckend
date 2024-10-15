import { createContext, useState } from "react";

// Create the context with a default value of `null`
export const UserContext = createContext(null);

// Capitalize the provider component name
export const UserProvider = ({ children }) => {
  // Initialize user state with an empty object or a more defined initial state if needed
  const [user, setUser] = useState(null); // It can be null to represent no user

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
