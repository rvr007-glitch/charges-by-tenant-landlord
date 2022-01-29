import React from "react";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import LandingPageCard from "./LandingPageCard";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { Store } from "../../../utility/Store";

function AllotPopup(props) {

  const [show, setShow] = useState(false);
  const [selectedValue, setSelectedValue] = useState("email");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter()
  const { dispatch, state } = useContext(Store);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [details, setDetails ] = useState({
    email:"",
    siteId: router.query.id
  })
  function onValueChange(e) {
    setSelectedValue(e.target.value);
    console.log(e.target.value);
  }
  const getSite = async () => {
    if(Cookies.get("userInfo")){
      closeSnackbar();

      let config = {
        headers: {
          authorization: "b " + JSON.parse(Cookies.get("userInfo")).data.token
        },
      };
      
      try {
        
          await axios.get(`/api/site/${router.query.id}`, config).then((res) => {
            dispatch({
              type: "GET_PARTICULAR_SITE",
              payload: res.data,
            });
          });
          
          // enqueueSnackbar("Site Loaded", { variant: "success" });
      } catch (err) {
        console.log(err);
        enqueueSnackbar(err.response?.data?.message, { variant: "error" });
      }
    }else{
      enqueueSnackbar("Signup/signin Required", {varient: "success"});
    }
  };

  const onChange = (e) => {
    setDetails({...details, [e.target.name]: e.target.value})
  }

  const handleSubmit = async () => {
    console.log(details)
    let config = {
      headers: {
        authorization: "b " + JSON.parse(Cookies.get("userInfo")).data.token
      },
    };

    try {
      await axios.post("/api/site/reqtenant", details, config).then((res) => {
        console.log(res.data)
        enqueueSnackbar("Request Sent!", {variant: "success"})
      })
      handleClose();
      getSite();
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message, {variant: "failed"});
    }
  }

  const{email} = details

  console.log(props.siteStatus)
  return (
    <>
      <div className="p_btn3">
        {props.siteStatus == 0 ? <button onClick={handleShow} className="p_btn1 p_btr">
          Add New Tenant
        </button> : ""}
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
            {/* <div className="p_mradio">
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
            </div> */}
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
                  name="email"
                  onChange={(e) => onChange(e)}
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
            <Button variant="primary" onClick={handleSubmit}>
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
