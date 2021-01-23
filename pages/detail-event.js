import Head from "next/head";
import React, { Component } from "react";
import Header from "../components/header";
import DetailsItem from "../components/detailsItem";
import PreLoader from "../components/preloader";
import dynamic from "next/dynamic";
import SignInModal from "../components/signInModal";
import Footer from "../components/footer";
import $ from "jquery";
import Cookies from "js-cookie";
import moment from "moment";
import { withRouter } from "next/router";
import axios from "axios";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import {
  setOrderUrl,
  setOrderData,
  setOrderPrice,
  setOrderImage,
  setOrderCheckInDate,
  setOrderCheckOutDate,
  setOrderSubData,
  setOrderName,
} from "../store/actions/order";
import { Carousel } from "react-responsive-carousel";

const OwlCarousel = dynamic(import("react-owl-carousel"), {
  ssr: false,
});
import { API_URL } from "../components/config.js";

class DetailEvent extends Component {
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
      selected_ticket: {},
      images: [],
      no_of_tickets: "",
      check_in_time: "",
      check_out_time: "",
      id: "",
      location: "",
      discount_rate: "",
      contact_email: "",
      contact_phone: "",
      loader: false,
    };
  }

  async componentDidMount() {
    console.log(this.props.router.query);

    const id = this.props.router.query.id ? this.props.router.query.id : "";

    if (id == "") {
      this.props.router.push("/event-list");
    }
    this.getData(id);
  }

  getData = (id) => {
    this.setState({ loader: true });
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "events/" + id, config)
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
            (response.data && response.data.event_type == "free" && []) ||
            response.data.ticket_type,
          images: response.data.images,
          event_type: response.data.event_type,
          id: response.data.id,
          location: response.data.location,
          discount_rate: parseFloat(response.data.discount_rate),
          contact_email: response.data.contact_email,
          contact_phone: response.data.contact_phone,
        });
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      })
      .finally(() => this.setState({ loader: false }));
  };

  book = async () => {
    const { alert } = this.props;
    let token = await Cookies.get("token");
    const {
      no_of_tickets,
      selected_ticket,
      images,
      check_in_time,
      check_out_time,
      discount_rate,
      name,
    } = this.state;
    if (token == "") {
      return this.props.router.push("/account");
    } else if (!no_of_tickets) {
      return alert.show(<div>No of tickets is required</div>, {
        type: "error",
      });
    } else if (this.state.event_type == "paid" && !selected_ticket.price) {
      return alert.show(<div>Select a ticket to book</div>, {
        type: "error",
      });
    } else {
      const new_data = {
        event_id: this.props.router.query.id,
        no_of_tickets: parseInt(no_of_tickets),
        price:
          parseInt(
            selected_ticket.price - discount_rate * 0.01 * selected_ticket.price
          ) * parseInt(no_of_tickets) || 0,
      };
      this.props.setOrderData(new_data);
      this.props.setOrderUrl("eventTicket");
      this.props.setOrderPrice(new_data.price);
      this.props.setOrderImage(images && images[0] && images[0].url);
      this.props.setOrderCheckInDate(
        moment(check_in_time).format("dddd, MMM Do YYYY HH:mm:ss")
      );
      this.props.setOrderCheckOutDate(
        moment(check_out_time).format("dddd, MMM Do YYYY HH:mm:ss")
      );
      this.props.setOrderName(name);
      this.props.setOrderSubData({
        no_of_tickets: parseInt(no_of_tickets),
        type: selected_ticket.name,
        ppt_name: this.state.name,
        hotel_address: this.state.address,
        hotel_number: this.state.contact_phone,
        hotel_email: this.state.contact_email,
      });
      this.props.router.push("/checkout");
    }
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
      images,
      event_type,
      selected_ticket,
      no_of_tickets,
      location,
      loader,
    } = this.state;

    const styleChecker = (index) => {
      return index == 0
        ? "room_type first"
        : index == sub_items.length - 1
        ? "room_type last"
        : "room_type alternate";
    };
    const first_image = images && images[0] && images[0].url;
    const average_price = selected_ticket
      ? selected_ticket.price
      : sub_items.reduce((a, b) => a + (b["price"] || 0), 0) / sub_items.length;

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
          {/* <link rel="stylesheet" href="css/bootstrap-select.min.css" /> */}
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
        <div id="page">
          <div
            class={`preloader ${loader ? "" : "preloader-hidden"}`}
            id="preloader"
          >
            <div class="loader">
              <svg class="spinner" viewBox="0 0 50 50">
                <circle
                  class="path"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke-width="5"
                ></circle>
              </svg>
            </div>
          </div>
          <Header makeBlue={true} />

          <main>
            <nav className="secondary_nav sticky_horizontal_2">
              <div className="container">
                <ul className="clearfix">
                  <li>
                    <a href="#description" className="active">
                      Description
                    </a>
                  </li>
                  <li>
                    <a href="#reviews">Reviews</a>
                  </li>
                  <li>
                    <a href="#sidebar">Booking</a>
                  </li>
                </ul>
              </div>
            </nav>

            <div
              className="container margin_60_35"
              style={{ paddingTop: "50px" }}
            >
              <div className="py-4">
                <div className="d-flex">
                  <h1
                    className="title font-size-35"
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {name}
                  </h1>
                  <div className="box-button-green">
                    {this.state.discount_rate} % Discount
                  </div>
                </div>

                <p>
                  {location.substring(0, 1).toUpperCase() +
                    location.substring(1, location.length)}
                </p>
                <a className="address" href="#">
                  {address}
                </a>
                <br />
              </div>

              <div className="row" style={{ marginTop: "50px" }}>
                <div className="col-lg-8">
                  <section
                    className="breadcrumb-area py-0"
                    // style={{
                    //   backgroundImage: `url(${first_image})`,
                    // }}
                  >
                    <div className="breadcrumb-wrap">
                      <div className="">
                        <div className="row">
                          <div className="col-lg-12">
                            <div
                              className="breadcrumb-btn image-slider-container"
                              style={{ paddingTop: "0px" }}
                            >
                              <Carousel autoPlay>
                                {images.map((el, index) => {
                                  return (
                                    <div key={el.url + index}>
                                      <img
                                        src={el.url}
                                        className=""
                                        alt="image"
                                      />
                                      <p className="legend">{name}</p>
                                    </div>
                                  );
                                })}
                              </Carousel>
                            </div>
                            {/* end breadcrumb-btn */}
                          </div>
                          {/* end col-lg-12 */}
                        </div>
                        {/* end row */}
                      </div>
                      {/* end container */}
                    </div>
                    {/* end breadcrumb-wrap */}
                  </section>
                  <section id="description" className="mt-4">
                    <div className="detail_title_1">
                      <div className="cat_star">
                        <i className="icon_star"></i>
                        <i className="icon_star"></i>
                        <i className="icon_star"></i>
                        <i className="icon_star"></i>
                      </div>

                      <p>
                        <strong>Start date:</strong>{" "}
                        {moment(check_in_time).format(
                          "dddd, MMMM Do YYYY, h:mm:ss a"
                        )}
                      </p>
                      <p>
                        <strong>End date:</strong>{" "}
                        {moment(check_out_time).format(
                          "dddd, MMMM Do YYYY, h:mm:ss a"
                        )}
                      </p>
                      <p>
                        <strong>Venue:</strong> {address || ""}
                      </p>
                    </div>
                    <p>{description}</p>

                    {/* <h5 className="add_bottom_15">Performers</h5>
							<div className="row add_bottom_30">
								<div className="col-lg-6">
									<ul className="bullets">
										<li>wizkid</li>
										<li>Burna Boy</li>
										<li>Tiwa Savage</li>
										<li>Davido</li>
									</ul>
								</div>
								<div className="col-lg-6">
									<ul className="bullets">
										<li>Zlatan</li>
										<li>Niara Marley</li>
										<li>Simi</li>
										<li>Adekinle Gold</li>
									</ul>
								</div>
							</div>
							<hr/> */}

                    <hr />
                    {sub_items.length > 0 && <h3>Prices</h3>}
                    <table className="table table-striped add_bottom_45">
                      <tbody>
                        {sub_items &&
                          sub_items.map((el, index) => {
                            return (
                              <tr key={el.name + index}>
                                <td>{el.name}</td>
                                <td>
                                  {el.price
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </td>
                                {/* 
                                <td>
                                  <div
                                    className={`single-feature-icon icon-element ml-0 flex-shrink-0 mr-3 ${
                                      (selected_ticket.name &&
                                        selected_ticket.name.includes(
                                          el.name
                                        ) &&
                                        "active_checkbox") ||
                                      ""
                                    }`}
                                    onClick={() =>
                                      this.setState({ selected_ticket: el })
                                    }
                                  >
                                    <i className="la la-check" />
                                  </div>
                                </td> */}
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                    {sub_items.length > 0 && <hr />}
                    {/* <h3>Location</h3> */}
                    {/* <div id="map" className="map map_single add_bottom_45"></div> */}
                    {/* End Map */}
                  </section>
                  {/* /section */}

                  <section id="reviews">
                    <h2>Reviews</h2>
                    <div className="reviews-container add_bottom_30">
                      <div className="row">
                        <div className="col-lg-3">
                          <div id="review_summary">
                            <strong>8.5</strong>
                            <em>Superb</em>
                            <small>Based on 4 reviews</small>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="row">
                            <div className="col-lg-10 col-9">
                              <div className="progress">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: "90%" }}
                                  ariaValueNow="90"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                            <div className="col-lg-2 col-3">
                              <small>
                                <strong>5 stars</strong>
                              </small>
                            </div>
                          </div>
                          {/* /row */}
                          <div className="row">
                            <div className="col-lg-10 col-9">
                              <div className="progress">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: "95%" }}
                                  ariaValueNow="95"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                            <div className="col-lg-2 col-3">
                              <small>
                                <strong>4 stars</strong>
                              </small>
                            </div>
                          </div>
                          {/* /row */}
                          <div className="row">
                            <div className="col-lg-10 col-9">
                              <div className="progress">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: "60%" }}
                                  ariaValueNow="60"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                            <div className="col-lg-2 col-3">
                              <small>
                                <strong>3 stars</strong>
                              </small>
                            </div>
                          </div>
                          {/* /row */}
                          <div className="row">
                            <div className="col-lg-10 col-9">
                              <div className="progress">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: "20%" }}
                                  ariaValueNow="20"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                            <div className="col-lg-2 col-3">
                              <small>
                                <strong>2 stars</strong>
                              </small>
                            </div>
                          </div>
                          {/* /row */}
                          <div className="row">
                            <div className="col-lg-10 col-9">
                              <div className="progress">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: "0" }}
                                  ariaValueNow="0"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                            <div className="col-lg-2 col-3">
                              <small>
                                <strong>1 stars</strong>
                              </small>
                            </div>
                          </div>
                          {/* /row */}
                        </div>
                      </div>
                      {/* /row */}
                    </div>

                    <div className="reviews-container">
                      <div className="review-box clearfix">
                        <figure className="rev-thumb">
                          <img src="/images/avatar1.jpg" alt="" />
                        </figure>
                        <div className="rev-content">
                          <div className="rating">
                            <i className="icon_star voted"></i>
                            <i className="icon_star voted"></i>
                            <i className="icon_star voted"></i>
                            <i className="icon_star voted"></i>
                            <i className="icon_star"></i>
                          </div>
                          <div className="rev-info">
                            Admin – April 03, 2016:
                          </div>
                          <div className="rev-text">
                            <p>
                              Sed eget turpis a pede tempor malesuada. Vivamus
                              quis mi at leo pulvinar hendrerit. Cum sociis
                              natoque penatibus et magnis dis
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* /review-box */}
                      <div className="review-box clearfix">
                        <figure className="rev-thumb">
                          <img src="/images/avatar2.jpg" alt="" />
                        </figure>
                        <div className="rev-content">
                          <div className="rating">
                            <i className="icon_star voted"></i>
                            <i className="icon_star voted"></i>
                            <i className="icon_star voted"></i>
                            <i className="icon_star voted"></i>
                            <i className="icon_star"></i>
                          </div>
                          <div className="rev-info">
                            Ahsan – April 01, 2016:
                          </div>
                          <div className="rev-text">
                            <p>
                              Sed eget turpis a pede tempor malesuada. Vivamus
                              quis mi at leo pulvinar hendrerit. Cum sociis
                              natoque penatibus et magnis dis
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* /review-box */}
                      <div className="review-box clearfix">
                        <figure className="rev-thumb">
                          <img src="/images/avatar3.jpg" alt="" />
                        </figure>
                        <div className="rev-content">
                          <div className="rating">
                            <i className="icon_star voted"></i>
                            <i className="icon_star voted"></i>
                            <i className="icon_star voted"></i>
                            <i className="icon_star voted"></i>
                            <i className="icon_star"></i>
                          </div>
                          <div className="rev-info">Sara – March 31, 2016:</div>
                          <div className="rev-text">
                            <p>
                              Sed eget turpis a pede tempor malesuada. Vivamus
                              quis mi at leo pulvinar hendrerit. Cum sociis
                              natoque penatibus et magnis dis
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* /review-box */}
                    </div>
                    {/* /review-container */}
                  </section>
                  {/* /section */}
                  <hr />

                  <div className="add-review">
                    <h5>Leave a Review</h5>
                    <form>
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label>Name and Lastname *</label>
                          <input
                            type="text"
                            name="name_review"
                            id="name_review"
                            placeholder=""
                            className="form-control"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>Email *</label>
                          <input
                            type="email"
                            name="email_review"
                            id="email_review"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>Rating </label>
                          <div className="custom-select-form">
                            <select
                              name="rating_review"
                              id="rating_review"
                              className="wide"
                            >
                              <option value="1">1 (lowest)</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5" selected>
                                5 (medium)
                              </option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10 (highest)</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group col-md-12">
                          <label>Your Review</label>
                          <textarea
                            name="review_text"
                            id="review_text"
                            className="form-control"
                            style={{ height: "130px" }}
                          ></textarea>
                        </div>
                        <div className="form-group col-md-12 add_top_20 add_bottom_30">
                          <input
                            type="submit"
                            value="Submit"
                            className="btn_1"
                            id="submit-review"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* /col */}

                <aside className="col-lg-4" id="sidebar">
                  <div className="box_detail booking">
                    <div className="price">
                      <span>
                        {event_type == "free"
                          ? "FREE"
                          : average_price
                          ? parseInt(
                              parseInt(average_price) -
                                parseInt(this.state.discount_rate) *
                                  0.01 *
                                  parseInt(average_price)
                            )
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : 0}
                        / <small>person </small>
                      </span>
                      <div className="score">
                        <span
                          className="before-price"
                          style={{ fontSize: "16px" }}
                        >
                          ₦
                          {average_price
                            ? average_price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            : 0}
                        </span>{" "}
                      </div>
                      {/* <div className="score">
                        <span>
                          Good<em>350 Reviews</em>
                        </span>
                        <strong>7.0</strong>
                      </div> */}
                    </div>
                    {event_type != "free" && (
                      <div className="input-box">
                        <label className="label-text">Tickets</label>
                        <div className="form-group">
                          <div className="select-contain w-auto">
                            <select
                              //    value={this.state.selected_ticket &&this.state.selected_ticket.name || this.state.selected_ticket}
                              className="select-contain-select"
                              onChange={(e) => {
                                console.log("Ticket Booking on");
                                this.setState({
                                  selected_ticket: JSON.parse(e.target.value),
                                });
                              }}
                            >
                              <option value="">
                                {event_type == "free"
                                  ? "Free"
                                  : "Select Ticket"}
                              </option>
                              {sub_items.map((el, index) => {
                                console.log("Tickect Bookings item", el);
                                return (
                                  <option
                                    value={JSON.stringify(el)}
                                    key={el.name + index + index}
                                  >
                                    {el.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="input-box">
                      <label className="label-text">Number of tickets</label>
                      <div className="form-group">
                        {/* <span className="la la-envelope-o form-icon" /> */}
                        <input
                          className="form-control"
                          type="number"
                          placeholder="How many tickets?"
                          value={no_of_tickets}
                          onChange={(e) =>
                            this.setState({ no_of_tickets: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <a
                      onClick={this.book}
                      className=" add_top_30 btn_1 full-width purchase"
                    >
                      Purchase
                    </a>
                  </div>
                  <ul className="share-buttons">
                    <li>
                      <a className="fb-share" href="#0">
                        <i className="social_facebook"></i> Share
                      </a>
                    </li>
                    <li>
                      <a className="twitter-share" href="#0">
                        <i className="social_twitter"></i> Share
                      </a>
                    </li>
                    <li>
                      <a className="gplus-share" href="#0">
                        <i className="social_googleplus"></i> Share
                      </a>
                    </li>
                  </ul>
                </aside>
              </div>
              {/* /row */}
            </div>
            {/* /container */}
          </main>
          <Footer />
        </div>
        <SignInModal />
        <div id="toTop"></div>
        <Head>
          {/* <script src="js/jquery-3.4.1.min.js"></script> */}
          {/* <script src="js/jquery-ui.js"></script> */}
          <script src="js/popper.min.js"></script>
          <script src="js/bootstrap.min.js"></script>
          {/* <script src="js/bootstrap-select.min.js"></script> */}
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
          {/* <script src="js/main.js"></script> */}
          {/* <script src="js/common_scripts.js"></script> */}
          {/* <script src="js/functions.js"></script> */}
          <script src="assets/validate.js"></script>
          <script src="http://maps.googleapis.com/maps/api/js"></script>
          <script src="js/map_single_hotel.js"></script>
          <script src="js/infobox.js"></script>
          {/* <script src="js/input_qty.js"></script> */}
          <script>{`
	$(function() {
	  $('input[name="dates"]').daterangepicker({
		  autoUpdateInput: false,
		  parentEl:'#input-dates',
		  opens: 'left',
		  locale: {
			  cancelLabel: 'Clear'
		  }
	  });
	  $('input[name="dates"]').on('apply.daterangepicker', function(ev, picker) {
		  $(this).val(picker.startDate.format('MM-DD-YY') + ' > ' + picker.endDate.format('MM-DD-YY'));
	  });
	  $('input[name="dates"]').on('cancel.daterangepicker', function(ev, picker) {
		  $(this).val('');
	  });
	});
	`}</script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
 console.log('rock')
          `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
  
	 $('#carousel_in').owlCarousel({
	    center: false,
	    items:1,
	    loop:false,
	    margin:0
	});
	`,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
	$(function() {
	  $('input[name="dates"]').daterangepicker({
		  autoUpdateInput: false,
		  parentEl:'#input-dates',
		  opens: 'left',
		  locale: {
			  cancelLabel: 'Clear'
		  }
	  });
	  $('input[name="dates"]').on('apply.daterangepicker', function(ev, picker) {
		  $(this).val(picker.startDate.format('MM-DD-YY') + ' > ' + picker.endDate.format('MM-DD-YY'));
	  });
	  $('input[name="dates"]').on('cancel.daterangepicker', function(ev, picker) {
		  $(this).val('');
	  });
	});
	`,
            }}
          />
        </Head>
        {/* <style global jsx>{`
          body {
            background: #fff;
          }
        `}</style> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  order: state.order,
});

const mapDispatchToProps = {
  setOrderUrl,
  setOrderPrice,
  setOrderData,
  setOrderImage,
  setOrderCheckInDate,
  setOrderCheckOutDate,
  setOrderSubData,
  setOrderName,
};

const DetailEvent_ = withRouter(DetailEvent);
const DetailEvent__ = withAlert()(DetailEvent_);
export default connect(mapStateToProps, mapDispatchToProps)(DetailEvent__);
