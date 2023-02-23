import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { redirect } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBRipple,
  MDBBtn,
  MDBPopover,
  MDBPopoverBody,
  MDBPopoverHeader,
  MDBInput,
  MDBCardFooter,
} from "mdb-react-ui-kit";

function CauseCard({ cause }) {
  const [
    user,
    setUser,
    causes,
    setCauses,
    errors,
    setErrors,
    donations,
    setDonations,
  ] = useContext(UserContext);
  const [amount, setAmount] = useState();
  const [newDonation, setNewDonation] = useState({});

  // console.log(donations) returns undefined here but not in CauseList

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

  function updateAmountRaised(updatedTotal) {
    const updatedAmountRaised = causes.map((cause) => 
      cause.id !== updatedTotal.id ? cause : updatedTotal
    );
    setCauses(updatedAmountRaised);
  }

  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  function updateCauseTotal(newAmount) {

    const causeId = cause.id;

    const formData = new FormData();
    formData.append("amount_raised", newAmount);
    formData.append("cause_id", causeId);


    fetch(`/causes/${id}`, {
      method: "PATCH",
      body: formData,
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          updateAmountRaised(data);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
        console.log(errors);
      }
    });
  }

  function handleDonationSubmit(event) {
    event.preventDefault();

    const causeId = cause.id;

    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("cause_id", causeId);
    formData.append("donor_id", user.id);

    fetch("/donations", {
      method: "POST",
      body: formData,
    }).then((r) => {
      if (r.ok) {
        r.json().then((newAmount) => {
          updateCauseTotal(newAmount);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
        console.log(errors);
      }
    });
    setAmount();
    redirect("causes");
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
    <MDBCardGroup>
      <MDBCard alignment="center" style={{ maxWidth: "450px" }}>
        <MDBRipple
          rippleColor="light"
          rippleTag="div"
          className="bg-image hover-overlay"
        >
          <MDBCardImage src={image} fluid alt="..." position="top" />
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
        <MDBCardFooter></MDBCardFooter>
      </MDBCard>
    </MDBCardGroup>
  );

  const donorTemplate = (
    <MDBCardGroup>
      <MDBCard alignment="center" style={{ maxWidth: "450px" }}>
        <MDBRipple
          rippleColor="light"
          rippleTag="div"
          className="bg-image hover-overlay"
        >
          <MDBCardImage src={image} fluid alt="..." position="top" />
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
          <MDBPopover color="danger" btnChildren="Donate!" placement="right">
            <MDBPopoverHeader alignment="center">
              Make A Difference!
            </MDBPopoverHeader>
            <MDBPopoverBody>
              <form onSubmit={handleDonationSubmit}>
                <MDBInput
                  label="$Enter Amount..."
                  type="number"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={handleAmountChange}
                ></MDBInput>
                <MDBBtn rounded type="submit" alignment="center">
                  Give!
                </MDBBtn>
              </form>
            </MDBPopoverBody>
          </MDBPopover>
        </MDBCardBody>
        <MDBCardFooter></MDBCardFooter>
      </MDBCard>
    </MDBCardGroup>
  );

  const deleteTemplate = (
    <MDBCardGroup>
      <MDBCard alignment="center" style={{ maxWidth: "450px" }}>
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
        <MDBCardFooter></MDBCardFooter>
      </MDBCard>
    </MDBCardGroup>
  );

  if (user.id === cause.organizer.id) return deleteTemplate;
  else if (user.type === "Donor") {
    return donorTemplate;
  } else {
    return viewTemplate;
  }
}

export default CauseCard;
