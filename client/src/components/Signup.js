import React from "react";
import { useState, useContext } from "react";
import { Button, Input, FormField, Label } from "../styles";

import { UserContext } from "../context/userContext";

function Signup() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useContext(UserContext);

  function handleUserNameChange(event) {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleDisplayName(event) {
    setDisplayName(event.target.value);
  }

  function handleTypeChange(event){
    setType(event.target.value)
  }


  function handleNewUserSubmit(event) {
    event.preventDefault();

    const newUser = {
      username,
      password,
      type,
      display_name: displayName,
    };

    console.log("newUser", newUser);

    fetch("/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newUser),
    }).then((res) => {
      if (res.ok) {
        res.json().then(setCurrentUser(newUser));
      } else {
        res.json().then((error) => setErrors(error.errors));
      }
    });

    setUsername("");
    setPassword("");
    setDisplayName("")
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
          value={displayName}
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
        <Button type="submit">{isLoading ? "Loading..." : "Sign Up"}</Button>
      </FormField>
      {/* <FormField>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField> */}
    </form>
  );
}

export default Signup;
