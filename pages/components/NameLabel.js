import React from "react";

const NameLabel = (props) => {
  return (
    <div>
      <span className="p_label">{props.label}</span>
      <span>
        <input className="ip" type="text" value={props.detail} />
      </span>
    </div>
  );
};

export default NameLabel;
