import React from "react";
import Moment from "react-moment";

const ChargesList = (props) => {
  const totalCharges = (description) => {
    var keys = Object.keys(description);
    var total = 0;
    keys.map((data) => {
      total += parseInt(description[data]);
    });
    return total;
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
            <th scope="col">Total Charges</th>
            <th scope="col">Payment Status</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {props.chargesDetails
            ? props.chargesDetails.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{totalCharges(data.description)}</td>
                    <td>
                      <h4>
                        {data.isPaid ? (
                          <span className="badge badge-success">Paid</span>
                        ) : (
                          <span className="badge badge-warning">Unpaid</span>
                        )}
                      </h4>
                    </td>
                    <td>
                      <button className="btn btn-primary">Details</button>
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

export default ChargesList;
