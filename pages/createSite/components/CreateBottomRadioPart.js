import { useState } from "react";
import RadioButton from "./RadioButton";

const CreateBottomRadioPart = (props) => {
  const [disable, setDisable] = useState(true);

  function onValueChange(e) {
    if (e.target.value == "fixed") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }
  return (
    <section>
      <div className="row">
        <div className="col-6">
          <label htmlFor="input">{props.name}</label>
        </div>
        <div className="col-6">
          <div className="container">
            <div className="row">
              <div className="col-4">
                <RadioButton
                  name="Fixed"
                  value="fixed"
                  groupName={props.name}
                  onChange={(e) => onValueChange(e)}
                />
              </div>
              <div className="col-4">
                <RadioButton
                  name="Variable"
                  value="variable"
                  groupName={props.name}
                  onChange={(e) => onValueChange(e)}
                />
              </div>
              <div className="col-4">
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail3"
                  placeholder="Amount"
                  name={props.name}
                  onChange={props.onChange}
                  disabled={disable}
                  defaultValue={props.name == "country" ? "India" : ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateBottomRadioPart;
