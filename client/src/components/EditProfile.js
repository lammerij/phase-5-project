import React  from "react";
import { useState } from "react";
import { UserContext } from "../context/userContext";
import { FormField, Button, Label, Input } from "../styles";


function EditProfile() {
  const [user, setUser, avatar, setAvatar] = useState(UserContext);
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState(user.userName);
  const [updated, setUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(user)

  const userId = user.id;

  const handleAvatarData = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleDisplayName = (event) => {
    setDisplayName(event.target.value);
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("user_id", userId);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    formData.append("username", username);
    formData.append("displayName", displayName);
    fetch(`users/${userId}`, {
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
      <form onSubmit={handleUpdateSubmit}>
        <FormField>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={handleUsername}
          />
        </FormField>
        <FormField>
          <Label htmlFor="displayName">Display Name</Label>
          <Input
            type="text"
            id="displayName"
            value={displayName}
            onChange={handleDisplayName}
          />
        </FormField>
        <FormField>
          <Label htmlFor="avatar">Avatar</Label>
          <Input
            type="file"
            accept='image/*'
            id="avatar"
            value={avatar}
            onChange={handleAvatarData}
          />
        </FormField>
        <FormField>
          <Button type="submit">{isLoading ? "Loading..." : "Save Changes"}</Button>
        </FormField>
        {/* <FormField>
          {errors.map((err) => (
            <Error key={err}>{err}</Error>
          ))}
        </FormField> */}
      </form>
    );
}

export default EditProfile;
