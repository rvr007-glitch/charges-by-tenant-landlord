function HorizontalInput(props) {
  return (
    <div>
      <div className="form-group row py-3">
        <label htmlFor="asdf" className="col-sm-2 col-form-label">
          {props.fieldName}
        </label>
        <div className="col-sm-10">
          <input
            type="number"
            className="form-control"
            id="inputEmail3"
            placeholder={props.name}
            name={props.name}
            onChange={props.onChange}
            defaultValue={props.defaultValue}
            disabled={props.isDisable}
          />
        </div>
      </div>
    </div>
  );
}

export default HorizontalInput;
