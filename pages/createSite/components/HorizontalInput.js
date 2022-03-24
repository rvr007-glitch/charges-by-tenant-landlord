function HorizontalInput(props) {
  return (
    <div>
      <div className="form-group row py-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          {props.fieldName}
        </label>
        <div className="col-sm-10">
          <input
            type={
              props.name == "pincode" ||
              props.name == "rent" ||
              props.name == "deposit"
                ? "number"
                : "text"
            }
            className="form-control"
            id="inputEmail3"
            placeholder={props.fieldName}
            name={props.name}
            onChange={props.onChange}
            defaultValue={props.name == "country" ? "India" : ""}
          />
        </div>
      </div>
    </div>
  );
}

export default HorizontalInput;
