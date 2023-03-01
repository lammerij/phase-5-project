import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";
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
    <MDBNavbar light bgColor="dark">
      <MDBContainer fluid>
        <MDBNavbarBrand>
          <Link to="/">goFundit</Link>
        </MDBNavbarBrand>
        <Link to="/causes">Causes</Link>
        <Link to="/mydonations">My Donations</Link>
        <Link to="/profile">Profile</Link>
        <span>
          Hello {user.username}!
          <button className="sign-out" onClick={handleLogoutClick}>
            Logout
          </button>
        </span>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default DonorNavBar;
