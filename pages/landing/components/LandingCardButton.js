import generateCharges from "../../charges/generateCharges";
import NormalBootstrapButton from "./NormalBootstrapButton";

function LandingCardButton(props) {
  const detailsClickedHandler = () => {
    props.changePange();
  };

  const generateChargesClickedHandler = () => {
    props.goToGenerateChargesPage();
  };

  return (
    <div className="a-landing-card-button">
      {props.name == "Details" ? (
        <button
          className={`btn ${props.classNameProp}`}
          onClick={detailsClickedHandler}
        >
          {props.name}
        </button>
      ) : props.name == "Generate Charges" ? (
        <button
          className={`btn ${props.classNameProp}`}
          onClick={generateChargesClickedHandler}
        >
          {props.name}
        </button>
      ) : (
        <button className={`btn ${props.classNameProp}`}>{props.name}</button>
      )}
      {/* <NormalBootstrapButton
        classNameProp={props.classNameProp}
        name={props.name}
      /> */}
    </div>
  );
}

export default LandingCardButton;
