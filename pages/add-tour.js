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

class AddTour extends Component {
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
<section className="breadcrumb-area bread-bg-2">
          <div className="breadcrumb-wrap">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-content text-center">
                    <div className="section-heading">
                      <h2 className="sec__title">List your activities with the world's <br />
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
                  <h3 className="title font-size-28 pb-2">List a Tour on Book24</h3>
                  
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
                              <option value="GENERAL_MANAGER">General Manager</option>
                              
                              <option value="AGENCY_CONSULTANT">Agency / Consultant</option>
                              
                              <option value="MARKETING">Marketing</option>
                             
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
                    <h3 className="title"><i className="la la-gear mr-2 text-gray" />Listing information for your activities</h3>
                  </div>{/* form-title-wrap */}
                  <div className="form-content contact-form-action">
                    <form method="post" className="row">
                      <div className="col-lg-6 responsive-column">
                        <div className="input-box">
                          <label className="label-text">Official place name</label>
                          <div className="form-group">
                            <span className="la la-briefcase form-icon" />
                            <input className="form-control" type="text" name="text" placeholder="Enter place name" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6 responsive-column">
                        <div className="input-box">
                          <label className="label-text">Category</label>
                          <div className="form-group">
                            <span className="la la-briefcase form-icon" />
                            <input className="form-control" type="text" name="text" placeholder="Enter category name" />
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
                          <label className="label-text">City/Town, State/Province/Region</label>
                          <div className="form-group">
                            <span className="la la-map form-icon" />
                            <input className="form-control" type="text" name="text" placeholder="Start typing city/town, state/province" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6 responsive-column">
                        <div className="input-box">
                          <label className="label-text">Street address</label>
                          <div className="form-group">
                            <span className="la la-map form-icon" />
                            <input className="form-control" type="text" name="text" placeholder="Enter building number and street name" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6 responsive-column">
                        <div className="input-box">
                          <label className="label-text">Country/region code</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>Select country code</option>
                              <option value="ALB">Albania (355)</option>
                              <option value="DZA">Algeria (213)</option>
                              <option value="ASM">American Samoa (1)</option>
                              <option value="AND">Andorra (376)</option>
                              <option value="AIA">Anguilla (1)</option>
                              <option value="ATA">Antarctica (672)</option>
                              <option value="ATG">Antigua and Barbuda (1)</option>
                              <option value="ARG">Argentina (54)</option>
                              <option value="ARM">Armenia (374)</option>
                              <option value="ABW">Aruba (297)</option>
                              <option value="AUS">Australia (61)</option>
                              <option value="AUT">Austria (43)</option>
                              <option value="AZE">Azerbaijan (994)</option>
                              <option value="BHS">Bahamas (1)</option>
                              <option value="BHR">Bahrain (973)</option>
                              <option value="BGD">Bangladesh (880)</option>
                              <option value="BRB">Barbados (1)</option>
                              <option value="BLR">Belarus (375)</option>
                              <option value="BEL">Belgium (32)</option>
                              <option value="BLZ">Belize (501)</option>
                              <option value="BEN">Benin (229)</option>
                              <option value="BMU">Bermuda (1)</option>
                              <option value="BTN">Bhutan (975)</option>
                              <option value="BOL">Bolivia (591)</option>
                              <option value="BES">Bonaire, Sint Eustatius and Saba (599)</option>
                              <option value="BIH">Bosnia and Herzegovina (387)</option>
                              <option value="BWA">Botswana (267)</option>
                              <option value="BVT">Bouvet Island (47)</option>
                              <option value="BRA">Brazil (55)</option>
                              <option value="VGB">British Virgin Islands (1)</option>
                              <option value="BRN">Brunei (673)</option>
                              <option value="BGR">Bulgaria (359)</option>
                              <option value="BFA">Burkina Faso (226)</option>
                              <option value="BDI">Burundi (257)</option>
                              <option value="KHM">Cambodia (855)</option>
                              <option value="CMR">Cameroon (237)</option>
                              <option value="CAN">Canada (1)</option>
                              <option value="CPV">Cape Verde (238)</option>
                              <option value="CYM">Cayman Islands (1)</option>
                              <option value="TCD">Chad (235)</option>
                              <option value="CHL">Chile (56)</option>
                              <option value="CHN">China (86)</option>
                              <option value="CXR">Christmas Island (61)</option>
                              <option value="CCK">Cocos Islands (61)</option>
                              <option value="COL">Colombia (57)</option>
                              <option value="COM">Comoros (269)</option>
                              <option value="COK">Cook Islands (682)</option>
                              <option value="CRI">Costa Rica (506)</option>
                              <option value="CIV">Cote d’ivoire (225)</option>
                              <option value="HRV">Croatia (385)</option>
                              <option value="CUB">Cuba (53)</option>
                              <option value="CUW">Curaçao (599)</option>
                              <option value="CYP">Cyprus (357)</option>
                              <option value="CZE">Czech Republic (420)</option>
                              <option value="COD">Democratic Republic of the Congo (243)</option>
                              <option value="DNK">Denmark (45)</option>
                              <option value="DJI">Djibouti (253)</option>
                              <option value="DMA">Dominica (1)</option>
                              <option value="DOM">Dominican Republic (1)</option>
                              <option value="ECU">Ecuador (593)</option>
                              <option value="EGY">Egypt (20)</option>
                              <option value="SLV">El Salvador (503)</option>
                              <option value="GNQ">Equatorial Guinea (240)</option>
                              <option value="ERI">Eritrea (291)</option>
                              <option value="EST">Estonia (372)</option>
                              <option value="ETH">Ethiopia (251)</option>
                              <option value="FLK">Falkland Islands (500)</option>
                              <option value="FRO">Faroe Islands (298)</option>
                              <option value="FJI">Fiji (679)</option>
                              <option value="FIN">Finland (358)</option>
                              <option value="FRA">France (33)</option>
                              <option value="GUF">French Guiana (594)</option>
                              <option value="PYF">French Polynesia (689)</option>
                              <option value="GAB">Gabon (241)</option>
                              <option value="GMB">Gambia (220)</option>
                              <option value="GEO">Georgia (995)</option>
                              <option value="DEU">Germany (49)</option>
                              <option value="GHA">Ghana (233)</option>
                              <option value="GIB">Gibraltar (350)</option>
                              <option value="GRC">Greece (30)</option>
                              <option value="GRL">Greenland (299)</option>
                              <option value="GRD">Grenada (1)</option>
                              <option value="GLP">Guadeloupe (590)</option>
                              <option value="GUM">Guam (1)</option>
                              <option value="GTM">Guatemala (502)</option>
                              <option value="GIN">Guinea (224)</option>
                              <option value="GNB">Guinea-Bissau (245)</option>
                              <option value="GUY">Guyana (592)</option>
                              <option value="HTI">Haiti (509)</option>
                              <option value="HND">Honduras (504)</option>
                              <option value="HKG">Hong Kong (852)</option>
                              <option value="HUN">Hungary (36)</option>
                              <option value="ISL">Iceland (354)</option>
                              <option value="IND">India (91)</option>
                              <option value="IDN">Indonesia (62)</option>
                              <option value="IRL">Ireland (353)</option>
                              <option value="ISR">Israel (972)</option>
                              <option value="ITA">Italy (39)</option>
                              <option value="JAM">Jamaica (1)</option>
                              <option value="JPN">Japan (81)</option>
                              <option value="JOR">Jordan (962)</option>
                              <option value="KAZ">Kazakhstan (7)</option>
                              <option value="KEN">Kenya (254)</option>
                              <option value="KIR">Kiribati (686)</option>
                              <option value="KWT">Kuwait (965)</option>
                              <option value="KGZ">Kyrgyzstan (996)</option>
                              <option value="LAO">Laos (856)</option>
                              <option value="LVA">Latvia (371)</option>
                              <option value="LBN">Lebanon (961)</option>
                              <option value="LSO">Lesotho (266)</option>
                              <option value="LBR">Liberia (231)</option>
                              <option value="LBY">Libya (218)</option>
                              <option value="LIE">Liechtenstein (423)</option>
                              <option value="LTU">Lithuania (370)</option>
                              <option value="LUX">Luxembourg (352)</option>
                              <option value="MAC">Macau (853)</option>
                              <option value="MKD">Macedonia (389)</option>
                              <option value="MDG">Madagascar (261)</option>
                              <option value="MWI">Malawi (265)</option>
                              <option value="MYS">Malaysia (60)</option>
                              <option value="MDV">Maldives (960)</option>
                              <option value="MLI">Mali (223)</option>
                              <option value="MLT">Malta (356)</option>
                              <option value="MHL">Marshall Islands (692)</option>
                              <option value="MTQ">Martinique (596)</option>
                              <option value="MRT">Mauritania (222)</option>
                              <option value="MUS">Mauritius (230)</option>
                              <option value="MYT">Mayotte (269)</option>
                              <option value="MEX">Mexico (52)</option>
                              <option value="FSM">Micronesia (691)</option>
                              <option value="MDA">Moldova (373)</option>
                              <option value="MCO">Monaco (377)</option>
                              <option value="MNG">Mongolia (976)</option>
                              <option value="MNE">Montenegro (382)</option>
                              <option value="MSR">Montserrat (1)</option>
                              <option value="MAR">Morocco (212)</option>
                              <option value="MOZ">Mozambique (258)</option>
                              <option value="MMR">Myanmar (95)</option>
                              <option value="NAM">Namibia (264)</option>
                              <option value="NRU">Nauru (674)</option>
                              <option value="NPL">Nepal (977)</option>
                              <option value="NLD">Netherlands (31)</option>
                              <option value="NCL">New Caledonia (687)</option>
                              <option value="NZL">New Zealand (64)</option>
                              <option value="NIC">Nicaragua (505)</option>
                              <option value="NER">Niger (227)</option>
                              <option value="NGA">Nigeria (234)</option>
                              <option value="NIU">Niue (683)</option>
                              <option value="NFK">Norfolk Island (672)</option>
                              <option value="MNP">Northern Mariana Islands (1)</option>
                              <option value="NOR">Norway (47)</option>
                              <option value="OMN">Oman (968)</option>
                              <option value="PAK">Pakistan (92)</option>
                              <option value="PLW">Palau (680)</option>
                              <option value="PAN">Panama (507)</option>
                              <option value="PNG">Papua New Guinea (675)</option>
                              <option value="PRY">Paraguay (595)</option>
                              <option value="PER">Peru (51)</option>
                              <option value="PHL">Philippines (63)</option>
                              <option value="PCN">Pitcairn Island (64)</option>
                              <option value="POL">Poland (48)</option>
                              <option value="PRT">Portugal (351)</option>
                              <option value="PRI">Puerto Rico (1)</option>
                              <option value="QAT">Qatar (974)</option>
                              <option value="COG">Republic of the Congo (242)</option>
                              <option value="REU">Reunion (262)</option>
                              <option value="ROU">Romania (40)</option>
                              <option value="RUS">Russia (7)</option>
                              <option value="RWA">Rwanda (250)</option>
                              <option value="WSM">Samoa (685)</option>
                              <option value="SMR">San Marino (378)</option>
                              <option value="STP">São Tomé and Príncipe (239)</option>
                              <option value="SAU">Saudi Arabia (966)</option>
                              <option value="SEN">Senegal (221)</option>
                              <option value="SRB">Serbia (381)</option>
                              <option value="SYC">Seychelles (248)</option>
                              <option value="SLE">Sierra Leone (232)</option>
                              <option value="SGP">Singapore (65)</option>
                              <option value="SXM">Sint Maarten (1)</option>
                              <option value="SVK">Slovakia (421)</option>
                              <option value="SVN">Slovenia (386)</option>
                              <option value="SLB">Solomon Islands (677)</option>
                              <option value="ZAF">South Africa (27)</option>
                              <option value="KOR">South Korea (82)</option>
                              <option value="ESP">Spain (34)</option>
                              <option value="LKA">Sri Lanka (94)</option>
                              <option value="BLM">St Barthélemy (590)</option>
                              <option value="SHN">St Helena (290)</option>
                              <option value="KNA">St Kitts and Nevis (1)</option>
                              <option value="LCA">St Lucia (1)</option>
                              <option value="MAF">St Martin (590)</option>
                              <option value="SPM">St Pierre and Miquelon (508)</option>
                              <option value="VCT">St Vincent and the Grenadines (1)</option>
                              <option value="SUR">Suriname (597)</option>
                              <option value="SJM">Svalbard (47)</option>
                              <option value="SWZ">Swaziland (268)</option>
                              <option value="SWE">Sweden (46)</option>
                              <option value="CHE">Switzerland (41)</option>
                              <option value="TWN">Taiwan (886)</option>
                              <option value="TJK">Tajikistan (992)</option>
                              <option value="TZA">Tanzania (255)</option>
                              <option value="THA">Thailand (66)</option>
                              <option value="TGO">Togo (228)</option>
                              <option value="TKL">Tokelau (690)</option>
                              <option value="TON">Tonga (676)</option>
                              <option value="TTO">Trinidad and Tobago (1)</option>
                              <option value="TUN">Tunisia (216)</option>
                              <option value="TUR">Turkey (90)</option>
                              <option value="TKM">Turkmenistan (993)</option>
                              <option value="TCA">Turks and Caicos (1)</option>
                              <option value="TUV">Tuvalu (688)</option>
                              <option value="UGA">Uganda (256)</option>
                              <option value="UKR">Ukraine (380)</option>
                              <option value="ARE">United Arab Emirates (971)</option>
                              <option value="GBR">United Kingdom (44)</option>
                              <option value="USA">United States of America (1)</option>
                              <option value="URY">Uruguay (598)</option>
                              <option value="VIR">US Virgin Islands (1)</option>
                              <option value="UZB">Uzbekistan (998)</option>
                              <option value="VUT">Vanuatu (678)</option>
                              <option value="VAT">Vatican City (39)</option>
                              <option value="VEN">Venezuela (58)</option>
                              <option value="VNM">Vietnam (84)</option>
                              <option value="WLF">Wallis and Futuna (681)</option>
                              <option value="PSE">West Bank and Gaza (970)</option>
                              <option value="ESH">Western Sahara (212)</option>
                              <option value="ZMB">Zambia (260)</option>
                              <option value="ZWE">Zimbabwe (263)</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-12">
                        <div className="input-box">
                          <label className="label-text">Additional address information (Optional)</label>
                          <div className="form-group">
                            <span className="la la-map form-icon" />
                            <input className="form-control" type="text" name="text" placeholder="Suite number, intersection, plaza, square" />
                          </div>
                        </div>
                      </div>{/* end col-lg-12 */}
                      <div className="col-lg-4">
                        <div className="input-box">
                          <label className="label-text">Duration</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>---Duration---</option>
                              <option value="day1">1 Day</option>
                              <option value="days2">2 Days</option>
                              <option value="days3">3 Days</option>
                              <option value="days4">4 Days</option>
                              <option value="days5">5 Days</option>
                              <option value="days6">6 Days</option>
                              <option value="days7">7 Days</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box">
                          <label className="label-text">Group Size</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>---Group size---</option>
                              <option value="People10">10 People</option>
                              <option value="People20">20 People</option>
                              <option value="People30">30 People</option>
                              <option value="People40">40 People</option>
                              <option value="People50">50 People</option>
                              <option value="People60">60 People</option>
                              <option value="People70">70 People</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box">
                          <label className="label-text">Tour Type</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>---Tour type---</option>
                              <option value="SingleTour">Single Tour</option>
                              <option value="GroupTour">Group Tour</option>
                              <option value="AdventuresTour">Adventures Tour</option>
                              <option value="ReligiousTour">Religious Tour</option>
                              <option value="CoporateTour">Coporate Tour</option>
                              
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box">
                          <label className="label-text">Date</label>
                          <div className="form-group">
                            <span className="la la-calendar form-icon" />
                            <input className="date-range form-control" type="text" name="daterange" defaultValue="04/28/2020" />
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box">
                          <label className="label-text">Min Age</label>
                          <div className="form-group">
                            <span className="la la-user form-icon" />
                            <input className="form-control" type="text" placeholder="Enter age" />
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box">
                          <label className="label-text">Pickup From</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>---Pickup from---</option>
                              <option value="Airport">Airport</option>
                              <option value="Location">Location</option>
                              
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-12">
                        <div className="input-box">
                          <label className="label-text mb-0 line-height-20">Description of your activities</label>
                          <p className="font-size-13 mb-3 line-height-20">400 character limit</p>
                          <div className="form-group">
                            <span className="la la-pencil form-icon" />
                            <textarea className="message-control form-control" name="message" placeholder="In English only           " defaultValue={""} />
                          </div>
                        </div>
                      </div>{/* end col-lg-12 */}
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Included</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>---Included---</option>
                              <option value="Airfare">Airfare</option>
                              <option value="Bus">Bus</option>
                              
                            </select>
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Not Included</label>
                          <div className="form-group select-contain w-100">
                            <select className="select-contain-select">
                              <option value>---Not Included---</option>
                              <option value="EntranceFees">Entrance Fees</option>
                              <option value="FeedingFee">Feeding Fees</option>
                              <option value="AccomodationFee">Accomodation Fees</option>
                              
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
                            <input className="form-control" type="text" placeholder="phone" />
                          </div>
                        </div>
                      </div>{/* end col-lg-6 */}
                      <div className="col-lg-6">
                        <div className="input-box">
                          <label className="label-text">Mobile</label>
                          <div className="form-group">
                            <span className="la la-print form-icon" />
                            <input className="form-control" type="text" placeholder="mobile" />
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
                            <input className="form-control" type="text" placeholder="" />
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
                    <h3 className="title"><i className="la la-clock mr-2 text-gray" />Information about your tour's open hours</h3>
                  </div>{/* form-title-wrap */}
                  <div className="form-content contact-form-action">
                    <form method="post" className="row">
                      <div className="col-lg-4">
                        <div className="input-box mb-4">
                          <label className="label-text">Monday</label>
                          <div className="form-group d-flex align-items-center">
                            <input className="form-control pl-3" type="text" name="text" />
                            <span className="px-2">to</span>
                            <input className="form-control pl-3" type="text" name="text" />
                          </div>
                          <div className="custom-checkbox">
                            <input type="checkbox" id="allDay1" />
                            <label htmlFor="allDay1">Open 24 Hours</label>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box mb-4">
                          <label className="label-text">Tuesday</label>
                          <div className="form-group d-flex align-items-center">
                            <input className="form-control pl-3" type="text" name="text" />
                            <span className="px-2">to</span>
                            <input className="form-control pl-3" type="text" name="text" />
                          </div>
                          <div className="custom-checkbox">
                            <input type="checkbox" id="allDay2" />
                            <label htmlFor="allDay2">Open 24 Hours</label>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box mb-4">
                          <label className="label-text">Wednesday</label>
                          <div className="form-group d-flex align-items-center">
                            <input className="form-control pl-3" type="text" name="text" />
                            <span className="px-2">to</span>
                            <input className="form-control pl-3" type="text" name="text" />
                          </div>
                          <div className="custom-checkbox">
                            <input type="checkbox" id="allDay3" />
                            <label htmlFor="allDay3">Open 24 Hours</label>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box mb-4">
                          <label className="label-text">Thursday</label>
                          <div className="form-group d-flex align-items-center">
                            <input className="form-control pl-3" type="text" name="text" />
                            <span className="px-2">to</span>
                            <input className="form-control pl-3" type="text" name="text" />
                          </div>
                          <div className="custom-checkbox">
                            <input type="checkbox" id="allDay4" />
                            <label htmlFor="allDay4">Open 24 Hours</label>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box mb-4">
                          <label className="label-text">Friday</label>
                          <div className="form-group d-flex align-items-center">
                            <input className="form-control pl-3" type="text" name="text" />
                            <span className="px-2">to</span>
                            <input className="form-control pl-3" type="text" name="text" />
                          </div>
                          <div className="custom-checkbox">
                            <input type="checkbox" id="allDay5" />
                            <label htmlFor="allDay5">Open 24 Hours</label>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box mb-4">
                          <label className="label-text">Saturday</label>
                          <div className="form-group d-flex align-items-center">
                            <input className="form-control pl-3" type="text" name="text" />
                            <span className="px-2">to</span>
                            <input className="form-control pl-3" type="text" name="text" />
                          </div>
                          <div className="custom-checkbox">
                            <input type="checkbox" id="allDay6" />
                            <label htmlFor="allDay6">Open 24 Hours</label>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-4">
                        <div className="input-box mb-4">
                          <label className="label-text">Sunday</label>
                          <div className="form-group d-flex align-items-center">
                            <input className="form-control pl-3" type="text" name="text" />
                            <span className="px-2">to</span>
                            <input className="form-control pl-3" type="text" name="text" />
                          </div>
                          <div className="custom-checkbox">
                            <input type="checkbox" id="allDay7" />
                            <label htmlFor="allDay7">Open 24 Hours</label>
                          </div>
                        </div>
                      </div>{/* end col-lg-4 */}
                      <div className="col-lg-12">
                        <h3 className="title font-size-16 font-weight-medium text-gray pb-3">Recommended length of visit <span className="undo-btn ml-2">Undo</span></h3>
                        <a href="javascript:void(0)" className="recommended-tag theme-btn theme-btn-small theme-btn-gray font-weight-regular mr-2">&lt; 1 hour</a>
                        <a href="javascript:void(0)" className="recommended-tag theme-btn theme-btn-small theme-btn-gray font-weight-regular mr-2">1-2 hours</a>
                        <a href="javascript:void(0)" className="recommended-tag theme-btn theme-btn-small theme-btn-gray font-weight-regular mr-2">2-3 hours</a>
                        <a href="javascript:void(0)" className="recommended-tag theme-btn theme-btn-small theme-btn-gray font-weight-regular mr-2">More than 3 hours</a>
                      </div>
                    </form>
                  </div>{/* end form-content */}
                </div>{/* end form-box */}
                <div className="form-box">
                  <div className="form-title-wrap">
                    <h3 className="title"><i className="la la-clock mr-2 text-gray" />Itinerary</h3>
                  </div>{/* form-title-wrap */}
                  <div className="form-content contact-form-action">
                    <form method="post" className="row">
                      <div className="col-lg-12">
                        <div className="input-box">
                          <label className="label-text">Itinerary name</label>
                          <div className="form-group">
                            <span className="la la-briefcase form-icon" />
                            <input className="form-control" type="text" name="text" placeholder="Itinerary name example: day 1 linfen..." />
                          </div>
                        </div>
                      </div>{/* end col-lg-12 */}
                      <div className="col-lg-12">
                        <div className="input-box">
                          <label className="label-text mb-0 line-height-20">Description</label>
                          <p className="font-size-13 mb-3 line-height-20">400 character limit</p>
                          <div className="form-group">
                            <span className="la la-pencil form-icon" />
                            <textarea className="message-control form-control" name="message" placeholder="In English only           " defaultValue={""} />
                          </div>
                        </div>
                      </div>{/* end col-lg-12 */}
                      <div className="col-lg-12">
                        <div className="file-upload-wrap file-upload-wrap-2">
                          <input type="file" name="files[]" className="multi file-upload-input with-preview" multiple />
                          <span className="file-upload-text"><i className="la la-upload mr-2" />Upload Image</span>
                        </div>
                      </div>{/* end col-lg-12 */}
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
export default withRouter(AddTour);
