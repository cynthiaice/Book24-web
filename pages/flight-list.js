import Head from "next/head";
import React, { Component } from "react";
import Header from "../components/header";
import DetailsHeader from "../components/detailsHeader";
import DetailsItem from "../components/detailsItem";import PreLoader from "../components/preloader";
import SignInModal from "../components/signInModal";
import Footer from "../components/footer";
import $ from "jquery";
import Cookies from "js-cookie";
import moment from "moment";
import { withRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../components/config.js";

class FlightList extends Component {
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
    };
  }

  async componentDidMount() {
    let token = await Cookies.get("token");
    if (token == null || token == "") {
      console.log("false tojken");
      this.setState({ auth: false });
    } else {
      console.log(token);
      this.setState({ auth: true, token });
    }
  }

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
        if(len <= 0){
          this.props.router.push('/listing')
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
          sub_items: type == "hotel"
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

  render() {
    const {
      type,
      name,
      address,
      description,
      check_in_time,
      check_out_time,
      sub_items,
    } = this.state;
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
          <link rel="stylesheet" href="css/bootstrap-select.min.css"/>
    <link rel="stylesheet" href="css/line-awesome.css"/>
    <link rel="stylesheet" href="css/owl.carousel.min.css"/>
    <link rel="stylesheet" href="css/owl.theme.default.min.css"/>
    <link rel="stylesheet" href="css/jquery.fancybox.min.css"/>
    <link rel="stylesheet" href="css/daterangepicker.css"/>
    <link rel="stylesheet" href="css/animate.min.css"/>
    <link rel="stylesheet" href="css/animated-headline.css"/>
    <link rel="stylesheet" href="css/jquery-ui.css"/>
    <link rel="stylesheet" href="css/jquery.filer.css"/>
    <link rel="stylesheet" href="css/flag-icon.min.css" />
        </Head>
        <div id="page">
              {/* start cssload-loader */}
      
          <DetailsHeader makeBlue={true}/>
  {/* ================================
    START BREADCRUMB AREA
================================= */}
<section className="breadcrumb-area bread-bg-6">
          <div className="breadcrumb-wrap">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="breadcrumb-content">
                    <div className="section-heading">
                      <h2 className="sec__title">Flight List</h2>
                    </div>
                  </div>{/* end breadcrumb-content */}
                </div>{/* end col-lg-6 */}
                <div className="col-lg-6">
                  <div className="breadcrumb-list">
                    <ul className="list-items d-flex justify-content-end">
                      <li><a href="index.html">Home</a></li>
                      <li>Flight</li>
                      <li>Flight List</li>
                    </ul>
                  </div>{/* end breadcrumb-list */}
                </div>{/* end col-lg-6 */}
              </div>{/* end row */}
            </div>{/* end container */}
          </div>{/* end breadcrumb-wrap */}
          <div className="bread-svg-box">
            <svg className="bread-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none"><polygon points="100 0 50 10 0 0 0 10 100 10" /></svg>
          </div>{/* end bread-svg */}
        </section>{/* end breadcrumb-area */}
        {/* ================================
    END BREADCRUMB AREA
================================= */}
        {/* ================================
    START CARD AREA
================================= */}
        <section className="card-area section--padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="filter-wrap margin-bottom-30px">
                  <div className="filter-top d-flex align-items-center justify-content-between pb-4">
                    <div>
                      <h3 className="title font-size-24">24 Flights found</h3>
                      <p className="font-size-14"><span className="mr-1 pt-1">Book with confidence:</span></p>
                    </div>
                    <div className="layout-view d-flex align-items-center">
                      <a href="flight-grid.html" data-toggle="tooltip" data-placement="top" title="Grid View"><i className="la la-th-large" /></a>
                      <a href="flight-list.html" data-toggle="tooltip" data-placement="top" title="List View" className="active"><i className="la la-th-list" /></a>
                    </div>
                  </div>{/* end filter-top */}
                  <div className="filter-bar d-flex align-items-center justify-content-between">
                    <div className="filter-bar-filter d-flex flex-wrap align-items-center">
                      <div className="filter-option">
                        <h3 className="title font-size-16">Filter by:</h3>
                      </div>
                      <div className="filter-option">
                        <div className="dropdown dropdown-contain">
                          <a className="dropdown-toggle dropdown-btn dropdown--btn" href="#" role="button" data-toggle="dropdown">
                            Filter Price
                          </a>
                          <div className="dropdown-menu dropdown-menu-wrap">
                            <div className="dropdown-item">
                              <div className="slider-range-wrap">
                                <div className="price-slider-amount padding-bottom-20px">
                                  <label htmlFor="amount" className="filter__label">Price:</label>
                                  <input type="text" id="amount" className="amounts" />
                                </div>{/* end price-slider-amount */}
                                <div id="slider-range" />{/* end slider-range */}
                              </div>{/* end slider-range-wrap */}
                              <div className="btn-box pt-4">
                                <button className="theme-btn theme-btn-small theme-btn-transparent" type="button">Apply</button>
                              </div>
                            </div>{/* end dropdown-item */}
                          </div>{/* end dropdown-menu */}
                        </div>{/* end dropdown */}
                      </div>
                      <div className="filter-option">
                        <div className="dropdown dropdown-contain">
                          <a className="dropdown-toggle dropdown-btn dropdown--btn" href="#" role="button" data-toggle="dropdown">
                            Review Score
                          </a>
                          <div className="dropdown-menu dropdown-menu-wrap">
                            <div className="dropdown-item">
                              <div className="checkbox-wrap">
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="r1" />
                                  <label htmlFor="r1">
                                    <span className="ratings d-flex align-items-center">
                                      <i className="la la-star" />
                                      <i className="la la-star" />
                                      <i className="la la-star" />
                                      <i className="la la-star" />
                                      <i className="la la-star" />
                                      <span className="color-text-3 font-size-13 ml-1">(55.590)</span>
                                    </span>
                                  </label>
                                </div>
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="r2" />
                                  <label htmlFor="r2">
                                    <span className="ratings d-flex align-items-center">
                                      <i className="la la-star" />
                                      <i className="la la-star" />
                                      <i className="la la-star" />
                                      <i className="la la-star" />
                                      <i className="la la-star-o" />
                                      <span className="color-text-3 font-size-13 ml-1">(40.590)</span>
                                    </span>
                                  </label>
                                </div>
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="r3" />
                                  <label htmlFor="r3">
                                    <span className="ratings d-flex align-items-center">
                                      <i className="la la-star" />
                                      <i className="la la-star" />
                                      <i className="la la-star" />
                                      <i className="la la-star-o" />
                                      <i className="la la-star-o" />
                                      <span className="color-text-3 font-size-13 ml-1">(23.590)</span>
                                    </span>
                                  </label>
                                </div>
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="r4" />
                                  <label htmlFor="r4">
                                    <span className="ratings d-flex align-items-center">
                                      <i className="la la-star" />
                                      <i className="la la-star" />
                                      <i className="la la-star-o" />
                                      <i className="la la-star-o" />
                                      <i className="la la-star-o" />
                                      <span className="color-text-3 font-size-13 ml-1">(12.590)</span>
                                    </span>
                                  </label>
                                </div>
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="r5" />
                                  <label htmlFor="r5">
                                    <span className="ratings d-flex align-items-center">
                                      <i className="la la-star" />
                                      <i className="la la-star-o" />
                                      <i className="la la-star-o" />
                                      <i className="la la-star-o" />
                                      <i className="la la-star-o" />
                                      <span className="color-text-3 font-size-13 ml-1">(590)</span>
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>{/* end dropdown-item */}
                          </div>{/* end dropdown-menu */}
                        </div>{/* end dropdown */}
                      </div>
                      <div className="filter-option">
                        <div className="dropdown dropdown-contain">
                          <a className="dropdown-toggle dropdown-btn dropdown--btn" href="#" role="button" data-toggle="dropdown">
                            Airlines
                          </a>
                          <div className="dropdown-menu dropdown-menu-wrap">
                            <div className="dropdown-item">
                              <div className="checkbox-wrap">
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="catChb1" />
                                  <label htmlFor="catChb1">Major Airlines</label>
                                </div>
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="catChb2" />
                                  <label htmlFor="catChb2">United Airlines</label>
                                </div>
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="catChb3" />
                                  <label htmlFor="catChb3">Delta Airlines</label>
                                </div>
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="catChb4" />
                                  <label htmlFor="catChb4">Alitalia</label>
                                </div>
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="catChb5" />
                                  <label htmlFor="catChb5">US Airways</label>
                                </div>
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="catChb6" />
                                  <label htmlFor="catChb6">Air France</label>
                                </div>
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="catChb7" />
                                  <label htmlFor="catChb7">Air Tahiti Nui</label>
                                </div>
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="catChb8" />
                                  <label htmlFor="catChb8">Indigo</label>
                                </div>
                              </div>
                            </div>{/* end dropdown-item */}
                          </div>{/* end dropdown-menu */}
                        </div>{/* end dropdown */}
                      </div>
                    </div>{/* end filter-bar-filter */}
                    <div className="select-contain">
                      <select className="select-contain-select">
                        <option value={1}>Short by default</option>
                        <option value={2}>Popular Flight</option>
                        <option value={3}>Price: low to high</option>
                        <option value={4}>Price: high to low</option>
                        <option value={5}>A to Z</option>
                      </select>
                    </div>{/* end select-contain */}
                  </div>{/* end filter-bar */}
                </div>{/* end filter-wrap */}
              </div>{/* end col-lg-12 */}
            </div>{/* end row */}
            <div className="row">
              <div className="col-lg-4">
                <div className="sidebar mt-0">
                  <div className="sidebar-widget">
                    <h3 className="title stroke-shape">Search Flights</h3>
                    <div className="sidebar-widget-item">
                      <div className="contact-form-action">
                        <form action="#">
                          <div className="input-box">
                            <label className="label-text">Leaving from</label>
                            <div className="form-group">
                              <span className="la la-map-marker form-icon" />
                              <input className="form-control" type="text" name="text" placeholder="Destination, city, or airport" />
                            </div>
                          </div>
                          <div className="input-box">
                            <label className="label-text">Going to</label>
                            <div className="form-group">
                              <span className="la la-map-marker form-icon" />
                              <input className="form-control" type="text" name="text" placeholder="Destination, city, or airport" />
                            </div>
                          </div>
                          <div className="input-box">
                            <label className="label-text">Departure on</label>
                            <div className="form-group">
                              <span className="la la-calendar form-icon" />
                              <input className="date-range form-control" type="text" name="daterange-single" defaultValue="04/28/2020" />
                            </div>
                          </div>
                          <div className="input-box">
                            <label className="label-text">Arriving on</label>
                            <div className="form-group">
                              <span className="la la-calendar form-icon" />
                              <input className="date-range form-control" type="text" name="daterange-single" defaultValue="04/28/2020" />
                            </div>
                          </div>
                          <div className="input-box">
                            <label className="label-text">Airlines</label>
                            <div className="form-group">
                              <div className="select-contain w-auto">
                                <select className="select-contain-select">
                                  <option value={1}>American Airlines</option>
                                  <option value={2}>Air France</option>
                                  <option value={3}>Asiana</option>
                                  <option value={4}>Cathay Pacific</option>
                                  <option value={5}>China Southern</option>
                                  <option value={6}>Delta Airlines</option>
                                  <option value={7}>Jet Airways</option>
                                  <option value={8}>Vietnam Airlines</option>
                                  <option value={9}>Qatar Airways</option>
                                  <option value={10}>Singapore Airlines</option>
                                </select>
                              </div>{/* end select-contain */}
                            </div>
                          </div>
                          <div className="input-box">
                            <label className="label-text">Preferred class</label>
                            <div className="form-group">
                              <div className="select-contain w-auto">
                                <select className="select-contain-select">
                                  <option value={1}>Business</option>
                                  <option value={2}>First Class</option>
                                  <option value={3}>Economy</option>
                                  <option value={4}>Premium Economy</option>
                                </select>
                              </div>{/* end select-contain */}
                            </div>
                          </div>
                          <div className="btn-box pt-2">
                            <a href="flight-search-result.html" className="theme-btn">Search Now</a>
                          </div>
                        </form>
                      </div>
                    </div>{/* end sidebar-widget-item */}
                  </div>{/* end sidebar-widget */}
                  <div className="sidebar-widget">
                    <h3 className="title stroke-shape">Filter by Price</h3>
                    <div className="sidebar-price-range">
                      <div className="slider-range-wrap">
                        <div className="price-slider-amount padding-bottom-20px">
                          <label htmlFor="amount2" className="filter__label">Price:</label>
                          <input type="text" id="amount2" className="amounts" />
                        </div>{/* end price-slider-amount */}
                        <div id="slider-range2" />{/* end slider-range */}
                      </div>{/* end slider-range-wrap */}
                      <div className="btn-box pt-4">
                        <button className="theme-btn theme-btn-small theme-btn-transparent" type="button">Apply</button>
                      </div>
                    </div>
                  </div>{/* end sidebar-widget */}
                  <div className="sidebar-widget">
                    <h3 className="title stroke-shape">Flight Times</h3>
                    <div className="sidebar-widget-item">
                      <div className="select-contain w-auto">
                        <select className="select-contain-select">
                          <option value="1200AM">12:00AM</option>
                          <option value="1230AM">12:30AM</option>
                          <option value="0100AM">1:00AM</option>
                          <option value="0130AM">1:30AM</option>
                          <option value="0200AM">2:00AM</option>
                          <option value="0230AM">2:30AM</option>
                          <option value="0300AM">3:00AM</option>
                          <option value="0330AM">3:30AM</option>
                          <option value="0400AM">4:00AM</option>
                          <option value="0430AM">4:30AM</option>
                          <option value="0500AM">5:00AM</option>
                          <option value="0530AM">5:30AM</option>
                          <option value="0600AM">6:00AM</option>
                          <option value="0630AM">6:30AM</option>
                          <option value="0700AM">7:00AM</option>
                          <option value="0730AM">7:30AM</option>
                          <option value="0800AM">8:00AM</option>
                          <option value="0830AM">8:30AM</option>
                          <option value="0900AM" selected>9:00AM</option>
                          <option value="0930AM">9:30AM</option>
                          <option value="1000AM">10:00AM</option>
                          <option value="1030AM">10:30AM</option>
                          <option value="1100AM">11:00AM</option>
                          <option value="1130AM">11:30AM</option>
                          <option value="1200PM">12:00PM</option>
                          <option value="1230PM">12:30PM</option>
                          <option value="0100PM">1:00PM</option>
                          <option value="0130PM">1:30PM</option>
                          <option value="0200PM">2:00PM</option>
                          <option value="0230PM">2:30PM</option>
                          <option value="0300PM">3:00PM</option>
                          <option value="0330PM">3:30PM</option>
                          <option value="0400PM">4:00PM</option>
                          <option value="0430PM">4:30PM</option>
                          <option value="0500PM">5:00PM</option>
                          <option value="0530PM">5:30PM</option>
                          <option value="0600PM">6:00PM</option>
                          <option value="0630PM">6:30PM</option>
                          <option value="0700PM">7:00PM</option>
                          <option value="0730PM">7:30PM</option>
                          <option value="0800PM">8:00PM</option>
                          <option value="0830PM">8:30PM</option>
                          <option value="0900PM">9:00PM</option>
                          <option value="0930PM">9:30PM</option>
                          <option value="1000PM">10:00PM</option>
                          <option value="1030PM">10:30PM</option>
                          <option value="1100PM">11:00PM</option>
                          <option value="1130PM">11:30PM</option>
                        </select>
                      </div>
                    </div>{/* end sidebar-widget-item */}
                  </div>{/* end sidebar-widget */}
                  <div className="sidebar-widget">
                    <h3 className="title stroke-shape">Filter by Rating</h3>
                    <div className="sidebar-widget-item">
                      <div className="custom-checkbox">
                        <input type="checkbox" id="r6" />
                        <label htmlFor="r6">
                          <span className="ratings d-flex align-items-center">
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <span className="color-text-3 font-size-13 ml-1">(55.590)</span>
                          </span>
                        </label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="r7" />
                        <label htmlFor="r7">
                          <span className="ratings d-flex align-items-center">
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star-o" />
                            <span className="color-text-3 font-size-13 ml-1">(40.590)</span>
                          </span>
                        </label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="r8" />
                        <label htmlFor="r8">
                          <span className="ratings d-flex align-items-center">
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star-o" />
                            <i className="la la-star-o" />
                            <span className="color-text-3 font-size-13 ml-1">(23.590)</span>
                          </span>
                        </label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="r9" />
                        <label htmlFor="r9">
                          <span className="ratings d-flex align-items-center">
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star-o" />
                            <i className="la la-star-o" />
                            <i className="la la-star-o" />
                            <span className="color-text-3 font-size-13 ml-1">(12.590)</span>
                          </span>
                        </label>
                      </div>
                      <div className="custom-checkbox mb-0">
                        <input type="checkbox" id="r10" />
                        <label htmlFor="r10">
                          <span className="ratings d-flex align-items-center">
                            <i className="la la-star" />
                            <i className="la la-star-o" />
                            <i className="la la-star-o" />
                            <i className="la la-star-o" />
                            <i className="la la-star-o" />
                            <span className="color-text-3 font-size-13 ml-1">(590)</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>{/* end sidebar-widget */}
                  <div className="sidebar-widget">
                    <h3 className="title stroke-shape">Flight Stops</h3>
                    <div className="sidebar-widget-item">
                      <div className="custom-checkbox">
                        <input type="checkbox" id="flightStop1" />
                        <label htmlFor="flightStop1">1 Stop</label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="flightStop2" />
                        <label htmlFor="flightStop2">2 Stops</label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="flightStop3" />
                        <label htmlFor="flightStop3">3 Stops</label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="flightStop4" />
                        <label htmlFor="flightStop4">MultiStops</label>
                      </div>
                    </div>
                  </div>{/* end sidebar-widget */}
                  <div className="sidebar-widget">
                    <h3 className="title stroke-shape">Inflight Experience</h3>
                    <div className="sidebar-widget-item">
                      <div className="custom-checkbox">
                        <input type="checkbox" id="chb23" />
                        <label htmlFor="chb23">Inflight Dining</label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="chb24" />
                        <label htmlFor="chb24">Music</label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="chb25" />
                        <label htmlFor="chb25">Sky Shopping</label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="chb26" />
                        <label htmlFor="chb26">Wi-fi</label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="chb27" />
                        <label htmlFor="chb27">Seats &amp; Cabin</label>
                      </div>
                    </div>
                  </div>{/* end sidebar-widget */}
                </div>{/* end sidebar */}
              </div>{/* end col-lg-4 */}
              <div className="col-lg-8">
                <div className="card-item flight-card flight--card card-item-list card-item-list-2">
                  <div className="card-img">
                    <img src="images/airline-img7.png" alt="flight-logo-img" />
                  </div>
                  <div className="card-body">
                    <div className="card-top-title d-flex justify-content-between">
                      <div>
                        <h3 className="card-title font-size-17">Beijing</h3>
                        <p className="card-meta font-size-14">One way flight</p>
                      </div>
                      <div>
                        <div className="text-right">
                          <span className="font-weight-regular font-size-14 d-block">avg/person</span>
                          <h6 className="font-weight-bold color-text">$350.00</h6>
                        </div>
                      </div>
                    </div>{/* end card-top-title */}
                    <div className="flight-details py-3">
                      <div className="flight-time pb-3">
                        <div className="flight-time-item take-off d-flex">
                          <div className="flex-shrink-0 mr-2">
                            <i className="la la-plane" />
                          </div>
                          <div>
                            <h3 className="card-title font-size-15 font-weight-medium mb-0">Take off</h3>
                            <p className="card-meta font-size-14">Wed Nov 12 6:50 AM</p>
                          </div>
                        </div>
                        <div className="flight-time-item landing d-flex">
                          <div className="flex-shrink-0 mr-2">
                            <i className="la la-plane" />
                          </div>
                          <div>
                            <h3 className="card-title font-size-15 font-weight-medium mb-0">Landing</h3>
                            <p className="card-meta font-size-14">Thu Nov 13 8:50 AM</p>
                          </div>
                        </div>
                      </div>{/* end flight-time */}
                      <p className="font-size-14 text-center"><span className="color-text-2 mr-1">Total Time:</span>12 Hours 30 Minutes</p>
                    </div>{/* end flight-details */}
                    <div className="btn-box text-center">
                      <a href="flight-single.html" className="theme-btn theme-btn-small w-100">View Details</a>
                    </div>
                  </div>{/* end card-body */}
                </div>{/* end card-item */}
                <div className="card-item flight-card flight--card card-item-list card-item-list-2">
                  <div className="card-img">
                    <img src="images/airline-img8.png" alt="flight-logo-img" />
                  </div>
                  <div className="card-body">
                    <div className="card-top-title d-flex justify-content-between">
                      <div>
                        <h3 className="card-title font-size-17">Paris</h3>
                        <p className="card-meta font-size-14">Round flight</p>
                      </div>
                      <div>
                        <div className="text-right">
                          <span className="font-weight-regular font-size-14 d-block">avg/person</span>
                          <h6 className="font-weight-bold color-text">$650.00</h6>
                        </div>
                      </div>
                    </div>{/* end card-top-title */}
                    <div className="flight-details py-3">
                      <div className="flight-time pb-3">
                        <div className="flight-time-item take-off d-flex">
                          <div className="flex-shrink-0 mr-2">
                            <i className="la la-plane" />
                          </div>
                          <div>
                            <h3 className="card-title font-size-15 font-weight-medium mb-0">Take off</h3>
                            <p className="card-meta font-size-14">Wed Nov 12 6:50 AM</p>
                          </div>
                        </div>
                        <div className="flight-time-item landing d-flex">
                          <div className="flex-shrink-0 mr-2">
                            <i className="la la-plane" />
                          </div>
                          <div>
                            <h3 className="card-title font-size-15 font-weight-medium mb-0">Landing</h3>
                            <p className="card-meta font-size-14">Thu Nov 13 8:50 AM</p>
                          </div>
                        </div>
                      </div>{/* end flight-time */}
                      <p className="font-size-14 text-center"><span className="color-text-2 mr-1">Total Time:</span>12 Hours 30 Minutes</p>
                    </div>{/* end flight-details */}
                    <div className="btn-box text-center">
                      <a href="flight-single.html" className="theme-btn theme-btn-small w-100">View Details</a>
                    </div>
                  </div>{/* end card-body */}
                </div>{/* end card-item */}
                <div className="card-item flight-card flight--card card-item-list card-item-list-2">
                  <div className="card-img">
                    <img src="images/airline-img9.png" alt="flight-logo-img" />
                  </div>
                  <div className="card-body">
                    <div className="card-top-title d-flex justify-content-between">
                      <div>
                        <h3 className="card-title font-size-17">Dubai</h3>
                        <p className="card-meta font-size-14">One way flight</p>
                      </div>
                      <div>
                        <div className="text-right">
                          <span className="font-weight-regular font-size-14 d-block">avg/person</span>
                          <h6 className="font-weight-bold color-text">$350.00</h6>
                        </div>
                      </div>
                    </div>{/* end card-top-title */}
                    <div className="flight-details py-3">
                      <div className="flight-time pb-3">
                        <div className="flight-time-item take-off d-flex">
                          <div className="flex-shrink-0 mr-2">
                            <i className="la la-plane" />
                          </div>
                          <div>
                            <h3 className="card-title font-size-15 font-weight-medium mb-0">Take off</h3>
                            <p className="card-meta font-size-14">Wed Nov 12 6:50 AM</p>
                          </div>
                        </div>
                        <div className="flight-time-item landing d-flex">
                          <div className="flex-shrink-0 mr-2">
                            <i className="la la-plane" />
                          </div>
                          <div>
                            <h3 className="card-title font-size-15 font-weight-medium mb-0">Landing</h3>
                            <p className="card-meta font-size-14">Thu Nov 13 8:50 AM</p>
                          </div>
                        </div>
                      </div>{/* end flight-time */}
                      <p className="font-size-14 text-center"><span className="color-text-2 mr-1">Total Time:</span>12 Hours 30 Minutes</p>
                    </div>{/* end flight-details */}
                    <div className="btn-box text-center">
                      <a href="flight-single.html" className="theme-btn theme-btn-small w-100">View Details</a>
                    </div>
                  </div>{/* end card-body */}
                </div>{/* end card-item */}
                <div className="card-item flight-card flight--card card-item-list card-item-list-2">
                  <div className="card-img">
                    <img src="images/airline-img10.png" alt="flight-logo-img" />
                  </div>
                  <div className="card-body">
                    <div className="card-top-title d-flex justify-content-between">
                      <div>
                        <h3 className="card-title font-size-17">Turkey</h3>
                        <p className="card-meta font-size-14">One way flight</p>
                      </div>
                      <div>
                        <div className="text-right">
                          <span className="font-weight-regular font-size-14 d-block">avg/person</span>
                          <h6 className="font-weight-bold color-text">$350.00</h6>
                        </div>
                      </div>
                    </div>{/* end card-top-title */}
                    <div className="flight-details py-3">
                      <div className="flight-time pb-3">
                        <div className="flight-time-item take-off d-flex">
                          <div className="flex-shrink-0 mr-2">
                            <i className="la la-plane" />
                          </div>
                          <div>
                            <h3 className="card-title font-size-15 font-weight-medium mb-0">Take off</h3>
                            <p className="card-meta font-size-14">Wed Nov 12 6:50 AM</p>
                          </div>
                        </div>
                        <div className="flight-time-item landing d-flex">
                          <div className="flex-shrink-0 mr-2">
                            <i className="la la-plane" />
                          </div>
                          <div>
                            <h3 className="card-title font-size-15 font-weight-medium mb-0">Landing</h3>
                            <p className="card-meta font-size-14">Thu Nov 13 8:50 AM</p>
                          </div>
                        </div>
                      </div>{/* end flight-time */}
                      <p className="font-size-14 text-center"><span className="color-text-2 mr-1">Total Time:</span>12 Hours 30 Minutes</p>
                    </div>{/* end flight-details */}
                    <div className="btn-box text-center">
                      <a href="flight-single.html" className="theme-btn theme-btn-small w-100">View Details</a>
                    </div>
                  </div>{/* end card-body */}
                </div>{/* end card-item */}
                <div className="card-item flight-card flight--card card-item-list card-item-list-2">
                  <div className="card-img">
                    <img src="images/airline-img11.png" alt="flight-logo-img" />
                  </div>
                  <div className="card-body">
                    <div className="card-top-title d-flex justify-content-between">
                      <div>
                        <h3 className="card-title font-size-17">New york</h3>
                        <p className="card-meta font-size-14">Round flight</p>
                      </div>
                      <div>
                        <div className="text-right">
                          <span className="font-weight-regular font-size-14 d-block">avg/person</span>
                          <h6 className="font-weight-bold color-text">$650.00</h6>
                        </div>
                      </div>
                    </div>{/* end card-top-title */}
                    <div className="flight-details py-3">
                      <div className="flight-time pb-3">
                        <div className="flight-time-item take-off d-flex">
                          <div className="flex-shrink-0 mr-2">
                            <i className="la la-plane" />
                          </div>
                          <div>
                            <h3 className="card-title font-size-15 font-weight-medium mb-0">Take off</h3>
                            <p className="card-meta font-size-14">Wed Nov 12 6:50 AM</p>
                          </div>
                        </div>
                        <div className="flight-time-item landing d-flex">
                          <div className="flex-shrink-0 mr-2">
                            <i className="la la-plane" />
                          </div>
                          <div>
                            <h3 className="card-title font-size-15 font-weight-medium mb-0">Landing</h3>
                            <p className="card-meta font-size-14">Thu Nov 13 8:50 AM</p>
                          </div>
                        </div>
                      </div>{/* end flight-time */}
                      <p className="font-size-14 text-center"><span className="color-text-2 mr-1">Total Time:</span>12 Hours 30 Minutes</p>
                    </div>{/* end flight-details */}
                    <div className="btn-box text-center">
                      <a href="flight-single.html" className="theme-btn theme-btn-small w-100">View Details</a>
                    </div>
                  </div>{/* end card-body */}
                </div>{/* end card-item */}
                <div className="card-item flight-card flight--card card-item-list card-item-list-2">
                  <div className="card-img">
                    <img src="images/airline-img7.png" alt="flight-logo-img" />
                  </div>
                  <div className="card-body">
                    <div className="card-top-title d-flex justify-content-between">
                      <div>
                        <h3 className="card-title font-size-17">London</h3>
                        <p className="card-meta font-size-14">One way flight</p>
                      </div>
                      <div>
                        <div className="text-right">
                          <span className="font-weight-regular font-size-14 d-block">avg/person</span>
                          <h6 className="font-weight-bold color-text">$350.00</h6>
                        </div>
                      </div>
                    </div>{/* end card-top-title */}
                    <div className="flight-details py-3">
                      <div className="flight-time pb-3">
                        <div className="flight-time-item take-off d-flex">
                          <div className="flex-shrink-0 mr-2">
                            <i className="la la-plane" />
                          </div>
                          <div>
                            <h3 className="card-title font-size-15 font-weight-medium mb-0">Take off</h3>
                            <p className="card-meta font-size-14">Wed Nov 12 6:50 AM</p>
                          </div>
                        </div>
                        <div className="flight-time-item landing d-flex">
                          <div className="flex-shrink-0 mr-2">
                            <i className="la la-plane" />
                          </div>
                          <div>
                            <h3 className="card-title font-size-15 font-weight-medium mb-0">Landing</h3>
                            <p className="card-meta font-size-14">Thu Nov 13 8:50 AM</p>
                          </div>
                        </div>
                      </div>{/* end flight-time */}
                      <p className="font-size-14 text-center"><span className="color-text-2 mr-1">Total Time:</span>12 Hours 30 Minutes</p>
                    </div>{/* end flight-details */}
                    <div className="btn-box text-center">
                      <a href="flight-single.html" className="theme-btn theme-btn-small w-100">View Details</a>
                    </div>
                  </div>{/* end card-body */}
                </div>{/* end card-item */}
              </div>{/* end col-lg-8 */}
            </div>{/* end row */}
            <div className="row">
              <div className="col-lg-12">
                <div className="btn-box mt-3 text-center">
                  <button type="button" className="theme-btn"><i className="la la-refresh mr-1" />Load More</button>
                  <p className="font-size-13 pt-2">Showing 1 - 6 of 24 Flights</p>
                </div>{/* end btn-box */}
              </div>{/* end col-lg-12 */}
            </div>{/* end row */}
          </div>{/* end container */}
        </section>{/* end card-area */}
        {/* ================================
    END CARD AREA
================================= */}
        <div className="section-block" />
        {/* ================================
    START INFO AREA
================================= */}
        <section className="info-area info-bg padding-top-90px padding-bottom-70px">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 responsive-column">
                <a href="#" className="icon-box icon-layout-2 d-flex">
                  <div className="info-icon flex-shrink-0 bg-rgb text-color-2">
                    <i className="la la-phone" />
                  </div>{/* end info-icon*/}
                  <div className="info-content">
                    <h4 className="info__title">Need Help? Contact us</h4>
                    <p className="info__desc">
                    We are always available to assist you
                    </p>
                  </div>{/* end info-content */}
                </a>{/* end icon-box */}
              </div>{/* end col-lg-4 */}
              <div className="col-lg-4 responsive-column">
                <a href="#" className="icon-box icon-layout-2 d-flex">
                  <div className="info-icon flex-shrink-0 bg-rgb-2 text-color-3">
                    <i className="la la-money" />
                  </div>{/* end info-icon*/}
                  <div className="info-content">
                    <h4 className="info__title">Payments</h4>
                    <p className="info__desc">
                    All payments are processed through secure channels
                    </p>
                  </div>{/* end info-content */}
                </a>{/* end icon-box */}
              </div>{/* end col-lg-4 */}
              <div className="col-lg-4 responsive-column">
                <a href="#" className="icon-box icon-layout-2 d-flex">
                  <div className="info-icon flex-shrink-0 bg-rgb-3 text-color-4">
                    <i className="la la-times" />
                  </div>{/* end info-icon*/}
                  <div className="info-content">
                    <h4 className="info__title">Cancellation Policy</h4>
                    <p className="info__desc">
                    Kindly refer to cancellation policy of Airline
                    </p>
                  </div>{/* end info-content */}
                </a>{/* end icon-box */}
              </div>{/* end col-lg-4 */}
            </div>{/* end row */}
          </div>{/* end container */}
        </section>{/* end info-area */}
        {/* ================================
    END INFO AREA
================================= */}
        {/* ================================
    START CTA AREA
================================= */}
        <section className="cta-area subscriber-area section-bg-2 padding-top-60px padding-bottom-60px">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="section-heading">
                  <h2 className="sec__title font-size-30 text-white">Subscribe to see Secret Deals</h2>
                </div>{/* end section-heading */}
              </div>{/* end col-lg-7 */}
              <div className="col-lg-5">
                <div className="subscriber-box">
                  <div className="contact-form-action">
                    <form action="#">
                      <div className="input-box">
                        <label className="label-text text-white">Enter email address</label>
                        <div className="form-group mb-0">
                          <span className="la la-envelope form-icon" />
                          <input className="form-control" type="email" name="email" placeholder="Email address" />
                          <button className="theme-btn theme-btn-small submit-btn" type="submit">Subscribe</button>
                          <span className="font-size-14 pt-1 text-white-50"><i className="la la-lock mr-1" />Don't worry your information is safe with us.</span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>{/* end section-heading */}
              </div>{/* end col-lg-5 */}
            </div>{/* end row */}
          </div>{/* end container */}
        </section>{/* end cta-area */}
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
export default withRouter(FlightList);
