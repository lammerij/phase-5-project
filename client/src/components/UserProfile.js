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
  const [user, setUser, errors, setErrors, causes, setCauses] =
    useContext(UserContext);
  const [selectedFile, setSelectedImage] = useState(null);
  const [basicModal, setBasicModal] = useState(false);

  const { display_name, type, image } = user;

  const toggleShow = () => setBasicModal(!basicModal);

  function handleFileChange(event) {
    setSelectedImage(event.target.files[0]);
  }

  // console.log(user);

  function handleEditProfileSubmit(event) {
    event.preventDefault();

    const userId = user.id;

    const formData = new FormData();

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    fetch(`/users/${userId}`, {
      method: "PATCH",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        res.json().then((updatedUser) => {
          setUser(updatedUser);
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
        console.log(errors);
      }
    });
  }

  return (
    <div>
      <MDBContainer style={{ width: "20rem" }}>
        <MDBCard alignment="center">
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardImage src={image} fluid alt="..." />
            <a>
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </a>
          </MDBRipple>
          <MDBCardBody>
            <MDBCardTitle>{display_name}</MDBCardTitle>
            <MDBCardText>{type}</MDBCardText>
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
                  <MDBModalTitle>Update Your Profile Pic!</MDBModalTitle>
                  <MDBModalBody>
                    <form onSubmit={handleEditProfileSubmit}>
                    <label htmlFor="avatar"></label>
                      <MDBInput type="file" id="avatar" name="avatar" onChange={handleFileChange}></MDBInput>
                      <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={toggleShow}>
                          Close
                        </MDBBtn>
                        <MDBBtn>Save changes</MDBBtn>
                      </MDBModalFooter>
                    </form>
                  </MDBModalBody>
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
