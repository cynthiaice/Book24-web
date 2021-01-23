import Head from "next/head";
import React, { Component } from "react";
import PreLoader from "../components/preloader";
import SubAdminHeader from "../components/subAdminHeader";
import SubAdminSideBar from "../components/subAdminSideBar";
import SubAdminUserCanvasMenu from "../components/subAdminUserCanvasMenu";
import $ from "jquery";
import Cookies from "js-cookie";
import moment from "moment";
import { withRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../components/config.js";

class AdminDashboardSettings extends Component {
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

          <SubAdminUserCanvasMenu />
          <SubAdminSideBar />
          <section className="dashboard-area">
            <SubAdminHeader />
            <div className="dashboard-content-wrap">
              <div className="dashboard-bread dashboard--bread dashboard-bread-2">
                <div className="container-fluid">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="breadcrumb-content">
                        <div className="section-heading">
                          <h2 className="sec__title font-size-30">Settings</h2>
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
                          <li>Settings</li>
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
                    <div className="col-lg-6">
                      <div className="form-box">
                        <div className="form-title-wrap">
                          <h3 className="title">Profile Setting</h3>
                        </div>
                        <div className="form-content">
                          <div className="user-profile-action d-flex align-items-center pb-4">
                            <div className="user-pro-img">
                              <img src="/images/team1.jpg" alt="user-image" />
                            </div>
                            <div className="upload-btn-box">
                              <div className="file-upload-wrap file-upload-wrap-2">
                                <input
                                  type="file"
                                  name="files[]"
                                  className="multi file-upload-input with-preview"
                                  maxLength={1}
                                />
                                <span className="file-upload-text">
                                  <i className="la la-upload mr-2" />
                                  Upload Image
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="contact-form-action">
                            <form action="#">
                              <div className="row">
                                <div className="col-lg-6 responsive-column">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Website Title
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-user form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        defaultValue="Royel travel agency"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-6 */}
                                <div className="col-lg-6 responsive-column">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Email Address
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-envelope form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        defaultValue="royeltravelagency@gmail.com"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-6 */}
                                <div className="col-lg-6 responsive-column">
                                  <div className="input-box">
                                    <label className="label-text">Phone</label>
                                    <div className="form-group">
                                      <span className="la la-phone form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        defaultValue="+ 00 222 44 5678"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-6 */}
                                <div className="col-lg-6 responsive-column">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Address
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-map form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        defaultValue="124/6 Street view, USA"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-6 */}
                                <div className="col-lg-12">
                                  <div className="btn-box">
                                    <button className="theme-btn" type="button">
                                      Save Changes
                                    </button>
                                  </div>
                                </div>
                                {/* end col-lg-12 */}
                              </div>
                              {/* end row */}
                            </form>
                          </div>
                        </div>
                      </div>
                      {/* end form-box */}
                    </div>
                    {/* end col-lg-6 */}
                    <div className="col-lg-6">
                      <div className="form-box">
                        <div className="form-title-wrap">
                          <h3 className="title">Change Email</h3>
                        </div>
                        <div className="form-content">
                          <div className="contact-form-action">
                            <form action="#">
                              <div className="row">
                                <div className="col-lg-12 responsive-column">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Current Email
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-envelope form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Current email"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-12 */}
                                <div className="col-lg-12 responsive-column">
                                  <div className="input-box">
                                    <label className="label-text">
                                      New Email
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-envelope form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="New email"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-12 */}
                                <div className="col-lg-12 responsive-column">
                                  <div className="input-box">
                                    <label className="label-text">
                                      New Email Again
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-envelope form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="New email again"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-12 */}
                                <div className="col-lg-12">
                                  <div className="btn-box">
                                    <button className="theme-btn" type="button">
                                      Change Email
                                    </button>
                                  </div>
                                </div>
                                {/* end col-lg-12 */}
                              </div>
                              {/* end row */}
                            </form>
                          </div>
                        </div>
                      </div>
                      {/* end form-box */}
                    </div>
                    {/* end col-lg-6 */}
                    <div className="col-lg-6">
                      <div className="form-box">
                        <div className="form-title-wrap">
                          <h3 className="title">Change Password</h3>
                        </div>
                        <div className="form-content">
                          <div className="contact-form-action">
                            <form action="#">
                              <div className="row">
                                <div className="col-lg-6 responsive-column">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Current Password
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-lock form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Current password"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-6 */}
                                <div className="col-lg-6 responsive-column">
                                  <div className="input-box">
                                    <label className="label-text">
                                      New Password
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-lock form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="New password"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-6 */}
                                <div className="col-lg-6 responsive-column">
                                  <div className="input-box">
                                    <label className="label-text">
                                      New Password Again
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-lock form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="New password again"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-6 */}
                                <div className="col-lg-12">
                                  <div className="btn-box">
                                    <button className="theme-btn" type="button">
                                      Change Password
                                    </button>
                                  </div>
                                </div>
                                {/* end col-lg-12 */}
                              </div>
                              {/* end row */}
                            </form>
                          </div>
                        </div>
                      </div>
                      {/* end form-box */}
                    </div>
                    {/* end col-lg-6 */}
                    <div className="col-lg-6">
                      <div className="form-box">
                        <div className="form-title-wrap">
                          <h3 className="title">Payment Account Settings</h3>
                        </div>
                        <div className="form-content">
                          <div className="contact-form-action">
                            <form method="post">
                              <div className="row">
                                <div className="col-lg-4 col-sm-4">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Name on Card
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-pencil form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="text"
                                        defaultValue="Amex"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-4 */}
                                <div className="col-lg-4 col-sm-4">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Card Number
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-pencil form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="text"
                                        defaultValue={3275476222500}
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-4 */}
                                <div className="col-lg-4 col-sm-4">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Expiry Month
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-pencil form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="text"
                                        defaultValue="MM"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-4 */}
                                <div className="col-lg-6 col-sm-6">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Expiry Year
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-pencil form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="text"
                                        defaultValue="YY"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-6 */}
                                <div className="col-lg-6 col-sm-6">
                                  <div className="input-box">
                                    <label className="label-text">CVV</label>
                                    <div className="form-group">
                                      <span className="la la-pencil form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="text"
                                        defaultValue="CVV"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-6 */}
                                <div className="col-lg-12">
                                  <div className="btn-box">
                                    <button className="theme-btn" type="submit">
                                      Save Changes
                                    </button>
                                  </div>
                                </div>
                                {/* end col-lg-12 */}
                              </div>
                              {/* end row */}
                            </form>
                          </div>
                        </div>
                      </div>
                      {/* end form-box */}
                    </div>
                    {/* end col-lg-6 */}
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
            {/* end dashboard-content-wrap */}
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
export default withRouter(AdminDashboardSettings);
