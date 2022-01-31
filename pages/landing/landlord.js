import Head from 'next/head'
import Identity from "./components/Identity";
import LandLordSite from "./components/LandLordSite";
import LandLordReq from "./components/LandLordReq";
import { Store } from "../../utility/Store"
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import axios from "axios";
import * as ReactBootStrap from 'react-bootstrap'

const Landlord = () => {
  const [siteState, setStateSite] = useState(true);
  const [reqState, setStateReq] = useState(false);
  const [loading, setLoading] = useState(false);

  const onHandle1 = () => {
    if (reqState) {
      setStateSite(true);
      setStateReq(false);
    }
  };

  const onHandle2 = () => {
    if (siteState) {
      setStateSite(false);
      setStateReq(true);
    }
  };


  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { dispatch, state } = useContext(Store);

  //after loading the user We will load all the sites
  useEffect(async () => {
    await getAllSite();
  }, []);

  const getAllSite = async () => {
    if (Cookies.get("userInfo")) {
      closeSnackbar();

      let config = {
        headers: {
          authorization: "b " + JSON.parse(Cookies.get("userInfo")).data.token
        },
      };

      try {

        await axios.get(`/api/site/getAllSites`, config).then((res) => {
          dispatch({
            type: "GET_ALL_SITES",
            payload: res.data,
          });
          setLoading(true);
        });

        // enqueueSnackbar("Site Loaded", { variant: "success" });
      } catch (err) {
        console.log(err);
        enqueueSnackbar(err.response?.data?.message, { variant: "error" });
      }
    } else {
      enqueueSnackbar("Signup/signin Required", { varient: "success" });
    }
  }


  return (
    <>
      <Head>
        <title>Created Sites</title>
    </Head>
      {loading ? (
        <div className="S_tenant">
          <link
            rel="stylesheet"
            href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
            integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
            crossOrigin="anonymous"
          />
          <Identity onShow1={onHandle1} onShow2={onHandle2} userDetails={state.userInfo} />
          <div className="S_right S_background_image">
            {siteState ? <LandLordSite siteDetails={state.mySites} userDetails={state.userInfo} /> : <LandLordReq siteDetails={state.mySites} userDetails={state.userInfo} />}
          </div>
        </div>
      ) : (
        <div className="p_spinner">
          <ReactBootStrap.Spinner animation="border" />
        </div>
      )}
    </>

  );
};

export default Landlord;
