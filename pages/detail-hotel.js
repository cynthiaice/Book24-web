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
import WhiteLoader from "../components/whiteLoader";
import DateTime from "react-datetime";
// import { DateRangePicker } from "react-date-range";
import { withAlert } from "react-alert";
import CheckOut from "./checkout";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import OutsideClickHandler from "react-outside-click-handler";
import Sticky from "react-sticky-el";
import Lightbox from "react-image-lightbox";

import {
  setOrderUrl,
  setOrderData,
  setOrderPrice,
  setOrderCheckInDate,
  setOrderCheckOutDate,
  setOrderImage,
  setOrderName,
  setOrderSubData,
  setOrderSubName,
} from "../store/actions/order";
// import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import DatePicker from "react-datepicker";

class DetailHotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      token: "",
      name: "",
      bio: "",
      location: "",
      address: "",
      verified: false,
      created_by: null,
      features: [],
      hotel_type: "",
      extra_people_charge: false,
      minimum_stay: null,
      images: [],
      contact_phone: "",
      contact_website: "",
      contact_email: "",
      check_in_time: "",
      check_out_time: "",
      reasons_to_choose: "",
      featured: false,

      housekeeping_frequency: "",
      bathroom: "",
      front_desk: "",
      on_site_staff: "",
      rooms: [],
      selected_room: "",
      no_of_adults: 0,
      no_of_children: 0,
      no_of_infants: 0,
      book_in_date: new Date(),
      book_out_date: null,
      id: "",
      author: {},
      loader: false,
      checkout: false,
      average_price: "",
      data: {},

      hotels: [],
      starsCount: [],
      status: false,
      openCheckIn: false,

      largestDiscount: "",
      photoIndex: 0,
      isOpen: false,
    };
  }

  static getInitialProps({ store }) {}

  async componentDidMount() {
    console.log(this.props.router.query);

    const id = this.props.router.query.id ? this.props.router.query.id : "";
    if (id == "") {
      this.props.router.push("/hotel-list");
    }
    this.getData(id);
  }

  validBookIn(current) {
    return current.isAfter(moment().subtract(1, "day"));
  }
  valid = (current) => {
    return current.isAfter(moment(this.state.book_in_date));
  };

  onChangeDate = (dates) => {
    const [start, end] = dates;
    this.setState({
      book_in_date: moment(start).format("DD/MM/YYYY"),
      book_out_date: moment(end).format("DD/MM/YYYY"),
    });
    // setStartDate(start);
    // setEndDate(end);
  };

  increment = (index, field) => {
    let allFields = [...this.state.rooms];
    if (field === "no_of_children" || field === "no_of_adult") {
      allFields[index][field] =
        (allFields[index][field] <= 3 && allFields[index][field] + 1) || 4;
    } else {
      allFields[index][field] = allFields[index][field] + 1;
    }

    this.setState({ rooms: allFields });
  };

  decrement = (index, field) => {
    let allFields = [...this.state.rooms];
    allFields[index][field] =
      (allFields[index][field] > 0 && allFields[index][field] - 1) || 0;
    this.setState({ rooms: allFields });
  };

  getData = (id) => {
    this.setState({ loader: true });
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "hotels/" + id, config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.length;
        if (len <= 0) {
          this.props.router.push("/hotel-list");
        }
        this.setState({ loader: false });

        const {
          name,
          bio,
          location,
          address,
          verified,
          created_by,
          features,

          hotel_type,
          extra_people_charge,
          minimum_stay,

          images,
          contact_phone,
          contact_website,
          contact_email,
          check_in_time,
          check_out_time,
          reasons_to_choose,
          featured,

          housekeeping_frequency,
          bathroom,
          front_desk,
          on_site_staff,
          rooms,
          id,
          author,
        } = response.data;
        this.setState({
          name,
          bio,
          location,
          address,
          verified,
          created_by,
          features,

          hotel_type,
          extra_people_charge,
          minimum_stay,

          images,
          contact_phone,
          contact_website,
          contact_email,
          check_in_time,
          check_out_time,
          reasons_to_choose,
          featured,

          housekeeping_frequency,
          bathroom,
          front_desk,
          on_site_staff,
          rooms,
          id,
          author,
        });

        let j;
        let starsCount = [];
        for (j = 0; j < parseInt(hotel_type.charAt(0)); j++) {
          starsCount.push(j);
        }

        let k;
        let largest = 0;

        for (k = 0; k < rooms.length; k++) {
          if (largest < parseInt(rooms[k].discount_rate)) {
            largest = parseInt(rooms[k].discount_rate);
          }
        }

        let l;
        let roomCopy = this.state.rooms;
        for (l = 0; l < roomCopy.length; l++) {
          roomCopy[l].no_of_children = 0;
          roomCopy[l].no_of_adult = 0;
          roomCopy[l].no_of_rooms = 0;
        }
        this.setState({
          starsCount,
          largestDiscount: largest,
          rooms: roomCopy,
        });
        this.getHotels();
      })
      .catch((error) => {
        this.setState({ loader: false });
        //   router.push("/");
        console.log(error.response);
      });
  };

  getHotels = () => {
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "hotels", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ hotels: response.data.rows });
        // for (let i = 0; i < len; i++) {
        //   let row = response.data.rows[i];
        //   this.setState((prevState) => ({
        //     hotels: [...prevState.hotels, row],
        //   }));
        // }
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

  book = async () => {
    const { alert } = this.props;
    let token = await Cookies.get("token");
    const {
      book_in_date,
      book_out_date,
      no_of_adults,
      no_of_children,
      no_of_infants,
      selected_room,
      name,
      images,
      rooms,
    } = this.state;
    let a = moment(book_in_date);
    let b = moment(book_out_date);
    rooms.sort(function (a, b) {
      return a.price - b.price;
    });
    let roomPrice = 0;

    const average_price =
      (selected_room ? parseInt(selected_room.price) : roomPrice) *
      Math.abs(a.diff(b, "days") || 1);

    if (token == "") {
      return this.props.router.push("/account");
    } else if (!book_in_date) {
      return alert.show(<div>Check in date is required</div>, {
        type: "error",
      });
    } else if (!book_out_date) {
      return alert.show(<div>Check out date is required</div>, {
        type: "error",
      });
    } else if (!selected_room) {
      return alert.show(<div>Select a room to book</div>, {
        type: "error",
      });
    } else if (!selected_room.no_of_rooms) {
      return alert.show(<div>Add at least one room under selected room</div>, {
        type: "error",
      });
    } else {
      const new_data = {
        room_type_id: selected_room.id,
        price: average_price
          ? parseInt(
              average_price -
                parseFloat(selected_room.discount_rate) * 0.01 * average_price
            ) * selected_room.no_of_rooms
          : 0,
        check_in_date: moment(book_in_date).format("MMMM DDDD YYYY HH:mm:ss"),
        check_out_date: moment(book_out_date).format("MMMM DDDD YYYY HH:mm:ss"),
        hotel_id: parseInt(this.props.router.query.id),
        no_of_adults: selected_room.no_of_adult,
        no_of_children: selected_room.no_of_children,
        //  status: status,
      };
      this.props.setOrderData(new_data);
      this.props.setOrderUrl("hotelBooking");
      this.props.setOrderPrice(new_data.price);
      this.props.setOrderImage(images && images[0] && images[0].url);
      this.props.setOrderCheckInDate(
        moment(book_in_date).format("dddd, MMM Do YYYY HH:mm:ss")
      );
      this.props.setOrderCheckOutDate(
        moment(book_out_date).format("dddd, MMM Do YYYY HH:mm:ss")
      );
      this.props.setOrderName(name);
      this.props.setOrderSubData({
        "No of adults": no_of_adults,
        "No of children": no_of_children,
        no_of_rooms: selected_room.no_of_rooms,
        hotel_name: this.state.name,
        hotel_address: this.state.address,
        hotel_number: this.state.contact_phone,
        hotel_email: this.state.contact_email,
      });
      this.props.setOrderSubName(selected_room.name);
      this.props.router.push("/checkout");
      var bodyParameters = {};
    }
  };

  handleDateSelect = (ranges) => {
    console.log(ranges);
    this.setState({
      book_in_date: ranges.selection.startDate,
      book_out_date: ranges.selection.endDate,
    });
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  };

  render() {
    const {
      name,
      bio,
      location,
      address,
      verified,
      created_by,
      features,

      hotel_type,
      extra_people_charge,
      minimum_stay,

      images,
      contact_phone,
      contact_website,
      contact_email,
      check_in_time,
      check_out_time,
      reasons_to_choose,
      featured,

      housekeeping_frequency,
      bathroom,
      front_desk,
      on_site_staff,
      rooms,
      selected_room,
      no_of_adults,
      no_of_children,
      no_of_infants,
      book_in_date,
      book_out_date,
      loader,
      checkout,
      hotels,
      id,
      author,
      discount_rate,
      photoIndex,
      isOpen,
      starsCount,
    } = this.state;
    const first_image = images && images[0] && images[0].url;
    let a = moment(book_in_date);
    let b = moment(book_out_date);
    rooms &&
      rooms.length > 0 &&
      rooms.sort(function (a, b) {
        return a.price - b.price;
      });

    let roomPrice = rooms && rooms[0] && rooms[0].price;
    let roomDiscount = rooms && rooms[0] && rooms[0].discount_rate;
    console.log(selected_room);
    const average_price =
      (selected_room ? parseInt(selected_room.price) : roomPrice) *
      Math.abs(a.diff(b, "days") || 1);
    console.log(average_price);

    const data = {
      room_type_id: selected_room.id,
      price: average_price,
      check_in_date: book_in_date,
      check_out_date: book_out_date,

      no_of_adults: no_of_adults,
      no_of_children: no_of_children,
    };
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    };
    const qtyBoxStyle = {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-end",
    };
    const stickySyle = {
      zIndex: "999999999",
      marginBottom: "30px",
      top: "-60px",
    };
    return (
      <div>
        {checkout ? (
          <CheckOut
            name={name}
            price={10000}
            url={"hotelBooking"}
            data={this.state.data}
          />
        ) : (
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
              {/* ================================
    START BREADCRUMB TOP BAR
================================= */}
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
                          <span className="ratings d-flex align-items-center ml-1 mt-1">
                            {starsCount.map((item) => {
                              return (
                                <i className="la la-star" key={item + item} />
                              );
                            })}
                          </span>

                          <div className="box-button-green">
                            {this.state.largestDiscount} % Discount
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
                                      className="scroll-link active"
                                    >
                                      Hotel Details
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      data-scroll="book-hotel"
                                      href="#book-hotel"
                                      className="scroll-link active"
                                    >
                                      Book
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
                                      data-scroll="amenities"
                                      href="#amenities"
                                      className="scroll-link"
                                    >
                                      Amenities
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

              {/*****************************React Slider *************************/}

              {/*****************************React Slider ************************bread-bg-11*/}

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
                            {/* end single-content-item */}
                            <div className="section-block" />

                            {/* end single-content-item */}
                            <div className="section-block" />
                            <div className="single-content-item pt-2 padding-bottom-40px">
                              <h3 className="title font-size-20">
                                About {name}
                              </h3>
                              <p className="py-3">{bio}</p>
                            </div>
                            {/* end single-content-item */}
                            <div className="section-block" />
                          </div>
                          {/* end description */}
                          <div id="availability" className="page-scroll">
                            <div className="single-content-item padding-top-40px padding-bottom-30px">
                              {/* <h3 className="title font-size-20">Availability</h3>
                          <div className="contact-form-action padding-bottom-35px">
                            <form method="post">
                              <div className="row">
                                <div className="col-lg-6 responsive-column">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Check in - Check out
                                    </label>
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
                                </div>
                                <div className="col-lg-6 responsive-column">
                                  <div className="input-box">
                                    <label className="label-text">Rooms</label>
                                    <div className="form-group">
                                      <div className="select-contain w-auto">
                                        <select className="select-contain-select">
                                          <option value={0}>
                                            Select No Of Rooms
                                          </option>
                                          <option value={1}>1 Room</option>
                                          <option value={2}>2 Rooms</option>
                                          <option value={3}>3 Rooms</option>
                                          <option value={4}>4 Rooms</option>
                                          <option value={5}>5 Rooms</option>
                                          <option value={6}>6 Rooms</option>
                                          <option value={7}>7 Rooms</option>
                                          <option value={8}>8 Rooms</option>
                                          <option value={9}>9 Rooms</option>
                                          <option value={10}>10 Rooms</option>
                                          <option value={11}>11 Rooms</option>
                                          <option value={12}>12 Rooms</option>
                                          <option value={13}>13 Rooms</option>
                                          <option value={14}>14 Rooms</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 responsive-column">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Adults (18+)
                                    </label>
                                    <div className="form-group">
                                      <div className="select-contain w-auto">
                                        <select className="select-contain-select">
                                          <option value={0}>
                                            Select Adults
                                          </option>
                                          <option value={1}>1 Adults</option>
                                          <option value={2}>2 Adults</option>
                                          <option value={3}>3 Adults</option>
                                          <option value={4}>4 Adults</option>
                                          <option value={5}>5 Adults</option>
                                          <option value={6}>6 Adults</option>
                                          <option value={7}>7 Adults</option>
                                          <option value={8}>8 Adults</option>
                                          <option value={9}>9 Adults</option>
                                          <option value={10}>10 Adults</option>
                                          <option value={11}>11 Adults</option>
                                          <option value={12}>12 Adults</option>
                                          <option value={13}>13 Adults</option>
                                          <option value={14}>14 Adults</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 responsive-column">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Children (0-17)
                                    </label>
                                    <div className="form-group">
                                      <div className="select-contain w-auto">
                                        <select className="select-contain-select">
                                          <option value={0}>
                                            Select Children
                                          </option>
                                          <option value={1}>1 Children</option>
                                          <option value={2}>2 Children</option>
                                          <option value={3}>3 Children</option>
                                          <option value={4}>4 Children</option>
                                          <option value={5}>5 Children</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="btn-box">
                                    <button type="button" className="theme-btn">
                                      Search Now
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div> */}
                              {/* end contact-form-action */}
                              <h3 className="title font-size-20">
                                Available Rooms
                              </h3>
                              {rooms &&
                                rooms.length > 0 &&
                                rooms.map((el, ind) => {
                                  return (
                                    <div
                                      className="cabin-type padding-top-30px"
                                      key={"room" + ind}
                                    >
                                      <div className="cabin-type-item seat-selection-item d-flex">
                                        <div className="cabin-type-img flex-shrink-0">
                                          {isOpen && (
                                            <Lightbox
                                              mainSrc={
                                                JSON.parse(el.images) &&
                                                JSON.parse(el.images)[
                                                  photoIndex
                                                ] &&
                                                JSON.parse(el.images)[
                                                  photoIndex
                                                ].url
                                              }
                                              nextSrc={
                                                JSON.parse(el.images)[
                                                  (photoIndex + 1) %
                                                    JSON.parse(el.images).length
                                                ].url
                                              }
                                              prevSrc={
                                                JSON.parse(el.images)[
                                                  (photoIndex +
                                                    JSON.parse(el.images)
                                                      .length -
                                                    1) %
                                                    JSON.parse(el.images).length
                                                ].url
                                              }
                                              onCloseRequest={() =>
                                                this.setState({ isOpen: false })
                                              }
                                              onMovePrevRequest={() =>
                                                this.setState({
                                                  photoIndex:
                                                    (photoIndex +
                                                      JSON.parse(el.images)
                                                        .length -
                                                      1) %
                                                    JSON.parse(el.images)
                                                      .length,
                                                })
                                              }
                                              onMoveNextRequest={() =>
                                                this.setState({
                                                  photoIndex:
                                                    (photoIndex + 1) %
                                                    JSON.parse(el.images)
                                                      .length,
                                                })
                                              }
                                            />
                                          )}

                                          <a
                                            className="btn theme-btn-hover-gray mt-2 more-room-button"
                                            onClick={() =>
                                              this.setState({ isOpen: true })
                                            }
                                          >
                                            <i className="la la-photo mr-2" />
                                            Room Photos
                                          </a>
                                        </div>
                                        <div className="cabin-type-detail">
                                          <h3 className="title">{el.name}</h3>
                                          <div className="row padding-top-20px">
                                            {el.is_wifi && (
                                              <div className="col-lg-6 responsive-column">
                                                <div className="single-tour-feature d-flex align-items-center mb-3">
                                                  <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-2">
                                                    <i className="la la-wifi" />
                                                  </div>
                                                  <div className="single-feature-titles">
                                                    <h3 className="title font-size-15 font-weight-medium">
                                                      Free Wi-Fi
                                                    </h3>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                            {/* end col-lg-6 */}
                                            <div className="col-lg-6 responsive-column">
                                              <div className="single-tour-feature d-flex align-items-center mb-3">
                                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-2">
                                                  <i className="la la-bed" />
                                                </div>
                                                <div className="single-feature-titles">
                                                  <h3 className="title font-size-15 font-weight-medium">
                                                    {el.no_of_beds} bed
                                                    {el.no_of_beds > 1 && "s"}
                                                  </h3>
                                                </div>
                                              </div>
                                            </div>
                                            {/* end col-lg-6 */}
                                            <div className="col-lg-6 responsive-column">
                                              <div className="single-tour-feature d-flex align-items-center mb-3">
                                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-2">
                                                  <i className="la la-building" />
                                                </div>
                                                <div className="single-feature-titles">
                                                  <h3 className="title font-size-15 font-weight-medium">
                                                    {el.size} m²
                                                  </h3>
                                                </div>
                                              </div>
                                            </div>
                                            {/* end col-lg-6 */}
                                            {el.is_shower && (
                                              <div className="col-lg-6 responsive-column">
                                                <div className="single-tour-feature d-flex align-items-center mb-3">
                                                  <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-2">
                                                    <i className="la la-hotel" />
                                                  </div>
                                                  <div className="single-feature-titles">
                                                    <h3 className="title font-size-15 font-weight-medium">
                                                      Shower and bathtub
                                                    </h3>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                            {/* end col-lg-6 */}
                                          </div>
                                          {/* end row */}
                                          <div className="room-photos">
                                            {JSON.parse(el.images) &&
                                              JSON.parse(el.images).map(
                                                (el, index) => {
                                                  console.log(
                                                    "More Images",
                                                    el
                                                  );
                                                  return (
                                                    <a
                                                      key={
                                                        el.id +
                                                        index +
                                                        index +
                                                        el.url
                                                      }
                                                      className="d-none"
                                                      data-fancybox="gallery"
                                                      data-src={el.url}
                                                      data-caption={
                                                        "Showing image - " +
                                                        index +
                                                        1
                                                      }
                                                      data-speed={700}
                                                    />
                                                  );
                                                }
                                              )}
                                          </div>
                                        </div>
                                        <div className="cabin-price">
                                          <p className="text font-size-14">
                                            Per/night
                                            <strong className="mt-n1 text-black font-size-18 font-weight-black d-block">
                                              {"\u20A6"}
                                              {parseInt(
                                                el.price -
                                                  parseFloat(
                                                    el &&
                                                      el.discount_rate &&
                                                      el.discount_rate
                                                  ) *
                                                    0.01 *
                                                    el.price
                                              )
                                                .toString()
                                                .replace(
                                                  /\B(?=(\d{3})+(?!\d))/g,
                                                  ","
                                                )}
                                            </strong>
                                            <small className="before-price">
                                              {"\u20A6"}
                                              {el.price
                                                .toString()
                                                .replace(
                                                  /\B(?=(\d{3})+(?!\d))/g,
                                                  ","
                                                )}
                                            </small>
                                          </p>
                                          <div className="custom-checkbox mb-0 mt-1">
                                            <input
                                              type="checkbox"
                                              id={el.id + "hotelSelect"}
                                              checked={
                                                this.state.selected_room.id ==
                                                  el.id || false
                                              }
                                              onChange={() => {
                                                this.setState({
                                                  selected_room:
                                                    this.state.selected_room
                                                      .id === el.id
                                                      ? ""
                                                      : el,
                                                });
                                              }}
                                            />
                                            <label
                                              htmlFor={el.id + "hotelSelect"}
                                              className="theme-btn theme-btn-small"
                                            >
                                              Select
                                            </label>
                                          </div>

                                          {/* Add Rooms */}

                                          {(this.state.selected_room.id ===
                                            el.id && (
                                            <div
                                              class="qty-box mb-4 d-flex align-items-end justify-content-start mobile-align-flex-start"
                                              style={qtyBoxStyle}
                                            >
                                              <label class="font-size-16">
                                                Add Room
                                              </label>
                                              <div class="qtyBtn d-flex align-items-center">
                                                <div
                                                  className="qtyDec"
                                                  onClick={() =>
                                                    this.decrement(
                                                      ind,
                                                      "no_of_rooms"
                                                    )
                                                  }
                                                >
                                                  <i className="la la-minus text-gray" />
                                                </div>
                                                <input
                                                  type="text"
                                                  name="qtyInput"
                                                  value={el.no_of_rooms}
                                                />
                                                <div
                                                  className="qtyDec"
                                                  onClick={() =>
                                                    this.increment(
                                                      ind,
                                                      "no_of_rooms"
                                                    )
                                                  }
                                                >
                                                  <i className="la la-plus text-gray" />
                                                </div>
                                              </div>
                                            </div>
                                          )) ||
                                            null}

                                          {/* Adults */}

                                          {(this.state.selected_room.id ==
                                            el.id && (
                                            <div
                                              class="qty-box mb-4 d-flex align-items-end justify-content-start mobile-align-flex-start"
                                              style={qtyBoxStyle}
                                            >
                                              <label class="font-size-16">
                                                Adults (18+)
                                              </label>
                                              <div class="qtyBtn d-flex align-items-center">
                                                <div
                                                  className="qtyDec"
                                                  onClick={() =>
                                                    this.decrement(
                                                      ind,
                                                      "no_of_adult"
                                                    )
                                                  }
                                                >
                                                  <i className="la la-minus text-gray" />
                                                </div>
                                                <input
                                                  type="text"
                                                  name="qtyInput"
                                                  value={el.no_of_adult}
                                                />
                                                <div
                                                  className="qtyDec"
                                                  onClick={() =>
                                                    this.increment(
                                                      ind,
                                                      "no_of_adult"
                                                    )
                                                  }
                                                >
                                                  <i className="la la-plus text-gray" />
                                                </div>
                                              </div>
                                            </div>
                                          )) ||
                                            null}

                                          {/* Children */}

                                          {this.state.selected_room.id ===
                                            el.id && (
                                            <div
                                              class="qty-box mb-4 d-flex align-items-end justify-content-start mobile-align-flex-start"
                                              style={qtyBoxStyle}
                                            >
                                              <label class="font-size-16">
                                                Children (0-17)
                                              </label>
                                              <div class="qtyBtn d-flex align-items-center">
                                                <div
                                                  className="qtyDec"
                                                  onClick={() =>
                                                    this.decrement(
                                                      ind,
                                                      "no_of_children"
                                                    )
                                                  }
                                                >
                                                  <i className="la la-minus text-gray" />
                                                </div>
                                                <input
                                                  type="text"
                                                  name="qtyInput"
                                                  value={el.no_of_children}
                                                />
                                                <div
                                                  className="qtyDec"
                                                  onClick={() =>
                                                    this.increment(
                                                      ind,
                                                      "no_of_children"
                                                    ) || null
                                                  }
                                                >
                                                  <i className="la la-plus text-gray" />
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      {/* end cabin-type-item */}
                                    </div>
                                  );
                                })}
                            </div>
                            {/* end single-content-item */}
                            <div className="section-block" />
                          </div>

                          <div id="amenities" className="page-scroll">
                            <div className="single-content-item padding-top-40px padding-bottom-20px">
                              <h3 className="title font-size-20">Amenities</h3>
                              <div className="amenities-feature-item pt-4">
                                <div className="row">
                                  {features.map((el, index) => {
                                    return (
                                      <div
                                        className="col-lg-4 responsive-column"
                                        key={el + index}
                                      >
                                        <div className="single-tour-feature d-flex align-items-center mb-3">
                                          <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                            <i className="la la-check" />
                                          </div>
                                          <div className="single-feature-titles">
                                            <h3 className="title font-size-15 font-weight-medium">
                                              {el.name || el}
                                            </h3>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                                {/* end row */}
                              </div>
                            </div>
                            {/* end single-content-item */}
                            <div className="section-block" />
                          </div>
                          {/* end faq */}
                          <div id="faq" className="page-scroll">
                            <div className="single-content-item padding-top-40px padding-bottom-40px">
                              <h3 className="title font-size-20">FAQs</h3>
                              <div
                                className="accordion accordion-item padding-top-30px"
                                id="accordionExample2"
                              >
                                <div className="card">
                                  <div
                                    className="card-header"
                                    id="faqHeadingFour"
                                  >
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
                                          How do I know a reservation is
                                          accepted or confirmed?
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
                                        Once you make a reservation, a
                                        confirmation email will be sent to you
                                        within 30 minutes of your booking
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {/* end card */}
                                <div className="card">
                                  <div
                                    className="card-header"
                                    id="faqHeadingFive"
                                  >
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
                                          Am I allowed to decline reservation
                                          requests?
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
                                        Yes you can, only if the property
                                        provider accepts cancellations
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {/* end card */}
                                <div className="card">
                                  <div
                                    className="card-header"
                                    id="faqHeadingSix"
                                  >
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
                                          What happens if I let a reservation
                                          request expire?
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
                                        Refer to the propertie's terms and
                                        conditions
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {/* end card */}
                                <div className="card">
                                  <div
                                    className="card-header"
                                    id="faqHeadingSeven"
                                  >
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
                                          How do I set reservation requirements?
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
                                        When making a reservation, do ensure you
                                        fill in all your preferences and
                                        requirements
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
                                                </div>
                                                {/* End Skill Bar */}
                                              </div>
                                              <div className="bar-percent">
                                                4.6
                                              </div>
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
                                                </div>
                                                {/* End Skill Bar */}
                                              </div>
                                              <div className="bar-percent">
                                                4.7
                                              </div>
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
                                                </div>
                                                {/* End Skill Bar */}
                                              </div>
                                              <div className="bar-percent">
                                                2.6
                                              </div>
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
                                                </div>
                                                {/* End Skill Bar */}
                                              </div>
                                              <div className="bar-percent">
                                                3.6
                                              </div>
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
                                                </div>
                                                {/* End Skill Bar */}
                                              </div>
                                              <div className="bar-percent">
                                                2.6
                                              </div>
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
                                      src="/images/team8.jpg"
                                    />
                                  </div>
                                  <div className="comment-body">
                                    <div className="meta-data">
                                      <h3 className="comment__author">
                                        Jenny Doe
                                      </h3>
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
                                      Excellent hotel
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
                                      src="/images/team9.jpg"
                                    />
                                  </div>
                                  <div className="comment-body">
                                    <div className="meta-data">
                                      <h3 className="comment__author">
                                        Jenny Doe
                                      </h3>
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
                                      <h3 className="comment__author">
                                        Jenny Doe
                                      </h3>
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
                      <div className="col-lg-4" id="book-hotel">
                        <div className="sidebar single-content-sidebar my-0">
                          <OutsideClickHandler
                            onOutsideClick={() => {
                              this.setState({ openCheckIn: false });
                            }}
                          >
                            <Sticky stickyStyle={stickySyle}>
                              <div className="sidebar-widget single-content-widget">
                                <div className="sidebar-widget-item">
                                  <div className="sidebar-book-title-wrap mb-2">
                                    <h3>Popular</h3>
                                    <p>
                                      <span className="text-form">From</span>
                                      <span className="text-value ml-2 mr-1">
                                        ₦
                                        {average_price
                                          ? parseInt(
                                              average_price -
                                                parseFloat(
                                                  (selected_room &&
                                                    selected_room.discount_rate &&
                                                    selected_room.discount_rate) ||
                                                    roomDiscount
                                                ) *
                                                  0.01 *
                                                  average_price
                                            )
                                              .toString()
                                              .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                              )
                                          : 0}
                                      </span>
                                      <span className="before-price">
                                        ₦
                                        {average_price
                                          ? average_price
                                              .toString()
                                              .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                              )
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
                                          Check in
                                        </label>
                                        <div className="form-group">
                                          <DateTime
                                            closeOnSelect
                                            dateFormat="DD/MM/YYYY"
                                            isValidDate={this.validBookIn}
                                            value={book_in_date}
                                            onChange={(event) =>
                                              this.setState({
                                                book_in_date: event,
                                                openCheckIn: true,
                                              })
                                            }
                                          />
                                        </div>
                                      </div>

                                      <div className="input-box">
                                        <label className="label-text mb-0">
                                          Check out
                                        </label>
                                        <div className="form-group">
                                          <DateTime
                                            closeOnClickOutside={true}
                                            //  open={this.state.openCheckIn}
                                            dateFormat="DD/MM/YYYY"
                                            closeOnSelect
                                            isValidDate={this.valid}
                                            value={book_out_date}
                                            onChange={(event) =>
                                              this.setState({
                                                book_out_date: event,
                                                openCheckIn: false,
                                              })
                                            }
                                          />
                                        </div>
                                      </div>

                                      {/* <div className="input-box">
                                    <label className="label-text">Rooms</label>
                                    <div className="form-group">
                                      <div className="select-contain w-auto">
                                        <select
                                          className="select-contain-select"
                                          // value={this.state.selected_room}
                                          onChange={(e) => {
                                            console.log(
                                              JSON.parse(e.target.value).price
                                            );
                                            this.setState(
                                              {
                                                selected_room: JSON.parse(
                                                  e.target.value
                                                ),
                                              },
                                              () =>
                                                console.log(
                                                  this.state.selected_room
                                                )
                                            );
                                          }}
                                        >
                                          <option value>Select Room</option>
                                          {rooms &&
                                            rooms.length > 0 &&
                                            rooms.map((el, index) => {
                                              return (
                                                <option
                                                  value={JSON.stringify(el)}
                                                  key={index + "room"}
                                                >
                                                  {el.name} -
                                                  {"\u20a6" +
                                                    el.price
                                                      .toString()
                                                      .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ","
                                                      )}
                                                </option>
                                              );
                                            })}
                                        </select>
                                      </div>
                                    </div>
                                  </div> */}
                                    </form>
                                  </div>
                                </div>
                                {/* end sidebar-widget-item */}
                                <div className="sidebar-widget-item">
                                  {/* <div className="checkboxes float-left">
								<label className="container_check">Pay at Hotel
									<input type="checkbox"
                   value={this.state.status}
                    onChange={(event) => {
    return this.setState((prevState) => {
       return {
          ...prevState,
          status: !prevState.status
       }
    })
}}
                  />
									<span className="checkmark"></span>
								</label>
							</div> */}
                                  {/* <div className="qty-box mb-2 d-flex align-items-center justify-content-between">
                            <label className="font-size-16">
                              Adults <span>Age 18+</span>
                            </label>
                            <div className="qtyBtn d-flex align-items-center">
                              <input
                                type="text"
                                name="qtyInput"
                                //
                                value={no_of_adults}
                                onChange={(e)=>this.setState({no_of_adults:e.target.value})}
                              />
                            </div>
                          </div> */}
                                  {/* end qty-box */}
                                  {/* <div className="qty-box mb-2 d-flex align-items-center justify-content-between">
                            <label className="font-size-16">
                              Children <span>2-12 years old</span>
                            </label>
                            <div className="qtyBtn d-flex align-items-center">
                              <input
                                type="text"
                                name="qtyInput"
                                //
                                value={no_of_children}
                                onChange={(e)=>this.setState({no_of_children:e.target.value})}
                              />
                            </div>
                          </div> */}
                                  {/* end qty-box */}
                                  {/* <div className="qty-box mb-2 d-flex align-items-center justify-content-between">
                            <label className="font-size-16">
                              Infants <span>0-2 years old</span>
                            </label>
                            <div className="qtyBtn d-flex align-items-center">
                              <input
                                type="text"
                                name="qtyInput"
                                //
                                value={no_of_infants}
                                onChange={(e)=>this.setState({no_of_infants:e.target.value})}
                              />
                            </div>
                          </div> */}
                                  {/* end qty-box */}
                                </div>
                                {/* end sidebar-widget-item */}
                                <div className="btn-box pt-2">
                                  <button
                                    className="theme-btn text-center w-100 mb-2"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      return this.setState(
                                        { data, average_price },
                                        () => this.book()
                                      );
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
                                  {/* <div className="d-flex align-items-center justify-content-between pt-2">
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
                                  34
                                </p>
                              </div> */}
                                </div>
                              </div>
                            </Sticky>
                          </OutsideClickHandler>
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
                                              I agree with
                                              <a href="/terms">
                                                Terms of Service
                                              </a>
                                              and
                                              <a href="/privacy-policy">
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
                                </div>
                              </div>
                            </div>
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
                              Do not hesitate to give us a call. We are an
                              expert team and we are happy to talk to you.
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
                    {hotels.map((el, index) => {
                      el.rooms.sort(function (a, b) {
                        return a.price - b.price;
                      });
                      let _roomPrice =
                        el.rooms && el.rooms[0] && el.rooms[0].price;
                      if (el.id != id && index < 3) {
                        return (
                          <div className="col-lg-4 responsive-column">
                            <div className="card-item">
                              <div className="card-img">
                                <a
                                  className="d-block"
                                  onClick={async () => {
                                    await this.props.router.push({
                                      pathname: "/detail-hotel",
                                      query: { id: el.id },
                                    });
                                    window.location.reload();
                                  }}
                                >
                                  <img src={el.images[0].url} alt="hotel-img" />
                                </a>
                                <span className="badge">Bestseller</span>
                                <div
                                  className="add-to-wishlist icon-element"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Bookmark"
                                >
                                  <i className="la la-heart-o" />
                                </div>
                              </div>
                              <div className="card-body">
                                <h3 className="card-title">
                                  <a>{el.name}</a>
                                </h3>
                                <p className="card-meta">{address}</p>
                                <div className="card-rating">
                                  <span className="badge text-white">
                                    4.4/5
                                  </span>
                                  <span className="review__text">Average</span>
                                  <span className="rating__text">
                                    (30 Reviews)
                                  </span>
                                </div>
                                <div className="card-price d-flex align-items-center justify-content-between">
                                  <p>
                                    <span className="price__from">From</span>
                                    <span className="price__num">
                                      {"\u20a6"}
                                      {_roomPrice}
                                    </span>
                                    <span className="price__text">
                                      Per night
                                    </span>
                                  </p>
                                  <a className="btn-text">
                                    See details
                                    <i className="la la-angle-right" />
                                  </a>
                                </div>
                              </div>
                            </div>
                            {/* end card-item */}
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
                {/* end container */}
              </section>
              {/* end related-tour-area */}
              {/* ================================
    END RELATE TOUR AREA
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
            {/* <style global jsx>{`
          body {
            background: #fff;
          }
        `}</style> */}
          </div>
        )}
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
  setOrderCheckInDate,
  setOrderCheckOutDate,
  setOrderImage,
  setOrderName,
  setOrderSubData,
  setOrderSubName,
};

const DetailHotel_ = withRouter(DetailHotel);
const DetailHotel__ = withAlert()(DetailHotel_);
export default connect(mapStateToProps, mapDispatchToProps)(DetailHotel__);
