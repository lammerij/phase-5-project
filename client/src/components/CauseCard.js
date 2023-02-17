import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBCardGroup
} from "mdb-react-ui-kit";

function CauseCard({ cause }) {
  const [user, setUser, causes, setCauses] = useContext(UserContext);
  // console.log(causes);
  const {
    id,
    name,
    description,
    organization,
    amount_raised,
    amount_needed,
    time_remaining,
    image,
  } = cause;

  const deletedCauseList = (deletedCause) => {
    const deletedCauses = causes.filter((cause) => cause.id !== deletedCause);
    setCauses(deletedCauses);
  };

  function handleDeleteCause() {
    fetch(`/causes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => {
      deletedCauseList(id);
    });
  }

  const viewTemplate = (
    <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
      <MDBCol>
        <MDBCard alignment="center" style={{ maxWidth: '500px' }}>
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardImage src={image} fluid alt="..." />
            <a>
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </a>
          </MDBRipple>
          <MDBCardBody>
            <MDBCardTitle>{name}</MDBCardTitle>
            <ul class="list-group list-group-light list-group-small">
              <li class="list-group-item px-4">{organization}</li>
              <li class="list-group-item px-4">
                Amount Needed: ${amount_needed}
              </li>
              <li class="list-group-item px-4">
                Amount Raised: ${amount_raised}
              </li>
              <li class="list-group-item px-4">
                Time Left To Donate: {time_remaining}
              </li>
            </ul>
            <MDBCardText>{description}</MDBCardText>
            <MDBBtn>Donations</MDBBtn>
          </MDBCardBody>
        </MDBCard>
        </MDBCol>
        </MDBRow>
  );

  const deleteTemplate = (

     <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
       <MDBCol>
        <MDBCard alignment="center" style={{ maxWidth: '500px' }}>
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardImage src={image} fluid alt="..." />
            <a>
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </a>
          </MDBRipple>
          <MDBCardBody>
            <MDBCardTitle>{name}</MDBCardTitle>
            <ul class="list-group list-group-light list-group-small">
              <li class="list-group-item px-4">
                Amount Needed: ${amount_needed}
              </li>
              <li class="list-group-item px-4">
                Amount Raised: ${amount_raised}
              </li>
              <li class="list-group-item px-4">
                Time Left To Donate: {time_remaining}
              </li>
            </ul>
            <MDBCardText>{description}</MDBCardText>
            <MDBBtn>Donations</MDBBtn>
            <MDBBtn onClick={handleDeleteCause}>End Cause</MDBBtn>
          </MDBCardBody>
        </MDBCard>
        </MDBCol>
        </MDBRow>
      
  );

  if (user.id === cause.organizer.id) return deleteTemplate;
  else {
    return viewTemplate;
  }
}

export default CauseCard;
