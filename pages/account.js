import Head from "next/head";
import React, { Component } from "react";
import Header from "../components/header";
import SignInModal from "../components/signInModal";
import Footer from "../components/footer";
import $ from "jquery";
import Cookies from "js-cookie";
import { API_URL } from "../components/config.js";
import axios from "axios";
import { withRouter } from "next/router";
import WhiteLoader from "../components/whiteLoader";
import { withAlert } from "react-alert";

class Account extends Component {
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
      login_loader: false,
      image_loader: false,
      confirmPassword: "",
      role: "guest",
      company_name: "",
    };
  }

  async componentDidMount() {}

  register = async () => {
    const { alert } = this.props;
    const {
      email,
      password,
      first_name,
      last_name,
      mobile_number,
      confirmPassword,
      company_name,
      role,
    } = this.state;
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (!first_name || first_name == "") {
      this.setState({
        error: "First name is required",
        login_loader: false,
      });
      return alert.show(<div>First name is required</div>, {
        type: "error",
      });
    } else if (!last_name || last_name == "") {
      this.setState({
        error: "Last name is required",
        login_loader: false,
      });
      return alert.show(<div>Last name is required</div>, {
        type: "error",
      });
    } else if (!email || !emailReg.test(email)) {
      this.setState({
        error: "A valid email is required",
        login_loader: false,
      });
      return alert.show(<div>A valid email is required</div>, {
        type: "error",
      });
    } else if (!mobile_number || mobile_number == "") {
      this.setState({
        error: "A valid telephone number is required",
        login_loader: false,
      });
      return alert.show(<div>A valid telephone number is required</div>, {
        type: "error",
      });
    } else if (role == "hotel-admin" && company_name == "") {
      this.setState({
        error: "Company name is required",
        login_loader: false,
      });
      return alert.show(<div>Company name is required</div>, {
        type: "error",
      });
    } else if (!password || !passwordReg.test(password)) {
      this.setState({
        error:
          "Password field can not be empty, must be equal to or greater than 8 characters, must contain a lowercase letter at least, must contain an uppercase letter, .mustcontain a number",
        login_loader: false,
      });
      return alert.show(
        <div>
          Password field can not be empty, must be equal to or greater than 8
          characters, must contain a lowercase letter at least, must contain an
          uppercase letter, .mustcontain a number
        </div>,
        {
          type: "error",
        }
      );
    } else if (this.state.password !== this.state.confirmPassword) {
      return alert.show(
        <div>Password and confirm password values must match</div>,
        {
          type: "error",
        }
      );
    }
    this.setState({ loader: true });
    var bodyParameters = {
      full_name: this.state.first_name + " " + this.state.last_name,
      mobile_number: this.state.mobile_number,
      username:
        this.state.first_name + Math.floor(Math.random() * 10000).toString(),
      role: this.state.role,
      company_name: this.state.company_name,
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
        alert.show(<div>{error.response.data.message}</div>, {
          type: "error",
        });
        console.log(JSON.stringify(error));
      });
  };

  login = async () => {
    const { alert } = this.props;
    this.setState({ login_loader: true });
    let regg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regg.test(this.state.login_email) === false) {
      this.setState({ error: "Incorrect Credentials", login_loader: false });
      alert.show(<div>Incorrect Credentials</div>, {
        type: "error",
      });
    } else if (
      this.state.login_password.length < 1 ||
      this.state.login_email.length < 1
    ) {
      this.setState({
        error: "Please fill all required fields",
        login_loader: false,
      });
      alert.show(<div>Please fill all required fields</div>, {
        type: "error",
      });
    } else {
      this.setState({ error: "" });
      var bodyParameters = {
        email: this.state.login_email,
        password: this.state.login_password,
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
          Cookies.set("token", token, { expires: 14 });
          Cookies.set("id", id, { expires: 14 });
          Cookies.set("role", role, { expires: 14 });
          Cookies.set("name", name, { expires: 14 });
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
            login_loader: false,
          });
          alert.show(
            <div>
              {error.response.data.toLowerCase() ||
                error.response.data.message.toLowerCase()}
            </div>,
            {
              type: "error",
            }
          );
          console.log(JSON.stringify(error.response.data));
        });
    }
  };

  render() {
    const {
      email,
      password,
      first_name,
      last_name,
      mobile_number,
      loader,
      login_loader,
      confirmPassword,
      company_name,
      login_password,
      login_email,
    } = this.state;
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
        </Head>
        <div id="page">
          <Header makeBlue={true} />
          <div className="sub_header_in sticky_header">
            <div className="container">
              <h1>Login/Register</h1>
            </div>
          </div>
          <main>
            <div className="container margin_60">
              <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-6 col-md-8">
                  <div className="box_account">
                    <h3 className="client">Already Client</h3>
                    <div className="form_container">
                      {/* <div className="row no-gutters">
							<div className="col-lg-6 pr-lg-1">
								<a href="#0" className="social_bt facebook">Login with Facebook</a>
							</div>
							<div className="col-lg-6 pl-lg-1">
								<a href="#0" className="social_bt google">Login with Google</a>
							</div>
						</div>
						<div className="divider"><span>Or</span></div>
						<div className="form-group">
							<input type="email" className="form-control" name="email"
                             id="email" placeholder="Email*"/>
						</div>
						<div className="form-group">
							<input type="password" className="form-control" name="password_in" 
                            id="password_in"  placeholder="Password*"/>
						</div>
						<div className="clearfix add_bottom_15">
							<div className="checkboxes float-left">
								<label className="container_check">Remember me
									<input type="checkbox"/>
									<span className="checkmark"></span>
								</label>
							</div>
							<div className="float-right"><a id="forgot" href="javascript:void(0);">
                            Lost Password?</a></div>
						</div>
						<div className="text-center"><input type="submit" value="Log In" 
                        className="btn_1 full-width"/></div>
						<div id="forgot_pw">
							<div className="form-group">
								<input type="email" className="form-control" name="email_forgot" 
                                id="email_forgot" placeholder="Type your email"/>
							</div>
							<p>A new password will be sent shortly.</p>
							<div className="text-center">
                            <input type="submit" value="Reset Password" className="btn_1"/></div>
						</div>
					</div>
				</div>
				<div className="row hidden_tablet">
					<div className="col-md-6">
						<ul className="list_ok">
							<li>Find service</li>
							<li>Book Service/Property</li>
							<li>Data Protection</li>
						</ul>
					</div>
					<div className="col-md-6">
						<ul className="list_ok">
							<li>Secure Payments</li>
							<li>24/7 Customer Support</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="col-xl-6 col-lg-6 col-md-8">
				<div className="box_account">
					<h3 className="new_client">New Client</h3> <small className="float-right pt-2">* Required Fields</small>
					<div className="form_container">
						<div className="form-group">
							<input type="email" className="form-control" name="email" id="email" placeholder="Email*"/>
						</div>
						<div className="form-group">
							<input type="password" className="form-control" name="password_in_2" id="password_in_2"  placeholder="Password*"/>
						</div>
						<hr/>
						<div className="form-group">
							<label className="container_radio" style={{display: "inline-block", marginRight: "15px"}}>Private
								<input type="radio" name="client_type" checked value="private"/>
								<span className="checkmark"></span>
							</label>
							<label className="container_radio" style={{display: "inline-block"}}>Company
								<input type="radio" name="client_type" value="company"/>
								<span className="checkmark"></span>
							</label>
						</div>
						<div className="private box">
							<div className="row no-gutters">
								<div className="col-6 pr-1">
									<div className="form-group">
										<input type="text" className="form-control" placeholder="Name*"/>
									</div>
								</div>
								<div className="col-6 pl-1">
									<div className="form-group">
										<input type="text" className="form-control" placeholder="Last Name*"/>
									</div>
								</div>
								<div className="col-12">
									<div className="form-group">
										<input type="text" className="form-control" placeholder="Full Address*"/>
									</div>
								</div>
							</div>
							<div className="row no-gutters">
						<div className="divider"><span>Or</span></div> */}
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Email*"
                          required
                          value={login_email}
                          onChange={(event) =>
                            this.setState({ login_email: event.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          name="password_in"
                          id="password_in"
                          placeholder="Password*"
                          required
                          value={login_password}
                          onChange={(event) =>
                            this.setState({
                              login_password: event.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="clearfix add_bottom_15">
                        <div className="checkboxes float-left">
                          <label className="container_check">
                            Remember me
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                        <div className="float-right">
                          <a href="/recover">Lost Password?</a>
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={(e) => this.login(e)}
                          className="btn_1 full-width"
                        >
                          {login_loader ? <WhiteLoader /> : "Login"}
                        </button>
                      </div>
                      <div id="forgot_pw">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            name="email_forgot"
                            id="email_forgot"
                            placeholder="Type your email"
                          />
                        </div>
                        <p>A new password will be sent shortly.</p>
                        <div className="text-center">
                          <input
                            type="submit"
                            value="Reset Password"
                            className="btn_1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row hidden_tablet">
                    <div className="col-md-6">
                      <ul className="list_ok">
                        <li>Find Service/Property</li>
                        <li>Advance Filter Option</li>
                        <li>Data Protection</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list_ok">
                        <li>Secure Payments</li>
                        <li>24/7 Support</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-8">
                  <div className="box_account">
                    <h3 className="new_client">New Client</h3>{" "}
                    <small className="float-right pt-2">
                      * Required Fields
                    </small>
                    <div className="form_container">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Email*"
                          required
                          value={email}
                          onChange={(event) =>
                            this.setState({ email: event.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          name="password_in_2"
                          id="password_in_2"
                          placeholder="Password*"
                          required
                          value={password}
                          onChange={(event) =>
                            this.setState({ password: event.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          name="password_in_3"
                          id="password_in_3"
                          placeholder="Confirm Password*"
                          required
                          value={confirmPassword}
                          onChange={(event) =>
                            this.setState({
                              confirmPassword: event.target.value,
                            })
                          }
                        />
                      </div>
                      <hr />
                      <div className="form-group">
                        <label
                          className="container_radio"
                          style={{
                            display: "inline-block",
                            marginRight: "15px",
                          }}
                        >
                          Private
                          <input
                            type="radio"
                            name="client_type"
                            checked={this.state.role === "guest"}
                            value="guest"
                            onChange={(event) => {
                              console.log(event.target.value);
                              return this.setState({
                                role: event.target.value,
                              });
                            }}
                          />
                          <span className="checkmark"></span>
                        </label>
                        <label
                          className="container_radio"
                          style={{ display: "inline-block" }}
                        >
                          Company
                          <input
                            type="radio"
                            name="client_type"
                            value="hotel-admin"
                            checked={this.state.role === "hotel-admin"}
                            onChange={(event) => {
                              console.log(event.target.value);
                              return this.setState({
                                role: event.target.value,
                              });
                            }}
                          />
                          <span className="checkmark"></span>
                        </label>
                        <label
                          className="container_radio"
                          style={{ display: "inline-block" }}
                        ></label>
                      </div>

                      {this.state.role == "hotel-admin" && (
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Company Name*"
                            onChange={(event) =>
                              this.setState({
                                company_name: event.target.value,
                              })
                            }
                            value={company_name}
                          />
                        </div>
                      )}

                      <div className="private box">
                        <div className="row no-gutters">
                          <div className="col-6 pr-1">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="First Name*"
                                onChange={(event) =>
                                  this.setState({
                                    first_name: event.target.value,
                                  })
                                }
                                value={first_name}
                              />
                            </div>
                          </div>
                          <div className="col-6 pl-1">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Last Name*"
                                onChange={(event) =>
                                  this.setState({
                                    last_name: event.target.value,
                                  })
                                }
                                value={last_name}
                              />
                            </div>
                          </div>
                        </div>
                        {/* <div className="row no-gutters">
								<div className="col-6 pr-1">
									<div className="form-group">
										<input type="text" className="form-control" placeholder="City*"/>
									</div>
								</div>
								<div className="col-6 pl-1">
									<div className="form-group">
										<input type="text" className="form-control" placeholder="Postal Code*"/>
									</div>
								</div>
								<div className="col-12">
									<div className="form-group">
										<div className="custom-select-form">
											<select className="wide add_bottom_10" name="country" id="country">
													<option  selected>Country*</option>
													<option value="Nigeria">Nigeria</option>
													<option value="United states">United states</option>
													<option value="Other">Other</option>
											</select>
										</div>
									</div>
								</div>
							</div> */}
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Telephone *"
                                onChange={(event) =>
                                  this.setState({
                                    mobile_number: event.target.value,
                                  })
                                }
                                value={mobile_number}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="company box" style={{ display: "none" }}>
                        <div className="row no-gutters">
                          <div className="col-6 pr-1">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Company Name*"
                                onChange={(event) =>
                                  this.setState({
                                    first_name: event.target.value,
                                  })
                                }
                                value={first_name}
                              />
                            </div>
                          </div>
                          <div className="col-6 pl-1">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Last Name*"
                                onChange={(event) =>
                                  this.setState({
                                    last_name: event.target.value,
                                  })
                                }
                                value={last_name}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row no-gutters">
                          <div className="col-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Company Name*"
                                onChange={(event) =>
                                  this.setState({
                                    company_name: event.target.value,
                                  })
                                }
                                value={company_name}
                              />
                            </div>
                          </div>
                          {/* <div className="col-12">
									<div className="form-group">
										<input type="text" className="form-control" 
										placeholder="Full Address"
										/>
									</div>
								</div>
								<div className="col-12">
									<div className="form-group">
										<input type="text" className="form-control" placeholder="Full Address"/>
									</div>
								</div>
							</div>
							<div className="row no-gutters">
								<div className="col-6 pr-1">
									<div className="form-group">
										<input type="text" className="form-control" placeholder="City*"/>
									</div>
								</div>
								<div className="col-6 pl-1">
									<div className="form-group">
										<input type="text" className="form-control" placeholder="Postal Code*"/>
									</div>
								</div>
								<div className="col-12">
									<div className="form-group">
										<div className="custom-select-form">
											<select className="wide add_bottom_10" name="country" id="country">
													<option  selected>Country*</option>
													<option value="Nigeria">Nigeria</option>
													<option value="United states">United states</option>
													<option value="Other">Other</option>
											</select>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">
									<div className="form-group">
										<input type="text" className="form-control" placeholder="Telephone *"/>
									</div>
								</div>
							</div>
						</div>
						<hr/>
						<div className="form-group">
							<label className="container_check">Accept <a href=/terms">
                            Terms and conditions</a>
								<input type="checkbox"/>
								<span className="checkmark"></span>
							</label>
						</div>
						<div className="text-center">
                        <input type="submit" value="Register" className="btn_1 full-width"/></div>
					</div>
				</div>
			</div>
		</div>
		</div>
	</main>
	<Footer/>
	</div>
	<SignInModal />	
	<div id="toTop"></div>
    <script src="js/common_scripts.js"></script>
	<script src="js/functions.js"></script>
	<script src="assets/validate.js"></script>
    <script>{`
								</div> */}
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Telephone *"
                                onChange={(event) =>
                                  this.setState({
                                    mobile_number: event.target.value,
                                  })
                                }
                                value={mobile_number}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="form-group">
                        <label className="container_check">
                          Accept <a href="/terms">Terms and conditions</a>
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={(e) => this.register(e)}
                          className="btn_1 full-width"
                        >
                          {loader ? <WhiteLoader /> : "Register"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
        <SignInModal />
        <div id="toTop"></div>
        <script src="js/common_scripts.js"></script>
        <script src="js/functions.js"></script>
        <script src="assets/validate.js"></script>
        <script>{`
		$('.wish_bt.liked').on('click', function (c) {
			$(this).parent().parent().parent().fadeOut('slow', function (c) {});
		});
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
const Account_ = withRouter(Account);
export default withAlert()(Account_);
