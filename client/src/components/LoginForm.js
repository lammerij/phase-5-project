import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Error, Input, FormField, Label } from "../styles";
import {UserContext} from '../context/userContext'

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useContext(UserContext)

  function handleUserName(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      setIsLoading(false);
      if (response.ok) {
        response.json().then((user) => setCurrentUser(user));
        navigate('/')
      } else {
        response.json().then((error) => setErrors(error.errors));
      }
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={handleUserName}
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={handlePassword}
        />
      </FormField>
      <FormField>
        <Button variant="fill" color="primary" type="submit">
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </FormField>
      <FormField>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
    </form>
  );
}

export default LoginForm;