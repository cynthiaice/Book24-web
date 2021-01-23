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

class RoomList extends Component {
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
<section className="breadcrumb-area bread-bg-10">
          <div className="breadcrumb-wrap">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-content text-center">
                    <div className="section-heading">
                      <h2 className="sec__title">Room List</h2>
                    </div>
                    <span className="arrow-blink">
                      <i className="la la-arrow-down" />
                    </span>
                  </div>{/* end breadcrumb-content */}
                </div>{/* end col-lg-12 */}
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
    START CARD AREA
================================= */}
        <section className="card-area section--padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="filter-wrap margin-bottom-40px">
                  <div className="filter-top d-flex align-items-center justify-content-between">
                    <div className="section-tab section-tab-3">
                      <ul className="nav nav-tabs" id="myTab4" role="tablist">
                        <li className="nav-item">
                          <a className="nav-link active" id="all-tab" data-toggle="tab" href="#all" role="tab" aria-controls="all" aria-selected="false">
                            All
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" id="dorm-beds-tab" data-toggle="tab" href="#Single-rooms" role="tab" aria-controls="single-rooms" aria-selected="false">
                            Single Rooms
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" id="double-rooms" data-toggle="tab" href="#double-rooms" role="tab" aria-controls="double-rooms" aria-selected="false">
                            Double Rooms
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" id="suites-tab" data-toggle="tab" href="#suites" role="tab" aria-controls="suites" aria-selected="false">
                            Suites
                          </a>
                        </li>
                      </ul>
                    </div>{/* end section-tab */}
                    <div className="layout-view d-flex align-items-center">
                      <a href="room-grid.html" data-toggle="tooltip" data-placement="top" title="Grid View"><i className="la la-th-large" /></a>
                      <a href="room-list.html" data-toggle="tooltip" data-placement="top" title="List View" className="active"><i className="la la-th-list" /></a>
                    </div>
                  </div>
                </div>{/* end filter-wrap */}
              </div>{/* end col-lg-12 */}
            </div>{/* end row */}
            <div className="tab-content" id="may-tabContent4">
              <div className="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img5.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img29.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img30.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$88.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Premium Lake View Room</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img31.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img32.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img33.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$45.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Standard 2 Bed Male Dorm</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img33.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img32.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img31.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$145.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Deluxe King Bed Private</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img32.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img33.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img31.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$145.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Premium Lake View Suite</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img31.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img32.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img33.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$145.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Superior Room</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                </div>{/* end row */}
              </div>
              <div className="tab-pane fade" id="dorm-beds" role="tabpanel" aria-labelledby="dorm-beds-tab">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img32.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img33.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img31.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$145.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Premium Lake View Suite</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img31.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img32.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img33.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$145.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Superior Room</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img5.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img29.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img30.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$88.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Premium Lake View Room</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img31.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img32.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img33.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$45.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Standard 2 Bed Male Dorm</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img33.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img32.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img31.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$145.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Deluxe King Bed Private</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                </div>{/* end row */}
              </div>
              <div className="tab-pane fade" id="private-room" role="tabpanel" aria-labelledby="private-room-tab">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img5.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img29.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img30.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$88.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Premium Lake View Room</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img31.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img32.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img33.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$45.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Standard 2 Bed Male Dorm</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img33.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img32.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img31.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$145.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Deluxe King Bed Private</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img32.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img33.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img31.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$145.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Premium Lake View Suite</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img31.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img32.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img33.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$145.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Superior Room</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                </div>{/* end row */}
              </div>
              <div className="tab-pane fade" id="suites" role="tabpanel" aria-labelledby="suites-tab">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img31.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img32.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img33.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$45.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Standard 2 Bed Male Dorm</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img33.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img32.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img31.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$145.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Deluxe King Bed Private</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img5.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img29.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img30.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$88.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Premium Lake View Room</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img32.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img33.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img31.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$145.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Premium Lake View Suite</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                  <div className="col-lg-12">
                    <div className="card-item card-item-list room-card">
                      <div className="card-img-carousel carousel-action carousel--action">
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img31.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img32.jpg" alt="hotel-img" />
                          </a>
                        </div>
                        <div className="card-img">
                          <a href="room-details.html" className="d-block">
                            <img src="images/img33.jpg" alt="hotel-img" />
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price pb-2">
                          <p>
                            <span className="price__from">From</span>
                            <span className="price__num">$145.00</span>
                          </p>
                        </div>
                        <h3 className="card-title font-size-26"><a href="room-details.html">Superior Room</a></h3>
                        <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                        <div className="card-attributes pt-3 pb-4">
                          <ul className="d-flex align-items-center">
                            <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                            <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                            <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                          </ul>
                        </div>
                        <div className="card-btn">
                          <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                        </div>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end col-lg-12 */}
                </div>{/* end row */}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="btn-box mt-4 text-center">
                  <button type="button" className="theme-btn"><i className="la la-refresh mr-1" />Load More</button>
                  <p className="font-size-13 pt-2">Showing 1 - 5 of 124 Rooms</p>
                </div>{/* end btn-box */}
              </div>{/* end col-lg-12 */}
            </div>{/* end row */}
          </div>{/* end container */}
        </section>{/* end card-area */}
        {/* ================================
    END CARD AREA
================================= */}
        {/* ================================
    START CHECK AVAILABILITY AREA
================================= */}
        <section className="check-availability-area section-bg section-padding">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="check-availability-content">
                  <div className="section-heading text-center">
                    <h2 className="sec__title">Book Your Stay</h2>
                  </div>{/* end section-heading */}
                  <div className="contact-form-action padding-top-40px">
                    <form action="#">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="input-box">
                            <label className="label-text">Check-in</label>
                            <div className="form-group">
                              <span className="la la-calendar form-icon" />
                              <input className="date-range form-control" type="text" name="daterange-single" defaultValue="04/28/2020" />
                            </div>
                          </div>
                        </div>{/* end col-lg-3 */}
                        <div className="col-lg-3">
                          <div className="input-box">
                            <label className="label-text">Check-out</label>
                            <div className="form-group">
                              <span className="la la-calendar form-icon" />
                              <input className="date-range form-control" type="text" name="daterange-single" defaultValue="04/28/2020" />
                            </div>
                          </div>
                        </div>{/* end col-lg-3 */}
                        <div className="col-lg-3">
                          <div className="input-box">
                            <label className="label-text">Rooms</label>
                            <div className="form-group">
                              <div className="select-contain w-auto">
                                <select className="select-contain-select">
                                  <option value={0}>Select Rooms</option>
                                  <option value={1} selected>1 Room</option>
                                  <option value={2}>2 Rooms</option>
                                  <option value={3}>3 Rooms</option>
                                  <option value={4}>4 Rooms</option>
                                  <option value={5}>5 Rooms</option>
                                  <option value={6}>6 Rooms</option>
                                  <option value={7}>7 Rooms</option>
                                  <option value={8}>8 Rooms</option>
                                  <option value={9}>9 Rooms</option>
                                  <option value={10}>10 Rooms</option>
                                  <option value={11}>11 Rooms</option>
                                  <option value={12}>12 Rooms</option>
                                  <option value={13}>13 Rooms</option>
                                  <option value={14}>14 Rooms</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>{/* end col-lg-3 */}
                        <div className="col-lg-3">
                          <div className="input-box">
                            <label className="label-text">Guests</label>
                            <div className="form-group">
                              <div className="dropdown dropdown-contain">
                                <a className="dropdown-toggle dropdown-btn" href="#" data-toggle="dropdown">
                                  <span>Total Guests <span className="qtyTotal guestTotal">0</span></span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-wrap">
                                  <div className="dropdown-item">
                                    <div className="qty-box d-flex align-items-center justify-content-between">
                                      <label>Adults</label>
                                      <div className="qtyBtn d-flex align-items-center">
                                        <input type="text" name="qtyInput" defaultValue={0} />
                                      </div>
                                    </div>
                                  </div>{/* end dropdown-item */}
                                  <div className="dropdown-item">
                                    <div className="qty-box d-flex align-items-center justify-content-between">
                                      <label>Children <span>2-12 years old</span></label>
                                      <div className="qtyBtn d-flex align-items-center">
                                        <input type="text" name="qtyInput" defaultValue={0} />
                                      </div>
                                    </div>
                                  </div>{/* end dropdown-item */}
                                  <div className="dropdown-item">
                                    <div className="qty-box d-flex align-items-center justify-content-between">
                                      <label>Infants <span>0-2 years old</span></label>
                                      <div className="qtyBtn d-flex align-items-center">
                                        <input type="text" name="qtyInput" defaultValue={0} />
                                      </div>
                                    </div>{/* end qty-box */}
                                  </div>{/* end dropdown-item */}
                                </div>
                              </div>{/* end dropdown */}
                            </div>
                          </div>
                        </div>{/* end col-lg-3 */}
                        <div className="col-lg-12">
                          <div className="btn-box text-center pt-2">
                            <a href="#" className="theme-btn">Check Availability</a>
                          </div>
                        </div>{/* end col-lg-3 */}
                      </div>
                    </form>
                  </div>
                </div>
              </div>{/* end col-lg-12 */}
            </div>{/* end row */}
          </div>{/* end container */}
        </section>{/* end check-availability-area */}
        {/* ================================
    END CHECK AVAILABILITY AREA
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
export default withRouter(RoomList);
