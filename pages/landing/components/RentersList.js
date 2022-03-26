import React from "react";
import Moment from "react-moment";

const RentersList = (props) => {
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
            <th scope="col">Tenant Name</th>
            {/* <th scope="col">{props.loc}</th> */}
            <th scope="col">{props.rentedFrom}</th>
            <th scope="col">{props.rentedTill}</th>
            <th scope="col">{props.rents}</th>
            <th scope="col">
              Deposit( <i className="fas fa-rupee-sign"></i> )
            </th>
          </tr>
        </thead>
        <tbody>
          {props.historyDetail && props.historyDetail.map((hist, index) => {
            console.log(hist)
            return (
              <tr key={index}>
                {/* after populate completed */}
                <td scope="row">{props.tenantsDetail[index].firstName}</td>
            <td>
              {hist.joined_at ? (
                <Moment format="MMMM Do YYYY">
                  {hist.joined_at}
                </Moment>
              ) : (
                hist.rejected_at? "Rejected": "Requested"
              )}{" "}
            </td>
            <td>
              {hist.rejected_at ? "Rejected" : (hist.joined_at
                ? (hist.left_at
                  ? <Moment format="MMMM Do YYYY">
                  {hist.left_at}
                </Moment>
                  : "Presently Living")
                : "Requested")}
            </td>
            <td>{props.rent}</td>
            <td>
              <i className="fas fa-rupee-sign"></i> {props.deposit}
            </td>
          </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RentersList;
