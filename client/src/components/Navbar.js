import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";
import { UserContext } from "../context/userContext";

function NavBar() {
  const [user, setUser] = useContext(UserContext);

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((response) => {
      if (response.ok) {
        setUser(null);
      }
    });
  }

  return (
    <Wrapper>
      <Logo>
        <Link to="/">goFundit</Link>
      </Logo>
      <Nav>
        <Button as={Link} to="/causes">
          Causes
        </Button>
        <Button as={Link} to="/newcause">
          New Cause
        </Button>
        <Button as={Link} to="/donations">
          Donations
        </Button>
        <Button as={Link} to="/updateprofile">
          Edit Profile
        </Button>
        <Button onClick={handleLogoutClick}>Logout</Button>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 3rem;
  color: black;
  margin: 0;
  line-height: 1;
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: relative;
  left: 8px;
`;

export default NavBar;
