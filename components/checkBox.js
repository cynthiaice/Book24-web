import React, { useState } from "react";
const CheckBox = ({ id, forID, label, cbClass, checked, onChange,labelClass }) => {
 
  return (
    <div className={`${cbClass} all_cb_container`}>
      <input
        type="checkbox"
        id={id}
        className="all_cb"
        checked={checked}
        onChange={onChange}
      />

      <label htmlFor={forID} className={`${labelClass} all_cb_label`}>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
