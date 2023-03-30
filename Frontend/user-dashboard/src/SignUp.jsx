import React from "react";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./style.css";
function Signup() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [Role, setRole] = React.useState("Admin");


  const navigate = useNavigate();
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  function Register() {
    if (
      email.length === 0 ||
      username.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      alert("All fields are required");
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    }
    if (password.length < 6) {
      alert("password must be at least 6 characters");
    }
    if (password.length > 20) {
      alert("password must be less than 20 characters");
    } else {
      fetch("http://localhost:8000/Signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
          role: Role,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.message === "User already exists") {
            alert(
              "Please Select a Different email address This email is already in use"
            );
          }
        else{
          alert("User Registered Successfully");

          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setUsername("");
          navigate("/")
        }

        });
    }
  }
  function handleClick() {
    navigate("/");
  }
  return (
    <>
      <div className="row w-100">
        <div className="col-4 p-0"></div>

        <div className=" col-4 bg-dark mt-5 text-center p-5">
          <h1 className=" text-center text-white mb-4">Registeration Form</h1>
          <div>
            <InputGroup className="mb-4">
              <Form.Control
                type="text"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
          </div>
          <div>
            <InputGroup >
              <Form.Control

                type="email"
                placeholder="Email"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>

           
          </div>
          <div className="pb-4">
          <Form.Group className="mb-3" >
              <Form.Label className="text-white d-flex justify-content-start mt-2">Role</Form.Label>
              <Form.Select  onChange={(e)=>setRole(e.target.value)}>
                <option>Admin</option>
                <option>User</option>
              </Form.Select>
            </Form.Group>
          </div>
          
         
          <div>
            <InputGroup className="mb-4">
              <Form.Control
                type="password"
                placeholder="Password"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </div>
          <div>
            <InputGroup className="mb-4">
              <Form.Control
                type="password"
                placeholder=" Confirm Password"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputGroup>
          </div>
          <Button
            variant="secondary"
            className="text-white p-2 px-4 pr-4"
            onClick={Register}
          >
            Sign Up{" "}
          </Button>{" "}
          <Button
            variant="secondary"
            className="text-white p-2 px-4 pr-4 mx-2"
            onClick={handleClick}
          >
            Already a User?{" "}
          </Button>{" "}
        </div>

        <div className="col-4 p-0"></div>
      </div>
    </>
  );
}

export default Signup;
