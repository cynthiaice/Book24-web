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
import Moment from "moment";
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
class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHotel: {},
      hotels: [],
      ticketType: [],
      auth: null,
      token: "",
      eventCategories: ["free", "paid"],
      name: "",
      images: [],
      upload_images: [],
      bio: "",
      location: "",
      address: "",
      contact_email: "",
      contact_website: "",
      contact_phone: "",
      event_type: "",
      start_date: "",
      end_date: "",
      selectedTicketType: [],
      featured: false,
      original_price: "",
      discount_rate: "",
      dicount_price: "",
      eventTypes: [],
      type_id: "",

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
    this.reactTags = React.createRef();
  }

  async componentDidMount() {
    window.scrollTo({
      top: 0,
    });
    let current = this.props.currentHotel;
    if (this.props.isEdit) {
      this.setState({
        currentHotel: current,
        images: (current.images && current.images) || [],
        name: current.name,

        bio: current.description,
        type_id: current.type_id,
        location: current.location,
        address: current.address,
        contact_email: current.contact_email,
        contact_website: current.contact_website,
        contact_phone: current.contact_phone,
        event_type: current.event_type,
        start_date: new Date(current.start_date),
        end_date: new Date(current.end_date),
        selectedTicketType: current.ticket_type,
        featured: current.featured,
        discount_rate: current.discount_rate,
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
    }

    await this.getTicketType();
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
  getTicketType = async () => {
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "ticketTypes", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows;
        this.setState({ ticketType: len });
        this.getEventType();
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

  getEventType = async () => {
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "eventTypes", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows;
        this.setState({ eventTypes: len });

        // this.getEventFacilities(token);
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
    const selectedTicketType = this.state.selectedTicketType.slice(0);
    selectedTicketType.splice(i, 1);
    this.setState({ selectedTicketType });
  }

  onAddition(selectedEventFeature) {
    var isPresent = false;
    for (let i = 0; i < this.state.selectedTicketType.length; i++) {
      if (this.state.selectedTicketType[i].name == selectedEventFeature.name) {
        isPresent = true;
        break;
      }
    }
    if (!isPresent) {
      const selectedTicketType = [].concat(
        this.state.selectedTicketType,
        selectedEventFeature
      );
      this.setState({ selectedTicketType });
    }
  }
  mainFeaturesConverter = (features) => {
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
      type_id: "",
      bio: "",
      location: "",
      address: "",
      contact_email: "",
      contact_website: "",
      contact_phone: "",
      event_type: "",
      start_date: "",
      end_date: "",
      selectedTicketType: [],
      featured: false,
      discount_rate: "",
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
    return current.isAfter(Moment().subtract(1, "day"));
  }
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
    formData.append("type_id", this.state.type_id);
    formData.append("bio", this.state.bio);
    formData.append("location", this.state.location);
    formData.append("address", this.state.address.label || this.state.address);
    formData.append("contact_email", this.state.contact_email);
    formData.append("contact_website", this.state.contact_website);
    formData.append("contact_phone", this.state.contact_phone);
    formData.append("discount_rate", this.state.discount_rate);

    this.state.event_type === "paid" &&
      formData.append(
        "ticket_type",
        JSON.stringify(this.state.selectedTicketType)
      );

    formData.append("event_type", this.state.event_type);
    formData.append("start_date", this.state.start_date);
    formData.append("end_date", this.state.end_date);
    formData.append("featured", this.state.featured);

    let token = await Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(
        API_URL + "update-events/" + this.props.currentHotel.id.toString(),
        formData,
        config
      )
      .then((response) => {
        this.setState({ loader: false });
        alert.show(<div>Event Updated</div>, {
          type: "success",
        });
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

    formData.append("bio", this.state.bio);
    formData.append("location", this.state.location);
    formData.append("address", this.state.address.label);
    formData.append("contact_email", this.state.contact_email);
    formData.append("contact_website", this.state.contact_website);
    formData.append("contact_phone", this.state.contact_phone);
    formData.append("discount_rate", this.state.discount_rate);
    formData.append("type_id", this.state.type_id);
    this.state.event_type === "paid" &&
      formData.append(
        "ticket_type",
        JSON.stringify(this.state.selectedTicketType)
      );

    formData.append("event_type", this.state.event_type);
    formData.append("start_date", this.state.start_date);
    formData.append("end_date", this.state.end_date);
    formData.append("featured", this.state.featured);

    let token = await Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "event", formData, config)
      .then((response) => {
        this.setState({ loader: false });
        alert.show(<div>Event Added</div>, {
          type: "success",
        });
        this.resetForm();
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
      loader,
      bio,
      location,
      address,
      contact_email,
      contact_website,
      contact_phone,
      event_type,
      start_date,
      end_date,
      discount_rate,
      featured,
      eventCategories,
      eventTypes,
      type_id,
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
                        {isEdit ? title : "Add Event"}
                      </h3>
                    </div>

                    {/* end form-box */}
                    <div className="form-box">
                      <div className="form-title-wrap">
                        <h3 className="title">
                          <i className="la la-gear mr-2 text-gray" />
                          Listing information for this event
                        </h3>
                      </div>
                      {/* form-title-wrap */}
                      <div className="form-content contact-form-action">
                        <div className="row">
                          <TextField
                            label="Name"
                            required
                            className="la la-briefcase form-icon"
                            type="text"
                            name="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) =>
                              this.setState({ name: e.target.value })
                            }
                          />

                          {/* end col-lg-6 */}

                          {/* end col-lg-6 */}
                          <div className="col-lg-6 responsive-column">
                            <div className="input-box">
                              <label className="label-text">
                                Choose an event type (free or paid)
                              </label>
                              <div className="form-group select-contain w-100">
                                <select
                                  required
                                  value={event_type}
                                  className="select-contain-select"
                                  onChange={(event) => {
                                    this.setState({
                                      event_type: event.target.value,
                                    });
                                  }}
                                >
                                  <option value>Select </option>
                                  {eventCategories.map((element) => (
                                    <option
                                      value={element.toLowerCase()}
                                      key={element}
                                    >
                                      {element}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* end col-lg-6 */}

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

                          {/* Select */}
                          <div className="col-lg-6 responsive-column">
                            <div className="input-box">
                              <label className="label-text">
                                Choose an event type
                              </label>
                              <div className="form-group select-contain w-100">
                                <select
                                  required
                                  value={type_id}
                                  className="select-contain-select"
                                  onChange={(event) => {
                                    this.setState({
                                      type_id: event.target.value,
                                    });
                                  }}
                                >
                                  <option value>Select a type</option>
                                  {eventTypes.map((element) => (
                                    <option value={element.id} key={element.id}>
                                      {element.name}
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
                                Description
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
                          {/* Text Field */}
                          <TextField
                            label="Event Website"
                            required
                            className="la la-fig form-icon"
                            type="text"
                            name="text"
                            placeholder="Event Website"
                            value={contact_website}
                            onChange={(e) =>
                              this.setState({ contact_website: e.target.value })
                            }
                          />

                          {/* end col-lg-6 */}

                          <TextField
                            label="Event Email"
                            required
                            className="la la-bed form-icon"
                            type="text"
                            name="text"
                            placeholder="Event Email"
                            value={contact_email}
                            onChange={(e) =>
                              this.setState({ contact_email: e.target.value })
                            }
                          />

                          {/* end col-lg-6 */}
                          {/* end col-lg-6 */}

                          <TextField
                            label="Event Mobile Number"
                            required
                            className="la la-bed form-icon"
                            type="text"
                            name="text"
                            placeholder="Event Mobile Number"
                            value={contact_phone}
                            onChange={(e) =>
                              this.setState({ contact_phone: e.target.value })
                            }
                          />

                          {/* end col-lg-6 */}

                          <div className="col-lg-6">
                            <div className="input-box">
                              <label className="label-text">
                                Start date and time
                              </label>
                              <div className="form-group">
                                <DateTime
                                  isValidDate={this.valid}
                                  value={start_date}
                                  onChange={(event) =>
                                    this.setState({
                                      start_date: Moment(event).format(
                                        "YYYY-MM-DD h:mm A"
                                      ),
                                    })
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
                                  value={end_date}
                                  onChange={(event) =>
                                    this.setState({
                                      end_date: Moment(event).format(
                                        "YYYY-MM-DD h:mm A"
                                      ),
                                    })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          {/* React tags */}
                          <div className="col-lg-12 responsive-column">
                            {event_type !== "free" && (
                              <div>
                                <ReactTags
                                  ref={this.reactTags}
                                  tags={this.state.selectedTicketType}
                                  suggestions={this.state.ticketType}
                                  delimiters={delimiters}
                                  onDelete={this.onDelete.bind(this)}
                                  onAddition={this.onAddition.bind(this)}
                                  placeholderText="Add ticket types"
                                  noSuggestionsText="No ticket type match your input"
                                  autoresize={false}
                                  minQueryLength={1}
                                />
                                <br />
                                <p>
                                  options:
                                  {this.mainFeaturesConverter(
                                    this.state.ticketType
                                  )}
                                </p>
                                {this.state.selectedTicketType.map(
                                  (element, index) => {
                                    return (
                                      <div>
                                        <p className="label-text">
                                          {element.name}'s Price:
                                        </p>
                                        <input
                                          type="number"
                                          value={
                                            this.state.selectedTicketType[index]
                                              .price
                                          }
                                          required
                                          onChange={(event) => {
                                            let test_array = this.state
                                              .selectedTicketType;
                                            test_array[index].price =
                                              event.target.value;
                                            this.setState({
                                              selectedTicketType: test_array,
                                            });
                                          }}
                                        />

                                        <p className="label-text">
                                          {element.name}'s Discount Price:
                                        </p>
                                        <input
                                          type="number"
                                          required
                                          value={Math.floor(
                                            this.state.selectedTicketType[index]
                                              .price -
                                              this.state.discount_rate *
                                                0.01 *
                                                this.state.selectedTicketType[
                                                  index
                                                ].price
                                          )}
                                          disabled
                                        />
                                        <br />
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            )}
                          </div>

                          {/* Image */}
                        </div>
                      </div>
                      {/* end form-content */}
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
                        </div>
                      </div>
                      {/* end form-content */}
                    </div>

                    {/* end form-box */}
                    <div className="form-box">
                      <div className="form-title-wrap">
                        <h3 className="title">
                          <i className="la la-photo mr-2 text-gray" />
                          Upload event Images
                        </h3>
                        <p>
                          <i className="la la-hint mr-2 text-gray" />
                          Upload at least two images
                        </p>
                      </div>
                      {/* form-title-wrap */}
                      <div className="form-content contact-form-action">
                        <div method="post" className="row">
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

const AddEvent_ = withRouter(AddEvent);

const AddEvent__ = withAlert()(AddEvent_);

export default connect(mapStateToProps)(AddEvent__);
