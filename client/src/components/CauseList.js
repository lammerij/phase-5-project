import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import CauseCard from "./CauseCard";
import { MDBRow } from "mdb-react-ui-kit";

function CauseList() {
  const [user, setUser, causes, setCauses, donations, setDonations] =
    useContext(UserContext);

  const displayCause = causes.map((cause, id) => {
    return <CauseCard cause={cause} key={id} />;
  });
  return (
    <MDBRow className="row-cols-1 row-cols-md-3 g-4">{displayCause}</MDBRow>
  );
}

export default CauseList;
