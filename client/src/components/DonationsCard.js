import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
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

  const displayList = cause.donors.map((donor) => {
    if (user.id === donor.id)
      return (
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
                      Organizer: @{cause.organizer.display_name}{" "}
                      <div>{displayAmount}</div> <span className="mx-2"></span>{" "}
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      );
  });

  const organizerDisplay = cause.donors.map((donor) => {
    if (user.id === cause.organizer.id)
      return (
        <div className="vh-100" style={{ backgroundColor: "#eee" }}>
          <MDBContainer className="container py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol md="12" xl="4">
                <MDBCard style={{ borderRadius: "15px" }}>
                  <MDBCardBody className="text-center">
                    <div className="mt-3 mb-4">
                      <MDBCardImage
                        src={donor.image}
                        className="rounded-circle"
                        fluid
                        style={{ width: "100px" }}
                      />
                    </div>
                    <MDBTypography tag="h4">{cause.name}</MDBTypography>
                    <MDBCardText className="text-muted mb-4">
                      Donor: @{donor.display_name} <div>{displayAmount}</div>{" "}
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      );
  });

  if (user.type === "Organizer") {
    return organizerDisplay;
  } else {
    return displayList;
  }
}

export default DonationsCard;
