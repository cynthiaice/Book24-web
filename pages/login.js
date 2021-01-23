import React, { Component } from "react";
import Head from "next/head";
import Cookies from "js-cookie";
import { API_URL } from "../components/config.js";
import axios from "axios";
import { withRouter } from "next/router";
import WhiteLoader from "../components/whiteLoader";
import { withAlert } from "react-alert";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      loader: false,
    };
  }

  login = async () => {
    const { alert } = this.props;
    this.setState({ loader: true });
    let regg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regg.test(this.state.email) === false) {
      this.setState({ error: "Incorrect Credentials", loader: false });
    } else if (this.state.password.length < 1 || this.state.email.length < 1) {
      this.setState({
        error: "Please fill all required fields",
        loader: false,
      });
    } else {
      this.setState({ error: "" });
      var bodyParameters = {
        email: this.state.email,
        password: this.state.password,
      };
      axios
        .post(API_URL + "login", bodyParameters, {
          timeout: 20000,
        })
        .then(async (response) => {
          console.log(response);
          let id = response.data.user.id;
          let token = response.data.authToken.token;
          let role = response.data.user.role;
          let name = response.data.user.full_name;
          let email = response.data.user.email;
          let mobile_number = response.data.user.mobile_number;
          Cookies.set("token", token, { expires: 14 });
          Cookies.set("id", id, { expires: 14 });
          Cookies.set("role", role, { expires: 14 });
          Cookies.set("name", name, { expires: 14 });
          Cookies.set("email", email, { expires: 14 });
          Cookies.set("mobile_number", mobile_number, { expires: 14 });

          if (role == "super-admin" || role == "admin") {
            this.props.router.push("/sade");
          } else if (role == "hotel-admin") {
            this.props.router.push("/sade");
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
          console.log(JSON.stringify(error.response.data));
        });
    }
  };

  render() {
    const { email, password, loader, error } = this.state;
    return (
      <div id="login_bg">
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
            <form>
              {/* <div
                  style={{
                    display: 'flex',
    justifyContent: 'center'
                  }}>
                  {
                        loader && <BlueLoader />
                    }</div> */}
              {/* <!-- <div className="access_social">
                        <a href="#0" className="social_bt facebook">Login with Facebook</a>
                        <a href="#0" className="social_bt google">Login with Google</a>
                        <a href="#0" className="social_bt linkedin">Login with Linkedin</a>
                    </div>
                    <div className="divider"><span>Or</span></div> --> */}
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  required
                  value={email}
                  onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }
                />
                <i className="icon_mail_alt"></i>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  value={password}
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                  name="password"
                  id="password"
                />
                <i className="icon_lock_alt"></i>
              </div>
              <div className="clearfix add_bottom_30">
                <div className="checkboxes float-left">
                  <label className="container_check">
                    Remember me
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                </div>
                {/* <div className="float-right mt-1"><a id="forgot" href="javascript:void(0);">
                        Forgot Password?</a></div> */}
              </div>
              <a
                href="#0"
                className="btn_1 rounded full-width"
                onClick={this.login}
              >
                {loader ? <WhiteLoader /> : "Login Now!"}
              </a>
              <div className="text-center add_top_10">
                New to Book24?
                <strong>
                  <a href="/register">Sign up!</a>
                </strong>
              </div>
            </form>
            <div className="copy">© 2020 Book24</div>
          </aside>
          <script src="js/common_scripts.js"></script>
          <script src="js/functions.js"></script>
          <script src="assets/validate.js"></script>
        </div>
      </div>
    );
  }
}

const Login_ = withRouter(Login);
export default withAlert()(Login_);
