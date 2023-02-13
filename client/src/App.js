import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context/userContext";
import Login from "./components/Login";
import NavBar from "./components/Navbar";
import DonorNavBar from "./components/DonorNavBar";
import Home from "./components/Home";
import CauseList from "./components/CauseList";

function App() {
  const [user, setUser] = useContext(UserContext);
  console.log(user)
  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login />;

  if (user.type === "Organizer") {
    return (
      <>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/causes" element={<CauseList />} />
        </Routes>
      </>
    );
  }

  if (user.type === "Donor") {
    return <DonorNavBar />;
  }
}

export default App;
