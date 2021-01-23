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

class DetailCruise extends Component {
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
    START BREADCRUMB TOP BAR
================================= */}
<section className="breadcrumb-top-bar">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-list breadcrumb-top-list">
                  <ul className="list-items d-flex justify-content-start">
                    <li><a href="index.html">Home</a></li>
                    <li>Galveston, Texas</li>
                    <li>7 Nights Caribbean Southern Cruise</li>
                  </ul>
                </div>{/* end breadcrumb-list */}
              </div>{/* end col-lg-12 */}
            </div>{/* end row */}
          </div>{/* end container */}
        </section>{/* end breadcrumb-top-bar */}
        {/* ================================
    END BREADCRUMB TOP BAR
================================= */}
        {/* ================================
    START BREADCRUMB AREA
================================= */}
        <section className="breadcrumb-area bread-bg-4 py-0">
          <div className="breadcrumb-wrap">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-btn">
                    <div className="btn-box">
                      <a className="theme-btn" data-fancybox="video" data-src="https://www.youtube.com/watch?v=S5WFxUDs0pE" data-speed={700}>
                        <i className="la la-video-camera mr-2" />Video
                      </a>
                      <a className="theme-btn" data-src="images/cruise-img.jpg" data-fancybox="gallery" data-caption="Showing image - 01" data-speed={700}>
                        <i className="la la-photo mr-2" />More Photos
                      </a>
                    </div>
                    <a className="d-none" data-fancybox="gallery" data-src="images/cruise-img2.jpg" data-caption="Showing image - 02" data-speed={700} />
                    <a className="d-none" data-fancybox="gallery" data-src="images/cruise-img4.jpg" data-caption="Showing image - 03" data-speed={700} />
                    <a className="d-none" data-fancybox="gallery" data-src="images/cruise-img5.jpg" data-caption="Showing image - 04" data-speed={700} />
                  </div>{/* end breadcrumb-btn */}
                </div>{/* end col-lg-12 */}
              </div>{/* end row */}
            </div>{/* end container */}
          </div>{/* end breadcrumb-wrap */}
        </section>{/* end breadcrumb-area */}
        {/* ================================
    END BREADCRUMB AREA
================================= */}
        {/* ================================
    START CRUISE DETAIL AREA
================================= */}
        <section className="cruise-detail-area padding-bottom-90px">
          <div className="single-content-navbar-wrap menu section-bg" id="single-content-navbar">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="single-content-nav" id="single-content-nav">
                    <ul>
                      <li><a data-scroll="description" href="#description" className="scroll-link active">About This ship</a></li>
                      <li><a data-scroll="itinerary" href="#itinerary" className="scroll-link">Itinerary</a></li>
                      <li><a data-scroll="staterooms" href="#staterooms" className="scroll-link">Staterooms</a></li>
                      <li><a data-scroll="faq" href="#faq" className="scroll-link">FAQ</a></li>
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
                        <h3 className="title font-size-26">7 Nights Caribbean Southern Cruise</h3>
                        <div className="d-flex flex-wrap align-items-center pt-2">
                          <p className="mr-2">Galveston, Texas</p>
                          <p>
                            <span className="badge badge-warning text-white font-size-16">4.6</span>
                            <span>(4,209 Reviews)</span>
                          </p>
                        </div>
                      </div>{/* end single-content-item */}
                      <div className="section-block" />
                      <div className="single-content-item padding-top-40px padding-bottom-40px">
                        <h3 className="title font-size-20">Description</h3>
                        <p className="pt-3">Per consequat adolescens ex, cu nibh commune temporibus vim, ad sumo viris eloquentiam sed. Mea appareat omittantur eloquentiam ad, nam ei quas oportere democritum. Prima causae admodum id est, ei timeam inimicus sed. Sit an meis aliquam, cetero inermis vel ut. An sit illum euismod facilisis, tamquam vulputate pertinacia eum at.</p>
                      </div>{/* end single-content-item */}
                      <div className="single-content-item padding-bottom-30px">
                        <h3 className="title font-size-20">Ship Statistics</h3>
                        <div className="row pt-4">
                          <div className="col-lg-6 responsive-column">
                            <ul className="list-items list-items-2">
                              <li><span>Date Launched:</span>1989</li>
                              <li><span>Age of Ship:</span>29 years</li>
                              <li><span>Refurbished Date:</span>01/01/2017</li>
                              <li><span>Tonnage:</span>93,558 grt</li>
                              <li><span>Length:</span>965 ft</li>
                              <li><span>Beam:</span>105 ft</li>
                              <li><span>Draft:</span>28 ft</li>
                              <li><span>Speed:</span>22.5 knots</li>
                            </ul>{/* end list-items */}
                          </div>{/* end col-lg-6 */}
                          <div className="col-lg-6 responsive-column">
                            <ul className="list-items list-items-2">
                              <li><span>Guest Capacity:</span>23,400</li>
                              <li><span>Total Staff:</span>9,078 crew</li>
                              <li><span>Officers:</span>Italian</li>
                              <li><span>Dining Crew:</span>International</li>
                              <li><span>Other Crew:</span>International</li>
                              <li><span>Registry:</span>Panama</li>
                              <li><span>Ship Type:</span>Luxury Cruise</li>
                            </ul>{/* end list-items */}
                          </div>{/* end col-lg-6 */}
                        </div>{/* end row */}
                      </div>{/* end single-content-item */}
                      <div className="single-content-item padding-bottom-40px">
                        <h3 className="title font-size-20 d-flex align-items-center justify-content-between">
                          What's Included
                          <a className="btn collapse-btn theme-btn-hover-gray font-size-15" data-toggle="collapse" href="#viewIncludedExample" role="button" aria-expanded="false" aria-controls="viewIncludedExample">
                            View<i className="la la-angle-down ml-1" />
                          </a>
                        </h3>
                        <div className="collapse" id="viewIncludedExample">
                          <div className="cruise-included-feature-wrap">
                            <div className="cruise-include-feature pt-3">
                              <h3 className="title font-size-15 font-weight-medium pb-2">Included</h3>
                              <p className="pb-3 font-size-15">Unless otherwise indicated on your itinerary, a Holland America Line includes the following on final confirmation. Taxes and fees are typically not included in the advertised price, but included in your final booking prices.</p>
                              <ul className="list-items">
                                <li><i className="la la-check text-success mr-2" />Your choice of inside, oceanview, balcony or suite accommodations</li>
                                <li><i className="la la-check text-success mr-2" />All meals onboard including 24 hour room service</li>
                                <li><i className="la la-check text-success mr-2" />Coffee, tea, milk, juice and non-bottled water</li>
                                <li><i className="la la-check text-success mr-2" />Onboard entertainment including shows, discos, comedy clubs, bars, lounges, etc.</li>
                                <li><i className="la la-check text-success mr-2" />Age appropriate kids programming for toddlers, kids, and teens.</li>
                                <li><i className="la la-check text-success mr-2" />Use of all fitness facilities, pools, hot tubs, sports courts, etc.</li>
                                <li><i className="la la-check text-success mr-2" />Taxes and Fees (included in the final price but typically not advertised price)</li>
                              </ul>
                            </div>
                            <div className="cruise-include-feature pt-3">
                              <h3 className="title font-size-15 font-weight-medium pb-2">Not Included</h3>
                              <p className="pb-3 font-size-15">Unless otherwise indicated above or on your final confirmation, your cruise price does not include:</p>
                              <ul className="list-items">
                                <li><i className="la la-times text-danger mr-2" />Airfare and transfers to the ship</li>
                                <li><i className="la la-times text-danger mr-2" />Gratuities</li>
                                <li><i className="la la-times text-danger mr-2" />Casino gambling or Bingo</li>
                                <li><i className="la la-times text-danger mr-2" />Meals in any alternative or special dining restaurants or venues</li>
                                <li><i className="la la-times text-danger mr-2" />Soft drinks, bottled water, specialty coffees, or alcoholic beverages including beer, wine, spirits.</li>
                                <li><i className="la la-times text-danger mr-2" />Shore Excursions and sightseeing tours</li>
                                <li><i className="la la-times text-danger mr-2" />Spa or Salon Services</li>
                                <li><i className="la la-times text-danger mr-2" />Items of a personal nature like souvenirs, photos</li>
                                <li><i className="la la-times text-danger mr-2" />Internet access</li>
                                <li><i className="la la-times text-danger mr-2" />Travel Insurance (recommended)</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>{/* end single-content-item */}
                      <div className="single-content-item">
                        <h3 className="title font-size-20 d-flex align-items-center justify-content-between">
                          Ship Amenities
                          <a className="btn collapse-btn theme-btn-hover-gray font-size-15" data-toggle="collapse" href="#viewAmenitiesExample" role="button" aria-expanded="false" aria-controls="viewAmenitiesExample">
                            View Amenities<i className="la la-angle-down ml-1" />
                          </a>
                        </h3>
                        <div className="collapse" id="viewAmenitiesExample">
                          <div className="row pt-4">
                            <div className="col-lg-6 responsive-column">
                              <div className="single-tour-feature d-flex mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-glass" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium pb-2">Bars and Lounges</h3>
                                  <ul className="list-items">
                                    <li><i className="la la-check mr-2 text-success" />Bars and Lounges</li>
                                    <li><i className="la la-check mr-2 text-success" />Disco / Night Club</li>
                                    <li><i className="la la-check mr-2 text-success" />Library</li>
                                    <li><i className="la la-check mr-2 text-success" />Piano Bar</li>
                                    <li><i className="la la-check mr-2 text-success" />Wine / Champagne Bar</li>
                                  </ul>
                                </div>
                              </div>{/* end single-tour-feature */}
                            </div>{/* end col-lg-6 */}
                            <div className="col-lg-6 responsive-column">
                              <div className="single-tour-feature d-flex mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-music" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium pb-2">Entertainment and Nightlife</h3>
                                  <ul className="list-items">
                                    <li><i className="la la-check mr-2 text-success" />Bars and Lounges</li>
                                    <li><i className="la la-check mr-2 text-success" />Broadway / Las Vegas Style Productions</li>
                                    <li><i className="la la-check mr-2 text-success" />Disco / Night Club</li>
                                    <li><i className="la la-check mr-2 text-success" />Movie Theater / Cinema</li>
                                    <li><i className="la la-check mr-2 text-success" />Piano Bar</li>
                                  </ul>
                                </div>
                              </div>{/* end single-tour-feature */}
                            </div>{/* end col-lg-6 */}
                            <div className="col-lg-6 responsive-column">
                              <div className="single-tour-feature d-flex mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-users" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium pb-2">Groups and Meetings</h3>
                                  <ul className="list-items">
                                    <li><i className="la la-check mr-2 text-success" />Business Center</li>
                                    <li><i className="la la-check mr-2 text-success" />Conference / Meeting Rooms</li>
                                    <li><i className="la la-check mr-2 text-success" />Private Dining Room</li>
                                  </ul>
                                </div>
                              </div>{/* end single-tour-feature */}
                            </div>{/* end col-lg-6 */}
                            <div className="col-lg-6 responsive-column">
                              <div className="single-tour-feature d-flex mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-wifi" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium pb-2">Internet and Communications</h3>
                                  <ul className="list-items">
                                    <li><i className="la la-check mr-2 text-success" />Computer Classes</li>
                                    <li><i className="la la-check mr-2 text-success" />Internet Center</li>
                                  </ul>
                                </div>
                              </div>{/* end single-tour-feature */}
                            </div>{/* end col-lg-6 */}
                            <div className="col-lg-6 responsive-column">
                              <div className="single-tour-feature d-flex mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-users" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium pb-2">Kids and Family</h3>
                                  <ul className="list-items">
                                    <li><i className="la la-check mr-2 text-success" />Age Group Specific Youth Programs</li>
                                    <li><i className="la la-check mr-2 text-success" />Arcade / Video Games</li>
                                    <li><i className="la la-check mr-2 text-success" />Childrens' Play Area</li>
                                    <li><i className="la la-check mr-2 text-success" />Connecting Staterooms</li>
                                    <li><i className="la la-check mr-2 text-success" />Dedicated Teen Center</li>
                                    <li><i className="la la-check mr-2 text-success" />Family Staterooms</li>
                                    <li><i className="la la-check mr-2 text-success" />Group Babysitting</li>
                                    <li><i className="la la-check mr-2 text-success" />Private Babysitting</li>
                                    <li><i className="la la-check mr-2 text-success" />Sports Court</li>
                                    <li><i className="la la-check mr-2 text-success" />Teen Staff</li>
                                    <li><i className="la la-check mr-2 text-success" />Youth Staff</li>
                                  </ul>
                                </div>
                              </div>{/* end single-tour-feature */}
                            </div>{/* end col-lg-6 */}
                            <div className="col-lg-6 responsive-column">
                              <div className="single-tour-feature d-flex mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-gear" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium pb-2">Other Facilities and Services</h3>
                                  <ul className="list-items">
                                    <li><i className="la la-check mr-2 text-success" />Concierge Desk</li>
                                    <li><i className="la la-check mr-2 text-success" />Dry Cleaning / Laundry Service</li>
                                    <li><i className="la la-check mr-2 text-success" />Elevators</li>
                                    <li><i className="la la-check mr-2 text-success" />Infirmary / Medical Center</li>
                                    <li><i className="la la-check mr-2 text-success" />Self Service Laundry</li>
                                  </ul>
                                </div>
                              </div>{/* end single-tour-feature */}
                            </div>{/* end col-lg-6 */}
                            <div className="col-lg-6 responsive-column">
                              <div className="single-tour-feature d-flex mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-swimming-pool" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium pb-2">Pools &amp; Hot Tubs</h3>
                                  <ul className="list-items">
                                    <li><i className="la la-check mr-2 text-success" />Hot Tubs</li>
                                    <li><i className="la la-check mr-2 text-success" />Outdoor Pool</li>
                                    <li><i className="la la-check mr-2 text-success" />Solarium</li>
                                  </ul>
                                </div>
                              </div>{/* end single-tour-feature */}
                            </div>{/* end col-lg-6 */}
                            <div className="col-lg-6 responsive-column">
                              <div className="single-tour-feature d-flex mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-cutlery" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium pb-2">Restaurants and Dining</h3>
                                  <ul className="list-items">
                                    <li><i className="la la-check mr-2 text-success" />Culinary Programs</li>
                                    <li><i className="la la-check mr-2 text-success" />Private Dining Room</li>
                                    <li><i className="la la-check mr-2 text-success" />Special Diets</li>
                                    <li><i className="la la-check mr-2 text-success" />Specialty Restaurants</li>
                                  </ul>
                                </div>
                              </div>{/* end single-tour-feature */}
                            </div>{/* end col-lg-6 */}
                            <div className="col-lg-6 responsive-column">
                              <div className="single-tour-feature d-flex mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-bars" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium pb-2">Shipboard Activities</h3>
                                  <ul className="list-items">
                                    <li><i className="la la-check mr-2 text-success" />Shopping</li>
                                    <li><i className="la la-check mr-2 text-success" />Arcade / Video Games</li>
                                    <li><i className="la la-check mr-2 text-success" />Basketball</li>
                                    <li><i className="la la-check mr-2 text-success" />Card Room / Game Room</li>
                                    <li><i className="la la-check mr-2 text-success" />Casino</li>
                                    <li><i className="la la-check mr-2 text-success" />Computer Classes</li>
                                    <li><i className="la la-check mr-2 text-success" />Culinary Programs</li>
                                    <li><i className="la la-check mr-2 text-success" />Movie Theater / Cinema</li>
                                    <li><i className="la la-check mr-2 text-success" />Sports Court</li>
                                    <li><i className="la la-check mr-2 text-success" />Tennis</li>
                                  </ul>
                                </div>
                              </div>{/* end single-tour-feature */}
                            </div>{/* end col-lg-6 */}
                            <div className="col-lg-6 responsive-column">
                              <div className="single-tour-feature d-flex mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-spa" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium pb-2">Spas and Wellness</h3>
                                  <ul className="list-items">
                                    <li><i className="la la-check mr-2 text-success" />Beauty Salon</li>
                                    <li><i className="la la-check mr-2 text-success" />Full Service Spa</li>
                                    <li><i className="la la-check mr-2 text-success" />Health / Nutrition Evaluations</li>
                                    <li><i className="la la-check mr-2 text-success" />Medspa Services</li>
                                    <li><i className="la la-check mr-2 text-success" />Sauna / Steam Room</li>
                                    <li><i className="la la-check mr-2 text-success" />Yoga</li>
                                  </ul>
                                </div>
                              </div>{/* end single-tour-feature */}
                            </div>{/* end col-lg-6 */}
                            <div className="col-lg-6 responsive-column">
                              <div className="single-tour-feature d-flex mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-wheelchair" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium pb-2">Special Needs</h3>
                                  <ul className="list-items">
                                    <li><i className="la la-check mr-2 text-success" />Accessible Gaming</li>
                                    <li><i className="la la-check mr-2 text-success" />Accessible Public Areas</li>
                                    <li><i className="la la-check mr-2 text-success" />Accessible Showrooms</li>
                                    <li><i className="la la-check mr-2 text-success" />Accessible Staterooms</li>
                                    <li><i className="la la-check mr-2 text-success" />Accessible Tendering</li>
                                    <li><i className="la la-check mr-2 text-success" />Auditory Assistance (TTY/TTD)</li>
                                    <li><i className="la la-check mr-2 text-success" />Braille Signage</li>
                                    <li><i className="la la-check mr-2 text-success" />Close Captioned TV</li>
                                    <li><i className="la la-check mr-2 text-success" />Decks with Ramps</li>
                                    <li><i className="la la-check mr-2 text-success" />Elevators to Accommodate Wheelchairs </li>
                                    <li><i className="la la-check mr-2 text-success" />Oxygen</li>
                                    <li><i className="la la-check mr-2 text-success" />Sharps Disposal</li>
                                    <li><i className="la la-check mr-2 text-success" />Special Diets</li>
                                    <li><i className="la la-check mr-2 text-success" />Visual Assistance (Visually Impaired) </li>
                                    <li><i className="la la-check mr-2 text-success" />Wheelchairs Accepted </li>
                                  </ul>
                                </div>
                              </div>{/* end single-tour-feature */}
                            </div>{/* end col-lg-6 */}
                            <div className="col-lg-6 responsive-column">
                              <div className="single-tour-feature d-flex mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-gamepad" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium pb-2">Sports and Fitness</h3>
                                  <ul className="list-items">
                                    <li><i className="la la-check mr-2 text-success" />Aerobics</li>
                                    <li><i className="la la-check mr-2 text-success" />Basketball</li>
                                    <li><i className="la la-check mr-2 text-success" />Fitness Center / Gym</li>
                                    <li><i className="la la-check mr-2 text-success" />Health / Nutrition Evaluations</li>
                                    <li><i className="la la-check mr-2 text-success" />Jogging Track</li>
                                    <li><i className="la la-check mr-2 text-success" />Pilates</li>
                                    <li><i className="la la-check mr-2 text-success" />Sauna / Steam Room</li>
                                    <li><i className="la la-check mr-2 text-success" />Sports Court</li>
                                    <li><i className="la la-check mr-2 text-success" />Tennis</li>
                                    <li><i className="la la-check mr-2 text-success" />Yoga</li>
                                  </ul>
                                </div>
                              </div>{/* end single-tour-feature */}
                            </div>{/* end col-lg-6 */}
                            <div className="col-lg-6 responsive-column">
                              <div className="single-tour-feature d-flex mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-bed" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium pb-2">Staterooms and Suites</h3>
                                  <ul className="list-items">
                                    <li><i className="la la-check mr-2 text-success" />Accessible Staterooms</li>
                                    <li><i className="la la-check mr-2 text-success" />Concierge Services</li>
                                    <li><i className="la la-check mr-2 text-success" />Connecting Staterooms</li>
                                    <li><i className="la la-check mr-2 text-success" />Exclusive Suite Area</li>
                                    <li><i className="la la-check mr-2 text-success" />Family Staterooms</li>
                                    <li><i className="la la-check mr-2 text-success" />In-Room Movies</li>
                                    <li><i className="la la-check mr-2 text-success" />In-Room Safe</li>
                                    <li><i className="la la-check mr-2 text-success" />Priority Check-In &amp; Boarding for Suite Guests</li>
                                    <li><i className="la la-check mr-2 text-success" />Refrigerator in Staterooms</li>
                                  </ul>
                                </div>
                              </div>{/* end single-tour-feature */}
                            </div>{/* end col-lg-6 */}
                            <div className="col-lg-6 responsive-column">
                              <div className="single-tour-feature d-flex mb-3">
                                <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                  <i className="la la-lightbulb" />
                                </div>
                                <div className="single-feature-titles">
                                  <h3 className="title font-size-15 font-weight-medium pb-2">Weddings &amp; Special Occasions</h3>
                                  <ul className="list-items">
                                    <li><i className="la la-check mr-2 text-success" />Private Dining Room</li>
                                  </ul>
                                </div>
                              </div>{/* end single-tour-feature */}
                            </div>{/* end col-lg-6 */}
                          </div>{/* end row */}
                        </div>
                      </div>{/* end single-content-item */}
                    </div>{/* end description */}
                    <div id="itinerary" className="page-scroll">
                      <div className="section-block margin-top-40px" />
                      <div className="single-content-item padding-top-40px padding-bottom-40px">
                        <h3 className="title font-size-20">Cruise itinerary</h3>
                        <div className="table-form table-responsive padding-top-30px">
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Days</th>
                                <th scope="col">Ports of Call</th>
                                <th scope="col">Arrival</th>
                                <th scope="col">Departure</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">Day 1</th>
                                <td>
                                  <div className="table-content d-flex align-items-center">
                                    <img src="images/small-img4.jpg" alt="" className="flex-shrink-0" />
                                    <h3 className="title">Miami, Florida</h3>
                                  </div>
                                </td>
                                <td>4:00 AM</td>
                                <td>8:00 PM</td>
                              </tr>
                              <tr>
                                <th scope="row">Day 2</th>
                                <td>
                                  <div className="table-content d-flex align-items-center">
                                    <img src="images/small-img5.jpg" alt="" className="flex-shrink-0" />
                                    <h3 className="title">At Sea</h3>
                                  </div>
                                </td>
                                <td>4:00 AM</td>
                                <td>8:00 PM</td>
                              </tr>
                              <tr>
                                <th scope="row">Day 3</th>
                                <td>
                                  <div className="table-content d-flex align-items-center">
                                    <img src="images/small-img5.jpg" alt="" className="flex-shrink-0" />
                                    <h3 className="title">At Sea</h3>
                                  </div>
                                </td>
                                <td>4:00 AM</td>
                                <td>8:00 PM</td>
                              </tr>
                              <tr>
                                <th scope="row">Day 4</th>
                                <td>
                                  <div className="table-content d-flex align-items-center">
                                    <img src="images/small-img6.jpg" alt="" className="flex-shrink-0" />
                                    <h3 className="title">Philipsburg, Sint Maarten, Netherlands Antilles</h3>
                                  </div>
                                </td>
                                <td>4:00 AM</td>
                                <td>8:00 PM</td>
                              </tr>
                              <tr>
                                <th scope="row">Day 5</th>
                                <td>
                                  <div className="table-content d-flex align-items-center">
                                    <img src="images/small-img7.jpg" alt="" className="flex-shrink-0" />
                                    <h3 className="title">St. Thomas, USVI</h3>
                                  </div>
                                </td>
                                <td>4:00 AM</td>
                                <td>8:00 PM</td>
                              </tr>
                              <tr>
                                <th scope="row">Day 6</th>
                                <td>
                                  <div className="table-content d-flex align-items-center">
                                    <img src="images/small-img5.jpg" alt="" className="flex-shrink-0" />
                                    <h3 className="title">At Sea</h3>
                                  </div>
                                </td>
                                <td>4:00 AM</td>
                                <td>8:00 PM</td>
                              </tr>
                              <tr>
                                <th scope="row">Day 7</th>
                                <td>
                                  <div className="table-content d-flex align-items-center">
                                    <img src="images/small-img8.jpg" alt="" className="flex-shrink-0" />
                                    <h3 className="title">Miami, Florida</h3>
                                  </div>
                                </td>
                                <td>4:00 AM</td>
                                <td>8:00 PM</td>
                              </tr>
                            </tbody>
                          </table>
                          <p className="font-size-14 line-height-26"><strong className="text-black">Please note:</strong> While we do our best to adhere to our published itineraries, they may be changed at the discretion of the captain due to weather advisories, port traffic, and any other unforeseeable circumstances.</p>
                        </div>
                      </div>{/* end single-content-item */}
                      <div className="section-block" />
                    </div>{/* end itinerary */}
                    <div id="staterooms" className="page-scroll">
                      <div className="single-content-item padding-top-40px padding-bottom-30px">
                        <h3 className="title font-size-20">Date Availability</h3>
                        <div className="table-form table-layout-2 table-responsive padding-top-30px">
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Inside</th>
                                <th scope="col">Oceanview</th>
                                <th scope="col">Balcony</th>
                                <th scope="col">Suite</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  <label htmlFor="radio-1" className="radio-trigger mb-0 font-size-15">
                                    <input type="radio" id="radio-1" name="radio" />
                                    <span className="checkmark" />
                                    <span>April 4 - 11, 2020</span>
                                  </label>
                                </th>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$217</h3>
                                  </div>
                                </td>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$317</h3>
                                  </div>
                                </td>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$417</h3>
                                  </div>
                                </td>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$517</h3>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <label htmlFor="radio-2" className="radio-trigger mb-0 font-size-15">
                                    <input type="radio" id="radio-2" name="radio" />
                                    <span className="checkmark" />
                                    <span>April 4 - 11, 2020</span>
                                  </label>
                                </th>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$299</h3>
                                  </div>
                                </td>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$399</h3>
                                  </div>
                                </td>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$499</h3>
                                  </div>
                                </td>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$599</h3>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <label htmlFor="radio-3" className="radio-trigger mb-0 font-size-15">
                                    <input type="radio" id="radio-3" name="radio" />
                                    <span className="checkmark" />
                                    <span>April 4 - 11, 2020</span>
                                  </label>
                                </th>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$220</h3>
                                  </div>
                                </td>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$320</h3>
                                  </div>
                                </td>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$420</h3>
                                  </div>
                                </td>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$520</h3>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <label htmlFor="radio-4" className="radio-trigger mb-0 font-size-15">
                                    <input type="radio" id="radio-4" name="radio" />
                                    <span className="checkmark" />
                                    <span>April 4 - 11, 2020</span>
                                  </label>
                                </th>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$238</h3>
                                  </div>
                                </td>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$338</h3>
                                  </div>
                                </td>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$438</h3>
                                  </div>
                                </td>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$538</h3>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <label htmlFor="radio-5" className="radio-trigger mb-0 font-size-15">
                                    <input type="radio" id="radio-5" name="radio" />
                                    <span className="checkmark" />
                                    <span>April 4 - 11, 2020</span>
                                  </label>
                                </th>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$238</h3>
                                  </div>
                                </td>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$338</h3>
                                  </div>
                                </td>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$438</h3>
                                  </div>
                                </td>
                                <td>
                                  <div className="table-content d-flex">
                                    <span className="mr-1">from</span>
                                    <h3 className="title table-price">$538</h3>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>{/* end single-content-item */}
                      <div className="section-block" />
                      <div className="single-content-item padding-top-40px padding-bottom-40px">
                        <h3 className="title font-size-20">Select a Cabin Type</h3>
                        <div className="cabin-type padding-top-30px">
                          <h3 className="title font-size-16">Inside Cabins</h3>
                          <div className="cabin-type-item d-flex pt-4">
                            <div className="cabin-type-img flex-shrink-0">
                              <img src="images/inside-cabin.jpg" alt="" />
                            </div>
                            <div className="cabin-type-detail">
                              <h3 className="title">Guarantee - Interior Stateroom</h3>
                              <ul className="list-items pt-2 pb-2">
                                <li><span>Square footage:</span>139-226 sq ft</li>
                                <li><span>Occupancy:</span>Up to 2 guests (some sleep up to 4)</li>
                                <li><span>Amenities:</span>Double bed that can be converted to two single beds on request, bathrobes, spacious closet, bathroom with shower, interactive TV, mini bar, safe, and telephone.</li>
                              </ul>
                            </div>
                            <div className="cabin-price">
                              <ul>
                                <li><span className="badge badge-warning text-white">Up to 40% off</span></li>
                                <li>from<strong className="ml-1 text-black">$217</strong><span className="before-price ml-1">$299</span></li>
                                <li className="font-size-13 mt-n2">per person*</li>
                              </ul>
                              <div className="custom-checkbox mb-0">
                                <input type="checkbox" id="chb2" />
                                <label htmlFor="chb2" className="theme-btn theme-btn-small">Select</label>
                              </div>
                            </div>
                          </div>{/* end cabin-type-item */}
                        </div>{/* end cabin-type */}
                        <div className="cabin-type padding-top-30px">
                          <h3 className="title font-size-16">Oceanview Cabins</h3>
                          <div className="cabin-type-item d-flex pt-4">
                            <div className="cabin-type-img flex-shrink-0">
                              <img src="images/oceanview-cabin.jpg" alt="" />
                            </div>
                            <div className="cabin-type-detail">
                              <h3 className="title">Guarantee - Oceanview Stateroom</h3>
                              <ul className="list-items pt-2 pb-2">
                                <li><span>Square footage:</span>139-226 sq ft</li>
                                <li><span>Occupancy:</span>Up to 2 guests (some sleep up to 4)</li>
                                <li><span>Amenities:</span>Double bed that can be converted to two single beds on request, bathrobes, spacious closet, bathroom with shower, interactive TV, mini bar, safe, and telephone.</li>
                              </ul>
                            </div>
                            <div className="cabin-price">
                              <ul>
                                <li><span className="badge badge-warning text-white">Up to 40% off</span></li>
                                <li>from<strong className="ml-1 text-black">$317</strong><span className="before-price ml-1">$399</span></li>
                                <li className="font-size-13 mt-n2">per person*</li>
                              </ul>
                              <div className="custom-checkbox mb-0">
                                <input type="checkbox" id="chb4" />
                                <label htmlFor="chb4" className="theme-btn theme-btn-small">Select</label>
                              </div>
                            </div>
                          </div>{/* end cabin-type-item */}
                        </div>{/* end cabin-type */}
                        <div className="cabin-type padding-top-30px">
                          <h3 className="title font-size-16">Balcony Cabins</h3>
                          <div className="cabin-type-item d-flex pt-4">
                            <div className="cabin-type-img flex-shrink-0">
                              <img src="images/balcony-cabin.jpg" alt="" />
                            </div>
                            <div className="cabin-type-detail">
                              <h3 className="title">Guarantee - Balcony Stateroom</h3>
                              <ul className="list-items pt-2 pb-2">
                                <li><span>Square footage:</span>139-226 sq ft</li>
                                <li><span>Occupancy:</span>Up to 2 guests (some sleep up to 4)</li>
                                <li><span>Amenities:</span>Double bed that can be converted to two single beds on request, bathrobes, spacious closet, bathroom with shower, interactive TV, mini bar, safe, and telephone.</li>
                              </ul>
                            </div>
                            <div className="cabin-price">
                              <ul>
                                <li><span className="badge badge-warning text-white">Up to 40% off</span></li>
                                <li>from<strong className="ml-1 text-black">$417</strong><span className="before-price ml-1">$499</span></li>
                                <li className="font-size-13 mt-n2">per person*</li>
                              </ul>
                              <div className="custom-checkbox mb-0">
                                <input type="checkbox" id="chb5" />
                                <label htmlFor="chb5" className="theme-btn theme-btn-small">Select</label>
                              </div>
                            </div>
                          </div>{/* end cabin-type-item */}
                        </div>{/* end cabin-type */}
                        <div className="cabin-type padding-top-30px">
                          <h3 className="title font-size-16">Suite Cabins</h3>
                          <div className="cabin-type-item d-flex pt-4">
                            <div className="cabin-type-img flex-shrink-0">
                              <img src="images/suite-cabin.jpg" alt="" />
                            </div>
                            <div className="cabin-type-detail">
                              <h3 className="title">Suite – Aurea</h3>
                              <ul className="list-items pt-2 pb-2">
                                <li><span>Square footage:</span>139-226 sq ft</li>
                                <li><span>Occupancy:</span>Up to 2 guests (some sleep up to 4)</li>
                                <li><span>Amenities:</span>Double bed that can be converted to two single beds on request, bathrobes, spacious closet, bathroom with shower, interactive TV, mini bar, safe, and telephone.</li>
                              </ul>
                            </div>
                            <div className="cabin-price">
                              <ul>
                                <li><span className="badge badge-warning text-white">Up to 40% off</span></li>
                                <li>from<strong className="ml-1 text-black">$517</strong><span className="before-price ml-1">$599</span></li>
                                <li className="font-size-13 mt-n2">per person*</li>
                              </ul>
                              <div className="custom-checkbox mb-0">
                                <input type="checkbox" id="chb6" />
                                <label htmlFor="chb6" className="theme-btn theme-btn-small">Select</label>
                              </div>
                            </div>
                          </div>{/* end cabin-type-item */}
                        </div>{/* end cabin-type */}
                      </div>{/* end single-content-item */}
                      <p className="font-size-14 line-height-26 padding-bottom-40px"><strong className="text-black">Please note:</strong> Cabin photos shown are samples only. Actual cabin details may vary.</p>
                      <div className="section-block" />
                    </div>{/* end staterooms */}
                    <div id="faq" className="page-scroll">
                      <div className="single-content-item padding-top-40px padding-bottom-40px">
                        <h3 className="title font-size-20">Policies</h3>
                        <div className="accordion accordion-item padding-top-30px" id="accordionExample2">
                          <div className="card">
                            <div className="card-header" id="faqHeadingOne">
                              <h2 className="mb-0">
                                <button className="btn btn-link d-flex align-items-center justify-content-end flex-row-reverse font-size-16" type="button" data-toggle="collapse" data-target="#faqCollapseOne" aria-expanded="true" aria-controls="faqCollapseOne">
                                  <span className="ml-3">Cancellation Policy</span>
                                  <i className="la la-minus" />
                                  <i className="la la-plus" />
                                </button>
                              </h2>
                            </div>
                            <div id="faqCollapseOne" className="collapse show" aria-labelledby="faqHeadingOne" data-parent="#accordionExample2">
                              <div className="card-body">
                                <p className="pb-2">*In instances where the deposit amount paid is higher than the 25/50/75% of cruise fare cancellation charge, then the highest of the two amounts is payable as the cancellation charge, i.e. the full deposit amount is retained.</p>
                                <p><strong className="text-black mr-1">Note:</strong>Cancellation Policies are subject to change at any time by the cruise line without prior notice.</p>
                              </div>
                            </div>
                          </div>{/* end card */}
                          <div className="card">
                            <div className="card-header" id="faqHeadingTwo">
                              <h2 className="mb-0">
                                <button className="btn btn-link d-flex align-items-center justify-content-end flex-row-reverse font-size-16" type="button" data-toggle="collapse" data-target="#faqCollapseTwo" aria-expanded="false" aria-controls="faqCollapseTwo">
                                  <span className="ml-3">Gratuities Information</span>
                                  <i className="la la-minus" />
                                  <i className="la la-plus" />
                                </button>
                              </h2>
                            </div>
                            <div id="faqCollapseTwo" className="collapse" aria-labelledby="faqHeadingTwo" data-parent="#accordionExample2">
                              <div className="card-body">
                                <p className="pb-2">MSC will automatically add a $14.50 USD gratuity for standard staterooms, $17.50 USD for Suite guests, to each guest's SeaPass® account on a daily basis. Gratuities apply to all guests of all ages.</p>
                                <p><strong className="text-black mr-1">Note:</strong> Details, ship facts, policies, images and descriptions are gathered for information only and subject to change without notice. Images and descriptions displayed are subject to change at any time without notice. Actual details, design and configuration may vary.</p>
                              </div>
                            </div>
                          </div>{/* end card */}
                          <div className="card">
                            <div className="card-header" id="faqHeadingThree">
                              <h2 className="mb-0">
                                <button className="btn btn-link d-flex align-items-center justify-content-end flex-row-reverse font-size-16" type="button" data-toggle="collapse" data-target="#faqCollapseThree" aria-expanded="false" aria-controls="faqCollapseThree">
                                  <span className="ml-3">Pregnancy Policy</span>
                                  <i className="la la-minus" />
                                  <i className="la la-plus" />
                                </button>
                              </h2>
                            </div>
                            <div id="faqCollapseThree" className="collapse" aria-labelledby="faqHeadingThree" data-parent="#accordionExample2">
                              <div className="card-body">
                                <p className="pb-2">MSC cannot accept guests who will have entered their 24th week of pregnancy by the beginning of, or at any time during the cruise or cruisetour. A physician's "Fit to Travel" note is required prior to sailing, stating how far along (in weeks) your pregnancy will be at the beginning of the cruise and confirming that you are in good health and not experiencing a high-risk pregnancy.</p>
                                <p><strong className="text-black mr-1">Note:</strong>Details, ship facts, policies, images and descriptions are gathered for information only and subject to change without notice. Images and descriptions displayed are subject to change at any time without notice. Actual details, design and configuration may vary.</p>
                              </div>
                            </div>
                          </div>{/* end card */}
                          <div className="card">
                            <div className="card-header" id="faqHeadingFour">
                              <h2 className="mb-0">
                                <button className="btn btn-link d-flex align-items-center justify-content-end flex-row-reverse font-size-16" type="button" data-toggle="collapse" data-target="#faqCollapseFour" aria-expanded="false" aria-controls="faqCollapseFour">
                                  <span className="ml-3">MinorAccompany</span>
                                  <i className="la la-minus" />
                                  <i className="la la-plus" />
                                </button>
                              </h2>
                            </div>
                            <div id="faqCollapseFour" className="collapse" aria-labelledby="faqHeadingFour" data-parent="#accordionExample2">
                              <div className="card-body">
                                <p className="pb-2">MSC cruises are kids friendly and offer variety of activities for children every day. Day programs are divided by age groups. Children with a parent or guardian are welcome in most (not all) specialty restaurants throughout serving hours. There are kids gatherings, swimming pools, play areas and much more activities available for entertaining. </p>
                                <p><strong className="text-black mr-1">Babysitting Services:</strong>Babysitting is offered in groups at children's play areas. Hourly rate is applied for this service.</p>
                                <p><strong className="text-black mr-1">Please note:</strong>Due to public health regulations, in diapers, swim diapers, pull-ups or who are not COMPLETELY toilet trained are not allowed in the pools, whirlpools or H2O zone. Cribs for babies are not provided. </p>
                              </div>
                            </div>
                          </div>{/* end card */}
                          <div className="card">
                            <div className="card-header" id="faqHeadingFive">
                              <h2 className="mb-0">
                                <button className="btn btn-link d-flex align-items-center justify-content-end flex-row-reverse font-size-16" type="button" data-toggle="collapse" data-target="#faqCollapseFive" aria-expanded="false" aria-controls="faqCollapseFive">
                                  <span className="ml-3">Smoking Policy</span>
                                  <i className="la la-minus" />
                                  <i className="la la-plus" />
                                </button>
                              </h2>
                            </div>
                            <div id="faqCollapseFive" className="collapse" aria-labelledby="faqHeadingFive" data-parent="#accordionExample2">
                              <div className="card-body">
                                <p className="pb-2">For the comfort and enjoyment of our guests, our ships are designated as non-smoking; however, we recognize that some of our guests smoke. Therefore, to provide an onboard environment that also satisfies smokers, we have designated certain public and private areas of the ship as "smoking areas."</p>
                                <p className="pb-2"> Smoking in public areas is only permitted in designated smoking sections which vary by ship. Generally, smoking is permitted outdoors on only one side of the ship; and smoking is permitted on all private ocean front balconies, including Loft Suite balconies on Oasis Class. To assist in locating areas where smoking is permitted, you will find visible signage posted within all smoking areas and ashtrays that are provided for your use. The location of all smoking venues can also be found in the daily Cruise Compass; or you may contact Guest Services once onboard. </p>
                                <p><strong className="text-black mr-1">Please note:</strong>Details, ship facts, policies, images and descriptions are gathered for information only and subject to change without notice. Images and descriptions displayed are subject to change at any time without notice. Actual details, design and configuration may vary.</p>
                              </div>
                            </div>
                          </div>{/* end card */}
                        </div>
                      </div>{/* end single-content-item */}
                      <div className="section-block" />
                    </div>{/* end faq */}
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
                                    <div className="col-lg-6">
                                      <div className="input-box">
                                        <label className="label-text">Name</label>
                                        <div className="form-group">
                                          <span className="la la-user form-icon" />
                                          <input className="form-control" type="text" name="text" placeholder="Your name" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
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
                      <div className="sidebar-widget-item">
                        <div className="sidebar-book-title-wrap mb-3">
                          <h3>popular</h3>
                          <p><span className="text-form">From</span><span className="text-value ml-2 mr-1">$399.00</span> <span className="before-price">$412.00</span></p>
                        </div>
                      </div>{/* end sidebar-widget-item */}
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
                              <label className="label-text">Date</label>
                              <div className="form-group">
                                <span className="la la-calendar form-icon" />
                                <input className="date-range form-control" type="text" name="daterange-single" defaultValue="04/28/2020" />
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>{/* end sidebar-widget-item */}
                      <div className="sidebar-widget-item">
                        <div className="qty-box mb-2 d-flex align-items-center justify-content-between">
                          <label className="font-size-16">Adults <span>Age 18+</span></label>
                          <div className="qtyBtn d-flex align-items-center">
                            <input type="text" name="qtyInput" defaultValue={0} />
                          </div>
                        </div>{/* end qty-box */}
                        <div className="qty-box mb-2 d-flex align-items-center justify-content-between">
                          <label className="font-size-16">Children <span>2-12 years old</span></label>
                          <div className="qtyBtn d-flex align-items-center">
                            <input type="text" name="qtyInput" defaultValue={0} />
                          </div>
                        </div>{/* end qty-box */}
                        <div className="qty-box mb-2 d-flex align-items-center justify-content-between">
                          <label className="font-size-16">Infants <span>0-2 years old</span></label>
                          <div className="qtyBtn d-flex align-items-center">
                            <input type="text" name="qtyInput" defaultValue={0} />
                          </div>
                        </div>{/* end qty-box */}
                      </div>{/* end sidebar-widget-item */}
                      <div className="btn-box pt-2">
                        <a href="cruise-booking.html" className="theme-btn text-center w-100 mb-2"><i className="la la-shopping-cart mr-2 font-size-18" />Book Now</a>
                        <a href="#" className="theme-btn text-center w-100 theme-btn-transparent"><i className="la la-heart-o mr-2" />Add to Wishlist</a>
                        <div className="d-flex align-items-center justify-content-between pt-2">
                          <a href="#" className="btn theme-btn-hover-gray font-size-15" data-toggle="modal" data-target="#sharePopupForm"><i className="la la-share mr-1" />Share</a>
                          <p><i className="la la-eye mr-1 font-size-15 color-text-2" />3456</p>
                        </div>
                      </div>
                    </div>{/* end sidebar-widget */}
                    <div className="sidebar-widget single-content-widget">
                      <h3 className="title stroke-shape">Enquiry Form</h3>
                      <div className="enquiry-forum">
                        <div className="form-box">
                          <div className="form-content">
                            <div className="contact-form-action">
                              <form method="post">
                                <div className="input-box">
                                  <label className="label-text">Your Name</label>
                                  <div className="form-group">
                                    <span className="la la-user form-icon" />
                                    <input className="form-control" type="text" name="text" placeholder="Your name" />
                                  </div>
                                </div>
                                <div className="input-box">
                                  <label className="label-text">Your Email</label>
                                  <div className="form-group">
                                    <span className="la la-envelope-o form-icon" />
                                    <input className="form-control" type="email" name="email" placeholder="Email address" />
                                  </div>
                                </div>
                                <div className="input-box">
                                  <label className="label-text">Message</label>
                                  <div className="form-group">
                                    <span className="la la-pencil form-icon" />
                                    <textarea className="message-control form-control" name="message" placeholder="Write message" defaultValue={""} />
                                  </div>
                                </div>
                                <div className="input-box">
                                  <div className="form-group">
                                    <div className="custom-checkbox mb-0">
                                      <input type="checkbox" id="agreeChb" />
                                      <label htmlFor="agreeChb">I agree with <a href="https://book24.ng/terms">Terms of Service</a> and
                                        <a href="https://book24.ng/privacy-policy">Privacy Statement</a></label>
                                    </div>
                                  </div>
                                </div>
                                <div className="btn-box">
                                  <button type="button" className="theme-btn">Submit Enquiry</button>
                                </div>
                              </form>
                            </div>{/* end contact-form-action */}
                          </div>{/* end form-content */}
                        </div>{/* end form-box */}
                      </div>{/* end enquiry-forum */}
                    </div>{/* end sidebar-widget */}
                    <div className="sidebar-widget single-content-widget">
                      <h3 className="title stroke-shape">Why Book With Us?</h3>
                      <div className="sidebar-list">
                        <ul className="list-items">
                          <li><i className="la la-dollar icon-element mr-2" />No-hassle best price guarantee</li>
                          <li><i className="la la-microphone icon-element mr-2" />Customer care available 24/7</li>
                          <li><i className="la la-thumbs-up icon-element mr-2" />Hand-picked Tours &amp; Activities</li>
                          <li><i className="la la-file-text icon-element mr-2" />Free Travel Guide</li>
                        </ul>
                      </div>{/* end sidebar-list */}
                    </div>{/* end sidebar-widget */}
                    <div className="sidebar-widget single-content-widget">
                      <h3 className="title stroke-shape">Get a Question?</h3>
                      <p className="font-size-14 line-height-24">Do not hesitate to give us a call. We are an expert team and we are happy to talk to you.</p>
                      <div className="sidebar-list pt-3">
                        <ul className="list-items">
                          <li><i className="la la-phone icon-element mr-2" /><a href="#">+ 234 706 400 4212</a></li>
                          <li><i className="la la-envelope icon-element mr-2" /><a href="mailto:info@book24.ng">info@book24.ng</a></li>
                        </ul>
                      </div>{/* end sidebar-list */}
                    </div>{/* end sidebar-widget */}
                    <div className="sidebar-widget single-content-widget">
                      <h3 className="title stroke-shape">Organized by</h3>
                      <div className="author-content d-flex">
                        <div className="author-img">
                          <a href="#"><img src="images/team8.jpg" alt="testimonial image" /></a>
                        </div>
                        <div className="author-bio">
                          <h4 className="author__title"><a href="#">royaltravelagency</a></h4>
                          <span className="author__meta">Member Since 2020</span>
                          <span className="ratings d-flex align-items-center">
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star-o" />
                            <span className="ml-2">305 Reviews</span>
                          </span>
                          <div className="btn-box pt-3">
                            <a href="#" className="theme-btn theme-btn-small theme-btn-transparent">Ask a Question</a>
                          </div>
                        </div>
                      </div>
                    </div>{/* end sidebar-widget */}
                  </div>{/* end sidebar */}
                </div>{/* end col-lg-4 */}
              </div>{/* end row */}
            </div>{/* end container */}
          </div>{/* end single-content-box */}
        </section>{/* end cruise-detail-area */}
        {/* ================================
    END CRUISE DETAIL AREA
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
export default withRouter(DetailCruise);
