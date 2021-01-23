import Head from "next/head";
import React, { Component } from "react";
import Header from "../components/header";
import DetailsHeader from "../components/detailsHeader";
import PreLoader from "../components/preloader";
import SignInModal from "../components/signInModal";
import Footer from "../components/footer";
import Cookies from "js-cookie";
import moment from "moment";
import { withRouter } from "next/router";
import axios from "axios";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import DateTime from "react-datetime";
import { Carousel } from "react-responsive-carousel";
import OutsideClickHandler from "react-outside-click-handler";
import WhiteLoader from "../components/whiteLoader";
import Sticky from "react-sticky-el";

import {
  setOrderUrl,
  setOrderData,
  setOrderPrice,
  setOrderImage,
  setOrderCheckInDate,
  setOrderCheckOutDate,
  setOrderName,
  setOrderSubData,
} from "../store/actions/order";
import { API_URL } from "../components/config.js";

class DetailRental extends Component {
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
      book_in_date: "",
      book_out_date: "",
      start_date: new Date(),
      end_date: "",
      rental_company: "",
      location: "",
      price: "",
      images: [],

      discount_rate: "",
      contact_email: "",
      contact_phone: "",
      loader: false,
    };
  }

  valid(current) {
    return current.isAfter(moment().subtract(1, "day"));
  }
  validEndDate = (current) => {
    return current.isAfter(moment(this.state.check_out_time));
  };

  async componentDidMount() {
    const id = this.props.router.query.id ? this.props.router.query.id : "";

    if (id == "") {
      this.props.router.push("/rental-list");
    }
    this.getData(id);
  }

  getData = (id) => {
    this.setState({ loader: true });
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "rentals/" + id, config)
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
          location: response.data.location,
          rental_company: response.data.rental_company,
          price: response.data.price,
          images: response.data.images,
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
      book_in_date,
      book_out_date,
      price,
      discount_rate,
      images,
      check_in_time,
      check_out_time,
      name,
      start_date,
      end_date,
    } = this.state;
    const average_price =
      (price ? parseInt(price) : price) *
      Math.abs(moment(start_date).diff(moment(end_date), "days") || 1);

    if (token == "") {
      return this.props.router.push("/account");
    } else if (!start_date) {
      return alert.show(<div>Start date is required</div>, {
        type: "error",
      });
    } else if (!end_date) {
      return alert.show(<div>End date is required</div>, {
        type: "error",
      });
    } else {
      const new_data = {
        rental_id: this.props.router.query.id,
        price: parseInt(average_price - discount_rate * 0.01 * average_price),
        start_date: start_date,
        end_date: end_date,
      };
      this.props.setOrderData(new_data);
      this.props.setOrderUrl("rentalBooking");
      this.props.setOrderPrice(new_data.price);

      this.props.setOrderImage(images && images[0] && images[0].url);
      this.props.setOrderCheckInDate(
        moment(start_date).format("dddd, MMM Do YYYY HH:mm:ss")
      );
      this.props.setOrderCheckOutDate(
        moment(end_date).format("dddd, MMM Do YYYY HH:mm:ss")
      );
      this.props.setOrderName(name);
      this.props.setOrderSubData({
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
      rental_compnay,
      location,
      book_in_date,
      book_out_date,
      price,
      images,
      discount_rate,
      loader,
      start_date,
      end_date,
    } = this.state;
    const average_price =
      (price ? parseInt(price) : price) *
      Math.abs(moment(start_date).diff(moment(end_date), "days") || 1);
    const stickySyle = {
      zIndex: "999999999",
      marginBottom: "30px",
      top: "-60px",
    };
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
          <DetailsHeader makeBlue={true} />
          <section className="breadcrumb-top-bar">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-list breadcrumb-top-list"></div>
                  {/* end breadcrumb-list */}

                  <div className="single-content-item pb-4">
                    <div className="d-flex">
                      <h3
                        className="title font-size-35"
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {name}
                      </h3>

                      <div className="box-button-green">
                        {this.state.discount_rate} % Discount
                      </div>
                    </div>
                    <div className="d-flex align-items-center pt-2">
                      <p className="mr-2">{address}</p>
                      {/* <p>
                            <span className="badge badge-warning text-white font-size-16">
                              4.7
                            </span>
                            <span>(40 Reviews)</span>
                          </p> */}
                    </div>
                  </div>

                  <div
                    className="single-content-navbar-wrap menu section-bg"
                    id="single-content-navbar"
                  >
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12">
                          <div
                            className="single-content-nav"
                            id="single-content-nav"
                            style={{
                              textTransform: "uppercase",
                              fontWeight: "bold",
                              fontSize: "18px !important",
                            }}
                          >
                            <ul>
                              <li>
                                <a
                                  data-scroll="description"
                                  href="#description"
                                  className="scroll-link"
                                >
                                  Rental Details
                                </a>
                              </li>

                              <li>
                                <a
                                  data-scroll="availability"
                                  href="#availability"
                                  className="scroll-link"
                                >
                                  Availability
                                </a>
                              </li>

                              <li>
                                <a
                                  data-scroll="faq"
                                  href="#faq"
                                  className="scroll-link"
                                >
                                  FAQ
                                </a>
                              </li>
                              <li>
                                <a
                                  data-scroll="reviews"
                                  href="#reviews"
                                  className="scroll-link"
                                >
                                  Reviews
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* end breadcrumb-top-bar */}
          {/* ================================
    START BREADCRUMB AREA
================================= */}
          {/* end breadcrumb-area */}
          {/* ================================
    END BREADCRUMB AREA
================================= */}
          {/* ================================
    START TOUR DETAIL AREA
================================= */}
          <section className="tour-detail-area padding-bottom-90px">
            {/* end single-content-navbar-wrap */}
            <div className="single-content-box">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <section className="breadcrumb-area py-0">
                      <div className="breadcrumb-wrap">
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-12  px-0">
                              <div
                                className="breadcrumb-btn image-slider-container"
                                style={{ paddingTop: "0px" }}
                              >
                                <Carousel autoPlay>
                                  {images &&
                                    images.map((el, index) => {
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

                    <div className="single-content-wrap padding-top-20px">
                      <div id="description" className="page-scroll">
                        {/* end single-content-item */}
                        <div className="detail_title_1">
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
                        </div>

                        {/* end single-content-item */}
                        <div className="section-block" />
                        <div className="single-content-item pt-2 padding-bottom-40px">
                          <h3 className="title font-size-20">About {name}</h3>
                          <p className="py-3">{description}</p>
                        </div>
                        {/* end single-content-item */}
                        <div className="section-block" />
                      </div>
                      {/* end description */}
                    </div>

                    <div id="reviews" className="page-scroll">
                      <div className="single-content-item padding-top-40px padding-bottom-40px">
                        <h3 className="title font-size-20">Reviews</h3>
                        <div className="review-container padding-top-30px">
                          <div className="row align-items-center">
                            <div className="col-lg-4">
                              <div className="review-summary">
                                <h2>
                                  4.5<span>/5</span>
                                </h2>
                                <p>Excellent</p>
                                <span>Based on 4 reviews</span>
                              </div>
                            </div>
                            <div className="col-lg-8">
                              <div className="review-bars">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="progress-item">
                                      <h3 className="progressbar-title">
                                        Service
                                      </h3>
                                      <div className="progressbar-content line-height-20 d-flex align-items-center justify-content-between">
                                        <div className="progressbar-box flex-shrink-0">
                                          <div
                                            className="progressbar-line"
                                            data-percent="70%"
                                          >
                                            <div className="progressbar-line-item bar-bg-1" />
                                          </div>{" "}
                                          {/* End Skill Bar */}
                                        </div>
                                        <div className="bar-percent">4.6</div>
                                      </div>
                                    </div>
                                    {/* end progress-item */}
                                  </div>
                                  {/* end col-lg-6 */}
                                  <div className="col-lg-6">
                                    <div className="progress-item">
                                      <h3 className="progressbar-title">
                                        Location
                                      </h3>
                                      <div className="progressbar-content line-height-20 d-flex align-items-center justify-content-between">
                                        <div className="progressbar-box flex-shrink-0">
                                          <div
                                            className="progressbar-line"
                                            data-percent="55%"
                                          >
                                            <div className="progressbar-line-item bar-bg-2" />
                                          </div>{" "}
                                          {/* End Skill Bar */}
                                        </div>
                                        <div className="bar-percent">4.7</div>
                                      </div>
                                    </div>
                                    {/* end progress-item */}
                                  </div>
                                  {/* end col-lg-6 */}
                                  <div className="col-lg-6">
                                    <div className="progress-item">
                                      <h3 className="progressbar-title">
                                        Value for Money
                                      </h3>
                                      <div className="progressbar-content line-height-20 d-flex align-items-center justify-content-between">
                                        <div className="progressbar-box flex-shrink-0">
                                          <div
                                            className="progressbar-line"
                                            data-percent="40%"
                                          >
                                            <div className="progressbar-line-item bar-bg-3" />
                                          </div>{" "}
                                          {/* End Skill Bar */}
                                        </div>
                                        <div className="bar-percent">2.6</div>
                                      </div>
                                    </div>
                                    {/* end progress-item */}
                                  </div>
                                  {/* end col-lg-6 */}
                                  <div className="col-lg-6">
                                    <div className="progress-item">
                                      <h3 className="progressbar-title">
                                        Cleanliness
                                      </h3>
                                      <div className="progressbar-content line-height-20 d-flex align-items-center justify-content-between">
                                        <div className="progressbar-box flex-shrink-0">
                                          <div
                                            className="progressbar-line"
                                            data-percent="60%"
                                          >
                                            <div className="progressbar-line-item bar-bg-4" />
                                          </div>{" "}
                                          {/* End Skill Bar */}
                                        </div>
                                        <div className="bar-percent">3.6</div>
                                      </div>
                                    </div>
                                    {/* end progress-item */}
                                  </div>
                                  {/* end col-lg-6 */}
                                  <div className="col-lg-6">
                                    <div className="progress-item">
                                      <h3 className="progressbar-title">
                                        Facilities
                                      </h3>
                                      <div className="progressbar-content line-height-20 d-flex align-items-center justify-content-between">
                                        <div className="progressbar-box flex-shrink-0">
                                          <div
                                            className="progressbar-line"
                                            data-percent="50%"
                                          >
                                            <div className="progressbar-line-item bar-bg-5" />
                                          </div>{" "}
                                          {/* End Skill Bar */}
                                        </div>
                                        <div className="bar-percent">2.6</div>
                                      </div>
                                    </div>
                                    {/* end progress-item */}
                                  </div>
                                  {/* end col-lg-6 */}
                                </div>
                              </div>
                            </div>
                            {/* end col-lg-8 */}
                          </div>
                        </div>
                      </div>
                      {/* end single-content-item */}
                      <div className="section-block" />
                    </div>
                    {/* end reviews */}
                    <div className="review-box">
                      <div className="single-content-item padding-top-40px">
                        <h3 className="title font-size-20">
                          Showing 3 guest reviews
                        </h3>
                        <div className="comments-list padding-top-50px">
                          <div className="comment">
                            <div className="comment-avatar">
                              <img
                                className="avatar__img"
                                alt=""
                                src="/images/team8.jpg"
                              />
                            </div>
                            <div className="comment-body">
                              <div className="meta-data">
                                <h3 className="comment__author">Jenny Doe</h3>
                                <div className="meta-data-inner d-flex">
                                  <span className="ratings d-flex align-items-center mr-1">
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                  </span>
                                  <p className="comment__date">April 5, 2019</p>
                                </div>
                              </div>
                              <p className="comment-content">Excellent hotel</p>
                              <div className="comment-reply d-flex align-items-center justify-content-between">
                                <a
                                  className="theme-btn"
                                  href="#"
                                  data-toggle="modal"
                                  data-target="#replayPopupForm"
                                >
                                  <span className="la la-mail-reply mr-1" />
                                  Reply
                                </a>
                                <div className="reviews-reaction">
                                  <a href="#" className="comment-like">
                                    <i className="la la-thumbs-up" /> 13
                                  </a>
                                  <a href="#" className="comment-dislike">
                                    <i className="la la-thumbs-down" /> 2
                                  </a>
                                  <a href="#" className="comment-love">
                                    <i className="la la-heart-o" /> 5
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* end comments */}
                          <div className="comment comment-reply-item">
                            <div className="comment-avatar">
                              <img
                                className="avatar__img"
                                alt=""
                                src="/images/team9.jpg"
                              />
                            </div>
                            <div className="comment-body">
                              <div className="meta-data">
                                <h3 className="comment__author">Jenny Doe</h3>
                                <div className="meta-data-inner d-flex">
                                  <span className="ratings d-flex align-items-center mr-1">
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                  </span>
                                  <p className="comment__date">April 5, 2019</p>
                                </div>
                              </div>
                              <p className="comment-content">
                                I had a great time at the hotel
                              </p>
                              <div className="comment-reply d-flex align-items-center justify-content-between">
                                <a
                                  className="theme-btn"
                                  href="#"
                                  data-toggle="modal"
                                  data-target="#replayPopupForm"
                                >
                                  <span className="la la-mail-reply mr-1" />
                                  Reply
                                </a>
                                <div className="reviews-reaction">
                                  <a href="#" className="comment-like">
                                    <i className="la la-thumbs-up" /> 13
                                  </a>
                                  <a href="#" className="comment-dislike">
                                    <i className="la la-thumbs-down" /> 2
                                  </a>
                                  <a href="#" className="comment-love">
                                    <i className="la la-heart-o" /> 5
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* end comments */}
                          <div className="comment">
                            <div className="comment-avatar">
                              <img
                                className="avatar__img"
                                alt=""
                                src="/images/team10.jpg"
                              />
                            </div>
                            <div className="comment-body">
                              <div className="meta-data">
                                <h3 className="comment__author">Jenny Doe</h3>
                                <div className="meta-data-inner d-flex">
                                  <span className="ratings d-flex align-items-center mr-1">
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                  </span>
                                  <p className="comment__date">April 5, 2019</p>
                                </div>
                              </div>
                              <p className="comment-content">
                                Very excellent and serene hotel
                              </p>
                              <div className="comment-reply d-flex align-items-center justify-content-between">
                                <a
                                  className="theme-btn"
                                  href="#"
                                  data-toggle="modal"
                                  data-target="#replayPopupForm"
                                >
                                  <span className="la la-mail-reply mr-1" />
                                  Reply
                                </a>
                                <div className="reviews-reaction">
                                  <a href="#" className="comment-like">
                                    <i className="la la-thumbs-up" /> 13
                                  </a>
                                  <a href="#" className="comment-dislike">
                                    <i className="la la-thumbs-down" /> 2
                                  </a>
                                  <a href="#" className="comment-love">
                                    <i className="la la-heart-o" /> 5
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* end comments */}
                          <div className="btn-box load-more text-center">
                            <button
                              className="theme-btn theme-btn-small theme-btn-transparent"
                              type="button"
                            >
                              Load More Review
                            </button>
                          </div>
                        </div>
                        {/* end comments-list */}
                        <div className="comment-forum padding-top-40px">
                          <div className="form-box">
                            <div className="form-title-wrap">
                              <h3 className="title">Write a Review</h3>
                            </div>
                            {/* form-title-wrap */}
                            <div className="form-content">
                              <div className="rate-option p-2">
                                <div className="row">
                                  <div className="col-lg-4 responsive-column">
                                    <div className="rate-option-item">
                                      <label>Service</label>
                                      <div className="rate-stars-option">
                                        <input
                                          type="checkbox"
                                          id="lst1"
                                          defaultValue={1}
                                        />
                                        <label htmlFor="lst1" />
                                        <input
                                          type="checkbox"
                                          id="lst2"
                                          defaultValue={2}
                                        />
                                        <label htmlFor="lst2" />
                                        <input
                                          type="checkbox"
                                          id="lst3"
                                          defaultValue={3}
                                        />
                                        <label htmlFor="lst3" />
                                        <input
                                          type="checkbox"
                                          id="lst4"
                                          defaultValue={4}
                                        />
                                        <label htmlFor="lst4" />
                                        <input
                                          type="checkbox"
                                          id="lst5"
                                          defaultValue={5}
                                        />
                                        <label htmlFor="lst5" />
                                      </div>
                                    </div>
                                  </div>
                                  {/* col-lg-4 */}
                                  <div className="col-lg-4 responsive-column">
                                    <div className="rate-option-item">
                                      <label>Location</label>
                                      <div className="rate-stars-option">
                                        <input
                                          type="checkbox"
                                          id="l1"
                                          defaultValue={1}
                                        />
                                        <label htmlFor="l1" />
                                        <input
                                          type="checkbox"
                                          id="l2"
                                          defaultValue={2}
                                        />
                                        <label htmlFor="l2" />
                                        <input
                                          type="checkbox"
                                          id="l3"
                                          defaultValue={3}
                                        />
                                        <label htmlFor="l3" />
                                        <input
                                          type="checkbox"
                                          id="l4"
                                          defaultValue={4}
                                        />
                                        <label htmlFor="l4" />
                                        <input
                                          type="checkbox"
                                          id="l5"
                                          defaultValue={5}
                                        />
                                        <label htmlFor="l5" />
                                      </div>
                                    </div>
                                  </div>
                                  {/* col-lg-4 */}
                                  <div className="col-lg-4 responsive-column">
                                    <div className="rate-option-item">
                                      <label>Value for Money</label>
                                      <div className="rate-stars-option">
                                        <input
                                          type="checkbox"
                                          id="vm1"
                                          defaultValue={1}
                                        />
                                        <label htmlFor="vm1" />
                                        <input
                                          type="checkbox"
                                          id="vm2"
                                          defaultValue={2}
                                        />
                                        <label htmlFor="vm2" />
                                        <input
                                          type="checkbox"
                                          id="vm3"
                                          defaultValue={3}
                                        />
                                        <label htmlFor="vm3" />
                                        <input
                                          type="checkbox"
                                          id="vm4"
                                          defaultValue={4}
                                        />
                                        <label htmlFor="vm4" />
                                        <input
                                          type="checkbox"
                                          id="vm5"
                                          defaultValue={5}
                                        />
                                        <label htmlFor="vm5" />
                                      </div>
                                    </div>
                                  </div>
                                  {/* col-lg-4 */}
                                  <div className="col-lg-4 responsive-column">
                                    <div className="rate-option-item">
                                      <label>Cleanliness</label>
                                      <div className="rate-stars-option">
                                        <input
                                          type="checkbox"
                                          id="cln1"
                                          defaultValue={1}
                                        />
                                        <label htmlFor="cln1" />
                                        <input
                                          type="checkbox"
                                          id="cln2"
                                          defaultValue={2}
                                        />
                                        <label htmlFor="cln2" />
                                        <input
                                          type="checkbox"
                                          id="cln3"
                                          defaultValue={3}
                                        />
                                        <label htmlFor="cln3" />
                                        <input
                                          type="checkbox"
                                          id="cln4"
                                          defaultValue={4}
                                        />
                                        <label htmlFor="cln4" />
                                        <input
                                          type="checkbox"
                                          id="cln5"
                                          defaultValue={5}
                                        />
                                        <label htmlFor="cln5" />
                                      </div>
                                    </div>
                                  </div>
                                  {/* col-lg-4 */}
                                  <div className="col-lg-4 responsive-column">
                                    <div className="rate-option-item">
                                      <label>Facilities</label>
                                      <div className="rate-stars-option">
                                        <input
                                          type="checkbox"
                                          id="f1"
                                          defaultValue={1}
                                        />
                                        <label htmlFor="f1" />
                                        <input
                                          type="checkbox"
                                          id="f2"
                                          defaultValue={2}
                                        />
                                        <label htmlFor="f2" />
                                        <input
                                          type="checkbox"
                                          id="f3"
                                          defaultValue={3}
                                        />
                                        <label htmlFor="f3" />
                                        <input
                                          type="checkbox"
                                          id="f4"
                                          defaultValue={4}
                                        />
                                        <label htmlFor="f4" />
                                        <input
                                          type="checkbox"
                                          id="f5"
                                          defaultValue={5}
                                        />
                                        <label htmlFor="f5" />
                                      </div>
                                    </div>
                                  </div>
                                  {/* col-lg-4 */}
                                </div>
                              </div>
                              {/* end rate-option */}
                              <div className="contact-form-action">
                                <form method="post">
                                  <div className="row">
                                    <div className="col-lg-6 responsive-column">
                                      <div className="input-box">
                                        <label className="label-text">
                                          Name
                                        </label>
                                        <div className="form-group">
                                          <span className="la la-user form-icon" />
                                          <input
                                            className="form-control"
                                            type="text"
                                            name="text"
                                            placeholder="Your name"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6 responsive-column">
                                      <div className="input-box">
                                        <label className="label-text">
                                          Email
                                        </label>
                                        <div className="form-group">
                                          <span className="la la-envelope-o form-icon" />
                                          <input
                                            className="form-control"
                                            type="email"
                                            name="email"
                                            placeholder="Email address"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <div className="input-box">
                                        <label className="label-text">
                                          Message
                                        </label>
                                        <div className="form-group">
                                          <span className="la la-pencil form-icon" />
                                          <textarea
                                            className="message-control form-control"
                                            name="message"
                                            placeholder="Write message"
                                            defaultValue={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <div className="btn-box">
                                        <button
                                          type="button"
                                          className="theme-btn"
                                        >
                                          Leave a Review
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                              {/* end contact-form-action */}
                            </div>
                            {/* end form-content */}
                          </div>
                          {/* end form-box */}
                        </div>
                        {/* end comment-forum */}
                      </div>
                      {/* end single-content-item */}
                    </div>
                    {/* end review-box */}
                  </div>
                  {/* end single-content-wrap */}
                  <div className="col-lg-4">
                    <div className="sidebar single-content-sidebar mb-0">
                      <Sticky stickyStyle={stickySyle}>
                        <div className="sidebar-widget single-content-widget">
                          <div className="sidebar-widget-item">
                            <div className="sidebar-book-title-wrap mb-2">
                              <h3>Popular</h3>
                              <p>
                                <span className="text-value ml-2 mr-1">
                                  ₦
                                  {average_price
                                    ? parseInt(
                                        average_price -
                                          parseFloat(discount_rate) *
                                            0.01 *
                                            average_price
                                      )
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    : 0}
                                </span>
                                <span className="before-price">
                                  ₦
                                  {average_price
                                    ? average_price
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    : 0}
                                </span>
                              </p>
                            </div>
                          </div>
                          {/* end sidebar-widget-item */}

                          <div className="sidebar-widget-item">
                            <div className="contact-form-action">
                              <form>
                                <div className="input-box">
                                  <label className="label-text mb-0">
                                    Start date
                                  </label>
                                  <div className="form-group">
                                    <DateTime
                                      closeOnSelect
                                      dateFormat="DD/MM/YYYY"
                                      isValidDate={this.valid}
                                      value={start_date}
                                      onChange={(event) =>
                                        this.setState({
                                          start_date: event,
                                          openCheckIn: true,
                                        })
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="input-box">
                                  <label className="label-text mb-0">
                                    End date
                                  </label>
                                  <div className="form-group">
                                    <DateTime
                                      closeOnClickOutside={true}
                                      //  open={this.state.openCheckIn}
                                      dateFormat="DD/MM/YYYY"
                                      closeOnSelect
                                      isValidDate={this.validEndDate}
                                      value={end_date}
                                      onChange={(event) =>
                                        this.setState({
                                          end_date: event,
                                          openCheckIn: false,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                          {/* end sidebar-widget-item */}
                          <div className="sidebar-widget-item"></div>
                          {/* end sidebar-widget-item */}
                          <div className="btn-box pt-2">
                            <button
                              className="theme-btn text-center w-100 mb-2"
                              onClick={(e) => {
                                e.preventDefault();
                                this.book();
                              }}
                            >
                              {loader ? (
                                <WhiteLoader />
                              ) : (
                                <div>
                                  <i className="la la-shopping-cart mr-2 font-size-18" />
                                  Book Now
                                </div>
                              )}
                            </button>
                            <a
                              href="#"
                              className="theme-btn text-center w-100 theme-btn-transparent"
                            >
                              <i className="la la-heart-o mr-2" />
                              Add to Wishlist
                            </a>
                          </div>
                        </div>
                      </Sticky>

                      {/* end sidebar-widget */}
                      <div className="sidebar-widget single-content-widget">
                        <h3 className="title stroke-shape">Enquiry Form</h3>
                        <div className="enquiry-forum">
                          <div className="form-box">
                            <div className="form-content">
                              <div className="contact-form-action">
                                <form method="post">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Your Name
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-user form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="text"
                                        placeholder="Your name"
                                      />
                                    </div>
                                  </div>
                                  <div className="input-box">
                                    <label className="label-text">
                                      Your Email
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-envelope-o form-icon" />
                                      <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        placeholder="Email address"
                                      />
                                    </div>
                                  </div>
                                  <div className="input-box">
                                    <label className="label-text">
                                      Message
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-pencil form-icon" />
                                      <textarea
                                        className="message-control form-control"
                                        name="message"
                                        placeholder="Write message"
                                        defaultValue={""}
                                      />
                                    </div>
                                  </div>
                                  <div className="input-box">
                                    <div className="form-group">
                                      <div className="custom-checkbox mb-0">
                                        <input type="checkbox" id="agreeChb" />
                                        <label htmlFor="agreeChb">
                                          I agree with{" "}
                                          <a href="https://book24.ng/termss-and-conditions">
                                            Terms of Service
                                          </a>{" "}
                                          and
                                          <a href="https://privacy-policy">
                                            Privacy Policy
                                          </a>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="btn-box">
                                    <button type="button" className="theme-btn">
                                      Submit Enquiry
                                    </button>
                                  </div>
                                </form>
                              </div>
                              {/* end contact-form-action */}
                            </div>
                            {/* end form-content */}
                          </div>
                          {/* end form-box */}
                        </div>
                        {/* end enquiry-forum */}
                      </div>
                      {/* end sidebar-widget */}

                      <div className="sidebar-widget single-content-widget">
                        <h3 className="title stroke-shape">Get a Question?</h3>
                        <p className="font-size-14 line-height-24">
                          Do not hesitate to give us a call. We are an expert
                          team and we are happy to talk to you.
                        </p>
                        <div className="sidebar-list pt-3">
                          <ul className="list-items">
                            <li>
                              <i className="la la-phone icon-element mr-2" />
                              <a href="#">+ 234 706 400 4212</a>
                            </li>
                            <li>
                              <i className="la la-envelope icon-element mr-2" />
                              <a href="mailto:info@book24.ng">info@book24.ng</a>
                            </li>
                          </ul>
                        </div>
                        {/* end sidebar-list */}
                      </div>
                      {/* end sidebar-widget */}
                      <div className="sidebar-widget single-content-widget">
                        <h3 className="title stroke-shape">Rental Company</h3>
                        <div className="author-content">
                          <div className="d-flex">
                            <div className="author-img">
                              <a href="#">
                                <img
                                  src="/images/team8.jpg"
                                  alt="testimonial image"
                                />
                              </a>
                            </div>
                            <div className="author-bio">
                              <h4 className="author__title">
                                <a href="#">{rental_compnay}</a>
                              </h4>
                              <span className="author__meta">
                                Member Since 2020
                              </span>
                              <span className="ratings d-flex align-items-center">
                                <i className="la la-star" />
                                <i className="la la-star" />
                                <i className="la la-star" />
                                <i className="la la-star" />
                                <i className="la la-star-o" />
                                <span className="ml-2">305 Reviews</span>
                              </span>
                              <div className="btn-box pt-3">
                                <a
                                  href="#"
                                  className="theme-btn theme-btn-small theme-btn-transparent"
                                >
                                  Ask a Question
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* end sidebar-widget */}
                    </div>
                    {/* end sidebar */}
                  </div>
                </div>
                {/* end col-lg-8 */}
              </div>
            </div>
          </section>{" "}
        </div>
        <div className="section-block" />
        <section className="cta-area subscriber-area section-bg-2 padding-top-60px padding-bottom-60px">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="section-heading">
                  <h2 className="sec__title font-size-30 text-white">
                    Subscribe to see Secret Deals
                  </h2>
                </div>
              </div>
              {/* end col-lg-7 */}
              <div className="col-lg-5">
                <div className="subscriber-box">
                  <div className="contact-form-action">
                    <form action="#">
                      <div className="input-box">
                        <label className="label-text text-white">
                          Enter email address
                        </label>
                        <div className="form-group mb-0">
                          <span className="la la-envelope form-icon" />
                          <input
                            className="form-control"
                            type="email"
                            name="email"
                            placeholder="Email address"
                          />
                          <button
                            className="theme-btn theme-btn-small submit-btn"
                            type="submit"
                          >
                            Subscribe
                          </button>
                          <span className="font-size-14 pt-1 text-white-50">
                            <i className="la la-lock mr-1" />
                            Don't worry your information is safe with us.
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* end col-lg-5 */}
            </div>
          </div>
        </section>
        {/* end cta-area */}
        {/* ================================
    END CTA AREA
================================= */}
        <Footer />

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
        <script src="js/main.js"></script>
        <script src="js/common_scripts.js"></script>
        <script src="js/functions.js"></script>
        <script src="assets/validate.js"></script>
        <script src="http://maps.googleapis.com/maps/api/js"></script>
        <script src="js/map_single_hotel.js"></script>
        <script src="js/infobox.js"></script>
        <script src="js/input_qty.js"></script>
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
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  order: state.order,
});

const mapDispatchToProps = {
  setOrderUrl,
  setOrderData,
  setOrderPrice,
  setOrderImage,
  setOrderCheckInDate,
  setOrderCheckOutDate,
  setOrderName,
  setOrderSubData,
};

const DetailRental_ = withRouter(DetailRental);
const DetailRental__ = withAlert()(DetailRental_);
export default connect(mapStateToProps, mapDispatchToProps)(DetailRental__);
