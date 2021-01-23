import React from "react";

export default function TextField({
  label,
  required,
  type,
  name,
  placeholder,
  value,
  onChange,
  className,
  disabled,
  max,
  min,
}) {
  return (
    <div className="col-lg-6 responsive-column">
      <div className="input-box">
        <label className="label-text">{label}</label>
        <div className="form-group">
          <span className={className} />
          <input
            required={required}
            className="form-control"
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            max={max}
            min={min}
          />
        </div>
      </div>
    </div>
  );
}
