import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
  MDBContainer,
  MDBBtn,
} from "mdb-react-ui-kit";

function CauseCard({ cause }) {
  const [user, setUser, causes, setCauses] = useContext(UserContext);

  const {
    id,
    name,
    organization,
    amount_raised,
    amount_needed,
    time_remaining,
  } = cause;

  return (
    <div>
      <MDBContainer style={{ width: "20rem" }}>
        <MDBCard alignment="center">
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardImage src={cause.image} fluid alt="..." />
            <a>
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </a>
          </MDBRipple>
          <MDBCardBody>
            <h2>{cause.name}</h2>
            <MDBCardText>Organization: {cause.organization}</MDBCardText>
            <MDBCardText>Amount Needed: ${cause.amount_needed}</MDBCardText>
            <MDBCardText>Amount Raised: ${cause.amount_raised}</MDBCardText>
            <MDBCardText>
              Time Left To Donate: {cause.time_remaining}
            </MDBCardText>
            <MDBCardText>Organized By: {user.display_name}</MDBCardText>
            <MDBBtn>Donations</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default CauseCard;
