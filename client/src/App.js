import { useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/userContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NavBar from "./components/Navbar";

function App() {
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login />;

  if (user.type === "Organizer") {
    return <NavBar />;
  }

  if (user.type === "Donor") {
    return <NavBar />;
  }
}

export default App;
