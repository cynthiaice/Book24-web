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
import Moment from "moment";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import axios from "axios";
import { API_URL } from "../components/config.js";
import states from "../components/states.json";
import { withAlert } from "react-alert";
import DateTime from "react-datetime";
import CheckBox from "../components/checkBox";
import TextField from "../components/TextField";
import ImageField from "../components/ImageField";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

class AddHotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHotel: {},
      auth: null,
      token: "",
      name: "",
      email: "",
      role: "",
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
      number_of_rooms: "",
      housekeeping_frequency: "",
      security: "",
      bathroom: "",
      front_desk: "",
      on_site_staff: "",
      rooms: [],
      hotelFeatures: [],
      selectedHotelFeatures: [],
      original_price: "",
      discount_rate: "",
      selling_price: "",
      loader: false,
      photoDisplayOne: null,
      photoDisplayTwo: null,
      photoDisplayThree: null,
      photoDisplayFour: null,
      photoDisplayFive: null,
      photoDisplaySix: null,
      photoDisplaySeven: null,
      photoDisplayEight: null,
      agreed: "",
    };
  }

  async componentDidMount() {
    window.scrollTo({
      top: 0,
    });
    let current = this.props.currentHotel;
    this.props.isEdit &&
      this.setState({
        currentHotel: current,
        name: current.name,
        bio: current.bio,
        location: current.location,
        address: current.address,
        features: current.features,
        hotel_type: current.hotel_type,
        number_of_rooms: current.rooms && current.rooms.length,
        contact_phone: current.contact_phone && current.contact_phone,
        contact_website: current.contact_website && current.contact_website,
        contact_email: current.contact_email && current.contact_email,
        check_in_time: current.check_in_time,
        check_out_time: new Date(
          Moment(current.check_out_time).format("h:mm A")
        ).toTimeString(),
        featured: current.featured,
        images: (current.images && current.images) || [],
        photoDisplayOne:
          current.images && current.images[0] && current.images[0].url,
        photoDisplayTwo:
          current.images && current.images[1] && current.images[1].url,
        photoDisplayThree:
          current.images && current.images[2] && current.images[2].url,
        photoDisplayFour:
          current.images && current.images[3] && current.images[3].url,
        photoDisplayFive:
          current.images && current.images[4] && current.images[4].url,
        photoDisplaySix:
          current.images && current.images[5] && current.images[5].url,
        photoDisplaySeven:
          current.images && current.images[6] && current.images[6].url,
        photoDisplayEight:
          current.images && current.images[7] && current.images[7].url,
      });

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

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };
  fileSelecthandler = async (e, display) => {
    let current = e.target.name;
    let photos = [...this.state.images];
    let urls = URL.createObjectURL(e.target.files[0]);
    let currFile = e.target.files[0];

    if (!current) {
      photos.push({ file: currFile, url: urls });
      this.setState({
        images: photos,
        [display]: urls,
      });
    } else if (current) {
      const curr = await photos.find((x) => x.url === current);

      if (photos.includes(curr)) {
        photos = photos.filter((img) => img !== curr);
        photos.push({ file: currFile, url: urls });
        this.setState({
          images: photos,
          [display]: urls,
        });
      }
    }
  };

  uploadFileSelecthandler = async (e, display) => {
    let current = e.target.name;
    let photos = [...this.state.upload_images];
    let prevPhotos = [...this.state.images];
    let urls = URL.createObjectURL(e.target.files[0]);
    let currFile = e.target.files[0];

    if (!current) {
      photos.push({ file: currFile, url: urls });
      this.setState({
        upload_images: photos,
        [display]: urls,
      });
    } else if (current) {
      const curr = await prevPhotos.find((x) => x.url === current);
      const uploadCurr = await photos.find((x) => x.url === current);

      if (prevPhotos.includes(curr)) {
        prevPhotos = prevPhotos.filter((img) => img !== curr);
        photos.push({ file: currFile, url: urls });
        this.setState({
          images: prevPhotos,
          upload_images: photos,
          [display]: urls,
        });
      } else if (photos.includes(uploadCurr)) {
        photos = photos.filter((img) => img !== uploadCurr);

        photos.push({ file: currFile, url: urls });
        this.setState({
          upload_images: photos,
          [display]: urls,
        });
      }
    }
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  resetForm = () => {
    this.setState({
      name: "",
      bio: "",
      location: "",
      address: "",
      features: "",
      number_of_rooms: "",
      contact_phone: "",
      contact_website: "",
      contact_email: "",
      check_in_time: "",
      check_out_time: "",
      hotel_type: "",
      featured: false,
      photoDisplayOne: null,
      photoDisplayTwo: null,
      photoDisplayThree: null,
      photoDisplayFour: null,
      photoDisplayFive: null,
      photoDisplaySix: null,
      photoDisplaySeven: null,
      photoDisplayEight: null,
    });
  };

  updateHotel = async (e) => {
    e.preventDefault();
    const {
      name,
      bio,
      location,
      address,
      features,
      contact_website,
      contact_email,
      check_in_time,
      contact_phone,
      check_out_time,
      images,
      hotel_type,
    } = this.state;
    const { alert } = this.props;
    this.setState({ loader: true });
    var formData = new FormData();
    if (this.state.upload_images.length != 0) {
      let i;
      for (i = 0; i < this.state.upload_images.length; i++) {
        formData.append("upload_images", this.state.upload_images[i].file);
      }
    }
    formData.append("images", JSON.stringify(images));
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("hotel_type", hotel_type);
    formData.append("location", location);
    formData.append("address", this.state.address.label || this.state.address);
    formData.append("contact_email", contact_email);
    formData.append("contact_website", contact_website);
    formData.append("contact_phone", contact_phone);
    formData.append("verified", true);
    formData.append("features", JSON.stringify(features));
    formData.append("check_in_time", check_in_time);
    formData.append("check_out_time", check_out_time);
    formData.append("featured", this.state.featured);

    let token = await Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
    };
    axios
      .post(
        API_URL + "update-hotels/" + this.props.currentHotel.id.toString(),
        formData,
        config
      )
      .then((response) => {
        this.setState({ loader: false });
        alert.show(<div>Hotel Updated</div>, {
          type: "success",
        });
      })
      .catch((error) => {
        this.setState({ loader: false });

        console.log(error);
        if (error && error.response && error.response.data) {
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
        } else {
          alert.show(
            <div>Error encountered! Fill out all required fields</div>,
            {
              type: "error",
            }
          );
        }
      });
  };
  createHotel = async (e) => {
    e.preventDefault();
    const {
      name,
      bio,
      location,
      address,
      features,
      contact_website,
      contact_email,
      check_in_time,
      contact_phone,
      check_out_time,
      hotel_type,
    } = this.state;
    const { alert } = this.props;
    this.setState({ loader: true });
    var formData = new FormData();

    let i;
    for (i = 0; i < this.state.images.length; i++) {
      formData.append("images", this.state.images[i].file);
    }
    formData.append("hotel_type", hotel_type);
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("location", location);
    formData.append("address", address.label);
    formData.append("contact_email", contact_email);
    formData.append("contact_website", contact_website);
    formData.append("contact_phone", contact_phone);
    formData.append("verified", true);
    formData.append("features", JSON.stringify(features));
    formData.append("check_in_time", check_in_time);
    formData.append("check_out_time", check_out_time);
    formData.append("featured", this.state.featured);

    let token = await Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "hotel", formData, config)
      .then((response) => {
        this.setState({ loader: false });
        alert.show(<div>Hotel Added</div>, {
          type: "success",
        });
        this.resetForm();
      })
      .catch((error) => {
        this.setState({ loader: false });

        console.log(error);
        if (error && error.response && error.response.data) {
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
        } else {
          alert.show(
            <div>Error encountered! Fill out all required fields</div>,
            {
              type: "error",
            }
          );
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
      contact_phone,
      contact_website,
      contact_email,
      check_in_time,
      check_out_time,
      hotelFeatures,
      number_of_rooms,
      loader,
      featured,
    } = this.state;
    const setAddress = (address) => this.setState({ address });
    const { isEdit, title, backClick } = this.props;
    const backButonStyle = {
      position: "absolute",
      right: "-20px",
      top: "-20px",
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      backgroundColor: "#CC08E9",
    };
    return (
      <div>
        <div id="page">
          {/* start cssload-loader */}

          {/* ================================
    START BREADCRUMB AREA
================================= */}

          {/* ================================
    END BREADCRUMB AREA
================================= */}
          {/* ================================
    START FORM AREA
================================= */}
          <form
            className="listing-form"
            onSubmit={(e) => {
              isEdit ? this.updateHotel(e) : this.createHotel(e);
            }}
          >
            <div className="container">
              <div className="row">
                <div
                  className="form-box col-lg-11 mx-auto"
                  style={{ position: "relative" }}
                >
                  <button
                    //  className="theme-btn theme-btn-small"
                    type="button"
                    onClick={backClick}
                    style={backButonStyle}
                  >
                    <i className="la la-times mr-1 back_btn_icon" />
                  </button>
                  <div className="col-lg-12 mx-auto">
                    <div className="listing-header py-4 form-title-wrap">
                      <h3 className="title font-size-28 pb-2">
                        {isEdit ? title : "Add Hotel"}
                      </h3>
                    </div>

                    {/* end form-box */}
                    <div className="form-box">
                      <div className="form-title-wrap">
                        <h3 className="title">
                          <i className="la la-gear mr-2 text-gray" />
                          Listing information for this hotel
                        </h3>
                      </div>
                      {/* form-title-wrap */}
                      <div className="form-content contact-form-action">
                        <div method="post" className="row">
                          <div className="col-lg-6 responsive-column">
                            <div className="input-box">
                              <label className="label-text">
                                Official hotel name
                              </label>
                              <div className="form-group">
                                <span className="la la-briefcase form-icon" />
                                <input
                                  required
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
                                  required
                                  value={location}
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
                              <label className="label-text">
                                Street address
                              </label>
                              <div className="form-group">
                                <span className="la la-map form-icon" />
                                <GooglePlacesAutocomplete
                                  apiKey="AIzaSyCabaQ0gls7rfTgLU2gW8vDBxlrTNZ1CW4"
                                  autocompletionRequest={{
                                    bounds: [
                                      { lat: 50, lng: 50 },
                                      { lat: 100, lng: 100 },
                                    ],
                                    componentRestrictions: {
                                      country: ["ng"],
                                    },
                                  }}
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
                                    placeholder: address,
                                    componentRestrictions: {
                                      country: "ng",
                                    },
                                  }}
                                />
                                {/* <input className="form-control" type="text" name="text" placeholder="Enter building number and street name" /> */}
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 responsive-column">
                            <div className="input-box">
                              <label className="label-text">
                                Hotel website
                              </label>
                              <div className="form-group">
                                <span className="la la-briefcase form-icon" />
                                <input
                                  required
                                  className="form-control"
                                  type="text"
                                  name="text"
                                  placeholder="Hotel website"
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

                          <div className="col-lg-6 responsive-column">
                            <div className="input-box">
                              <label className="label-text">
                                Number of rooms
                              </label>
                              <div className="form-group">
                                <span className="la la-figure form-icon" />
                                <input
                                  required
                                  className="form-control"
                                  type="number"
                                  name="text"
                                  placeholder="Number of rooms"
                                  value={number_of_rooms}
                                  onChange={(e) =>
                                    this.setState({
                                      number_of_rooms: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 responsive-column">
                            <div className="input-box">
                              <label className="label-text">Hotel email</label>
                              <div className="form-group">
                                <span className="la la-briefcase form-icon" />
                                <input
                                  required
                                  className="form-control"
                                  type="text"
                                  name="text"
                                  placeholder="Hotel email"
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
                          <div className="col-lg-6 responsive-column">
                            <div className="input-box">
                              <label className="label-text">Hotel phone</label>
                              <div className="form-group">
                                <span className="la la-briefcase form-icon" />
                                <input
                                  required
                                  className="form-control"
                                  type="text"
                                  name="text"
                                  placeholder="Hotel email"
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
                                  required
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
                              <label className="label-text">
                                Check in time
                              </label>
                              <div className="form-group">
                                <DateTime
                                  required
                                  dateFormat={false}
                                  value={check_in_time}
                                  onChange={(event) =>
                                    this.setState({ check_in_time: event })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="input-box">
                              <label className="label-text">
                                Check out time
                              </label>
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

                          {/* stars */}

                          <div className="col-lg-6">
                            <div className="input-box">
                              <label className="label-text">
                                Hotel Type(1 star,2 star,etc)
                              </label>
                              <div className="form-group select-contain w-100">
                                <select
                                  className="select-contain-select"
                                  value={this.state.hotel_type}
                                  onChange={(event) => {
                                    this.setState({
                                      hotel_type: event.target.value,
                                    });
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
                          {/* stars */}
                        </div>
                      </div>
                      {/* end form-content */}
                    </div>
                    {/* end form-box */}

                    {/* 

                    <div className="form-box">
                      <div className="form-title-wrap">
                        <h3 className="title">
                          <i className="la la-building-o mr-2 text-gray" />
                          Information about your accommodation
                        </h3>
                      </div>
                      {/* form-title-wrap 
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
                          {/* end col-lg-12 

                         
                          {/* end col-lg-6 
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
                                    checked={
                                      minimum_stay === "3 nights or less"
                                    }
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
                          {/* end col-lg-6 
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
                                  <input
                                    type="radio"
                                    id="radio-3"
                                    name="radio"
                                    value={"On site"}
                                    checked={
                                      this.state.security === "On site"
                                    }
                                    onChange={(e) =>
                                      this.setState({
                                        security: "On site",
                                      })
                                    }
                                  />
                                  <span className="checkmark" />
                                  <span>On site</span>
                                </label>
                                <label
                                  htmlFor="radio-4"
                                  className="radio-trigger mb-0 font-size-14"
                                >
                                  <input
                                    type="radio"
                                    id="radio-4"
                                    name="radio"
                                    value={"None"}
                                    checked={
                                     this.state.security === "None"
                                    }
                                    onChange={(e) =>
                                      this.setState({
                                        security: "None",
                                      })
                                    }
                                  />
                                  <span className="checkmark" />
                                  <span>None</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* end col-lg-6 
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
                          {/* end col-lg-6 
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
                                  <input
                                    type="radio"
                                    id="radio-7"
                                    name="radio"
                                  />
                                  <span className="checkmark" />
                                  <span>Included in room rate</span>
                                </label>
                                <label
                                  htmlFor="radio-8"
                                  className="radio-trigger mb-0 font-size-14"
                                >
                                  <input
                                    type="radio"
                                    id="radio-8"
                                    name="radio"
                                  />
                                  <span className="checkmark" />
                                  <span>Additional Fee</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* end col-lg-6 *
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
                                    checked={
                                      housekeeping_frequency === "Weekly"
                                    }
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
                          {/* end col-lg-6 *
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
                          {/* end col-lg-6 *
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
                                      this.setState({
                                        bathroom: "All en suite",
                                      })
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
                                      this.setState({
                                        bathroom: "Some en suite",
                                      })
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
                      {/* end form-content 
                    </div> *
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
                        <div className="row">
                          <div className="col-lg-6">
                            {hotelFeatures.map((el, index) => {
                              if (
                                index <= Math.floor(hotelFeatures.length / 2)
                              ) {
                                return (
                                  <CheckBox
                                    key={index + "box"}
                                    id={el.name.toLowerCase()}
                                    forID={el.name.toLowerCase()}
                                    checked={
                                      (features.includes(el.name) && true) ||
                                      false
                                    }
                                    label={el.name}
                                    onChange={(e) => {
                                      let test_array = [...features, el.name];
                                      if (features.includes(el.name)) {
                                        test_array = test_array.filter(
                                          (item) => item !== el.name
                                        );
                                      }
                                      this.setState({ features: test_array });
                                    }}
                                  />
                                );
                              }
                            })}
                          </div>
                          <div className="col-lg-6">
                            {hotelFeatures.map((el, index) => {
                              if (
                                index > Math.floor(hotelFeatures.length / 2)
                              ) {
                                return (
                                  <CheckBox
                                    key={index + "box"}
                                    id={el.name.toLowerCase()}
                                    forID={el.name.toLowerCase()}
                                    checked={
                                      (features.includes(el.name) && true) ||
                                      false
                                    }
                                    label={el.name}
                                    onChange={(e) => {
                                      console.log("checkno");
                                      let test_array = [...features, el.name];
                                      if (features.includes(el.name)) {
                                        test_array = test_array.filter(
                                          (item) => item !== el.name
                                        );
                                      }
                                      this.setState({ features: test_array });
                                    }}
                                  />
                                );
                              }
                            })}
                          </div>
                        </div>
                      </div>
                      {/* end form-content */}
                    </div>

                    {/* end form-box */}
                    <div className="form-box">
                      <div className="form-title-wrap">
                        <h3 className="title">
                          <i className="la la-photo mr-2 text-gray" />
                          Upload hotel Image
                        </h3>
                      </div>
                      {/* form-title-wrap */}
                      <div className="form-content contact-form-action">
                        <div className="row">
                          <ImageField
                            onChange={(e) => {
                              isEdit
                                ? this.uploadFileSelecthandler(
                                    e,
                                    "photoDisplayOne"
                                  )
                                : this.fileSelecthandler(e, "photoDisplayOne");
                            }}
                            src={this.state.photoDisplayOne}
                            fileName={this.state.photoDisplayOne}
                          />
                          <ImageField
                            onChange={(e) => {
                              isEdit
                                ? this.uploadFileSelecthandler(
                                    e,
                                    "photoDisplayTwo"
                                  )
                                : this.fileSelecthandler(e, "photoDisplayTwo");
                            }}
                            src={this.state.photoDisplayTwo}
                            fileName={this.state.photoDisplayTwo}
                          />
                          <ImageField
                            onChange={(e) => {
                              isEdit
                                ? this.uploadFileSelecthandler(
                                    e,
                                    "photoDisplayThree"
                                  )
                                : this.fileSelecthandler(
                                    e,
                                    "photoDisplayThree"
                                  );
                            }}
                            src={this.state.photoDisplayThree}
                            fileName={this.state.photoDisplayThree}
                          />
                          <ImageField
                            onChange={(e) => {
                              isEdit
                                ? this.uploadFileSelecthandler(
                                    e,
                                    "photoDisplayFour"
                                  )
                                : this.fileSelecthandler(e, "photoDisplayFour");
                            }}
                            src={this.state.photoDisplayFour}
                            fileName={this.state.photoDisplayFour}
                          />
                          <ImageField
                            onChange={(e) => {
                              isEdit
                                ? this.uploadFileSelecthandler(
                                    e,
                                    "photoDisplayFive"
                                  )
                                : this.fileSelecthandler(e, "photoDisplayFive");
                            }}
                            src={this.state.photoDisplayFive}
                            fileName={this.state.photoDisplayFive}
                          />
                          <ImageField
                            onChange={(e) => {
                              isEdit
                                ? this.uploadFileSelecthandler(
                                    e,
                                    "photoDisplaySix"
                                  )
                                : this.fileSelecthandler(e, "photoDisplaySix");
                            }}
                            src={this.state.photoDisplaySix}
                            fileName={this.state.photoDisplaySix}
                          />
                          <ImageField
                            onChange={(e) => {
                              isEdit
                                ? this.uploadFileSelecthandler(
                                    e,
                                    "photoDisplaySeven"
                                  )
                                : this.fileSelecthandler(
                                    e,
                                    "photoDisplaySeven"
                                  );
                            }}
                            src={this.state.photoDisplaySeven}
                            fileName={this.state.photoDisplaySeven}
                          />
                          <ImageField
                            onChange={(e) => {
                              isEdit
                                ? this.uploadFileSelecthandler(
                                    e,
                                    "photoDisplayEight"
                                  )
                                : this.fileSelecthandler(
                                    e,
                                    "photoDisplayEight"
                                  );
                            }}
                            src={this.state.photoDisplayEight}
                            fileName={this.state.photoDisplayEight}
                          />
                        </div>
                      </div>
                      {/* end form-content */}
                    </div>
                    {/* end form-box */}
                    <div className="submit-box">
                      {!isEdit && (
                        <h3 className="title pb-3">Submit this listing</h3>
                      )}
                      {!isEdit && (
                        <CheckBox
                          labelClass="long_cb_label"
                          id={"agreeChb"}
                          forID={"agreeChb"}
                          checked={
                            (this.state.agreed.includes("agreed") && true) ||
                            false
                          }
                          label="Check this box to certify that you are an official
                          representative of the property for which you are
                          submitting this listing and that the information you
                          have submitted is correct. In submitting a photo, you
                          also certify that you have the right to use the photo
                          on the web and agree to NOT hold Book24 accountable
                          for any and all copyright issues arising from your use
                          of the image."
                          onChange={(e) => {
                            this.setState({
                              agreed: this.state.agreed ? "" : "agreed",
                            });
                          }}
                        />
                      )}
                      <div className="col-lg-6 responsive-column">
                        <CheckBox
                          //    labelClass="long_cb_label"
                          id={"isEventfeatured"}
                          forID={"isEventfeatured"}
                          checked={(featured && true) || false}
                          label="Set as featured"
                          onChange={() => {
                            this.setState({
                              featured: !featured,
                            });
                          }}
                        />
                      </div>

                      <div className="btn-box pt-3">
                        <button
                          className="theme-btn"
                          type="submit"
                          //  onClick={this.createHotel}
                        >
                          {loader ? (
                            <WhiteLoader />
                          ) : isEdit ? (
                            "Update Listing"
                          ) : (
                            "Submit Listing"
                          )}
                          {!loader && <i className="la la-arrow-right ml-1" />}
                        </button>
                      </div>
                    </div>
                    {/* end submit-box */}
                  </div>
                  {/* end col-lg-9 */}
                </div>
                {/**end .form-box */}
              </div>
              {/* end row */}
            </div>
            {/* end container */}
            <div></div>
          </form>
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
const mapStateToProps = (state) => {
  return {
    currentHotel: state.hotels.currentHotel,
  };
};
const AddHotel_ = withRouter(AddHotel);

const AddHotel__ = withAlert()(AddHotel_);

export default connect(mapStateToProps)(AddHotel__);
