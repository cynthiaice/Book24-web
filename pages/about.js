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

class About extends Component {
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
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-content">
                    <div className="section-heading">
                      <h2 className="sec__title line-height-50">Book24 is your trusted <br /> travel and event solution provider.</h2>
                    </div>
                  </div>{/* end breadcrumb-content */}
                </div>{/* end col-lg-12 */}
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
    START INFO AREA
================================= */}
        <section className="info-area padding-top-100px padding-bottom-70px">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 responsive-column">
                <div className="card-item ">
                  <div className="card-img">
                    <img src="images/blue.png" alt="about-img" />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title mb-2">Who We Are?</h3>
                    <p className="card-text">
                    Book24.ng is a one-stop advanced travel and event booking solution. An indegenous start-up with big ambition.
                    </p>
                  </div>
                </div>{/* end card-item */}
              </div>{/* end col-lg-4 */}
              <div className="col-lg-4 responsive-column">
                <div className="card-item ">
                  <div className="card-img">
                    <img src="images/blue.png" alt="about-img" />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title mb-2">What We Do?</h3>
                    <p className="card-text">
                    We simplifythe Nigerian Travel and Event Industry, while offering  great deals at affordable prices.
                    </p>
                  </div>
                </div>{/* end card-item */}
              </div>{/* end col-lg-4 */}
              <div className="col-lg-4 responsive-column">
                <div className="card-item ">
                  <div className="card-img">
                    <img src="images/blue.png" alt="about-img" />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title mb-2">Our Mission</h3>
                    <p className="card-text">
                    At book24.ng, our mission is to revolutionalize the travel and event industry in Nigeria.
                    </p>
                  </div>
                </div>{/* end card-item */}
              </div>{/* end col-lg-4 */}
            </div>{/* end row */}
          </div>{/* end container */}
        </section>{/* end info-area */}
        {/* ================================
    END INFO AREA
================================= */}
        {/* ================================
    START ABOUT AREA
================================= */}
        <section className="about-area padding-bottom-90px overflow-hidden">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="section-heading margin-bottom-40px">
                  <h2 className="sec__title">About Us</h2>
                  <h4 className="title font-size-16 line-height-26 pt-4 pb-2">Founded in 2020 in Lagos Nigeria, Book24.ng is a start-up digital travel and event management company.</h4>
                  <p className="sec__desc font-size-16 pb-3">Book24.ng’s mission is to make it easier for everyone to experience the best of Nigeria. </p>
                  <p className="sec__desc font-size-16 pb-3">By investing in the technology that helps take the hassle out of hotel booking, travel booking, event ticketing, and other entertainment desires, Book24.ng is aimed at seamlessly connecting millions of travellers with memorable experiences in Nigeria. </p>
                  <p className="sec__desc font-size-16">Book24.ng is a one-stop advanced travel booking solution that is aimed at revolutionizing and simplifying the Nigerian Travel Industry at affordable prices while offering excellent customer support.</p>
                </div>{/* end section-heading */}
              </div>{/* end col-lg-6 */}
              <div className="col-lg-5 ml-auto">
                <div className="image-box about-img-box">
                  <img src="images/book24logo.png" alt="about-img" className="img__item img__item-1" />
                  
                </div>
              </div>{/* end col-lg-5 */}
            </div>{/* end row */}
          </div>{/* end container */}
        </section>{/* end about-area */}
        {/* ================================
    END ABOUT AREA
================================= */}
        {/* ================================
    STAR FUNFACT AREA
================================= */}
        <section className="funfact-area padding-bottom-70px">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-heading text-center">
                  <h2 className="sec__title">Our Services Speak Volume</h2>
                </div>{/* end section-heading */}
              </div>{/* end col-lg-12 */}
            </div>{/* end row */}
            <div className="counter-box counter-box-2 margin-top-60px mb-0">
              <div className="row">
                <div className="col-lg-3 responsive-column">
                  <div className="counter-item counter-item-layout-2 d-flex">
                    <div className="counter-icon flex-shrink-0">
                      <i className="la la-users" />
                    </div>
                    <div className="counter-content">
                      <div>
                        <span className="counter" data-from={0} data-to={200} data-refresh-interval={5}>0</span>
                        <span className="count-symbol">+</span>
                      </div>
                      <p className="counter__title">Events and Cruises</p>
                    </div>{/* end counter-content */}
                  </div>{/* end counter-item */}
                </div>{/* end col-lg-3 */}
                <div className="col-lg-3 responsive-column">
                  <div className="counter-item counter-item-layout-2 d-flex">
                    <div className="counter-icon flex-shrink-0">
                      <i className="la la-building" />
                    </div>
                    <div className="counter-content">
                      <div>
                        <span className="counter" data-from={0} data-to={400} data-refresh-interval={5}>0</span>
                        <span className="count-symbol">+</span>
                      </div>
                      <p className="counter__title">Hotels and Rentals</p>
                    </div>{/* end counter-content */}
                  </div>{/* end counter-item */}
                </div>{/* end col-lg-3 */}
                <div className="col-lg-3 responsive-column">
                  <div className="counter-item counter-item-layout-2 d-flex">
                    <div className="counter-icon flex-shrink-0">
                      <i className="la la-globe" />
                    </div>
                    <div className="counter-content">
                      <div>
                        <span className="counter" data-from={0} data-to={200} data-refresh-interval={5}>0</span>
                        <span className="count-symbol">+</span>
                      </div>
                      <p className="counter__title">Flight and Tour</p>
                    </div>{/* end counter-content */}
                  </div>{/* end counter-item */}
                </div>{/* end col-lg-3 */}
                <div className="col-lg-3 responsive-column">
                  <div className="counter-item counter-item-layout-2 d-flex">
                    <div className="counter-icon flex-shrink-0">
                      <i className="la la-check-circle" />
                    </div>
                    <div className="counter-content">
                      <div>
                        <span className="counter" data-from={0} data-to={100} data-refresh-interval={5}>0</span>
                        <span className="count-symbol">+</span>
                      </div>
                      <p className="counter__title">Activity and Car</p>
                    </div>{/* end counter-content */}
                  </div>{/* end counter-item */}
                </div>{/* end col-lg-3 */}
              </div>{/* end row */}
            </div>{/* end counter-box */}
          </div>{/* end container */}
        </section>
        {/* ================================
    END FUNFACT AREA
================================= */}
        
        {/* ================================
    START INFO AREA
================================= */}
        <section className="info-area padding-top-100px padding-bottom-60px text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-heading">
                  <h2 className="sec__title">Our Dedicated Team</h2>
                </div>{/* end section-heading */}
              </div>{/* end col-lg-12 */}
            </div>{/* end row */}
            <div className="row padding-top-100px">
              <div className="col-lg-4 responsive-column">
                <div className="card-item team-card">
                  <div className="card-img">
                    <img src="images/tayo.jpg" alt="team-img" />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">Anthony Adediran</h3>
                    <p className="card-meta">Founder &amp; Chief Executive Officer</p>
                    <p className="card-text font-size-15 pt-2"></p>
                    <ul className="social-profile padding-top-20px pb-2">
                      <li><a href="https://facebook.com/anthony.adediran.77"><i className="lab la-facebook-f" /></a></li>
                      <li><a href="https://twitter.com/TayoAdediran6"><i className="lab la-twitter" /></a></li>
                      <li><a href="#"><i className="lab la-instagram" /></a></li>
                      <li><a href="#"><i className="lab la-linkedin-in" /></a></li>
                    </ul>
                  </div>
                </div>{/* end card-item */}
              </div>{/* end col-lg-4 */}
              <div className="col-lg-4 responsive-column">
                <div className="card-item team-card">
                  <div className="card-img">
                    <img src="images/cynthia.jpg" alt="team-img" />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">Cynthia Osuji</h3>
                    <p className="card-meta">Chief Technical Officer</p>
                    <p className="card-text font-size-15 pt-2"></p>
                    <ul className="social-profile padding-top-20px pb-2">
                      <li><a href="https://facebook.com/iamcynthiaice"><i className="lab la-facebook-f" /></a></li>
                      <li><a href="https://twitter.com/iamcynthiaice"><i className="lab la-twitter" /></a></li>
                      <li><a href="https://instagram.com/iamcynthiaice"><i className="lab la-instagram" /></a></li>
                      <li><a href="https://linkedin.com/in/cynthia-osuji"><i className="lab la-linkedin-in" /></a></li>
                    </ul>
                  </div>
                </div>{/* end card-item */}
              </div>{/* end col-lg-4 */}
              <div className="col-lg-4 responsive-column">
                <div className="card-item team-card">
                  <div className="card-img">
                    <img src="images/team3.jpg" alt="team-img" />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">Bimpe Babatunde</h3>
                    <p className="card-meta">HR Director</p>
                    <p className="card-text font-size-15 pt-2"></p>
                    <ul className="social-profile padding-top-20px pb-2">
                      <li><a href="#"><i className="lab la-facebook-f" /></a></li>
                      <li><a href="#"><i className="lab la-twitter" /></a></li>
                      <li><a href="#"><i className="lab la-instagram" /></a></li>
                      <li><a href="#"><i className="lab la-linkedin-in" /></a></li>
                    </ul>
                  </div>
                </div>{/* end card-item */}
              </div>{/* end col-lg-4 */}
              <div className="col-lg-4 responsive-column">
                <div className="card-item team-card">
                  <div className="card-img">
                    <img src="images/team4.jpg" alt="team-img" />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">Sade Adediran</h3>
                    <p className="card-meta">Accounts Manager</p>
                    <p className="card-text font-size-15 pt-2"></p>
                    <ul className="social-profile padding-top-20px pb-2">
                      <li><a href="#"><i className="lab la-facebook-f" /></a></li>
                      <li><a href="#"><i className="lab la-twitter" /></a></li>
                      <li><a href="#"><i className="lab la-instagram" /></a></li>
                      <li><a href="#"><i className="lab la-linkedin-in" /></a></li>
                    </ul>
                  </div>
                </div>{/* end card-item */}
              </div>{/* end col-lg-4 */}
              <div className="col-lg-4 responsive-column">
                <div className="card-item team-card">
                  <div className="card-img">
                    <img src="images/team5.jpg" alt="team-img" />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">Kyle Martin</h3>
                    <p className="card-meta">Customer Service Manager </p>
                    <p className="card-text font-size-15 pt-2"></p>
                    <ul className="social-profile padding-top-20px pb-2">
                      <li><a href="#"><i className="lab la-facebook-f" /></a></li>
                      <li><a href="#"><i className="lab la-twitter" /></a></li>
                      <li><a href="#"><i className="lab la-instagram" /></a></li>
                      <li><a href="#"><i className="lab la-linkedin-in" /></a></li>
                    </ul>
                  </div>
                </div>{/* end card-item */}
              </div>{/* end col-lg-4 */}
              <div className="col-lg-4 responsive-column">
                <div className="card-item team-card">
                  <div className="card-img">
                    <img src="images/team6.jpg" alt="team-img" />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">Evan Porter</h3>
                    <p className="card-meta">Brand Manager</p>
                    <p className="card-text font-size-15 pt-2"></p>
                    <ul className="social-profile padding-top-20px pb-2">
                      <li><a href="#"><i className="lab la-facebook-f" /></a></li>
                      <li><a href="#"><i className="lab la-twitter" /></a></li>
                      <li><a href="#"><i className="lab la-instagram" /></a></li>
                      <li><a href="#"><i className="lab la-linkedin-in" /></a></li>
                    </ul>
                  </div>
                </div>{/* end card-item */}
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
        <section className="cta-area cta-bg-2 bg-fixed section-padding text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-heading">
                  <h2 className="sec__title mb-3 text-white">Interested in a career <br /> at Book24?</h2>
                  <p className="sec__desc text-white">We’re always looking for talented individuals and
                    <br /> people who are hungry to revolutinalize the travel and event industry.
                  </p>
                </div>{/* end section-heading */}
                <div className="btn-box padding-top-35px">
                  <a href="/careers" className="theme-btn border-0">Join Our Team</a>
                </div>
              </div>{/* end col-lg-12 */}
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
export default withRouter(About);
