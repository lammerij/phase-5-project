import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context/userContext";
import Login from "./components/Login";
import NavBar from "./components/Navbar";
import DonorNavBar from "./components/DonorNavBar";
import Home from "./components/Home";
import CauseList from "./components/CauseList";
import NewCause from "./components/NewCause";
import UserProfile from "./components/UserProfile";
import DonorHome from "./components/DonorHome";

function App() {
  const [user, setUser, causes, setCauses, donations, setDonations] = useContext(UserContext);



  if (!user) return <Login />;

  if (user.type === "Organizer") {
    return (
      <>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/causes" element={<CauseList />} />
          <Route exact path="/newcause" element={<NewCause />} />
          <Route exact path="/profile" element={<UserProfile />} />
        </Routes>
      </>
    );
  }

  if (user.type === "Donor") {
    return (
    <>
    <DonorNavBar />;
    <Routes>
      <Route exact path="/" element={<DonorHome/>}/>
      <Route exact path="/causes" element={<CauseList/>}/>
      <Route exact path="profile" element={<UserProfile/>}/>
    </Routes>
    </>
    )
  }
}

export default App;
