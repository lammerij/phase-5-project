import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBListGroup,
  MDBListGroupItem,
  MDBBtn,
  MDBPopover,
  MDBPopoverBody,
  MDBPopoverHeader,
  MDBInput,
  MDBCol,
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
  const navigate = useNavigate();

  console.log(format(time_remaining, 'dd/mm/yyyy'))

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
    navigate("/causes");
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
    <MDBCol>
      <MDBCard alignment="center" style={{ maxWidth: "350px" }}>
        <MDBCardImage src={image} fluid alt="..." position="top" />
        <MDBCardBody>
          <MDBListGroup flush>
            {organization}
            <MDBListGroupItem>Amount Needed: ${amount_needed}</MDBListGroupItem>
            <MDBListGroupItem>Amount Raised: ${amount_raised}</MDBListGroupItem>
            <MDBListGroupItem>
              Cause End Date: {time_remaining}
            </MDBListGroupItem>
            <MDBListGroupItem>{description}</MDBListGroupItem>
          </MDBListGroup>
          <MDBBtn>Donations</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );

  const donorTemplate = (
    <MDBCol>
      <MDBCard alignment="center" style={{ maxWidth: "350px" }}>
        <MDBCardImage src={image} fluid alt="..." position="top" />

        <MDBCardBody>
          <MDBCardTitle>{name}</MDBCardTitle>
          <MDBListGroup flush>
            {organization}
            <MDBListGroupItem>Amount Needed: ${amount_needed}</MDBListGroupItem>
            <MDBListGroupItem>Amount Raised: ${amount_raised}</MDBListGroupItem>
            <MDBListGroupItem>
              Cause End Date: {time_remaining}
            </MDBListGroupItem>
            <MDBListGroupItem>{description}</MDBListGroupItem>
          </MDBListGroup>
          <MDBPopover color="danger" btnChildren="Donate!" placement="top">
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
      </MDBCard>
    </MDBCol>
  );

  const deleteTemplate = (
    <MDBCol>
      <MDBCard
        className="h-100"
        alignment="center"
        style={{ maxWidth: "350px" }}
      >
        <MDBCardImage src={image} fluid alt="..." />
        <MDBCardBody>
          <MDBListGroup flush>
            {organization}
            <MDBListGroupItem>Amount Needed: ${amount_needed}</MDBListGroupItem>
            <MDBListGroupItem>Amount Raised: ${amount_raised}</MDBListGroupItem>
            <MDBListGroupItem>
              Cause End Date: {time_remaining}
            </MDBListGroupItem>
            <MDBListGroupItem>{description}</MDBListGroupItem>
          </MDBListGroup>
          <MDBBtn>Donations</MDBBtn>
          <MDBBtn onClick={handleDeleteCause}>End Cause</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );

  if (user.id === cause.organizer.id) return deleteTemplate;
  else if (user.type === "Donor") {
    return donorTemplate;
  } else {
    return viewTemplate;
  }
}

export default CauseCard;
