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

class AddRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHotel: {},
      hotels: [],
      auth: null,
      token: "",
      name: "",
      price: "",
      capacity: "",
      hotel: "",
      size: "",
      no_of_beds: "",
      is_wifi: false,
      is_shower: false,
      hotel_type: "",
      extra_people_charge: "",
      minimum_stay: "",
      images: [],
      upload_images: [],
      original_price: "",
      discount_rate: "",
      dicount_price: "",
      rooms: [],
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
    if (this.props.isEdit) {
      this.setState({
        currentHotel: current,
        images: (current.images && current.images) || [],
        name: current.name,
        hotel: current.hotel_id,
        price: current.price,
        capacity: current.capacity,
        is_wifi: current.is_wifi,
        is_shower: current.is_shower,
        size: current.size,
        no_of_beds: current.no_of_beds,
        original_price: current.original_price,
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
    formData.append("hotel_id", this.state.hotel);
    formData.append("price", this.state.price);
    formData.append("original_price", this.state.original_price);
    formData.append("discount_rate", this.state.discount_rate);
    formData.append("capacity", this.state.capacity);
    formData.append("is_wifi", this.state.is_wifi);
    formData.append("is_shower", this.state.is_shower);
    formData.append("size", this.state.size);
    formData.append("no_of_beds", this.state.no_of_beds);

    let token = await Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(
        API_URL + "update-rooms/" + this.props.currentHotel.id.toString(),
        formData,
        config
      )
      .then((response) => {
        this.setState({ loader: false });
        alert.show(<div>Room Updated</div>, {
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
  resetForm = () => {
    this.setState({
      name: "",
      images: [],
      bio: "",
      location: "",
      address: "",
      hotel_id: "",
      capacity: "",
      is_wifi: "",
      is_shower: "",
      size: "",
      no_of_beds: "",
      price: "",
      discount_rate: "",
      original_price: "",
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
    formData.append("hotel_id", this.state.hotel);
    formData.append("price", this.state.price);
    formData.append("original_price", this.state.original_price);
    formData.append("discount_rate", this.state.discount_rate);
    formData.append("capacity", this.state.capacity);
    formData.append("is_wifi", this.state.is_wifi);
    formData.append("is_shower", this.state.is_shower);
    formData.append("size", this.state.size);
    formData.append("no_of_beds", this.state.no_of_beds);

    let token = await Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "room", formData, config)
      .then((response) => {
        this.setState({ loader: false });
        alert.show(<div>Room Added</div>, {
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
      hotel,
      price,
      capacity,
      size,
      no_of_beds,
      original_price,
      discount_rate,

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
                        {isEdit ? title : "Add Room"}
                      </h3>
                    </div>

                    {/* end form-box */}
                    <div className="form-box">
                      <div className="form-title-wrap">
                        <h3 className="title">
                          <i className="la la-gear mr-2 text-gray" />
                          Listing information for this room
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

                          <TextField
                            label="Capacity"
                            required
                            className="la la-briefcase form-icon"
                            type="number"
                            name="text"
                            placeholder="Capacity"
                            value={capacity}
                            onChange={(e) =>
                              this.setState({ capacity: e.target.value })
                            }
                          />

                          {/* end col-lg-6 */}
                          <div className="col-lg-6 responsive-column">
                            <div className="input-box">
                              <label className="label-text">
                                Choose a hotel
                              </label>
                              <div className="form-group select-contain w-100">
                                <select
                                  required
                                  value={hotel}
                                  className="select-contain-select"
                                  onChange={(event) => {
                                    this.setState({
                                      hotel: event.target.value,
                                    });
                                  }}
                                >
                                  <option value>Select a hotel </option>
                                  {this.props.hotels.map((element, i) => (
                                    <option
                                      value={element.id}
                                      key={element.name + i}
                                    >
                                      {element.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                          <TextField
                            label="Room size"
                            required
                            className="la la-fig form-icon"
                            type="number"
                            name="text"
                            placeholder="Room size"
                            value={size}
                            onChange={(e) =>
                              this.setState({ size: e.target.value })
                            }
                          />

                          {/* end col-lg-6 */}

                          <TextField
                            label="No of beds"
                            required
                            className="la la-bed form-icon"
                            type="number"
                            name="text"
                            placeholder="No of beds"
                            value={no_of_beds}
                            onChange={(e) =>
                              this.setState({ no_of_beds: e.target.value })
                            }
                          />

                          {/* end col-lg-6 */}

                          {/* Check boxes */}
                          <div className="col-lg-6 responsive-column">
                            <CheckBox
                              //    labelClass="long_cb_label"
                              id={"freeWifi"}
                              forID={"freeWifi"}
                              checked={(this.state.is_wifi && true) || false}
                              label="Free Wifi"
                              onChange={() => {
                                this.setState({
                                  is_wifi: !this.state.is_wifi,
                                });
                              }}
                            />
                          </div>
                          <div className="col-lg-6 responsive-column">
                            <CheckBox
                              //    labelClass="long_cb_label"
                              id={"isShower"}
                              forID={"isShower"}
                              checked={(this.state.is_shower && true) || false}
                              label="Shower/Bathtub"
                              onChange={() => {
                                this.setState({
                                  is_shower: !this.state.is_shower,
                                });
                              }}
                            />
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
                          Upload room Images
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
    hotels: state.hotels.hotels,
    currentHotel: state.hotels.currentHotel,
  };
};

const AddRoom_ = withRouter(AddRoom);

const AddRoom__ = withAlert()(AddRoom_);

export default connect(mapStateToProps)(AddRoom__);
