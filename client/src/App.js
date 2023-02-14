import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context/userContext";
import Login from "./components/Login";
import NavBar from "./components/Navbar";
import DonorNavBar from "./components/DonorNavBar";
import Home from "./components/Home";
import CauseList from "./components/CauseList";
import NewCause from "./components/NewCause";
import EditProfile from "./components/UserProfile";

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
          <Route exact path= "/newcause" element={<NewCause/>}/>
          <Route exact path= "/editprofile" element={<EditProfile/>}/>
        </Routes>
      </>
    );
  }

  if (user.type === "Donor") {
    return <DonorNavBar />;
  }
}

export default App;
