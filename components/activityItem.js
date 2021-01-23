import SubReviewBox from "./subReviewBox";
const ActivityItem = ({ el }) => {
  return (
    <div className="col-xl-4 col-lg-6 col-md-6 isotope-item restaurants">
      <div className="strip grid">
        <figure>
          <a href="#0" className="wish_bt"></a>
          <a href={"/detail-activity?id=" + el.type.id}>
            <img src={el.images && el.images[0] &&el.images[0].url} className="img-fluid" alt="" />
            <div className="read_more">
              <span>Read more</span>
            </div>
          </a>
          <small>{el.type.name.toUpperCase()}</small>
        </figure>
        <div className="wrapper">
          <h3>
            <a href={"/detail-activity?id=" + el.type.id}>{el.name}</a>
          </h3>
          <small>{el.address}</small>
          <p>{el.description}</p>
          <a className="address" href="#" target="_blank">
            Get directions
          </a>
        </div>
        <ul>
          <li>
            <span className="loc_open">Now Open</span>
          </li>
          {el.reviews != null && el.reviews.length > 0 ? (
            <SubReviewBox reviews={el.reviews} />
          ) : (
            <div />
          )}
          {/* <li><div className="score"><span>Superb<em>350 Reviews</em></span><strong>8.9</strong></div></li> */}
        </ul>
      </div>
    </div>
  );
};
export default ActivityItem;
