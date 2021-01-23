import React from "react";
const autowidth = { width: "fit-content" };
export default function CardItem({
  cardName,
  status,
  showStat,
  noSub,
  titleOne,
  detailOne,
  titleTwo,
  detailTwo,
  editClick,
  deleteClick,
  noEditBtn,
  noDelBtn,
  btn,
  isBook,
  btnText,
  viewClick,
  badge,
}) {
  return (
    <div className="card-item card-item-list card-item--list">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <h3 className="card-title">{cardName}</h3>
          {showStat && (
            <span className={`badge text-white ml-2 ${badge}`}>{status}</span>
          )}
        </div>
        {!noSub && (
          <ul className="list-items list-items-2 pt-2 ">
            <li>
              <span style={isBook && autowidth}>
                <b>{titleOne}</b>
              </span>
              {detailOne}
            </li>
            <li>
              <span>
                <b>{titleTwo}</b>
              </span>
              {detailTwo}
            </li>
          </ul>
        )}
      </div>
      <div className="action-btns">
        {!noEditBtn && (
          <button
            className="theme-btn theme-btn-small mr-2"
            onClick={editClick}
          >
            <i className="la la-edit mr-1" />
            Edit
          </button>
        )}
        {!noDelBtn && (
          <button className="theme-btn theme-btn-small" onClick={deleteClick}>
            <i className="la la-trash mr-1" />
            Delete
          </button>
        )}
        {btn && (
          <button
            className="theme-btn theme-btn-small"
            onClick={viewClick}
            style={{ backgroundColor: "#287dfa" }}
          >
            <i className="la la-eye mr-1" />
            {btnText}
          </button>
        )}
      </div>
    </div>
  );
}
