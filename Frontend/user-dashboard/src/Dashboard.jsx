import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import "./style.css";

function Dashboard() {
  const [editproduct, setEditproduct] = React.useState();
  const [editprice, setEditprice] = React.useState();
  const [editquantity, setEditquantity] = React.useState();
  

  const [data, setData] = React.useState([]);
  const [Product, setProduct] = React.useState();
  const [Price, setPrice] = React.useState();
  const [Quantity, setQuantity] = React.useState();
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [show3, setShow3] = React.useState(false);

 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => {
    setEditprice("");
    setEditproduct("");
    setEditquantity("");
    setShow2(false);
  };
  const handleShow2 = () => setShow2(true);

  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const navigate = useNavigate();
  React.useEffect(() => {
    getData()
  }, []);
  React.useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
  });

  const getData = () => {
    fetch("http://localhost:8000/getProducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };

 

  function add() {
    if (Price < 0) {
      alert("Price cannot be less than 0");
    }

    if (Quantity < 0) {
      alert("Quantity cannot be less than 0");
    } else {
      fetch("http://localhost:8000/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Product_name: Product,
          Product_price: Price,
          Product_Quantity: Quantity,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data === "Something went wrong") {
            alert("Feilds are empty");
          }
          getData();
          handleClose3();
        });
    }
  }
  function edit(id) {
    if (editprice < 0) {
      alert("Price cannot be less than 0");
    }

    if (editquantity < 0) {
      alert("Quantity cannot be less than 0");
    } else {
      fetch("http://localhost:8000/UpdateProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _id: id,
          Product_name: editproduct,
          Product_price: editprice,
          Product_Quantity: editquantity,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data === "Something went wrong") {
            alert("Feilds are empty");
          }
          handleClose2();
          getData();
        });
    }
  }

  function Delete(id) {
    fetch("http://localhost:8000/DeleteProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount === 1) {
          handleShow();
          setTimeout(() => {
            handleClose();
          }, 1000);
          getData();
        }
      });
  }

  return (
    <>
    <div className="bg-dark back" >

   
      <div className="d-flex justify-content-center ">
        <h1 className="text-center text-white">Dashboard</h1>
      </div>

      


      <div className="mt-5">
        <h2 className="text-center d-flex justify-content-center text-white mb-2 ">
          {" "}
          Assets Data
          <Button
              variant="secondary"
              className="text-white mx-3"
              onClick={
                () => {
                  navigate("/");
                  localStorage.clear();

                  
                }
              }

              
            >
              Logout{" "}
             
              
            </Button>{" "}

          {localStorage.getItem("Role") === "Admin" ?
          <>
          <Button
            variant="success"
            size="sm"
            className="mx-2"
            onClick={() => {
              handleShow3();
            }}
          >
            Add Product{" "}
            <Icon icon="material-symbols:add" className="text-white" />
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="mx-2"
            onClick={() => {
              navigate('/Userdetail')
            }}
          >
            User Detail{" "}
            <Icon icon="mdi:user"  className="text-white"  />
          </Button>
          </>
          
          : ""}
         
        </h2>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th> Prouct Name</th>
              <th>Price</th>
              <th>Quantity</th>
              {localStorage.getItem("Role") === "Admin" ? <th>Actions</th> : ""}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.Product_Name}</td>
                <td>{item.Price}$</td>
                <td>{item.Quantity} pcs</td>
                {localStorage.getItem("Role") === "Admin" ? (
                  <td>
                    <Icon
                      icon="material-symbols:delete-rounded"
                      className="text-danger"
                      fontSize={28}
                      onClick={() => {
                        Delete(item._id);
                      }}
                    />
                    <Icon
                      icon="material-symbols:edit"
                      fontSize={28}
                      className="mx-2 text-primary"
                      onClick={() => {
                        handleShow2();
                      }}
                    />
                  </td>
                ) : (
                  ""
                )}

                {/* edit Modal Starts From here */}
                <Modal show={show2} onHide={handleClose2}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-default">
                        Product Name
                      </InputGroup.Text>
                      <Form.Control
                        defaultValue={item.Product_Name}
                        onChange={(e) => {
                          setEditproduct(e.target.value);
                        }}
                        aria-label="Product Name"
                        aria-describedby="inputGroup-sizing-default"
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-default">
                        Price
                      </InputGroup.Text>
                      <Form.Control
                        aria-label="Price"
                        defaultValue={item.Price}
                        onChange={(e) => {
                          setEditprice(e.target.value);
                        }}
                        aria-describedby="inputGroup-sizing-default"
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-default">
                        Quantity
                      </InputGroup.Text>
                      <Form.Control
                        defaultValue={item.Quantity}
                        aria-label="Quantity"
                        onChange={(e) => {
                          setEditquantity(e.target.value);
                        }}
                        aria-describedby="inputGroup-sizing-default"
                      />
                    </InputGroup>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        edit(item._id);
                      }}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </tr>
            ))}
          </tbody>
        </Table>

      

     {/* Delete Message Modal Starts From Here */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Product SuccessFully Deleted</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
        {/* Delete Message Modal Ends From Here  */}




        {/* add Modal Starts From here */}

        <Modal show={show3} onHide={handleClose3}>
          <Modal.Header closeButton>
            <Modal.Title>Add</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Product Name
              </InputGroup.Text>
              <Form.Control
                aria-label="Product Name"
                aria-describedby="inputGroup-sizing-default"
                onChange={(e) => setProduct(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Price
              </InputGroup.Text>
              <Form.Control
                aria-label="Price"
                aria-describedby="inputGroup-sizing-default"
                onChange={(e) => setPrice(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Quantity
              </InputGroup.Text>
              <Form.Control
                aria-label="Quantity"
                onChange={(e) => setQuantity(e.target.value)}
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose3}>
              Cancel
            </Button>
            <Button variant="primary" onClick={add}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>


        {/* add Modal Ends From Here  */}
      </div>
      </div>
    </>
  );
}

export default Dashboard;
