import Head from "next/head";
import Details from "./components/Details";
import TableList from "./components/TableList";
import Taskbar from "./components/Taskbar";
import Header from "./components/Header";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../utility/Store";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import axios from "axios";
import Link from "next/link";
import * as ReactBootStrap from "react-bootstrap";
import NotLoggedIn from "../withoutLogin/NotLoggedIn";

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
        });
        enqueueSnackbar("Data Retrieved", { variant: "success" });
        setLoading(true);
      } catch (err) {
        setLoading(true);
        enqueueSnackbar(err.response?.data?.message, { variant: "error" });
      }
    } else {
      setLoading(true);
      // enqueueSnackbar("Sign/Signup required", { varient: "success" });
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
          authorization: "b " + JSON.parse(Cookies.get("userInfo")).data.token,
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
        if (
          err.response &&
          err.response.data &&
          err.response.data.message == "No site Found"
        ) {
          // Eat a 5* and do nothing
        } else {
          enqueueSnackbar(err.response?.data?.message, { variant: "error" });
        }
      }
    } else {
      // enqueueSnackbar("Signup/signin Required", { varient: "success" });
    }
  };

  return (
    <>
      {!Cookies.get("userInfo") ? (
        <section>
          <NotLoggedIn />
        </section>
      ) : (
        <section>
          <Head>
            <title>Profile</title>
          </Head>
          {loading ? (
            <div className="Parent">
              <Taskbar />
              <div className="S_right">
                <Details details={state.userInfo} />
                <hr />
                {console.log(state.mySites)}
                <div className="S_rightBottom">
                  <Header head="Your Sites" />
                  {state && state.mySites && state.mySites.length == 0 ? (
                    <strong className="shadow-lg p-5 mt-5">
                      No sites created,{" "}
                      <Link href="/createSite/CreateSiteForm">Create</Link> new
                      sites here.
                    </strong>
                  ) : (
                    <TableList
                      tableclass="table-striped Stable"
                      flat="Flat No."
                      loc="Address"
                      siteName="Site Name"
                      available="Type"
                      view="Site"
                      allDetails={state.mySites}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p_spinner">
              <ReactBootStrap.Spinner animation="border" />
            </div>
          )}
        </section>
      )}
    </>
  );
}
