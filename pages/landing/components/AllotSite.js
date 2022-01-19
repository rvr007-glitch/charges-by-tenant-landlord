import React from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import LandingPageCard from "./LandingPageCard";

function AllotPopup() {
  const [show, setShow] = useState(false);
  const [selectedValue, setSelectedValue] = useState("email");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function onValueChange(e) {
    setSelectedValue(e.target.value);
    console.log(e.target.value);
  }

  return (
    <>
      <div className="p_btn3">
        <button onClick={handleShow} className="p_btn1 p_btr">
          Add New Tenant
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Allot Site</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p_allotlabel">
            {/* <span className="p_mlabel">Allot via</span> */}
            <p className="p_mlabel">Allot via</p>
          </div>
          <form>
            <div className="p_mradio">
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option1"
                value="email"
                onChange={(e) => onValueChange(e)}
              />
              <label className="btn btn-warning" htmlFor="option1">
                Email
              </label>
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option2"
                value="user"
                onChange={(e) => onValueChange(e)}
              />
              <label className="btn btn-warning" htmlFor="option2">
                User-Id
              </label>
            </div>
            {selectedValue == "email" ? (
              <div className="form-group">
                <label className="p_mlabel1" htmlFor="InputEmail">
                  Email Address of tenant
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="InputEmail"
                  placeholder="Email-Id"
                />
              </div>
            ) : (
              <div className="form-group">
                <label className="p_mlabel1" htmlFor="InputEmail">
                  User-Id of tenant
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="InputEmail"
                  placeholder="User-Id"
                />
              </div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <div className="p_mbtn">
            <Button variant="primary" onClick={handleClose}>
              Allot Tenant
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// render(<Example />);

export default AllotPopup;
