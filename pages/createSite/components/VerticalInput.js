function VerticalInput(props) {
  return (
    <div className="py-3">
      <label htmlFor="input">{props.fieldName}:</label>
      <input
        style={{ width: "25vw" }}
        type=""
        className="form-control"
        id="inputEmail4"
        placeholder="Site name"
        name={props.name}
        onChange={props.onChange}
      />
    </div>
  );
}

export default VerticalInput;
