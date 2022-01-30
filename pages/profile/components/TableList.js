import React from "react";
import { useRouter } from "next/router";


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
          <th scope="col">{props.view}</th>
        </tr>
      </thead>
      <tbody>
        {detailsArray?.map((data) => {
            return (
              <tr key={i++}>
                <th scope="row">{data?.alias_name}</th>
                <td>{`${data?.address?.first_line}, ${data?.address?.landmark}, ${data?.address?.city}, ${data?.address?.state}, Pin : ${data?.address?.pincode}`}</td>
                <td>{data?.Type}</td>
                <td>
                  <button 
                  type="button" 
                  className="btn btn-outline-info" 
                  onClick={() =>changePage(data?._id)}>
                    View
                  </button>
                </td>
              </tr>
            );
        })}
        {/* Awara Code*/}
        {/* <tr>
          <th scope="row">1</th>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <button type="button" className="btn btn-outline-info">
              Info
            </button>
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <button type="button" className="btn btn-outline-info">
              Info
            </button>
          </td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <button type="button" className="btn btn-outline-info">
              Info
            </button>
          </td>
        </tr>
        <tr>
          <th scope="row">4</th>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <button type="button" className="btn btn-outline-info">
              Info
            </button>
          </td>
        </tr>
        <tr>
          <th scope="row">5</th>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <button type="button" className="btn btn-outline-info">
              Info
            </button>
          </td>
        </tr>
        <tr>
          <th scope="row">6</th>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <button type="button" className="btn btn-outline-info">
              Info
            </button>
          </td>
        </tr>
        <tr>
          <th scope="row">7</th>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <button type="button" className="btn btn-outline-info">
              Info
            </button>
          </td>
        </tr> */}
      </tbody>
    </table>
  );
};

export default TableList;
