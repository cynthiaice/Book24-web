import Head from "next/head";
import React, { Component } from "react";
import Header from "./header";
import DetailsHeader from "./detailsHeader";
import WhiteLoader from "./whiteLoader";
import PreLoader from "./preloader";
import SignInModal from "./signInModal";
import Footer from "./footer";
import $ from "jquery";
import Cookies from "js-cookie";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import axios from "axios";
import { API_URL } from "./config.js";
import states from "./states.json";
import { withAlert } from "react-alert";
import DateTime from "react-datetime";
import CheckBox from "./checkBox";
import TextField from "./TextField";
import ImageField from "./ImageField";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import ReactTags from "react-tag-autocomplete";

const KeyCodes = {
  comma: "188",
  enter: "13",
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
class AddCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHotel: {},
      hotels: [],
      ticketType: [],
      auth: null,
      token: "",
      name: "",
      images: [],
      upload_images: [],
      bio: "",
      location: "",
      address: "",
      contact_email: "",
      contact_website: "",
      contact_phone: "",
      carColor: "",
      carCategory: "",
      carModel: "",
      carMilleage: "",
      carYear: "",
      carType: "",
      company_name: "",

      features: [],
      original_price: "",
      discount_rate: "",
      price: "",
      dicount_price: "",
      carCategories: [],
      selectedTourFeatures: [],

      loader: false,
      photoDisplayOne: null,
      photoDisplayTwo: null,
      photoDisplayThree: null,
      photoDisplayFour: null,
      photoDisplayFive: null,
      photoDisplaySix: null,
      photoDisplaySeven: null,
      photoDisplayEight: null,
      isAgreed: "",
    };
    this.reactTags = React.createRef();
  }

  async componentDidMount() {
    window.scrollTo({
      top: 0,
    });
    await this.getCarCategories();
    let current = this.props.currentHotel;
    if (this.props.isEdit) {
      this.setState({
        currentHotel: current,
        images: (current.images && JSON.parse(current.images)) || [],
        name: current.name,
        bio: current.description,
        location: current.location,
        address: current.address,
        contact_email: current.contact_email,
        contact_website: current.contact_website,
        contact_phone: current.contact_phone,
        price: current.price,
        original_price: current.original_price,
        discount_rate: current.discount_rate,
        features: current.features,
        carColor: current.carColor,
        carCategory: current.carCategory,
        carModel: current.carModel,
        carMilleage: current.carMilleage,
        carYear: current.carYear,
        carType: current.type,
        photoDisplayOne:
          JSON.parse(current.images) &&
          JSON.parse(current.images)[0] &&
          JSON.parse(current.images)[0].url,
        photoDisplayTwo:
          JSON.parse(current.images) &&
          JSON.parse(current.images)[1] &&
          JSON.parse(current.images)[1].url,
        photoDisplayThree:
          JSON.parse(current.images) &&
          JSON.parse(current.images)[2] &&
          JSON.parse(current.images)[2].url,
        photoDisplayFour:
          JSON.parse(current.images) &&
          JSON.parse(current.images)[3] &&
          JSON.parse(current.images)[3].url,
        photoDisplayFive:
          JSON.parse(current.images) &&
          JSON.parse(current.images)[4] &&
          JSON.parse(current.images)[4].url,
        photoDisplaySix:
          JSON.parse(current.images) &&
          JSON.parse(current.images)[5] &&
          JSON.parse(current.images)[5].url,
        photoDisplaySeven:
          JSON.parse(current.images) &&
          JSON.parse(current.images)[6] &&
          JSON.parse(current.images)[6].url,
        photoDisplayEight:
          JSON.parse(current.images) &&
          JSON.parse(current.images)[7] &&
          JSON.parse(current.images)[7].url,
      });
    }

    let token = await Cookies.get("token");
    if (token == null || token == "") {
      this.props.router.push("/account");
      console.log("false tojken");
      this.setState({ auth: false });
    } else {
      console.log(token);
      this.setState({ auth: true, token });
    }
  }

  getCarCategories = async () => {
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "carCategories", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows;
        this.setState({ carCategories: len });
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
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
  onDelete(i) {
    const selectedTourFeatures = this.state.selectedTourFeatures.slice(0);
    selectedTourFeatures.splice(i, 1);
    this.setState({ selectedTourFeatures });
  }

  onAddition(selectedTourFeature) {
    var isPresent = false;
    for (let i = 0; i < this.state.selectedTourFeatures.length; i++) {
      if (this.state.selectedTourFeatures[i].name == selectedTourFeature.name) {
        isPresent = true;
        break;
      }
    }
    if (!isPresent) {
      const selectedTourFeatures = [].concat(
        this.state.selectedTourFeatures,
        selectedTourFeature
      );
      this.setState({ selectedTourFeatures });
    }
  }
  featuresConverter = (features) => {
    let text = "";
    if (features != null) {
      for (let i = 0; i < features.length; i++) {
        if (i == features.length - 1) {
          text += features[i].name + ".";
        } else {
          text += features[i].name + ", ";
        }
      }
    }

    return text;
  };

  resetForm = () => {
    this.setState({
      name: "",
      images: [],
      upload_images: [],
      bio: "",
      location: "",
      address: "",
      contact_email: "",
      contact_website: "",
      contact_phone: "",

      price: "",
      discount_rate: "",
      original_price: "",
      carType: "",
      carColor: "",
      carCategory: "",
      carModel: "",
      carMilleage: "",
      carYear: "",
      features: [],

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
  valid(current) {
    return current.isAfter(moment().subtract(1, "day"));
  }
  createHotel = async (e) => {
    e.preventDefault();

    const { alert } = this.props;
    this.setState({ loader: true });
    var formData = new FormData();

    let i;
    for (i = 0; i < this.state.images.length; i++) {
      formData.append("images", this.state.images[i].file);
    }

    formData.append("name", this.state.name);
    formData.append("description", this.state.bio);
    formData.append("location", this.state.location);
    formData.append("address", this.state.address.label);
    formData.append("contact_email", this.state.contact_email);
    formData.append("contact_website", this.state.contact_website);
    formData.append("contact_phone", this.state.contact_phone);
    formData.append("features", JSON.stringify(this.state.features));
    formData.append("price", this.state.price);
    formData.append("original_price", this.state.original_price);
    formData.append("discount_rate", this.state.discount_rate);

    formData.append("carColor", this.state.carColor);
    formData.append("carCategory", this.state.carCategory);
    formData.append("carModel", this.state.carModel);
    formData.append("carMilleage", this.state.carMilleage);
    formData.append("carYear", this.state.carYear);
    formData.append("type", this.state.carType);
    let token = await Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "car", formData, config)
      .then((response) => {
        this.setState({ loader: false });
        alert.show(<div>Car Added</div>, {
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
        }
      });
  };
  updateHotel = async (e) => {
    e.preventDefault();

    const { alert } = this.props;
    this.setState({ loader: true });
    var formData = new FormData();

    if (this.state.upload_images.length != 0) {
      let i;
      for (i = 0; i < this.state.upload_images.length; i++) {
        formData.append("upload_images", this.state.upload_images[i].file);
      }
    }
    formData.append("images", JSON.stringify(this.state.images));
    formData.append("name", this.state.name);
    formData.append("description", this.state.bio);
    formData.append("location", this.state.location);
    formData.append("address", this.state.address.label || this.state.address);
    formData.append("contact_email", this.state.contact_email);
    formData.append("contact_website", this.state.contact_website);
    formData.append("contact_phone", this.state.contact_phone);
    formData.append("features", JSON.stringify(this.state.features));
    formData.append("price", this.state.price);
    formData.append("original_price", this.state.original_price);
    formData.append("discount_rate", this.state.discount_rate);

    formData.append("carColor", this.state.carColor);
    formData.append("carCategory", this.state.carCategory);
    formData.append("carModel", this.state.carModel);
    formData.append("carMilleage", this.state.carMilleage);
    formData.append("carYear", this.state.carYear);
    formData.append("type", this.state.carType);

    let token = await Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(
        API_URL + "update-cars/" + this.props.currentHotel.id.toString(),
        formData,
        config
      )
      .then((response) => {
        this.setState({ loader: false });
        alert.show(<div>Car Updated</div>, {
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
        }
      });
  };

  render() {
    const {
      name,
      loader,
      bio,
      location,
      address,
      contact_email,
      contact_website,
      contact_phone,
      original_price,
      discount_rate,
      price,
      company_name,
      isAgreed,
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
                    onClick={backClick}
                    style={backButonStyle}
                  >
                    <i className="la la-times mr-1 back_btn_icon" />
                  </button>
                  <div className="col-lg-12 mx-auto">
                    <div className="listing-header py-4 form-title-wrap">
                      <h3 className="title font-size-28 pb-2">
                        {isEdit ? title : "Add Car"}
                      </h3>
                    </div>

                    {/* end form-box */}
                    <div className="form-box">
                      <div className="form-title-wrap">
                        <h3 className="title">
                          <i className="la la-gear mr-2 text-gray" />
                          Listing information for your car
                        </h3>
                      </div>
                      {/* form-title-wrap */}
                      <div className="form-content contact-form-action">
                        <div className="row">
                          <TextField
                            label="Car name"
                            required
                            className="la la-briefcase form-icon"
                            type="text"
                            name="text"
                            placeholder="Enter car name"
                            value={name}
                            onChange={(e) =>
                              this.setState({ name: e.target.value })
                            }
                          />

                          {/* end col-lg-6 */}

                          {/* end col-lg-6 */}
                          <div className="col-lg-6 responsive-column">
                            <div className="input-box">
                              <label className="label-text">Car Category</label>
                              <div className="form-group select-contain w-100">
                                <select
                                  required
                                  value={this.state.carCategory}
                                  className="select-contain-select"
                                  onChange={(event) => {
                                    this.setState({
                                      carCategory: event.target.value,
                                    });
                                  }}
                                >
                                  <option value>Select a category </option>
                                  {this.state.carCategories.map((element) => (
                                    <option value={element.id} key={element.id}>
                                      {element.name}
                                    </option>
                                  ))}
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
                                  required
                                  value={location}
                                  className="select-contain-select"
                                  onChange={(event) => {
                                    this.setState({
                                      location: event.target.value,
                                    });
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

                          {/* Address */}

                          <div className="col-lg-12 responsive-column">
                            <div className="input-box">
                              <label className="label-text">Address</label>
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
                          {/* Address */}

                          {/* Text field */}
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
                                  required
                                  className="message-control form-control"
                                  name="message"
                                  placeholder="Enter car description "
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

                          {/* Image */}
                        </div>
                      </div>
                      {/* end form-content */}
                    </div>

                    {/* Ship stats */}
                    <div className="form-box">
                      <div className="form-title-wrap">
                        <h3 className="title">
                          <i className="la la-car mr-2 text-gray" />
                          Car Amenities
                        </h3>
                      </div>
                      {/* form-title-wrap */}
                      <div className="form-content contact-form-action">
                        <div className="row">
                          {/* col-6 start */}
                          <TextField
                            label="Car Year"
                            required
                            className="la la-money-bill form-icon"
                            type="text"
                            name="text"
                            placeholder="Enter car year"
                            value={this.state.carYear}
                            onChange={(e) =>
                              this.setState({ carYear: e.target.value })
                            }
                          />
                          {/* col-6 end */}

                          {/* col-6 start */}
                          <TextField
                            label="Car Mileage"
                            required
                            className="la la-money-bill form-icon"
                            type="text"
                            name="text"
                            placeholder="Enter car mileage"
                            value={this.state.carMilleage}
                            onChange={(e) =>
                              this.setState({ carMilleage: e.target.value })
                            }
                          />
                          {/* col-6 end */}
                          {/* col-6 start */}
                          <TextField
                            label="Car Model"
                            required
                            className="la la-money-bill form-icon"
                            type="text"
                            name="text"
                            placeholder="Enter  car model"
                            value={this.state.carModel}
                            onChange={(e) =>
                              this.setState({ carModel: e.target.value })
                            }
                          />
                          {/* col-6 end */}

                          {/* col-6 start */}
                          <TextField
                            label="Car color"
                            required
                            className="la la-money-bill form-icon"
                            type="text"
                            name="text"
                            placeholder="Enter car color"
                            value={this.state.carColor}
                            onChange={(e) =>
                              this.setState({ carColor: e.target.value })
                            }
                          />
                          {/* col-6 end */}

                          {/* col-6 start */}
                          <TextField
                            label="Car type"
                            required
                            className="la la-money-bill form-icon"
                            type="text"
                            name="text"
                            placeholder="Enter car type"
                            value={this.state.carType}
                            onChange={(e) =>
                              this.setState({ carType: e.target.value })
                            }
                          />
                          {/* col-6 end */}
                        </div>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="form-box">
                      <div className="form-title-wrap">
                        <h3 className="title">
                          <i className="la la-user mr-2 text-gray" />
                          Contact Details
                        </h3>
                      </div>
                      {/* form-title-wrap */}
                      <div className="form-content contact-form-action">
                        <div className="row">
                          {/* end col-lg-6 */}

                          <TextField
                            label="Phone"
                            required
                            className="la la-phone form-icon"
                            type="text"
                            name="text"
                            placeholder="Phone"
                            value={contact_phone}
                            onChange={(e) =>
                              this.setState({ contact_phone: e.target.value })
                            }
                          />

                          {/* end col-lg-6 */}
                          <TextField
                            label="Email"
                            required
                            className="la a-envelope-o form-icon"
                            type="text"
                            name="text"
                            placeholder="email"
                            value={contact_email}
                            onChange={(e) =>
                              this.setState({ contact_email: e.target.value })
                            }
                          />

                          {/* end col-lg-6 */}
                          {/* Text Field */}

                          <TextField
                            label="Website"
                            className="la la-globe form-icon"
                            type="text"
                            name="text"
                            placeholder="Website"
                            value={contact_website}
                            onChange={(e) =>
                              this.setState({ contact_website: e.target.value })
                            }
                          />

                          {/* end col-lg-6 */}
                          {/* end col-lg-6 */}
                          {/* Text Field */}

                          <TextField
                            label="Rental company name"
                            className="la la-globe form-icon"
                            type="text"
                            name="text"
                            placeholder="Rental company name"
                            value={company_name}
                            onChange={(e) =>
                              this.setState({ company_name: e.target.value })
                            }
                          />

                          {/* end col-lg-6 */}
                        </div>
                      </div>
                    </div>

                    {/* form start */}
                    <div className="form-box">
                      <div className="form-title-wrap">
                        <h3 className="title">
                          <i className="la la-wallet mr-2 text-gray" />
                          Discount
                        </h3>
                      </div>
                      {/* form-title-wrap */}
                      <div className="form-content contact-form-action">
                        <div className="row">
                          <TextField
                            label="Original price"
                            required
                            className="la la-briefcase form-icon"
                            type="number"
                            name="text"
                            placeholder="Enter original price"
                            value={original_price}
                            onChange={(e) =>
                              this.setState({ original_price: e.target.value })
                            }
                          />
                          <TextField
                            label="Selling price"
                            required
                            className="la la-briefcase form-icon"
                            type="number"
                            name="text"
                            placeholder="Enter selling price"
                            value={price}
                            onChange={(e) => {
                              this.setState({ price: e.target.value });
                            }}
                          />
                          <TextField
                            label="Discount rate eg (10)"
                            required
                            className="la la-briefcase form-icon"
                            type="number"
                            name="text"
                            placeholder="Enter discount rate"
                            value={discount_rate}
                            onChange={(e) => {
                              if (e.target.value > 100) {
                                return;
                              } else {
                                this.setState({
                                  discount_rate: e.target.value,
                                });
                              }
                            }}
                            max="100"
                          />
                          <TextField
                            disabled
                            label="Discount price"
                            required
                            className="la la-briefcase form-icon"
                            type="number"
                            name="text"
                            placeholder=""
                            value={Math.floor(
                              this.state.price -
                                this.state.discount_rate *
                                  0.01 *
                                  this.state.price
                            )}
                            // onChange={(e) =>
                            //   this.setState({ discount_rate: e.target.value })
                            // }
                          />
                        </div>
                      </div>
                      {/* end form-content */}
                    </div>

                    {/* end form-box */}
                    <div className="form-box">
                      <div className="form-title-wrap">
                        <h3 className="title">
                          <i className="la la-photo mr-2 text-gray" />
                          Upload Images to represent this listing
                        </h3>
                        <p>
                          <i className="la la-hint mr-2 text-gray" />
                          Upload at least two images
                        </p>
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
                          {/* end col-lg-12 */}
                        </div>
                      </div>
                      {/* end form-content */}
                      {!isEdit && (
                        <div className="col-lg-12 mb-5">
                          <CheckBox
                            id={"isAgreedCb"}
                            forID={"isAgreedCb"}
                            checked={(isAgreed && true) || false}
                            label="Check this box to certify that you are an official
                        representative of the property for which you are
                        submitting this listing and that the information you
                        have submitted is correct. In submitting a photo, you
                        also certify that you have the right to use the photo on
                        the web and agree to NOT hold Book24 accountable for any
                        and all copyright issues arising from your use of the
                        image."
                            onChange={() => {
                              this.setState({
                                isAgreed: !isAgreed,
                              });
                            }}
                          />
                        </div>
                      )}
                    </div>
                    {/* end form-box */}
                    <div className="submit-box">
                      <div className="btn-box pt-3">
                        <button className="theme-btn" type="submit">
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

const AddCar_ = withRouter(AddCar);

const AddCar__ = withAlert()(AddCar_);

export default connect(mapStateToProps)(AddCar__);
