import React from "react";
import Link from "next/link";

const TourListItem = ({ item }) => {
  const { name, address, images, tour_packages, id } = item;
  tour_packages.sort(function (a, b) {
    return parseInt(a.price) - parseInt(b.price);
  });
  return (
    <Link href={{ pathname: "/detail-tour", query: { id: id } }}>
    <div className="col-lg-6 responsive-column">
      <div className="card-item ">
        <div className="card-img">
          <a  className="d-block">
            <img
              src={images && images[0] && images[0].url}
              alt="Destination-img"
            />
          </a>
          <div
            className="add-to-wishlist icon-element"
            data-toggle="tooltip"
            data-placement="top"
            title="Save for Later"
          >
            <i className="la la-heart-o" />
          </div>
        </div>
        <div className="card-body">
          <h3 className="card-title">
            <a >{name}</a>
          </h3>
          <p className="card-meta">{address}</p>
          <div className="card-rating">
            <span className="badge text-white">4.4/5</span>
            <span className="review__text">Average</span>
            <span className="rating__text">(30 Reviews)</span>
          </div>
          <div className="card-price d-flex align-items-center justify-content-between">
            <p>
              <span className="price__from">From</span>
              <span className="price__num">
                {"\u20A6"}
                {(tour_packages &&
                  tour_packages[0] &&
                  tour_packages[0].price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")) ||
                  0}
              </span>
            </p>
            <span className="tour-hour">
              <i className="la la-clock-o mr-1" />
              Full day
            </span>
          </div>
        </div>
      </div>
      {/* end card-item */}
    </div></Link>
  );
};
export default TourListItem;
