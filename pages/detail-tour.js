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
import { withAlert } from "react-alert";
import { connect } from "react-redux";
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
import { Carousel } from "react-responsive-carousel";

class DetailTour extends Component {
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
      location: "",
      address: "",
      tours: [],
      id: "",
      images: [],
      author: "",
      no_of_tickets: "",
      selected_ticket: "",
      infantsNo: 0,
      childrenNo: 0,
      adultsNo: 0,
      discount_rate: "",
      contact_email: "",
      contact_phone: "",
      loader: false,
    };
  }

  async componentDidMount() {
    const id = this.props.router.query.id ? this.props.router.query.id : "";
    if (id == "") {
      this.props.router.push("/tour-list");
    }
    this.getData(id);
  }

  getData = (id) => {
    this.setState({ loader: true });
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "tours/" + id, config)
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
          sub_items: response.data.tour_packages,
          location: response.data.location,

          images: response.data.images,
          id: response.data.id,
          author: response.data.author,
          discount_rate: parseFloat(response.data.discount_rate),
          contact_email: response.data.contact_email,
          contact_phone: response.data.contact_phone,
        });
        this.getTours();
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error.response);
      })
      .finally(() => this.setState({ loader: false }));
  };

  getTours = () => {
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "tours/", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.length;
        this.setState({ tours: response.data.rows });
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
      no_of_tickets,
      selected_ticket,
      images,
      check_in_time,
      check_out_time,
      discount_rate,
      name,
      adultsNo,
    } = this.state;
    if (token == "") {
      return this.props.router.push("/account");
    } else if (!selected_ticket) {
      return alert.show(<div>Select a tour package to book</div>, {
        type: "error",
      });
    } else if (!no_of_tickets) {
      return alert.show(<div>No of tickets is required</div>, {
        type: "error",
      });
    } else if (!adultsNo) {
      return alert.show(<div>Add at least one adult</div>, {
        type: "error",
      });
    } else {
      const new_data = {
        tour_id: this.props.router.query.id,
        no_of_tickets: parseInt(no_of_tickets),
        price:
          parseInt(
            selected_ticket.price - discount_rate * 0.01 * selected_ticket.price
          ) * parseInt(no_of_tickets),
      };
      this.props.setOrderData(new_data);
      this.props.setOrderUrl("tourBooking");
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

  increment = (item, state) => {
    this.setState({ [item]: state + 1 });
  };

  decrement = (item, state) => {
    this.setState({ [item]: (state > 0 && state - 1) || 0 });
  };
  render() {
    const {
      name,
      address,
      description,
      check_in_time,
      check_out_time,
      sub_items,
      images,
      tours,
      location,
      author,
      id,
      no_of_tickets,
      infantsNo,
      childrenNo,
      adultsNo,
      selected_ticket,
      discount_rate,
      loader,
    } = this.state;
    sub_items.sort(function (a, b) {
      return parseInt(a.price) - parseInt(b.price);
    });
    let tourPrice = sub_items && sub_items[0] && sub_items[0].price;

    const first_image = images && images[0] && images[0].url;
    let a = moment(check_in_time);
    let b = moment(check_out_time);
    let duration = Math.abs(a.diff(b, "days") || 1);
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
          {/* <link rel="stylesheet" href="css/owl.carousel.min.css" />
          <link rel="stylesheet" href="css/owl.theme.default.min.css" /> */}
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
          {/* ================================
    START BREADCRUMB TOP BAR
================================= */}
          <section className="breadcrumb-top-bar">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-list breadcrumb-top-list">

                  
                  </div>
                  {/* end breadcrumb-list */}

                  <div className="single-content-item py-4">
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
                    <div className="d-flex flex-wrap align-items-center pt-2">
                      <p className="mr-2">{address}</p>
                      {/* <p>
                        <span className="badge badge-warning text-white font-size-16">
                          4.6
                        </span>
                        <span>(4,209 Reviews)</span>
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
                          >
                            <ul>
                              <li>
                                <a
                                  data-scroll="description"
                                  href="#description"
                                  className="scroll-link active"
                                >
                                  Description
                                </a>
                              </li>
                              <li>
                                <a
                                  data-scroll="itinerary"
                                  href="#itinerary"
                                  className="scroll-link"
                                >
                                  Itinerary
                                </a>
                              </li>
                              <li>
                                <a
                                  data-scroll="photo"
                                  href="#photo"
                                  className="scroll-link"
                                >
                                  Photo
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
                                  data-scroll="location-map"
                                  href="#location-map"
                                  className="scroll-link"
                                >
                                  Map
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
                    <section
                      className="breadcrumb-area py-0"
                      // style={{
                      //   backgroundImage: `url(${first_image})`,
                      // }}
                    >
                      <div className="breadcrumb-wrap">
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-12 px-0">
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

                    <div className="single-content-wrap padding-top-20px">
                      <div id="description" className="page-scroll">
                        <div className="section-block" />
                        <div className="single-content-item py-4">
                          <div className="row">
                            <div className="col-lg-4 responsive-column">
                              <div className="single-tour-feature d-flex align-items-center mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-clock-o" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium">
                                    Duration
                                  </h3>
                                  <span className="font-size-13">
                                    {duration} Day{duration > 1 ? "s" : ""}
                                  </span>
                                </div>
                              </div>
                              {/* end single-tour-feature */}
                            </div>
                            {/* end col-lg-4 */}
                            {/* <div className="col-lg-4 responsive-column">
                              <div className="single-tour-feature d-flex align-items-center mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-users" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium">
                                    Group Size
                                  </h3>
                                  <span className="font-size-13">
                                    30 People
                                  </span>
                                </div>
                              </div>
                            </div> */}
                            {/* end col-lg-4 */}
                            {/* <div className="col-lg-4 responsive-column">
                              <div className="single-tour-feature d-flex align-items-center mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-globe" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium">
                                    Tour Type
                                  </h3>
                                  <span className="font-size-13">
                                    Adventures Tour
                                  </span>
                                </div>
                              </div>
                            </div> */}
                            {/* end col-lg-4 */}
                            <div className="col-lg-4 responsive-column">
                              <div className="single-tour-feature d-flex align-items-center mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-calendar" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium">
                                    Date
                                  </h3>
                                  <span className="font-size-13">
                                    {moment(check_in_time).format("MM DD YYYY")}{" "}
                                    -{" "}
                                    {moment(check_out_time).format(
                                      "MM DD YYYY"
                                    )}
                                  </span>
                                </div>
                              </div>
                              {/* end single-tour-feature */}
                            </div>
                            {/* end col-lg-4 */}
                            {/* <div className="col-lg-4 responsive-column">
                              <div className="single-tour-feature d-flex align-items-center mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-user" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium">
                                    Min Age
                                  </h3>
                                  <span className="font-size-13">10+</span>
                                </div>
                              </div>
                            </div> */}
                            {/* end col-lg-4 */}
                            {/* <div className="col-lg-4 responsive-column">
                              <div className="single-tour-feature d-flex align-items-center mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-plane" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium">
                                    Pickup From
                                  </h3>
                                  <span className="font-size-13">Airport</span>
                                </div>
                              </div>
                            </div> */}
                            {/* end col-lg-4 */}
                          </div>
                          {/* end row */}
                        </div>

                        <div className="section-block" />
                        <div className="single-content-item padding-top-40px padding-bottom-40px">
                          <h3 className="title font-size-20">Description</h3>
                          <p className="py-3">{description}</p>
                          {/* <p className="pb-4">
                            visit the great wall of china and have fun
                          </p> */}
                          {/* <h3 className="title font-size-15 font-weight-medium pb-3">
                            Highlights
                          </h3>
                          <div className="row">
                            <div className="col-lg-6 responsive-column">
                              <ul className="list-items pb-3">
                                <li>
                                  <i className="la la-dot-circle text-color mr-2" />
                                  bus tour
                                </li>
                                <li>
                                  <i className="la la-dot-circle text-color mr-2" />
                                  visit chinese restaurant
                                </li>
                                <li>
                                  <i className="la la-dot-circle text-color mr-2" />
                                  make friends
                                </li>
                                <li>
                                  <i className="la la-dot-circle text-color mr-2" />
                                  photoshoot
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-6 responsive-column">
                              <ul className="list-items pb-3">
                                <li>
                                  <i className="la la-dot-circle text-color mr-2" />
                                  bus tour
                                </li>
                                <li>
                                  <i className="la la-dot-circle text-color mr-2" />
                                  photoshoot
                                </li>
                                <li>
                                  <i className="la la-dot-circle text-color mr-2" />
                                  make friends
                                </li>
                                <li>
                                  <i className="la la-dot-circle text-color mr-2" />
                                  chinese restaurants
                                </li>
                              </ul>
                            </div>
                          </div>
                       */}
                          {/* <div className="row">
                            <div className="col-lg-6 responsive-column">
                              <h3 className="title font-size-15 font-weight-medium pb-3">
                                Included
                              </h3>
                              <ul className="list-items">
                                <li>
                                  <i className="la la-check text-success mr-2" />
                                  Airfare
                                </li>
                                <li>
                                  <i className="la la-check text-success mr-2" />
                                  Local Transportation
                                </li>
                                <li>
                                  <i className="la la-check text-success mr-2" />
                                  Accommodation
                                </li>
                                <li>
                                  <i className="la la-check text-success mr-2" />
                                  Tour Guide
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-6 responsive-column">
                              <h3 className="title font-size-15 font-weight-medium pb-3">
                                Not Included
                              </h3>
                              <ul className="list-items">
                                <li>
                                  <i className="la la-times text-danger mr-2" />
                                  Entrance Fees
                                </li>
                                <li>
                                  <i className="la la-times text-danger mr-2" />
                                  Guide Gratuity
                                </li>
                                <li>
                                  <i className="la la-times text-danger mr-2" />
                                  Lunch
                                </li>
                                <li>
                                  <i className="la la-times text-danger mr-2" />
                                  Dinner
                                </li>
                              </ul>
                            </div>
                          </div> */}
                          {/* end row */}
                        </div>

                        <div className="section-block" />
                      </div>
                      {/* end description */}
                      <div id="itinerary" className="page-scroll">
                        <div className="single-content-item padding-top-40px padding-bottom-40px">
                          <h3 className="title font-size-20">Itinerary</h3>
                          <div
                            className="accordion accordion-item padding-top-30px"
                            id="accordionExample"
                          >
                            <div className="card">
                              <div className="card-header" id="faqHeadingOne">
                                <h2 className="mb-0">
                                  <button
                                    className="btn btn-link d-flex align-items-center justify-content-between font-size-16"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#faqCollapseOne"
                                    aria-expanded="true"
                                    aria-controls="faqCollapseOne"
                                  >
                                    <span>
                                      Day 01 - Linfen – Historical place in
                                      Beijing
                                    </span>
                                  </button>
                                </h2>
                              </div>
                              <div
                                id="faqCollapseOne"
                                className="collapse show"
                                aria-labelledby="faqHeadingOne"
                                data-parent="#accordionExample"
                              >
                                <div className="card-body d-flex align-items-center">
                                  <div className="flex-shrink-0 mt-2 mr-4">
                                    <img
                                      src="images/small-img.jpg"
                                      alt="destination-img"
                                    />
                                  </div>
                                  <p>
                                    Full tour of the historical place in Beijing
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="card">
                              <div className="card-header" id="faqHeadingTwo">
                                <h2 className="mb-0">
                                  <button
                                    className="btn btn-link d-flex align-items-center justify-content-between font-size-16"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#faqCollapseTwo"
                                    aria-expanded="true"
                                    aria-controls="faqCollapseTwo"
                                  >
                                    <span>
                                      Day 02 - Beijing - Temple of Heaven
                                    </span>
                                  </button>
                                </h2>
                              </div>
                              <div
                                id="faqCollapseTwo"
                                className="collapse"
                                aria-labelledby="faqHeadingTwo"
                                data-parent="#accordionExample"
                              >
                                <div className="card-body d-flex align-items-center">
                                  <div className="flex-shrink-0 mt-2 mr-4">
                                    <img
                                      src="images/small-img2.jpg"
                                      alt="destination-img"
                                    />
                                  </div>
                                  <p>Visit of the temple of heaven</p>
                                </div>
                              </div>
                            </div>

                            <div className="card">
                              <div className="card-header" id="faqHeadingThree">
                                <h2 className="mb-0">
                                  <button
                                    className="btn btn-link d-flex align-items-center justify-content-between font-size-16"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#faqCollapseThree"
                                    aria-expanded="true"
                                    aria-controls="faqCollapseThree"
                                  >
                                    <span>Day 03 - Jinan to New york</span>
                                  </button>
                                </h2>
                              </div>
                              <div
                                id="faqCollapseThree"
                                className="collapse"
                                aria-labelledby="faqHeadingThree"
                                data-parent="#accordionExample"
                              >
                                <div className="card-body d-flex align-items-center">
                                  <div className="flex-shrink-0 mt-2 mr-4">
                                    <img
                                      src="images/small-img3.jpg"
                                      alt="destination-img"
                                    />
                                  </div>
                                  <p>visit from jinan to new york</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="section-block" />
                      </div>

                      {/* <div id="photo" className="page-scroll">
                        <div className="single-content-item padding-top-40px padding-bottom-40px">
                          <h3 className="title font-size-20">Photo</h3>
                          <div className="gallery-carousel carousel-action padding-top-30px">
                            <div className="card-item mb-0">
                              <div className="card-img">
                                <img
                                  src="images/destination-img2.jpg"
                                  alt="Destination-img"
                                />
                              </div>
                            </div>
                            
                            <div className="card-item mb-0">
                              <div className="card-img">
                                <img
                                  src="images/destination-img3.jpg"
                                  alt="Destination-img"
                                />
                              </div>
                            </div>
                            
                            <div className="card-item mb-0">
                              <div className="card-img">
                                <img
                                  src="images/destination-img4.jpg"
                                  alt="Destination-img"
                                />
                              </div>
                            </div>
                            
                          </div>
                        </div>
                        
                        <div className="section-block" />
                      </div>
                      */}
                      <div id="faq" className="page-scroll">
                        <div className="single-content-item padding-top-40px padding-bottom-40px">
                          <h3 className="title font-size-20">FAQ</h3>
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
                                      I'm a solo traveller, is there a single
                                      supplement?
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
                                  <p>yes there is a single compliment</p>
                                </div>
                              </div>
                            </div>

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
                                      Should I book pre/post tour accommodation?
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
                                    it is advisable to book pre tour
                                    accomodation
                                  </p>
                                </div>
                              </div>
                            </div>

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
                                      What is cancellation policy?
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
                                    cancellation apply when you decide to cancel
                                    your booking
                                  </p>
                                </div>
                              </div>
                            </div>

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
                                      Which currency is most widely accepted on
                                      this tour?
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
                                    Most accepted currency i Nigerian Naira but
                                    you can pay the Naira equivalent in any
                                    currency of your choice
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="section-block" />
                      </div>
                      {/* end faq */}
                      <div id="location-map" className="page-scroll">
                        <div className="single-content-item padding-top-40px padding-bottom-40px">
                          <h3 className="title font-size-20">Location</h3>
                          <div className="gmaps padding-top-30px">
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3220582.101712651!2d111.72032468736893!3d37.974802328116944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e4!4m5!1s0x3676dd556edbe6e9%3A0x12fdd98581592320!2sLinfen%2C%20Shanxi%2C%20China!3m2!1d36.088004999999995!2d111.518975!4m5!1s0x35f05296e7142cb9%3A0xb9625620af0fa98a!2sBeijing%2C%20China!3m2!1d39.904199899999995!2d116.40739629999999!5e0!3m2!1sen!2sin!4v1589443024919!5m2!1sen!2sin"
                              allowFullScreen
                              aria-hidden="false"
                              tabIndex={0}
                            />
                          </div>
                        </div>

                        <div className="section-block" />
                      </div>
                      {/* end location-map */}
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
                      </div>
                      {/* end review-box */}
                    </div>
                    {/* end single-content-wrap */}
                  </div>
                  {/* end col-lg-8 */}
                  <div className="col-lg-4">
                    <div className="sidebar single-content-sidebar mb-0 mt-2">
                      <div className="sidebar-widget single-content-widget">
                        <div className="sidebar-widget-item">
                          <div className="sidebar-book-title-wrap mb-3">
                            <h3>Bestseller</h3>
                            <p>
                              <span className="text-form">From</span>
                              <span className="text-value ml-2 mr-1">
                                ₦
                                {selected_ticket && selected_ticket.price
                                  ? parseInt(
                                      selected_ticket.price -
                                        parseFloat(discount_rate) *
                                          0.01 *
                                          selected_ticket.price
                                    )
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                  : 0}
                              </span>
                              <span className="before-price">
                                ₦{" "}
                                {selected_ticket && selected_ticket.price
                                  ? parseInt(
                                      selected_ticket && selected_ticket.price
                                    )
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                  : 0}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="input-box">
                          <label className="label-text">Tour packages</label>
                          <div className="form-group">
                            <div className="select-contain w-auto no-padding-select">
                              <select
                                className="select-contain-select"
                                style={{ padding: 0 }}
                                onChange={(e) =>
                                  this.setState({
                                    selected_ticket: JSON.parse(e.target.value),
                                  })
                                }
                              >
                                <option value>{"Select Tour Package"}</option>
                                {sub_items.map((el, index) => {
                                  return (
                                    <option value={JSON.stringify(el)}>
                                      {`${
                                        el.name
                                      } (₦${el.price.toLocaleString()} )`}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>

                          {/* Adult/kids select */}
                          <div class="sidebar-widget-item">
                            <div class="qty-box mb-2 d-flex align-items-center justify-content-between">
                              <label class="font-size-16">
                                Adults <span>Age 18+</span>
                              </label>
                              <div class="qtyBtn d-flex align-items-center">
                                <div
                                  className="qtyDec"
                                  onClick={() =>
                                    this.decrement("adultsNo", adultsNo)
                                  }
                                >
                                  <i className="la la-minus text-gray" />
                                </div>
                                <input
                                  type="text"
                                  name="qtyInput"
                                  value={adultsNo}
                                />
                                <div
                                  className="qtyDec"
                                  onClick={() =>
                                    this.increment("adultsNo", adultsNo)
                                  }
                                >
                                  <i className="la la-plus text-gray" />
                                </div>
                              </div>
                            </div>
                            <div class="qty-box mb-2 d-flex align-items-center justify-content-between">
                              <label class="font-size-16">
                                Children <span>2-12 years old</span>
                              </label>
                              <div class="qtyBtn d-flex align-items-center">
                                <div
                                  className="qtyDec"
                                  onClick={() =>
                                    this.decrement("childrenNo", childrenNo)
                                  }
                                >
                                  <i className="la la-minus text-gray" />
                                </div>
                                <input
                                  type="text"
                                  name="qtyInput"
                                  value={childrenNo}
                                />
                                <div
                                  className="qtyDec"
                                  onClick={() =>
                                    this.increment("childrenNo", childrenNo)
                                  }
                                >
                                  <i className="la la-plus text-gray" />
                                </div>
                              </div>
                            </div>
                            <div class="qty-box mb-2 d-flex align-items-center justify-content-between">
                              <label class="font-size-16">
                                Infants <span>0-2 years old</span>
                              </label>
                              <div class="qtyBtn d-flex align-items-center">
                                <div
                                  className="qtyDec"
                                  onClick={() =>
                                    this.decrement("infantsNo", infantsNo)
                                  }
                                >
                                  <i className="la la-minus text-gray" />
                                </div>
                                <input
                                  type="text"
                                  name="qtyInput"
                                  value={infantsNo}
                                />
                                <div
                                  className="qtyDec"
                                  onClick={() =>
                                    this.increment("infantsNo", infantsNo)
                                  }
                                >
                                  <i className="la la-plus text-gray" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Adult/kids select */}
                          <div className="input-box">
                            <label className="label-text">
                              Number of tickets
                            </label>
                            <div className="form-group">
                              {/* <span className="la la-envelope-o form-icon" /> */}
                              <input
                                className="form-control"
                                type="number"
                                placeholder="How many tickets?"
                                value={no_of_tickets}
                                onChange={(e) =>
                                  this.setState({
                                    no_of_tickets: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          {/* end sidebar-widget-item */}
                          {/* <div className="sidebar-widget-item">
                          <div className="contact-form-action">
                            <form action="#">
                              <div className="input-box">
                                <label className="label-text">Date</label>
                                <div className="form-group">
                                  <span className="la la-calendar form-icon" />
                                  <input
                                    className="date-range form-control"
                                    type="text"
                                    name="daterange"
                                    defaultValue="04/28/2020"
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div> */}
                          {/* end sidebar-widget-item */}
                          {/* <div className="sidebar-widget-item">
                          <div className="qty-box mb-2 d-flex align-items-center justify-content-between">
                            <label className="font-size-16">
                              Adults <span>Age 18+</span>
                            </label>
                            <div className="qtyBtn d-flex align-items-center">
                              <input
                                type="text"
                                name="qtyInput"
                                defaultValue={0}
                              />
                            </div>
                          </div>
                          
                          <div className="qty-box mb-2 d-flex align-items-center justify-content-between">
                            <label className="font-size-16">
                              Children <span>2-12 years old</span>
                            </label>
                            <div className="qtyBtn d-flex align-items-center">
                              <input
                                type="text"
                                name="qtyInput"
                                defaultValue={0}
                              />
                            </div>
                          </div>
                          
                          <div className="qty-box mb-2 d-flex align-items-center justify-content-between">
                            <label className="font-size-16">
                              Infants <span>0-2 years old</span>
                            </label>
                            <div className="qtyBtn d-flex align-items-center">
                              <input
                                type="text"
                                name="qtyInput"
                                defaultValue={0}
                              />
                            </div>
                          </div>
                        </div> */}
                          {/* end sidebar-widget-item */}
                          <div className="btn-box pt-2">
                            <a
                              onClick={this.book}
                              className="theme-btn text-center w-100 mb-2"
                            >
                              <i className="la la-shopping-cart mr-2 font-size-18" />
                              Book Now
                            </a>
                            {/* <a
                            href="#"
                            className="theme-btn text-center w-100 theme-btn-transparent"
                          >
                            <i className="la la-heart-o mr-2" />
                            Add to Wishlist
                          </a> */}
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
                                          <input
                                            type="checkbox"
                                            id="agreeChb"
                                          />
                                          <label htmlFor="agreeChb">
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
                                      <button
                                        type="button"
                                        className="theme-btn"
                                      >
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
                          <h3 className="title stroke-shape">
                            Got a Question?
                          </h3>
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
                                <a href="mailto:info@book24.ng">
                                  info@book24.ng
                                </a>
                              </li>
                            </ul>
                          </div>
                          {/* end sidebar-list */}
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
            </div>{" "}
          </section>
          {/* end tour-detail-area */}
          {/* ================================
    END TOUR DETAIL AREA
================================= */}
          <div className="section-block" />
          {/* ================================
    START RELATE TOUR AREA
================================= */}
          <section className="related-tour-area section--padding">
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
                {tours.map((el, index) => {
                  el.tour_packages.sort(function (a, b) {
                    return parseInt(a.price) - parseInt(b.price);
                  });
                  let _tourPrice =
                    el.tour_packages &&
                    el.tour_packages[0] &&
                    el.tour_packages[0].price;
                  if (el.id != id && index < 3) {
                    return (
                      <div className="col-lg-4 responsive-column">
                        <div className="card-item trending-card">
                          <div className="card-img">
                            <a
                              className="d-block"
                              onClick={async () => {
                                await this.props.router.push({
                                  pathname: "/detail-tour",
                                  query: { id: el.id },
                                });
                                window.location.reload();
                              }}
                            >
                              <img
                                src={el.images[0].url}
                                alt="Destination-img"
                              />
                            </a>
                            <span className="badge">Bestseller</span>
                          </div>
                          <div className="card-body">
                            <h3 className="card-title">
                              <a
                                onClick={async () => {
                                  await this.props.router.push({
                                    pathname: "/detail-tour",
                                    query: { id: el.id },
                                  });
                                  window.location.reload();
                                }}
                              >
                                {el.name}
                              </a>
                            </h3>
                            <p className="card-meta">{el.address}</p>
                            <div className="card-rating">
                              <span className="badge text-white">4.4/5</span>
                              <span className="review__text">Average</span>
                              <span className="rating__text">(30 Reviews)</span>
                            </div>
                            <div className="card-price d-flex align-items-center justify-content-between">
                              <p>
                                from{" "}
                                <span className="price__num">
                                  {"\u20a6"}
                                  {_tourPrice}
                                </span>
                              </p>
                              <a
                                className="btn-text"
                                onClick={async () => {
                                  await this.props.router.push({
                                    pathname: "/detail-tour",
                                    query: { id: el.id },
                                  });
                                  window.location.reload();
                                }}
                              >
                                View details
                                <i className="la la-angle-right" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </section>
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
  setOrderImage,
  setOrderCheckInDate,
  setOrderCheckOutDate,
  setOrderName,
  setOrderSubData,
};

const DetailTour_ = withRouter(DetailTour);
const DetailTour__ = withAlert()(DetailTour_);
export default connect(mapStateToProps, mapDispatchToProps)(DetailTour__);
