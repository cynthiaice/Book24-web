import React from "react";
import Link from "next/link";

const EventListItem = ({ item }) => {
  const { name, address, id,images,description } = item;
  return (
    <Link href={{ pathname: "/detail-event", query: { id: id } }}>
      <div className="col-xl-4 col-lg-6 col-md-6 isotope-item restaurants">
        <div className="strip grid">
          <figure>
            <a href="#0" className="wish_bt"></a>
            <a>
              <img src={images && images[0] && images[0].url}
               className="img-fluid" alt={name} />
              <div className="read_more">
                <span>Details</span>
              </div>
            </a>
            <small>Popular</small>
          </figure>
          <div className="wrapper">
            <h3>
              <a>{name}</a>
            </h3>
            <small>{address}</small>
            <p className="short-description">{description}</p>
            <a
              className="address"
              href="https://www.google.com/maps/dir//Assistance+%E2%80%93+H%C3%B4pitaux+De+Paris,+3+Avenue+Victoria,+75004+Paris,+Francia/@48.8606548,2.3348734,14z/data=!4m15!1m6!3m5!1s0x47e66e1de36f4147:0xb6615b4092e0351f!2sAssistance+Publique+-+H%C3%B4pitaux+de+Paris+(AP-HP)+-+Si%C3%A8ge!8m2!3d48.8568376!4d2.3504305!4m7!1m0!1m5!1m1!1s0x47e67031f8c20147:0xa6a9af76b1e2d899!2m2!1d2.3504327!2d48.8568361"
              target="_blank"
            >
              Get directions
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default EventListItem;
