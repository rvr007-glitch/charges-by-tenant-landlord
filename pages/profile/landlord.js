import Details from "./components/Details";
import TableList from "./components/TableList";
import Taskbar from "./components/Taskbar";
import Header from "./components/Header";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../utility/Store";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import axios from "axios";
const tableData = [
  // Comment delete mat karna apshabd
  // {
  //   FlatNo:
  //   Addres:
  //   AliasName:
  //   PataNahi:
  // },
  {
    col1: "Flat-402",
    col2: "Near Road, XYZ Town, ABC",
    col3: "Dummy",
    col4: "Residential",
  },
  {
    col1: "Flat-402",
    col2: "Near Road, XYZ Town, ABC",
    col3: "Dummy",
    col4: "Residential",
  },
  {
    col1: "Flat-402",
    col2: "Near Road, XYZ Town, ABC",
    col3: "Dummy",
    col4: "Residential",
  },
  {
    col1: "Flat-402",
    col2: "Near Road, XYZ Town, ABC",
    col3: "Dummy",
    col4: "Residential",
  },
  {
    col1: "Flat-402",
    col2: "Near Road, XYZ Town, ABC",
    col3: "Dummy",
    col4: "Residential",
  },
  {
    col1: "Flat-402",
    col2: "Near Road, XYZ Town, ABC",
    col3: "Dummy",
    col4: "Residential",
  },
  {
    col1: "Flat-402",
    col2: "Near Road, XYZ Town, ABC",
    col3: "Dummy",
    col4: "Residential",
  },
  {
    col1: "Flat-402",
    col2: "Near Road, XYZ Town, ABC",
    col3: "Dummy",
    col4: "Residential",
  },
];


export default function Home() {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { dispatch, state } = useContext(Store);
  useEffect(() => {
    getDetails();
  }, []);

  console.log(state.userInfo);

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
      enqueueSnackbar("Signup", {varient: "success"});
    }
  };

  return (
    <div className="Parent">
      <Taskbar />
      <div className="S_right">
        <Details
          details={state.userInfo}
        />
        <hr />
        <div className="S_rightBottom">
          <Header head="Available Sites" />

          <TableList
            tableclass="table-striped Stable"
            flat="Flat No."
            loc="Address"
            siteName="Site Name"
            available="Type"
            view="View"
            tableData={tableData}
          />

          {/* <TableList
            tableclass="table-striped Stable"
            flat="Flat-402"
            loc="Near Road, XYZ Town, ABC"
            siteName="From: 04 Dec 2021"
            available="Residential"
            view="View"
            tableData={tableData}
          /> */}
        </div>
      </div>
    </div>
  );
}
