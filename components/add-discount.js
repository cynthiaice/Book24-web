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

class AddDiscount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHotel: {},
      auth: null,
      token: "",
      name: "",
      price: "",
      bio: "",
      discount_type: "",
      discount_type_check: "",
      days: [],
      discount_type_options: ["Hotel", "Tour"],
      loader: false,
      agreed: "",
    };
  }

  async componentDidMount() {
    window.scrollTo({
      top: 0,
    });
    let current = this.props.currentHotel;
    if (this.props.isEdit) {
      this.setState({
        currentHotel: current,
        images: current.images,
        name: current.name,
        bio: current.description,
        price: current.price,
        capacity: current.capacity,
        is_wifi: current.is_wifi,
        is_shower: current.is_shower,
        size: current.size,
        no_of_beds: current.no_of_beds,
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
  fileSelecthandler = (e, display) => {
    let photos = [...this.state.images];
    photos.push(e.target.files[0]);

    this.setState({
      images: photos,
      [display]: URL.createObjectURL(e.target.files[0]),
    });
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
  updateHotel = async (e) => {
    e.preventDefault();
  };
  createHotel = async (e) => {
    e.preventDefault();
    console.log("Creareds");

    const { alert } = this.props;
    this.setState({ loader: true });
    var formData = new FormData();
  
    formData.append("name", this.state.name);

    formData.append("price", this.state.price);

    // formData.append("hotel_type", "hotel_type");
    // formData.append("extra_people_charge", "extra_people_charge");
    // formData.append("minimum_stay", "minimum_stay");
    // formData.append("housekeeping_frequency", "housekeeping_frequency");
    // formData.append("bathroom", "bathroom");
    // formData.append("front_desk", "front_desk");
    // formData.append("on_site_staff", "on_site_staff");

    let token = await Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "room", formData, config)
      .then((response) => {
        this.setState({ loader: false });
        console.log(response);
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

      hotel,
      price,
      bio,
      discount_type_check,
      loader,
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
                        {isEdit ? title : "Add Discount"}
                      </h3>
                    </div>

                    {/* end form-box */}
                    <div className="form-box">
                      <div className="form-title-wrap">
                        <h3 className="title">
                          <i className="la la-gear mr-2 text-gray" />
                          Listing information for this discount
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

                          <TextField
                            label="Price"
                            required
                            className="la la-cash form-icon"
                            type="text"
                            name="text"
                            placeholder="Price"
                            value={price}
                            onChange={(e) =>
                              this.setState({ price: e.target.value })
                            }
                          />

                          <div className="col-lg-6 responsive-column">
                            <div className="input-box">
                              <label className="label-text">
                                Choose a Discount Type
                              </label>
                              <div className="form-group select-contain w-100">
                                <select
                                  required
                                  value={hotel}
                                  className="select-contain-select"
                                  onChange={(event) => {
                                    this.setState({
                                      discount_type: event.target.value,
                                    });
                                  }}
                                >
                                  <option value>Select </option>
                                  {this.state.discount_type_options.map(
                                    (element) => (
                                      <option value={element} key={element}>
                                        {element}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                            </div>
                          </div>

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
                                  placeholder="Enter tour description "
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
                          {/* Check boxes */}
                          <label className="label-text">Discount type</label>
                          <br />
                          <div className="col-lg-6 responsive-column">
                            <CheckBox
                              //    labelClass="long_cb_label"
                              id={"once_discount"}
                              forID={"once_discount"}
                              checked={
                                (discount_type_check.includes("is_once") &&
                                  true) ||
                                false
                              }
                              label="Once"
                              onChange={() => {
                                this.setState({
                                  discount_type_check: "is_once",
                                });
                              }}
                            />
                          </div>
                          <div className="col-lg-6 responsive-column">
                            <CheckBox
                              //    labelClass="long_cb_label"
                              id={"continous_discount"}
                              forID={"continous_discount"}
                              checked={
                                (discount_type_check.includes("is_continous") &&
                                  true) ||
                                false
                              }
                              label="Continous"
                              onChange={() => {
                                this.setState({
                                  discount_type_check: "is_continous",
                                });
                              }}
                            />
                          </div>

                          {/* Days checkbox */}
                          <div className="col-lg-4 col-md-6 responsive-column">
                            <CheckBox
                              //    labelClass="long_cb_label"
                              id={"once_discount"}
                              forID={"once_discount"}
                              //   checked={
                              //     (discount_type_check.includes("is_once") &&
                              //       true) ||
                              //     false
                              //   }
                              label="Monday"
                              onChange={() => {
                                this.setState({
                                  discount_type_check: "",
                                });
                              }}
                            />
                          </div>
                          {/* tues */}
                          <div className="col-lg-4 col-md-6 responsive-column">
                            <CheckBox
                              //    labelClass="long_cb_label"
                              id={"once_discount"}
                              forID={"once_discount"}
                              //   checked={
                              //     (discount_type_check.includes("is_once") &&
                              //       true) ||
                              //     false
                              //   }
                              label="Tuesday"
                              onChange={() => {
                                this.setState({
                                  discount_type_check: "",
                                });
                              }}
                            />
                          </div>
                          {/* wed */}
                          <div className="col-lg-4 col-md-6 responsive-column">
                            <CheckBox
                              //    labelClass="long_cb_label"
                              id={"once_discount"}
                              forID={"once_discount"}
                              //   checked={
                              //     (discount_type_check.includes("is_once") &&
                              //       true) ||
                              //     false
                              //   }
                              label="Wednesday"
                              onChange={() => {
                                this.setState({
                                  discount_type_check: "",
                                });
                              }}
                            />
                          </div>
                          {/* thurs */}
                          <div className="col-lg-4 col-md-6 responsive-column">
                            <CheckBox
                              //    labelClass="long_cb_label"
                              id={"once_discount"}
                              forID={"once_discount"}
                              //   checked={
                              //     (discount_type_check.includes("is_once") &&
                              //       true) ||
                              //     false
                              //   }
                              label="Thursday"
                              onChange={() => {
                                this.setState({
                                  discount_type_check: "",
                                });
                              }}
                            />
                          </div>
                          {/* fri */}
                          <div className="col-lg-4 col-md-6 responsive-column">
                            <CheckBox
                              //    labelClass="long_cb_label"
                              id={"once_discount"}
                              forID={"once_discount"}
                              //   checked={
                              //     (discount_type_check.includes("is_once") &&
                              //       true) ||
                              //     false
                              //   }
                              label="Friday"
                              onChange={() => {
                                this.setState({
                                  discount_type_check: "",
                                });
                              }}
                            />
                          </div>
                          {/* sat */}
                          <div className="col-lg-4 col-md-6 responsive-column">
                            <CheckBox
                              //    labelClass="long_cb_label"
                              id={"once_discount"}
                              forID={"once_discount"}
                              //   checked={
                              //     (discount_type_check.includes("is_once") &&
                              //       true) ||
                              //     false
                              //   }
                              label="Saturday"
                              onChange={() => {
                                this.setState({
                                  discount_type_check: "",
                                });
                              }}
                            />
                          </div>
                          {/* sun */}
                          <div className="col-lg-4 col-md-6 responsive-column">
                            <CheckBox
                              //    labelClass="long_cb_label"
                              id={"once_discount"}
                              forID={"once_discount"}
                              //   checked={
                              //     (discount_type_check.includes("is_once") &&
                              //       true) ||
                              //     false
                              //   }
                              label="Sunday"
                              onChange={() => {
                                this.setState({
                                  discount_type_check: "",
                                });
                              }}
                            />
                          </div>
                          {/* Days checkbox */}
                          {/* Image */}
                        </div>
                      </div>
                      {/* end form-content */}
                    </div>

                    {/* end form-box */}
                    <div className="submit-box">
                      <div className="btn-box pt-3">
                        <button
                          className="theme-btn"
                          type="submit"
                          onClick={this.createHotel}
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
    hotels: state.hotels.hotels,
    currentHotel: state.hotels.currentHotel,
  };
};

const AddDiscount_ = withRouter(AddDiscount);

const AddDiscount__ = withAlert()(AddDiscount_);

export default connect(mapStateToProps)(AddDiscount__);
