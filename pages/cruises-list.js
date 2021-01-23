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

class CruisesList extends Component {
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
<section className="breadcrumb-area bread-bg-3">
          <div className="breadcrumb-wrap">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="breadcrumb-content">
                    <div className="section-heading">
                      <h2 className="sec__title">Cruise List</h2>
                    </div>
                  </div>{/* end breadcrumb-content */}
                </div>{/* end col-lg-6 */}
                <div className="col-lg-6">
                  <div className="breadcrumb-list">
                    <ul className="list-items d-flex justify-content-end">
                      <li><a href="index.html">Home</a></li>
                      <li>Cruise</li>
                      <li>Cruise List</li>
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
                      <h3 className="title font-size-24">24 Cruises found</h3>
                      <p className="font-size-14 line-height-20 pt-1">Book with confidence</p>
                    </div>
                    <div className="layout-view d-flex align-items-center">
                      <a href="cruises.html" data-toggle="tooltip" data-placement="top" title="Grid View"><i className="la la-th-large" /></a>
                      <a href="cruises-list.html" data-toggle="tooltip" data-placement="top" title="List View" className="active"><i className="la la-th-list" /></a>
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
                            Categories
                          </a>
                          <div className="dropdown-menu dropdown-menu-wrap">
                            <div className="dropdown-item">
                              <div className="checkbox-wrap">
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="catChb1" />
                                  <label htmlFor="catChb1">Any Cruise line</label>
                                </div>
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="catChb2" />
                                  <label htmlFor="catChb2">Carnival Cruise lines</label>
                                </div>
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="catChb3" />
                                  <label htmlFor="catChb3">Celebrity Cruise</label>
                                </div>
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="catChb4" />
                                  <label htmlFor="catChb4">Disney Cruise line</label>
                                </div>
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="catChb5" />
                                  <label htmlFor="catChb5">Holland America line</label>
                                </div>
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="catChb6" />
                                  <label htmlFor="catChb6">MSC Cruise</label>
                                </div>
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="catChb7" />
                                  <label htmlFor="catChb7">Norwegian Cruise line</label>
                                </div>
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="catChb8" />
                                  <label htmlFor="catChb8">Royal Caribbean</label>
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
                        <option value={2}>New Cruise</option>
                        <option value={3}>Popular Cruise</option>
                        <option value={4}>Price: low to high</option>
                        <option value={5}>Price: high to low</option>
                        <option value={6}>A to Z</option>
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
                    <h3 className="title stroke-shape">Search Cruises</h3>
                    <div className="sidebar-widget-item">
                      <div className="contact-form-action">
                        <form action="#">
                          <div className="input-box">
                            <label className="label-text">Going to</label>
                            <div className="form-group">
                              <div className="select-contain w-auto">
                                <select className="select-contain-select">
                                  <option value>Select destination</option>
                                  <optgroup label="Most Popular">
                                    <option value="caribbean">Caribbean</option>
                                    <option value="bahamas">Bahamas</option>
                                    <option value="mexico">Mexico</option>
                                    <option value="alaska">Alaska</option>
                                    <option value="europe">Europe</option>
                                    <option value="bermuda">Bermuda</option>
                                    <option value="hawaii">Hawaii</option>
                                    <option value="nepal">Nepal</option>
                                    <option value="italy">Italy</option>
                                    <option value="canada-new-england">Canada / New England</option>
                                  </optgroup>
                                  <optgroup label="Other Destinations">
                                    <option value="arctic-antarctic">Arctic / Antarctic</option>
                                    <option value="middle-east">Middle East</option>
                                    <option value="africa">Africa</option>
                                    <option value="panama-canal">Panama Canal</option>
                                    <option value="asia">Asia</option>
                                    <option value="pacific-coastal">Pacific Coastal</option>
                                    <option value="australia-new-zealand">Australia / New Zealand</option>
                                    <option value="central-america">Central America</option>
                                    <option value="galapagos">Galapagos</option>
                                    <option value="getaway-at-sea">Getaway at Sea</option>
                                    <option value="transatlantic">Transatlantic</option>
                                    <option value="world-cruise">World</option>
                                    <option value="south-america">South America</option>
                                    <option value="south-pacific">South Pacific</option>
                                    <option value="transpacific">Transpacific</option>
                                  </optgroup>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="input-box">
                            <label className="label-text">Departs as early as</label>
                            <div className="form-group">
                              <span className="la la-calendar form-icon" />
                              <input className="date-range form-control" type="text" name="daterange-single" defaultValue="04/28/2020" />
                            </div>
                          </div>
                          <div className="input-box">
                            <label className="label-text">Departs as late as</label>
                            <div className="form-group">
                              <span className="la la-calendar form-icon" />
                              <input className="date-range form-control" type="text" name="daterange-single" defaultValue="04/28/2020" />
                            </div>
                          </div>
                          <div className="input-box">
                            <label className="label-text">Cruise Lines</label>
                            <div className="form-group">
                              <div className="select-contain w-auto">
                                <select className="select-contain-select">
                                  <option value={1}>Popular Cruises</option>
                                  <option value={2}>Luxury Cruises</option>
                                  <option value={3}>River Cruises</option>
                                </select>
                              </div>{/* end select-contain */}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>{/* end sidebar-widget-item */}
                    <div className="btn-box pt-2">
                      <a href="cruise-search-result.html" className="theme-btn">Search Now</a>
                    </div>
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
                    <h3 className="title stroke-shape">Review Score</h3>
                    <div className="sidebar-category">
                      <div className="custom-checkbox">
                        <input type="checkbox" id="r6" />
                        <label htmlFor="r6">Excellent</label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="r7" />
                        <label htmlFor="r7">Very Good</label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="r8" />
                        <label htmlFor="r8">Average</label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="r9" />
                        <label htmlFor="r9">Poor</label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="r10" />
                        <label htmlFor="r10">Terrible</label>
                      </div>
                    </div>
                  </div>{/* end sidebar-widget */}
                  <div className="sidebar-widget">
                    <h3 className="title stroke-shape">Filter by Rating</h3>
                    <div className="sidebar-review">
                      <div className="custom-checkbox">
                        <input type="checkbox" id="s1" />
                        <label htmlFor="s1">
                          <span className="ratings d-flex align-items-center">
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <span className="font-size-13 ml-1">(55.590)</span>
                          </span>
                        </label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="s2" />
                        <label htmlFor="s2">
                          <span className="ratings d-flex align-items-center">
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star-o" />
                            <span className="font-size-13 ml-1">(40.590)</span>
                          </span>
                        </label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="s3" />
                        <label htmlFor="s3">
                          <span className="ratings d-flex align-items-center">
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star-o" />
                            <i className="la la-star-o" />
                            <span className="font-size-13 ml-1">(23.590)</span>
                          </span>
                        </label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="s4" />
                        <label htmlFor="s4">
                          <span className="ratings d-flex align-items-center">
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star-o" />
                            <i className="la la-star-o" />
                            <i className="la la-star-o" />
                            <span className="font-size-13 ml-1">(12.590)</span>
                          </span>
                        </label>
                      </div>
                      <div className="custom-checkbox mb-0">
                        <input type="checkbox" id="s5" />
                        <label htmlFor="s5">
                          <span className="ratings d-flex align-items-center">
                            <i className="la la-star" />
                            <i className="la la-star-o" />
                            <i className="la la-star-o" />
                            <i className="la la-star-o" />
                            <i className="la la-star-o" />
                            <span className="font-size-13 ml-1">(590)</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>{/* end sidebar-widget */}
                  <div className="sidebar-widget">
                    <h3 className="title stroke-shape">Categories</h3>
                    <div className="sidebar-category">
                      <div className="custom-checkbox">
                        <input type="checkbox" id="cat1" />
                        <label htmlFor="cat1">All <span className="font-size-13 ml-1">(24)</span></label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="cat2" />
                        <label htmlFor="cat2">Any Cruise line <span className="font-size-13 ml-1">(2)</span></label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="cat3" />
                        <label htmlFor="cat3">Carnival Cruise Lines <span className="font-size-13 ml-1">(2)</span></label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="cat4" />
                        <label htmlFor="cat4">Celebrity Cruises <span className="font-size-13 ml-1">(2)</span></label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="cat5" />
                        <label htmlFor="cat5">Disney Cruise Line <span className="font-size-13 ml-1">(3)</span></label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="cat6" />
                        <label htmlFor="cat6">Holland America Line <span className="font-size-13 ml-1">(1)</span></label>
                      </div>
                      <div className="collapse" id="categoryMenu">
                        <div className="custom-checkbox">
                          <input type="checkbox" id="cat7" />
                          <label htmlFor="cat7">MSC Cruises <span className="font-size-13 ml-1">(1)</span></label>
                        </div>
                        <div className="custom-checkbox">
                          <input type="checkbox" id="cat8" />
                          <label htmlFor="cat8">Norwegian Cruise Line <span className="font-size-13 ml-1">(4)</span></label>
                        </div>
                        <div className="custom-checkbox">
                          <input type="checkbox" id="cat9" />
                          <label htmlFor="cat9">Princess Cruises <span className="font-size-13 ml-1">(6)</span></label>
                        </div>
                        <div className="custom-checkbox">
                          <input type="checkbox" id="cat10" />
                          <label htmlFor="cat10">Royal Caribbean International <span className="font-size-13 ml-1">(3)</span></label>
                        </div>
                      </div>{/* end collapse */}
                      <a className="btn-text" data-toggle="collapse" href="#categoryMenu" role="button" aria-expanded="false" aria-controls="categoryMenu">
                        <span className="show-more">Show More <i className="la la-angle-down" /></span>
                        <span className="show-less">Show Less <i className="la la-angle-up" /></span>
                      </a>
                    </div>
                  </div>{/* end sidebar-widget */}
                </div>{/* end sidebar */}
              </div>{/* end col-lg-4 */}
              <div className="col-lg-8">
                <div className="card-item cruise--card card-item-list">
                  <div className="card-img">
                    <a href="cruise-details.html" className="d-block">
                      <img src="images/cruise-img6.jpg" alt="cruise-img" />
                      <span className="badge">Bestseller</span>
                    </a>
                  </div>
                  <div className="card-body">
                    <img src="images/royal-caribbean.png" alt="" className="cruise-logo" />
                    <h3 className="card-title"><a href="cruise-details.html">7 Nights Caribbean Southern Cruise</a></h3>
                    <p className="card-meta">Departing San Juan</p>
                    <div className="card-rating">
                      <span className="badge text-white">4.4/5</span>
                      <span className="review__text">Very good</span>
                      <span className="rating__text">(30 Reviews)</span>
                    </div>
                    <div className="card-price d-flex align-items-center justify-content-between">
                      <p>
                        <span className="price__from">From</span>
                        <span className="price__num">$399.00</span>
                      </p>
                      <a href="cruise-details.html" className="btn-text">Read details<i className="la la-angle-right" /></a>
                    </div>
                  </div>
                </div>{/* end card-item */}
                <div className="card-item cruise--card card-item-list">
                  <div className="card-img">
                    <a href="cruise-details.html" className="d-block">
                      <img src="images/cruise-img8.jpg" alt="cruise-img" />
                      <span className="badge">Featured</span>
                    </a>
                  </div>
                  <div className="card-body">
                    <img src="images/stenaline.jpg" alt="" className="cruise-logo" />
                    <h3 className="card-title"><a href="cruise-details.html">11 Night Caribbean Cruise</a></h3>
                    <p className="card-meta">Departing Miami</p>
                    <div className="card-rating">
                      <span className="badge text-white">4.4/5</span>
                      <span className="review__text">Supperb</span>
                      <span className="rating__text">(30 Reviews)</span>
                    </div>
                    <div className="card-price d-flex align-items-center justify-content-between">
                      <p>
                        <span className="price__from">From</span>
                        <span className="price__num">$599.00</span>
                      </p>
                      <a href="cruise-details.html" className="btn-text">Read details<i className="la la-angle-right" /></a>
                    </div>
                  </div>
                </div>{/* end card-item */}
                <div className="card-item cruise--card card-item-list">
                  <div className="card-img">
                    <a href="cruise-details.html" className="d-block">
                      <img src="images/cruise-img9.jpg" alt="cruise-img" />
                    </a>
                  </div>
                  <div className="card-body">
                    <img src="images/carnival.png" alt="" className="cruise-logo" />
                    <h3 className="card-title"><a href="cruise-details.html">4 Nights Baja Mexico Cruise</a></h3>
                    <p className="card-meta">Departing Los Angeles</p>
                    <div className="card-rating">
                      <span className="badge text-white">4.4/5</span>
                      <span className="review__text">Average</span>
                      <span className="rating__text">(30 Reviews)</span>
                    </div>
                    <div className="card-price d-flex align-items-center justify-content-between">
                      <p>
                        <span className="price__from">From</span>
                        <span className="price__num">$108.00</span>
                      </p>
                      <a href="cruise-details.html" className="btn-text">Read details<i className="la la-angle-right" /></a>
                    </div>
                  </div>
                </div>{/* end card-item */}
                <div className="card-item cruise--card card-item-list">
                  <div className="card-img">
                    <a href="cruise-details.html" className="d-block">
                      <img src="images/cruise-img7.jpg" alt="cruise-img" />
                      <span className="badge">Bestseller</span>
                    </a>
                  </div>
                  <div className="card-body">
                    <img src="images/msc.png" alt="" className="cruise-logo" />
                    <h3 className="card-title"><a href="cruise-details.html">5 Nights Bermuda Cruise</a></h3>
                    <p className="card-meta">Departing Baltimore</p>
                    <div className="card-rating">
                      <span className="badge text-white">4.4/5</span>
                      <span className="review__text">Amazing</span>
                      <span className="rating__text">(30 Reviews)</span>
                    </div>
                    <div className="card-price d-flex align-items-center justify-content-between">
                      <p>
                        <span className="price__from">From</span>
                        <span className="price__num">$379.00</span>
                      </p>
                      <a href="cruise-details.html" className="btn-text">Read details<i className="la la-angle-right" /></a>
                    </div>
                  </div>
                </div>{/* end card-item */}
                <div className="card-item cruise--card card-item-list">
                  <div className="card-img">
                    <a href="cruise-details.html" className="d-block">
                      <img src="images/cruise-img7.jpg" alt="cruise-img" />
                    </a>
                  </div>
                  <div className="card-body">
                    <img src="images/msc.png" alt="" className="cruise-logo" />
                    <h3 className="card-title"><a href="cruise-details.html">7 - Night Eastern Caribbean Cruise</a></h3>
                    <p className="card-meta">Departing Baltimore</p>
                    <div className="card-rating">
                      <span className="badge text-white">4.4/5</span>
                      <span className="review__text">Amazing</span>
                      <span className="rating__text">(30 Reviews)</span>
                    </div>
                    <div className="card-price d-flex align-items-center justify-content-between">
                      <p>
                        <span className="price__from">From</span>
                        <span className="price__num">$379.00</span>
                      </p>
                      <a href="cruise-details.html" className="btn-text">Read details<i className="la la-angle-right" /></a>
                    </div>
                  </div>
                </div>{/* end card-item */}
                <div className="card-item cruise--card card-item-list">
                  <div className="card-img">
                    <a href="cruise-details.html" className="d-block">
                      <img src="images/cruise-img8.jpg" alt="cruise-img" />
                      <span className="badge">Featured</span>
                    </a>
                  </div>
                  <div className="card-body">
                    <img src="images/stenaline.jpg" alt="" className="cruise-logo" />
                    <h3 className="card-title"><a href="cruise-details.html">11 Night Caribbean Cruise</a></h3>
                    <p className="card-meta">Departing Miami</p>
                    <div className="card-rating">
                      <span className="badge text-white">4.4/5</span>
                      <span className="review__text">Supperb</span>
                      <span className="rating__text">(30 Reviews)</span>
                    </div>
                    <div className="card-price d-flex align-items-center justify-content-between">
                      <p>
                        <span className="price__from">From</span>
                        <span className="price__num">$599.00</span>
                      </p>
                      <a href="cruise-details.html" className="btn-text">Read details<i className="la la-angle-right" /></a>
                    </div>
                  </div>
                </div>{/* end card-item */}
              </div>{/* end col-lg-8 */}
            </div>{/* end row */}
            <div className="row">
              <div className="col-lg-12">
                <div className="btn-box mt-3 text-center">
                  <button type="button" className="theme-btn"><i className="la la-refresh mr-1" />Load More</button>
                  <p className="font-size-13 pt-2">Showing 1 - 6 of 24 Cruises</p>
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
                    Kindly refer to cancellation policy of property/service provider
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
export default withRouter(CruisesList);
