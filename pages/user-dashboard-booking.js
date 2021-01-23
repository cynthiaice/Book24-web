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

class UserDashboardBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      token: "",
      loader: false,
      bookings: [],
    };
  }

  async componentDidMount() {
    let token = await Cookies.get("token");
    if (token == null || token == "") {
      this.setState({ auth: false });
    } else {
      this.setState({ token, auth: true }, () => this.getHotelBookings());
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
          <UserAdminSideBar bookActive="page-active" />
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
                            My Booking
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
                          <li>My Booking</li>
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
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h3 className="title">Booking Results</h3>
                              <p className="font-size-14">
                                Showing 1 to {bookings.length} of
                                {bookings.length} entries
                              </p>
                            </div>
                            <span>
                              Total Bookings
                              <strong className="color-text">
                                ({bookings.length})
                              </strong>
                            </span>
                          </div>
                        </div>
                        <div className="form-content">
                          <div className="table-form table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">Type</th>
                                  <th scope="col">Payment Reference</th>
                                  {/* <th scope="col">Location</th> */}
                                  <th scope="col">Order Date</th>
                                  <th scope="col">Execution Date</th>
                                  {/* <th scope="col">Price</th> */}
                                  <th scope="col">Status</th>
                                  {/* <th scope="col">Action</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {bookings.map((item, i) => {
                                  let type = item.type;
                                  let paid = item.paid;
                                  let icon =
                                    type === "Hotel"
                                      ? "la-building"
                                      : type === "Tour"
                                      ? "la-tree"
                                      : type === "Event"
                                      ? "la-tent"
                                      : "la-plane";
                                  let badge = paid
                                    ? "badge-success"
                                    : "badge-info";
                                  return (
                                    <tr>
                                      <th scope="row">
                                        <i
                                          className={`la mr-1 font-size-18 ${icon}`}
                                        />
                                        {type}
                                      </th>
                                      <td>
                                        <div className="table-content">
                                          <h3 className="title">
                                            {item.payment_reference}
                                          </h3>
                                        </div>
                                      </td>
                                      {/* <td>New York City</td> */}
                                      <td>
                                        {item.createdAt && item.createdAt}
                                      </td>
                                      <td>
                                        {item.check_in_date &&
                                          item.check_in_date}
                                      </td>
                                      {/* <td>$350</td> */}
                                      <td>
                                        <span
                                          className={`badge py-1 px-2 ${badge}`}
                                        >
                                          {paid ? "Paid" : "Pending"}
                                        </span>
                                      </td>
                                      {/* <td>
                                        <div className="table-content">
                                          <button className="theme-btn theme-btn-small">
                                            Cancel
                                          </button>
                                        </div>
                                      </td> */}
                                    </tr>
                                  );
                                })}
                                {/* Table start */}

                                {/* Table end */}
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
export default withRouter(UserDashboardBooking);
