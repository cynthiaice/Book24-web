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

class DetailRoom extends Component {
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
    START ROOM DETAIL BREAD
================================= */}
<section className="room-detail-bread">
          <div className="full-width-slider carousel-action">
            <div className="full-width-slide-item">
              <img src="images/img30.jpg" alt="" />
            </div>{/* end full-width-slide-item */}
            <div className="full-width-slide-item">
              <img src="images/img31.jpg" alt="" />
            </div>{/* end full-width-slide-item */}
            <div className="full-width-slide-item">
              <img src="images/img32.jpg" alt="" />
            </div>{/* end full-width-slide-item */}
            <div className="full-width-slide-item">
              <img src="images/img33.jpg" alt="" />
            </div>{/* end full-width-slide-item */}
            <div className="full-width-slide-item">
              <img src="images/img34.jpg" alt="" />
            </div>{/* end full-width-slide-item */}
          </div>{/* end full-width-slider */}
        </section>{/* end room-detail-bread */}
        {/* ================================
    END ROOM DETAIL BREAD
================================= */}
        {/* ================================
    START TOUR DETAIL AREA
================================= */}
        <section className="tour-detail-area padding-bottom-90px">
          <div className="single-content-navbar-wrap menu section-bg" id="single-content-navbar">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="single-content-nav" id="single-content-nav">
                    <ul>
                      <li><a data-scroll="description" href="#description" className="scroll-link active">Description</a></li>
                      <li><a data-scroll="services" href="#services" className="scroll-link">Services</a></li>
                      <li><a data-scroll="amenities" href="#amenities" className="scroll-link">Amenities</a></li>
                      <li><a data-scroll="location-map" href="#location-map" className="scroll-link">Map</a></li>
                      <li><a data-scroll="reviews" href="#reviews" className="scroll-link">Reviews</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>{/* end single-content-navbar-wrap */}
          <div className="single-content-box">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="single-content-wrap padding-top-60px">
                    <div id="description" className="page-scroll">
                      <div className="single-content-item pb-4">
                        <h3 className="title font-size-26">Premium Lake View Room</h3>
                        <p className="pt-2">
                          <span className="badge badge-warning text-white font-size-16">4.6</span>
                          <span>(4,209 Reviews)</span>
                        </p>
                      </div>{/* end single-content-item */}
                      <div className="section-block" />
                      <div className="single-content-item padding-top-30px padding-bottom-40px">
                        <h3 className="title font-size-20">Description</h3>
                        <p className="py-3">Per consequat adolescens ex, cu nibh commune temporibus vim, ad sumo viris eloquentiam sed. Mea appareat omittantur eloquentiam ad, nam ei quas oportere democritum. Prima causae admodum id est, ei timeam inimicus sed. Sit an meis aliquam, cetero inermis vel ut. An sit illum euismod facilisis, tamquam vulputate pertinacia eum.</p>
                        <p className="pb-4">Cum et probo menandri. Officiis consulatu pro et, ne sea sale invidunt, sed ut sint blandit efficiendi. Atomorum explicari eu qui, est enim quaerendum te. Quo harum viris id. Per ne quando dolore evertitur, pro ad cibo commune.</p>
                        <h3 className="title font-size-15 font-weight-medium pb-3">House Rules</h3>
                        <ul className="list-items">
                          <li><i className="la la-dot-circle mr-2" />No smoking, parties or events.</li>
                          <li><i className="la la-dot-circle mr-2" />Check-in time is 2 PM - 4 PM and check-out by 10 AM.</li>
                        </ul>
                      </div>{/* end single-content-item */}
                      <div className="section-block" />
                    </div>{/* end description */}
                    <div id="services" className="page-scroll">
                      <div className="single-content-item padding-top-40px padding-bottom-40px">
                        <h3 className="title font-size-20">Services</h3>
                        <div className="row pt-4">
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-check-circle" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Bicycle Hire</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-check-circle" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Conference Rooms</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-check-circle" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Fruit Basket</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-check-circle" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Massage</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-check-circle" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Sightseeing</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-check-circle" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Car Hire</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-check-circle" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Fitness Center</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-check-circle" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Laundry</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-check-circle" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Own Parking Space</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-check-circle" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Wake-Up Call</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                        </div>{/* end row */}
                      </div>{/* end single-content-item */}
                      <div className="section-block" />
                    </div>{/* end itinerary */}
                    <div id="amenities" className="page-scroll">
                      <div className="single-content-item padding-top-40px padding-bottom-40px">
                        <h3 className="title font-size-20">Amenities</h3>
                        <div className="row pt-4">
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-couch" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">2 Seater Sofa</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-television" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">40-Inch Samsung LED TV</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-gear" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Butler Service</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-wifi" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Free Wi – Fi</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-swimming-pool" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Private Pool</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-user" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">24h Room Service</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-air-freshener" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Air Conditioning</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-phone" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Direct Dial Phone</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-bullhorn" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Hair Dryer</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-bathtub" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Bathtub</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-hand-holding-usd" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Safe Deposit Box</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                          <div className="col-lg-4 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-luggage-cart" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Luggage storage</h3>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>{/* end col-lg-4 */}
                        </div>{/* end row */}
                      </div>{/* end single-content-item */}
                      <div className="section-block" />
                    </div>{/* end itinerary */}
                    <div id="location-map" className="page-scroll">
                      <div className="single-content-item padding-top-40px padding-bottom-40px">
                        <h3 className="title font-size-20">Location</h3>
                        <div className="map-container padding-top-30px">
                          <div id="map" />
                        </div>{/* end map-container */}
                      </div>{/* end single-content-item */}
                      <div className="section-block" />
                    </div>{/* end location-map */}
                    <div id="reviews" className="page-scroll">
                      <div className="single-content-item padding-top-40px padding-bottom-40px">
                        <h3 className="title font-size-20">Reviews</h3>
                        <div className="review-container padding-top-30px">
                          <div className="row align-items-center">
                            <div className="col-lg-4">
                              <div className="review-summary">
                                <h2>4.5<span>/5</span></h2>
                                <p>Excellent</p>
                                <span>Based on 4 reviews</span>
                              </div>
                            </div>{/* end col-lg-4 */}
                            <div className="col-lg-8">
                              <div className="review-bars">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="progress-item">
                                      <h3 className="progressbar-title">Service</h3>
                                      <div className="progressbar-content line-height-20 d-flex align-items-center justify-content-between">
                                        <div className="progressbar-box flex-shrink-0">
                                          <div className="progressbar-line" data-percent="70%">
                                            <div className="progressbar-line-item bar-bg-1" />
                                          </div> {/* End Skill Bar */}
                                        </div>
                                        <div className="bar-percent">4.6</div>
                                      </div>
                                    </div>{/* end progress-item */}
                                  </div>{/* end col-lg-6 */}
                                  <div className="col-lg-6">
                                    <div className="progress-item">
                                      <h3 className="progressbar-title">Location</h3>
                                      <div className="progressbar-content line-height-20 d-flex align-items-center justify-content-between">
                                        <div className="progressbar-box flex-shrink-0">
                                          <div className="progressbar-line" data-percent="55%">
                                            <div className="progressbar-line-item bar-bg-2" />
                                          </div> {/* End Skill Bar */}
                                        </div>
                                        <div className="bar-percent">4.7</div>
                                      </div>
                                    </div>{/* end progress-item */}
                                  </div>{/* end col-lg-6 */}
                                  <div className="col-lg-6">
                                    <div className="progress-item">
                                      <h3 className="progressbar-title">Value for Money</h3>
                                      <div className="progressbar-content line-height-20 d-flex align-items-center justify-content-between">
                                        <div className="progressbar-box flex-shrink-0">
                                          <div className="progressbar-line" data-percent="40%">
                                            <div className="progressbar-line-item bar-bg-3" />
                                          </div> {/* End Skill Bar */}
                                        </div>
                                        <div className="bar-percent">2.6</div>
                                      </div>
                                    </div>{/* end progress-item */}
                                  </div>{/* end col-lg-6 */}
                                  <div className="col-lg-6">
                                    <div className="progress-item">
                                      <h3 className="progressbar-title">Cleanliness</h3>
                                      <div className="progressbar-content line-height-20 d-flex align-items-center justify-content-between">
                                        <div className="progressbar-box flex-shrink-0">
                                          <div className="progressbar-line" data-percent="60%">
                                            <div className="progressbar-line-item bar-bg-4" />
                                          </div> {/* End Skill Bar */}
                                        </div>
                                        <div className="bar-percent">3.6</div>
                                      </div>
                                    </div>{/* end progress-item */}
                                  </div>{/* end col-lg-6 */}
                                  <div className="col-lg-6">
                                    <div className="progress-item">
                                      <h3 className="progressbar-title">Facilities</h3>
                                      <div className="progressbar-content line-height-20 d-flex align-items-center justify-content-between">
                                        <div className="progressbar-box flex-shrink-0">
                                          <div className="progressbar-line" data-percent="50%">
                                            <div className="progressbar-line-item bar-bg-5" />
                                          </div> {/* End Skill Bar */}
                                        </div>
                                        <div className="bar-percent">2.6</div>
                                      </div>
                                    </div>{/* end progress-item */}
                                  </div>{/* end col-lg-6 */}
                                </div>{/* end row */}
                              </div>
                            </div>{/* end col-lg-8 */}
                          </div>
                        </div>
                      </div>{/* end single-content-item */}
                      <div className="section-block" />
                    </div>{/* end reviews */}
                    <div className="review-box">
                      <div className="single-content-item padding-top-40px">
                        <h3 className="title font-size-20">Showing 3 guest reviews</h3>
                        <div className="comments-list padding-top-50px">
                          <div className="comment">
                            <div className="comment-avatar">
                              <img className="avatar__img" alt="" src="images/team8.jpg" />
                            </div>
                            <div className="comment-body">
                              <div className="meta-data">
                                <h3 className="comment__author">Jenny Doe</h3>
                                <div className="meta-data-inner d-flex">
                                  <span className="ratings d-flex align-items-center mr-1">
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                  </span>
                                  <p className="comment__date">April 5, 2019</p>
                                </div>
                              </div>
                              <p className="comment-content">
                                Lorem ipsum dolor sit amet, dolores mandamus moderatius ea ius, sed civibus vivendum imperdiet ei, amet tritani sea id. Ut veri diceret fierent mei, qui facilisi suavitate euripidis
                              </p>
                              <div className="comment-reply d-flex align-items-center justify-content-between">
                                <a className="theme-btn" href="#" data-toggle="modal" data-target="#replayPopupForm">
                                  <span className="la la-mail-reply mr-1" />Reply
                                </a>
                                <div className="reviews-reaction">
                                  <a href="#" className="comment-like"><i className="la la-thumbs-up" /> 13</a>
                                  <a href="#" className="comment-dislike"><i className="la la-thumbs-down" /> 2</a>
                                  <a href="#" className="comment-love"><i className="la la-heart-o" /> 5</a>
                                </div>
                              </div>
                            </div>
                          </div>{/* end comments */}
                          <div className="comment comment-reply-item">
                            <div className="comment-avatar">
                              <img className="avatar__img" alt="" src="images/team9.jpg" />
                            </div>
                            <div className="comment-body">
                              <div className="meta-data">
                                <h3 className="comment__author">Jenny Doe</h3>
                                <div className="meta-data-inner d-flex">
                                  <span className="ratings d-flex align-items-center mr-1">
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                  </span>
                                  <p className="comment__date">April 5, 2019</p>
                                </div>
                              </div>
                              <p className="comment-content">
                                Lorem ipsum dolor sit amet, dolores mandamus moderatius ea ius, sed civibus vivendum imperdiet ei, amet tritani sea id. Ut veri diceret fierent mei, qui facilisi suavitate euripidis
                              </p>
                              <div className="comment-reply d-flex align-items-center justify-content-between">
                                <a className="theme-btn" href="#" data-toggle="modal" data-target="#replayPopupForm">
                                  <span className="la la-mail-reply mr-1" />Reply
                                </a>
                                <div className="reviews-reaction">
                                  <a href="#" className="comment-like"><i className="la la-thumbs-up" /> 13</a>
                                  <a href="#" className="comment-dislike"><i className="la la-thumbs-down" /> 2</a>
                                  <a href="#" className="comment-love"><i className="la la-heart-o" /> 5</a>
                                </div>
                              </div>
                            </div>
                          </div>{/* end comments */}
                          <div className="comment">
                            <div className="comment-avatar">
                              <img className="avatar__img" alt="" src="images/team10.jpg" />
                            </div>
                            <div className="comment-body">
                              <div className="meta-data">
                                <h3 className="comment__author">Jenny Doe</h3>
                                <div className="meta-data-inner d-flex">
                                  <span className="ratings d-flex align-items-center mr-1">
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                    <i className="la la-star" />
                                  </span>
                                  <p className="comment__date">April 5, 2019</p>
                                </div>
                              </div>
                              <p className="comment-content">
                                Lorem ipsum dolor sit amet, dolores mandamus moderatius ea ius, sed civibus vivendum imperdiet ei, amet tritani sea id. Ut veri diceret fierent mei, qui facilisi suavitate euripidis
                              </p>
                              <div className="comment-reply d-flex align-items-center justify-content-between">
                                <a className="theme-btn" href="#" data-toggle="modal" data-target="#replayPopupForm">
                                  <span className="la la-mail-reply mr-1" />Reply
                                </a>
                                <div className="reviews-reaction">
                                  <a href="#" className="comment-like"><i className="la la-thumbs-up" /> 13</a>
                                  <a href="#" className="comment-dislike"><i className="la la-thumbs-down" /> 2</a>
                                  <a href="#" className="comment-love"><i className="la la-heart-o" /> 5</a>
                                </div>
                              </div>
                            </div>
                          </div>{/* end comments */}
                          <div className="btn-box load-more text-center">
                            <button className="theme-btn theme-btn-small theme-btn-transparent" type="button">Load More Review</button>
                          </div>
                        </div>{/* end comments-list */}
                        <div className="comment-forum padding-top-40px">
                          <div className="form-box">
                            <div className="form-title-wrap">
                              <h3 className="title">Write a Review</h3>
                            </div>{/* form-title-wrap */}
                            <div className="form-content">
                              <div className="rate-option p-2">
                                <div className="row">
                                  <div className="col-lg-4 responsive-column">
                                    <div className="rate-option-item">
                                      <label>Service</label>
                                      <div className="rate-stars-option">
                                        <input type="checkbox" id="lst1" defaultValue={1} />
                                        <label htmlFor="lst1" />
                                        <input type="checkbox" id="lst2" defaultValue={2} />
                                        <label htmlFor="lst2" />
                                        <input type="checkbox" id="lst3" defaultValue={3} />
                                        <label htmlFor="lst3" />
                                        <input type="checkbox" id="lst4" defaultValue={4} />
                                        <label htmlFor="lst4" />
                                        <input type="checkbox" id="lst5" defaultValue={5} />
                                        <label htmlFor="lst5" />
                                      </div>
                                    </div>
                                  </div>{/* col-lg-4 */}
                                  <div className="col-lg-4 responsive-column">
                                    <div className="rate-option-item">
                                      <label>Location</label>
                                      <div className="rate-stars-option">
                                        <input type="checkbox" id="l1" defaultValue={1} />
                                        <label htmlFor="l1" />
                                        <input type="checkbox" id="l2" defaultValue={2} />
                                        <label htmlFor="l2" />
                                        <input type="checkbox" id="l3" defaultValue={3} />
                                        <label htmlFor="l3" />
                                        <input type="checkbox" id="l4" defaultValue={4} />
                                        <label htmlFor="l4" />
                                        <input type="checkbox" id="l5" defaultValue={5} />
                                        <label htmlFor="l5" />
                                      </div>
                                    </div>
                                  </div>{/* col-lg-4 */}
                                  <div className="col-lg-4 responsive-column">
                                    <div className="rate-option-item">
                                      <label>Value for Money</label>
                                      <div className="rate-stars-option">
                                        <input type="checkbox" id="vm1" defaultValue={1} />
                                        <label htmlFor="vm1" />
                                        <input type="checkbox" id="vm2" defaultValue={2} />
                                        <label htmlFor="vm2" />
                                        <input type="checkbox" id="vm3" defaultValue={3} />
                                        <label htmlFor="vm3" />
                                        <input type="checkbox" id="vm4" defaultValue={4} />
                                        <label htmlFor="vm4" />
                                        <input type="checkbox" id="vm5" defaultValue={5} />
                                        <label htmlFor="vm5" />
                                      </div>
                                    </div>
                                  </div>{/* col-lg-4 */}
                                  <div className="col-lg-4 responsive-column">
                                    <div className="rate-option-item">
                                      <label>Cleanliness</label>
                                      <div className="rate-stars-option">
                                        <input type="checkbox" id="cln1" defaultValue={1} />
                                        <label htmlFor="cln1" />
                                        <input type="checkbox" id="cln2" defaultValue={2} />
                                        <label htmlFor="cln2" />
                                        <input type="checkbox" id="cln3" defaultValue={3} />
                                        <label htmlFor="cln3" />
                                        <input type="checkbox" id="cln4" defaultValue={4} />
                                        <label htmlFor="cln4" />
                                        <input type="checkbox" id="cln5" defaultValue={5} />
                                        <label htmlFor="cln5" />
                                      </div>
                                    </div>
                                  </div>{/* col-lg-4 */}
                                  <div className="col-lg-4 responsive-column">
                                    <div className="rate-option-item">
                                      <label>Facilities</label>
                                      <div className="rate-stars-option">
                                        <input type="checkbox" id="f1" defaultValue={1} />
                                        <label htmlFor="f1" />
                                        <input type="checkbox" id="f2" defaultValue={2} />
                                        <label htmlFor="f2" />
                                        <input type="checkbox" id="f3" defaultValue={3} />
                                        <label htmlFor="f3" />
                                        <input type="checkbox" id="f4" defaultValue={4} />
                                        <label htmlFor="f4" />
                                        <input type="checkbox" id="f5" defaultValue={5} />
                                        <label htmlFor="f5" />
                                      </div>
                                    </div>
                                  </div>{/* col-lg-4 */}
                                </div>{/* end row */}
                              </div>{/* end rate-option */}
                              <div className="contact-form-action">
                                <form method="post">
                                  <div className="row">
                                    <div className="col-lg-6 responsive-column">
                                      <div className="input-box">
                                        <label className="label-text">Name</label>
                                        <div className="form-group">
                                          <span className="la la-user form-icon" />
                                          <input className="form-control" type="text" name="text" placeholder="Your name" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6 responsive-column">
                                      <div className="input-box">
                                        <label className="label-text">Email</label>
                                        <div className="form-group">
                                          <span className="la la-envelope-o form-icon" />
                                          <input className="form-control" type="email" name="email" placeholder="Email address" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <div className="input-box">
                                        <label className="label-text">Message</label>
                                        <div className="form-group">
                                          <span className="la la-pencil form-icon" />
                                          <textarea className="message-control form-control" name="message" placeholder="Write message" defaultValue={""} />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <div className="btn-box">
                                        <button type="button" className="theme-btn">Leave a Review</button>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>{/* end contact-form-action */}
                            </div>{/* end form-content */}
                          </div>{/* end form-box */}
                        </div>{/* end comment-forum */}
                      </div>{/* end single-content-item */}
                    </div>{/* end review-box */}
                  </div>{/* end single-content-wrap */}
                </div>{/* end col-lg-8 */}
                <div className="col-lg-4">
                  <div className="sidebar single-content-sidebar mb-0">
                    <div className="sidebar-widget single-content-widget">
                      <h3 className="title stroke-shape">Your Reservation</h3>
                      <div className="sidebar-widget-item">
                        <div className="contact-form-action">
                          <form action="#">
                            <div className="input-box">
                              <label className="label-text">Check-in</label>
                              <div className="form-group">
                                <span className="la la-calendar form-icon" />
                                <input className="date-range form-control" type="text" name="daterange-single" defaultValue="04/28/2020" />
                              </div>
                            </div>
                            <div className="input-box">
                              <label className="label-text">Check-out</label>
                              <div className="form-group">
                                <span className="la la-calendar form-icon" />
                                <input className="date-range form-control" type="text" name="daterange-single" defaultValue="04/28/2020" />
                              </div>
                            </div>
                            <div className="input-box">
                              <label className="label-text">Rooms</label>
                              <div className="form-group">
                                <div className="select-contain w-auto">
                                  <select className="select-contain-select">
                                    <option value={0}>Select Room</option>
                                    <option value={1} selected>1 Room</option>
                                    <option value={2}>2 Rooms</option>
                                    <option value={3}>3 Rooms</option>
                                    <option value={4}>4 Rooms</option>
                                    <option value={5}>5 Rooms</option>
                                    <option value={6}>6 Rooms</option>
                                    <option value={7}>7 Rooms</option>
                                    <option value={8}>8 Rooms</option>
                                    <option value={9}>9 Rooms</option>
                                    <option value={10}>10 Rooms</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>{/* end sidebar-widget-item */}
                      <div className="sidebar-widget-item">
                        <div className="qty-box mb-2 d-flex align-items-center justify-content-between">
                          <label className="font-size-16">Adults <span>Age 18+</span></label>
                          <div className="qtyBtn d-flex align-items-center">
                            <input type="text" name="qtyInput" defaultValue={1} />
                          </div>
                        </div>{/* end qty-box */}
                        <div className="qty-box mb-2 d-flex align-items-center justify-content-between">
                          <label className="font-size-16">Children <span>2-12 years old</span></label>
                          <div className="qtyBtn d-flex align-items-center">
                            <input type="text" name="qtyInput" defaultValue={1} />
                          </div>
                        </div>{/* end qty-box */}
                        <div className="qty-box mb-2 d-flex align-items-center justify-content-between">
                          <label className="font-size-16">Infants <span>0-2 years old</span></label>
                          <div className="qtyBtn d-flex align-items-center">
                            <input type="text" name="qtyInput" defaultValue={0} />
                          </div>
                        </div>{/* end qty-box */}
                      </div>{/* end sidebar-widget-item */}
                      <div className="sidebar-widget-item py-4">
                        <h3 className="title stroke-shape">Extra Services</h3>
                        <div className="extra-service-wrap">
                          <form action="#" method="post" className="extraServiceForm" id="extraServiceForm">
                            <div id="checkboxContainPrice">
                              <div className="custom-checkbox">
                                <input type="checkbox" name="cleaning" id="cleaningChb" defaultValue={15.00} />
                                <label htmlFor="cleaningChb" className="d-flex justify-content-between align-items-center">Cleaning Fee <span className="text-black font-weight-regular">$15</span></label>
                              </div>
                              <div className="custom-checkbox">
                                <input type="checkbox" name="airport-pickup" id="airportPickupChb" defaultValue={20.00} />
                                <label htmlFor="airportPickupChb" className="d-flex justify-content-between align-items-center">Airport pickup <span className="text-black font-weight-regular">$20</span></label>
                              </div>
                              <div className="custom-checkbox">
                                <input type="checkbox" name="breakfast" id="breakfastChb" defaultValue={10.00} />
                                <label htmlFor="breakfastChb" className="d-flex justify-content-between align-items-center">Breakfast <span className="text-black font-weight-regular">$10/ per person</span></label>
                              </div>
                              <div className="custom-checkbox">
                                <input type="checkbox" name="parking" id="parkingChb" defaultValue={5.00} />
                                <label htmlFor="parkingChb" className="d-flex justify-content-between align-items-center">Parking <span className="text-black font-weight-regular">$5/ per night</span></label>
                              </div>
                            </div>
                            <div className="total-price pt-3">
                              <p className="text-black">Your Price</p>
                              <p className="d-flex align-items-center"><span className="font-size-17 text-black">$</span> <input type="text" name="total" className="num" defaultValue={80.00} readOnly="readonly" /><span>/ per room</span></p>
                            </div>
                          </form>
                        </div>
                      </div>{/* end sidebar-widget-item */}
                      <div className="btn-box">
                        <a href="cart.html" className="theme-btn text-center w-100 mb-2">Book Now</a>
                      </div>
                    </div>{/* end sidebar-widget */}
                    <div className="sidebar-widget single-content-widget">
                      <h3 className="title stroke-shape">Why Book With Us?</h3>
                      <div className="sidebar-list">
                        <ul className="list-items">
                          <li><i className="la la-dollar icon-element mr-2" />No-hassle best price guarantee</li>
                          <li><i className="la la-microphone icon-element mr-2" />Customer care available 24/7</li>
                          <li><i className="la la-thumbs-up icon-element mr-2" />Hand-picked Tours &amp; Activities</li>
                          <li><i className="la la-file-text icon-element mr-2" />Free Travel Insureance</li>
                        </ul>
                      </div>{/* end sidebar-list */}
                    </div>{/* end sidebar-widget */}
                    <div className="sidebar-widget single-content-widget">
                      <h3 className="title stroke-shape">Get a Question?</h3>
                      <p className="font-size-14 line-height-24">Do not hesitate to give us a call. We are an expert team and we are happy to talk to you.</p>
                      <div className="sidebar-list pt-3">
                        <ul className="list-items">
                          <li><i className="la la-phone icon-element mr-2" /><a href="#">+ 61 23 8093 3400</a></li>
                          <li><i className="la la-envelope icon-element mr-2" /><a href="mailto:info@trizen.com">info@trizen.com</a></li>
                        </ul>
                      </div>{/* end sidebar-list */}
                    </div>{/* end sidebar-widget */}
                  </div>{/* end sidebar */}
                </div>{/* end col-lg-4 */}
              </div>{/* end row */}
            </div>{/* end container */}
          </div>{/* end single-content-box */}
        </section>{/* end tour-detail-area */}
        {/* ================================
    END TOUR DETAIL AREA
================================= */}
        <div className="section-block" />
        {/* ================================
    START RELATE TOUR AREA
================================= */}
        <section className="related-tour-area section--padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-heading text-center">
                  <h2 className="sec__title">Other Rooms</h2>
                  <p className="sec__desc">Could also be interest for you</p>
                </div>{/* end section-heading */}
              </div>{/* end col-lg-12 */}
            </div>{/* end row */}
            <div className="row padding-top-50px">
              <div className="col-lg-6">
                <div className="card-item room-card">
                  <div className="card-img-carousel carousel-action carousel--action">
                    <div className="card-img">
                      <a href="room-details.html" className="d-block">
                        <img src="images/img5.jpg" alt="hotel-img" />
                      </a>
                    </div>
                    <div className="card-img">
                      <a href="room-details.html" className="d-block">
                        <img src="images/img29.jpg" alt="hotel-img" />
                      </a>
                    </div>
                    <div className="card-img">
                      <a href="room-details.html" className="d-block">
                        <img src="images/img30.jpg" alt="hotel-img" />
                      </a>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-price pb-2">
                      <p>
                        <span className="price__from">From</span>
                        <span className="price__num">$88.00</span>
                      </p>
                    </div>
                    <h3 className="card-title font-size-26"><a href="room-details.html">Premium Lake View Room</a></h3>
                    <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                    <div className="card-attributes pt-3 pb-4">
                      <ul className="d-flex align-items-center">
                        <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                        <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                        <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                      </ul>
                    </div>
                    <div className="card-btn d-flex align-items-center">
                      <div className="btn-box">
                        <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                      </div>
                    </div>
                  </div>
                </div>{/* end card-item */}
              </div>{/* end col-lg-6 */}
              <div className="col-lg-6">
                <div className="card-item room-card">
                  <div className="card-img-carousel carousel-action carousel--action">
                    <div className="card-img">
                      <a href="room-details.html" className="d-block">
                        <img src="images/img31.jpg" alt="hotel-img" />
                      </a>
                    </div>
                    <div className="card-img">
                      <a href="room-details.html" className="d-block">
                        <img src="images/img32.jpg" alt="hotel-img" />
                      </a>
                    </div>
                    <div className="card-img">
                      <a href="room-details.html" className="d-block">
                        <img src="images/img33.jpg" alt="hotel-img" />
                      </a>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-price pb-2">
                      <p>
                        <span className="price__from">From</span>
                        <span className="price__num">$45.00</span>
                      </p>
                    </div>
                    <h3 className="card-title font-size-26"><a href="room-details.html">Standard 2 Bed Male Dorm</a></h3>
                    <p className="card-text pt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores commodi deleniti hic inventore laboriosam laborum molestias, non odit quaerat! Aperiam culpa facilis fuga impedit.</p>
                    <div className="card-attributes pt-3 pb-4">
                      <ul className="d-flex align-items-center">
                        <li className="d-flex align-items-center"><i className="la la-bed" /><span>2 Beds</span></li>
                        <li className="d-flex align-items-center"><i className="la la-building" /><span>24 ft<sup>2</sup></span></li>
                        <li className="d-flex align-items-center"><i className="la la-bathtub" /><span>2 Bathrooms</span></li>
                      </ul>
                    </div>
                    <div className="card-btn d-flex align-items-center">
                      <div className="btn-box">
                        <a href="room-details.html" className="theme-btn theme-btn-transparent">Book Now</a>
                      </div>
                    </div>
                  </div>
                </div>{/* end card-item */}
              </div>{/* end col-lg-6 */}
            </div>{/* end row */}
          </div>{/* end container */}
        </section>{/* end related-tour-area */}
        {/* ================================
    END RELATE TOUR AREA
================================= */}
        {/* ================================
    START CTA AREA
================================= */}
        <section className="cta-area subscriber-area section-bg-2 padding-top-60px padding-bottom-60px">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="section-heading">
                  <p className="sec__desc text-white-50 pb-1">Newsletter sign up</p>
                  <h2 className="sec__title font-size-30 text-white">Subscribe to Get Special Offers</h2>
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
export default withRouter(DetailRoom);
