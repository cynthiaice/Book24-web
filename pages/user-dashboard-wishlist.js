import Head from "next/head";
import React, { Component } from "react";
import PreLoader from "../components/preloader";
import UserAdminHeader from "../components/userAdminHeader";
import UserAdminSideBar from "../components/userAdminSideBar";
import UserAdminCanvasMenu from "../components/userAdminCanvasMenu";
import $ from "jquery";
import Cookies from "js-cookie";
import moment from "moment";
import { withRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../components/config.js";

class UserDashboardWishlist extends Component {
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
        if (len <= 0) {
          this.props.router.push("/listing");
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
          sub_items:
            type == "hotel"
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
          <link rel="stylesheet" href="css/bootstrap-select.min.css" />
          <link rel="stylesheet" href="css/line-awesome.css" />
          <link rel="stylesheet" href="css/owl.carousel.min.css" />
          <link rel="stylesheet" href="css/owl.theme.default.min.css" />
          <link rel="stylesheet" href="css/jquery.fancybox.min.css" />
          <link rel="stylesheet" href="css/daterangepicker.css" />
          <link rel="stylesheet" href="css/animate.min.css" />
          <link rel="stylesheet" href="css/animated-headline.css" />
          <link rel="stylesheet" href="css/jquery-ui.css" />
          <link rel="stylesheet" href="css/jquery.filer.css" />
          <link rel="stylesheet" href="css/flag-icon.min.css" />
        </Head>
        <div className="section-bg">
          {/* start cssload-loader */}

          <UserAdminCanvasMenu />
          <UserAdminSideBar wishActive="page-active" />
          <section className="dashboard-area">
            <UserAdminHeader />
            <div className="dashboard-content-wrap">
              <div className="dashboard-bread dashboard--bread">
                <div className="container-fluid">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="breadcrumb-content">
                        <div className="section-heading">
                          <h2 className="sec__title font-size-30">
                            My Wishlist
                          </h2>
                        </div>
                      </div>
                      {/* end breadcrumb-content */}
                    </div>
                    {/* end col-lg-6 */}
                    <div className="col-lg-6">
                      <div className="breadcrumb-list">
                        <ul className="list-items d-flex justify-content-end">
                          <li>
                            <a href="index.html" className="text-white">
                              Home
                            </a>
                          </li>
                          <li>Dashboard</li>
                          <li>My Wishlist</li>
                        </ul>
                      </div>
                      {/* end breadcrumb-list */}
                    </div>
                    {/* end col-lg-6 */}
                  </div>
                  {/* end row */}
                </div>
              </div>
              {/* end dashboard-bread */}
              <div className="dashboard-main-content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-box">
                        <div className="form-title-wrap">
                          <h3 className="title">Wishlist</h3>
                          <p className="font-size-14">
                            Showing 1 - 6 of 28 results
                          </p>
                        </div>
                        <div className="form-content pt-5 pb-0">
                          <div className="row">
                            <div className="col-lg-4 responsive-column">
                              <div className="card-item">
                                <div className="card-img">
                                  <a
                                    href="hotel-single.html"
                                    className="d-block"
                                  >
                                    <img
                                      src="images/img1.jpg"
                                      alt="hotel-img"
                                    />
                                  </a>
                                  <span className="badge">Bestseller</span>
                                  <div
                                    className="add-to-wishlist icon-element"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Remove"
                                  >
                                    <i className="la la-heart" />
                                  </div>
                                </div>
                                <div className="card-body">
                                  <h3 className="card-title">
                                    <a href="hotel-single.html">
                                      The Millennium Hilton New York
                                    </a>
                                  </h3>
                                  <p className="card-meta">
                                    124 E Huron St, New york
                                  </p>
                                  <div className="card-rating">
                                    <span className="badge text-white">
                                      4.4/5
                                    </span>
                                    <span className="review__text">
                                      Average
                                    </span>
                                    <span className="rating__text">
                                      (30 Reviews)
                                    </span>
                                  </div>
                                  <div className="card-price d-flex align-items-center justify-content-between">
                                    <p>
                                      <span className="price__from">From</span>
                                      <span className="price__num">$88.00</span>
                                      <span className="price__text">
                                        Per night
                                      </span>
                                    </p>
                                    <a
                                      href="hotel-single.html"
                                      className="btn-text"
                                    >
                                      See details
                                      <i className="la la-angle-right" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                              {/* end card-item */}
                            </div>
                            {/* end col-lg-4 */}
                            <div className="col-lg-4 responsive-column">
                              <div className="card-item car-card">
                                <div className="card-img">
                                  <a href="car-single.html" className="d-block">
                                    <img
                                      src="images/car-img.png"
                                      alt="car-img"
                                    />
                                  </a>
                                  <span className="badge">Bestseller</span>
                                  <div
                                    className="add-to-wishlist icon-element"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Remove"
                                  >
                                    <i className="la la-heart" />
                                  </div>
                                </div>
                                <div className="card-body">
                                  <p className="card-meta">Compact SUV</p>
                                  <h3 className="card-title">
                                    <a href="car-single.html">
                                      Toyota Corolla or Similar
                                    </a>
                                  </h3>
                                  <div className="card-rating">
                                    <span className="badge text-white">
                                      4.4/5
                                    </span>
                                    <span className="review__text">
                                      Average
                                    </span>
                                    <span className="rating__text">
                                      (30 Reviews)
                                    </span>
                                  </div>
                                  <div className="card-attributes">
                                    <ul className="d-flex align-items-center">
                                      <li
                                        className="d-flex align-items-center"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Passenger"
                                      >
                                        <i className="la la-users" />
                                        <span>4</span>
                                      </li>
                                      <li
                                        className="d-flex align-items-center"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Luggage"
                                      >
                                        <i className="la la-suitcase" />
                                        <span>1</span>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="card-price d-flex align-items-center justify-content-between">
                                    <p>
                                      <span className="price__from">From</span>
                                      <span className="price__num">$23.00</span>
                                      <span className="price__text">
                                        Per day
                                      </span>
                                    </p>
                                    <a
                                      href="car-single.html"
                                      className="btn-text"
                                    >
                                      See details
                                      <i className="la la-angle-right" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                              {/* end card-item */}
                            </div>
                            {/* end col-lg-4 */}
                            <div className="col-lg-4 responsive-column">
                              <div className="card-item ">
                                <div className="card-img">
                                  <a
                                    href="tour-details.html"
                                    className="d-block"
                                  >
                                    <img
                                      src="images/img9.jpg"
                                      alt="Destination-img"
                                    />
                                  </a>
                                  <div
                                    className="add-to-wishlist icon-element"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Remove"
                                  >
                                    <i className="la la-heart" />
                                  </div>
                                </div>
                                <div className="card-body">
                                  <h3 className="card-title">
                                    <a href="tour-details.html">
                                      Empire State Building Admission
                                    </a>
                                  </h3>
                                  <p className="card-meta">
                                    124 E Huron St, New york
                                  </p>
                                  <div className="card-rating">
                                    <span className="badge text-white">
                                      4.4/5
                                    </span>
                                    <span className="review__text">
                                      Average
                                    </span>
                                    <span className="rating__text">
                                      (30 Reviews)
                                    </span>
                                  </div>
                                  <div className="card-price d-flex align-items-center justify-content-between">
                                    <p>
                                      <span className="price__from">From</span>
                                      <span className="price__num">
                                        $124.00
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
                            </div>
                            {/* end col-lg-4 */}
                            <div className="col-lg-4 responsive-column">
                              <div className="card-item">
                                <div className="card-img">
                                  <a
                                    href="hotel-single.html"
                                    className="d-block"
                                  >
                                    <img
                                      src="images/img1.jpg"
                                      alt="hotel-img"
                                    />
                                  </a>
                                  <span className="badge">Bestseller</span>
                                  <div
                                    className="add-to-wishlist icon-element"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Remove"
                                  >
                                    <i className="la la-heart" />
                                  </div>
                                </div>
                                <div className="card-body">
                                  <h3 className="card-title">
                                    <a href="hotel-single.html">
                                      The Millennium Hilton New York
                                    </a>
                                  </h3>
                                  <p className="card-meta">
                                    124 E Huron St, New york
                                  </p>
                                  <div className="card-rating">
                                    <span className="badge text-white">
                                      4.4/5
                                    </span>
                                    <span className="review__text">
                                      Average
                                    </span>
                                    <span className="rating__text">
                                      (30 Reviews)
                                    </span>
                                  </div>
                                  <div className="card-price d-flex align-items-center justify-content-between">
                                    <p>
                                      <span className="price__from">From</span>
                                      <span className="price__num">$88.00</span>
                                      <span className="price__text">
                                        Per night
                                      </span>
                                    </p>
                                    <a
                                      href="hotel-single.html"
                                      className="btn-text"
                                    >
                                      See details
                                      <i className="la la-angle-right" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                              {/* end card-item */}
                            </div>
                            {/* end col-lg-4 */}
                            <div className="col-lg-4 responsive-column">
                              <div className="card-item car-card">
                                <div className="card-img">
                                  <a href="car-single.html" className="d-block">
                                    <img
                                      src="images/car-img.png"
                                      alt="car-img"
                                    />
                                  </a>
                                  <span className="badge">Bestseller</span>
                                  <div
                                    className="add-to-wishlist icon-element"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Remove"
                                  >
                                    <i className="la la-heart" />
                                  </div>
                                </div>
                                <div className="card-body">
                                  <p className="card-meta">Compact SUV</p>
                                  <h3 className="card-title">
                                    <a href="car-single.html">
                                      Toyota Corolla or Similar
                                    </a>
                                  </h3>
                                  <div className="card-rating">
                                    <span className="badge text-white">
                                      4.4/5
                                    </span>
                                    <span className="review__text">
                                      Average
                                    </span>
                                    <span className="rating__text">
                                      (30 Reviews)
                                    </span>
                                  </div>
                                  <div className="card-attributes">
                                    <ul className="d-flex align-items-center">
                                      <li
                                        className="d-flex align-items-center"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Passenger"
                                      >
                                        <i className="la la-users" />
                                        <span>4</span>
                                      </li>
                                      <li
                                        className="d-flex align-items-center"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Luggage"
                                      >
                                        <i className="la la-suitcase" />
                                        <span>1</span>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="card-price d-flex align-items-center justify-content-between">
                                    <p>
                                      <span className="price__from">From</span>
                                      <span className="price__num">$23.00</span>
                                      <span className="price__text">
                                        Per day
                                      </span>
                                    </p>
                                    <a
                                      href="car-single.html"
                                      className="btn-text"
                                    >
                                      See details
                                      <i className="la la-angle-right" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                              {/* end card-item */}
                            </div>
                            {/* end col-lg-4 */}
                            <div className="col-lg-4 responsive-column">
                              <div className="card-item ">
                                <div className="card-img">
                                  <a
                                    href="tour-details.html"
                                    className="d-block"
                                  >
                                    <img
                                      src="images/img9.jpg"
                                      alt="Destination-img"
                                    />
                                  </a>
                                  <div
                                    className="add-to-wishlist icon-element"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Remove"
                                  >
                                    <i className="la la-heart" />
                                  </div>
                                </div>
                                <div className="card-body">
                                  <h3 className="card-title">
                                    <a href="tour-details.html">
                                      Empire State Building Admission
                                    </a>
                                  </h3>
                                  <p className="card-meta">
                                    124 E Huron St, New york
                                  </p>
                                  <div className="card-rating">
                                    <span className="badge text-white">
                                      4.4/5
                                    </span>
                                    <span className="review__text">
                                      Average
                                    </span>
                                    <span className="rating__text">
                                      (30 Reviews)
                                    </span>
                                  </div>
                                  <div className="card-price d-flex align-items-center justify-content-between">
                                    <p>
                                      <span className="price__from">From</span>
                                      <span className="price__num">
                                        $124.00
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
                            </div>
                            {/* end col-lg-4 */}
                          </div>
                          {/* end row */}
                        </div>
                      </div>
                      {/* end form-box */}
                    </div>
                    {/* end col-lg-12 */}
                  </div>
                  {/* end row */}
                  <div className="row">
                    <div className="col-lg-12">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <li className="page-item">
                            <a
                              className="page-link page-link-nav"
                              href="#"
                              aria-label="Previous"
                            >
                              <span aria-hidden="true">
                                <i className="la la-angle-left" />
                              </span>
                              <span className="sr-only">Previous</span>
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link page-link-nav" href="#">
                              1
                            </a>
                          </li>
                          <li className="page-item active">
                            <a className="page-link page-link-nav" href="#">
                              2 <span className="sr-only">(current)</span>
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link page-link-nav" href="#">
                              3
                            </a>
                          </li>
                          <li className="page-item">
                            <a
                              className="page-link page-link-nav"
                              href="#"
                              aria-label="Next"
                            >
                              <span aria-hidden="true">
                                <i className="la la-angle-right" />
                              </span>
                              <span className="sr-only">Next</span>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                    {/* end col-lg-12 */}
                  </div>
                  {/* end row */}
                  <div className="border-top mt-5" />
                  <div className="row align-items-center">
                    <div className="col-lg-7">
                      <div className="copy-right padding-top-30px">
                        <p className="copy__desc">
                          © Copyright Book24 2020.
                          <a href="https://themeforest.net/user//portfolio"></a>
                        </p>
                      </div>
                      {/* end copy-right */}
                    </div>
                    {/* end col-lg-7 */}
                    <div className="col-lg-5">
                      <div className="copy-right-content text-right padding-top-30px">
                        <ul className="social-profile">
                          <li>
                            <a href="#">
                              <i className="lab la-facebook-f" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="lab la-twitter" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="lab la-instagram" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="lab la-linkedin-in" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* end copy-right-content */}
                    </div>
                    {/* end col-lg-5 */}
                  </div>
                  {/* end row */}
                </div>
                {/* end container-fluid */}
              </div>
              {/* end dashboard-main-content */}
            </div>{" "}
          </section>
          {/* end dashboard-area */}
        </div>
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
export default withRouter(UserDashboardWishlist);
