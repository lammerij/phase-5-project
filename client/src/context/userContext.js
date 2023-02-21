import React, { createContext, useState } from "react";

//create the context object
const UserContext = createContext();

//create the context provider
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [causes, setCauses] = useState([])
  const [donations, setDonations] = useState([])

  const value = [user, setUser, causes, setCauses, donations, setDonations]

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

//export
export { UserContext, UserProvider };