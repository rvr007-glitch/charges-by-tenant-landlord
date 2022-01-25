import { useState, useEffect } from "react";
import RadioButton from "./RadioButton";

const CreateBottomRadioPart = (props) => {
  const [disable, setDisable] = useState(true);

  const [valueInput, setValueInput] = useState({
    fixed: true,
    value: 0,
  });

  function onValueChange(e) {
    
    if (e.target.type == "radio") {
      if (e.target.value == "fixed") {
        setDisable(false);
        setValueInput({ ...valueInput, fixed: true });
        e.target.checked = true;
      } else {
        setDisable(true);
        setValueInput({ ...valueInput, fixed: false, value: null });
        e.target.checked = true;
      }
    } else {
      setValueInput({ ...valueInput, [e.target.name]: e.target.value });
    }
  }

  useEffect(() => {
    var result = {};
    result[props.name] = valueInput;
    // console.log(result);
    props.pushCharges(result);
  }, [valueInput]);
  
 
    // console.log(valueInput);
    


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
                  checked={valueInput.fixed ? true : false}
                />
              </div>
              <div className="col-4">
                <RadioButton
                  name="Variable"
                  value="variable"
                  groupName={props.name}
                  onChange={(e) => onValueChange(e)}
                  checked={valueInput.fixed ? false : true}
                />
              </div>
              <div className="col-4">
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail3"
                  placeholder="Amount"
                  name="value"
                  value={valueInput.value}
                  onChange={(e) => onValueChange(e)}
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
