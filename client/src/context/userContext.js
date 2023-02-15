import React, { createContext, useState } from "react";

//create the context object
const UserContext = createContext();

//create the context provider
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [causes, setCauses] = useState([]);

  const value = [user, setUser, causes, setCauses];

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

//export
export { UserContext, UserProvider };