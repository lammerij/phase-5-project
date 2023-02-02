import { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/userContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";

function App() {
  const [currentUser, setCurrentUser] = useContext(UserContext);

  useEffect(() => {
    fetch("/me")
      .then((r) => r.json())
      .then((user) => setCurrentUser(user));
  }, []);

  if (!currentUser) {

    return (
     <Routes>
       <Route path="/signup" element={<Signup/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route/>
     </Routes>
    );
}
  }

export default App;
