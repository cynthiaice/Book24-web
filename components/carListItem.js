import React from "react";
import Link from "next/link";

const CarListItem = ({ item }) => {
  const { name, address, price, id, images, carModel } = item;
  return (
    <Link href={{ pathname: "/detail-car", query: { id: id } }}>
      <div className="col-lg-6 responsive-column">
        <div className="card-item car-card">
          <div className="card-img">
            <a className="d-block">
              <img
                src={
                  JSON.parse(images) &&
                  JSON.parse(images)[0] &&
                  JSON.parse(images)[0].url
                }
                alt={name}
              />
            </a>
            {item.featured && <span className="badge">Bestseller</span>}
            <div
              className="add-to-wishlist icon-element"
              data-toggle="tooltip"
              data-placement="top"
              title="Save for later"
            >
              <i className="la la-heart-o" />
            </div>
          </div>
          <div className="card-body">
            <p className="card-meta">{name}</p>
            <h3 className="card-title">
              <a>{carModel}</a>
            </h3>
            {/* <div className="card-rating">
                          <span className="badge text-white">4.4/5</span>
                          <span className="review__text">Average</span>
                          <span className="rating__text">(30 Reviews)</span>
                        </div> */}
            {/* <div className="card-attributes">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center" data-toggle="tooltip" data-placement="top" title="Passenger"><i className="la la-users" /><span>4</span></li>
                            <li className="d-flex align-items-center" data-toggle="tooltip" data-placement="top" title="Luggage"><i className="la la-suitcase" /><span>1</span></li>
                          </ul>
                        </div> */}
            <div className="card-price d-flex align-items-center justify-content-between">
              <p>
                <span className="price__from">From</span>
                <span className="price__num">
                  {"\u20a6"}
                  {parseInt(price).toLocaleString()}
                </span>
                <span className="price__text">Per day</span>
              </p>
              <a className="btn-text">
                See details
                <i className="la la-angle-right" />
              </a>
            </div>
          </div>
        </div>
        {/* end card-item */}
      </div>
      {/* end col-lg-6 */}
    </Link>
  );
};
export default CarListItem;
