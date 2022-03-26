import Head from "next/head";
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
import { useRouter } from "next/router";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";
import NotLoggedIn from "../withoutLogin/NotLoggedIn";
import ChargesList from "./components/ChargesList";
import Taskbar from "../profile/components/Taskbar";

export default function ParticularSiteComponent() {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { dispatch, state } = useContext(Store);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSite();
    getParticularSiteCharges();
  }, []);

  const getSite = async () => {
    if (Cookies.get("userInfo")) {
      closeSnackbar();

      let config = {
        headers: {
          authorization: "b " + JSON.parse(Cookies.get("userInfo")).data.token,
        },
      };

      try {
        await axios.get(`/api/site/${router.query.id}`, config).then((res) => {
          dispatch({
            type: "GET_PARTICULAR_SITE",
            payload: res.data,
          });
          setLoading(true);
        });
        // enqueueSnackbar("Site Loaded", { variant: "success" });
      } catch (err) {
        setLoading(true);
        enqueueSnackbar(err.response?.data?.message, { variant: "error" });
      }
    } else {
      setLoading(true);
      enqueueSnackbar("Signup/signin Required", { varient: "success" });
    }
  };

  const getParticularSiteCharges = async () => {
    if (Cookies.get("userInfo")) {
      closeSnackbar();
      let config = {
        headers: {
          authorization: "b " + JSON.parse(Cookies.get("userInfo")).data.token,
        },
      };
      try {
        await axios
          .post(
            "/api/charges/view",
            {
              siteId: router.query?.id,
            },
            config
          )
          .then((res) => {
            dispatch({
              type: "GET_PARTICULAR_SITE_CHARGES",
              payload: res.data,
            });
            enqueueSnackbar("Charges Retrived", { variant: "success" });
          });
      } catch (err) {
        enqueueSnackbar(err.response?.data?.message, { variant: "error" });
      }
    } else {
      enqueueSnackbar("Login/Signup Required", { varient: "success" });
    }
  };

  console.log(state.siteDetail);
  return (
    <>
      <div className="Parent">
        <Taskbar />
        <div className="S_right">
          <Head>
            <title>Particular Site</title>
          </Head>
          {loading ? (
            <div className="p_sitepage">
              <Header header="Site Details" />
              <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
                integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
                crossOrigin="anonymous"
              />
              <div className="p_site">
                <div className="p_sitecontainer">
                  <div>
                    <NameLabel
                      label="Site Name"
                      details={state.siteDetail?.alias_name}
                    />
                  </div>
                  <div>
                    <NameLabel
                      label="Site Type"
                      details={state.siteDetail?.Type}
                    />
                  </div>
                  <div>
                    <NameLabel
                      label="Site Address"
                      details={`${state.siteDetail?.address?.first_line}, ${state.siteDetail?.address?.landmark}, ${state.siteDetail?.address?.city}, ${state.siteDetail?.address?.state} P.O: ${state.siteDetail?.address?.pincode}`}
                    />
                  </div>
                </div>
                <div className="p_psite">
                  <Image src={ParticularSite} alt="sub" />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-lg-12 col-12">
                  <div className="p_particular">
                    {state.siteDetail &&
                    state.siteDetail.history &&
                    state.siteDetail.history.length > 0 ? (
                      <RentersList
                        head="Renters Alloted"
                        historyDetail={state.siteDetail?.history}
                        rent={state.siteDetail?.rent}
                        deposit={state.siteDetail?.deposit}
                        tenantsDetail={state.siteDetail?.tenantsDetails}
                        flat="Flat No."
                        loc="Location"
                        rentedFrom="RentedFrom"
                        rentedTill="Rented Till"
                        rents="Rent"
                      />
                    ) : (
                      "There no Tenant for this site"
                    )}
                  </div>
                  <AllotPopup
                    siteId={state.siteDetail?._id}
                    siteStatus={state.siteDetail?.status}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="p_spinner">
              <ReactBootStrap.Spinner animation="border" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
