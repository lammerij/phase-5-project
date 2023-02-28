import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import {format} from 'date-fns'
import { MDBInput, MDBBtn, MDBTextArea } from "mdb-react-ui-kit";

function NewCause() {
  const [user, setUser, causes, setCauses] = useContext(UserContext)
  const [cause, setCause] = useState({});
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [description, setDescription] = useState("");
  const [amountRaised, setAmountRaised] = useState();
  const [amountNeeded, setAmountNeeded] = useState();
  const [timeRemaining, setTimeRemaining] = useState(new Date());
  const [errors, setErrors] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  format(new Date(), 'dd/mm/yyyy')


  function handleNameSubmit(event) {
    setName(event.target.value);
  }
  function handleOrganizationSubmit(event) {
    setOrganization(event.target.value);
  }
  function handleDescriptionSubmit(event) {
    setDescription(event.target.value);
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
  function handleFileChange(event) {
    setSelectedImage(event.target.files[0]);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("organization", organization);
    formData.append("description", description);
    formData.append("amount_raised", amountRaised);
    formData.append("amount_needed", amountNeeded);
    formData.append("time_remaining", timeRemaining);
    formData.append("image", selectedImage);

    fetch("/causes", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        res.json().then((newCause) => {
          setCauses([...causes, newCause]);
          setName("");
          setOrganization("");
          setDescription("");
          setAmountRaised();
          setAmountNeeded(0);
          setSelectedImage(null);
          setTimeRemaining(new Date());
          navigate("/causes");
        });
      } else {
        res.json().then((error) => console.log(error.errors));
      }
    });

  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <MDBInput
          wrapperClass="mb-4"
          id="name"
          label="Name"
          value={name}
          onChange={handleNameSubmit}
        />
        <MDBInput
          wrapperClass="mb-4"
          id="organization"
          label="Organization"
          type="text"
          value={organization}
          onChange={handleOrganizationSubmit}
        />
        <MDBInput
          wrapperClass="mb-4"
          id="amountNeeded"
          label="$ Amount Needed"
          type="number"
          value={amountNeeded}
          onChange={handleAmountNeededSubmit}
        />
        <MDBInput
          wrapperClass="mb-4"
          id="amountRaised"
          label="$ Amount Raised"
          type="number"
          value={amountRaised}
          onChange={handleAmountRaisedSubmit}
        />
        <MDBInput
          wrapperClass="mb-4"
          id="timeRemaining"
          label="Fundraiser End Date"
          type="date"
          value={timeRemaining}
          onChange={handleTimeRemainingSubmit}
        />
        <MDBTextArea
          wrapperClass="mb-4"
          label="Description"
          id="description"
          rows={4}
          value={description}
          onChange={handleDescriptionSubmit}
        />
        <MDBInput
          wrapperClass="mb-4"
          textBefore='Upload'
          id="avatar"
          type="file"
          name="avatar"
          onChange={handleFileChange}
        />
        <MDBBtn type="submit">Submit</MDBBtn>
      </form>
    </>
  );
}

export default NewCause;
