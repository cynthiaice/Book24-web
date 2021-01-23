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

class AdminPayments extends Component {
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
          <SubAdminUserSideBar />
          <section className="dashboard-area">
            <SubAdminHeader />
            <div className="dashboard-content-wrap">
              <div className="dashboard-bread dashboard--bread dashboard-bread-2">
                <div className="container-fluid">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="breadcrumb-content">
                        <div className="section-heading">
                          <h2 className="sec__title font-size-30">Payment</h2>
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
                          <li>Payment</li>
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
                          <h3 className="title">Payment Lists</h3>
                          <p className="font-size-14">
                            Showing 1 to 8 of 20 entries
                          </p>
                        </div>
                        <div className="form-content">
                          <div className="table-form table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">No</th>
                                  <th scope="col">Invoice</th>
                                  <th scope="col">Traveler</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Payment Tape</th>
                                  <th scope="col">Payment Date</th>
                                  <th scope="col">Received Status</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">1</th>
                                  <th scope="row">
                                    <a href="#" className="color-text">
                                      51372
                                    </a>
                                  </th>
                                  <td>
                                    <a
                                      href="admin-dashboard-traveler-detail.html"
                                      className="color-text"
                                    >
                                      John Smith
                                    </a>
                                  </td>
                                  <td>$350</td>
                                  <td>PayPal</td>
                                  <td>30/5/2020</td>
                                  <td>
                                    <span className="badge badge-success py-1 px-2">
                                      Ok
                                    </span>
                                  </td>
                                  <td>
                                    <div className="table-content">
                                      <a
                                        href="admin-invoice.html"
                                        className="theme-btn theme-btn-small"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="View"
                                      >
                                        <i className="la la-eye" />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">2</th>
                                  <th scope="row">
                                    <a href="#" className="color-text">
                                      51372
                                    </a>
                                  </th>
                                  <td>
                                    <a
                                      href="admin-dashboard-traveler-detail.html"
                                      className="color-text"
                                    >
                                      Kamran Adi
                                    </a>
                                  </td>
                                  <td>$350</td>
                                  <td>Credit Card</td>
                                  <td>30/5/2020</td>
                                  <td>
                                    <span className="badge badge-success py-1 px-2">
                                      Ok
                                    </span>
                                  </td>
                                  <td>
                                    <div className="table-content">
                                      <a
                                        href="admin-invoice.html"
                                        className="theme-btn theme-btn-small"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="View"
                                      >
                                        <i className="la la-eye" />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">3</th>
                                  <th scope="row">
                                    <a href="#" className="color-text">
                                      51372
                                    </a>
                                  </th>
                                  <td>
                                    <a
                                      href="admin-dashboard-traveler-detail.html"
                                      className="color-text"
                                    >
                                      Amir Hamja
                                    </a>
                                  </td>
                                  <td>$350</td>
                                  <td>Payoneer</td>
                                  <td>30/5/2020</td>
                                  <td>
                                    <span className="badge badge-success py-1 px-2">
                                      Ok
                                    </span>
                                  </td>
                                  <td>
                                    <div className="table-content">
                                      <a
                                        href="admin-invoice.html"
                                        className="theme-btn theme-btn-small"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="View"
                                      >
                                        <i className="la la-eye" />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">4</th>
                                  <th scope="row">
                                    <a href="#" className="color-text">
                                      51372
                                    </a>
                                  </th>
                                  <td>
                                    <a
                                      href="admin-dashboard-traveler-detail.html"
                                      className="color-text"
                                    >
                                      Mike Doe
                                    </a>
                                  </td>
                                  <td>$350</td>
                                  <td>Skrill</td>
                                  <td>30/5/2020</td>
                                  <td>
                                    <span className="badge badge-success py-1 px-2">
                                      Ok
                                    </span>
                                  </td>
                                  <td>
                                    <div className="table-content">
                                      <a
                                        href="admin-invoice.html"
                                        className="theme-btn theme-btn-small"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="View"
                                      >
                                        <i className="la la-eye" />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">5</th>
                                  <th scope="row">
                                    <a href="#" className="color-text">
                                      51372
                                    </a>
                                  </th>
                                  <td>
                                    <a
                                      href="admin-dashboard-traveler-detail.html"
                                      className="color-text"
                                    >
                                      Steve jobs
                                    </a>
                                  </td>
                                  <td>$350</td>
                                  <td>PayPal</td>
                                  <td>30/5/2020</td>
                                  <td>
                                    <span className="badge badge-info py-1 px-2">
                                      On hold
                                    </span>
                                  </td>
                                  <td>
                                    <div className="table-content">
                                      <a
                                        href="admin-invoice.html"
                                        className="theme-btn theme-btn-small"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="View"
                                      >
                                        <i className="la la-eye" />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">6</th>
                                  <th scope="row">
                                    <a href="#" className="color-text">
                                      51372
                                    </a>
                                  </th>
                                  <td>
                                    <a
                                      href="admin-dashboard-traveler-detail.html"
                                      className="color-text"
                                    >
                                      Kevin Martin
                                    </a>
                                  </td>
                                  <td>$350</td>
                                  <td>PayPal</td>
                                  <td>30/5/2020</td>
                                  <td>
                                    <span className="badge badge-warning text-white py-1 px-2">
                                      Pending
                                    </span>
                                  </td>
                                  <td>
                                    <div className="table-content">
                                      <a
                                        href="admin-invoice.html"
                                        className="theme-btn theme-btn-small"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="View"
                                      >
                                        <i className="la la-eye" />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">7</th>
                                  <th scope="row">
                                    <a href="#" className="color-text">
                                      51372
                                    </a>
                                  </th>
                                  <td>
                                    <a
                                      href="admin-dashboard-traveler-detail.html"
                                      className="color-text"
                                    >
                                      Adi Purdila
                                    </a>
                                  </td>
                                  <td>$350</td>
                                  <td>PayPal</td>
                                  <td>30/5/2020</td>
                                  <td>
                                    <span className="badge badge-success py-1 px-2">
                                      Ok
                                    </span>
                                  </td>
                                  <td>
                                    <div className="table-content">
                                      <a
                                        href="admin-invoice.html"
                                        className="theme-btn theme-btn-small"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="View"
                                      >
                                        <i className="la la-eye" />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">8</th>
                                  <th scope="row">
                                    <a href="#" className="color-text">
                                      51372
                                    </a>
                                  </th>
                                  <td>
                                    <a
                                      href="admin-dashboard-traveler-detail.html"
                                      className="color-text"
                                    >
                                      Mark Hardson
                                    </a>
                                  </td>
                                  <td>$350</td>
                                  <td>PayPal</td>
                                  <td>30/5/2020</td>
                                  <td>
                                    <span className="badge badge-success py-1 px-2">
                                      Ok
                                    </span>
                                  </td>
                                  <td>
                                    <div className="table-content">
                                      <a
                                        href="admin-invoice.html"
                                        className="theme-btn theme-btn-small"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="View"
                                      >
                                        <i className="la la-eye" />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
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
                  </div>
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
export default withRouter(AdminPayments);
