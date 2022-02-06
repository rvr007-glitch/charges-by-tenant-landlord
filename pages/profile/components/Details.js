import Link from "next/link";
import { AllFormatter } from "../../../utility/Functions/AllFormatter";

const Details = (props) => {
  return (
    <div className="right_top">
      <div className="rightTop_profile">
        <i className="fad fa-user-circle S_icon6"></i>
      </div>
      <div className="rightTop_details">
        <div className="details_head">
          <div className="headWriting">
            <h5>Hi {AllFormatter(props.details?.name, 4)}</h5>
            <div className="head_secondLine">Welcome to your profile page.</div>
          </div>
          <Link href="/editProfile2/EditLandlord">
            <i className="fas fa-user-edit S_icon7"></i>
          </Link>
        </div>
        <div className="details">
          <div className="email">Email: {props.details?.email}</div>
          <div className="details1">Contact: {props.details?.contact}</div>
          <div className="details2">Username: {props.details?.username}</div>
          {/* <div className="details3">Kuch bhi</div>
          <div className="details4">Kuch bhi returns</div> */}
        </div>
      </div>
    </div>
  );
};

export default Details;
