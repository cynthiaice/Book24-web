import Head from "../components/DashboardHead";
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
import Link from "next/link";

class AdminDashboard extends Component {
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
      bookings: [],
      users: [],
      hotelRevenue: "",
      carRevenue: "",
      cruiseRevenue: "",
      flightRevenue: "",
      eventRevenue: "",
      tourRevenue: "",
    };
  }

  async componentDidMount() {
    let token = await Cookies.get("token");
    if (token == null || token == "") {
      this.setState({ auth: false });
    } else {
      this.setState({ token }, () => this.getHotelBookings());
      await this.getUsers();
      this.setState({ auth: true });
    }
  }

  getHotelBookings = () => {
    this.setState({ loader: true });
    var config = {
      headers: { Authorization: "Bearer " + this.state.token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "hotelBookings-admin", config)
      .then(async (response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        let rev = 0;
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          row.type = "hotel";
          rev = parseFloat(rev) + parseFloat(row.price);
          this.setState((prevState) => ({
            bookings: [...prevState.bookings, row],
          }));
        }
        this.setState({ hotelRevenue: rev });
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
      .get(API_URL + "eventTickets-admin", config)
      .then(async (response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        let rev = 0;
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          row.type = "event";

          row.check_in_date = row.event.start_date;
          row.check_out_date = row.event.end_date;
          rev = parseFloat(rev) + parseFloat(row.price);
          this.setState((prevState) => ({
            bookings: [...prevState.bookings, row],
          }));
        }
        this.setState({ eventRevenue: rev });
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
      .get(API_URL + "tourBookings-admin", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        let rev = 0;
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          row.type = "tour";
          row.check_in_date = row.tour.start_date;
          row.check_out_date = row.tour.end_date;
          rev = parseFloat(rev) + parseFloat(row.price);
          this.setState((prevState) => ({
            bookings: [...prevState.bookings, row],
          }));
        }
        this.setState({ tourRevenue: rev });
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
      .get(API_URL + "rentalBookings-admin", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          row.type = "rental";
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
  getUsers = () => {
    this.setState({ loader: true });
    var config = {
      headers: { Authorization: "Bearer " + this.state.token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "users", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];

          this.setState((prevState) => ({
            users: [...prevState.users, row],
          }));
        }
      })
      .catch((error) => {
        this.setState({ loader: false });

        //   router.push("/");
        console.log(error);
      });
  };
  render() {
    const { bookings, hotelRevenue, tourRevenue, eventRevenue } = this.state;
    return (
      <div>
        <Head />

        <div className="section-bg">
          {/* start cssload-loader */}

          <SubAdminUserCanvasMenu />
          <SubAdminSideBar dbActive="page-active" />
          <section className="dashboard-area">
            <SubAdminHeader />
            <div className="dashboard-content-wrap">
              <div className="dashboard-bread dashboard-bread-2">
                <div className="container-fluid">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="breadcrumb-content">
                        <div className="section-heading">
                          <h2 className="sec__title font-size-30">Dashboard</h2>
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
                          <li>Dashboard</li>
                        </ul>
                      </div>
                      {/* end breadcrumb-list */}
                    </div>
                    {/* end col-lg-6 */}
                  </div>
                  {/* end row */}
                  <div className="row mt-4">
                    <Link href="admin-dashboard-booking">
                      <div className="col-lg-4 responsive-column-l">
                        <div className="icon-box icon-layout-2 dashboard-icon-box pb-0">
                          <div className="d-flex pb-3 justify-content-between">
                            <div className="info-content">
                              <p className="info__desc">Total Booking!</p>
                              <h4 className="info__title">{bookings.length}</h4>
                            </div>
                            {/* end info-content */}
                            <div className="info-icon icon-element bg-4">
                              <i className="la la-shopping-cart" />
                            </div>
                            {/* end info-icon*/}
                          </div>
                          <div className="section-block" />
                          <a
                            href=""
                            className="d-flex align-items-center justify-content-between view-all"
                          >
                            View All <i className="la la-angle-right" />
                          </a>
                        </div>
                      </div>
                    </Link>
                    {/* end col-lg-3 */}
                    <div className="col-lg-4 responsive-column-l">
                      <div className="icon-box icon-layout-2 dashboard-icon-box pb-0">
                        <div className="d-flex pb-3 justify-content-between">
                          <div className="info-content">
                            <p className="info__desc">New Reviews!</p>
                            <h4 className="info__title">22</h4>
                          </div>
                          {/* end info-content */}
                          <div className="info-icon icon-element bg-3">
                            <i className="la la-star" />
                          </div>
                          {/* end info-icon*/}
                        </div>
                        <div className="section-block" />
                        <a
                          href="admin-dashboard-reviews.html"
                          className="d-flex align-items-center justify-content-between view-all"
                        >
                          View All <i className="la la-angle-right" />
                        </a>
                      </div>
                    </div>
                    {/* end col-lg-3 */}
                    <Link href="admin-dashboard-users">
                      <div className="col-lg-4 responsive-column-l">
                        <div className="icon-box icon-layout-2 dashboard-icon-box pb-0">
                          <div className="d-flex pb-3 justify-content-between">
                            <div className="info-content">
                              <p className="info__desc">Total Subscribers!</p>
                              <h4 className="info__title">
                                {this.state.users.length}
                              </h4>
                            </div>
                            {/* end info-content */}
                            <div className="info-icon icon-element bg-2">
                              <i className="la la-envelope" />
                            </div>
                            {/* end info-icon*/}
                          </div>
                          <div className="section-block" />
                          <a
                            href="admin-dashboard-subscribers.html"
                            className="d-flex align-items-center justify-content-between view-all"
                          >
                            View All <i className="la la-angle-right" />
                          </a>
                        </div>
                      </div>
                    </Link>
                    {/* end col-lg-3 */}
                    {/* Last card */}
                    {/* end col-lg-3 */}
                  </div>
                  {/* end row */}
                </div>
              </div>
              {/* end dashboard-bread */}
              <div className="dashboard-main-content">
                <div className="container-fluid">
                  <div className="row">
                    {/*                   
                    <div className="col-lg-7 responsive-column--m">
                      <div className="form-box">
                        <div className="form-title-wrap">
                          <div className="d-flex align-items-center justify-content-between">
                            <ul className="chart-pagination d-flex">
                              <li>
                                <a
                                  href="#"
                                  className="theme-btn theme-btn-small mr-2"
                                >
                                  Day
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="theme-btn theme-btn-small theme-btn-transparent mr-2"
                                >
                                  Week
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="theme-btn theme-btn-small theme-btn-transparent"
                                >
                                  This year
                                </a>
                              </li>
                            </ul>
                            <div className="select-contain">
                              <select className="select-contain-select">
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="form-content">
                          <canvas id="line-chart" />
                        </div>
                      </div>
                      {/* end form-box 
                    </div> 
                    {/* end col-lg-7*/}
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
                                  <h3 className="title pb-1">Status updated</h3>
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
                            <a
                              href="#"
                              className="list-group-item list-group-item-action"
                            >
                              <div className="msg-body d-flex align-items-center">
                                <div className="icon-element bg-5 flex-shrink-0 mr-3 ml-0">
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
                          </div>
                        </div>
                      </div>
                      {/* end form-box */}
                    </div>
                    {/* end col-lg-5 */}
                    <div className="col-lg-12">
                      <div className="form-box dashboard-card">
                        <div className="form-title-wrap">
                          <h3 className="title">
                            Sales earning this month for each service
                          </h3>
                        </div>
                        <div className="form-content">
                          <div className="row">
                            <Link href="admin-dashboard-hotels">
                              <div className="col-lg-3 responsive-column-l">
                                <div className="icon-box icon-layout-2 dashboard-icon-box dashboard--icon-box bg-1 pb-0">
                                  <div className="d-flex pb-3 justify-content-between">
                                    <div className="info-content">
                                      <p className="info__desc">Hotels</p>
                                      <h4 className="info__title">
                                        {"₦" + hotelRevenue.toLocaleString()}
                                      </h4>
                                    </div>
                                    {/* end info-content */}
                                    <div className="info-icon icon-element bg-white text-color-2">
                                      <i className="la la-hotel" />
                                    </div>
                                    {/* end info-icon*/}
                                  </div>
                                  <div className="section-block" />
                                  <a
                                    href="#"
                                    className="d-flex align-items-center justify-content-between view-all"
                                  >
                                    View Details
                                    <i className="la la-arrow-right" />
                                  </a>
                                </div>
                              </div>
                            </Link>
                            {/* end col-lg-3 */}
                            <Link href="admin-dashboard-cars">
                              <div className="col-lg-3 responsive-column-l">
                                <div className="icon-box icon-layout-2 dashboard-icon-box dashboard--icon-box bg-2 pb-0">
                                  <div className="d-flex pb-3 justify-content-between">
                                    <div className="info-content">
                                      <p className="info__desc">Cars</p>
                                      <h4 className="info__title">₦0.00</h4>
                                    </div>
                                    {/* end info-content */}
                                    <div className="info-icon icon-element bg-white text-color-3">
                                      <i className="la la-car" />
                                    </div>
                                    {/* end info-icon*/}
                                  </div>
                                  <div className="section-block" />
                                  <a
                                    href="#"
                                    className="d-flex align-items-center justify-content-between view-all"
                                  >
                                    View Details
                                    <i className="la la-arrow-right" />
                                  </a>
                                </div>
                              </div>
                            </Link>
                            {/* end col-lg-3 */}
                            <Link href="admin-dashboard-cruise">
                              <div className="col-lg-3 responsive-column-l">
                                <div className="icon-box icon-layout-2 dashboard-icon-box dashboard--icon-box bg-3 pb-0">
                                  <div className="d-flex pb-3 justify-content-between">
                                    <div className="info-content">
                                      <p className="info__desc">Cruises</p>
                                      <h4 className="info__title">₦0.00</h4>
                                    </div>
                                    {/* end info-content */}
                                    <div className="info-icon icon-element bg-white text-color-4">
                                      <i className="la la-ship" />
                                    </div>
                                    {/* end info-icon*/}
                                  </div>
                                  <div className="section-block" />
                                  <a
                                    href="#"
                                    className="d-flex align-items-center justify-content-between view-all"
                                  >
                                    View Details
                                    <i className="la la-arrow-right" />
                                  </a>
                                </div>
                              </div>
                            </Link>
                            {/* end col-lg-3 */}
                            <div className="col-lg-3 responsive-column-l">
                              <div className="icon-box icon-layout-2 dashboard-icon-box dashboard--icon-box bg-4 pb-0">
                                <div className="d-flex pb-3 justify-content-between">
                                  <div className="info-content">
                                    <p className="info__desc">Flights</p>
                                    <h4 className="info__title">₦0.00</h4>
                                  </div>
                                  {/* end info-content */}
                                  <div className="info-icon icon-element bg-white text-color-5">
                                    <i className="la la-plane" />
                                  </div>
                                  {/* end info-icon*/}
                                </div>
                                <div className="section-block" />
                                <a
                                  href="#"
                                  className="d-flex align-items-center justify-content-between view-all"
                                >
                                  View Details{" "}
                                  <i className="la la-arrow-right" />
                                </a>
                              </div>
                            </div>
                            {/* end col-lg-3 */}
                            <Link href="admin-dashboard-events">
                              <div className="col-lg-3 responsive-column-l">
                                <div className="icon-box icon-layout-2 dashboard-icon-box dashboard--icon-box bg-5 pb-0">
                                  <div className="d-flex pb-3 justify-content-between">
                                    <div className="info-content">
                                      <p className="info__desc">Events</p>
                                      <h4 className="info__title">₦0.00</h4>
                                    </div>
                                    {/* end info-content */}
                                    <div className="info-icon icon-element bg-white text-color-9">
                                      <i className="la la-hotel" />
                                    </div>
                                    {/* end info-icon*/}
                                  </div>
                                  <div className="section-block" />
                                  <a
                                    href="#"
                                    className="d-flex align-items-center justify-content-between view-all"
                                  >
                                    View Details{" "}
                                    <i className="la la-arrow-right" />
                                  </a>
                                </div>
                              </div>
                            </Link>
                            {/* end col-lg-3 */}
                            <Link href="admin-dashboard-tours">
                              <div className="col-lg-3 responsive-column-l">
                                <div className="icon-box icon-layout-2 dashboard-icon-box dashboard--icon-box bg-7 pb-0">
                                  <div className="d-flex pb-3 justify-content-between">
                                    <div className="info-content">
                                      <p className="info__desc">Tours</p>
                                      <h4 className="info__title">
                                        {"₦" + tourRevenue.toLocaleString()}
                                      </h4>
                                    </div>
                                    {/* end info-content */}
                                    <div className="info-icon icon-element bg-white text-color-10">
                                      <i className="la la-hotel" />
                                    </div>
                                    {/* end info-icon*/}
                                  </div>
                                  <div className="section-block" />
                                  <a
                                    href="#"
                                    className="d-flex align-items-center justify-content-between view-all"
                                  >
                                    View Details{" "}
                                    <i className="la la-arrow-right" />
                                  </a>
                                </div>
                              </div>
                            </Link>
                            {/* end col-lg-3 */}
                          </div>
                          {/* end row */}
                        </div>
                      </div>
                      {/* end form-box */}
                    </div>
                    {/* end col-lg-12 */}
                    <div className="col-lg-12 responsive-column--m">
                      <div className="form-box dashboard-card">
                        <div className="form-title-wrap">
                          <h3 className="title">Total Orders</h3>
                        </div>
                        <div className="form-content">
                          <canvas id="bar-chart" />
                        </div>
                      </div>
                      {/* end form-box */}
                    </div>
                    {/* end col-lg-6 */}
                    {/* <div className="col-lg-6 responsive-column--m">
                      <div className="form-box dashboard-card">
                        <div className="form-title-wrap">
                          <h3 className="title">Server Stats</h3>
                        </div>
                        <div className="form-content pb-0">
                          <div className="dashboard-progressbar pb-4">
                            <div className="progress">
                              <div
                                className="progress-bar progress-bar-striped"
                                role="progressbar"
                                style={{ width: "10%" }}
                                aria-valuenow={10}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <p className="font-size-14 pt-1">
                              Disk space usage: 1,746.5 / 50,000 MB
                            </p>
                          </div>
                          {/* end dashboard-progressbar 
                          <div className="dashboard-progressbar pb-4">
                            <div className="progress">
                              <div
                                className="progress-bar progress-bar-striped bg-success"
                                role="progressbar"
                                style={{ width: "25%" }}
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <p className="font-size-14 pt-1">
                              Monthly Bandwidth Transfer: 14,706.1 / 30.000
                            </p>
                          </div>
                          {/* end dashboard-progressbar 
                          <div className="dashboard-progressbar pb-4">
                            <div className="progress">
                              <div
                                className="progress-bar progress-bar-striped bg-info"
                                role="progressbar"
                                style={{ width: "50%" }}
                                aria-valuenow={50}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <p className="font-size-14 pt-1">
                              Subdomains: 7/15
                            </p>
                          </div>
                          {/* end dashboard-progressbar 
                          <div className="dashboard-progressbar pb-4">
                            <div className="progress">
                              <div
                                className="progress-bar progress-bar-striped bg-warning"
                                role="progressbar"
                                style={{ width: "75%" }}
                                aria-valuenow={75}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <p className="font-size-14 pt-1">
                              All SQL Databases : 6/8
                            </p>
                          </div>
                          {/* end dashboard-progressbar 
                          <div className="dashboard-progressbar pb-4">
                            <div className="progress">
                              <div
                                className="progress-bar progress-bar-striped bg-danger"
                                role="progressbar"
                                style={{ width: "100%" }}
                                aria-valuenow={100}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <p className="font-size-14 pt-1">
                              Email Accounts: 8 / 10
                            </p>
                          </div>
                          {/* end dashboard-progressbar 
                        </div>
                      </div>
                      {/* end form-box
                    </div> */}

                    {/* end col-lg-6 */}
                    {/* <div className="col-lg-6 responsive-column--m">
                      <div className="form-box dashboard-card">
                        <div className="form-title-wrap">
                          <h3 className="title">
                            7,273 people visited this site
                          </h3>
                        </div>
                        <div className="form-content pb-0">
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="sparkline-chart-item">
                                <span className="font-size-15">Visits</span>
                                <h3 className="title font-size-16">9,080</h3>
                                <div className="visits-chart mt-2" />
                              </div>
                            </div>
                            {/* end col-lg-4 
                            <div className="col-lg-4">
                              <div className="sparkline-chart-item">
                                <span className="font-size-15">
                                  Unique Visitors
                                </span>
                                <h3 className="title font-size-16">4,080</h3>
                                <div className="visits-chart mt-2" />
                              </div>
                            </div>
                            {/* end col-lg-4 
                            <div className="col-lg-4">
                              <div className="sparkline-chart-item">
                                <span className="font-size-15">Previews</span>
                                <h3 className="title font-size-16">12,080</h3>
                                <div className="previews-chart mt-2" />
                              </div>
                            </div>
                            {/* end col-lg-4 
                            <div className="col-lg-4">
                              <div className="sparkline-chart-item">
                                <span className="font-size-15">
                                  Pages / Visit
                                </span>
                                <h3 className="title font-size-16">1.54</h3>
                                <div className="visits-chart-2 mt-2" />
                              </div>
                            </div>
                            {/* end col-lg-4 
                            <div className="col-lg-4">
                              <div className="sparkline-chart-item">
                                <span className="font-size-15">
                                  Avg. Visit Duration
                                </span>
                                <h3 className="title font-size-16">00:01:39</h3>
                                <div className="previews-chart mt-2" />
                              </div>
                            </div>
                            {/* end col-lg-4 
                          </div>
                          {/* end row 
                        </div>
                      </div>
                      {/* end form-box 
                    </div> */}
                    {/* end col-lg-6 */}
                    {/* <div className="col-lg-3 responsive-column--m">
                      <div className="form-box dashboard-card">
                        <div className="form-title-wrap">
                          <h3 className="title">Visits by Browser</h3>
                        </div>
                        <div className="form-content py-0">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                              Chrome
                              <span className="badge bg-info text-white badge-pill">
                                3,506
                              </span>
                            </li>
                            <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                              Firefox
                              <span className="badge bg-info text-white badge-pill">
                                2,405
                              </span>
                            </li>
                            <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                              Safari
                              <span className="badge bg-info text-white badge-pill">
                                300
                              </span>
                            </li>
                            <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                              Internet Explorer
                              <span className="badge bg-info text-white badge-pill">
                                200
                              </span>
                            </li>
                            <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                              Opera
                              <span className="badge bg-info text-white badge-pill">
                                111
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* end form-box 
                    </div> */}
                    {/* end col-lg-3 */}
                    {/* <div className="col-lg-3 responsive-column--m">
                      <div className="form-box dashboard-card">
                        <div className="form-title-wrap">
                          <h3 className="title">Mobile Overview</h3>
                        </div>
                        <div className="form-content py-0">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                              Desktop
                              <span className="badge bg-info text-white badge-pill">
                                6,506
                              </span>
                            </li>
                            <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                              Mobile
                              <span className="badge bg-info text-white badge-pill">
                                222
                              </span>
                            </li>
                            <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                              Tablet
                              <span className="badge bg-info text-white badge-pill">
                                65
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* end form-box 
                    </div> */}
                    {/* end col-lg-3 */}
                  </div>
                  {/* end row */}
                  <div className="border-top mt-4" />
                  <div className="row align-items-center">
                    <div className="col-lg-7">
                      <div className="copy-right padding-top-30px">
                        <p className="copy__desc">
                          © Copyright Book24 2020.
                          <span className="la la-heart" />
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
export default withRouter(AdminDashboard);

{
  /** <div className="col-lg-3 responsive-column-l">
                      <div className="icon-box icon-layout-2 dashboard-icon-box pb-0">
                        <div className="d-flex pb-3 justify-content-between">
                          <div className="info-content">
                            <p className="info__desc">New Bookmarks!</p>
                            <h4 className="info__title">25</h4>
                          </div>
                          {/* end info-content */
}
//       <div className="info-icon icon-element bg-1">
//         <i className="la la-bookmark-o" />
//       </div>
//       {/* end info-icon*/}
//     </div>
//     <div className="section-block" />
//     <a
//       href="admin-dashboard-wishlist.html"
//       className="d-flex align-items-center justify-content-between view-all"
//     >
//       View All <i className="la la-angle-right" />
//     </a>
//   </div>
// </div>* */}
