function VerticalInput(props) {
  return (
    <div className="py-3">
      <label htmlFor="input">{props.fieldName}:</label>
      <input
        style={{ width: "25vw" }}
        type={
          props.name == "pincode" ||
          props.name == "rent" ||
          props.name == "deposit"
            ? "number"
            : "text"
        }
        className="form-control"
        id="inputEmail4"
        placeholder={props.name}
        name={props.name}
        onChange={props.onChange}
      />
    </div>
  );
}

export default VerticalInput;
