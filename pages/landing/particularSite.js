import Header from "../components/Header";
import RentersList from "./components/RentersList";
import Image from "next/image";
import ParticularSite from "../../public/images/ParticularSite.png";
import NameLabel from "../components/NameLabel";
import AllotPopup from "./components/AllotSite";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../utility/Store";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import axios from "axios";

export default function particular_site() {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { dispatch, state } = useContext(Store);
  useEffect(async () => {
    await getDetails();
  }, []);

  const getDetails = async () => {
    if(state.userInfo?.token){
      closeSnackbar();
      enqueueSnackbar("Signin", {varient: "success"});
      let config = {
        headers: {
          authorization: "b " + JSON.parse(Cookies.get("userInfo")).data.token,
        },
      };
      try {
        axios.post("/api/auth/users/login", {}, config).then((res) => {
          dispatch({
            type: "USER_INFO_FETCHING",
            payload: res.data?.data,
          });
        });
        
        enqueueSnackbar("Data Retrieved", { variant: "success" });
      } catch (err) {
        console.log(err);
        enqueueSnackbar(err.response?.data?.message, { variant: "error" });
      }
    }else{
      enqueueSnackbar("Login/Signup required", {varient: "success"});
    }
  };

  var siteId = [];
  siteId = state.userInfo?.site_list
  console.log(siteId?siteId[0]:null)

  useEffect(() => {
    getSite();
  }, [siteId]);
  

  const getSite = async () => {
    if(state.userInfo?.token){
      closeSnackbar();
      enqueueSnackbar("Signin", {varient: "success"});
      let config = {
        headers: {
          authorization: "b " + JSON.parse(Cookies.get("userInfo")).data.token,
        },
      };
      try {
        axios.post(`/api/site/${siteId?siteId[0]:null}`, {}, config).then((res) => {
          dispatch({
            type: "USER_INFO_FETCHING",
            payload: res.data?.data,
          });
        });
        
        enqueueSnackbar("Data Retrieved", { variant: "success" });
      } catch (err) {
        console.log(err);
        enqueueSnackbar(err.response?.data?.message, { variant: "error" });
      }
    }else{
      enqueueSnackbar("Signup", {varient: "success"});
    }
  };

  return (
    <>
      <div className="p_sitepage">
        <Header header="Site Status" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
          crossOrigin="anonymous"
        />
        <div className="p_site">
          <div className="p_sitecontainer">
            <div>
              <NameLabel label="Site Name" details={state.userInfo?.siteDetail?.alias_name} />
            </div>
            <div>
              <NameLabel label="Site Type" />
            </div>
            <div>
              <span className="p_label">Address:</span>
              <textarea
                className="p_textarea"
                id="story"
                name="story"
                rows="5"
                cols="33"
              >
                {state.siteDetail?.address?.first_line}
              </textarea>
            </div>
          </div>
          <div className="p_psite">
            <Image src={ParticularSite} alt="sub" />
          </div>
        </div>
        <div className="p_particular">
          <RentersList
            head="Renters Alloted"
            flat="Flat No."
            loc="Location"
            rentedFrom="RentedFrom"
            rentedTill="Rented Till"
            deposit="Deposit"
          />
        </div>
        {/* <div className='btn3'>
                    <button className='btn1 p_btr'>Add New Tenant</button>
                </div> */}
        <AllotPopup />
      </div>
    </>
  );
}
