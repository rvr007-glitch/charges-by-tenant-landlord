import React from "react";
import { useRouter } from "next/router";
import Moment from "react-moment";
import { AllFormatter } from "../../../utility/Functions/AllFormatter";

var i = 0;
const TableList = (props) => {
  const router = useRouter();
  var detailsArray = props.allDetails;
  const changePage = (siteId) => {
    router.push(`/landing/particularSite?id=${siteId}`);
  };
  return (
    <table className={`table table-striped ${props.tableclass}`}>
      <thead>
        <tr>
          <th scope="col">{props.flat}</th>
          <th scope="col">{props.loc}</th>
          <th scope="col">{props.available}</th>
          <th scope="col">Created On</th>
          <th scope="col">{props.view}</th>
        </tr>
      </thead>
      <tbody>
        {detailsArray?.map((data) => {
          console.log(data);
          var address =
            data?.address?.first_line +
            ", " +
            data?.address?.landmark +
            ", " +
            data?.address?.city +
            ", " +
            data?.address?.state +
            ", Pin-" +
            data?.address?.pincode;

          return (
            <tr key={i++}>
              <th scope="row">{AllFormatter(data?.alias_name, 4)}</th>
              <td className="a-limit-width">{AllFormatter(address, 4)}</td>
              <td>{data?.Type}</td>
              <td>
                <Moment format="MMMM Do YYYY">{data.createdAt}</Moment>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => changePage(data?._id)}
                >
                  View
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableList;
