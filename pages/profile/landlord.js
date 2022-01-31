import Head from 'next/head'
import Details from "./components/Details";
import TableList from "./components/TableList";
import Taskbar from "./components/Taskbar";
import Header from "./components/Header";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../utility/Store";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import axios from "axios";
import * as ReactBootStrap from 'react-bootstrap'

export default function Home() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { dispatch, state } = useContext(Store);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    if (Cookies.get("userInfo")) {
      closeSnackbar();
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
          setLoading(true);
        });
        enqueueSnackbar("Data Retrieved", { variant: "success" });
      } catch (err) {
        enqueueSnackbar(err.response?.data?.message, { variant: "error" });
      }
    }
    else {
      enqueueSnackbar("Sign/Signup required", { varient: "success" });
    }
  };

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
        <title>Profile</title>
      </Head>
      {loading ? (
        <div className="Parent">
          <Taskbar />
          <div className="S_right">
            <Details details={state.userInfo} />
            <hr />
            <div className="S_rightBottom">
              <Header head="Available Sites" />
              <TableList
                tableclass="table-striped Stable"
                flat="Flat No."
                loc="Address"
                siteName="Site Name"
                available="Type"
                view="Site"
                allDetails={state.mySites}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="p_spinner">
          <ReactBootStrap.Spinner animation="border" />
        </div>
      )}
    </>


  );
}
