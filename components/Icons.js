import React, { Component } from "react";

export function Ribbon(props) {
  return (
    <svg
      className={props.className}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width={props.width}
      height={props.height}
      // viewBox="0 0 467.095 467.096"
      viewBox="0 0 467.095 467.096"
      style={props.style}
      fill={props.fill}
    >
      <path
        fill={props.fill}
        d="M23.551,148.443c0,0-23.551,4.61-23.551,27.879c0,23.267,0,142.33,0,142.33s2.615-28.673,23.551-28.673h443.544
          l-45.231-73.29l45.231-68.246H23.551z"
      />
    </svg>
  );
}
