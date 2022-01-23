import Identity from "./components/Identity";
import LandLordSite from "./components/LandLordSite";
import LandLordReq from "./components/LandLordReq";

import { useState, useContext } from "react";
import { Store } from "../../utility/Store"

const Landlord = () => {
  const [siteState, setStateSite] = useState(true);
  const [reqState, setStateReq] = useState(false);

  const onHandle1 = () => {
    if (reqState) {
      setStateSite(true);
      setStateReq(false);
    }
  };

  const onHandle2 = () => {
    if (siteState) {
      setStateSite(false);
      setStateReq(true);
    }
  };
  const { dispatch, state } = useContext(Store)
  return (
    <div className="S_tenant">
      <link
        rel="stylesheet"
        href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
        crossOrigin="anonymous"
      />
      <Identity onShow1={onHandle1} onShow2={onHandle2} userDetails={state.userInfo} />
      <div className="S_right S_background_image">
        {siteState ? <LandLordSite /> : <LandLordReq />}
      </div>
    </div>
  );
};

export default Landlord;
