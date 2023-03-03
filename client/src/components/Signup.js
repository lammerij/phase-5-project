import React from "react";
import { useState, useContext } from "react";
import { Button, Input, FormField, Label, Error } from "../styles";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function Signup() {
  const [username, setUsername] = useState("");
  const [display_name, setDisplay_Name] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext);

  function handleUserNameChange(event) {
    setUsername(event.target.value);
  }

  function handleFileChange(event) {
    setSelectedImage(event.target.files[0]);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleDisplayName(event) {
    setDisplay_Name(event.target.value);
  }

  function handleTypeChange(event) {
    setType(event.target.value);
  }

  function handleNewUserSubmit(event) {
    event.preventDefault();

    if (
      [username, type, display_name, password].some(
        (value) => value.trim() === ""
      )
    ) {
      alert("Please Fill Out Form, Thank You!");
      return null;
    }

    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);
    formData.append("display_name", display_name);
    formData.append("type", type);
    formData.append("image", selectedImage);

    fetch("/signup", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        res.json().then((newUser) => {
          setUser(newUser);
          setUsername("");
          setPassword("");
          setDisplay_Name("");
          setType("");
          setSelectedImage(null);
          navigate("/");
        });
      } else {
        res.json().then((error) => console.log(error.errors));
      }
    });
  }

  return (
    <form onSubmit={handleNewUserSubmit}>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={handleUserNameChange}
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <Label htmlFor="displayName">Display Name</Label>
        <Input
          type="text"
          id="displayName"
          value={display_name}
          onChange={handleDisplayName}
        />
      </FormField>
      <FormField>
        <Label htmlFor="type"></Label>
        <select onChange={handleTypeChange}>
          type="text" rows="1" id="type" value={type}
          <option value="" disabled>
            Choose a Role...
          </option>
          <option value="Organizer">Organizer</option>
          <option value="Donor">Donor</option>
        </select>
      </FormField>
      <FormField>
        <Label htmlFor="avatar">Upload a Profile Pic!</Label>
        <Input
          type="file"
          id="avatar"
          name="avatar"
          onChange={handleFileChange}
        />
      </FormField>
      <FormField>
        <Button type="submit">{isLoading ? "Loading..." : "Sign Up"}</Button>
      </FormField>
      <FormField>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
    </form>
  );
}

export default Signup;
