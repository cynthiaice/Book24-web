import React from "react";

export default function ImageField({
  onChange,
  src,
  fileName,
  disabled,
  deleteClick,
  showDelete,
}) {
  const deleteButonStyle = {
    position: "absolute",
    right: "0px",
    top: "-20px",
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    zIndex: "99",
  };

  return (
    <div className="col-lg-4 col-md-6">
      {showDelete && (
        <button
          //  className="theme-btn theme-btn-small"
          onClick={deleteClick}
          style={deleteButonStyle}
        >
          <i
            className="la la-times mr-1 back_btn_icon"
            style={{ color: "black" }}
          />
        </button>
      )}
      <div className="file-upload-wrap">
        <input
          type="file"
          name={fileName}
          className="multi file-upload-input with-preview"
          maxLength={3}
          accept=".jpg, .jpeg, .png"
          onChange={onChange}
          disabled={disabled}
        />
        <span className="file-upload-text">
          <img
            alt=""
            style={{
              width: "100%",
              height: "84%",
              zIndex: "999",
              borderRadius: "5px",
              position: "absolute",
              left: "0",
            }}
            src={src}
          />
          <i className="la la-upload mr-2" />
          <p style={{ fontSize: "10px" }}>
            Click or drag images here to upload
          </p>
        </span>
      </div>
    </div>
  );
}
