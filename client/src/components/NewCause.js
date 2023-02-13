import React from "react";
import { useState } from "react";

function NewCause() {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfDonations, setNumberOfDonations] = useState(0);
  const [amountRaised, setAmountRaised] = useState(0);
  const [amountNeeded, setAmountNeeded] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0)

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


  const handleSubmit = ((event)=>{
      event.preventDefault()

      const newCause = {
          name,
          organization,
          description,
          number_of_donations: numberOfDonations,
          amount_raised: amountRaised,
          amount_needed: amountNeeded,

      }
    
      fetch('/causes')
  })
  return <div>NewCause</div>;
}

export default NewCause;
