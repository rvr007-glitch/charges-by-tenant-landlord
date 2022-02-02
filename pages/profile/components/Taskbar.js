import Icons from "./Icons";
import Link from "next/link";
import LogOut from "./LogOut";

const Taskbar = () => {
  return (
    <div className="S_left">
      <link
        rel="stylesheet"
        href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
        crossOrigin="anonymous"
      />

      <Icons
        classprop="fad fa-user-circle S_icon S_icon0"
        path="/profile/landlord"
      ></Icons>
      <Icons
        classprop="fas fa-house-damage S_icon S_icon1"
        path="/landing/landlord"
      ></Icons>
      {/* <Icons
        classprop="fas fa-file-invoice-dollar S_icon S_icon2"
        path="/charges/generateCharges"
      ></Icons> */}
      <Icons
        classprop="far fa-plus-square S_icon S_icon3"
        path="/createSite/CreateSiteForm"
      ></Icons>
      <Icons
        classprop="fas fa-money-bill-alt S_icon S_icon4"
        path="/landing/AllChargesHistory"
      ></Icons>
      <LogOut classprop="fas fa-sign-out-alt S_icon S_icon5"></LogOut>
    </div>
  );
};

export default Taskbar;
