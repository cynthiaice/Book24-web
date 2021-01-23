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

class PaymentReceived extends Component {
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
    START PAYMENT AREA
================================= */}
      <section className="payment-area section-bg section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="form-box payment-received-wrap mb-0">
                <div className="form-title-wrap">
                  <div className="step-bar-wrap text-center">
                    <ul className="step-bar-list d-flex align-items-center justify-content-around">
                      <li className="step-bar flex-grow-1 step-bar-active">
                        <span className="icon-element">1</span>
                        <p className="pt-2 color-text-2">Choose Your Room</p>
                      </li>
                      <li className="step-bar flex-grow-1 step-bar-active">
                        <span className="icon-element">2</span>
                        <p className="pt-2 color-text-2">Your Booking &amp; Payment Details</p>
                      </li>
                      <li className="step-bar flex-grow-1">
                        <span className="icon-element">3</span>
                        <p className="pt-2 color-text-2">Booking Completed!</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="form-content">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="payment-received-list">
                        <h3 className="title font-size-24">EnVision Hotel Boston</h3>
                        <div className="card-rating">
                          <span className="badge badge-warning text-white">4.4/5</span>
                          <span className="review__text text-warning">Average</span>
                          <span className="rating__text">(30 Reviews)</span>
                        </div>
                        <ul className="list-items list-items-2 py-3">
                          <li><span>Location:</span>Delaware, OH, USA</li>
                          <li><span>Check-in:</span>Thu 30 Mar, 2020</li>
                          <li><span>Check-out:</span>Sat 01 Jun, 2020</li>
                          <li><span>Booking details:</span>2 Nights, 1 Room, Max 2 Adult(s)</li>
                          <li><span>Room type:</span>Luxury View Suite</li>
                          <li><span>Client:</span>David Martin</li>
                        </ul>
                      </div>{/* end card-item */}
                    </div>{/* end col-lg-6 */}
                    <div className="col-lg-6">
                      <div className="card-item card-item-list payment-received-card">
                        <div className="card-img">
                          <img src="images/img1.jpg" alt="hotel-img" />
                        </div>
                        <div className="card-body">
                          <h3 className="card-title">1 Room x 2 Nights</h3>
                          <div className="card-price pb-3">
                            <span className="price__from">From</span>
                            <span className="price__num">$88.00</span>
                            <span className="price__text">Per night</span>
                          </div>
                          <div className="section-block" />
                          <p className="card-text pt-3">VAT (7.5%) not included</p>
                        </div>
                      </div>{/* end card-item */}
                    </div>{/* end col-lg-6 */}
                  </div>{/* end row */}
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="payment-received-list">
                        <h3 className="title">Received</h3>
                        <p>Thank you. Your order has been received</p>
                        <div className="table-form table-responsive pt-3 pb-3">
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Order</th>
                                <th scope="col">Date</th>
                                <th scope="col">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">#121</th>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">Thu 30 Mar, 2020</h3>
                                  </div>
                                </td>
                                <td>
                                  <div className="table-content">
                                    <h3 className="title">$88</h3>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p>Make your payment derectly into our bank account. Please use your Order ID as the payment reference. Your order confirmation won't be sent until the funds have cleared in our account</p>
                      </div>{/* end card-item */}
                    </div>{/* end col-lg-6 */}
                    <div className="col-lg-6">
                      <div className="payment-received-list">
                        <h3 className="title">Payment Detail</h3>
                        <div className="table-form table-layout-2 table-responsive pt-3">
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Room</th>
                                <th scope="col" className="text-right">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  <div className="table-content">
                                    <p className="title pb-2">EnVision Hotel Boston</p>
                                    <p className="font-size-13 text-gray line-height-20 font-weight-medium"><span className="mr-2 color-text-2">Start Date:</span>Thu 30 Mar, 2020</p>
                                    <p className="font-size-13 text-gray line-height-20 font-weight-medium"><span className="mr-2 color-text-2">End Date:</span>Sat 01 Jun, 2020</p>
                                  </div>
                                </th>
                                <td>
                                  <div className="table-content text-right">
                                    <h3 className="title color-text">$88</h3>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <div className="table-content">
                                    <p className="title">Subtotal</p>
                                  </div>
                                </th>
                                <td>
                                  <div className="table-content text-right">
                                    <h3 className="title color-text">$88</h3>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <div className="table-content">
                                    <p className="title">Order Total</p>
                                  </div>
                                </th>
                                <td>
                                  <div className="table-content text-right">
                                    <h3 className="title color-text">$88</h3>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>{/* end card-item */}
                    </div>{/* end col-lg-6 */}
                    <div className="col-lg-12">
                      <div className="section-block mt-3" />
                      <div className="btn-box text-center pt-4">
                        <a href="payment-complete.html" className="theme-btn">Book Complete</a>
                      </div>
                    </div>
                  </div>{/* end row */}
                </div>
              </div>{/* end payment-card */}
            </div>{/* end col-lg-12 */}
          </div>{/* end row */}
        </div>{/* end container */}
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
export default withRouter(PaymentReceived);
