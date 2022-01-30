import Head from 'next/head'
import Image from "next/image";
import DifferentCharges from "../../public/images/DifferentCharges.png";
import Header1 from "../components/Header1";
import Taskbar from "../components/Taskbar";
import HorizontalInput from "./components/HorizontalInput";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../utility/Store";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import * as ReactBootStrap from 'react-bootstrap'

import axios from "axios";

export default function GenerateCharges() {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { dispatch, state } = useContext(Store);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSite();
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
        await axios
          .get(`/api/site/${router.query.site_id}`, config)
          .then((res) => {
            dispatch({
              type: "GET_PARTICULAR_SITE",
              payload: res.data,
            });
            setLoading(true);
          });
        enqueueSnackbar("Site Loaded", { variant: "success" });
      } catch (err) {
        enqueueSnackbar(err.response?.data?.message, { variant: "error" });
      }
    } else {
      enqueueSnackbar("Signup/signin Required", { varient: "success" });
    }
  };

  var { charges_param } = state.siteDetail;
  const [description, setDescription] = useState(charges_param);

  var tempCharges = { rent: state.siteDetail?.rent };
  const updateCharges = () => {
    Object.keys(charges_param ? charges_param : {}).map((data, index) => {
      if (charges_param[data].fixed) {
        tempCharges[data] = charges_param[data].value;
      } else {
        tempCharges[data] = 0;
      }
      setDescription(tempCharges);
    });
  };

  useEffect(() => {
    updateCharges();
  }, [state.siteDetail?.charges_param]);

  const onChange = (e) => {
    setDescription({ ...description, [e.target.name]: e.target.value });
  };

  const generateSiteCharges = async () => {
    if (Cookies.get("userInfo")) {
      closeSnackbar();
      let config = {
        headers: {
          authorization: "b " + JSON.parse(Cookies.get("userInfo")).data.token,
        },
      };
      var details = {
        site_id: state.siteDetail?._id,
        tenant_id: state.siteDetail?.current_tenant[0]?._id,
        description,
      };
      console.log(details);
      try {
        await axios
          .post(
            "/api/charges",
            {
              site_id: state.siteDetail?._id,
              tenant_id: state.siteDetail?.current_tenant[0]?._id,
              description,
            },
            config
          )
          .then((res) => {
            dispatch({
              type: "CREATING_SITE",
              payload: res.data,
            });
            router.push(`/landing/particularSite?id=${res.data.data.site_id}`); //small change to trigger github PR
            enqueueSnackbar("Charges Created", { variant: "success" });
          });
      } catch (err) {
        enqueueSnackbar(err.response?.data?.message, { variant: "error" });
      }
    } else {
      enqueueSnackbar("Login/Signup Required", { varient: "success" });
    }
  };

  const submitHandler = () => {
    generateSiteCharges();
  };

  return (
    <>
      <Head>
        <title>Generate Charges</title>
      </Head>
      {loading ? (
        <div className="p_heading">
          <Taskbar />
          <div className="p_right">
            <Header1 header="GENERATE CHARGES OF DIFERENT ENTITIES" />
            <link
              rel="stylesheet"
              href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
              integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
              crossOrigin="anonymous"
            />
            <link
              rel="stylesheet"
              href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
              integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
              crossOrigin="anonymous"
            />

            <div className="charges">
              <HorizontalInput
                fieldName="Rent"
                isDisable={true}
                name="rent"
                defaultValue={state.siteDetail?.rent}
              />
              {charges_param
                ? Object.keys(charges_param).map((data, index) => {
                  var currentObj = charges_param[data];
                  if (currentObj.fixed) {
                    return (
                      <HorizontalInput
                        fieldName={data}
                        key={index}
                        isDisable={true}
                        name={data}
                        defaultValue={currentObj.value}
                      />
                    );
                  } else {
                    return (
                      <HorizontalInput
                        fieldName={data}
                        key={index}
                        isDisable={false}
                        name={data}
                        onChange={onChange}
                      />
                    );
                  }
                })
                : "No parameters to generate charges"}

              <div className="btn2">
                <button className="p_btn2" onClick={submitHandler}>
                  GENERATE
                </button>
              </div>
            </div>
          </div>

          <div className="dc">
            <Image src={DifferentCharges} alt="dc" />
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
