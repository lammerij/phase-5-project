import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBListGroup,
  MDBListGroupItem,
  MDBBtn,
  MDBCol,
  MDBModalTitle,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBInput,
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
  const [basicModal, setBasicModal] = useState(false);
  const [amount, setAmount] = useState();
  const navigate = useNavigate();
  const toggleShow = () => setBasicModal(!basicModal);

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

  const date =
    time_remaining.substring(5, 7) +
    "/" +
    time_remaining.substring(8, 10) +
    "/" +
    time_remaining.substring(0, 4);

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
        setErrors(errors);
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
          <MDBCardTitle>{name}</MDBCardTitle>
          <MDBListGroup flush>
            {organization}
            <MDBListGroupItem>Amount Needed: ${amount_needed}</MDBListGroupItem>
            <MDBListGroupItem>Amount Raised: ${amount_raised}</MDBListGroupItem>
            <MDBListGroupItem>Cause End Date: {date}</MDBListGroupItem>
            <MDBListGroupItem>{description}</MDBListGroupItem>
          </MDBListGroup>
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
            <MDBListGroupItem>Cause End Date: {date}</MDBListGroupItem>
            <MDBListGroupItem>{description}</MDBListGroupItem>
          </MDBListGroup>
          <MDBBtn onClick={toggleShow}>GIVE NOW!</MDBBtn>
          <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>MAKE A DIFFERENCE</MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleShow}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  {" "}
                  <form onSubmit={handleDonationSubmit}>
                    <MDBInput
                      label="$ Enter Amount..."
                      type="number"
                      id="amount"
                      name="amount"
                      value={amount}
                      onChange={handleAmountChange}
                    ></MDBInput>
                    <MDBBtn rounded type="submit" alignment="center">
                      Give!
                    </MDBBtn>
                  </form>{" "}
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={toggleShow}>
                    Close
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
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
          <MDBCardTitle>{name}</MDBCardTitle>
          <MDBListGroup flush>
            {organization}
            <MDBListGroupItem>Amount Needed: ${amount_needed}</MDBListGroupItem>
            <MDBListGroupItem>Amount Raised: ${amount_raised}</MDBListGroupItem>
            <MDBListGroupItem>Cause End Date: {date}</MDBListGroupItem>
            <MDBListGroupItem>{description}</MDBListGroupItem>
          </MDBListGroup>
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

/* <form onSubmit={handleDonationSubmit}>
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
</form> */
