import React from "react";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import "./style.css";

function Userdetail() {
  const [show4, setShow4] = React.useState(false);
  const [userdata, setUserData] = React.useState([]);
  const [Role, setRole] = React.useState("Admin");
  const [id,setid]=React.useState()
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const navigate = useNavigate();

  function changeRole() {
    console.log(Role);

    fetch("http://localhost:8000/changeRole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _id: id,
        role:Role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
        handleClose4();
        getUserData();
        setRole("Admin")
      });
  }

  React.useEffect(() => {
    if (localStorage.getItem("Role") !== "Admin") {
      navigate("/Home");
    }
    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
  });

  const getUserData = () => {
    fetch("http://localhost:8000/getUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserData(data);
      });
  };

  React.useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="back bg-dark text-white">
      <div>
        <div>
        <h2 className="text-center mb-3">User Data 
        <Button variant="secondary" onClick={()=>{
            navigate('/Home')

        }} className="mx-5" > Back To Assets <Icon icon="ic:baseline-arrow-back" /> </Button>
        </h2>
        
        </div>
       
        
        <Table striped bordered hover  className="text-white">
          <thead>
            <tr className="text-white">
              <th>User Name</th>
              <th>Role</th>
              <th>Change Role</th>
            </tr>
          </thead>
          <tbody  className="text-white">
            {userdata.map((item, index) => (
              <>
                <tr key={index}>
                  <td  className="text-white">{item.username}</td>
                  <td  className="text-white">{item.Role}</td>
                  <td>
                    <Icon
                      icon="material-symbols:edit"
                      fontSize={28}
                      className="mx-2 text-primary"
                      onClick={() => {
                        setid(item._id)
                        
                        handleShow4();
                      }}
                    />
                    <Modal show={show4} onHide={handleClose4} >
                    <Modal.Header closeButton>
                      <Modal.Title>Change User Role</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-dark mx-1 font-weight-bold d-flex justify-content-start mt-2">
                          Role
                        </Form.Label>
                        <Form.Select onChange={(e) => setRole(e.target.value)}>
                          <option>Admin</option>
                          <option>User</option>
                        </Form.Select>
                      </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose4}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={()=>{changeRole(item._id)}}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  </td>
                  
                </tr>
              </>
            ))}
          </tbody>
        </Table>

       
      </div>
    </div>
  );
}

export default Userdetail;
