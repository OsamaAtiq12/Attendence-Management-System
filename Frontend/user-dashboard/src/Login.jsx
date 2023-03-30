import React from "react";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./style.css";
function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();
  function handleClick() {
    navigate("/Register");
  }

  function Handle_login() {
    console.log(email, password);
    fetch("http://localhost:8000/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,

        password: password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        console.log();
        if (responseJson.message === "Invalid Credentials") {
          alert(responseJson.message);
        }
        if (responseJson.token) {
          localStorage.setItem("token", responseJson.token);
          localStorage.setItem("name", responseJson.user.username);
          localStorage.setItem("email", responseJson.user.Email);
          localStorage.setItem("Role", responseJson.user.Role);

          navigate("/Home")
        }
      });
  }
  return (
    <>
      <div className="row w-100 ">
        <div className="col-4 p-0"></div>

        <div className=" col-4 bg-dark mt-5 text-center p-5">
          <h1 className=" text-center text-white mb-4">Login Form</h1>

          <div>
            <InputGroup className="mb-4">
              <Form.Control
                type="email"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
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

          <div class="btn-align">
            <Button
              variant="secondary"
              className="text-white p-2 px-4 pr-4 mt-3"
              onClick={Handle_login}
            >
              Login{" "}
             
              
            </Button>{" "}
            <Button
              variant="secondary"
              className="text-white p-2 px-4 pr-4 mx-2 mt-3"
              onClick={handleClick}
            >
              New to Site?
            </Button>{" "}
          </div>
        </div>

        <div className="col-4 p-0"></div>
      </div>
    </>
  );
}

export default Login;
