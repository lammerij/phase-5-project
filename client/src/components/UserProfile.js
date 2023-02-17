import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBContainer,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBInput,
  MDBModalBody,
  MDBModalFooter,
  MDBModalTitle,
} from "mdb-react-ui-kit";

function UserProfile() {
  const [user, setUser] = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [updatedDisplay_name, setUpdatedDisplay_name] = useState('')
  const [basicModal, setBasicModal] = useState(false);

  const {display_name} = user

  const toggleShow = () => setBasicModal(!basicModal);

  console.log(user);

  return (
    <div>
      <MDBContainer style={{ width: "20rem" }}>
        <MDBCard alignment="center">
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardImage src={user.image} fluid alt="..." />
            <a>
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </a>
          </MDBRipple>
          <MDBCardBody>
            <MDBCardTitle>{user.display_name}</MDBCardTitle>
            <MDBCardText>{user.type}</MDBCardText>
            <MDBBtn onClick={toggleShow}>Edit Profile</MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
              <MDBModalDialog>
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBBtn
                      className="btn-close"
                      color="none"
                      onClick={toggleShow}
                    ></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalTitle>Update Your Profile!</MDBModalTitle>
                  <MDBModalBody>
                    <form>
                      <label htmlFor="displayName">Change Your Display Name</label>
                      <MDBInput type="text" id="displayName" value={display_name}></MDBInput>
                      <label htmlFor="avatar">Change Your Profile Pic!</label>
                      <MDBInput type="file" id="avatar"></MDBInput>
                    </form>
                  </MDBModalBody>

                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={toggleShow}>
                      Close
                    </MDBBtn>
                    <MDBBtn>Save changes</MDBBtn>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default UserProfile;
