import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import DonationsCard from "./DonationsCard";

function DonationsList() {
  const [user, setUser, causes, setCauses, donations, setDonations] =
    useContext(UserContext);


  const listOfCauses = causes.map((cause, id) => {
    return <DonationsCard key={id} cause={cause} />;
  });
  return <div>{listOfCauses}</div>;
}

export default DonationsList;
