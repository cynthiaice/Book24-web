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

class BlogGrid extends Component {
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
<section className="breadcrumb-area bread-bg-9">
          <div className="breadcrumb-wrap">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="breadcrumb-content">
                    <div className="section-heading">
                      <h2 className="sec__title">All Posts</h2>
                    </div>
                  </div>{/* end breadcrumb-content */}
                </div>{/* end col-lg-6 */}
                <div className="col-lg-6">
                  <div className="breadcrumb-list">
                    <ul className="list-items d-flex justify-content-end">
                      <li><a href="index.html">Home</a></li>
                      <li>Blog</li>
                      <li>All Posts</li>
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
              <div className="col-lg-4 responsive-column">
                <div className="card-item blog-card">
                  <div className="card-img">
                    <img src="images/blog-img.jpg" alt="blog-img" />
                    <div className="post-format icon-element">
                      <i className="la la-photo" />
                    </div>
                    <div className="card-body">
                      <div className="post-categories">
                        <a href="#" className="badge">Travel</a>
                        <a href="#" className="badge">lifestyle</a>
                      </div>
                      <h3 className="card-title line-height-26"><a href="blog-single.html">When Traveling Avoid Expensive Hotels &amp; Resorts</a></h3>
                      <p className="card-meta">
                        <span className="post__date"> 1 January, 2020</span>
                        <span className="post-dot" />
                        <span className="post__time">5 Mins read</span>
                      </p>
                    </div>
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <div className="author-content d-flex align-items-center">
                      <div className="author-img">
                        <img src="images/small-team1.jpg" alt="testimonial image" />
                      </div>
                      <div className="author-bio">
                        <a href="#" className="author__title">Leroy Bell</a>
                      </div>
                    </div>
                    <div className="post-share">
                      <ul>
                        <li>
                          <i className="la la-share icon-element" />
                          <ul className="post-share-dropdown d-flex align-items-center">
                            <li><a href="#"><i className="lab la-facebook-f" /></a></li>
                            <li><a href="#"><i className="lab la-twitter" /></a></li>
                            <li><a href="#"><i className="lab la-instagram" /></a></li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>{/* end card-item */}
              </div>{/* end col-lg-4 */}
              <div className="col-lg-4 responsive-column">
                <div className="card-item blog-card">
                  <div className="card-img">
                    <img src="images/blog-img2.jpg" alt="blog-img" />
                    <div className="post-format icon-element">
                      <i className="la la-play" />
                    </div>
                    <div className="card-body">
                      <div className="post-categories">
                        <a href="#" className="badge">Video</a>
                      </div>
                      <h3 className="card-title line-height-26"><a href="blog-single.html">My Best Travel Tips: The Ultimate Travel Guide</a></h3>
                      <p className="card-meta">
                        <span className="post__date"> 1 February, 2020</span>
                        <span className="post-dot" />
                        <span className="post__time">4 Mins read</span>
                      </p>
                    </div>
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <div className="author-content d-flex align-items-center">
                      <div className="author-img">
                        <img src="images/small-team2.jpg" alt="testimonial image" />
                      </div>
                      <div className="author-bio">
                        <a href="#" className="author__title">Phillip Hunt</a>
                      </div>
                    </div>
                    <div className="post-share">
                      <ul>
                        <li>
                          <i className="la la-share icon-element" />
                          <ul className="post-share-dropdown d-flex align-items-center">
                            <li><a href="#"><i className="lab la-facebook-f" /></a></li>
                            <li><a href="#"><i className="lab la-twitter" /></a></li>
                            <li><a href="#"><i className="lab la-instagram" /></a></li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>{/* end card-item */}
              </div>{/* end col-lg-4 */}
              <div className="col-lg-4 responsive-column">
                <div className="card-item blog-card">
                  <div className="card-img">
                    <img src="images/blog-img3.jpg" alt="blog-img" />
                    <div className="post-format icon-element">
                      <i className="la la-music" />
                    </div>
                    <div className="card-body">
                      <div className="post-categories">
                        <a href="#" className="badge">audio</a>
                      </div>
                      <h3 className="card-title line-height-26"><a href="blog-single.html">By all Means, Travel to Popular Sites &amp; Don’t Rule Out Other Locations</a></h3>
                      <p className="card-meta">
                        <span className="post__date"> 1 March, 2020</span>
                        <span className="post-dot" />
                        <span className="post__time">3 Mins read</span>
                      </p>
                    </div>
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <div className="author-content d-flex align-items-center">
                      <div className="author-img">
                        <img src="images/small-team3.jpg" alt="testimonial image" />
                      </div>
                      <div className="author-bio">
                        <a href="#" className="author__title">Luke Jacobs</a>
                      </div>
                    </div>
                    <div className="post-share">
                      <ul>
                        <li>
                          <i className="la la-share icon-element" />
                          <ul className="post-share-dropdown d-flex align-items-center">
                            <li><a href="#"><i className="lab la-facebook-f" /></a></li>
                            <li><a href="#"><i className="lab la-twitter" /></a></li>
                            <li><a href="#"><i className="lab la-instagram" /></a></li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>{/* end card-item */}
              </div>{/* end col-lg-4 */}
              <div className="col-lg-4 responsive-column">
                <div className="card-item blog-card">
                  <div className="card-img">
                    <img src="images/blog-img.jpg" alt="blog-img" />
                    <div className="post-format icon-element">
                      <i className="la la-photo" />
                    </div>
                    <div className="card-body">
                      <div className="post-categories">
                        <a href="#" className="badge">Travel</a>
                        <a href="#" className="badge">lifestyle</a>
                      </div>
                      <h3 className="card-title line-height-26"><a href="blog-single.html">When Traveling Avoid Expensive Hotels &amp; Resorts</a></h3>
                      <p className="card-meta">
                        <span className="post__date"> 1 January, 2020</span>
                        <span className="post-dot" />
                        <span className="post__time">5 Mins read</span>
                      </p>
                    </div>
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <div className="author-content d-flex align-items-center">
                      <div className="author-img">
                        <img src="images/small-team4.jpg" alt="testimonial image" />
                      </div>
                      <div className="author-bio">
                        <a href="#" className="author__title">Alex Smith</a>
                      </div>
                    </div>
                    <div className="post-share">
                      <ul>
                        <li>
                          <i className="la la-share icon-element" />
                          <ul className="post-share-dropdown d-flex align-items-center">
                            <li><a href="#"><i className="lab la-facebook-f" /></a></li>
                            <li><a href="#"><i className="lab la-twitter" /></a></li>
                            <li><a href="#"><i className="lab la-instagram" /></a></li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>{/* end card-item */}
              </div>{/* end col-lg-4 */}
              <div className="col-lg-4 responsive-column">
                <div className="card-item blog-card">
                  <div className="card-img">
                    <img src="images/blog-img2.jpg" alt="blog-img" />
                    <div className="post-format icon-element">
                      <i className="la la-play" />
                    </div>
                    <div className="card-body">
                      <div className="post-categories">
                        <a href="#" className="badge">Video</a>
                      </div>
                      <h3 className="card-title line-height-26"><a href="blog-single.html">My Best Travel Tips: The Ultimate Travel Guide</a></h3>
                      <p className="card-meta">
                        <span className="post__date"> 1 February, 2020</span>
                        <span className="post-dot" />
                        <span className="post__time">4 Mins read</span>
                      </p>
                    </div>
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <div className="author-content d-flex align-items-center">
                      <div className="author-img">
                        <img src="images/small-team5.jpg" alt="testimonial image" />
                      </div>
                      <div className="author-bio">
                        <a href="#" className="author__title">Abraham Doe</a>
                      </div>
                    </div>
                    <div className="post-share">
                      <ul>
                        <li>
                          <i className="la la-share icon-element" />
                          <ul className="post-share-dropdown d-flex align-items-center">
                            <li><a href="#"><i className="lab la-facebook-f" /></a></li>
                            <li><a href="#"><i className="lab la-twitter" /></a></li>
                            <li><a href="#"><i className="lab la-instagram" /></a></li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>{/* end card-item */}
              </div>{/* end col-lg-4 */}
              <div className="col-lg-4 responsive-column">
                <div className="card-item blog-card">
                  <div className="card-img">
                    <img src="images/blog-img3.jpg" alt="blog-img" />
                    <div className="post-format icon-element">
                      <i className="la la-music" />
                    </div>
                    <div className="card-body">
                      <div className="post-categories">
                        <a href="#" className="badge">audio</a>
                      </div>
                      <h3 className="card-title line-height-26"><a href="blog-single.html">By all Means, Travel to Popular Sites &amp; Don’t Rule Out Other Locations</a></h3>
                      <p className="card-meta">
                        <span className="post__date"> 1 March, 2020</span>
                        <span className="post-dot" />
                        <span className="post__time">3 Mins read</span>
                      </p>
                    </div>
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <div className="author-content d-flex align-items-center">
                      <div className="author-img">
                        <img src="images/small-team6.jpg" alt="testimonial image" />
                      </div>
                      <div className="author-bio">
                        <a href="#" className="author__title">David Martin</a>
                      </div>
                    </div>
                    <div className="post-share">
                      <ul>
                        <li>
                          <i className="la la-share icon-element" />
                          <ul className="post-share-dropdown d-flex align-items-center">
                            <li><a href="#"><i className="lab la-facebook-f" /></a></li>
                            <li><a href="#"><i className="lab la-twitter" /></a></li>
                            <li><a href="#"><i className="lab la-instagram" /></a></li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>{/* end card-item */}
              </div>{/* end col-lg-4 */}
            </div>{/* end row */}
            <div className="row">
              <div className="col-lg-12">
                <div className="btn-box mt-3 text-center">
                  <button type="button" className="theme-btn"><i className="la la-refresh mr-1" />Load More</button>
                  <p className="font-size-13 pt-2">Showing 1 - 6 of 44 Posts</p>
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
                      Lorem ipsum dolor sit amet, consectetur adipisicing
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
                      Lorem ipsum dolor sit amet, consectetur adipisicing
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
                    <h4 className="info__title">Cancel Policy</h4>
                    <p className="info__desc">
                      Lorem ipsum dolor sit amet, consectetur adipisicing
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
export default withRouter(BlogGrid);
