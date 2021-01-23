import Head from "next/head";
import React, { Component } from "react";
import Header from "../components/header";
import DetailsHeader from "../components/detailsHeader";
import WhiteLoader from "../components/whiteLoader";
import PreLoader from "../components/preloader";
import SignInModal from "../components/signInModal";
import Footer from "../components/footer";
import $ from "jquery";
import Cookies from "js-cookie";
import moment from "moment";
import { withRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../components/config.js";
import states from "../components/states.json";
import { withAlert } from "react-alert";
import DateTime from "react-datetime";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

class AddHotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      token: "",
      name: "",
      bio: "",
      location: "",
      address: "",
      verified: "",
      created_by: "",
      features: [],

      hotel_type: "",
      extra_people_charge: "",
      minimum_stay: "",

      images: [],
      upload_images: [],
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
      hotelFeatures: [],
      selectedHotelFeatures: [],
      loader: false,
    };
  }

  async componentDidMount() {
    let token = await Cookies.get("token");
    if (token == null || token == "") {
      this.props.router.push("/account");
      console.log("false tojken");
      this.setState({ auth: false });
    } else {
      console.log(token);
      this.setState({ auth: true, token });
    }
    this.getHotelFeatures();
  }

  getHotelFeatures = async () => {
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "hotelFeatures", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ hotelFeatures: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            hotelFeatures: [...prevState.hotelFeatures, row],
          }));
        }
        // this.getHotelFacilities(token);
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error.response);
        // if(error.response.status == 401){
        //   this.props.router.push('/sade')
        // }
      });
  };

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

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

  createHotel = async (e) => {
    const {
      name,
      bio,
      location,
      address,
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

      housekeeping_frequency,
      bathroom,
      front_desk,
      on_site_staff,
      rooms,
      hotelFeatures,
      selectedHotelFeatures,
      loader,
    } = this.state;
    const { alert } = this.props;
    this.setState({ loader: true });
    var formData = new FormData();
    for (const key of Object.keys(images)) {
      formData.append("images", images[key]);
    }
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("location", location);
    formData.append("address", address.label);
    formData.append("contact_email", contact_email);
    formData.append("contact_website", contact_website);
    formData.append("contact_phone", contact_phone);
    formData.append("features", JSON.stringify(features));
    formData.append("check_in_time", check_in_time);
    formData.append("check_out_time", check_out_time);
    formData.append("hotel_type", hotel_type);
    formData.append("extra_people_charge", extra_people_charge);
    formData.append("minimum_stay", minimum_stay);
    formData.append("housekeeping_frequency", housekeeping_frequency);
    formData.append("bathroom", bathroom);
    formData.append("front_desk", front_desk);
    formData.append("on_site_staff", on_site_staff);
    let token = await Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "hotel", formData, config)
      .then((response) => {
        this.setState({ loader: false });
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
          });
          alert.show(<div>{error.response.data.message}</div>, {
            type: "error",
          });
          console.log(JSON.stringify(error));
          if (error.response.statusCode == 401) {
            this.props.router.push("/account");
          }
        }
      });
  };

  render() {
    const {
      name,
      bio,
      location,
      address,
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

      housekeeping_frequency,
      bathroom,
      front_desk,
      on_site_staff,
      rooms,
      hotelFeatures,
      selectedHotelFeatures,
      loader,
    } = this.state;
    const setAddress = (address) => this.setState({ address });

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
    START BREADCRUMB AREA
================================= */}
          <section className="breadcrumb-area bread-bg-7">
            <div className="breadcrumb-wrap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="breadcrumb-content text-center">
                      <div className="section-heading">
                        <h2 className="sec__title">
                          List your Hotel with Nigeria's <br />
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
                      List an accommodation on Book24
                    </h3>
                  </div>
                  <div className="form-box">
                    <div className="form-title-wrap">
                      <h3 className="title">
                        <i className="la la-user mr-2 text-gray" />
                        Your information
                      </h3>
                    </div>
                    {/* form-title-wrap */}
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
                        {/* end col-lg-6 */}
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
                        {/* end col-lg-6 */}
                        <div className="col-lg-6 responsive-column">
                          <div className="input-box">
                            <label className="label-text">
                              What is your role at this business?
                            </label>
                            <div className="form-group select-contain w-100">
                              <select className="select-contain-select">
                                <option value>Select one</option>
                                <option value="OWNER">Owner</option>
                                <option value="GENERAL_MANAGER">
                                  General Manager
                                </option>

                                <option value="AGENCY_CONSULTANT">
                                  Agency / Consultant
                                </option>

                                <option value="MARKETING">Marketing</option>

                                <option value="SALES">Sales</option>
                                <option value="OTHER">Other</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-6 */}
                      </form>
                    </div>
                    {/* end form-content */}
                  </div>
                  {/* end form-box */}
                  <div className="form-box">
                    <div className="form-title-wrap">
                      <h3 className="title">
                        <i className="la la-gear mr-2 text-gray" />
                        Listing information for your accommodation
                      </h3>
                    </div>
                    {/* form-title-wrap */}
                    <div className="form-content contact-form-action">
                      <form method="post" className="row">
                        <div className="col-lg-6 responsive-column">
                          <div className="input-box">
                            <label className="label-text">
                              Official hotel name
                            </label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="Hotel name"
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
                            <label className="label-text">Location</label>
                            <div className="form-group select-contain w-100">
                              <select
                                className="select-contain-select"
                                onChange={(event) => {
                                  this.setState(
                                    { location: event.target.value },
                                    () => console.log(location)
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
                              Description of your hotel
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
                                value={bio}
                                required
                                onChange={(event) =>
                                  this.setState({
                                    bio: event.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">Check in time</label>
                            <div className="form-group">
                              <DateTime
                                dateFormat={false}
                                value={this.state.check_in_time}
                                onChange={(event) =>
                                  this.setState({ start_date: event })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">Check out time</label>
                            <div className="form-group">
                              <DateTime
                                dateFormat={false}
                                value={check_out_time}
                                onChange={(event) =>
                                  this.setState({ check_out_time: event })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* end form-content */}
                  </div>
                  {/* end form-box */}

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
                      </form>
                    </div>
                    {/* end form-content */}
                  </div>
                  {/* end form-box */}
                  <div className="form-box">
                    <div className="form-title-wrap">
                      <h3 className="title">
                        <i className="la la-building-o mr-2 text-gray" />
                        Information about your accommodation
                      </h3>
                    </div>
                    {/* form-title-wrap */}
                    <div className="form-content contact-form-action">
                      <form method="post" className="row">
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">
                              Total number of rooms &amp; suites
                            </label>
                            <div className="form-group">
                              <span className="la la-pencil form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="Total number of rooms & suites"
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-12 */}

                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">
                              Hotel Type(1 star,2 star,etc)
                            </label>
                            <div className="form-group select-contain w-100">
                              <select
                                className="select-contain-select"
                                onChange={(event) => {
                                  this.setState(
                                    { hotel_type: event.target.value },
                                  
                                  );
                                }}
                              >
                                <option value>Select a hotel type </option>
                                <option value={"1 star"}>1 star</option>
                                <option value={"2 star"}>2 star</option>
                                <option value={"3 star"}>3 star</option>
                                <option value={"4 star"}>4 star</option>
                                <option value={"5 star"}>5 star</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-6 */}
                        <div className="col-lg-12">
                          <div className="input-box">
                            <label className="label-text mb-0 line-height-20">
                              Description of your accommodation
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
                                defaultValue={""}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text text-color-6">
                              Minimum stay* (not including holidays)
                            </label>
                            <div className="form-group d-flex align-items-center">
                              <label
                                htmlFor="radio-1"
                                className="radio-trigger mb-0 font-size-14 mr-3"
                              >
                                <input
                                  type="radio"
                                  id="radio-1"
                                  name="radio"
                                  value={"3 nights or less"}
                                  checked={minimum_stay === "3 nights or less"}
                                  onChange={(e) =>
                                    this.setState({
                                      minimum_stay: "3 nights or less",
                                    })
                                  }
                                />
                                <span className="checkmark" />
                                <span>3 nights or less</span>
                              </label>
                              <label
                                htmlFor="radio-2"
                                className="radio-trigger mb-0 font-size-14"
                              >
                                <input
                                  type="radio"
                                  id="radio-2"
                                  name="radio"
                                  value={"3 nights or less"}
                                  checked={
                                    minimum_stay === "More than 3 nights"
                                  }
                                  onChange={(e) =>
                                    this.setState({
                                      minimum_stay: "More than 3 nights",
                                    })
                                  }
                                />
                                <span className="checkmark" />
                                <span>More than 3 nights</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-6 */}
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text text-color-6">
                              Security *
                            </label>
                            <div className="form-group d-flex align-items-center">
                              <label
                                htmlFor="radio-3"
                                className="radio-trigger mb-0 font-size-14 mr-3"
                              >
                                <input type="radio" id="radio-3" name="radio" />
                                <span className="checkmark" />
                                <span>On site</span>
                              </label>
                              <label
                                htmlFor="radio-4"
                                className="radio-trigger mb-0 font-size-14"
                              >
                                <input type="radio" id="radio-4" name="radio" />
                                <span className="checkmark" />
                                <span>None</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-6 */}
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text text-color-6">
                              On site staff *
                            </label>
                            <div className="form-group d-flex align-items-center">
                              <label
                                htmlFor="radio-5"
                                className="radio-trigger mb-0 font-size-14 mr-3"
                              >
                                <input
                                  type="radio"
                                  id="radio-5"
                                  name="radio"
                                  value={"Yes"}
                                  checked={on_site_staff === "Yes"}
                                  onChange={(e) =>
                                    this.setState({ on_site_staff: "Yes" })
                                  }
                                />
                                <span className="checkmark" />
                                <span>Yes</span>
                              </label>
                              <label
                                htmlFor="radio-6"
                                className="radio-trigger mb-0 font-size-14"
                              >
                                <input
                                  type="radio"
                                  id="radio-6"
                                  name="radio"
                                  value={"No"}
                                  checked={on_site_staff === "No"}
                                  onChange={(e) =>
                                    this.setState({ on_site_staff: "No" })
                                  }
                                />
                                <span className="checkmark" />
                                <span>No</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-6 */}
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text text-color-6">
                              Housekeeping *
                            </label>
                            <div className="form-group d-flex align-items-center">
                              <label
                                htmlFor="radio-7"
                                className="radio-trigger mb-0 font-size-14 mr-3"
                              >
                                <input type="radio" id="radio-7" name="radio" />
                                <span className="checkmark" />
                                <span>Included in room rate</span>
                              </label>
                              <label
                                htmlFor="radio-8"
                                className="radio-trigger mb-0 font-size-14"
                              >
                                <input type="radio" id="radio-8" name="radio" />
                                <span className="checkmark" />
                                <span>Additional Fee</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-6 */}
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text text-color-6">
                              Housekeeping frequency *
                            </label>
                            <div className="form-group d-flex align-items-center">
                              <label
                                htmlFor="radio-9"
                                className="radio-trigger mb-0 font-size-14 mr-3"
                              >
                                <input
                                  type="radio"
                                  id="radio-9"
                                  name="radio"
                                  value={"Daily"}
                                  checked={housekeeping_frequency === "Daily"}
                                  onChange={(e) =>
                                    this.setState({
                                      housekeeping_frequency: "Daily",
                                    })
                                  }
                                />
                                <span className="checkmark" />
                                <span>Daily</span>
                              </label>
                              <label
                                htmlFor="radio-10"
                                className="radio-trigger mb-0 font-size-14 mr-3"
                              >
                                <input
                                  type="radio"
                                  id="radio-10"
                                  name="radio"
                                  value={"Weekly"}
                                  checked={housekeeping_frequency === "Weekly"}
                                  onChange={(e) =>
                                    this.setState({
                                      housekeeping_frequency: "Weekly",
                                    })
                                  }
                                />
                                <span className="checkmark" />
                                <span>Weekly</span>
                              </label>
                              <label
                                htmlFor="radio-11"
                                className="radio-trigger mb-0 font-size-14 mr-3"
                              >
                                <input
                                  type="radio"
                                  id="radio-11"
                                  name="radio"
                                  value="Bi-Weekly"
                                  checked={
                                    housekeeping_frequency === "Bi-Weekly"
                                  }
                                  onChange={(e) =>
                                    this.setState({
                                      housekeeping_frequency: "Bi-Weekly",
                                    })
                                  }
                                />
                                <span className="checkmark" />
                                <span>Bi-weekly</span>
                              </label>
                              <label
                                htmlFor="radio-12"
                                className="radio-trigger mb-0 font-size-14"
                              >
                                <input
                                  type="radio"
                                  id="radio-12"
                                  name="radio"
                                  value="None"
                                  checked={housekeeping_frequency === "None"}
                                  onChange={(e) =>
                                    this.setState({
                                      housekeeping_frequency: "None",
                                    })
                                  }
                                />
                                <span className="checkmark" />
                                <span>None</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-6 */}
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text text-color-6">
                              Front desk *
                            </label>
                            <div className="form-group d-flex align-items-center">
                              <label
                                htmlFor="radio-13"
                                className="radio-trigger mb-0 font-size-14 mr-3"
                              >
                                <input
                                  type="radio"
                                  id="radio-13"
                                  name="radio"
                                  value="24-hour staffing"
                                  checked={front_desk === "24-hour staffing"}
                                  onChange={(e) =>
                                    this.setState({
                                      front_desk: "24-hour staffing",
                                    })
                                  }
                                />
                                <span className="checkmark" />
                                <span>24-hour staffing</span>
                              </label>
                              <label
                                htmlFor="radio-14"
                                className="radio-trigger mb-0 font-size-14 mr-3"
                              >
                                <input
                                  type="radio"
                                  id="radio-14"
                                  name="radio"
                                  value="Limited hours staffing"
                                  checked={
                                    front_desk === "Limited hours staffing"
                                  }
                                  onChange={(e) =>
                                    this.setState({
                                      front_desk: "Limited hours staffing",
                                    })
                                  }
                                />
                                <span className="checkmark" />
                                <span>Limited hours staffing</span>
                              </label>
                              <label
                                htmlFor="radio-15"
                                className="radio-trigger mb-0 font-size-14"
                              >
                                <input
                                  type="radio"
                                  id="radio-15"
                                  name="radio"
                                  value="None"
                                  checked={front_desk === "None"}
                                  onChange={(e) =>
                                    this.setState({ front_desk: "None" })
                                  }
                                />
                                <span className="checkmark" />
                                <span>None</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-6 */}
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text text-color-6">
                              Bathroom *
                            </label>
                            <div className="form-group d-flex align-items-center">
                              <label
                                htmlFor="radio-16"
                                className="radio-trigger mb-0 font-size-14 mr-3"
                              >
                                <input
                                  type="radio"
                                  id="radio-16"
                                  name="radio"
                                  value="All en suite"
                                  checked={bathroom === "All en suite"}
                                  onChange={(e) =>
                                    this.setState({ bathroom: "All en suite" })
                                  }
                                />
                                <span className="checkmark" />
                                <span>All en suite</span>
                              </label>
                              <label
                                htmlFor="radio-17"
                                className="radio-trigger mb-0 font-size-14 mr-3"
                              >
                                <input
                                  type="radio"
                                  id="radio-17"
                                  name="radio"
                                  value="All en suite"
                                  checked={bathroom === "Some en suite"}
                                  onChange={(e) =>
                                    this.setState({ bathroom: "Some en suite" })
                                  }
                                />
                                <span className="checkmark" />
                                <span>Some en suite</span>
                              </label>
                              <label
                                htmlFor="radio-18"
                                className="radio-trigger mb-0 font-size-14"
                              >
                                <input
                                  type="radio"
                                  id="radio-18"
                                  name="radio"
                                  value="Shared"
                                  checked={bathroom === "Shared"}
                                  onChange={(e) =>
                                    this.setState({ bathroom: "Shared" })
                                  }
                                />
                                <span className="checkmark" />
                                <span>Shared</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* end form-content */}
                  </div>
                  {/* end form-box */}
                  <div className="form-box">
                    <div className="form-title-wrap">
                      <h3 className="title">
                        <i className="la la-gear mr-2 text-gray" />
                        Amenities
                      </h3>
                    </div>
                    {/* form-title-wrap */}
                    <div className="form-content contact-form-action">
                      <form method="post" className="row">
                        <div className="col-lg-6">
                          {hotelFeatures.map((el, index) => {
                            if (index <= Math.floor(hotelFeatures.length / 2)) {
                              return (
                                <div className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    id={el.name.toLowerCase()}
                                    value={el.name.toLowerCase()}
                                    onChange={(e) => {
                                      let test_array = features;
                                      if (test_array.indexOf(el.name) < 0) {
                                        test_array.push(el.name);
                                      } else {
                                        test_array.splice(
                                          test_array.indexOf(el.name),
                                          1
                                        );
                                      }
                                      this.setState({ features: test_array });
                                    }}
                                  />
                                  <label htmlFor={el.name}>{el.name}</label>
                                </div>
                              );
                            }
                          })}
                        </div>
                        <div className="col-lg-6">
                          {hotelFeatures.map((el, index) => {
                            if (index > Math.floor(hotelFeatures.length / 2)) {
                              return (
                                <div className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    id={el.name.toLowerCase()}
                                    value={el.name.toLowerCase()}
                                    onChange={(e) => {
                                      let test_array = features;
                                      if (test_array.indexOf(el.name) < 0) {
                                        test_array.push(el.name);
                                      } else {
                                        test_array.splice(
                                          test_array.indexOf(el.name),
                                          1
                                        );
                                      }
                                      this.setState({ features: test_array });
                                    }}
                                  />
                                  <label htmlFor={el.name}>{el.name}</label>
                                </div>
                              );
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
                                  console.log(images)
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
                      <button onClick={this.createHotel} className="theme-btn">
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
const AddHotel_ = withRouter(AddHotel);
export default withAlert()(AddHotel_);
