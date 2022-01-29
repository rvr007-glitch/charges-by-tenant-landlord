import Image from "next/image";
import DifferentCharges from "../../public/images/DifferentCharges.png";
import Header1 from "../components/Header1";
import Taskbar from "../components/Taskbar";
import NameLabel from "../components/NameLabel";
import HorizontalInput from "./components/HorizontalInput";
import getParticularSite from "../routeFunction/getParticularSite";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../utility/Store";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

import axios from "axios";

export default function generateCharges() {
  const router = useRouter();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { dispatch, state } = useContext(Store);

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
          });

        // enqueueSnackbar("Site Loaded", { variant: "success" });
      } catch (err) {
        enqueueSnackbar(err.response?.data?.message, { variant: "error" });
      }
    } else {
      enqueueSnackbar("Signup/signin Required", { varient: "success" });
    }
  };

  var { charges_param } = state.siteDetail;
  // var keysData = Object.keys(charges_param ? charges_param : {});
  const [description, setDescription] = useState(charges_param);

  var tempCharges = {};
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

  return (
    <>
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
            {/* <NameLabel label="Electricity" />
            <NameLabel label="Water" />
            <NameLabel label="Gas Connection" />
            <NameLabel label="Others" /> */}
            {/* {charges_params_keys.length
                  ? charges_params_keys.map((data, index) => {
                      return (
                        <CreateBottomRadioPart
                          value={data}
                          name={data}
                          pushCharges={pushCharges}
                          key={index}
                        />
                      );
                    })
                  : "Please add fields using Add Field button"} */}
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
                      />
                    );
                  }
                })
              : "No parameters to generate charges"}

            <div className="btn2">
              <button className="p_btn2">GENERATE</button>
            </div>
          </div>
        </div>

        <div className="dc">
          <Image src={DifferentCharges} alt="dc" />
        </div>
        <button onClick={updateCharges}>Hello</button>
      </div>
    </>
  );
}
