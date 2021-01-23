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
import WhiteLoader from "../components/whiteLoader";
import { withAlert } from "react-alert";
import states from "../components/states.json";
import { API_URL } from "../components/config.js";
import ReactTags from "react-tag-autocomplete";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import DateTime from "react-datetime";

const KeyCodes = {
  comma: "188",
  enter: "13",
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class AddCruise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      token: "",
      name: "",
      price: "",
      location: "",
      address: "",
      description: "",
      ship_year: "",
      ship_age: "",
      cruiseCategory: "",
      ship_refurbished_date: "",
      ship_tonnage: "",
      ship_length: "",
      ship_beam: "",
      ship_draft: "",
      ship_speed: "",
      ship_guest_capacity: "",
      ship_total_staff: "",
      start_date: "",
      end_date: "",
      contact_phone: "",
      contact_website: "",
      contact_email: "",
      cruise_amenitys: [],
      features: [],
      images: [],
      loader: false,
    };
  }

  valid(current) {
    return current.isAfter(moment().subtract(1, "day"));
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  async componentDidMount() {
    let token = await Cookies.get("token");
    if (token == null || token == "") {
      this.props.router.push("/account");
    }
    this.getCruiseAmenities(token);
  }

  getCruiseAmenities = async (token) => {
    if (token == null || token == "") {
      //    this.props.router.push("/login");
    }
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "cruiseAmenitys", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ cruiseAmenitys: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            cruiseAmenitys: [...prevState.cruiseAmenitys, row],
          }));
        }
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

  createCruise = (e) => {
    const { alert } = this.props;

    const {
      name,
      price,
      location,
      address,
      description,
      ship_year,
      ship_age,
      cruiseCategory,
      ship_refurbished_date,
      ship_tonnage,
      ship_length,
      ship_beam,
      ship_draft,
      ship_speed,
      ship_guest_capacity,
      ship_total_staff,
      start_date,
      end_date,
      contact_phone,
      contact_website,
      contact_email,
      cruise_amenitys,
      features,
      images,
      loader,
    } = this.state;
    e.preventDefault();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    var formData = new FormData();
    for (const key of Object.keys(images)) {
      formData.append("images", images[key]);
    }
    formData.append("name", name);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("address", address.label);
    formData.append("contact_email", contact_email);
    formData.append("contact_website", contact_website);
    formData.append("contact_phone", contact_phone);

    formData.append("ship_year", ship_year);
    formData.append("cruiseCategory", cruiseCategory);
    formData.append("ship_age", ship_age);
    formData.append("ship_refurbished_date", ship_refurbished_date);
    formData.append("ship_tonnage", ship_tonnage);
    formData.append("price", price);
    formData.append("features", JSON.stringify(features));
    formData.append("ship_length", ship_length);
    formData.append("ship_beam", ship_beam);
    formData.append("ship_draft", ship_draft);
    formData.append("ship_speed", ship_speed);
    formData.append("ship_guest_capacity", ship_guest_capacity);
    formData.append("ship_total_staff", ship_total_staff);
    formData.append("start_date", start_date);
    formData.append("end_date", end_date);

    console.log(formData);
    console.log(bodyParameters);
    let token = Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "cruise", formData, config)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        this.setState({ loader: false });
        console.log(error);
        if (error.response.data) {
          this.setState({
            error: error.response.data.message,
            error_div: true,
            loader: false,
          });
          alert.show(<div>{error.response.data.message}</div>, {
            type: "error",
          });
          console.log(JSON.stringify(error));
        }
      });
  };

  render() {
    const {
      name,
      price,
      location,
      address,
      description,
      ship_year,
      ship_age,
      cruiseCategory,
      ship_refurbished_date,
      ship_tonnage,
      ship_length,
      ship_beam,
      ship_draft,
      ship_speed,
      ship_guest_capacity,
      ship_total_staff,
      start_date,
      end_date,
      contact_phone,
      contact_website,
      contact_email,
      cruise_amenitys,
      features,
      loader,
    } = this.state;
    const setAddress = (address) => this.setState({ address });

    const half_length = Math.floor(cruise_amenitys.length / 2);
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
          <link rel="stylesheet" href="css/owl.cruiseousel.min.css" />
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
    START BREADCRUMB AREA
================================= */}
          <section className="breadcrumb-area bread-bg-3">
            <div className="breadcrumb-wrap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="breadcrumb-content text-center">
                      <div className="section-heading">
                        <h2 className="sec__title">
                          List your cruise with the Nigeria's <br />
                          largest travel community
                        </h2>
                      </div>
                    </div>
                    {/* end breadcrumb-content */}
                  </div>
                  {/* end col-lg-12 */}
                </div>
                {/* end row */}
              </div>
              {/* end container */}
            </div>
            {/* end breadcrumb-wrap */}
            <div className="bread-svg-box">
              <svg
                className="bread-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <polygon points="100 0 50 10 0 0 0 10 100 10" />
              </svg>
            </div>
            {/* end bread-svg */}
          </section>
          {/* end breadcrumb-area */}
          {/* ================================
    END BREADCRUMB AREA
================================= */}
          {/* ================================
    START FORM AREA
================================= */}
          <section className="listing-form section--padding">
            <div className="container">
              <div className="row">
                <div className="col-lg-9 mx-auto">
                  <div className="listing-header pb-4">
                    <h3 className="title font-size-28 pb-2">
                      List a cruise on Book24
                    </h3>
                  </div>
                  {/* <div className="form-box">
                    <div className="form-title-wrap">
                      <h3 className="title">
                        <i className="la la-user mr-2 text-gray" />
                        Your information
                      </h3>
                    </div>
                    <div className="form-content contact-form-action">
                      <form method="post" className="row">
                        <div className="col-lg-6 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Your Name</label>
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
                            <label className="label-text">Your Email</label>
                            <div className="form-group">
                              <span className="la la-envelope-o form-icon" />
                              <input
                                className="form-control"
                                type="email"
                                name="email"
                                placeholder="Your email"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 responsive-column">
                          <div className="input-box">
                            <label className="label-text">
                              What is your role at this business?
                            </label>
                            <div className="form-group select-contain w-100">
                              <select className="select-contain-select">
                                <option value>Select one</option>
                                <option value="OWNER">Owner</option>
                                <option value="MANAGER"> Manager</option>
                                <option value="AGENCY_CONSULTANT">
                                  Agency / Consultant
                                </option>
                                <option value="SALES">Sales</option>
                                <option value="OTHER">Other</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  end form-box */}
                  <div className="form-box">
                    <div className="form-title-wrap">
                      <h3 className="title">
                        <i className="la la-gear mr-2 text-gray" />
                        Listing information for your cruise
                      </h3>
                    </div>
                    {/* form-title-wrap */}
                    <div className="form-content contact-form-action">
                      <form method="post" className="row">
                        <div className="col-lg-6 responsive-column">
                          <div className="input-box">
                            <label className="label-text">
                              Official cruise name
                            </label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="Enter cruise name"
                                required
                                value={name}
                                onChange={(e) =>
                                  this.setState({ name: e.target.value })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-6 */}
                        <div className="col-lg-6 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Category</label>
                            <div className="form-group select-contain w-100">
                              <select
                                className="select-contain-select"
                                onChange={(e) =>
                                  this.setState({
                                    cruiseCategory: e.target.value,
                                  })
                                }
                              >
                                <option value={"economy"}>
                                  Economy Cruises
                                </option>
                                <option value={"luxury"}>Luxury Cruises</option>
                                <option value={"popular"}>
                                  Popular Cruises
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-6 */}
                        <div className="col-lg-6 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Location</label>
                            <div className="form-group select-contain w-100">
                              <select
                                className="select-contain-select"
                                onChange={(event) => {
                                  this.setState(
                                    { location: event.target.value },
                                    () => console.log(this.state.location)
                                  );
                                }}
                              >
                                <option value>Select a state </option>
                                {states.map((element) => (
                                  <option value={element.toLowerCase()}>
                                    {element}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>{" "}
                          <div className="input-box">
                            <label className="label-text">Location</label>
                            <div className="form-group select-contain w-100">
                              <select
                                className="select-contain-select"
                                onChange={(event) => {
                                  this.setState(
                                    { location: event.target.value },
                                    () => console.log(this.state.location)
                                  );
                                }}
                              >
                                <option value>Select a state </option>
                                {states.map((element) => (
                                  <option value={element.toLowerCase()}>
                                    {element}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Price</label>
                            <div className="form-group">
                              <span className="la la-money-bill form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="number"
                                placeholder="Enter price"
                                required
                                value={this.state.price}
                                onChange={(event) =>
                                  this.setState({ price: event.target.value })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Street address</label>
                            <div className="form-group">
                              <span className="la la-map form-icon" />
                              <GooglePlacesAutocomplete
                                apiKey="AIzaSyCabaQ0gls7rfTgLU2gW8vDBxlrTNZ1CW4"
                                selectProps={{
                                  address,
                                  onChange: setAddress,
                                  styles: {
                                    input: (provided) => ({
                                      ...provided,
                                      color: "#1281dd",
                                      width: "200px",
                                    }),
                                    option: (provided) => ({
                                      ...provided,
                                      color: "#1281dd",
                                    }),
                                    singleValue: (provided) => ({
                                      ...provided,
                                      color: "#1281dd",
                                    }),
                                  },
                                  placeholder: "Enter address",
                                  componentRestrictions: {
                                    country: "ng",
                                  },
                                  // query: {
                                  //               key: "AIzaSyBRWIXQCbRpusFNiQitxMJy_89gguGk66w",
                                  //               language: "en",
                                  //               components: "country:ng"
                                  //             }
                                }}
                              />
                              {/* <input className="form-control" type="text" name="text" placeholder="Enter building number and street name" /> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="input-box">
                            <label className="label-text mb-0 line-height-20">
                              Description of your car
                            </label>
                            <p className="font-size-13 mb-3 line-height-20">
                              400 character limit
                            </p>
                            <div className="form-group">
                              <span className="la la-pencil form-icon" />
                              <textarea
                                className="message-control form-control"
                                name="message"
                                placeholder="In English only           "
                                value={this.state.description}
                                required
                                onChange={(event) =>
                                  this.setState({
                                    description: event.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">
                              Start date and time
                            </label>
                            <div className="form-group">
                              <DateTime
                                isValidDate={this.valid}
                                value={this.state.start_date}
                                onChange={(event) =>
                                  this.setState({ start_date: event })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">
                              End date and time
                            </label>
                            <div className="form-group">
                              <DateTime
                                isValidDate={this.valid}
                                value={this.state.end_date}
                                onChange={(event) =>
                                  this.setState({ end_date: event })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-6 */}
                        {/* <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">Not Included</label>
                            <div className="form-group select-contain w-100">
                              <select className="select-contain-select">
                                <option value>---Not Included---</option>
                                <option value="EntranceFees">
                                  Entrance Fees
                                </option>
                              </select>
                            </div>
                          </div>
                        </div> */}
                        {/* end col-lg-6 */}
                      </form>
                    </div>
                    {/* end form-content */}
                  </div>
                  {/* end form-box */}
                  <div className="form-box">
                    <div className="form-title-wrap">
                      <h3 className="title">
                        <i className="la la-ship mr-2 text-gray" />
                        Ship Statistics
                      </h3>
                    </div>
                    {/* form-title-wrap */}
                    <div className="form-content contact-form-action">
                      <form method="post" className="row">
                        <div className="col-lg-4 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Date Launched</label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder={1989}
                                value={ship_year}
                                onChange={(e) =>
                                  this.setState({ ship_year: e.target.value })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-4 */}
                        <div className="col-lg-4 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Age of Ship</label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="29 years"
                                value={ship_age}
                                onChange={(e) =>
                                  this.setState({ ship_age: e.target.value })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-4 */}
                        {/* <div className="col-lg-4 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Age of Ship</label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="29 years"
                              />
                            </div>
                          </div>
                        </div> */}
                        {/* end col-lg-4 */}
                        <div className="col-lg-4 responsive-column">
                          <div className="input-box">
                            <label className="label-text">
                              Refurbished Date
                            </label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="01/01/2017"
                                value={ship_refurbished_date}
                                onChange={(e) =>
                                  this.setState({
                                    ship_refurbished_date: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-4 */}
                        <div className="col-lg-4 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Tonnage</label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="93,558 grt"
                                value={ship_tonnage}
                                onChange={(e) =>
                                  this.setState({
                                    ship_tonnage: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-4 */}
                        <div className="col-lg-4 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Length</label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="965 ft"
                                value={ship_length}
                                onChange={(e) =>
                                  this.setState({ ship_length: e.target.value })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-4 */}
                        <div className="col-lg-4 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Beam</label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="105 ft"
                                value={ship_beam}
                                onChange={(e) =>
                                  this.setState({ ship_beam: e.target.value })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-4 */}
                        <div className="col-lg-4 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Draft</label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="28 ft"
                                value={ship_draft}
                                onChange={(e) =>
                                  this.setState({ ship_draft: e.target.value })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-4 */}
                        <div className="col-lg-4 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Speed</label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="22.5 knots"
                                value={ship_speed}
                                onChange={(e) =>
                                  this.setState({ ship_speed: e.target.value })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-4 */}
                        <div className="col-lg-4 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Guest Capacity</label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="23,400"
                                value={ship_guest_capacity}
                                onChange={(e) =>
                                  this.setState({
                                    ship_guest_capacity: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-4 */}
                        <div className="col-lg-4 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Total Staff</label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="9,078 crew"
                                value={ship_total_staff}
                                onChange={(e) =>
                                  this.setState({
                                    ship_total_staff: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-4 */}
                        {/* <div className="col-lg-4 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Officers</label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="Italian"
                                value={ship_o}
                                onChange={(e)=>this.setState({ship_refurbished_date:e.target.value})}
                              />
                            </div>
                          </div>
                        </div> */}
                        {/* end col-lg-4 */}
                        {/* <div className="col-lg-4 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Dining Crew</label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="International"
                              />
                            </div>
                          </div>
                        </div> */}
                        {/* end col-lg-4 */}
                        {/* <div className="col-lg-4 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Other Crew</label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="International"
                              />
                            </div>
                          </div>
                        </div> */}
                        {/* end col-lg-4 */}
                        {/* <div className="col-lg-4 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Registry</label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="Panama"
                              />
                            </div>
                          </div>
                        </div> */}
                        {/* end col-lg-4 */}
                        {/* <div className="col-lg-4 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Ship Type</label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="Luxury Cruise"
                              />
                            </div>
                          </div>
                        </div> */}
                        {/* end col-lg-4 */}
                      </form>
                    </div>
                    {/* end form-content */}
                  </div>{" "}
                  <div className="form-box">
                    <div className="form-title-wrap">
                      <h3 className="title">
                        <i className="la la-user mr-2 text-gray" />
                        Contact Details
                      </h3>
                    </div>
                    {/* form-title-wrap */}
                    <div className="form-content contact-form-action">
                      <form method="post" className="row">
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">Phone</label>
                            <div className="form-group">
                              <span className="la la-phone form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Phone"
                                value={contact_phone}
                                onChange={(e) =>
                                  this.setState({
                                    contact_phone: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-6 */}
                        {/* <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">Mobile</label>
                            <div className="form-group">
                              <span className="la la-print form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Mobile"
                              />
                            </div>
                          </div>
                        </div> */}
                        {/* end col-lg-6 */}
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">Email</label>
                            <div className="form-group">
                              <span className="la la-envelope-o form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Email for customer inquiries"
                                value={contact_email}
                                onChange={(e) =>
                                  this.setState({
                                    contact_email: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-6 */}
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">
                              Your Website Address
                            </label>
                            <div className="form-group">
                              <span className="la la-globe form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                placeholder="website"
                                value={contact_website}
                                onChange={(e) =>
                                  this.setState({
                                    contact_website: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-6 */}
                        {/* <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">Facebook Page</label>
                            <div className="form-group">
                              <span className="la la-facebook form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                placeholder="https://www.facebook.com/"
                              />
                            </div>
                          </div>
                        </div> */}
                        {/* end col-lg-6 */}
                        {/* <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">Instagram Page</label>
                            <div className="form-group">
                              <span className="la la-instagram form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                placeholder="https://www.instagram.com/"
                              />
                            </div>
                          </div>
                        </div> */}
                        {/* end col-lg-6 */}
                        {/* <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">Twitter Page</label>
                            <div className="form-group">
                              <span className="la la-twitter form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                placeholder="https://www.twitter.com/"
                              />
                            </div>
                          </div>
                        </div> */}
                        {/* end col-lg-6 */}
                        {/* <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">Linkedin Page</label>
                            <div className="form-group">
                              <span className="la la-linkedin form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                placeholder="https://www.linkedin.com/"
                              />
                            </div>
                          </div>
                        </div> */}
                        {/* end col-lg-6 */}
                      </form>
                    </div>
                    {/* end form-content */}
                  </div>
                  {/* end form-box */}
                  {/* <div className="form-box">
                    <div className="form-title-wrap">
                      <h3 className="title">
                        <i className="la la-clock mr-2 text-gray" />
                        Cruise itinerary
                      </h3>
                    </div>
                  
                    <div className="form-content contact-form-action">
                      <form method="post" className="row">
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">Day</label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="Example: day 1"
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-6 */}
                  {/* <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">
                              Itinerary Name (comma separated)
                            </label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="Itinerary Name Example: Miami, Florida"
                              />
                            </div>
                          </div>
                        </div> */}
                  {/* end col-lg-6 */}
                  {/* <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">Arrival</label>
                            <div className="form-group">
                              <span className="la la-clock form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="4:00 AM"
                              />
                            </div>
                          </div>
                        </div> */}
                  {/* end col-lg-6 */}
                  {/* <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">Departure</label>
                            <div className="form-group">
                              <span className="la la-clock form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="8:00 PM"
                              />
                            </div>
                          </div>
                        </div> */}
                  {/* end col-lg-6 */}
                  {/* <div className="col-lg-12">
                          <div className="file-upload-wrap file-upload-wrap-2">
                            <input
                              type="file"
                              name="files[]"
                              className="multi file-upload-input with-preview"
                              multiple
                            />
                            <span className="file-upload-text">
                              <i className="la la-upload mr-2" />
                              Upload Image
                            </span>
                          </div>
                        </div> 
                    </div>
                  </div>
                  */}
                  <div className="form-box">
                    <div className="form-title-wrap">
                      <h3 className="title">
                        <i className="la la-gift mr-2 text-gray" />
                        Ship Amenities
                      </h3>
                    </div>
                    {/* form-title-wrap */}
                    <div className="form-content contact-form-action">
                      <form method="post" className="row">
                        <div className="col-lg-6">
                          {cruise_amenitys.map((el, index) => {
                            if (index <= half_length) {
                              <div className="custom-checkbox">
                                <input
                                  type="checkbox"
                                  id={el.name.toLowerCase()}
                                  value={el.name.toLowerCase()}
                                  onChange={(e) => {
                                    let test_array = features;
                                    if (test_array.indexOf(el.id) < 0) {
                                      test_array.push(el.id);
                                    } else {
                                      test_array.splice(
                                        test_array.indexOf(el.id),
                                        1
                                      );
                                    }
                                  }}
                                />
                                <label htmlFor={el.name}>{el.name}</label>
                              </div>;
                            }
                          })}
                        </div>
                        <div className="col-lg-6">
                          {cruise_amenitys.map((el, index) => {
                            if (index > half_length) {
                              <div className="custom-checkbox">
                                <input
                                  type="checkbox"
                                  id={el.name.toLowerCase()}
                                  value={el.name.toLowerCase()}
                                  onChange={(e) => {
                                    let test_array = features;
                                    if (test_array.indexOf(el.id) < 0) {
                                      test_array.push(el.id);
                                    } else {
                                      test_array.splice(
                                        test_array.indexOf(el.id),
                                        1
                                      );
                                    }
                                  }}
                                />
                                <label htmlFor={el.name}>{el.name}</label>
                              </div>;
                            }
                          })}
                        </div>
                      </form>
                    </div>
                    {/* end form-content */}
                  </div>
                  {/* end form-box */}
                  <div className="form-box">
                    <div className="form-title-wrap">
                      <h3 className="title">
                        <i className="la la-photo mr-2 text-gray" />
                        Choose a photo to represent this listing
                      </h3>
                    </div>
                    {/* form-title-wrap */}
                    <div className="form-content contact-form-action">
                      <form method="post" className="row">
                        <div className="col-lg-12">
                          <div className="file-upload-wrap">
                            <input
                              type="file"
                              name="files[]"
                              className="multi file-upload-input with-preview"
                              multiple
                              maxLength={3}
                              accept=".jpg, .jpeg, .png"
                              required
                              onChange={(event) => {
                                let test_images = [];
                                for (
                                  let i = 0;
                                  i < event.target.files.length;
                                  i++
                                ) {
                                  test_images.push(event.target.files[i]);
                                }
                                this.setState({ images: test_images }, () =>
                                  console.log(this.state.images)
                                );
                              }}
                            />
                            <span className="file-upload-text">
                              <i className="la la-upload mr-2" />
                              Click or drag images here to upload
                            </span>
                          </div>
                        </div>
                        {/* end col-lg-12 */}
                      </form>
                    </div>
                    {/* end form-content */}
                  </div>
                  {/* end form-box */}
                  <div className="submit-box">
                    <h3 className="title pb-3">Submit this listing</h3>
                    <div className="custom-checkbox">
                      <input type="checkbox" id="agreeChb" />
                      <label htmlFor="agreeChb">
                        Check this box to certify that you are an official
                        representative of the property for which you are
                        submitting this listing and that the information you
                        have submitted is correct. In submitting a photo, you
                        also certify that you have the right to use the photo on
                        the web and agree to NOT hold Book24 accountable for any
                        and all copyright issues arising from your use of the
                        image.
                      </label>
                    </div>
                    <div className="btn-box pt-3">
                      <button onClick={this.createCruise} className="theme-btn">
                        {loader ? <WhiteLoader /> : "Submit Listing"}
                        {!loader && <i className="la la-arrow-right ml-1" />}
                      </button>
                    </div>
                  </div>
                  {/* end submit-box */}
                </div>
                {/* end col-lg-9 */}
              </div>
              {/* end row */}
            </div>
            {/* end container */}
          </section>
          {/* end listing-form */}
          {/* ================================
    END FORM AREA
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
        <script src="js/owl.cruiseousel.min.js"></script>
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
const AddCruise_ = withRouter(AddCruise);
export default withAlert()(AddCruise_);
