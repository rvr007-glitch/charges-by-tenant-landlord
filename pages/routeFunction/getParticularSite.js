import React, { useContext } from "react";
import { Store } from "../../utility/Store";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import axios from "axios";
//  To get Particulalar site

const GetParticularSite = async (site_id) => {
  console.log(site_id);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { dispatch, state } = useContext(Store);
  if (Cookies.get("userInfo")) {
    closeSnackbar();
    let config = {
      headers: {
        authorization: "b " + JSON.parse(Cookies.get("userInfo")).data.token,
      },
    };
    try {
      // await axios.get(`/api/site/${router.query.id}`, config).then((res) => {
      await axios.get(`/api/site/${site_id}`, config).then((res) => {
        dispatch({
          type: "GET_PARTICULAR_SITE",
          payload: res.data,
        });
      });
      enqueueSnackbar("Site Loaded", { variant: "success" });
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message, { variant: "error" });
    }
  } else {
    enqueueSnackbar("Signup/signin Required", { varient: "success" });
  }
};

export default GetParticularSite;
