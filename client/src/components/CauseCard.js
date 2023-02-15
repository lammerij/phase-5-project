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
} from "mdb-react-ui-kit";

function CauseCard() {
  const [user, setUser, causes, setCauses] = useContext(UserContext);
  console.log(causes)

//  const {id, image, name, description, organization, amount_needed, amount_raised, time_remaining} = cause



  return (
    <div>
      <MDBContainer style={{ width: "20rem" }}>
        <MDBCard alignment="center">
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardImage fluid alt="..." />
            <a>
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </a>
          </MDBRipple>
          <MDBCardBody>
            <MDBCardTitle></MDBCardTitle>
            <MDBCardText>{}</MDBCardText>
            <MDBCardText>{}</MDBCardText>
            <MDBCardText>{}</MDBCardText>
            <MDBCardText>{user.display_name}</MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default CauseCard;
