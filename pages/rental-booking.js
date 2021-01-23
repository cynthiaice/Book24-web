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

class RentalBooking extends Component {
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
<section className="breadcrumb-area bread-bg">
          <div className="breadcrumb-wrap">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="breadcrumb-content">
                    <div className="section-heading">
                      <h2 className="sec__title">Rental Booking</h2>
                    </div>
                  </div>{/* end breadcrumb-content */}
                </div>{/* end col-lg-6 */}
                <div className="col-lg-6">
                  <div className="breadcrumb-list">
                    <ul className="list-items d-flex justify-content-end">
                      <li><a href="index.html">Home</a></li>
                      <li>Rental Booking</li>
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
    START BOOKING AREA
================================= */}
        <section className="booking-area padding-top-100px padding-bottom-70px">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="form-box">
                  <div className="form-title-wrap">
                    <h3 className="title">Your Personal Information</h3>
                  </div>{/* form-title-wrap */}
                  <div className="form-content ">
                    <div className="contact-form-action">
                      <form method="post">
                        <div className="row">
                          <div className="col-lg-6 responsive-column">
                            <div className="input-box">
                              <label className="label-text">First Name</label>
                              <div className="form-group">
                                <span className="la la-user form-icon" />
                                <input className="form-control" type="text" name="text" placeholder="First name" />
                              </div>
                            </div>
                          </div>{/* end col-lg-6 */}
                          <div className="col-lg-6 responsive-column">
                            <div className="input-box">
                              <label className="label-text">Last Name</label>
                              <div className="form-group">
                                <span className="la la-user form-icon" />
                                <input className="form-control" type="text" name="text" placeholder="Last name" />
                              </div>
                            </div>
                          </div>{/* end col-lg-6 */}
                          <div className="col-lg-6 responsive-column">
                            <div className="input-box">
                              <label className="label-text">Your Email</label>
                              <div className="form-group">
                                <span className="la la-envelope-o form-icon" />
                                <input className="form-control" type="email" name="email" placeholder="Email address" />
                              </div>
                            </div>
                          </div>{/* end col-lg-6 */}
                          <div className="col-lg-6 responsive-column">
                            <div className="input-box">
                              <label className="label-text">Phone Number</label>
                              <div className="form-group">
                                <span className="la la-phone form-icon" />
                                <input className="form-control" type="text" name="text" placeholder="Phone Number" />
                              </div>
                            </div>
                          </div>{/* end col-lg-6 */}
                          <div className="col-lg-12">
                            <div className="input-box">
                              <label className="label-text">Address Line</label>
                              <div className="form-group">
                                <span className="la la-map-marked form-icon" />
                                <input className="form-control" type="text" name="text" placeholder="Address line" />
                              </div>
                            </div>
                          </div>{/* end col-lg-12 */}
                          <div className="col-lg-6 responsive-column">
                            <div className="input-box">
                              <label className="label-text">Country</label>
                              <div className="form-group">
                                <div className="select-contain w-auto">
                                  <select className="select-contain-select">
                                    <option value="select-country">Select country</option>
                                    <option value="Afghanistan">Afghanistan</option>
                                    <option value="Åland Islands">Åland Islands</option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="American Samoa">American Samoa</option>
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Anguilla">Anguilla</option>
                                    <option value="Antarctica">Antarctica</option>
                                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Aruba">Aruba</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaijan">Azerbaijan</option>
                                    <option value="Bahamas">Bahamas</option>
                                    <option value="Bahrain">Bahrain</option>
                                    <option value="Bangladesh">Bangladesh</option>
                                    <option value="Barbados">Barbados</option>
                                    <option value="Belarus">Belarus</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Belize">Belize</option>
                                    <option value="Benin">Benin</option>
                                    <option value="Bermuda">Bermuda</option>
                                    <option value="Bhutan">Bhutan</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                    <option value="Botswana">Botswana</option>
                                    <option value="Bouvet Island">Bouvet Island</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                                    <option value="Bulgaria">Bulgaria</option>
                                    <option value="Burkina Faso">Burkina Faso</option>
                                    <option value="Burundi">Burundi</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="Cameroon">Cameroon</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Cape Verde">Cape Verde</option>
                                    <option value="Cayman Islands">Cayman Islands</option>
                                    <option value="Central African Republic">Central African Republic</option>
                                    <option value="Chad">Chad</option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Christmas Island">Christmas Island</option>
                                    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Comoros">Comoros</option>
                                    <option value="Congo">Congo</option>
                                    <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                                    <option value="Cook Islands">Cook Islands</option>
                                    <option value="Costa Rica">Costa Rica</option>
                                    <option value="Cote D'ivoire">Cote D'ivoire</option>
                                    <option value="Croatia">Croatia</option>
                                    <option value="Cuba">Cuba</option>
                                    <option value="Cyprus">Cyprus</option>
                                    <option value="Czech Republic">Czech Republic</option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="Djibouti">Djibouti</option>
                                    <option value="Dominica">Dominica</option>
                                    <option value="Dominican Republic">Dominican Republic</option>
                                    <option value="Ecuador">Ecuador</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="El Salvador">El Salvador</option>
                                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                                    <option value="Eritrea">Eritrea</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Ethiopia">Ethiopia</option>
                                    <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                    <option value="Faroe Islands">Faroe Islands</option>
                                    <option value="Fiji">Fiji</option>
                                    <option value="Finland">Finland</option>
                                    <option value="France">France</option>
                                    <option value="French Guiana">French Guiana</option>
                                    <option value="French Polynesia">French Polynesia</option>
                                    <option value="French Southern Territories">French Southern Territories</option>
                                    <option value="Gabon">Gabon</option>
                                    <option value="Gambia">Gambia</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Gibraltar">Gibraltar</option>
                                    <option value="Greece">Greece</option>
                                    <option value="Greenland">Greenland</option>
                                    <option value="Grenada">Grenada</option>
                                    <option value="Guadeloupe">Guadeloupe</option>
                                    <option value="Guam">Guam</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Guernsey">Guernsey</option>
                                    <option value="Guinea">Guinea</option>
                                    <option value="Guinea-bissau">Guinea-bissau</option>
                                    <option value="Guyana">Guyana</option>
                                    <option value="Haiti">Haiti</option>
                                    <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                                    <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                    <option value="Honduras">Honduras</option>
                                    <option value="Hong Kong">Hong Kong</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Iceland">Iceland</option>
                                    <option value="India">India</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                                    <option value="Iraq">Iraq</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Isle of Man">Isle of Man</option>
                                    <option value="Israel">Israel</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Jamaica">Jamaica</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Jersey">Jersey</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Kazakhstan">Kazakhstan</option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="Kiribati">Kiribati</option>
                                    <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                                    <option value="Korea, Republic of">Korea, Republic of</option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                                    <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                    <option value="Latvia">Latvia</option>
                                    <option value="Lebanon">Lebanon</option>
                                    <option value="Lesotho">Lesotho</option>
                                    <option value="Liberia">Liberia</option>
                                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                    <option value="Liechtenstein">Liechtenstein</option>
                                    <option value="Lithuania">Lithuania</option>
                                    <option value="Luxembourg">Luxembourg</option>
                                    <option value="Macao">Macao</option>
                                    <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                                    <option value="Madagascar">Madagascar</option>
                                    <option value="Malawi">Malawi</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Maldives">Maldives</option>
                                    <option value="Mali">Mali</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Marshall Islands">Marshall Islands</option>
                                    <option value="Martinique">Martinique</option>
                                    <option value="Mauritania">Mauritania</option>
                                    <option value="Mauritius">Mauritius</option>
                                    <option value="Mayotte">Mayotte</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                    <option value="Moldova, Republic of">Moldova, Republic of</option>
                                    <option value="Monaco">Monaco</option>
                                    <option value="Mongolia">Mongolia</option>
                                    <option value="Montenegro">Montenegro</option>
                                    <option value="Montserrat">Montserrat</option>
                                    <option value="Morocco">Morocco</option>
                                    <option value="Mozambique">Mozambique</option>
                                    <option value="Myanmar">Myanmar</option>
                                    <option value="Namibia">Namibia</option>
                                    <option value="Nauru">Nauru</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Netherlands">Netherlands</option>
                                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                                    <option value="New Caledonia">New Caledonia</option>
                                    <option value="New Zealand">New Zealand</option>
                                    <option value="Nicaragua">Nicaragua</option>
                                    <option value="Niger">Niger</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Niue">Niue</option>
                                    <option value="Norfolk Island">Norfolk Island</option>
                                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                    <option value="Norway">Norway</option>
                                    <option value="Oman">Oman</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="Palau">Palau</option>
                                    <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                    <option value="Panama">Panama</option>
                                    <option value="Papua New Guinea">Papua New Guinea</option>
                                    <option value="Paraguay">Paraguay</option>
                                    <option value="Peru">Peru</option>
                                    <option value="Philippines">Philippines</option>
                                    <option value="Pitcairn">Pitcairn</option>
                                    <option value="Poland">Poland</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Puerto Rico">Puerto Rico</option>
                                    <option value="Qatar">Qatar</option>
                                    <option value="Reunion">Reunion</option>
                                    <option value="Romania">Romania</option>
                                    <option value="Russian Federation">Russian Federation</option>
                                    <option value="Rwanda">Rwanda</option>
                                    <option value="Saint Helena">Saint Helena</option>
                                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                    <option value="Saint Lucia">Saint Lucia</option>
                                    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                    <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                                    <option value="Samoa">Samoa</option>
                                    <option value="San Marino">San Marino</option>
                                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                    <option value="Senegal">Senegal</option>
                                    <option value="Serbia">Serbia</option>
                                    <option value="Seychelles">Seychelles</option>
                                    <option value="Sierra Leone">Sierra Leone</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Slovakia">Slovakia</option>
                                    <option value="Slovenia">Slovenia</option>
                                    <option value="Solomon Islands">Solomon Islands</option>
                                    <option value="Somalia">Somalia</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                                    <option value="Spain">Spain</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                    <option value="Sudan">Sudan</option>
                                    <option value="Suriname">Suriname</option>
                                    <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                    <option value="Swaziland">Swaziland</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                    <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                                    <option value="Tajikistan">Tajikistan</option>
                                    <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                    <option value="Thailand">Thailand</option>
                                    <option value="Timor-leste">Timor-leste</option>
                                    <option value="Togo">Togo</option>
                                    <option value="Tokelau">Tokelau</option>
                                    <option value="Tonga">Tonga</option>
                                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                    <option value="Tunisia">Tunisia</option>
                                    <option value="Turkey">Turkey</option>
                                    <option value="Turkmenistan">Turkmenistan</option>
                                    <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                    <option value="Tuvalu">Tuvalu</option>
                                    <option value="Uganda">Uganda</option>
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="United Arab Emirates">United Arab Emirates</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="United States">United States</option>
                                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                    <option value="Uruguay">Uruguay</option>
                                    <option value="Uzbekistan">Uzbekistan</option>
                                    <option value="Vanuatu">Vanuatu</option>
                                    <option value="Venezuela">Venezuela</option>
                                    <option value="Viet Nam">Viet Nam</option>
                                    <option value="Virgin Islands, British">Virgin Islands, British</option>
                                    <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                    <option value="Wallis and Futuna">Wallis and Futuna</option>
                                    <option value="Western Sahara">Western Sahara</option>
                                    <option value="Yemen">Yemen</option>
                                    <option value="Zambia">Zambia</option>
                                    <option value="Zimbabwe">Zimbabwe</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>{/* end col-lg-6 */}
                          <div className="col-lg-6 responsive-column">
                            <div className="input-box">
                              <label className="label-text">Country Code</label>
                              <div className="form-group">
                                <div className="select-contain w-auto">
                                  <select className="select-contain-select">
                                    <option value="country-code">Select country code</option>
                                    <option value={1}>United Kingdom (+44)</option>
                                    <option value={2}>United States (+1)</option>
                                    <option value={3}>Nigeria (+234)</option>
                                    <option value={4}>Brazil (+55)</option>
                                    <option value={5}>China (+86)</option>
                                    <option value={6}>India (+91)</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>{/* end col-lg-6 */}
                          <div className="col-lg-12">
                            <div className="input-box">
                              <div className="custom-checkbox mb-0">
                                <input type="checkbox" id="receiveChb" />
                                <label htmlFor="receiveChb">I want to receive Book24 promotional offers in the future</label>
                              </div>
                            </div>
                          </div>{/* end col-lg-12 */}
                        </div>
                      </form>
                    </div>{/* end contact-form-action */}
                  </div>{/* end form-content */}
                </div>{/* end form-box */}
                <div className="form-box">
                  <div className="form-title-wrap">
                    <h3 className="title">Your Card Information</h3>
                  </div>{/* form-title-wrap */}
                  <div className="form-content">
                    <div className="section-tab check-mark-tab text-center pb-4">
                      <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                        <li className="nav-item">
                          <a className="nav-link active" id="credit-card-tab" data-toggle="tab" href="#credit-card" role="tab" aria-controls="credit-card" aria-selected="false">
                            <i className="la la-check icon-element" />
                            <img src="images/payment-img.png" alt="" />
                            <span className="d-block pt-2">Payment with credit card</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" id="paypal-tab" data-toggle="tab" href="#paypal" role="tab" aria-controls="paypal" aria-selected="true">
                            <i className="la la-check icon-element" />
                            <img src="images/paypal.png" alt="" />
                            <span className="d-block pt-2">Payment with PayPal</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" id="payoneer-tab" data-toggle="tab" href="#payoneer" role="tab" aria-controls="payoneer" aria-selected="true">
                            <i className="la la-check icon-element" />
                            <img src="images/payoneer.png" alt="" />
                            <span className="d-block pt-2">Payment with payoneer</span>
                          </a>
                        </li>
                      </ul>
                    </div>{/* end section-tab */}
                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="credit-card" role="tabpanel" aria-labelledby="credit-card-tab">
                        <div className="contact-form-action">
                          <form method="post">
                            <div className="row">
                              <div className="col-lg-6 responsive-column">
                                <div className="input-box">
                                  <label className="label-text">Card Holder Name</label>
                                  <div className="form-group">
                                    <span className="la la-credit-card form-icon" />
                                    <input className="form-control" type="text" name="text" placeholder="Card holder name" />
                                  </div>
                                </div>
                              </div>{/* end col-lg-6 */}
                              <div className="col-lg-6 responsive-column">
                                <div className="input-box">
                                  <label className="label-text">Card Number</label>
                                  <div className="form-group">
                                    <span className="la la-credit-card form-icon" />
                                    <input className="form-control" type="text" name="text" placeholder="Card number" />
                                  </div>
                                </div>
                              </div>{/* end col-lg-6 */}
                              <div className="col-lg-6">
                                <div className="row">
                                  <div className="col-lg-6 responsive-column">
                                    <div className="input-box">
                                      <label className="label-text">Expiry Month</label>
                                      <div className="form-group">
                                        <span className="la la-credit-card form-icon" />
                                        <input className="form-control" type="text" name="text" placeholder="MM" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 responsive-column">
                                    <div className="input-box">
                                      <label className="label-text">Expiry Year</label>
                                      <div className="form-group">
                                        <span className="la la-credit-card form-icon" />
                                        <input className="form-control" type="text" name="text" placeholder="YY" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>{/* end col-lg-6 */}
                              <div className="col-lg-6">
                                <div className="input-box">
                                  <label className="label-text">CVV</label>
                                  <div className="form-group">
                                    <span className="la la-pencil form-icon" />
                                    <input className="form-control" type="text" name="text" placeholder="CVV" />
                                  </div>
                                </div>
                              </div>{/* end col-lg-6 */}
                              <div className="col-lg-12">
                                <div className="input-box">
                                  <div className="form-group">
                                    <div className="custom-checkbox">
                                      <input type="checkbox" id="agreechb" />
                                      <label htmlFor="agreechb">By continuing, you agree to the <a href="https://book24.ng/terms">Terms and Conditions</a>.</label>
                                    </div>
                                  </div>
                                </div>
                              </div>{/* end col-lg-12 */}
                              <div className="col-lg-12">
                                <div className="btn-box">
                                  <button className="theme-btn" type="submit">Confirm Booking</button>
                                </div>
                              </div>{/* end col-lg-12 */}
                            </div>
                          </form>
                        </div>{/* end contact-form-action */}
                      </div>{/* end tab-pane*/}
                      <div className="tab-pane fade" id="paypal" role="tabpanel" aria-labelledby="paypal-tab">
                        <div className="contact-form-action">
                          <form method="post">
                            <div className="row">
                              <div className="col-lg-6 responsive-column">
                                <div className="input-box">
                                  <label className="label-text">Email Address</label>
                                  <div className="form-group">
                                    <span className="la la-envelope form-icon" />
                                    <input className="form-control" type="email" name="email" placeholder="Enter email address" />
                                  </div>
                                </div>
                              </div>{/* end col-lg-6 */}
                              <div className="col-lg-6 responsive-column">
                                <div className="input-box">
                                  <label className="label-text">Password</label>
                                  <div className="form-group">
                                    <span className="la la-lock form-icon" />
                                    <input className="form-control" type="text" name="text" placeholder="Enter password" />
                                  </div>
                                </div>
                              </div>{/* end col-lg-6 */}
                              <div className="col-lg-12">
                                <div className="btn-box">
                                  <button className="theme-btn" type="submit">Login Account</button>
                                </div>
                              </div>{/* end col-lg-12 */}
                            </div>
                          </form>
                        </div>{/* end contact-form-action */}
                      </div>{/* end tab-pane*/}
                      <div className="tab-pane fade" id="payoneer" role="tabpanel" aria-labelledby="payoneer-tab">
                        <div className="contact-form-action">
                          <form method="post">
                            <div className="row">
                              <div className="col-lg-6 responsive-column">
                                <div className="input-box">
                                  <label className="label-text">Email Address</label>
                                  <div className="form-group">
                                    <span className="la la-envelope form-icon" />
                                    <input className="form-control" type="email" name="email" placeholder="Enter email address" />
                                  </div>
                                </div>
                              </div>{/* end col-lg-6 */}
                              <div className="col-lg-6 responsive-column">
                                <div className="input-box">
                                  <label className="label-text">Password</label>
                                  <div className="form-group">
                                    <span className="la la-lock form-icon" />
                                    <input className="form-control" type="text" name="text" placeholder="Enter password" />
                                  </div>
                                </div>
                              </div>{/* end col-lg-6 */}
                              <div className="col-lg-12">
                                <div className="btn-box">
                                  <button className="theme-btn" type="submit">Login Account</button>
                                </div>
                              </div>{/* end col-lg-12 */}
                            </div>
                          </form>
                        </div>{/* end contact-form-action */}
                      </div>{/* end tab-pane*/}
                    </div>{/* end tab-content */}
                  </div>{/* end form-content */}
                </div>{/* end form-box */}
              </div>{/* end col-lg-8 */}
              <div className="col-lg-4">
                <div className="form-box booking-detail-form">
                  <div className="form-title-wrap">
                    <h3 className="title">Booking Details</h3>
                  </div>{/* end form-title-wrap */}
                  <div className="form-content">
                    <div className="card-item shadow-none radius-none mb-0">
                      <div className="card-img pb-4">
                        <a href="hotel-single.html" className="d-block">
                          <img src="images/fp2.jpg" alt="tour-img" />
                        </a>
                      </div>
                      <div className="card-body p-0">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h3 className="card-title">Short Let Apartment</h3>
                            <p className="card-meta">Victoria Island, Lagos</p>
                          </div>
                          <div>
                            <a href="hotel-single.html" className="btn ml-1"><i className="la la-edit" data-toggle="tooltip" data-placement="top" title="Edit" /></a>
                          </div>
                        </div>
                        <div className="card-rating">
                          <span className="badge text-white">4.4/5</span>
                          <span className="review__text">Average</span>
                          <span className="rating__text">(30 Reviews)</span>
                        </div>
                        <div className="section-block" />
                        <ul className="list-items list-items-2 py-2">
                          <li><span>Check in:</span>12 Dec 2019 at 11:10 am</li>
                          <li><span>Check out:</span>12 Jun 2020 at 2:10 pm</li>
                        </ul>
                        <div className="section-block" />
                        <h3 className="card-title pt-3 pb-2 font-size-15"><a href="hotel-single.html">Order Details</a></h3>
                        <div className="section-block" />
                        <ul className="list-items list-items-2 py-3">
                          <li><span>Room Type:</span>Standard</li>
                          <li><span>Room:</span>1 Room</li>
                          <li><span>Per Room Price:</span>₦54,000</li>
                          <li><span>Stay:</span>1 Nights</li>
                        </ul>
                        <div className="section-block" />
                        <ul className="list-items list-items-2 pt-3">
                          <li><span>Sub Total:</span>₦54,000</li>
                          <li><span>VAT (7.5%):</span>₦500</li>
                          <li><span>Total Price:</span>₦54,500</li>
                        </ul>
                      </div>
                    </div>{/* end card-item */}
                  </div>{/* end form-content */}
                </div>{/* end form-box */}
              </div>{/* end col-lg-4 */}
            </div>{/* end row */}
          </div>{/* end container */}
        </section>{/* end booking-area */}
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
export default withRouter(RentalBooking);
