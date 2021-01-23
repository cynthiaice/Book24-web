import Head from "next/head";
import React, { Component } from "react";
import Header from "../components/header";
import WhiteLoader from "../components/whiteLoader";
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
import states from "../components/states.json";
import { API_URL } from "../components/config.js";
import ReactTags from "react-tag-autocomplete";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { withAlert } from "react-alert";

const KeyCodes = {
  comma: "188",
  enter: "13",
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class AddCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      token: "",
      type: "",
      number: "",
      name: "",
      last_name: "",
      address: "",
      zip: "",
      email: "",
      password: "",
      error_div: false,
      error: "",
      checkInTime: "",
      checkOutTime: "",
      selectedCarFacilities: [],
      address: "",
      carNumber: "",
      carEmail: "",
      logo: [],
      images: [],
      carWebsite: "",
      address: "",
      featured: false,
      carFacilites: [],
      carFeatures: [],
      selectedCarFeatures: [],
      cars: [],
      carCategories: [],
      carCategory: "",
      carColor: "",
      carYear: "",
      carMilleage: "",
      carModel: "",
      price: "",
      loader: false,
    };
    this.reactTags = React.createRef();
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

  onDelete(i) {
    const selectedCarFeatures = this.state.selectedCarFeatures.slice(0);
    selectedCarFeatures.splice(i, 1);
    this.setState({ selectedCarFeatures });
  }

  onAddition(selectedCarFeature) {
    var isPresent = false;
    for (let i = 0; i < this.state.selectedCarFeatures.length; i++) {
      if (this.state.selectedCarFeatures[i].name == selectedCarFeature.name) {
        isPresent = true;
        break;
      }
    }
    if (!isPresent) {
      const selectedCarFeatures = [].concat(
        this.state.selectedCarFeatures,
        selectedCarFeature
      );
      this.setState({ selectedCarFeatures }, () =>
        console.log(this.state.selectedCarFeatures)
      );
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

  async componentDidMount() {
    console.log("dkdjdj");
    // const router = useRouter()
    console.log(this.props.token);
    let token = await Cookies.get("token");
    if (token == null || token == "") {
      this.props.router.push("/account");
    }
    this.getCarCategories(token);
  }

  getCarFeatures = async (token) => {
    if (token == null || token == "") {
      //    this.props.router.push("/login");
    }
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "carFeatures", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ carFeatures: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            carFeatures: [...prevState.carFeatures, row],
          }));
        }
        this.getCarCategories(token);
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

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
        var len = response.data.rows.length;
        this.setState({ carCategories: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            carCategories: [...prevState.carCategories, row],
          }));
        }
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

  createCar = (e) => {
    const {alert} = this.props
    e.preventDefault();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    var formData = new FormData();
    for (const key of Object.keys(this.state.images)) {
      formData.append("images", this.state.images[key]);
    }
    formData.append("name", this.state.name);
    formData.append("description", this.state.bio);
    formData.append("location", this.state.location);
    formData.append("address", this.state.address.label);
    formData.append("contact_email", this.state.hotelEmail);
    formData.append("contact_website", this.state.hotelWebsite);
    formData.append("contact_phone", this.state.hotelNumber);

    formData.append("carColor", this.state.carColor);
    formData.append("carCategory", this.state.carCategory);
    formData.append("carModel", this.state.carModel);
    formData.append("carMilleage", this.state.carMilleage);
    formData.append("carYear", this.state.carYear);
    formData.append("price", this.state.price);
    
    formData.append("features", JSON.stringify(this.state.selectedCarFeatures));

    console.log(formData);
    let token = Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "car", formData, config)
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
      type,
      name,
      address,
      description,
      check_in_time,
      check_out_time,
      sub_items,
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
          <section className="breadcrumb-area bread-bg-8">
            <div className="breadcrumb-wrap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="breadcrumb-content text-center">
                      <div className="section-heading">
                        <h2 className="sec__title">
                          List your car with Nigeria's <br />
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
                      List a car on Book24
                    </h3>
                    {/* <p className="font-size-14">If you are listing a vacation rental, please <a href="#" className="text-color">click here.</a></p> */}
                    <p className="font-size-14">
                      <a href="/terms" className="text-color">
                        Read the complete Book24 policy for accomodations.
                      </a>
                    </p>
                  </div>
                  {/* <div className="form-box">
                  <div className="form-title-wrap">
                    <h3 className="title"><i className="la la-user mr-2 text-gray" />Your information</h3>
                  </div>{/* form-title-wrap
                  <div className="form-content contact-form-action">
                    <form method="post" className="row">
                      <div className="col-lg-6 responsive-column">
                        <div className="input-box">
                          <label className="label-text">Your Name</label>
                          <div className="form-group">
                            <span className="la la-user form-icon" />
                            <input className="form-control" type="text" name="text" placeholder="Your name" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 
                      <div className="col-lg-6 responsive-column">
                        <div className="input-box">
                          <label className="label-text">Your Email</label>
                          <div className="form-group">
                            <span className="la la-envelope-o form-icon" />
                            <input className="form-control" type="email" name="email" placeholder="Your email" />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 responsive-column">
                        <div className="input-box">
                          <label className="label-text">What is your role at this business?</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>Select one</option>
                              <option value="OWNER">Owner</option>
                              <option value="MANAGER">Manager</option>
                              <option value="AGENCY_CONSULTANT">Agency / Consultant</option>
                              <option value="SALES">Sales</option>
                              <option value="OTHER">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>*/}
                  <div className="form-box">
                    <div className="form-title-wrap">
                      <h3 className="title">
                        <i className="la la-gear mr-2 text-gray" />
                        Listing information for your car
                      </h3>
                    </div>
                    {/* form-title-wrap */}
                    <div className="form-content contact-form-action">
                      <form method="post" className="row">
                        <div className="col-lg-6 responsive-column">
                          <div className="input-box">
                            <label className="label-text">
                              Official car name
                            </label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="Enter car name"
                                value={this.state.name}
                                required
                                onChange={(event) =>
                                  this.setState({ name: event.target.value })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-6 */}
                        <div className="col-lg-6 responsive-column">
                          <div className="input-box">
                            <label className="label-text">Car Category</label>
                            <div className="form-group select-contain w-100">
                              <select
                                className="select-contain-select"
                                onChange={(carCategory) =>
                                  this.setState({
                                    carCategory: carCategory.target.value,
                                  })
                                }
                              >
                                {this.state.carCategories.map((element) => (
                                  <option value={element.id}>
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
                        {/* end col-lg-6 */}
                        {/*   <div className="col-lg-6 responsive-column">
                        <div className="input-box">
                          <label className="label-text">Car Model</label>
                          <div className="form-group">
                            <span className="la la-map form-icon" />
                            <input className="form-control" type="text" 
                            name="text" placeholder="Enter model of car" 
                            required
                    value={this.state.carModel}
                    onChange={(event) =>
                      this.setState({ carModel: event.target.value })
                    }
                            />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                        {/*    <div className="col-lg-6 responsive-column">
                        <div className="input-box">
                          <label className="label-text">Car Color</label>
                          <div className="form-group">
                            <span className="la la-map form-icon" />
                            <input className="form-control" type="text" 
                            name="text" placeholder="Enter color of car" 
                            required
                            value={this.state.carColor}
                    onChange={(event) =>
                      this.setState({ carColor: event.target.value })
                    }
                            />
                          </div>
                        </div>
                      </div> end col-lg-6 */}
                        {/* <div className="col-lg-6 responsive-column">
                        <div className="input-box">
                          <label className="label-text">Car Mileage</label>
                          <div className="form-group">
                            <span className="la la-map form-icon" />
                            <input className="form-control" type="text" 
                            name="text" placeholder="Enter milleage of car" 
                            value={this.state.carMilleage}
                    onChange={(event) =>
                      this.setState({ carMilleage: event.target.value })
                    }
                            />
                          </div>
                        </div>
                      </div> */}
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
                        {/* end col-lg-12 */}
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
                                value={this.state.bio}
                                required
                                onChange={(event) =>
                                  this.setState({ bio: event.target.value })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-12 */}
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
                                value={this.state.carNumber}
                                onChange={(event) =>
                                  this.setState({
                                    carNumber: event.target.value,
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
                                value={this.state.carEmail}
                                onChange={(event) =>
                                  this.setState({
                                    carEmail: event.target.value,
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
                                placeholder="your website"
                                value={this.state.carWebsite}
                                onChange={(event) =>
                                  this.setState({
                                    carWebsite: event.target.value,
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
                            <input className="form-control" type="text" placeholder="https://www.facebook.com" />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Instagram Page</label>
                          <div className="form-group">
                            <span className="la la-instagram form-icon" />
                            <input className="form-control" type="text" placeholder="https://www.instagram.com" />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Twitter Page</label>
                          <div className="form-group">
                            <span className="la la-twitter form-icon" />
                            <input className="form-control" type="text" placeholder="https://www.twitter.com" />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Linkedin Page</label>
                          <div className="form-group">
                            <span className="la la-linkedin form-icon" />
                            <input className="form-control" type="text" placeholder="https://www.linkedin.com" />
                          </div>
                        </div>
                      </div> */}
                      </form>
                    </div>
                    {/* end form-content */}
                  </div>
                  {/* end form-box */}
                  <div className="form-box">
                    <div className="form-title-wrap">
                      <h3 className="title">
                        <i className="la la-gift mr-2 text-gray" />
                        Car Amenities
                      </h3>
                    </div>
                    {/* form-title-wrap */}
                    <div className="form-content contact-form-action">
                      <form method="post" className="row">
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">Car Year</label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="Enter car year"
                                value={this.state.carYear}
                                required
                                onChange={(event) =>
                                  this.setState({ carYear: event.target.value })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-4 */}
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">Car Mileage</label>
                            <div className="form-group">
                              <span className="la la-map form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="Enter milleage of car"
                                value={this.state.carMilleage}
                                onChange={(event) =>
                                  this.setState({
                                    carMilleage: event.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-4 */}
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">Car Model</label>
                            <div className="form-group">
                              <span className="la la-map form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="Enter model of car"
                                required
                                value={this.state.carModel}
                                onChange={(event) =>
                                  this.setState({
                                    carModel: event.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* end col-lg-4 */}
                        <div className="col-lg-6">
                          <div className="input-box">
                            <label className="label-text">Car color</label>
                            <div className="form-group">
                              <span className="la la-briefcase form-icon" />
                              <input
                                className="form-control"
                                type="text"
                                name="text"
                                placeholder="Enter color of car"
                                required
                                value={this.state.carColor}
                                onChange={(event) =>
                                  this.setState({
                                    carColor: event.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-lg-12">
                          <div className="input-box">
                            <label className="label-text">Car features</label>
                            <div className="form-group">
                              <ReactTags
                                ref={this.reactTags}
                                tags={this.state.selectedCarFeatures}
                                suggestions={this.state.carFeatures}
                                delimiters={delimiters}
                                onDelete={this.onDelete.bind(this)}
                                onAddition={this.onAddition.bind(this)}
                                placeholderText="Add car features"
                                noSuggestionsText="No car features match your input"
                                autoresize={false}
                                minQueryLength={1}
                              />
                            </div>
                          </div>
                        </div> */}
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
                      <button onClick={this.createCar} className="theme-btn">
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
const AddCar_ = withRouter(AddCar);
export default withAlert()(AddCar_);
