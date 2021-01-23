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

class AddFlight extends Component {
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
<section className="breadcrumb-area bread-bg-6">
          <div className="breadcrumb-wrap">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-content text-center">
                    <div className="section-heading">
                      <h2 className="sec__title">List your flight with the Nigeria's <br />
                        largest travel community</h2>
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
    START FORM AREA
================================= */}
        <section className="listing-form section--padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 mx-auto">
                <div className="listing-header pb-4">
                  <h3 className="title font-size-28 pb-2">List a flight on Book24</h3>
                  
                </div>
                <div className="form-box">
                  <div className="form-title-wrap">
                    <h3 className="title"><i className="la la-user mr-2 text-gray" />Your information</h3>
                  </div>{/* form-title-wrap */}
                  <div className="form-content contact-form-action">
                    <form method="post" className="row">
                      <div className="col-lg-6 responsive-column">
                        <div className="input-box">
                          <label className="label-text">Your Name</label>
                          <div className="form-group">
                            <span className="la la-user form-icon" />
                            <input className="form-control" type="text" name="text" placeholder="Your name" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6 responsive-column">
                        <div className="input-box">
                          <label className="label-text">Your Email</label>
                          <div className="form-group">
                            <span className="la la-envelope-o form-icon" />
                            <input className="form-control" type="email" name="email" placeholder="Your email" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6 responsive-column">
                        <div className="input-box">
                          <label className="label-text">What is your role at this business?</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>Select one</option>
                              <option value="OWNER">Owner</option>
                              <option value="MANAGER">Manager</option>
                              
                              <option value="AGENCY_CONSULTANT">Agency / Consultant</option>
                              
                              <option value="SALES">Sales</option>
                              <option value="OTHER">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                    </form>
                  </div>{/* end form-content */}
                </div>{/* end form-box */}
                <div className="form-box">
                  <div className="form-title-wrap">
                    <h3 className="title"><i className="la la-gear mr-2 text-gray" />Listing information for your flight</h3>
                  </div>{/* form-title-wrap */}
                  <div className="form-content contact-form-action">
                    <form method="post" className="row">
                      <div className="col-lg-6 responsive-column">
                        <div className="input-box">
                          <label className="label-text">Official business name</label>
                          <div className="form-group">
                            <span className="la la-briefcase form-icon" />
                            <input className="form-control" type="text" name="text" placeholder="Business name" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6 responsive-column">
                        <div className="input-box">
                          <label className="label-text">Country</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>Select a country </option>
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
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6 responsive-column">
                        <div className="input-box">
                          <label className="label-text">Flight</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value="OneWay">One Way Flight</option>
                              <option value="RoundTrip">Round-trip Flight</option>
                              <option value="MultiCity">Multi-city Flight</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Take off</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>Select</option>
                              <option value="Mon">Mon Nov 12 6:50 AM</option>
                              <option value="Tue">Tue Nov 12 6:50 AM</option>
                              <option value="Wed">Wed Nov 12 6:50 AM</option>
                              <option value="Thu">Thu Nov 12 6:50 AM</option>
                              <option value="Fri">Fri Nov 12 6:50 AM</option>
                              <option value="Sat">Sat Nov 12 6:50 AM</option>
                              <option value="Sun">Sun Nov 12 6:50 AM</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Landing</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>Select</option>
                              <option value="Mon">Mon Nov 12 6:50 AM</option>
                              <option value="Tue">Tue Nov 12 6:50 AM</option>
                              <option value="Wed">Wed Nov 12 6:50 AM</option>
                              <option value="Thu">Thu Nov 12 6:50 AM</option>
                              <option value="Fri">Fri Nov 12 6:50 AM</option>
                              <option value="Sat">Sat Nov 12 6:50 AM</option>
                              <option value="Sun">Sun Nov 12 6:50 AM</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Flight Stops</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>Select</option>
                              <option value="stop1">1 Stop</option>
                              <option value="stops2">2 Stops</option>
                              <option value="stops3">3 Stops</option>
                              <option value="MultiStops">MultiStops</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                    </form>
                  </div>{/* end form-content */}
                </div>{/* end form-box */}
                <div className="form-box">
                  <div className="form-title-wrap">
                    <h3 className="title"><i className="la la-map mr-2 text-gray" />Map Location</h3>
                  </div>{/* form-title-wrap */}
                  <div className="form-content contact-form-action">
                    <form method="post" className="row">
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Longitude</label>
                          <div className="form-group">
                            <span className="la la-map form-icon" />
                            <input className="form-control" id="longitude" type="text" placeholder="Map Longitude" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Latitude</label>
                          <div className="form-group">
                            <span className="la la-map form-icon" />
                            <input className="form-control" id="latitude" type="text" placeholder="Map Latitude" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-12">
                        <div className="input-box">
                          <label className="label-text">For precise location, drag the blue marker on the map.</label>
                          <div className="form-group map-container">
                            <div id="singleMap" className="drag-map" data-latitude="40.7427837" data-longitude="-73.11445617675781" />
                          </div>
                        </div>
                      </div>{/* end col-lg-12 */}
                      <div className="col-lg-12">
                        <label className="label-text">Or enter Coordinates (longitude and latitude) Manually.</label>
                      </div>{/* end col-lg-12 */}
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Longitude</label>
                          <div className="form-group">
                            <span className="la la-map form-icon" />
                            <input className="form-control" type="text" placeholder="40.731444531797315" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Latitude</label>
                          <div className="form-group">
                            <span className="la la-map form-icon" />
                            <input className="form-control" type="text" placeholder="40.731444531797315" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-12">
                        <div className="btn-box">
                          <button type="button" className="theme-btn theme-btn-small">Find on Map</button>
                        </div>
                      </div>{/* end col-lg-12 */}
                    </form>
                  </div>{/* end form-content */}
                </div>{/* end form-box */}
                <div className="form-box">
                  <div className="form-title-wrap">
                    <h3 className="title"><i className="la la-user mr-2 text-gray" />Contact Details</h3>
                  </div>{/* form-title-wrap */}
                  <div className="form-content contact-form-action">
                    <form method="post" className="row">
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Phone</label>
                          <div className="form-group">
                            <span className="la la-phone form-icon" />
                            <input className="form-control" type="text" placeholder="Phone" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Mobile</label>
                          <div className="form-group">
                            <span className="la la-print form-icon" />
                            <input className="form-control" type="text" placeholder="Mobile" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Email</label>
                          <div className="form-group">
                            <span className="la la-envelope-o form-icon" />
                            <input className="form-control" type="text" placeholder="Email for customer inquiries" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Your Website Address</label>
                          <div className="form-group">
                            <span className="la la-globe form-icon" />
                            <input className="form-control" type="text" placeholder="Website" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Facebook Page</label>
                          <div className="form-group">
                            <span className="la la-facebook form-icon" />
                            <input className="form-control" type="text" placeholder="https://www.facebook.com/" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Instagram Page</label>
                          <div className="form-group">
                            <span className="la la-instagram form-icon" />
                            <input className="form-control" type="text" placeholder="https://www.instagram.com/" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Twitter Page</label>
                          <div className="form-group">
                            <span className="la la-twitter form-icon" />
                            <input className="form-control" type="text" placeholder="https://www.twitter.com/" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Linkedin Page</label>
                          <div className="form-group">
                            <span className="la la-linkedin form-icon" />
                            <input className="form-control" type="text" placeholder="https://www.linkedin.com/" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                    </form>
                  </div>{/* end form-content */}
                </div>{/* end form-box */}
                <div className="form-box">
                  <div className="form-title-wrap">
                    <h3 className="title"><i className="la la-plane mr-2 text-gray" />Information about your flight</h3>
                  </div>{/* form-title-wrap */}
                  <div className="form-content contact-form-action">
                    <form method="post" className="row">
                      <div className="col-lg-12">
                        <div className="input-box">
                          <label className="label-text">Total time of flight</label>
                          <div className="form-group">
                            <span className="la la-clock form-icon" />
                            <input className="form-control" type="text" name="text" placeholder="Total time of flight" />
                          </div>
                        </div>
                      </div>{/* end col-lg-12 */}
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Price range (per person)</label>
                          <div className="form-group">
                            <span className="la la-money form-icon" />
                            <input className="form-control" type="text" name="text" placeholder="Enter price" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Select a currency</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>--Select a currency--</option>
                              <option value="USD">USD U.S. Dollars</option>
                              <option value="GBP">GBP British Pounds</option>
                              <option value="EUR">EUR Euros</option>
                              <option value="CAD">CAD Canadian Dollars</option>
                              <option value="CHF">CHF Swiss Francs</option>
                              <option value="AUD">AUD Australian Dollars</option>
                              <option value="NGN">NGN Nigerian Naira</option>
                              <option value="CNY">CNY Chinese Yuan</option>
                              <option value="INR">INR Indian Rupees</option>
                              <option value="SEK">SEK Swedish Krona</option>
                              <option value="BRL">BRL Brazilian Real</option>
                              <option value="TRY">TRY Turkish Lira</option>
                              <option value> ---------------------------</option>
                              <option value="AED">AED UAE Dirham</option>
                              <option value="AFN">AFN Afghan Afghanis</option>
                              <option value="ALL">ALL Albanian Lek</option>
                              <option value="AMD">AMD Armenian Dram</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-4">
                        <div className="input-box">
                          <label className="label-text mb-0">Airline</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>--Select a airline--</option>
                              <option value="AN">Advanced Air</option>
                              <option value="A3">Aegean</option>
                              <option value="EI">Aer Lingus</option>
                              <option value="5G">Aerocuahonte / Mayair</option>
                              <option value="SU">Aeroflot-Russian Airlines</option>
                              <option value="AR">Aerolineas Argentinas</option>
                              <option value="VW">Aeromar Airlines</option>
                              <option value="AM">Aeromexico</option>
                              <option value="ZI">Aigle Azur</option>
                              <option value="AH">Air Algerie</option>
                              <option value="KC">Air Astana</option>
                              <option value="UU">Air Austral</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box">
                          <label className="label-text mb-0">Flight Type</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>--Select a type--</option>
                              <option value={1}>First class</option>
                              <option value={2}>Business</option>
                              <option value={3}>Economy</option>
                              <option value={4}>Premium Economy</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box">
                          <label className="label-text mb-0">Fare Type</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>--Select a type--</option>
                              <option value={1}>Refundable</option>
                              <option value={2}>Refundable</option>
                              <option value={3}>Refundable</option>
                              <option value={4}>Refundable</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box">
                          <label className="label-text mb-0">Cancellation Charge</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>--Select a charge--</option>
                              <option value={1}>$78 / Person</option>
                              <option value={2}>$78 / Person</option>
                              <option value={3}>$78 / Person</option>
                              <option value={4}>$78 / Person</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box">
                          <label className="label-text mb-0">Flight Change</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>--Select a charge--</option>
                              <option value={1}>$53 / Person</option>
                              <option value={2}>$53 / Person</option>
                              <option value={3}>$53 / Person</option>
                              <option value={4}>$53 / Person</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box">
                          <label className="label-text mb-0">Seats &amp; Baggage</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>--Select a charge--</option>
                              <option value={1}>Extra Charge</option>
                              <option value={2}>Extra Charge</option>
                              <option value={3}>Extra Charge</option>
                              <option value={4}>Extra Charge</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box">
                          <label className="label-text mb-0">Inflight Features</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>--Select a feature--</option>
                              <option value={1}>Available</option>
                              <option value={2}>Not Available</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box">
                          <label className="label-text mb-0">Base Fare</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>--Select base fare--</option>
                              <option value={1}>$320.00</option>
                              <option value={2}>$420.00</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box">
                          <label className="label-text mb-0">Taxes &amp; Fees</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>--Select texas &amp; fees--</option>
                              <option value={1}>$320.00</option>
                              <option value={2}>$420.00</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-12">
                        <div className="input-box">
                          <label className="label-text mb-0 line-height-20">Description of your flight</label>
                          <p className="font-size-13 mb-3 line-height-20">400 character limit</p>
                          <div className="form-group">
                            <span className="la la-pencil form-icon" />
                            <textarea className="message-control form-control" name="message" placeholder="In English only           " defaultValue={""} />
                          </div>
                        </div>
                      </div>{/* end col-lg-12 */}
                      <div className="col-lg-12">
                        <div className="input-box">
                          <label className="label-text mb-0 line-height-20">Additional Description</label>
                          <p className="font-size-13 mb-3 line-height-20">400 character limit</p>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>--Select a language--</option>
                              <option value="en">English</option>
                              <option value="zh">Chinese</option>
                              <option value="cs">Czech</option>
                              <option value="da">Danish</option>
                              <option value="nl">Dutch</option>
                              <option value="fi">Finnish</option>
                              <option value="fr">French</option>
                              <option value="de">German</option>
                              <option value="el">Greek</option>
                              <option value="iw">Hebrew</option>
                              <option value="hu">Hungarian</option>
                              <option value="in">Indonesian</option>
                              <option value="it">Italian</option>
                              <option value="ja">Japanese</option>
                              <option value="ko">Korean</option>
                              <option value="no">Norwegian</option>
                              <option value="pl">Polish</option>
                              <option value="pt">Portuguese</option>
                              <option value="ru">Russian</option>
                              <option value="sr">Serbian</option>
                              <option value="sk">Slovak</option>
                              <option value="es">Spanish</option>
                              <option value="sv">Swedish</option>
                              <option value="th">Thai</option>
                              <option value="tr">Turkish</option>
                              <option value="vi">Vietnamese</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <span className="la la-pencil form-icon" />
                            <textarea className="message-control form-control" name="message" placeholder="add description           " defaultValue={""} />
                          </div>
                        </div>
                      </div>{/* end col-lg-12 */}
                    </form>
                  </div>{/* end form-content */}
                </div>{/* end form-box */}
                <div className="form-box">
                  <div className="form-title-wrap">
                    <h3 className="title"><i className="la la-gift mr-2 text-gray" />Inflight Features</h3>
                  </div>{/* form-title-wrap */}
                  <div className="form-content contact-form-action">
                    <form method="post" className="row">
                      <div className="col-lg-6">
                        <div className="custom-checkbox">
                          <input type="checkbox" id="WIFI" />
                          <label htmlFor="WIFI">WI-FI</label>
                        </div>
                        <div className="custom-checkbox">
                          <input type="checkbox" id="Coffee" />
                          <label htmlFor="Coffee">Coffee</label>
                        </div>
                        <div className="custom-checkbox">
                          <input type="checkbox" id="AirConditioning" />
                          <label htmlFor="AirConditioning">Air Conditioning</label>
                        </div>
                        <div className="custom-checkbox">
                          <input type="checkbox" id="Entertainment" />
                          <label htmlFor="Entertainment">Entertainment</label>
                        </div>
                        <div className="custom-checkbox">
                          <input type="checkbox" id="Food" />
                          <label htmlFor="Food">Food</label>
                        </div>
                        <div className="custom-checkbox">
                          <input type="checkbox" id="Drink" />
                          <label htmlFor="Drink">Drink</label>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6">
                        <div className="custom-checkbox">
                          <input type="checkbox" id="Wines" />
                          <label htmlFor="Wines">Wines</label>
                        </div>
                        <div className="custom-checkbox">
                          <input type="checkbox" id="Comfort" />
                          <label htmlFor="Comfort">Comfort</label>
                        </div>
                        <div className="custom-checkbox">
                          <input type="checkbox" id="Television" />
                          <label htmlFor="Television">Television</label>
                        </div>
                        <div className="custom-checkbox">
                          <input type="checkbox" id="Games" />
                          <label htmlFor="Games">Games</label>
                        </div>
                        <div className="custom-checkbox">
                          <input type="checkbox" id="Shopping" />
                          <label htmlFor="Shopping">Shopping</label>
                        </div>
                        <div className="custom-checkbox">
                          <input type="checkbox" id="Magazines" />
                          <label htmlFor="Magazines">Magazines</label>
                        </div>
                      </div>{/* end col-lg-6 */}
                    </form>
                  </div>{/* end form-content */}
                </div>{/* end form-box */}
                <div className="form-box">
                  <div className="form-title-wrap">
                    <h3 className="title"><i className="la la-photo mr-2 text-gray" />Choose a photo to represent this listing</h3>
                  </div>{/* form-title-wrap */}
                  <div className="form-content contact-form-action">
                    <form method="post" className="row">
                      <div className="col-lg-12">
                        <div className="file-upload-wrap">
                          <input type="file" name="files[]" className="multi file-upload-input with-preview" multiple maxLength={3} />
                          <span className="file-upload-text"><i className="la la-upload mr-2" />Click or drag images here to upload</span>
                        </div>
                      </div>{/* end col-lg-12 */}
                    </form>
                  </div>{/* end form-content */}
                </div>{/* end form-box */}
                <div className="submit-box">
                  <h3 className="title pb-3">Submit this listing</h3>
                  <div className="custom-checkbox">
                    <input type="checkbox" id="agreeChb" />
                    <label htmlFor="agreeChb">Check this box to certify that you are an official representative of the property for which you are submitting this listing and that the information you have submitted is correct. In submitting a photo, you also certify that you have the right to use the photo on the web and agree to NOT hold Book24 accountable for any and all copyright issues arising from your use of the image.</label>
                  </div>
                  <div className="btn-box pt-3">
                    <button type="submit" className="theme-btn">Submit Listing <i className="la la-arrow-right ml-1" /></button>
                  </div>
                </div>{/* end submit-box */}
              </div>{/* end col-lg-9 */}
            </div>{/* end row */}
          </div>{/* end container */}
        </section>{/* end listing-form */}
        {/* ================================
    END FORM AREA
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
export default withRouter(AddFlight);
