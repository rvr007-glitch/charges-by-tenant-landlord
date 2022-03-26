import Moment from "react-moment";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../../utility/Store";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useRouter } from "next/router";

const AllChargesList = (props) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { dispatch, state } = useContext(Store);
  const [loading, setLoading] = useState(false);

  const totalCharges = (description) => {
    
    var keys = description && Object.keys(description);
    var total = 0;
    keys && keys.map((data) => {
      total += parseInt(description[data]);
    });
    return total;
  };

  const goToParticularSite = (siteId) => {
    router.push(`/landing/particularSite?id=${siteId}`);
  };


  return (
    <div className="right_bottom">
      <link
        rel="stylesheet"
        href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossOrigin="anonymous"
      />
      <div className="p_h2">{props.head}</div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ALias Name</th>
            <th scope="col">Address</th>
            <th scope="col">Rent</th>
            <th scope="col">Other Charges</th>
            <th scope="col">Total</th>
            <th scope="col">Payment Date</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {props.allCharges
            ? props.allCharges.map((data, index) => {
                var total = totalCharges(data && data.charge_id && data.charge_id.description);
                console.log(data);
                return (
                  <tr key={index}>
                    <td>{data?.charge_id?.site_id.alias_name}</td>
                    <td>{data && data.charge_id  && data.charge_id.site_id && data.charge_id.site_id.address && data.charge_id.site_id.address.first_line + " " + data.charge_id.site_id.address.landmark}</td>
                    <td>{data && data.charge_id && data.charge_id.site_id && data.charge_id.site_id.rent }</td>
                    <td>{total - Number(data && data.charge_id && data.charge_id.site_id && data.charge_id.site_id.rent) }</td>
                    <td>{total}</td>
                    <td>
                      <Moment format="MMMM Do YYYY">{data.order_date}</Moment>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          goToParticularSite(data?.charge_id?.site_id?._id);
                        }}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default AllChargesList;
