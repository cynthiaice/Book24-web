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
import Link from "next/link";

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      token: "",
      bookings: [],
      full_name: "",
    };
  }

  async componentDidMount() {
    let token = await Cookies.get("token");
    if (token == null || token == "") {
      this.setState({ auth: false });
    } else {
      this.setState({ token, auth: true }, () => this.getHotelBookings());
      await this.getUserData(token);
    }
  }
  getHotelBookings = () => {
    this.setState({ loader: true });
    var config = {
      headers: { Authorization: "Bearer " + this.state.token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "hotelBookings", config)
      .then(async (response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          row.type = "Hotel";
          this.setState((prevState) => ({
            bookings: [...prevState.bookings, row],
          }));
        }
        await this.getEventTickets();
      })
      .catch((error) => {
        this.setState({ loader: false });

        //   router.push("/");
        console.log(error);
      });
  };

  getEventTickets = async () => {
    var config = {
      headers: { Authorization: "Bearer " + this.state.token },
      timeout: 20000,
    };
    await axios
      .get(API_URL + "eventTickets", config)
      .then(async (response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          row.type = "Event";
          row.check_in_date = row.event.start_date;
          row.check_out_date = row.event.end_date;
          this.setState((prevState) => ({
            bookings: [...prevState.bookings, row],
          }));
        }
        await this.getTourBookings();
      })
      .catch((error) => {
        //   router.push("/");
        this.setState({ loader: false });

        console.log(error);
      });
  };

  getTourBookings = () => {
    var config = {
      headers: { Authorization: "Bearer " + this.state.token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "tourBookings", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          row.type = "Tour";
          row.check_in_date = row.tour.start_date;
          row.check_out_date = row.tour.end_date;
          this.setState((prevState) => ({
            bookings: [...prevState.bookings, row],
          }));
        }
        this.setState({ loader: false }, () => {
          if (this.state.bookings.length <= 0) {
            //    this.props.router.push("/");
          }
        });
      })
      .catch((error) => {
        this.setState({ loader: false });

        //   router.push("/");
        console.log(error);
      });
  };

  getRentalBookings = () => {
    var config = {
      headers: { Authorization: "Bearer " + this.state.token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "rentalBookings", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          row.type = "Rental";
          row.check_in_date = row.tour.start_date;
          row.check_out_date = row.tour.end_date;
          this.setState((prevState) => ({
            bookings: [...prevState.bookings, row],
          }));
        }
        this.setState({ loader: false }, () => {
          if (this.state.bookings.length <= 0) {
            this.props.router.push("/");
          }
        });
      })
      .catch((error) => {
        this.setState({ loader: false });

        //   router.push("/");
        console.log(error);
      });
  };
  getUserData = (token) => {
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "me", config)
      .then((response) => {
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        let res = response.data;
        this.setState({
          pageLoading: false,
          full_name: res.full_name,
          email: res.email,
          mobile_number: res.mobile_number,
        });
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error.response);
      });
  };
  render() {
    const { bookings } = this.state;
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
          <UserAdminSideBar dbActive="page-active" />
          <section className="dashboard-area">
            <UserAdminHeader />
            <div className="dashboard-content-wrap">
              <div className="dashboard-bread">
                <div className="container-fluid">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="breadcrumb-content">
                        <div className="section-heading">
                          <h2 className="sec__title font-size-30">
                            Hi, {this.state.full_name} Welcome Back!
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
                          <li>Pages</li>
                          <li>User Dashboard</li>
                        </ul>
                      </div>
                      {/* end breadcrumb-list */}
                    </div>
                    {/* end col-lg-6 */}
                  </div>
                  {/* end row */}
                  <div className="row mt-4">
                    <div className="col-lg-3 responsive-column-m">
                      <div className="icon-box icon-layout-2 dashboard-icon-box">
                        <div className="d-flex">
                          <div className="info-icon icon-element flex-shrink-0">
                            <i className="la la-shopping-cart" />
                          </div>
                          {/* end info-icon*/}
                          <Link href="user-dashboard-booking">
                            <div
                              className="info-content"
                              style={{ cursor: "pointer" }}
                            >
                              <p className="info__desc">Total Booking</p>
                              <h4 className="info__title">{bookings.length}</h4>
                            </div>
                          </Link>
                          {/* end info-content */}
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-3 */}
                    <div className="col-lg-3 responsive-column-m">
                      <div className="icon-box icon-layout-2 dashboard-icon-box">
                        <div className="d-flex">
                          <div className="info-icon icon-element bg-2 flex-shrink-0">
                            <i className="la la-bookmark" />
                          </div>
                          {/* end info-icon*/}
                          <Link href="user-dashboard-wishlist">
                            <div
                              className="info-content"
                              style={{ cursor: "pointer" }}
                            >
                              <p className="info__desc">Wishlist</p>
                              <h4 className="info__title">15</h4>
                            </div>
                          </Link>
                          {/* end info-content */}
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-3 */}
                    <div className="col-lg-3 responsive-column-m">
                      <div className="icon-box icon-layout-2 dashboard-icon-box">
                        <div className="d-flex">
                          <div className="info-icon icon-element bg-3 flex-shrink-0">
                            <i className="la la-plane" />
                          </div>
                          {/* end info-icon*/}
                          <div
                            className="info-content"
                            style={{ cursor: "pointer" }}
                          >
                            <p className="info__desc">Total Travel</p>
                            <h4 className="info__title">25</h4>
                          </div>
                          {/* end info-content */}
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-3 */}
                    <div className="col-lg-3 responsive-column-m">
                      <div className="icon-box icon-layout-2 dashboard-icon-box">
                        <div className="d-flex">
                          <div className="info-icon icon-element bg-4 flex-shrink-0">
                            <i className="la la-star" />
                          </div>
                          {/* end info-icon*/}
                          <div
                            className="info-content"
                            style={{ cursor: "pointer" }}
                          >
                            <p className="info__desc">Reviews</p>
                            <h4 className="info__title">20</h4>
                          </div>
                          {/* end info-content */}
                        </div>
                      </div>
                    </div>
                    {/* end col-lg-3 */}
                  </div>
                  {/* end row */}
                </div>
              </div>
              {/* end dashboard-bread */}
              <div className="dashboard-main-content">
                <div className="container-fluid">
                  <div className="row">
                    {/* <div className="col-lg-6 responsive-column--m">
                      <div className="form-box">
                        <div className="form-title-wrap">
                          <h3 className="title">Statics Results</h3>
                        </div>
                        <div className="form-content">
                          <canvas id="bar-chart" />
                        </div>
                      </div>
                      {/* end form-box 
                    </div> */}
                    {/* end col-lg-6 */}
                    <div className="col-lg-12 responsive-column--m">
                      <div className="form-box dashboard-card">
                        <div className="form-title-wrap">
                          <div className="d-flex justify-content-between align-items-center">
                            <h3 className="title">Notifications</h3>
                            <button
                              type="button"
                              className="icon-element mark-as-read-btn ml-auto mr-0"
                              data-toggle="tooltip"
                              data-placement="left"
                              title="Mark all as read"
                            >
                              <i className="la la-check-square" />
                            </button>
                          </div>
                        </div>
                        <div className="form-content p-0">
                          <div className="list-group drop-reveal-list">
                            <a
                              href="#"
                              className="list-group-item list-group-item-action border-top-0"
                            >
                              <div className="msg-body d-flex align-items-center">
                                <div className="icon-element flex-shrink-0 mr-3 ml-0">
                                  <i className="la la-bell" />
                                </div>
                                <div className="msg-content w-100">
                                  <h3 className="title pb-1">
                                    Group Trip - Available
                                  </h3>
                                  <p className="msg-text">2 min ago</p>
                                </div>
                                <span
                                  className="icon-element mark-as-read-btn flex-shrink-0 ml-auto mr-0"
                                  data-toggle="tooltip"
                                  data-placement="left"
                                  title="Mark as read"
                                >
                                  <i className="la la-check-square" />
                                </span>
                              </div>
                              {/* end msg-body */}
                            </a>
                            <a
                              href="#"
                              className="list-group-item list-group-item-action"
                            >
                              <div className="msg-body d-flex align-items-center">
                                <div className="icon-element bg-1 flex-shrink-0 mr-3 ml-0">
                                  <i className="la la-bell" />
                                </div>
                                <div className="msg-content w-100">
                                  <h3 className="title pb-1">
                                    50% Discount Offer
                                  </h3>
                                  <p className="msg-text">2 min ago</p>
                                </div>
                                <span
                                  className="icon-element mark-as-read-btn flex-shrink-0 ml-auto mr-0"
                                  data-toggle="tooltip"
                                  data-placement="left"
                                  title="Mark as read"
                                >
                                  <i className="la la-check-square" />
                                </span>
                              </div>
                              {/* end msg-body */}
                            </a>
                            <a
                              href="#"
                              className="list-group-item list-group-item-action"
                            >
                              <div className="msg-body d-flex align-items-center">
                                <div className="icon-element bg-2 flex-shrink-0 mr-3 ml-0">
                                  <i className="la la-check" />
                                </div>
                                <div className="msg-content w-100">
                                  <h3 className="title pb-1">
                                    Your account has been created
                                  </h3>
                                  <p className="msg-text">1 day ago</p>
                                </div>
                                <span
                                  className="icon-element mark-as-read-btn flex-shrink-0 ml-auto mr-0"
                                  data-toggle="tooltip"
                                  data-placement="left"
                                  title="Mark as read"
                                >
                                  <i className="la la-check-square" />
                                </span>
                              </div>
                              {/* end msg-body */}
                            </a>
                            <a
                              href="#"
                              className="list-group-item list-group-item-action"
                            >
                              <div className="msg-body d-flex align-items-center">
                                <div className="icon-element bg-3 flex-shrink-0 mr-3 ml-0">
                                  <i className="la la-user" />
                                </div>
                                <div className="msg-content w-100">
                                  <h3 className="title pb-1">
                                    Your account updated
                                  </h3>
                                  <p className="msg-text">2 hrs ago</p>
                                </div>
                                <span
                                  className="icon-element mark-as-read-btn flex-shrink-0 ml-auto mr-0"
                                  data-toggle="tooltip"
                                  data-placement="left"
                                  title="Mark as read"
                                >
                                  <i className="la la-check-square" />
                                </span>
                              </div>
                              {/* end msg-body */}
                            </a>
                            <a
                              href="#"
                              className="list-group-item list-group-item-action"
                            >
                              <div className="msg-body d-flex align-items-center">
                                <div className="icon-element bg-4 flex-shrink-0 mr-3 ml-0">
                                  <i className="la la-lock" />
                                </div>
                                <div className="msg-content w-100">
                                  <h3 className="title pb-1">
                                    Your password changed
                                  </h3>
                                  <p className="msg-text">Yesterday</p>
                                </div>
                                <span
                                  className="icon-element mark-as-read-btn flex-shrink-0 ml-auto mr-0"
                                  data-toggle="tooltip"
                                  data-placement="left"
                                  title="Mark as read"
                                >
                                  <i className="la la-check-square" />
                                </span>
                              </div>
                              {/* end msg-body */}
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* end form-box */}
                    </div>
                    {/* end col-lg-6 */}
                    {/* <div className="col-lg-6 responsive-column--m">
                      <div className="form-box dashboard-card">
                        <div className="form-title-wrap">
                          <h3 className="title">Tasks</h3>
                        </div>
                        <div className="form-content">
                          <div
                            className="alert alert-success alert-dismissible fade show"
                            role="alert"
                          >
                            <i className="la la-check mr-2" />
                            Your booking{" "}
                            <a href="#" className="alert-link">
                              Shimla to Goa
                            </a>{" "}
                            has been done!
                            <button
                              type="button"
                              className="close"
                              data-dismiss="alert"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div
                            className="alert alert-success alert-dismissible fade show"
                            role="alert"
                          >
                            <i className="la la-check mr-2" />
                            Sent Email to <strong>dev@gmail.com</strong>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="alert"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div
                            className="alert alert-success alert-dismissible fade show"
                            role="alert"
                          >
                            <i className="la la-check mr-2" />
                            Received Email from{" "}
                            <strong>tripstar@yahoo.com</strong>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="alert"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div
                            className="alert alert-success alert-dismissible fade show"
                            role="alert"
                          >
                            <i className="la la-check mr-2" />
                            your payment is pending for{" "}
                            <a href="#" className="alert-link">
                              Manali
                            </a>{" "}
                            Trip tour!
                            <button
                              type="button"
                              className="close"
                              data-dismiss="alert"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div
                            className="alert alert-success alert-dismissible fade show"
                            role="alert"
                          >
                            <i className="la la-check mr-2" />
                            Someone reply on your comment on{" "}
                            <a href="#" className="alert-link">
                              London Trip
                            </a>{" "}
                            Tour!
                            <button
                              type="button"
                              className="close"
                              data-dismiss="alert"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div
                            className="alert alert-success alert-dismissible fade show"
                            role="alert"
                          >
                            <i className="la la-check mr-2" />
                            You have canceled{" "}
                            <a href="#" className="alert-link">
                              Dubai to london Trip
                            </a>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="alert"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div
                            className="alert alert-success alert-dismissible fade show"
                            role="alert"
                          >
                            <i className="la la-check mr-2" />
                            You have give a review on{" "}
                            <span className="badge badge-warning text-white">
                              4.5
                            </span>{" "}
                            <a href="#" className="alert-link">
                              EnVision Hotel Boston
                            </a>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="alert"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* end form-box 
                    </div> */}
                    {/* end col-lg-6 */}
                    {/* <div className="col-lg-6 responsive-column--m">
                      <div className="form-box dashboard-card order-card border-0">
                        <div className="form-title-wrap">
                          <h3 className="title">Orders</h3>
                        </div>
                        <div className="form-content p-0">
                          <div className="list-group drop-reveal-list">
                            <div className="list-group-item list-group-item-action border-top-0">
                              <div className="msg-body d-flex align-items-center justify-content-between">
                                <div className="msg-content">
                                  <h3 className="title pb-2">
                                    3 - Night Bahamas - Miami Round-Trip
                                  </h3>
                                  <ul className="list-items d-flex align-items-center">
                                    <li className="font-size-14 mr-2">
                                      <span className="badge badge-success py-1 px-2 font-size-13 font-weight-medium">
                                        Paid
                                      </span>
                                    </li>
                                    <li className="font-size-14 mr-2">
                                      Order: #232
                                    </li>
                                    <li className="font-size-14">
                                      Date: 11/05/2019
                                    </li>
                                  </ul>
                                </div>
                                <a
                                  href="#"
                                  className="theme-btn theme-btn-small theme-btn-transparent font-size-13"
                                >
                                  View Invoice
                                </a>
                              </div>
                              {/* end msg-body *
                            </div>
                            <div className="list-group-item list-group-item-action">
                              <div className="msg-body d-flex align-items-center justify-content-between">
                                <div className="msg-content">
                                  <h3 className="title pb-2">
                                    California To Newyork
                                  </h3>
                                  <ul className="list-items d-flex align-items-center">
                                    <li className="font-size-14 mr-2">
                                      <span className="badge badge-danger py-1 px-2 font-size-13 font-weight-medium">
                                        UnPaid
                                      </span>
                                    </li>
                                    <li className="font-size-14 mr-2">
                                      Order: #232
                                    </li>
                                    <li className="font-size-14">
                                      Date: 11/05/2019
                                    </li>
                                  </ul>
                                </div>
                                <a
                                  href="#"
                                  className="theme-btn theme-btn-small theme-btn-transparent font-size-13"
                                >
                                  Finish Payment
                                </a>
                              </div>
                              {/* end msg-body 
                            </div>
                            <div className="list-group-item list-group-item-action">
                              <div className="msg-body d-flex align-items-center justify-content-between">
                                <div className="msg-content">
                                  <h3 className="title pb-2">
                                    Two Hour Walking Tour of Manhattan
                                  </h3>
                                  <ul className="list-items d-flex align-items-center">
                                    <li className="font-size-14 mr-2">
                                      <span className="badge badge-success py-1 px-2 font-size-13 font-weight-medium">
                                        Paid
                                      </span>
                                    </li>
                                    <li className="font-size-14 mr-2">
                                      Order: #232
                                    </li>
                                    <li className="font-size-14">
                                      Date: 11/05/2019
                                    </li>
                                  </ul>
                                </div>
                                <a
                                  href="#"
                                  className="theme-btn theme-btn-small theme-btn-transparent font-size-13"
                                >
                                  View Invoice
                                </a>
                              </div>
                              {/* end msg-body *
                            </div>
                            <div className="list-group-item list-group-item-action">
                              <div className="msg-body d-flex align-items-center justify-content-between">
                                <div className="msg-content">
                                  <h3 className="title pb-2">Dubai to Spain</h3>
                                  <ul className="list-items d-flex align-items-center">
                                    <li className="font-size-14 mr-2">
                                      <span className="badge badge-success py-1 px-2 font-size-13 font-weight-medium">
                                        Paid
                                      </span>
                                    </li>
                                    <li className="font-size-14 mr-2">
                                      Order: #232
                                    </li>
                                    <li className="font-size-14">
                                      Date: 11/05/2019
                                    </li>
                                  </ul>
                                </div>
                                <a
                                  href="#"
                                  className="theme-btn theme-btn-small theme-btn-transparent font-size-13"
                                >
                                  View Invoice
                                </a>
                              </div>
                              {/* end msg-body 
                            </div>
                            <div className="list-group-item list-group-item-action">
                              <div className="msg-body d-flex align-items-center justify-content-between">
                                <div className="msg-content">
                                  <h3 className="title pb-2">
                                    Parian Holiday Villas
                                  </h3>
                                  <ul className="list-items d-flex align-items-center">
                                    <li className="font-size-14 mr-2">
                                      <span className="badge badge-success py-1 px-2 font-size-13 font-weight-medium">
                                        Paid
                                      </span>
                                    </li>
                                    <li className="font-size-14 mr-2">
                                      Order: #232
                                    </li>
                                    <li className="font-size-14">
                                      Date: 11/05/2019
                                    </li>
                                  </ul>
                                </div>
                                <a
                                  href="#"
                                  className="theme-btn theme-btn-small theme-btn-transparent font-size-13"
                                >
                                  View Invoice
                                </a>
                              </div>
                              {/* end msg-body *
                            </div>
                            <div className="list-group-item list-group-item-action">
                              <div className="msg-body d-flex align-items-center justify-content-between">
                                <div className="msg-content">
                                  <h3 className="title pb-2">
                                    Lake Palace Hotel
                                  </h3>
                                  <ul className="list-items d-flex align-items-center">
                                    <li className="font-size-14 mr-2">
                                      <span className="badge badge-success py-1 px-2 font-size-13 font-weight-medium">
                                        Paid
                                      </span>
                                    </li>
                                    <li className="font-size-14 mr-2">
                                      Order: #232
                                    </li>
                                    <li className="font-size-14">
                                      Date: 11/05/2019
                                    </li>
                                  </ul>
                                </div>
                                <a
                                  href="#"
                                  className="theme-btn theme-btn-small theme-btn-transparent font-size-13"
                                >
                                  View Invoice
                                </a>
                              </div>
                              {/* end msg-body 
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* end form-box
                    </div>
                    {/* end col-lg-6 
                    */}
                  </div>
                  {/* end row */}
                  <div className="border-top mt-4" />
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
            </div>
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
export default withRouter(UserDashboard);
