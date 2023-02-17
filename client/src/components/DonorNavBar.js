import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../css/navBar.css";
import { UserContext } from "../context/userContext";
function DonorNavBar() {
  const [user, setUser] = useContext(UserContext);

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((response) => {
      if (response.ok) {
        setUser(null);
      }
    });
  }

  return (
    <div className="nav">
      <Link to="/">goFundit</Link>
      <Link to="/causes">Causes</Link>
      <Link to="/mydonations">My Donations</Link>
      <Link to="/profile">Profile</Link>
      <span>
        Hello {user.username}!
        <button className="sign-out" onClick={handleLogoutClick}>
          Logout
        </button>
      </span>
    </div>
  );
}




export default DonorNavBar;
