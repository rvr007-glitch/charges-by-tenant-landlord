function RadioButton(props) {
  return (
    <div>
      <input
        type="radio"
        id="customRadioInline1"
        name={props.groupName}
        className="custom-control-input"
        value={props.value}
        // checked={props.checked}
        onChange={props.onChange}
      />
      <label className="custom-control-label" htmlFor="customRadioInline1">
        {props.name}
      </label>
    </div>
  );
}

export default RadioButton;
