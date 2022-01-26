function NormalBootstrapButton(props) {
  return (
    <button className={`btn ${props.classNameProp}`} onClick={props.onClick}>
      {props.fieldName}
    </button>
  );
}

export default NormalBootstrapButton;
