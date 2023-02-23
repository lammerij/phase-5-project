import React, { createContext, useState, useEffect } from "react";

//create the context object
const UserContext = createContext();

//create the context provider
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [causes, setCauses] = useState([])
  const [donations, setDonations] = useState([])

  const value = [user, setUser, causes, setCauses, donations, setDonations]

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/causes").then((response) => {
      if (response.ok) {
        response.json().then((causes) => setCauses(causes));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/donations").then((response) => {
      if (response.ok) {
        response.json().then((donations) => setDonations(donations));
      }
    });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

//export
export { UserContext, UserProvider };