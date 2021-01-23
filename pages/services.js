import Head from "next/head";
import React, { Component } from "react";
import Header from "../components/header";
import DetailsHeader from "../components/detailsHeader";
import DetailsItem from "../components/detailsItem";import PreLoader from "../components/preloader";
import SignInModal from "../components/signInModal";
import Footer from "../components/footer";
import $ from "jquery";
import Cookies from "js-cookie";
import moment from "moment";
import { withRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../components/config.js";

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      token: "",
      type: "",
      name: "",
      address: "",
      description: "",
      check_in_time: "",
      check_out_time: "",
      sub_items: [],
    };
  }

  async componentDidMount() {
    let token = await Cookies.get("token");
    if (token == null || token == "") {
      console.log("false tojken");
      this.setState({ auth: false });
    } else {
      console.log(token);
      this.setState({ auth: true, token });
    }
  }

  getData = (token, type, id) => {
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + type + "s/" + id, config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.length;
        if(len <= 0){
          this.props.router.push('/listing')
        }
        this.setState({
          type: type,
          name: response.data.name,
          address: response.data.address,
          description: response.data.description,
          check_in_time: response.data.check_in_time
            ? response.data.check_in_time
            : response.data.start_date,
          check_out_time: response.data.check_out_time
            ? response.data.check_out_time
            : response.data.end_date,
          sub_items: type == "hotel"
              ? response.data.rooms
              : type == "event"
              ? response.data.ticket_type
              : type == "tour"
              ? response.data.tour_packages
              : [],
        });
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error.response);
      });
  };

  render() {
    const {
      type,
      name,
      address,
      description,
      check_in_time,
      check_out_time,
      sub_items,
    } = this.state;
    return (
      <div>
        <Head>
          <meta
            name="description"
            content="Book24 - Advanced Travel and Event Booking Solution.."
          />
          <meta name="author" content="Book24" />
          <title>
            Book24 | Premium directory of hotels, tours, events, rentals and
            many more.
          </title>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link href="css/bootstrap.min.css" rel="stylesheet" />
          <link href="css/style.css" rel="stylesheet" />
          <link href="css/vendors.css" rel="stylesheet" />
          <link href="css/custom.css" rel="stylesheet" />
          <link rel="stylesheet" href="css/bootstrap-select.min.css"/>
    <link rel="stylesheet" href="css/line-awesome.css"/>
    <link rel="stylesheet" href="css/owl.carousel.min.css"/>
    <link rel="stylesheet" href="css/owl.theme.default.min.css"/>
    <link rel="stylesheet" href="css/jquery.fancybox.min.css"/>
    <link rel="stylesheet" href="css/daterangepicker.css"/>
    <link rel="stylesheet" href="css/animate.min.css"/>
    <link rel="stylesheet" href="css/animated-headline.css"/>
    <link rel="stylesheet" href="css/jquery-ui.css"/>
    <link rel="stylesheet" href="css/jquery.filer.css"/>
    <link rel="stylesheet" href="css/flag-icon.min.css" />
        </Head>
        <div id="page">
              {/* start cssload-loader */}
      
          <DetailsHeader makeBlue={true}/>
  {/* ================================
    START BREADCRUMB AREA
================================= */}
<section className="breadcrumb-area bread-bg-9">
          <div className="breadcrumb-wrap">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="breadcrumb-content">
                    <div className="section-heading">
                      <h2 className="sec__title">Our Services</h2>
                    </div>
                  </div>{/* end breadcrumb-content */}
                </div>{/* end col-lg-6 */}
                <div className="col-lg-6">
                  <div className="breadcrumb-list">
                    <ul className="list-items d-flex justify-content-end">
                      <li><a href="index.html">Home</a></li>
                      <li>Pages</li>
                      <li>Our Services</li>
                    </ul>
                  </div>{/* end breadcrumb-list */}
                </div>{/* end col-lg-6 */}
              </div>{/* end row */}
            </div>{/* end container */}
          </div>{/* end breadcrumb-wrap */}
          <div className="bread-svg-box">
            <svg className="bread-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none"><polygon points="100 0 50 10 0 0 0 10 100 10" /></svg>
          </div>{/* end bread-svg */}
        </section>{/* end breadcrumb-area */}
        {/* ================================
    END BREADCRUMB AREA
================================= */}
        {/* ================================
    START SERVICE AREA
================================= */}
        <section className="service-area section--padding text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-heading text-center">
                  <h2 className="sec__title">Services We Provide</h2>
                </div>{/* end section-heading */}
              </div>{/* end col-lg-12 */}
            </div>{/* end row */}
            <div className="row padding-top-80px">
              <div className="col-lg-3 responsive-column">
                <div className="icon-box icon-layout-4">
                  <div className="info-icon">
                    <i className="la la-plane" />
                  </div>{/* end info-icon*/}
                  <div className="info-content">
                    <h4 className="info__title"><a href="https://book24.ng/flight">Flight Deals</a></h4>
                    <p className="info__desc">
                      Best Flight Deals
                    </p>
                  </div>{/* end info-content */}
                </div>{/* end icon-box */}
              </div>{/* end col-lg-3 */}
              <div className="col-lg-3 responsive-column">
                <div className="icon-box icon-layout-4">
                  <div className="info-icon">
                    <i className="la la-anchor" />
                  </div>{/* end info-icon*/}
                  <div className="info-content">
                    <h4 className="info__title"><a href="https://book24.ng/tour">Amazing Tour</a></h4>
                    <p className="info__desc">
                      Book Tours in Nigeria
                    </p>
                  </div>{/* end info-content */}
                </div>{/* end icon-box */}
              </div>{/* end col-lg-3 */}
              <div className="col-lg-3 responsive-column">
                <div className="icon-box icon-layout-4">
                  <div className="info-icon">
                    <i className="la la-support" />
                  </div>{/* end info-icon*/}
                  <div className="info-content">
                    <h4 className="info__title"><a href="https://book24.ng/activity">Activity</a></h4>
                    <p className="info__desc">
                      View Things to do in Nigeria 
                    </p>
                  </div>{/* end info-content */}
                </div>{/* end icon-box */}
              </div>{/* end col-lg-3 */}
              <div className="col-lg-3 responsive-column">
                <div className="icon-box icon-layout-4">
                  <div className="info-icon">
                    <i className="la la-briefcase" />
                  </div>{/* end info-icon*/}
                  <div className="info-content">
                    <h4 className="info__title"><a href="https://book24.ng/rental">Rentals</a></h4>
                    <p className="info__desc">
                      Book rental properties
                    </p>
                  </div>{/* end info-content */}
                </div>{/* end icon-box */}
              </div>{/* end col-lg-3 */}
              <div className="col-lg-3 responsive-column">
                <div className="icon-box icon-layout-4">
                  <div className="info-icon">
                    <i className="la la-hotel" />
                  </div>{/* end info-icon*/}
                  <div className="info-content">
                    <h4 className="info__title"><a href="https://book24.ng/hotel">Hotels</a></h4>
                    <p className="info__desc">
                      Book all hotels in Nigeria
                    </p>
                  </div>{/* end info-content */}
                </div>{/* end icon-box */}
              </div>{/* end col-lg-3 */}
              <div className="col-lg-3 responsive-column">
                <div className="icon-box icon-layout-4">
                  <div className="info-icon">
                    <i className="la la-user-secret" />
                  </div>{/* end info-icon*/}
                  <div className="info-content">
                    <h4 className="info__title"><a href="https://book24.ng/events">Events</a></h4>
                    <p className="info__desc">
                      Book Events in Nigeria
                    </p>
                  </div>{/* end info-content */}
                </div>{/* end icon-box */}
              </div>{/* end col-lg-3 */}
              <div className="col-lg-3 responsive-column">
                <div className="icon-box icon-layout-4">
                  <div className="info-icon">
                    <i className="la la-map" />
                  </div>{/* end info-icon*/}
                  <div className="info-content">
                    <h4 className="info__title"><a href="https://book24.ng/car">Car</a></h4>
                    <p className="info__desc">
                      Rent Cars in Nigeria
                    </p>
                  </div>{/* end info-content */}
                </div>{/* end icon-box */}
              </div>{/* end col-lg-3 */}
              <div className="col-lg-3 responsive-column">
                <div className="icon-box icon-layout-4">
                  <div className="info-icon">
                    <i className="la la-thumbs-up" />
                  </div>{/* end info-icon*/}
                  <div className="info-content">
                    <h4 className="info__title"><a href="https://book24.ng/contact">Customer Service</a></h4>
                    <p className="info__desc">
                      24/7 Customer Support 
                    </p>
                  </div>{/* end info-content */}
                </div>{/* end icon-box */}
              </div>{/* end col-lg-3 */}
            </div>{/* end row */}
            <div className="row">
              <div className="col-lg-12">
                <div className="tab-content-info mt-n4 d-flex justify-content-between align-items-center">
                  <p className="font-size-15">Do not hesitate to contact us for better help and service.</p>
                  <a href="contact.html" className="btn-text font-size-15">Contact us <i className="la la-arrow-right ml-1" /></a>
                </div>{/* end tab-content-info */}
              </div>
            </div>
          </div>{/* end container */}
        </section>{/* end service-area */}
        {/* ================================
    END SERVICE AREA
================================= */}
        
        {/* ================================
    START CTA AREA
================================= */}
        <section className="cta-area subscriber-area section-bg-2 padding-top-60px padding-bottom-60px">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="section-heading">
                  <h2 className="sec__title font-size-30 text-white">Subscribe to Get Updates &amp; Offers</h2>
                </div>{/* end section-heading */}
              </div>{/* end col-lg-7 */}
              <div className="col-lg-5">
                <div className="subscriber-box">
                  <div className="contact-form-action">
                    <form action="#">
                      <div className="input-box">
                        <label className="label-text text-white">Enter email address</label>
                        <div className="form-group mb-0">
                          <span className="la la-envelope form-icon" />
                          <input className="form-control" type="email" name="email" placeholder="Email address" />
                          <button className="theme-btn theme-btn-small submit-btn" type="submit">Subscribe</button>
                          <span className="font-size-14 pt-1 text-white-50"><i className="la la-lock mr-1" />Don't worry your information is safe with us.</span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>{/* end section-heading */}
              </div>{/* end col-lg-5 */}
            </div>{/* end row */}
          </div>{/* end container */}
        </section>{/* end cta-area */}
        {/* ================================
    END CTA AREA
================================= */}
         <Footer />
        </div>
        <SignInModal />
        <div id="toTop"></div>
        <script src="js/jquery-3.4.1.min.js"></script>
<script src="js/jquery-ui.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/bootstrap-select.min.js"></script>
<script src="js/moment.min.js"></script>
<script src="js/daterangepicker.js"></script>
<script src="js/owl.carousel.min.js"></script>
<script src="js/jquery.fancybox.min.js"></script>
<script src="js/jquery.countTo.min.js"></script>
<script src="js/animated-headline.js"></script>
<script src="js/jquery.filer.min.js"></script>
<script src="js/jquery.ripples-min.js"></script>
<script src="js/quantity-input.js"></script>
{/* <script src="js/copy-text-script.js"></script> */}
{/*<script src="js/navbar-sticky.js"></script>*/}
<script src="js/main.js"></script>
        <script src="js/common_scripts.js"></script>
        <script src="js/functions.js"></script>
        <script src="assets/validate.js"></script>
        <script src="http://maps.googleapis.com/maps/api/js"></script>
        <script src="js/map_single_hotel.js"></script>
        <script src="js/infobox.js"></script>
        <script src="js/input_qty.js"></script>
        <script>{`
	
	`}</script>
        {/* <style global jsx>{`
          body {
            background: #fff;
          }
        `}</style> */}
      </div>
    );
  }
}
export default withRouter(Services);
