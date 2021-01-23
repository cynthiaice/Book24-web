import React from "react";
import Link from "next/link";

const RentalListItem = ({ item }) => {
  const { name, address, price, id, images } = item;
  return (
    <Link href={{ pathname: "/detail-rental", query: { id: id } }}>
      <div className="col-lg-4">
        <div className="card-item trending-card">
          <div className="card-img">
            {images != null ? (
              <a className="d-block">
                <img
                  src={images && images[0] && images[0].url}
                  alt="Destination-img"
                  style={{ height: "150px" }}
                />
              </a>
            ) : (
              <div />
            )}
            <span className="badge">Bestseller</span>
          </div>
          <div className="card-body">
            <h3 className="card-title">
              <a href="tour-details.html">{name}</a>
            </h3>
            <p className="card-meta">{address}</p>
            <div className="card-rating">
              <span className="badge text-white">4.4/5</span>
              <span className="review__text">Average</span>
              <span className="rating__text">(30 Reviews)</span>
            </div>
            <div className="card-price d-flex align-items-center justify-content-between">
              <p>
                <span className="price__num">
                  {"\u20a6"}
                  {price}
                </span>
              </p>
              <a className="btn-text">
                View details
                <i className="la la-angle-right" />
              </a>
            </div>
          </div>
        </div>
        {/* end card-item */}
      </div>
    </Link>
  );
};
export default RentalListItem;
