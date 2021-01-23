import Head from "next/head";
import React, { Component } from "react";
import Header from "../components/header";
import DetailsHeader from "../components/detailsHeader";
import DetailsItem from "../components/detailsItem";
import PreLoader from "../components/preloader";
import SignInModal from "../components/signInModal";
import Footer from "../components/footer";
import $ from "jquery";
import Cookies from "js-cookie";
import moment from "moment";
import { withRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../components/config.js";
import { withAlert } from "react-alert";
import DateTime from "react-datetime";
import { connect } from "react-redux";
import {
  setOrderUrl,
  setOrderData,
  setOrderPrice,
} from "../store/actions/order";

class DetailCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      token: "",
      type: "",
      data: {},
      check_in_time: "",
      check_out_time: "",
      book_in_date:'',
      book_out_date:''
    };
  }

  async componentDidMount() {
    const id = this.props.router.query.id ? this.props.router.query.id : "";

    if (id == "") {
      this.props.router.push("/rental-list");
    }
    this.getData(id);
  }

  getData = (id) => {
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "cars/" + id, config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.length;
        if (len <= 0) {
          this.props.router.push("/car-list");
        }
        this.setState({
          data: response.data,
        });
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error.response);
      });
  };

  book = async () => {
    const { alert } = this.props;
    let token = await Cookies.get("token");
    const {
      book_in_date,
      book_out_date,
      data
    } = this.state;
    if (token == "") {
      return this.props.router.push("/account");
    }  else if (!book_in_date) {
      return alert.show(<div>Check in date is required</div>, {
        type: "error",
      });
    } else if (!book_out_date) {
      return alert.show(<div>Check out date is required</div>, {
        type: "error",
      });
    } else {
      const new_data = {
        price: parseInt(data.price),
        check_in_date: book_in_date,
        check_out_date: book_out_date,
      };
      this.props.setOrderData(new_data);
      this.props.setOrderUrl("carBooking");
      this.props.setOrderPrice(parseInt(data.price));
      this.props.router.push("/checkout");
    }
  };

  render() {
    const { data,book_in_date,book_out_date } = this.state;
    const { images, name, price } = data;
    const first_image = images && images[0] && images[0].url;

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
          {/* start cssload-loader */}
          
          <DetailsHeader makeBlue={true} />
          {/* ================================
    START BREADCRUMB TOP BAR
================================= */}
          <section className="breadcrumb-top-bar">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-list breadcrumb-top-list">
                    <ul className="list-items d-flex justify-content-start">
                      <li>
                        <a href="/">Home</a>
                      </li>
                      <li>
                        {data &&
                          data.location &&
                          data.location.substring(0, 1).toUpperCase() +
                            data.location.substring(1, data.location.length)}
                      </li>
                      <li>{data && data.name}</li>
                    </ul>
                  </div>
                  {/* end breadcrumb-list */}
                </div>
                {/* end col-lg-12 */}
              </div>
              {/* end row */}
            </div>
            {/* end container */}
          </section>
          {/* end breadcrumb-top-bar */}
          {/* ================================
    END BREADCRUMB TOP BAR
================================= */}
          {/* ================================
    START BREADCRUMB AREA
================================= */}
          <section
            className="breadcrumb-area bread-bg-8 py-0"
            style={{
              backgroundImage: `url(${first_image})`,
            }}
          >
            <div className="breadcrumb-wrap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="breadcrumb-btn">
                      <div className="btn-box">
                        {/* <a className="theme-btn" data-fancybox="video" data-src="https://www.youtube.com/watch?v=IPm6RPmI5_A" data-speed={700}>
                        <i className="la la-video-camera mr-2" />Video
                      </a> */}
                        <a
                          className="theme-btn"
                          data-src={first_image}
                          data-fancybox="gallery"
                          data-caption="Showing image - 01"
                          data-speed={700}
                        >
                          <i className="la la-photo mr-2" />
                          More Photos
                        </a>
                      </div>
                      {images.map((el, index) => {
                        if (index > 0) {
                          return (
                            <a
                              className="d-none"
                              data-fancybox="gallery"
                              data-src={el.url}
                              data-caption={
                                "Showing image - " + parseInt(index) + 1
                              }
                              data-speed={700}
                            />
                          );
                        }
                      })}
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
          {/* end breadcrumb-area */}
          {/* ================================
    END BREADCRUMB AREA
================================= */}
          {/* ================================
    START CAR DETAIL AREA
================================= */}
          <section className="car-detail-area padding-bottom-90px">
            <div
              className="single-content-navbar-wrap menu section-bg"
              id="single-content-navbar"
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="single-content-nav" id="single-content-nav">
                      <ul>
                        <li>
                          <a
                            data-scroll="description"
                            href="#description"
                            className="scroll-link active"
                          >
                            Car Details
                          </a>
                        </li>
                        <li>
                          <a
                            data-scroll="faq"
                            href="#faq"
                            className="scroll-link"
                          >
                            FAQs
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
            {/* end single-content-navbar-wrap */}
            <div className="single-content-box">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="single-content-wrap padding-top-60px">
                      <div id="description" className="page-scroll">
                        <div className="single-content-item pb-4">
                          <h3 className="title font-size-26">{name}</h3>
                          <div className="d-flex align-items-center pt-2">
                            <p className="mr-2">
                              {data &&
                                data.location &&
                                data.location.substring(0, 1).toUpperCase() +
                                  data.location.substring(
                                    1,
                                    data.location.length
                                  )}
                            </p>
                            <p>
                              <span className="badge badge-warning text-white font-size-16">
                                4.6
                              </span>
                              <span>(4,209 Reviews)</span>
                            </p>
                          </div>
                        </div>
                        {/* end single-content-item */}
                        <div className="section-block" />
                        <div className="single-content-item py-4">
                          <div className="row">
                            <div className="col-lg-6 responsive-column">
                              {/* <div className="single-feature-titles mb-3">
                              <h3 className="title font-size-16">Pick-up location details</h3>
                              <span className="font-size-13">Phone: +234 812 557 8767</span>
                            </div> */}
                              <div className="section-block" />
                              {/* <div className="single-feature-titles my-3">
                              <h3 className="title font-size-15 font-weight-medium">Pick-up Time</h3>
                              <span className="font-size-13">12 Jun 2020, 7:50 am</span>
                            </div> */}
                              {/* <div className="single-feature-titles mb-3">
                              <h3 className="title font-size-15 font-weight-medium">Location</h3>
                              <span className="font-size-13">London city, airport</span>
                            </div> */}
                            </div>
                            {/* end col-lg-6 */}
                            <div className="col-lg-6 responsive-column">
                              {/* <div className="single-feature-titles mb-3">
                              <h3 className="title font-size-16">Drop-off location details</h3>
                              <span className="font-size-13">Phone: +234 812 557 8767</span>
                            </div> */}
                              <div className="section-block" />
                              {/* <div className="single-feature-titles my-3">
                              <h3 className="title font-size-15 font-weight-medium">Drop-off Time</h3>
                              <span className="font-size-13">13 Jun 2020, 5:50 am</span>
                            </div> */}
                              <div className="single-feature-titles mb-3">
                                <h3 className="title font-size-15 font-weight-medium">
                                  Location
                                </h3>
                                <span className="font-size-13">
                                  {data &&
                                    data.location &&
                                    data.location
                                      .substring(0, 1)
                                      .toUpperCase() +
                                      data.location.substring(
                                        1,
                                        data.location.length
                                      )}
                                </span>
                              </div>
                            </div>
                            {/* end col-lg-6 */}
                            <div className="col-lg-12">
                              <div className="section-block margin-bottom-35px" />
                            </div>
                            {/* end col-lg-12 */}
                            <div className="col-lg-4 responsive-column">
                              <div className="single-tour-feature d-flex align-items-center mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-car" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium">
                                    Rental Company
                                  </h3>
                                  <span className="font-size-13">
                                    {data && data.rental_company}
                                  </span>
                                </div>
                              </div>
                              {/* end single-tour-feature */}
                            </div>
                            {/* end col-lg-4 */}
                            <div className="col-lg-4 responsive-column">
                              <div className="single-tour-feature d-flex align-items-center mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-car" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium">
                                    Car Type
                                  </h3>
                                  <span className="font-size-13">
                                    {data && data.type}
                                  </span>
                                </div>
                              </div>
                              {/* end single-tour-feature */}
                            </div>
                            {/* end col-lg-4 */}
                            <div className="col-lg-4 responsive-column">
                              <div className="single-tour-feature d-flex align-items-center mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-car" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium">
                                    Car Name
                                  </h3>
                                  <span className="font-size-13">{name}</span>
                                </div>
                              </div>
                              {/* end single-tour-feature */}
                            </div>
                            {/* end col-lg-4 */}
                            <div className="col-lg-4 responsive-column">
                              <div className="single-tour-feature d-flex align-items-center mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-users" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium">
                                    Passengers
                                  </h3>
                                  <span className="font-size-13">
                                    {data && data.passenger_no}
                                  </span>
                                </div>
                              </div>
                              {/* end single-tour-feature */}
                            </div>
                            {/* end col-lg-4 */}
                            <div className="col-lg-4 responsive-column">
                              <div className="single-tour-feature d-flex align-items-center mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-briefcase" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium">
                                    Baggage
                                  </h3>
                                  <span className="font-size-13">
                                    {data && data.baggage_no}
                                  </span>
                                </div>
                              </div>
                              {/* end single-tour-feature */}
                            </div>
                            {/* end col-lg-4 */}
                            <div className="col-lg-4 responsive-column">
                              <div className="single-tour-feature d-flex align-items-center mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-gear" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium">
                                    Car Features
                                  </h3>
                                  <span className="font-size-13">
                                    Available
                                  </span>
                                </div>
                              </div>
                              {/* end single-tour-feature */}
                            </div>
                            {/* end col-lg-4 */}
                          </div>
                          {/* end row */}
                        </div>
                        {/* end single-content-item */}
                        <div className="section-block" />
                        <div className="single-content-item padding-top-40px padding-bottom-40px">
                          <h3 className="title font-size-20">
                            Car Rental Information
                          </h3>
                          <p className="py-3">{data && data.description}</p>
                        </div>
                        {/* end single-content-item */}
                        <div className="section-block" />
                      </div>
                      {/* end description */}
                      <div id="faq" className="page-scroll">
                        <div className="single-content-item padding-top-40px padding-bottom-40px">
                          <h3 className="title font-size-20">FAQs</h3>
                          <div
                            className="accordion accordion-item padding-top-30px"
                            id="accordionExample2"
                          >
                            <div className="card">
                              <div className="card-header" id="faqHeadingFour">
                                <h2 className="mb-0">
                                  <button
                                    className="btn btn-link d-flex align-items-center justify-content-end flex-row-reverse font-size-16"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#faqCollapseFour"
                                    aria-expanded="true"
                                    aria-controls="faqCollapseFour"
                                  >
                                    <span className="ml-3">
                                      What do I need to hire a car?
                                    </span>
                                    <i className="la la-minus" />
                                    <i className="la la-plus" />
                                  </button>
                                </h2>
                              </div>
                              <div
                                id="faqCollapseFour"
                                className="collapse show"
                                aria-labelledby="faqHeadingFour"
                                data-parent="#accordionExample2"
                              >
                                <div className="card-body d-flex">
                                  <p>
                                    You need to hire a car if you need to
                                    quickly move around with ease and convience
                                    or if you want to drive your dream car which
                                    you don't already own
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/* end card */}
                            <div className="card">
                              <div className="card-header" id="faqHeadingFive">
                                <h2 className="mb-0">
                                  <button
                                    className="btn btn-link d-flex align-items-center justify-content-end flex-row-reverse font-size-16"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#faqCollapseFive"
                                    aria-expanded="false"
                                    aria-controls="faqCollapseFive"
                                  >
                                    <span className="ml-3">
                                      How old do I have to be to rent a car?
                                    </span>
                                    <i className="la la-minus" />
                                    <i className="la la-plus" />
                                  </button>
                                </h2>
                              </div>
                              <div
                                id="faqCollapseFive"
                                className="collapse"
                                aria-labelledby="faqHeadingFive"
                                data-parent="#accordionExample2"
                              >
                                <div className="card-body d-flex">
                                  <p>
                                    You need to be 18 years and above with a
                                    valid means of Identification and a Drivers
                                    License
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/* end card */}
                            <div className="card">
                              <div className="card-header" id="faqHeadingSix">
                                <h2 className="mb-0">
                                  <button
                                    className="btn btn-link d-flex align-items-center justify-content-end flex-row-reverse font-size-16"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#faqCollapseSix"
                                    aria-expanded="false"
                                    aria-controls="faqCollapseSix"
                                  >
                                    <span className="ml-3">
                                      Can I book a hire car for someone else?
                                    </span>
                                    <i className="la la-minus" />
                                    <i className="la la-plus" />
                                  </button>
                                </h2>
                              </div>
                              <div
                                id="faqCollapseSix"
                                className="collapse"
                                aria-labelledby="faqHeadingSix"
                                data-parent="#accordionExample2"
                              >
                                <div className="card-body d-flex">
                                  <p>
                                    Yes you can, All you need to do is provide
                                    all neccessary documentation
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/* end card */}
                            <div className="card">
                              <div className="card-header" id="faqHeadingSeven">
                                <h2 className="mb-0">
                                  <button
                                    className="btn btn-link d-flex align-items-center justify-content-end flex-row-reverse font-size-16"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#faqCollapseSeven"
                                    aria-expanded="false"
                                    aria-controls="faqCollapseSeven"
                                  >
                                    <span className="ml-3">
                                      How do I find the cheapest car hire deal?
                                    </span>
                                    <i className="la la-minus" />
                                    <i className="la la-plus" />
                                  </button>
                                </h2>
                              </div>
                              <div
                                id="faqCollapseSeven"
                                className="collapse"
                                aria-labelledby="faqHeadingSeven"
                                data-parent="#accordionExample2"
                              >
                                <div className="card-body d-flex">
                                  <p>
                                    You can find the cheapest car hire by
                                    searching our website or mobile apps and
                                    filtering your search based on the price
                                    range of your choice
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/* end card */}
                          </div>
                        </div>
                        {/* end single-content-item */}
                        <div className="section-block" />
                      </div>
                      {/* end faq */}
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
                              {/* end col-lg-4 */}
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
                                  {/* end row */}
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
                                  src="images/team8.jpg"
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
                                    <p className="comment__date">
                                      April 5, 2019
                                    </p>
                                  </div>
                                </div>
                                <p className="comment-content">
                                  Lorem ipsum dolor sit amet, dolores mandamus
                                  moderatius ea ius, sed civibus vivendum
                                  imperdiet ei, amet tritani sea id. Ut veri
                                  diceret fierent mei, qui facilisi suavitate
                                  euripidis
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
                            <div className="comment comment-reply-item">
                              <div className="comment-avatar">
                                <img
                                  className="avatar__img"
                                  alt=""
                                  src="images/team9.jpg"
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
                                    <p className="comment__date">
                                      April 5, 2019
                                    </p>
                                  </div>
                                </div>
                                <p className="comment-content">
                                  Lorem ipsum dolor sit amet, dolores mandamus
                                  moderatius ea ius, sed civibus vivendum
                                  imperdiet ei, amet tritani sea id. Ut veri
                                  diceret fierent mei, qui facilisi suavitate
                                  euripidis
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
                                  src="images/team10.jpg"
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
                                    <p className="comment__date">
                                      April 5, 2019
                                    </p>
                                  </div>
                                </div>
                                <p className="comment-content">
                                  Lorem ipsum dolor sit amet, dolores mandamus
                                  moderatius ea ius, sed civibus vivendum
                                  imperdiet ei, amet tritani sea id. Ut veri
                                  diceret fierent mei, qui facilisi suavitate
                                  euripidis
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
                                  {/* end row */}
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
                  </div>
                  {/* end col-lg-8 */}
                  <div className="col-lg-4">
                    <div className="sidebar single-content-sidebar mb-0">
                      <div className="sidebar-widget single-content-widget">
                        <div className="sidebar-widget-item">
                          <div className="sidebar-book-title-wrap mb-3">
                            <h3>Popular</h3>
                            <p>
                              <span className="text-form">From</span>
                              <span className="text-value ml-2 mr-1">
                                ₦
                                {data &&
                                  parseInt(data.price)
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                <small className="font-size-15 font-weight-bold ml-1 color-text-3">
                                  /day
                                </small>
                              </span>
                              <span className="before-price">
                                ₦
                                {data &&
                                  (parseInt(data.price) + 10000)
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </span>
                            </p>
                          </div>
                        </div>
                        {/* end sidebar-widget-item */}
                        <div className="sidebar-widget-item">
                          <div className="contact-form-action">
                            <form action="#">
                              <div className="input-box">
                                <label className="label-text">
                                  Pick-up From
                                </label>
                                <div className="form-group">
                                  <span className="la la-map-marker form-icon" />
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="text"
                                    placeholder="Destination, city, or airport"
                                  />
                                </div>
                              </div>
                              <div className="input-box">
                                <label className="label-text">
                                  Drop-off to
                                </label>
                                <div className="form-group">
                                  <span className="la la-map-marker form-icon" />
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="text"
                                    placeholder="Destination, city, or airport"
                                  />
                                </div>
                              </div>
                              <div className="input-box">
                                <label className="label-text">
                                  Pick-up Date
                                </label>
                                <div className="form-group">
                                  <span className="la la-calendar form-icon" />
                                  <DateTime
                                        isValidDate={this.valid}
                                        value={book_in_date}
                                        onChange={(event) =>
                                          this.setState({ book_in_date: event })
                                        }
                                      />
                                </div>
                              </div>
                              <div className="input-box">
                                <label className="label-text">Time</label>
                                <div className="form-group">
                                  <div className="select-contain w-auto">
                                    <select className="select-contain-select">
                                      <option value="1200AM">12:00AM</option>
                                      <option value="1230AM">12:30AM</option>
                                      <option value="0100AM">1:00AM</option>
                                      <option value="0130AM">1:30AM</option>
                                      <option value="0200AM">2:00AM</option>
                                      <option value="0230AM">2:30AM</option>
                                      <option value="0300AM">3:00AM</option>
                                      <option value="0330AM">3:30AM</option>
                                      <option value="0400AM">4:00AM</option>
                                      <option value="0430AM">4:30AM</option>
                                      <option value="0500AM">5:00AM</option>
                                      <option value="0530AM">5:30AM</option>
                                      <option value="0600AM">6:00AM</option>
                                      <option value="0630AM">6:30AM</option>
                                      <option value="0700AM">7:00AM</option>
                                      <option value="0730AM">7:30AM</option>
                                      <option value="0800AM">8:00AM</option>
                                      <option value="0830AM">8:30AM</option>
                                      <option value="0900AM" selected>
                                        9:00AM
                                      </option>
                                      <option value="0930AM">9:30AM</option>
                                      <option value="1000AM">10:00AM</option>
                                      <option value="1030AM">10:30AM</option>
                                      <option value="1100AM">11:00AM</option>
                                      <option value="1130AM">11:30AM</option>
                                      <option value="1200PM">12:00PM</option>
                                      <option value="1230PM">12:30PM</option>
                                      <option value="0100PM">1:00PM</option>
                                      <option value="0130PM">1:30PM</option>
                                      <option value="0200PM">2:00PM</option>
                                      <option value="0230PM">2:30PM</option>
                                      <option value="0300PM">3:00PM</option>
                                      <option value="0330PM">3:30PM</option>
                                      <option value="0400PM">4:00PM</option>
                                      <option value="0430PM">4:30PM</option>
                                      <option value="0500PM">5:00PM</option>
                                      <option value="0530PM">5:30PM</option>
                                      <option value="0600PM">6:00PM</option>
                                      <option value="0630PM">6:30PM</option>
                                      <option value="0700PM">7:00PM</option>
                                      <option value="0730PM">7:30PM</option>
                                      <option value="0800PM">8:00PM</option>
                                      <option value="0830PM">8:30PM</option>
                                      <option value="0900PM">9:00PM</option>
                                      <option value="0930PM">9:30PM</option>
                                      <option value="1000PM">10:00PM</option>
                                      <option value="1030PM">10:30PM</option>
                                      <option value="1100PM">11:00PM</option>
                                      <option value="1130PM">11:30PM</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="input-box">
                                <label className="label-text">
                                  Drop-off Date
                                </label>
                                <div className="form-group">
                                  <span className="la la-calendar form-icon" />
                                  <DateTime
                                        isValidDate={this.valid}
                                        value={book_out_date}
                                        onChange={(event) =>
                                          this.setState({
                                            book_out_date: event,
                                          })
                                        }
                                      />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                        {/* end sidebar-widget-item */} {/* end main-search-input-item */}
                        <div className="btn-box pt-2">
                          <a
                            onClick={this.book}
                            className="theme-btn text-center w-100 mb-2"
                          >
                            <i className="la la-shopping-cart mr-2 font-size-18" />
                            Book Now
                          </a>
                          <a
                            href="#"
                            className="theme-btn text-center w-100 theme-btn-transparent"
                          >
                            <i className="la la-heart-o mr-2" />
                            Add to Wishlist
                          </a>
                          <div className="d-flex align-items-center justify-content-between pt-2">
                            <a
                              href="#"
                              className="btn theme-btn-hover-gray font-size-15"
                              data-toggle="modal"
                              data-target="#sharePopupForm"
                            >
                              <i className="la la-share mr-1" />
                              Share
                            </a>
                            <p>
                              <i className="la la-eye mr-1 font-size-15 color-text-2" />
                              3456
                            </p>
                          </div>
                        </div>
                      </div>
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
                                        <input type="checkbox" id="agreechb" />
                                        <label htmlFor="agreechb">
                                          I agree with{" "}
                                          <a href="https://book24.ng/terms">
                                            Terms of Service
                                          </a>{" "}
                                          and
                                          <a href="https://book24.ng/privacy-policy">
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
                        <h3 className="title stroke-shape">
                          Why Book With Us?
                        </h3>
                        <div className="sidebar-list">
                          <ul className="list-items">
                            <li>
                              <i className="la la-dollar icon-element mr-2" />
                              No-hassle best price guarantee
                            </li>
                            <li>
                              <i className="la la-microphone icon-element mr-2" />
                              Customer care available 24/7
                            </li>
                            <li>
                              <i className="la la-thumbs-up icon-element mr-2" />
                              Hand-picked Services &amp; Activities
                            </li>
                            <li>
                              <i className="la la-file-text icon-element mr-2" />
                              Free Travel Guide
                            </li>
                          </ul>
                        </div>
                        {/* end sidebar-list */}
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
                        <h3 className="title stroke-shape">Organized by</h3>
                        <div className="author-content">
                          <div className="d-flex">
                            <div className="author-img">
                              <a href="#">
                                <img
                                  src="images/team8.jpg"
                                  alt="testimonial image"
                                />
                              </a>
                            </div>
                            <div className="author-bio">
                              <h4 className="author__title">
                                <a href="#">royaltravelagency</a>
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
                  {/* end col-lg-4 */}
                </div>
                {/* end row */}
              </div>
              {/* end container */}
            </div>
            {/* end single-content-box */}
          </section>
          {/* end car-detail-area */}
          {/* ================================
    END CAR DETAIL AREA
================================= */}
          <div className="section-block" />
          {/* ================================
    START RELATED AREA
================================= */}
          <section className="related-area section--padding">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-heading text-center">
                    <h2 className="sec__title">You might also like</h2>
                  </div>
                  {/* end section-heading */}
                </div>
                {/* end col-lg-12 */}
              </div>
              {/* end row */}
              <div className="row padding-top-50px">
                <div className="col-lg-4 responsive-column">
                  <div className="card-item car-card">
                    <div className="card-img">
                      <a href="car-single.html" className="d-block">
                        <img src="images/car-img.png" alt="car-img" />
                      </a>
                      <span className="badge">Bestseller</span>
                      <div
                        className="add-to-wishlist icon-element"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Save for later"
                      >
                        <i className="la la-heart-o" />
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="card-meta">Compact SUV</p>
                      <h3 className="card-title">
                        <a href="car-single.html">Toyota Corolla or Similar</a>
                      </h3>
                      <div className="card-rating">
                        <span className="badge text-white">4.4/5</span>
                        <span className="review__text">Average</span>
                        <span className="rating__text">(30 Reviews)</span>
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
                          <span className="price__num">23,000</span>
                          <span className="price__text">Per day</span>
                        </p>
                        <a href="car-single.html" className="btn-text">
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
                        <img src="images/car-img2.png" alt="car-img" />
                      </a>
                      <div
                        className="add-to-wishlist icon-element"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Save for later"
                      >
                        <i className="la la-heart-o" />
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="card-meta">Standard</p>
                      <h3 className="card-title">
                        <a href="car-single.html">
                          Volkswagen Jetta 2 Doors or Similar
                        </a>
                      </h3>
                      <div className="card-rating">
                        <span className="badge text-white">4.4/5</span>
                        <span className="review__text">Average</span>
                        <span className="rating__text">(30 Reviews)</span>
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
                          <span className="price__num">33,000</span>
                          <span className="price__text">Per day</span>
                        </p>
                        <a href="car-single.html" className="btn-text">
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
                        <img src="images/car-img3.png" alt="car-img" />
                      </a>
                      <span className="badge">featured</span>
                      <div
                        className="add-to-wishlist icon-element"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Save for later"
                      >
                        <i className="la la-heart-o" />
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="card-meta">Compact Elite</p>
                      <h3 className="card-title">
                        <a href="car-single.html">Toyota Yaris or Similar</a>
                      </h3>
                      <div className="card-rating">
                        <span className="badge text-white">4.4/5</span>
                        <span className="review__text">Average</span>
                        <span className="rating__text">(30 Reviews)</span>
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
                          <span className="price__num">23,000</span>
                          <span className="price__text">Per day</span>
                        </p>
                        <a href="car-single.html" className="btn-text">
                          See details
                          <i className="la la-angle-right" />
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* end card-item */}
                </div>
                {/* end col-lg-4 */}
              </div>
              {/* end row */}
            </div>
            {/* end container */}
          </section>
          {/* end related-area */}
          {/* ================================
    END RELATED AREA
================================= */}
          {/* ================================
    START CTA AREA
================================= */}
          <section className="cta-area subscriber-area section-bg-2 padding-top-60px padding-bottom-60px">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-7">
                  <div className="section-heading">
                    <h2 className="sec__title font-size-30 text-white">
                      Subscribe to see Secret Deals
                    </h2>
                  </div>
                  {/* end section-heading */}
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
                  {/* end section-heading */}
                </div>
                {/* end col-lg-5 */}
              </div>
              {/* end row */}
            </div>
            {/* end container */}
          </section>
          {/* end cta-area */}
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
const mapStateToProps = (state) => ({
  order: state.order,
});

const mapDispatchToProps = {
  setOrderUrl,
  setOrderPrice,
  setOrderData,
};

const DetailCar_ = withRouter(DetailCar);
const DetailCar__ = withAlert()(DetailCar_);
export default connect(mapStateToProps, mapDispatchToProps)(DetailCar__);
