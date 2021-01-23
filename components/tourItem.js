import Link from "next/link";
import { Ribbon } from "./Icons";

const TourItem = ({
  name,
  address,
  image_url,
  link,
  id,
  subItems,
  isFeatured,
  discount,
}) => {
  const badgeStyle = {
    padding: "0px 11px",
    borderRadius: "30px",
    position: "absolute",
    zIndex: "999999999",
    marginBottom: "0",
    fontSize: "12px",
  };
  return (
    <div style={{ position: "relative" }} className="col-lg-3 col-sm-6 mb-3">
      {isFeatured && (
        <span className="badge-danger list_item_badge" style={badgeStyle}>
          BESTSELLER
        </span>
      )}
      <div>
        <Link
          href={{ pathname: "/detail-tour", query: { type: link, id: id } }}
        >
          <a class="grid_item small">
            <figure>
              <img src={image_url} alt="" style={{ height: "130px" }} />
              <div class="info">
              <div
                  style={{
                    display: "flex",
                    flexDirection: "row !important",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="cat_star">
                  
                  </div>
                  <div className="card_ribbon_container">
                    <Ribbon
                      fill="#DAA520"
                      width="6em"
                      height="6em"
                      className="card_ribbon"
                      style={{ marginRight: "-20px" }}
                    />
                    <h6>{discount||0}% off</h6>
                  </div>
                </div>
                <h3>{name}</h3>
              </div>
            </figure>
          </a>
        </Link>
        <p style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}>
          <i className="input-icon field-icon fa mr-1">
            <svg
              width="15px"
              height="15px"
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              {/* <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch --> */}

              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="Ico_maps"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <g
                  id="Group"
                  transform="translate(4.000000, 0.000000)"
                  stroke="#666666"
                >
                  <g id="pin-1" transform="translate(-0.000000, 0.000000)">
                    <path
                      d="M15.75,8.25 C15.75,12.471 12.817,14.899 10.619,17.25 C9.303,18.658 8.25,23.25 8.25,23.25 C8.25,23.25 7.2,18.661 5.887,17.257 C3.687,14.907 0.75,12.475 0.75,8.25 C0.75,4.10786438 4.10786438,0.75 8.25,0.75 C12.3921356,0.75 15.75,4.10786438 15.75,8.25 Z"
                      id="Shape"
                    ></path>
                    <circle id="Oval" cx="8.25" cy="8.25" r="3"></circle>
                  </g>
                </g>
              </g>
            </svg>
          </i>
          {address}
        </p>
      </div>
    </div>
    // 		<div className="col-xs-12 col-sm6 col-md-3">
    // 		<div className="item has-matchHeight">
    // 		<div className="featured-image">
    // 		  <div className="featured">Bestseller</div>
    // 		  <Link  href={{ pathname: '/detail',
    // 					query: { type: link,id:id } }}>
    // 		  <a className="grid_item small">
    // 					<img src={image_url} alt=""
    // 						className="img-responsive img-full"
    // 					/>
    // 			</a></Link>
    // 		</div>

    // 		<Link  href={{ pathname: '/detail',
    // 					query: { type: link,id:id } }}>
    // 		<a
    // 		className="st-link c-main">{name}</a>
    // 		</Link>
    // 		<div className="sub-title" style={{fontSize:'12px'}}>
    // 		<i className="input-icon field-icon fa">
    // 		<svg width="15px" height="15px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    // {/* <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch --> */}

    // <desc>Created with Sketch.</desc>
    // <defs></defs>
    // <g id="Ico_maps" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
    // <g id="Group" transform="translate(4.000000, 0.000000)" stroke="#666666">
    // 	<g id="pin-1" transform="translate(-0.000000, 0.000000)">
    // 		<path d="M15.75,8.25 C15.75,12.471 12.817,14.899 10.619,17.25 C9.303,18.658 8.25,23.25 8.25,23.25 C8.25,23.25 7.2,18.661 5.887,17.257 C3.687,14.907 0.75,12.475 0.75,8.25 C0.75,4.10786438 4.10786438,0.75 8.25,0.75 C12.3921356,0.75 15.75,4.10786438 15.75,8.25 Z" id="Shape"></path>
    // 		<circle id="Oval" cx="8.25" cy="8.25" r="3"></circle>
    // 	</g>
    // </g>
    // </g>
    // </svg></i>
    // {address}</div>
    // 			</div>
    // 			<div>
    // 	{/* <div className="reviews">
    // 		<span className="rate">0                    /5 Not Rated                </span>
    // 		<span className="summary">
    // 			No Review                </span>
    // 	</div> */}
    // 	{
    // 	subItems &&	subItems.map((el,index)=>{
    // 		return (
    // <div className="price-wrapper">
    // 		<i className="input-icon field-icon fa"><svg width="10px" height="16px" viewBox="0 0 11 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    // {/* <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch --> */}

    // <desc>Created with Sketch.</desc>
    // <defs></defs>
    // <g id="Tour-layout" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
    // <g id="Room_Only_Detail_1" transform="translate(-135.000000, -4858.000000)" fill="#ffab53" fillRule="nonzero">
    // 	<g id="nearby-tour" transform="translate(130.000000, 4334.000000)">
    // 		<g id="h1-g" transform="translate(5.000000, 136.000000)">
    // 			<g id="tour-grid">
    // 				<g id="price" transform="translate(0.000000, 383.000000)">
    // 					<g id="thunder" transform="translate(0.000000, 5.000000)">
    // 						<path d="M10.0143234,6.99308716 C9.91102517,6.83252576 9.73362166,6.73708716 9.54386728,6.73708716 L5.61404272,6.73708716 L5.61404272,0.561648567 C5.61404272,0.296666111 5.42877956,0.0676134793 5.16941114,0.0125959355 C4.90555149,-0.0435444154 4.64730587,0.0923152337 4.5395164,0.333718743 L0.0482883306,10.4389819 C-0.0291853536,10.6118942 -0.0123432484,10.8139994 0.0909549973,10.9723152 C0.194253243,11.1317538 0.371656752,11.2283152 0.561411138,11.2283152 L4.4912357,11.2283152 L4.4912357,17.4037538 C4.4912357,17.6687363 4.67649886,17.8977889 4.93586728,17.9528065 C4.97516552,17.9606661 5.01446377,17.9651573 5.05263921,17.9651573 C5.27046377,17.9651573 5.47369184,17.8382801 5.56576201,17.6316837 L10.0569901,7.5264205 C10.133341,7.35238541 10.1187445,7.15252576 10.0143234,6.99308716 Z" id="Shape"></path>
    // 					</g>
    // 				</g>
    // 			</g>
    // 		</g>
    // 	</g>
    // </g>
    // </g>
    //  </svg></i>
    // {el.name} from <span className="price">{'\u20A6'}{el.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span><span className="unit">/night</span>
    // 	</div>
    // 		);
    // 	})
    // 	}

    // </div>
    // 		</div>
  );
};
export default TourItem;
