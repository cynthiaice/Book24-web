import React, { Component } from "react";
import Head from "next/head";
import Cookies from "js-cookie";
import {
  API_URL,
  cloudinary_api_key,
  cloudinary_api_secret,
} from "../components/config.js";
import axios from "axios";
import { withRouter } from "next/router";
import { withAlert } from "react-alert";
import BlueLoader from "../components/blueLoader";
import WhiteLoader from "../components/whiteLoader";
import Loader from 'react-loader-spinner'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      username: "",
      mobile_number: "",
      image_url: "",
      error: "",
      loader: false,
      image_loader: false,
      confirmPassword: "",
    };
  }

  register = async() => {
    const { alert } = this.props;
    const {image_url} = this.state
    if (image_url == "") {
      return alert.show(
        <div>Upload a profile image</div>,
        {
          type: "error",
        }
      );
    }
    if (this.state.password !== this.state.confirmPassword) {
      return alert.show(
        <div>Password and confirm password values must match</div>,
        {
          type: "error",
        }
      );
    }
    this.setState({ loader: true });
    this.setState({ error: "" });
    var bodyParameters = {
      email: this.state.email,
      password: this.state.password,
      full_name: this.state.first_name + " " + this.state.last_name,
      mobile_number: this.state.mobile_number,
      username:
        this.state.first_name + Math.floor(Math.random() * 10000).toString(),
      image_url: this.state.image_url,
    };
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
        let mobile_number = response.data.user.mobile_number;
        let email = response.data.user.email;
        Cookies.set("token", token, { expires: 14 });
        Cookies.set("id", id, { expires: 14 });
        Cookies.set("role", role, { expires: 14 });
        Cookies.set("name", name, { expires: 14 });
        if (role == "super-admin" || role == "admin") {
          this.props.router.push("/admin/hotels");
        } else if (role == "hotel-admin") {
          this.props.router.push("/admin-dashboard");
        } else {
          this.props.router.push("/user-dashboard");
        }
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({
          error: error.response.data,
          loader: false,
        });
        alert.show(<div>{error.response.data.toLowerCase()}</div>, {
          type: "error",
        });
        console.log(JSON.stringify(error));
      });
  }

  uploadImage = async (e) => {
    e.preventDefault();
    let url = "https://api.cloudinary.com/v1_1/book24/image/upload";
    let uploadPreset = "profile-upload";
    let formData = new FormData();
    formData.append("api_key", cloudinary_api_key);
    formData.append("file", e.target.files[0]);
    formData.append("timestamp", (Date.now() / 1000) | 0);
    formData.append("upload_preset", uploadPreset);
    this.setState({ image_loader: true });
    axios
      .post(url, formData)
      .then((response) => {
        this.setState({
          image_loader: false,
          image_url: response.data.url,
        });
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ image_loader: false });
      });
  };

  render() {
    const {
      email,
      password,
      first_name,
      last_name,
      mobile_number,
      loader,
      confirmPassword,
      image_loader,
      image_url,
    } = this.state;
    return (
      <div id="register_bg">
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
        </Head>
        <nav id="menu" className="fake_menu"></nav>

        <div id="login">
          <aside>
            <figure>
              <a href="/">
                <img
                  src="/images/logobook24.png"
                  width="160"
                  height="50"
                  alt=""
                  className="logo_sticky"
                />
              </a>
            </figure>
            
            <br/>
            <div id="profileImageUploader">
           
              {image_loader ? (
                <Loader
                  type="TailSpin"
                  color="#1281dd"
                  height={20}
                  width={20}
                />
              ) : image_url ? (
                <label for="upload-profile-image">
                <img
                  src={image_url}
                  style={{
                    width: "50px",
                    height: "50px",
                    cursor:"pointer"
                  }}
                /></label>
              ) : (
                <label for="upload-profile-image">
                <ion-icon
                  style={{
                    width: "30px",
                    height: "30px",
                    cursor:"pointer"
                  }}
                  name="person-add"
                ></ion-icon></label>
              )}
              <input type="file" name="photo" id="upload-profile-image" 
                onChange={this.uploadImage}
              />
            </div>
            
            <form>
              <div className="form-group">
                <label>First Name</label>
                <input
                  className="form-control"
                  type="text"
                  required
                  value={first_name}
                  onChange={(event) =>
                    this.setState({ first_name: event.target.value })
                  }
                />
                <i className="ti-user"></i>
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  className="form-control"
                  type="text"
                  required
                  value={last_name}
                  onChange={(event) =>
                    this.setState({ last_name: event.target.value })
                  }
                />
                <i className="ti-user"></i>
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  className="form-control"
                  type="text"
                  required
                  value={mobile_number}
                  onChange={(event) =>
                    this.setState({ mobile_number: event.target.value })
                  }
                />
                <i className="ti-user"></i>
              </div>
              <div className="form-group">
                <label>Your Email</label>
                <input
                  className="form-control"
                  type="email"
                  required
                  value={email}
                  onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }
                />
                <i className="icon_mail_alt"></i>
              </div>
              <div className="form-group">
                <label>Your password</label>
                <input
                  className="form-control"
                  type="password"
                  id="password1"
                  required
                  value={password}
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                />
                <i className="icon_lock_alt"></i>
              </div>
              <div className="form-group">
                <label>Confirm password</label>
                <input
                  className="form-control"
                  type="password"
                  id="password2"
                  required
                  value={confirmPassword}
                  onChange={(event) =>
                    this.setState({ confirmPassword: event.target.value })
                  }
                />
                <i className="icon_lock_alt"></i>
              </div>
              <div id="pass-info" className="clearfix"></div>
              <a href="#0"  onClick={this.register} 
              className="btn_1 rounded full-width add_top_30">
              {loader ? <WhiteLoader />:"Register Now!"}
              </a>
              <div className="text-center add_top_10">
                Already have an acccount?{" "}
                <strong>
                  <a href="/login">Sign In</a>
                </strong>
              </div>
            </form>
            <div className="copy">© 2020 Book24</div>
          </aside>
        </div>
        {/* <!-- /login --> */}

        {/* <!-- COMMON SCRIPTS --> */}
        <script src="js/common_scripts.js"></script>
        <script src="js/functions.js"></script>
        <script src="assets/validate.js"></script>

        {/* <!-- SPECIFIC SCRIPTS --> */}
        <script src="js/pw_strenght.js"></script>
      </div>
    );
  }
}

const Register_ = withRouter(Register);
export default withAlert()(Register_);
