import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { MDBInput, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";

function EditProfile() {
  const [updated, setUpdated] = useState(false);

  //User Updates

  const [user, setUser] = useContext(UserContext);
  const [display_name, setDisplay_Name] = useState(user.display_name);
  // const [isLoading, setIsLoading] = useState(false);

  // console.log(displayName)

  const userId = user.id;

  const handleAvatarData = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleDisplayName = (event) => {
    setDisplay_Name(event.target.value);
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("user_id", userId);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    formData.append("display_name", display_name);
    fetch(`/updateprofile/${userId}`, {
      method: "PATCH",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        res.json().then((updatedProfile) => {
          setUser(updatedProfile);
          setUpdated((updated) => !updated);
        });
      } else {
        res.json().then((err) => console.log(err));
      }
    });
  };

  return (
    <>

    </>
  )
}

export default EditProfile;
