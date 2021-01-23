import Head from "next/head";
import React, { Component } from "react";
import Header from "../components/header";
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
import { API_URL } from "../components/config.js";
import { connect } from "react-redux";

class PaymentComplete extends Component {
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
    window.scrollTo({ top: 0 });
    let token = await Cookies.get("token");
    if (token == null || token == "") {
      console.log("false tojken");
      this.setState({ auth: false });
    } else {
      console.log(token);
      this.setState({ auth: true, token });
    }
  }

  setBookedText = () => {
    let { url } = this.props.order;
    let text;
    if (url === "hotelBooking") {
      text = "Room";
    } else if (url === "eventTicket") {
      text = "Ticket";
    } else if (url === "tourBooking") {
      text = "Package";
    } else {
      text = "Preference";
    }
    return text;
  };
  render() {
    const {
      type,

      address,
      description,
      check_in_time,
      check_out_time,
      sub_items,
    } = this.state;
    let {
      price,
      data,
      url,
      sub_name,
      name,
      image,
      check_in_date,
      check_out_date,
      sub_data,
    } = this.props.order;
    let nights = Math.abs(
      moment(check_in_date).diff(moment(check_out_date), "days") || 1
    );

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
          {/* ================================
    START PAYMENT AREA
================================= */}
          <section className="payment-area section-bg section-padding pt-4">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-box payment-received-wrap mb-0">
                    <div className="form-title-wrap">
                      <div className="step-bar-wrap text-center">
                        <ul className="step-bar-list d-flex align-items-center justify-content-around">
                          <li className="step-bar flex-grow-1 step-bar-active">
                            <span className="icon-element">1</span>
                            <p className="pt-2 color-text-2">
                              Choose Your {this.setBookedText()}
                            </p>
                          </li>
                          <li className="step-bar flex-grow-1 step-bar-active">
                            <span className="icon-element">2</span>
                            <p className="pt-2 color-text-2">
                              Your Booking &amp; Payment Details
                            </p>
                          </li>
                          <li className="step-bar flex-grow-1 step-bar-active">
                            <span className="icon-element">3</span>
                            <p className="pt-2 color-text-2">
                              Booking Completed!
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="form-content">
                      <div className="payment-received-list">
                        <div className="d-flex align-items-center">
                          <i className="la la-check icon-element flex-shrink-0 mr-3 ml-0" />
                          <div>
                            <h3 className="title pb-1">
                              Thanks {Cookies.get("name")}!
                            </h3>
                            <h3 className="title">
                              Your booking in {sub_data.hotel_name} is
                              confirmed.
                            </h3>
                          </div>
                        </div>
                        <ul className="list-items py-4">
                          <li>
                            <i className="la la-check text-success mr-2" />
                            <strong className="text-black">{name}</strong> is
                            Expecting you on{" "}
                            <strong className="text-black">
                              {check_in_date}
                            </strong>
                          </li>
                          <li>
                            <i className="la la-check text-success mr-2" />
                            Your <strong className="text-black">
                              payment
                            </strong>{" "}
                            will be handled by {name}
                          </li>
                          {/* <li>
                            <i className="la la-check text-success mr-2" />
                            Make changes to your booking or ask the properly a
                            question in just a few clicks
                          </li> */}
                        </ul>
                        <div className="btn-box pb-4">
                          {/* <a href="#" className="theme-btn mb-2 mr-2">
                            Make changes to your booking
                          </a> */}
                          <a
                            href="#"
                            className="theme-btn mb-2 theme-btn-transparent"
                          >
                            Make your booking in the app
                          </a>
                        </div>
                        <h3 className="title">
                          <a href="#" className="text-black">
                            {sub_data.hotel_name}
                          </a>
                        </h3>
                        <p>{sub_data.hotel_address}</p>
                        {/* <p className="py-1">
                          <a href="#" className="text-color">
                            Click for directions on Google maps{" "}
                            <i className="la la-arrow-right" />
                          </a>
                        </p> */}
                        <p>
                          <strong className="text-black mr-1">Phone: </strong>
                          {sub_data.hotel_number}
                        </p>
                        <ul className="list-items list-items-3 list-items-4 py-4">
                          {url === "hotelBooking" ? (
                            <li>
                              <span className="text-black font-weight-bold">
                                Your reservation
                              </span>
                              {(nights === 1 && nights + " Night") || " Nights"}
                              ,
                              {(sub_data.no_of_rooms === 1 &&
                                " " + sub_data.no_of_rooms + " Room") ||
                                " " + sub_data.no_of_rooms + " Rooms"}
                            </li>
                          ) : null}
                          <li>
                            <span className="text-black font-weight-bold">
                              {url === "hotelBooking"
                                ? "Check-in"
                                : "Start Date"}
                            </span>
                            {check_in_date}
                          </li>
                          <li>
                            <span className="text-black font-weight-bold">
                              {url === "hotelBooking"
                                ? "Check-out"
                                : "Start Date"}
                            </span>
                            {check_out_date}
                          </li>
                          {/* <li>
                            <span className="text-black font-weight-bold">
                              Prepayment
                            </span>
                            You will be charged a prepayment of the total price
                            at any time.
                          </li>
                          <li>
                            <span className="text-black font-weight-bold">
                              Cancellation cost
                            </span>
                            From now on: USD 34
                          </li> */}
                        </ul>
                        {/* <div className="btn-box">
                      <a href="#" className="theme-btn border-0 text-white bg-7">Cancel your booking</a>
                    </div> */}
                      </div>
                      {/* end card-item */}
                    </div>
                  </div>
                  {/* end payment-card */}
                </div>
                {/* end col-lg-12 */}
              </div>
              {/* end row */}
            </div>
            {/* end container */}
          </section>
          {/* ================================
    END PAYMENT AREA
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
    order: state.order,
  };
};

const PaymentComplete_ = withRouter(PaymentComplete);
export default connect(mapStateToProps)(PaymentComplete_);
