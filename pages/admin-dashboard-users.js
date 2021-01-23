import React, { Component } from "react";
import Head from "../components/DashboardHead";
import PreLoader from "../components/preloader";
import SubAdminHeader from "../components/subAdminHeader";
import SubAdminSideBar from "../components/subAdminSideBar";
import SubAdminUserCanvasMenu from "../components/subAdminUserCanvasMenu";
import CardItem from "../components/CardItem";
import ActionPrompt from "../components/actionPrompt";
import FormPrompt from "../components/FormPrompt";
import $ from "jquery";
import Cookies from "js-cookie";
import moment from "moment";
import { withRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../components/config.js";

class AdminDashboardUser extends Component {
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
      loader: false,
      users: [],
      showActionPrompt: false,
      showFormPrompt: false,
      saveText: "Save",
      actionText: "Yes",
      rolesOptions: ["guest", "hotel-admin", "admin", "super-admin"],
      featureName: "",
      currentFeature: {},
      filterType: "All",
      searchValue: "",
    };
  }

  async componentDidMount() {
    let token = await Cookies.get("token");
    this.setState({ token }, () => this.getHotelBookings());
  }

  getHotelBookings = () => {
    this.setState({ loader: true });
    var config = {
      headers: { Authorization: "Bearer " + this.state.token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "users", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];

          this.setState((prevState) => ({
            users: [...prevState.users, row],
          }));
        }
      })
      .catch((error) => {
        this.setState({ loader: false });

        //   router.push("/");
        console.log(error);
      });
  };

  renderViews = (name) => {
    switch (name) {
      case "showActionPrompt":
        this.setState({
          showActionPrompt: !this.state.showActionPrompt,
          actionText: "Yes",
        });
        break;
      case "showFormPrompt":
        this.setState({
          showFormPrompt: !this.state.showFormPrompt,
          saveText: "Save",
        });
        break;
      default:
        this.setState({ showActionPrompt: false, showFormPrompt: false });
    }
  };

  updateUser = (e) => {
    e.preventDefault();
    this.setState({ saveText: "Saving..." });
    var bodyParameters = {
      role: this.state.featureName,
    };

    let token = Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };

    axios
      .post(
        API_URL + "update-users/" + this.state.currentFeature.id.toString(),
        bodyParameters,
        config
      )
      .then(async (response) => {
        this.setState({ saveText: "Saved" });
        await this.getHotelBookings();
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          this.setState({ saveText: "Error" });
          this.setState({
            error:
              error.response &&
              error.response.data &&
              error.response.data.message,
            error_div: true,
          });
        } else {
          this.setState({ saveText: "Error" });
        }
      });
  };

  handleDelete = async () => {
    var config = {
      headers: { Authorization: "Bearer " + this.state.token },
      timeout: 20000,
    };
    this.setState({ actionText: "Wait...", actionDisabled: true });
    await axios
      .delete(API_URL + `user/${this.state.currentFeature.id}`, config)
      .then(async (response) => {
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        this.setState({ actionText: "Deleted", actionDisabled: false });
        await this.getHotelBookings();
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
        this.setState({ actionText: "Error", actionDisabled: false });
      });
    await this.getHotelBookings();
  };
  render() {
    const {
      users,
      currentFeature,
      featureName,
      rolesOptions,
      showFormPrompt,
      showActionPrompt,
      filterType,
      searchValue,
    } = this.state;
    return (
      <div>
        <Head />
        <div className="section-bg">
          {/* start cssload-loader */}

          <SubAdminUserCanvasMenu />
          <SubAdminSideBar userActive="page-active" />
          <section className="dashboard-area">
            <SubAdminHeader
              searchChange={(e) => {
                this.setState({ searchValue: e.target.value });
              }}
              searchValue={searchValue}
            />
            <div className="dashboard-content-wrap">
              <div className="dashboard-bread dashboard--bread dashboard-bread-2">
                <div className="container-fluid">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="breadcrumb-content">
                        <div className="section-heading">
                          <h2 className="sec__title font-size-30">Users</h2>
                        </div>
                      </div>
                      {/* end breadcrumb-content */}
                    </div>
                    {/* end col-lg-6 */}
                    <div className="col-lg-6">
                      {/* <div className="breadcrumb-list">
                  <ul className="list-items d-flex justify-content-end">
                    <li><a href="index.html" className="text-white">Home</a></li>
                    <li>Dashboard</li>
                    <li>Booking</li>
                  </ul>
                </div> */}

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
                        <div className="form-title-wrap">
                          <div className="d-flex align-items-center justify-content-between">
                            <h3 className="title">Users Results</h3>
                            <div className="select-contain">
                              <select
                                className="select-contain-select"
                                value={filterType}
                                onChange={(e) =>
                                  this.setState({ filterType: e.target.value })
                                }
                              >
                                <option value="All">All</option>
                                <option value="Admin">Admin</option>
                                <option value="Guest">Guest</option>
                                <option value="Hotel admin">Hotel admin</option>
                                <option value="Super admin">Super admin</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="form-content pb-2">
                          {users

                            .filter((item) => {
                              if (!searchValue) {
                                return item;
                              } else if (
                                (item &&
                                  item.full_name &&
                                  item.full_name
                                    .toLowerCase()
                                    .includes(searchValue.toLowerCase())) ||
                                item.role
                                  .toLowerCase()
                                  .includes(searchValue.toLowerCase()) ||
                                item.email
                                  .toLowerCase()
                                  .includes(searchValue.toLowerCase())
                              ) {
                                return item;
                              }
                            })
                            .filter((item) => {
                              if (filterType === "All") {
                                return item;
                              } else if (
                                filterType === "Admin" &&
                                item.role === "admin"
                              ) {
                                if (item.role == "admin") {
                                  return item;
                                } else {
                                  return;
                                }
                              } else if (
                                filterType === "Guest" &&
                                item.role === "guest"
                              ) {
                                if (item.role == "guest") {
                                  return item;
                                } else {
                                  return;
                                }
                              } else if (
                                filterType === "Hotel admin" &&
                                item.role === "hotel-admin"
                              ) {
                                if (item.role == "hotel-admin") {
                                  return item;
                                } else {
                                  return;
                                }
                              } else if (
                                filterType === "Super admin" &&
                                item.role === "super-admin"
                              ) {
                                if (item.role == "super-admin") {
                                  return item;
                                } else {
                                  return;
                                }
                              }
                            })
                            .map((item, i) => {
                              return (
                                <CardItem
                                  key={item.email + i + i + i}
                                  cardName={item.full_name}
                                  titleOne="Role:"
                                  detailOne={item.role}
                                  titleTwo="Email:"
                                  detailTwo={item.email}
                                  editClick={async () => {
                                    await this.setState({
                                      currentFeature: item,
                                      featureName: item.role,
                                    });
                                    this.renderViews("showFormPrompt");
                                  }}
                                  deleteClick={async () => {
                                    await this.setState({
                                      currentFeature: item,
                                    });
                                    this.renderViews("showActionPrompt");
                                  }}
                                />
                              );
                            })}
                        </div>
                      </div>
                      {/* end form-box */}
                    </div>
                    {/* end col-lg-12 */}
                  </div>
                  {/* end row */}
                  <div className="row">
                    <div className="col-lg-12">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <li className="page-item">
                            <a
                              className="page-link page-link-nav"
                              href="#"
                              aria-label="Previous"
                            >
                              <span aria-hidden="true">
                                <i className="la la-angle-left" />
                              </span>
                              <span className="sr-only">Previous</span>
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link page-link-nav" href="#">
                              1
                            </a>
                          </li>
                          <li className="page-item active">
                            <a className="page-link page-link-nav" href="#">
                              2 <span className="sr-only">(current)</span>
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link page-link-nav" href="#">
                              3
                            </a>
                          </li>
                          <li className="page-item">
                            <a
                              className="page-link page-link-nav"
                              href="#"
                              aria-label="Next"
                            >
                              <span aria-hidden="true">
                                <i className="la la-angle-right" />
                              </span>
                              <span className="sr-only">Next</span>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="border-top mt-5" />
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

                {showActionPrompt && (
                  <ActionPrompt
                    text={this.state.actionText}
                    showModal={showActionPrompt}
                    item={currentFeature.full_name}
                    actionClick={this.handleDelete}
                    handleClose={() => this.renderViews("showActionPrompt")}
                  />
                )}

                
                {showFormPrompt && (
                  <FormPrompt
                    saveText={this.state.saveText}
                    showModal={showFormPrompt}
                    title={"Edit " + currentFeature.full_name}
                    body={
                      <div className="col-lg-6 responsive-column">
                        <div className="input-box">
                          <label className="label-text">Role</label>
                          <div className="form-group select-contain w-100">
                            <select
                              required
                              value={featureName}
                              className="select-contain-select"
                              onChange={(event) => {
                                this.setState({
                                  featureName: event.target.value,
                                });
                              }}
                            >
                              <option value>Select </option>
                              {rolesOptions.map((element) => (
                                <option
                                  value={element.toLowerCase()}
                                  key={element}
                                >
                                  {element}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    }
                    actionClick={this.updateUser}
                    handleClose={() => this.renderViews("showFormPrompt")}
                  />
                )}

                {/* end container-fluid */}
              </div>
              {/* end dashboard-main-content */}
            </div>
            {/* end dashboard-content-wrap */}
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
export default withRouter(AdminDashboardUser);
