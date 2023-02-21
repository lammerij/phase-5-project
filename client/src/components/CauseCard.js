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
  MDBPopover,
  MDBPopoverBody,
  MDBPopoverHeader,
  MDBInput,
} from "mdb-react-ui-kit";
import { cardMediaClasses } from "@mui/material";

function CauseCard({ cause }) {
  const [
    user,
    setUser,
    causes,
    setCauses,
    errors,
    setErrors,
  ] = useContext(UserContext);
  const [amount, setAmount] = useState();
  const [donation, setDonation] = useState([]);

  // console.log(cause.amount_raised);
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

  // function updatedAmountRaised(updatedAmount){
  //   const updatedRaised = causes.map((cause) => cause.id ===
  // }

  const deletedCauseList = (deletedCause) => {
    const deletedCauses = causes.filter((cause) => cause.id !== deletedCause);
    setCauses(deletedCauses);
  };

  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  function handleDonationSubmit(event) {
    event.preventDefault();

    fetch("/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        cause_id: cause.id
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((newAmount) => {
          setDonation(newAmount);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
        console.log(errors);
      }
    });
    setAmount();
  }

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
    <MDBRow className="row-cols-1 row-cols-md-3 g-4">
      <MDBCol>
        <MDBCard alignment="center" style={{ maxWidth: "400px" }}>
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
            <ul className="list-group list-group-light list-group-small">
              <li className="list-group-item px-4">{organization}</li>
              <li className="list-group-item px-4">
                Amount Needed: ${amount_needed}
              </li>
              <li className="list-group-item px-4">
                Amount Raised: ${amount_raised}
              </li>
              <li className="list-group-item px-4">
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

  const donorTemplate = (
    <MDBRow className="row-cols-1 row-cols-md-3 g-4">
      <MDBCol>
        <MDBCard alignment="center" style={{ maxWidth: "500px" }}>
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
            <ul className="list-group list-group-light list-group-small">
              <li className="list-group-item px-4">{organization}</li>
              <li className="list-group-item px-4">
                Amount Needed: ${amount_needed}
              </li>
              <li class="list-group-item px-4">
                Amount Raised: ${amount_raised}
              </li>
              <li className="list-group-item px-4">
                Time Left To Donate: {time_remaining}
              </li>
            </ul>
            <MDBCardText>{description}</MDBCardText>
            <MDBPopover color="danger" btnChildren="Donate!" placement="bottom">
              <MDBPopoverHeader></MDBPopoverHeader>
              <MDBPopoverBody>
                <form onSubmit={handleDonationSubmit}>
                  <MDBInput
                    label="Enter Amount"
                    type="number"
                    id="amount"
                    name="amount"
                    value={amount}
                  ></MDBInput>
                  <MDBBtn onChange={handleAmountChange} alignment="center">
                    Give!
                  </MDBBtn>
                </form>
              </MDBPopoverBody>
            </MDBPopover>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );

  const deleteTemplate = (
    <MDBRow className="row-cols-1 row-cols-md-3 g-4">
      <MDBCol>
        <MDBCard alignment="center" style={{ maxWidth: "500px" }}>
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
            <ul className="list-group list-group-light list-group-small">
              <li className="list-group-item px-4">
                Amount Needed: ${amount_needed}
              </li>
              <li className="list-group-item px-4">
                Amount Raised: ${amount_raised}
              </li>
              <li className="list-group-item px-4">
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
  else if (user.type === "Donor") {
    return donorTemplate;
  } else {
    return viewTemplate;
  }
}

export default CauseCard;
