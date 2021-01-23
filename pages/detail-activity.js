import Head from "next/head";
import React, { Component } from "react";
import Header from "../components/header";
import DetailsHeader from "../components/detailsHeader";
import DetailsItem from "../components/detailsItem";import PreLoader from "../components/preloader";
import SignInModal from "../components/signInModal";
import Footer from "../components/footer";
import $ from "jquery";
import Cookies from "js-cookie";
import { withAlert } from "react-alert";
import moment from "moment";
import { withRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../components/config.js";

class DetailActivity extends Component {
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
      book_in_date: "",
      book_out_date: "",
      activity_company: "",
      location: "",
      images: []
    };
  }

  valid(current) {
    return current.isAfter(moment().subtract(1, "day"));
  }

  async componentDidMount() {
    

    const id = this.props.router.query.id ? this.props.router.query.id : "";

    if (id == "") {
      this.props.router.push("/activity-list");
    }
    this.getData(id);
  }

  getData = ( id) => {
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "thingsToDos/" + id, config)
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
          name: response.data.name,
          address: response.data.address,
          description: response.data.description,
          check_in_time: response.data.check_in_time
            ? response.data.check_in_time
            : response.data.start_date,
          check_out_time: response.data.check_out_time
            ? response.data.check_out_time
            : response.data.end_date,
          location:response.data.location,
          activity_company: response.data.activity_company,
          images: response.data.images
        });
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
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
      activity_compnay,
      location,
      book_in_date,
      book_out_date,
      images
    } = this.state;
    const first_image = images && images[0] && images[0].url;

    return (
      <div>
        <Head>
          <meta
            name="description"
            content="Book24 - Advanced Travel and Event Booking Solution.."
          />
          <meta name="author" content="Book24" />
          <title>
            Book24 | Premium directory of hotels, tours, events, activitys and
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
                    <li><a href="/">Home</a></li>
                    <li>{location.substring(0, 1).toUpperCase() +
                              location.substring(1, location.length)}</li>
                    <li>{name}</li>
                  </ul>
                </div>{/* end breadcrumb-list */}
              </div>
            </div>
          </div>
        </section>{/* end breadcrumb-top-bar */}
        {/* ================================
    END BREADCRUMB TOP BAR
================================= */}
        {/* ================================
    START BREADCRUMB AREA
================================= */}
        <section className="breadcrumb-area bread-bg-11 py-0"
          style={{
                  backgroundImage: `url(${first_image})`,
                }}>
          <div className="breadcrumb-wrap">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="breadcrumb-btn">
                    <div className="btn-box">
                      {/* <a className="theme-btn" data-fancybox="video" data-src="https://www.youtube.com/watch?v=5u1WISBbo5I" data-speed={700}>
                        <i className="la la-video-camera mr-2" />Video
                      </a> */}
                      <a
                              className="theme-btn"
                              data-src={first_image}
                              data-fancybox="gallery"
                              data-caption="Showing image - 01"
                              data-speed={700}
                            >
                              <i className="la la-photo mr-2" />
                              More Photos
                            </a>
                          </div>
                          {images !== null && images.length >0 &&images.map((el, index) => {
                            if (index > 0) {
                              return (
                                <a
                                  className="d-none"
                                  data-fancybox="gallery"
                                  data-src={el.url}
                                  data-caption={
                                    "Showing image - " + parseInt(index) + 1
                                  }
                                  data-speed={700}
                                />
                              );
                            }
                          })}
                  </div>{/* end breadcrumb-btn */}
                </div>
              </div>
            </div>
          </div>{/* end breadcrumb-wrap */}
        </section>{/* end breadcrumb-area */}
        {/* ================================
    END BREADCRUMB AREA
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
                      <li><a data-scroll="description" href="#description" className="scroll-link active">Activity Details</a></li>
                      {/* <li><a data-scroll="availability" href="#availability" className="scroll-link">Availability</a></li> */}
                      {/* <li><a data-scroll="amenities" href="#amenities" className="scroll-link">Amenities</a></li> */}
                      {/* <li><a data-scroll="faq" href="#faq" className="scroll-link">FAQ</a></li> */}
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
                <div className="col-lg-12">
                  <div className="single-content-wrap padding-top-60px">
                    <div id="description" className="page-scroll">
                      <div className="single-content-item pb-4">
                        <h3 className="title font-size-26">{name}</h3>
                        <div className="d-flex align-items-center pt-2">
                          <p className="mr-2">{address}</p>
                          <p>
                            <span className="badge badge-warning text-white font-size-16">4.7</span>
                            <span>(40 Reviews)</span>
                          </p>
                        </div>
                      </div>{/* end single-content-item */}
                      <div className="section-block" />
                      <div className="single-content-item py-4">
                        <div className="row">
                          </div>
                          <div className="col-lg-12 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-money" />
                              </div>
                              {/* <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Price</h3>
                                <span className="font-size-13">₦{price}</span>
                              </div> */}
                            </div>{/* end single-tour-feature */}
                          </div>
                          <div className="col-lg-12 responsive-column">
                            <div className="single-tour-feature d-flex align-items-center mb-3">
                              <div className="single-feature-icon icon-element ml-0 flex-shrink-0 mr-3">
                                <i className="la la-globe" />
                              </div>
                              <div className="single-feature-titles">
                                <h3 className="title font-size-15 font-weight-medium">Location</h3>
                                <span className="font-size-13">  {location
                                          .substring(0, 1)
                                          .toUpperCase() +
                                          location.substring(
                                            1,
                                            location.length
                                          )}</span>
                              </div>
                            </div>{/* end single-tour-feature */}
                          </div>
                          <div className="col-lg-12">
                  <div className="sidebar single-content-sidebar mb-0">
           
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
                                      <label htmlFor="agreeChb">I agree with <a href="https://book24.ng/termss-and-conditions">Terms of Service</a> and
                                        <a href="https://privacy-policy">Privacy Policy</a></label>
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
                      <h3 className="title stroke-shape">Activity Company</h3>
                      <div className="author-content">
                        <div className="d-flex">
                          <div className="author-img">
                            <a href="#"><img src="/images/team8.jpg" alt="testimonial image" /></a>
                          </div>
                          <div className="author-bio">
                            <h4 className="author__title"><a href="#">{activity_compnay}</a></h4>
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
                      </div>
                    </div>{/* end sidebar-widget */}
                  </div>{/* end sidebar */}
                </div>
             
                        </div>
                      </div>{/* end single-content-item */}
                      <div className="section-block" />
                      <div className="single-content-item padding-top-40px padding-bottom-40px">
                        <h3 className="title font-size-20">About {name}</h3>
                        <p className="py-3">{description} </p>
       
                      </div>{/* end single-content-item */}
                      <div className="section-block" />
                    </div>
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
                            </div>
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
                                </div>
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
                              <img className="avatar__img" alt="" src="/images/team8.jpg" />
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
                                Excellent hotel
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
                              <img className="avatar__img" alt="" src="/images/team9.jpg" />
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
                                I had a great time at the hotel
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
                              <img className="avatar__img" alt="" src="/images/team10.jpg" />
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
                                Very excellent and serene hotel
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
                                </div>
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
                </div>
            </div>
         </section> </div>{/* end single-content-box */}
    
        {/* ================================
    END TOUR DETAIL AREA
================================= */}
        <div className="section-block" />
        {/* ================================
    START RELATE TOUR AREA
================================= */}
        {/* <section className="related-tour-area section--padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-heading text-center">
                  <h2 className="sec__title">You might also like</h2>
                </div>
              </div>
            </div>
            <div className="row padding-top-50px">
              <div className="col-lg-4 responsive-column">
                <div className="card-item">
                  <div className="card-img">
                    <a href="hotel-single.html" className="d-block">
                      <img src="/images/img1.jpg" alt="hotel-img" />
                    </a>
                    <span className="badge">Bestseller</span>
                    <div className="add-to-wishlist icon-element" data-toggle="tooltip" data-placement="top" title="Bookmark">
                      <i className="la la-heart-o" />
                    </div>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title"><a href="hotel-single.html">The Millennium Hilton New York</a></h3>
                    <p className="card-meta">124 E Huron St, New york</p>
                    <div className="card-rating">
                      <span className="badge text-white">4.4/5</span>
                      <span className="review__text">Average</span>
                      <span className="rating__text">(30 Reviews)</span>
                    </div>
                    <div className="card-price d-flex align-items-center justify-content-between">
                      <p>
                        <span className="price__from">From</span>
                        <span className="price__num">88,000</span>
                        <span className="price__text">Per night</span>
                      </p>
                      <a href="hotel-single.html" className="btn-text">See details<i className="la la-angle-right" /></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 responsive-column">
                <div className="card-item">
                  <div className="card-img">
                    <a href="hotel-single.html" className="d-block">
                      <img src="/images/img2.jpg" alt="hotel-img" />
                    </a>
                    <div className="add-to-wishlist icon-element" data-toggle="tooltip" data-placement="top" title="Bookmark">
                      <i className="la la-heart-o" />
                    </div>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title"><a href="hotel-single.html">Best Western Grant Park Hotel</a></h3>
                    <p className="card-meta">124 E Huron St, Chicago</p>
                    <div className="card-rating">
                      <span className="badge text-white">4.4/5</span>
                      <span className="review__text">Average</span>
                      <span className="rating__text">(30 Reviews)</span>
                    </div>
                    <div className="card-price d-flex align-items-center justify-content-between">
                      <p>
                        <span className="price__from">From</span>
                        <span className="price__num">58,000</span>
                        <span className="price__text">Per night</span>
                      </p>
                      <a href="hotel-single.html" className="btn-text">See details<i className="la la-angle-right" /></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 responsive-column">
                <div className="card-item">
                  <div className="card-img">
                    <a href="hotel-single.html" className="d-block">
                      <img src="/images/img3.jpg" alt="hotel-img" />
                    </a>
                    <span className="badge">Featured</span>
                    <div className="add-to-wishlist icon-element" data-toggle="tooltip" data-placement="top" title="Bookmark">
                      <i className="la la-heart-o" />
                    </div>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title"><a href="hotel-single.html">Hyatt Regency Maui Resort &amp; Spa</a></h3>
                    <p className="card-meta">200 Nohea Kai Dr, Lahaina, HI</p>
                    <div className="card-rating">
                      <span className="badge text-white">4.4/5</span>
                      <span className="review__text">Average</span>
                      <span className="rating__text">(30 Reviews)</span>
                    </div>
                    <div className="card-price d-flex align-items-center justify-content-between">
                      <p>
                        <span className="price__from">From</span>
                        <span className="price__num">88,000</span>
                        <span className="price__text">Per night</span>
                      </p>
                      <a href="hotel-single.html" className="btn-text">See details<i className="la la-angle-right" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
       */}
        <section className="cta-area subscriber-area section-bg-2 padding-top-60px padding-bottom-60px">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="section-heading">
                  <h2 className="sec__title font-size-30 text-white">Subscribe to see Secret Deals</h2>
                </div>
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
                </div>
              </div>{/* end col-lg-5 */}
            </div>
          </div>
        </section>{/* end cta-area */}
        {/* ================================
    END CTA AREA
================================= */}
         <Footer />
     
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
	$(function() {
	  $('input[name="dates"]').daterangepicker({
		  autoUpdateInput: false,
		  parentEl:'#input-dates',
		  opens: 'left',
		  locale: {
			  cancelLabel: 'Clear'
		  }
	  });
	  $('input[name="dates"]').on('apply.daterangepicker', function(ev, picker) {
		  $(this).val(picker.startDate.format('MM-DD-YY') + ' > ' + picker.endDate.format('MM-DD-YY'));
	  });
	  $('input[name="dates"]').on('cancel.daterangepicker', function(ev, picker) {
		  $(this).val('');
	  });
	});
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
const DetailActivity_ = withRouter(DetailActivity);
export default withAlert()(DetailActivity_);
