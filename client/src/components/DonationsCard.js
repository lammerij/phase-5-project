import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";

function DonationsCard({ cause }) {
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
  
 

  const displayAmount = cause.donations.map((donation) => {
    return (
      <div className="d-flex justify-content-between text-center mt-5 mb-2">
        <div>
          <MDBCardText className="mb-1 h5">${donation.amount}</MDBCardText>
          <MDBCardText className="small text-muted mb-0">
            Donation Amount
          </MDBCardText>
        </div>
      </div>
    );
  });

      const displayList = (
      <div className="vh-100" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="container py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="12" xl="4">
              <MDBCard style={{ borderRadius: "15px" }}>
                <MDBCardBody className="text-center">
                  <div className="mt-3 mb-4">
                    <MDBCardImage
                      src={cause.image}
                      className="rounded-circle"
                      fluid
                      style={{ width: "100px" }}
                    />
                  </div>
                  <MDBTypography tag="h4">{cause.name}</MDBTypography>
                  <MDBCardText className="text-muted mb-4">
                    @{cause.organizer.display_name}{" "}
                    <div>
                      <MDBCardImage
                        src={cause.organizer.image}
                        className="circle"
                        fluid
                        style={{ height: "50px" }}
                      />
                    </div>{" "}
                    <span className="mx-2"></span>{" "}
                  </MDBCardText>
                  {displayAmount}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>)
    
  

  return displayList;
}

export default DonationsCard;
