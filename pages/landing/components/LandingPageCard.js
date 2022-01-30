import LandingCardButton from "./LandingCardButton";
import LandingCardContent from "./LandingCardContent";
import HorizontalLine from "./HorizontalLine";
import { useRouter } from "next/router";
import AllotPopup from "./AllotSite";

function LandingPageCard(props) {
  const router = useRouter();
  const { redirect } = router.query;

  const changePange = () => {
    router.push(`/landing/particularSite?id=${props._id}`);
  };

  const goToGenerateChargesPage = () => {
    router.push(`/charges/generateCharges?site_id=${props._id}`);
  };

  return (
    <section className="a-card">
      <div
        className={`container shadow-lg a-landing-card mt-5 ${props.cclass}`}
        style={{ width: "65vw" }}
      >
        <div className="row justify-content-md-center p-3">
          <div className="col col-lg-4 a-image-container">
            <img
              className="card-img-top a-landing-card-image"
              src="/images/homePage.png"
              alt="Card image cap"
            />
          </div>

          <div className="col col-lg-8">
            <div className="card-body a-card-body">
              <h5 className="card-title a-landing-card-title">
                <span className="a-landing-card-heading"> Alias Name: </span>
                <span className="a-landing-card-data">{props.alias_name}</span>
              </h5>
              <div className="card-text">
                <div className="container">
                  <LandingCardContent
                    leftHeading="Owner"
                    rightdata={props.owner}
                  />
                  <LandingCardContent
                    leftHeading="Rent"
                    rightdata={`${props.rent}/-`}
                  />
                  <LandingCardContent
                    leftHeading="Address"
                    rightdata={props.address}
                  />
                  {
                    props.siteStatus == 0 ? <LandingCardContent leftHeading="Status" rightdata="Vacant"/>: ""
                  }
                  {
                    props.siteStatus == 1 ? <LandingCardContent leftHeading="Status" rightdata="Requested"/>: ""
                  }
                  {
                    props.siteStatus == 2 ? <LandingCardContent leftHeading="Status" rightdata="Alloted"/>: ""
                  }
                </div>
              </div>
              <div className="container">
                <div>
                  <div
                    className="a-button-container"
                    // onClick={() => changePange(props._id)}
                    // onClick={() => goToGenerateChargesPage(props._id)}
                  >
                    <LandingCardButton
                      classNameProp={props.class1}
                      name={props.text1}
                      changePange={changePange}
                    />
                    {props.siteStatus == 2 ? <LandingCardButton
                      classNameProp={props.class3}
                      name={props.text3}
                      goToGenerateChargesPage={goToGenerateChargesPage}
                    /> : ""}
                    {
                      props.siteStatus == 0 ? 
                      <div className="a-landing-card-button">
                      <button className="btn btn-primary a-landing-card-button">
                        Allot
                      </button>
                    </div> : ""
                    }
                    {
                      props.siteStatus == 2 ? <div className="a-landing-card-button">
                      <button className="btn btn-danger a-landing-card-button"
                        // onClick={removeHandler}
                      >
                        Remove
                      </button>
                    </div> : ""
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPageCard;
