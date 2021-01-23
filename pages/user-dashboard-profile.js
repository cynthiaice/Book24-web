import Head from "next/head";
import React, { Component } from "react";
import PreLoader from "../components/preloader";
import UserAdminHeader from "../components/userAdminHeader";
import UserAdminSideBar from "../components/userAdminSideBar";
import UserAdminCanvasMenu from "../components/userAdminCanvasMenu";
import $ from "jquery";
import Cookies from "js-cookie";
import moment from "moment";
import { withRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../components/config.js";
const inputStyle = { width: "100%", padding: "10px", border: "none" };
class UserDashboardProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      token: "",
      full_name: "",
      email: "",
      mobile_number: "",
      userData: {},
      userId: "",
      editDisabled: true,
      saveDisabled: false,
      saveText: " Edit Profile",
      pageLoading: false,
      loading: "",
    };
  }

  async componentDidMount() {
    this.setState({ pageLoading: true });
    let token = await Cookies.get("token");
    if (token == null || token == "") {
      this.setState({ auth: false });
    } else {
      this.setState({ auth: true, token });
    }
    await this.getData(token);
  }

  getData = (token) => {
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "me", config)
      .then((response) => {
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        let res = response.data;
        this.setState({
          pageLoading: false,
          full_name: res.full_name,
          email: res.email,
          mobile_number: res.mobile_number,
          userId: res.id,
        });
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error.response);
      });
  };
  submitform = (e) => {
    e.preventDefault();
    this.setState({ saveText: "Saving...", saveDisabled: true });
    var bodyParameters = {
      full_name: this.state.full_name,
      email: this.state.email,
      mobile_number: this.state.mobile_number,
    };

    let token = Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };

    axios
      .post(
        API_URL + "update-users/" + this.state.userId.toString(),
        bodyParameters,
        config
      )
      .then(async (response) => {
        this.setState({ saveText: "Saved", saveDisabled: false });
        await this.getData(token);
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          this.setState({ saveText: "Error", saveDisabled: false });
          this.setState({
            error:
              error.response &&
              error.response.data &&
              error.response.data.message,
            error_div: true,
          });
        } else {
          this.setState({ saveText: "Error", saveDisabled: false });
        }
      });
  };
  handleChange = (field, value) => {
    this.setState({ [field]: value, saveText: "Save changes" });
  };
  toggleDisable = () => {
    console.log("toggle disable");
    this.setState({
      editDisabled: !this.state.editDisabled,
    });
  };
  render() {
    const {
      full_name,
      email,
      mobile_number,
      editDisabled,
      saveText,
      saveDisabled,
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
        <div className="section-bg">
          {/* start cssload-loader */}

          <UserAdminCanvasMenu />
          <UserAdminSideBar profileActive="page-active" />
          <section className="dashboard-area">
            <UserAdminHeader />
            <div className="dashboard-content-wrap">
              <div className="dashboard-bread dashboard--bread">
                <div className="container-fluid">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="breadcrumb-content">
                        <div className="section-heading">
                          <h2 className="sec__title font-size-30">
                            My Profile
                          </h2>
                        </div>
                      </div>
                      {/* end breadcrumb-content */}
                    </div>
                    {/* end col-lg-6 */}
                    <div className="col-lg-6">
                      <div className="breadcrumb-list">
                        <ul className="list-items d-flex justify-content-end">
                          <li>
                            <a href="" className="text-white">
                              Home
                            </a>
                          </li>
                          <li>Dashboard</li>
                          <li>My Profile</li>
                        </ul>
                      </div>
                      {/* end breadcrumb-list */}
                    </div>
                    {/* end col-lg-6 */}
                  </div>
                  {/* end row */}
                </div>
              </div>
              {/* end dashboard-bread */}
              <div className="dashboard-main-content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-box">
                        <div className="form-title-wrap border-bottom-0 pb-0">
                          <h3 className="title">Profile Information</h3>
                        </div>
                        <form
                          className="form-content"
                          onSubmit={(e) => this.submitform(e)}
                        >
                          <div className="table-form table-responsive">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td className="pl-0">
                                    <div className="table-content">
                                      <h3 className="title font-weight-medium">
                                        Full Name
                                      </h3>
                                    </div>
                                  </td>
                                  <td className="p-0">:</td>
                                  <td>
                                    <input
                                      onChange={(e) =>
                                        this.handleChange(
                                          "full_name",
                                          e.target.value
                                        )
                                      }
                                      style={inputStyle}
                                      disabled={editDisabled}
                                      value={full_name}
                                      required
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td className="pl-0">
                                    <div className="table-content">
                                      <h3 className="title font-weight-medium">
                                        Email Address
                                      </h3>
                                    </div>
                                  </td>
                                  <td className="p-0">:</td>
                                  <td>
                                    <input
                                      onChange={(e) =>
                                        this.handleChange(
                                          "email",
                                          e.target.value
                                        )
                                      }
                                      style={inputStyle}
                                      disabled={editDisabled}
                                      value={email}
                                      required
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td className="pl-0">
                                    <div className="table-content">
                                      <h3 className="title font-weight-medium">
                                        Phone Number
                                      </h3>
                                    </div>
                                  </td>
                                  <td className="p-0">:</td>
                                  <td>
                                    <input
                                      onChange={(e) =>
                                        this.handleChange(
                                          "mobile_number",
                                          e.target.value
                                        )
                                      }
                                      style={inputStyle}
                                      disabled={editDisabled}
                                      value={mobile_number}
                                      required
                                    />
                                  </td>
                                </tr>
                                {/* <tr>
                                  <td className="pl-0">
                                    <div className="table-content">
                                      <h3 className="title font-weight-medium">
                                        Date of Birth
                                      </h3>
                                    </div>
                                  </td>
                                  <td className="p-0">:</td>
                                  <td>03 Jun 1990</td>
                                </tr> */}
                                {/* <tr>
                                  <td className="pl-0">
                                    <div className="table-content">
                                      <h3 className="title font-weight-medium">
                                        Address
                                      </h3>
                                    </div>
                                  </td>
                                  <td className="p-0">:</td>
                                  <td>
                                    8800 Orchard Lake Road, Suite 180 Farmington
                                    Hills, U.S.A.
                                  </td>
                                </tr> */}
                              </tbody>
                            </table>
                          </div>
                          <div className="section-block" />
                          <div className="btn-box mt-4">
                            <button
                              className="theme-btn"
                              type="submit"
                              disabled={saveDisabled}
                              onClick={(e) => {
                                editDisabled ? this.toggleDisable() : null;
                              }}
                            >
                              {saveText}
                            </button>
                          </div>
                        </form>
                      </div>
                      {/* end form-box */}
                    </div>
                    {/* end col-lg-12 */}
                  </div>
                  {/* end row */}
                  <div className="border-top mt-4" />
                  <div className="row align-items-center">
                    <div className="col-lg-7">
                      <div className="copy-right padding-top-30px">
                        <p className="copy__desc">
                          © Copyright Book24 2020.
                          <span className="la la-heart" /> 
                        </p>
                      </div>
                      {/* end copy-right */}
                    </div>
                    {/* end col-lg-7 */}
                    <div className="col-lg-5">
                      <div className="copy-right-content text-right padding-top-30px">
                        <ul className="social-profile">
                          <li>
                            <a href="#">
                              <i className="lab la-facebook-f" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="lab la-twitter" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="lab la-instagram" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="lab la-linkedin-in" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* end copy-right-content */}
                    </div>
                    {/* end col-lg-5 */}
                  </div>
                  {/* end row */}
                </div>
                {/* end container-fluid */}
              </div>
              {/* end dashboard-main-content */}
            </div>{" "}
          </section>
          {/* end dashboard-area */}
        </div>
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
export default withRouter(UserDashboardProfile);
