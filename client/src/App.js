import { useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/userContext";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [currentUser, setCurrentUser] = useContext(UserContext);

  useEffect(() => {
    fetch("/me")
      .then((r) => r.json())
      .then((user) => setCurrentUser(user));
  }, [setCurrentUser]);



  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );

}

export default App;
