import Head from "next/head";
import React, { useState, useEffect } from "react";
import Header from "../components/header";
import BlueLoader from "../components/blueLoader";
import SignInModal from "../components/signInModal";
import Footer from "../components/footer";
import moment from "moment";
import $ from "jquery";
import { useRouter } from "next/router";
import { usePaystackPayment } from "react-paystack";
import Cookies from "js-cookie";
import axios from "axios";
import states from "../components/states.json";
import { connect } from "react-redux";
import { API_URL } from "../components/config.js";
import { useAlert } from "react-alert";

const Checkout = ({ order }) => {
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
  } = order;
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState(
    Cookies.get("mobile_number")
  );
  const [firstName, setFirstName] = useState(Cookies.get("name"));
  const [lastName, setLastName] = useState("");
  const [state, setState] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [pin, setPin] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  const [lgas, setLgas] = useState([]);
  let savedEmail = Cookies.get("email");
  const [email, setEmail] = useState(savedEmail);
  const [isAgreed, setAgreed] = useState(false);

  const alert = useAlert();
  //   const new_price = ((price*(7.5/100))+price)*100)
  console.log(url);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    let token = Cookies.get("token");
    if (token == null || token == "") {
      router.push("/account");
    }
    if (!data) {
      router.push("/");
    }
    // sortLgas();
  }, []);

  // const sortLgas = async () => {
  //   let i;
  //   for (i = 0; i < allLgas.length; i++) {}
  // };

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const reference = randomIntFromInterval(100000, 999999);
  const config = {
    reference,
    email: email || "cynthiakosuji@gmail.com",
    amount: parseInt(price * sub_data && sub_data.no_of_rooms),
    publicKey: "pk_test_93993b4cd4b7bc94f8063af8597c27a5e0bdb5db",
  };

  // you can call this function anything
  const onSuccess = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    setLoader(true);
    data.payment_reference = reference;
    data.paid = true;
    let token = await Cookies.get("token");
    var configHeader = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + url, data, configHeader)
      .then((response) => {
        console.log(response);
        router.push("/payment-complete");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoader(false));
  };

  const onPayAtHotel = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);

    setLoader(true);
    data.payment_reference = "";
    data.paid = false;
    let token = await Cookies.get("token");
    var configHeader = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + url, data, configHeader)
      .then((response) => {
        router.push("/payment-complete");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoader(false));
  };
  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
    setLoader(false);
  };
  const register = async () => {
    //   const { alert } = this.props;
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

    var bodyParameters = {
      full_name: firstName + " " + lastName,
      mobile_number: mobileNumber,
      username: firstName + Math.floor(Math.random() * 10000).toString(),
      email,
      password,
    };
    console.log(bodyParameters);
    axios
      .post(API_URL + "user", bodyParameters, {
        timeout: 20000,
      })
      .then(async (response) => {
        console.log(response);
        let id = response.data.user.id;
        let token = response.data.authToken.token;
        let role = response.data.user.role;
        let name = response.data.user.full_name;
        Cookies.set("token", token, { expires: 14 });
        Cookies.set("id", id, { expires: 14 });
        Cookies.set("role", role, { expires: 14 });
        Cookies.set("name", name, { expires: 14 });
        return payWithCard();
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({
          error: error.response.data,
          loader: false,
        });
        alert.show(<div>{error.response.data.message}</div>, {
          type: "error",
        });
        console.log(JSON.stringify(error));
      });
  };
  const payWithCard = async () => {
    const SECRET_KEY = "sk_test_fe684610a63eb2dd9888f7d26bbe8c4c63445305";
    let token = Cookies.get("token");
    if (token == null || token == "") {
      return register();
    } else if (!cardName) {
      alert.show(<div>Please Input Card Holder Name!</div>, {
        type: "error",
      });
    } else if (!cardNumber) {
      alert.show(<div>Please Input Card Number!</div>, {
        type: "error",
      });
    } else if (!month) {
      alert.show(<div>Please Input Card Expiry Month!</div>, {
        type: "error",
      });
    } else if (!year) {
      alert.show(<div>Please Input Card Expiry Year!</div>, {
        type: "error",
      });
    } else if (!cvv) {
      alert.show(
        <div>
          Please Input cvv (Last three digits at the back of your card)
        </div>,
        {
          type: "error",
        }
      );
    } else if (!pin) {
      alert.show(<div>Please Input Your Pin!</div>, {
        type: "error",
      });
    } else if (!isAgreed) {
      alert.show(
        <div>Please Accept Our Terms and Conditions to Continue</div>,
        {
          type: "error",
        }
      );
    } else {
      setLoader(true);
      var configHeader = {
        headers: { Authorization: "Bearer " + SECRET_KEY },
        // timeout: 20000,
      };
      console.log("n");
      let paystack_email = "akinpejuyusuf@gmail.com";
      var data = {
        email: email,
        amount: price * 100,
        card: {
          cvv: cvv,
          number: cardNumber,
          expiry_month: month,
          expiry_year: year,
        },
        pin,
      };
      console.log(data);
      axios
        .post("https://api.paystack.co/charge", data, configHeader)
        .then((response) => {
          console.log(response.data.data.reference);
          return onSuccess(response.data.data.reference);
          //  router.push("/payment-complete");
        })
        .catch((error) => {
          alert.show(
            <div>
              {(error &&
                error.response &&
                error.response.data &&
                error.response.data.data &&
                error.response.data.data.message) ||
                (error &&
                  error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                "An error has occured, please try again"}
            </div>,
            {
              type: "error",
            }
          );

          setLoader(false);
        });
    }
  };

  //  if(!price){
  // router.push('/listing')
  //  }
  const initializePayment = usePaystackPayment(config);

  const setPayText = () => {
    let text;
    if (price == 0) {
      text = "Complete Booking";
    } else if (url === "hotelBooking") {
      text = "Pay At Hotel";
    } else if (
      url === "eventTicket" ||
      url === "tourBooking" ||
      url === "cruiseBooking"
    ) {
      text = "Pay At Venue";
    } else if (url === "rentalBooking" || url === "carBooking") {
      text = "Pay at Property";
    }
    return text;
  };
  return (
    <div>
      <Head>
        <meta
          name="description"
          content="Book24 - Advanced Travel and Event Booking Solution.."
        />
        <meta name="author" content="Book24" />
        <title>Book24 | Advanced Travel and Event Booking Solution.</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="css/bootstrap.min.css" rel="stylesheet" />
        <link href="css/style.css" rel="stylesheet" />
        <link href="css/vendors.css" rel="stylesheet" />
        <link href="css/custom.css" rel="stylesheet" />
        <link rel="stylesheet" href="css/bootstrap-select.min.css" />
      </Head>
      <div id="page">
        <div
          class={`preloader preloader_transparent ${
            loader ? "" : "preloader-hidden"
          }`}
          id="preloader"
        >
          <div class="loader">
            <svg class="spinner" viewBox="0 0 50 50">
              <circle
                class="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke-width="5"
              ></circle>
            </svg>
          </div>
        </div>
        <Header makeBlue={true} />
        <div className="sub_header_in sticky_header">
          <div className="container">
            <h1>Checkout - Booking</h1>
          </div>
        </div>
        {/* ================================
        
    END BREADCRUMB AREA
================================= */}
        {/* ================================
    START BOOKING AREA
================================= */}
        <section className="booking-area padding-top-100px padding-bottom-70px">
          <div className="container">
            <div className="row">
              {" "}
              <div className="col-lg-8">
                <div className="form-box">
                  <div className="form-title-wrap">
                    <h3 className="title">Your Details</h3>
                  </div>
                  {/* form-title-wrap */}
                  <div className="form-content ">
                    <div className="contact-form-action">
                      <form>
                        <div className="row">
                          <div className="col-lg-12 responsive-column">
                            <div className="input-box">
                              <label className="label-text">Full Name</label>
                              <div className="form-group">
                                <span className="la la-user form-icon" />
                                <input
                                  className="form-control"
                                  type="text"
                                  name="text"
                                  placeholder="Full Name"
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-6 responsive-column">
                            <div className="input-box">
                              <label className="label-text">Your Email</label>
                              <div className="form-group">
                                <span className="la la-envelope-o form-icon" />
                                <input
                                  className="form-control"
                                  type="email"
                                  name="email"
                                  placeholder="Email address"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          {/* end col-lg-6 */}

                          <div className="col-lg-6 responsive-column">
                            <div className="input-box">
                              <label className="label-text">Phone Number</label>
                              <div className="form-group">
                                <span className="la la-phone form-icon" />
                                <input
                                  className="form-control"
                                  type="text"
                                  name="text"
                                  placeholder="Phone Number"
                                  value={mobileNumber}
                                  onChange={(e) =>
                                    setMobileNumber(e.target.value)
                                  }
                                  disabled
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="input-box">
                              <div className="form-group mb-0">
                                <div className="custom-checkbox mb-0">
                                  <input type="checkbox" id="receiveChb" />
                                  <label htmlFor="receiveChb">
                                    I want to receive Book24's promotional
                                    offers in the future
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* end col-lg-12 */}

                          {/* end col-lg-12 */}
                          <div
                            className="col-lg-12 mt-2 d-flex"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <div className="btn-box">
                              <button
                                className="theme-btn"
                                type="button"
                                onClick={() => {
                                  setShowPayment(false);
                                  onPayAtHotel();
                                }}
                              >
                                {setPayText()}
                              </button>
                            </div>
                            {price !== 0 && (
                              <div className="btn-box ml-4">
                                <button
                                  className="theme-btn green-theme-button"
                                  type="button"
                                  onClick={() => {
                                    setShowPayment(true);
                                  }}
                                >
                                  Pay Now
                                </button>
                              </div>
                            )}
                          </div>
                          {/* end col-lg-12 */}
                        </div>
                      </form>
                    </div>
                    {/* end contact-form-action */}
                  </div>
                  {/* end form-content */}
                </div>
                {/* end form-box */}
                {showPayment && (
                  <div className="form-box">
                    <div className="form-title-wrap">
                      <h3 className="title">Your Card Information</h3>
                    </div>
                    {/* form-title-wrap */}
                    <div className="form-content">
                      <div className="section-tab check-mark-tab text-center pb-4">
                        <ul
                          className="nav nav-tabs justify-content-center"
                          id="myTab"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              id="credit-card-tab"
                              data-toggle="tab"
                              href="#credit-card"
                              role="tab"
                              aria-controls="credit-card"
                              aria-selected="false"
                            >
                              <i className="la la-check icon-element" />
                              <img
                                src="/images/cards.png"
                                alt=""
                                width={"100px"}
                                height={"24px"}
                              />
                              <span className="d-block pt-2">
                                Payment with credit card
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* end section-tab */}
                      <div className="tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="credit-card"
                          role="tabpanel"
                          aria-labelledby="credit-card-tab"
                        >
                          <div className="contact-form-action">
                            <form>
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Card Holder Name
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-credit-card form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="text"
                                        placeholder="Card holder name"
                                        value={cardName}
                                        onChange={(e) =>
                                          setCardName(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-6 */}
                                <div className="col-lg-6">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Card Number
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-credit-card form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="text"
                                        placeholder="Card number"
                                        value={cardNumber}
                                        onChange={(e) =>
                                          setCardNumber(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-6 */}
                                <div className="col-lg-6">
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <div className="input-box">
                                        <label className="label-text">
                                          Expiry Month
                                        </label>
                                        <div className="form-group">
                                          <span className="la la-credit-card form-icon" />
                                          <input
                                            className="form-control"
                                            type="text"
                                            name="text"
                                            placeholder="MM"
                                            value={month}
                                            onChange={(e) =>
                                              setMonth(e.target.value)
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="input-box">
                                        <label className="label-text">
                                          Expiry Year
                                        </label>
                                        <div className="form-group">
                                          <span className="la la-credit-card form-icon" />
                                          <input
                                            className="form-control"
                                            type="text"
                                            name="text"
                                            placeholder="YY"
                                            value={year}
                                            onChange={(e) =>
                                              setYear(e.target.value)
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-6 */}
                                <div className="col-lg-6">
                                  <div className="input-box">
                                    <label className="label-text">CVV</label>
                                    <div className="form-group">
                                      <span className="la la-pencil form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="text"
                                        placeholder="CVV"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-6 */}
                                <div className="col-lg-12">
                                  <div className="input-box">
                                    <label className="label-text">Pin</label>
                                    <div className="form-group">
                                      <span className="la la-pencil form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="text"
                                        placeholder="PIN"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="input-box">
                                    <div className="form-group">
                                      <div className="custom-checkbox">
                                        <input
                                          type="checkbox"
                                          id="agreechb"
                                          onChange={() => setAgreed(!isAgreed)}
                                          checked={isAgreed}
                                        />
                                        <label htmlFor="agreechb">
                                          By continuing, you agree to the{" "}
                                          <a href="/terms">
                                            Terms and Conditions
                                          </a>
                                          .
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-12 */}
                                <div className="col-lg-12">
                                  <div className="btn-box">
                                    <button
                                      className="theme-btn"
                                      type="button"
                                      onClick={() => payWithCard()}
                                    >
                                      Confirm Booking
                                    </button>
                                  </div>
                                </div>
                                {/* end col-lg-12 */}
                              </div>
                            </form>
                          </div>
                          {/* end contact-form-action */}
                        </div>
                        {/* end tab-pane*/}
                        <div
                          className="tab-pane fade"
                          id="paypal"
                          role="tabpanel"
                          aria-labelledby="paypal-tab"
                        >
                          <div className="contact-form-action">
                            <form method="post">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Email Address
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-envelope form-icon" />
                                      <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        placeholder="Enter email address"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-6 */}
                                <div className="col-lg-6">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Password
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-lock form-icon" />
                                      <input
                                        className="form-control"
                                        type="password"
                                        name="text"
                                        placeholder="Enter password"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-6 */}
                                <div className="col-lg-12">
                                  <div className="btn-box">
                                    <button className="theme-btn" type="submit">
                                      Login Account
                                    </button>
                                  </div>
                                </div>
                                {/* end col-lg-12 */}
                              </div>
                            </form>
                          </div>
                          {/* end contact-form-action */}
                        </div>
                        {/* end tab-pane*/}
                        <div
                          className="tab-pane fade"
                          id="payoneer"
                          role="tabpanel"
                          aria-labelledby="payoneer-tab"
                        >
                          <div className="contact-form-action">
                            <form method="post">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Email Address
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-envelope form-icon" />
                                      <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        placeholder="Enter email address"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-6 */}
                                <div className="col-lg-6">
                                  <div className="input-box">
                                    <label className="label-text">
                                      Password
                                    </label>
                                    <div className="form-group">
                                      <span className="la la-lock form-icon" />
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="text"
                                        placeholder="Enter password"
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* end col-lg-6 */}
                                <div className="col-lg-12">
                                  <div className="btn-box">
                                    <button className="theme-btn" type="submit">
                                      Login Account
                                    </button>
                                  </div>
                                </div>
                                {/* end col-lg-12 */}
                              </div>
                            </form>
                          </div>
                          {/* end contact-form-action */}
                        </div>
                        {/* end tab-pane*/}
                      </div>
                      {/* end tab-content */}
                    </div>
                    {/* end form-content */}
                  </div>
                )}
              </div>
              {/* end col-lg-8 */}
              <div className="col-lg-4">
                <div className="form-box booking-detail-form">
                  <div className="form-title-wrap">
                    <h3 className="title">Your Booking</h3>
                  </div>
                  {/* end form-title-wrap */}
                  <div className="form-content">
                    <div className="card-item shadow-none radius-none mb-0">
                      <div className="card-img pb-4">
                        <a href="room-details.html" className="d-block">
                          <img src={image} alt="image" />
                        </a>
                      </div>
                      <div className="card-body p-0">
                        <div className="d-flex justify-content-between">
                          <div>
                            {url === "hotelBooking" ? (
                              <h3 className="card-title">
                                {sub_name} × {sub_data && sub_data.no_of_rooms}
                              </h3>
                            ) : (
                              <h3 className="card-title">
                                {sub_data && sub_data.type} ×{" "}
                                {sub_data && sub_data.no_of_tickets}
                              </h3>
                            )}
                            <p className="card-meta">{name}</p>
                          </div>
                          <div>
                            <a href="room-details.html" className="btn ml-1">
                              <i
                                className="la la-edit"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Edit"
                              />
                            </a>
                          </div>
                        </div>
                        <div className="section-block" />
                        <ul className="list-items list-items-2 list--items-2 py-2">
                          <li className="font-size-15">
                            <span className="w-auto d-block mb-n1">
                              <i className="la la-calendar mr-1 font-size-17" />
                              From
                            </span>
                            {check_in_date}
                          </li>
                          <li className="font-size-15">
                            <span className="w-auto d-block mb-n1">
                              <i className="la la-calendar mr-1 font-size-17" />
                              To
                            </span>
                            {check_out_date}
                          </li>
                        </ul>
                        {/* <h3 className="card-title pb-3">Order Details</h3>
                        <div className="section-block" />
                        <ul className="list-items list-items-2 py-3">
						{sub_data !== null && Object.keys(sub_data).forEach(function(key,index) {
							<li>
                            <span>{key}:</span>{sub_data.key}
                          </li> 
})};
                        </ul> */}
                        <div className="section-block" />
                        <ul className="list-items list-items-2 pt-3">
                          <li>
                            <span>Sub Total:</span>
                            {"\u20a6"}
                            {price != null &&
                              price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </li>

                          <li>
                            <span>Total Price:</span>
                            {"\u20a6"}
                            {price != null &&
                              price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </li>
                        </ul>
                        <div class="col-lg-12">
                          {/* <div class="btn-box">
                                                    <button class="theme-btn" 
													onClick={() => {
							setLoader(true)
                initializePayment(onSuccess, onClose)
            }}>CONTINUE</button>
                                                </div> */}
                        </div>
                      </div>
                    </div>
                    {/* end card-item */}
                  </div>
                  {/* end form-content */}
                </div>
                {/* end form-box */}
              </div>
              {/* end col-lg-4 */}
            </div>
            {/* end row */}
          </div>
          {/* end container */}
        </section>
        {/* end booking-area */}
        {/* ================================
    END BOOKING AREA
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
                  </div>
                  {/* end info-icon*/}
                  <div className="info-content">
                    <h4 className="info__title">Need Help? Contact us</h4>
                    <p className="info__desc">
                      We are always available to assist you
                    </p>
                  </div>
                  {/* end info-content */}
                </a>
                {/* end icon-box */}
              </div>
              {/* end col-lg-4 */}
              <div className="col-lg-4 responsive-column">
                <a href="#" className="icon-box icon-layout-2 d-flex">
                  <div className="info-icon flex-shrink-0 bg-rgb-2 text-color-3">
                    <i className="la la-money" />
                  </div>
                  {/* end info-icon*/}
                  <div className="info-content">
                    <h4 className="info__title">Payments</h4>
                    <p className="info__desc">
                      All payments are processed through secure channels
                    </p>
                  </div>
                  {/* end info-content */}
                </a>
                {/* end icon-box */}
              </div>
              {/* end col-lg-4 */}
              <div className="col-lg-4 responsive-column">
                <a href="#" className="icon-box icon-layout-2 d-flex">
                  <div className="info-icon flex-shrink-0 bg-rgb-3 text-color-4">
                    <i className="la la-times" />
                  </div>
                  {/* end info-icon*/}
                  <div className="info-content">
                    <h4 className="info__title">Cancel Policy</h4>
                    <p className="info__desc">
                      Kindly refer to cancellation policy of property/service
                      provider
                    </p>
                  </div>
                  {/* end info-content */}
                </a>
                {/* end icon-box */}
              </div>
              {/* end col-lg-4 */}
            </div>
            {/* end row */}
          </div>
          {/* end container */}
        </section>
        {/* end info-area */}
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
                  <p className="sec__desc text-white-50 pb-1">
                    Newsletter sign up
                  </p>
                  <h2 className="sec__title font-size-30 text-white">
                    Subscribe to Get Special Offers
                  </h2>
                </div>
                {/* end section-heading */}
              </div>
              {/* end col-lg-7 */}
              <div className="col-lg-5">
                <div className="subscriber-box">
                  <div className="contact-form-action">
                    <div className="input-box">
                      <label className="label-text text-white">
                        Enter email address
                      </label>
                      <div className="form-group mb-0">
                        <span className="la la-envelope form-icon" />
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          placeholder="Email address"
                        />
                        <button
                          className="theme-btn theme-btn-small submit-btn"
                          type="submit"
                        >
                          Subscribe
                        </button>
                        <span className="font-size-14 pt-1 text-white-50">
                          <i className="la la-lock mr-1" />
                          Don't worry your information is safe with us.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end section-heading */}
              </div>
              {/* end col-lg-5 */}
            </div>
            {/* end row */}
          </div>
          {/* end container */}
        </section>
        {/* end cta-area */}
        {/* ================================
    END CTA AREA
================================= */}
        <Footer />
      </div>
      <SignInModal />
      <div id="toTop"></div>
      <script src="js/common_scripts.js"></script>
      <script src="js/functions.js"></script>
      <script src="assets/validate.js"></script>
      {/* <script>{`
		$('.wish_bt.liked').on('click', function (c) {
			$(this).parent().parent().parent().fadeOut('slow', function (c) {});
		});
        `}</script> */}
      {/* <style global jsx>{`
          body {
            background: #fff;
          }
        `}</style> */}
    </div>
  );
};
const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps)(Checkout);
