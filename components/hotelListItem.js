import React from "react";
import Link from "next/link";

const HotelListItem = ({ item, lowestPrice }) => {
  const { name, address, rooms, id, images } = item;
  rooms.sort(function (a, b) {
    return a.price - b.price;
  });
  let currentPrice =
    rooms &&
    rooms.length > 0 &&
    rooms.reduce((prev, curr) =>
      parseInt(prev.price) < parseInt(curr.price)
        ? parseInt(prev)
        : parseInt(curr)
    );
  return (
    <Link href={{ pathname: "/detail-hotel", query: { id: id } }}>
      <div className="card-item card-item-list">
        <div className="card-img">
          <a className="d-block">
            <img src={images && images[0] && images[0].url} alt={name} />
          </a>
          <span className="badge">Popular</span>
          <div
            className="add-to-wishlist icon-element"
            data-toggle="tooltip"
            data-placement="top"
            title="Bookmark"
          >
            <i className="la la-heart-o" />
          </div>
        </div>
        <div className="card-body">
          <h3 className="card-title">
            <a>{name}</a>
          </h3>
          <p className="card-meta">{address}</p>
          <div className="card-rating">
            <span className="badge text-white">4.4/5</span>
            <span className="review__text">Average</span>
            <span className="rating__text">(30 Reviews)</span>
          </div>
          <div className="card-price d-flex align-items-center justify-content-between">
            <p>
              <span className="price__from">From </span>
              <span className="price__num">
                {(lowestPrice && lowestPrice != "₦NaN" && lowestPrice) || "₦0"}
              </span>
              <span className="price__text">Per night</span>
            </p>
            <Link href={{ pathname: "/detail-hotel", query: { id: id } }}>
              <a className="btn-text">
                See details
                <i className="la la-angle-right" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default HotelListItem;
