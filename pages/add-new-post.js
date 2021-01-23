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

class AddNewPost extends Component {
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
                  <div className="breadcrumb-content text-center">
                    <div className="section-heading">
                      <h2 className="sec__title">Add New Post</h2>
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
              <div className="col-lg-8">
                <div className="form-box">
                  <div className="form-title-wrap">
                    <h3 className="title"><i className="la la-gear mr-2 text-gray" />Add New Post</h3>
                  </div>{/* form-title-wrap */}
                  <div className="form-content contact-form-action">
                    <form method="post" className="row">
                      <div className="col-lg-12">
                        <div className="input-box">
                          <label className="label-text">Title</label>
                          <div className="form-group">
                            <span className="la la-briefcase form-icon" />
                            <input className="form-control" type="text" name="text" placeholder="Enter title here" />
                          </div>
                        </div>
                      </div>{/* end col-lg-12 */}
                      <div className="col-lg-12">
                        <div className="input-box">
                          <label className="label-text">Description</label>
                          <div className="form-group">
                            <span className="la la-pencil form-icon" />
                            <textarea className="message-control form-control" id="editor" name="message" defaultValue={""} />
                          </div>
                        </div>
                      </div>{/* end col-lg-12 */}
                    </form>
                  </div>{/* end form-content */}
                </div>{/* end form-box */}
                <div className="submit-box">
                  <div className="btn-box pt-3">
                    <button type="submit" className="theme-btn">Add New Post <i className="la la-arrow-right ml-1" /></button>
                  </div>
                </div>{/* end submit-box */}
              </div>{/* end col-lg-8 */}
              <div className="col-lg-4">
                <div className="form-box">
                  <div className="form-title-wrap">
                    <h3 className="title"><i className="la la-gear mr-2 text-gray" />Add Category</h3>
                  </div>{/* form-title-wrap */}
                  <div className="form-content contact-form-action">
                    <form method="post">
                      <div className="input-box">
                        <label className="label-text">Categories</label>
                        <div className="form-group mb-0">
                          <span className="la la-briefcase form-icon" />
                          <input className="form-control" type="text" name="text" placeholder="Add category" />
                        </div>
                      </div>
                    </form>
                  </div>{/* end form-content */}
                </div>{/* end form-box */}
                <div className="form-box">
                  <div className="form-title-wrap">
                    <h3 className="title"><i className="la la-gear mr-2 text-gray" />Add Tags</h3>
                  </div>{/* form-title-wrap */}
                  <div className="form-content contact-form-action">
                    <form method="post">
                      <div className="input-box">
                        <label className="label-text">Tags (separate tags with commas)</label>
                        <div className="form-group mb-0">
                          <span className="la la-briefcase form-icon" />
                          <input className="form-control" type="text" name="text" placeholder="Example: travel, nature" />
                        </div>
                      </div>
                    </form>
                  </div>{/* end form-content */}
                </div>{/* end form-box */}
                <div className="form-box">
                  <div className="form-title-wrap">
                    <h3 className="title"><i className="la la-photo mr-2 text-gray" />Featured Image</h3>
                  </div>{/* form-title-wrap */}
                  <div className="form-content">
                    <form method="post">
                      <div className="file-upload-wrap file-upload-wrap-3">
                        <input type="file" name="files[]" className="multi file-upload-input with-preview" multiple maxLength={3} />
                        <span className="file-upload-text"><i className="la la-upload mr-2" />Upload image</span>
                      </div>
                    </form>
                  </div>{/* end form-content */}
                </div>{/* end form-box */}
              </div>{/* end col-lg-4 */}
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
export default withRouter(AddNewPost);
