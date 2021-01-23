import Link from "next/link";
import { Ribbon } from "./Icons";

const EventItem = ({ image_url, name, id, isFeatured, address ,discount,}) => {
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
        <Link href={{ pathname: "/detail-event", query: { id: id } }}>
          <a class="grid_item small">
            <figure>
              <img src={image_url} alt="image" style={{ height: "130px" }} />
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
                    <h6>{discount ||0}% off</h6>
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
    //         <div className="wpb_column column_container col-md-3">

    // 				<div className="vc_column-inner">
    // 				<div className="wpb_wrapper">
    // 				{/* <p style={{color: 'black', fontSize:'18px',textAlign:'center'}}>{name}</p> */}
    // 				<div className="st-offer-new st-offer-item-new item has-matchHeight"
    // 				style={{height: "130px"}}>

    // 		        <p className="st_but">
    // 				 <Link  href={{ pathname: '/detail',
    // 					query: { type: 'event',id:id } }}>
    //         	<a className="btn btn-default">Buy Ticket</a></Link>
    //         </p>
    //         <div className="img-cover st_ay"
    //         style={{backgroundImage: `url(${image_url})`}}></div>
    // </div>
    // <div className="vc_separator wpb_content_element vc_separator_align_center
    //  vc_sep_width_100 vc_sep_pos_align_center vc_separator_no_text vc_sep_color_white">
    //  <span className="vc_sep_holder vc_sep_holder_l"><span className="vc_sep_line"></span>
    //  </span><span className="vc_sep_holder vc_sep_holder_r"><span className="vc_sep_line"></span></span>
    // </div></div></div>
    // 				</div>
  );
};
export default EventItem;
