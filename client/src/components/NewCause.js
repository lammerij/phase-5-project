import React from "react";
import { useState } from "react";
import { MDBInput, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";

function NewCause() {
  const [cause, setCause] = useState([]);
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfDonations, setNumberOfDonations] = useState();
  const [amountRaised, setAmountRaised] = useState();
  const [amountNeeded, setAmountNeeded] = useState();
  const [timeRemaining, setTimeRemaining] = useState(new Date());
  const [errors, setErrors] = useState([]);

  function handleNameSubmit(event) {
    setName(event.target.value);
  }
  function handleOrganizationSubmit(event) {
    setOrganization(event.target.value);
  }
  function handleDescriptionSubmit(event) {
    setDescription(event.target.value);
  }
  function handleNumberOfDonationsSubmit(event) {
    setNumberOfDonations(event.target.value);
  }
  function handleAmountRaisedSubmit(event) {
    setAmountRaised(event.target.value);
  }
  function handleAmountNeededSubmit(event) {
    setAmountNeeded(event.target.value);
  }
  function handleTimeRemainingSubmit(event) {
    setTimeRemaining(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCause = {
      name,
      organization,
      description,
      number_of_donations: numberOfDonations,
      amount_raised: amountRaised,
      amount_needed: amountNeeded,
      time_remaining: timeRemaining,
    };

    console.log(newCause)

    fetch("/causes", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newCause),
    }).then((res) => {
      if (res.ok) {
        res.json().then((newCause)=>{
            setCause(newCause)
        });
      } else {
        res.json().then((error) => setErrors(error.errors));
      }
    });

    setName("");
    setOrganization("");
    setDescription("");
    setNumberOfDonations("")
    setAmountRaised(0)
    setAmountNeeded(0)
    setTimeRemaining(new Date())

  };
  return (
    <>
      <h1>Start a New Cause!</h1>
      <form onSubmit={handleSubmit}>
        <MDBRow classname="g-1">
          <MDBCol>
            <MDBInput
              id="name"
              label="Name"
              value={name}
              onChange={handleNameSubmit}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              id="organization"
              label="Organization"
              type="text"
              value={organization}
              onChange={handleOrganizationSubmit}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              id="description"
              label="Description"
              type="text"
              value={description}
              onChange={handleDescriptionSubmit}
            />
          </MDBCol>{" "}
          <MDBCol>
            <MDBInput
              id="numberOfDonations"
              label="Number Of Donations"
              type="number"
              value={numberOfDonations}
              onChange={handleNumberOfDonationsSubmit}
            />
          </MDBCol>{" "}
          <MDBCol>
            <MDBInput
              id="amountNeeded"
              label="$ Amount Needed"
              type="number"
              value={amountNeeded}
              onChange={handleAmountNeededSubmit}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              id="amountRaised"
              label="$ Amount Raised"
              type="number"
              value={amountRaised}
              onChange={handleAmountRaisedSubmit}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              id="timeRemaining"
              type="date"
              onChange={handleTimeRemainingSubmit}
            />
          </MDBCol>
        </MDBRow>
        <MDBBtn type="submit">Submit</MDBBtn>
      </form>
    </>
  );
}

export default NewCause;
