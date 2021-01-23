import Head from "../components/DashboardHead";
import React, { Component } from "react";
import PreLoader from "../components/preloader";
import SubAdminHeader from "../components/subAdminHeader";
import SubAdminSideBar from "../components/subAdminSideBar";
import SubAdminUserCanvasMenu from "../components/subAdminUserCanvasMenu";
import AddActivity from "../components/add-activity";
import CardItem from "../components/CardItem";
import TableList from "../components/TableList";
import ActionPrompt from "../components/actionPrompt";
import FormPrompt from "../components/FormPrompt";
import Alert from "react-bootstrap/Alert";
import $ from "jquery";
import Cookies from "js-cookie";
import moment from "moment";
import { connect } from "react-redux";
import { getHotelData, getCurrentHotel } from "../store/actions/hotels";
import { withRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../components/config.js";

class AdminDashboardActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIndex: true,
      showFeatures: false,
      showSecondary: false,
      showForm: false,
      showEditForm: false,
      showActionPrompt: false,
      showFormPrompt: false,
      addPrompt: true,
      saveText: "Save",
      actionText: "Yes",
      promptType: "",
      token: "",
      type: "",
      name: "",
      address: "",
      description: "",
      check_in_time: "",
      check_out_time: "",
      currentHotel: {},
      activitys: [],
      attractions: [],
      activityTypes: [],
      activeName: "",
      activeItem: "",
      filterType: "All Types",
      searchValue: "",
      fromTime: "",
      toTime: "",
    };
  }
  async componentDidMount() {
    let token = await Cookies.get("token");
    this.setState({ token });
    await this.getMainDetails();
  }

  getMainDetails = async () => {
    let token = await Cookies.get("token");
    if (token == null || token == "") {
      //    this.props.router.push("/login");
    }
    this.setState({ token: token });
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "thingsToDos", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ activitys: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            activitys: [...prevState.activitys, row],
          }));
        }
        this.getActivityTypes(token);
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

  getActivityTypes = async (token) => {
    if (token == null || token == "") {
      //    this.props.router.push("/login");
    }
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "thingsToDoTypes", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ activityTypes: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            activityTypes: [...prevState.activityTypes, row],
          }));
        }

        this.setState((prevState) => ({
          activityTypes: [{ name: "All Types" }, ...prevState.activityTypes],
        }));
        this.getAttractions(token);
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };
  getAttractions = async (token) => {
    if (token == null || token == "") {
      //    this.props.router.push("/login");
    }
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "attractions", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ attractions: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            attractions: [...prevState.attractions, row],
          }));
        }
        // this.getActivityFacilities(token);
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

  createActivityType = async () => {
    this.setState({ saveText: "Saving..." });
    var bodyParameters = {
      name: this.state.activeName,
    };

    let token = Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "thingsToDoType", bodyParameters, config)
      .then(async (response) => {
        this.setState({ saveText: "Saved" });
        await this.getActivityTypes(this.state.token);
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
        } else if (error) {
          this.setState({ saveText: "Error" });
        }
      });
  };

  createAttraction = async () => {
    this.setState({ saveText: "Saving..." });
    var bodyParameters = {
      name: this.state.activeName,
    };

    let token = Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };

    axios
      .post(API_URL + "attraction", bodyParameters, config)
      .then(async (response) => {
        this.setState({ saveText: "Saved" });
        await this.getAttractions(this.state.token);
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
        } else if (error) {
          this.setState({ saveText: "Error" });
        }
      });
  };

  renderViews = (name) => {
    switch (name) {
      case "showIndex":
        this.setState({
          showIndex: true,
          showForm: false,
          showFeatures: false,
          showEditForm: false,
          showSecondary: false,
        });
        break;

      case "showFeatures":
        this.setState({
          showFeatures: true,
          showIndex: false,
          showForm: false,
          showEditForm: false,
          showSecondary: false,
        });
        break;
      case "showSecondary":
        this.setState({
          showSecondary: true,
          showFeatures: false,
          showIndex: false,
          showForm: false,
          showEditForm: false,
        });
        break;
      case "showForm":
        this.setState({
          showForm: true,
          showIndex: false,
          showEditForm: false,
          showFeatures: false,
          showSecondary: false,
        });
        break;
      case "showEditForm":
        this.setState({
          showEditForm: true,
          showForm: false,
          showIndex: false,
          showFeatures: false,
          showSecondary: false,
        });
        break;

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
        this.setState({ showIndex: true, showForm: false });
    }
  };

  handleDelete = async () => {
    var config = {
      headers: { Authorization: "Bearer " + this.state.token },
      timeout: 20000,
    };
    this.setState({ actionText: "Wait...", actionDisabled: true });
    await axios
      .delete(API_URL + `thingsToDo/${this.props.currentHotel.id}`, config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        this.setState({ actionText: "Deleted", actionDisabled: false });
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
        this.setState({ actionText: "Error", actionDisabled: false });
      });
    await this.getMainDetails();
  };
  validTo = (current) => {
    return current.isAfter(moment(this.state.fromTime));
  };
  render() {
    const {
      showIndex,
      showFeatures,
      showSecondary,
      showForm,
      showEditForm,
      showActionPrompt,
      showFormPrompt,
      activitys,
      attractions,
      activityTypes,
      addPrompt,
      ap,
      activeName,
      activeItem,
      filterType,
      searchValue,
      toTime,
      fromTime,
    } = this.state;

    return (
      <div>
        <Head />

        <div className="section-bg">
          {/* start cssload-loader */}

          <SubAdminUserCanvasMenu />
          <SubAdminSideBar actActive="page-active" />
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
                          <h2 className="sec__title font-size-30">
                            Activities
                          </h2>
                        </div>
                      </div>
                      {/* end breadcrumb-content */}
                    </div>
                    {/* end col-lg-6 */}
                    <div className="col-lg-6">
                      <div className="list-items d-flex justify-content-end ">
                        {/* btn 1 */}
                        <button
                          className="theme-btn theme-rgb-mid mr-2"
                          onClick={() => {
                            this.setState({ addPrompt: true });
                            if (showIndex) {
                              this.renderViews("showForm");
                            } else if (showSecondary) {
                              this.setState({ ap: "secondary" });
                              this.renderViews("showFormPrompt");
                            } else {
                              this.setState({ promptType: "feature" });
                              this.renderViews("showFormPrompt");
                            }
                          }}
                        >
                          <i className="la la-plus mr-1" />
                          {(showIndex && "ADD ACTIVITY") ||
                            (showSecondary && "ADD ATTRACTION") ||
                            "ADD ACTIVITY TYPE"}
                        </button>
                        {/* btn 2 */}
                        <button
                          className="theme-btn theme-btn-mid mr-2"
                          onClick={() => {
                            showIndex
                              ? this.renderViews("showSecondary")
                              : this.renderViews("showIndex");
                          }}
                        >
                          <i className="la la-feat mr-1" />
                          {(showIndex && "ATTRACTIONS") || "ACTIVITY TYPES"}
                        </button>
                        {/* btn 3 */}
                        <button
                          className="theme-btn theme-btn-mid"
                          onClick={() => {
                            showIndex
                              ? this.renderViews("showFeatures")
                              : this.renderViews("showIndex");
                          }}
                        >
                          <i className="la la-feat mr-1" />
                          {(showIndex && "ACTIVITY TYPES") || "ACTIVITIES"}
                        </button>
                      </div>
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
                {/* Hotels */}
                {showIndex && (
                  <TableList
                    select={
                      <div className="select-contain col-lg-4">
                        <select
                          className="select-contain-select"
                          value={filterType}
                          onChange={(e) =>
                            this.setState({ filterType: e.target.value })
                          }
                        >
                          {activityTypes.map((item, i) => {
                            return (
                              <option key={item.name + i} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    }
                    title="Activity Results"
                    items={activitys
                      .filter((item) => {
                        if (!searchValue) {
                          return item;
                        } else if (
                          item.name
                            .toLowerCase()
                            .includes(searchValue.toLowerCase()) ||
                          item.location
                            .toLowerCase()
                            .includes(searchValue.toLowerCase()) ||
                          (item &&
                            item.type_id
                              .toString()
                              .toLowerCase()
                              .includes(searchValue.toLowerCase())) ||
                          item.address
                            .toLowerCase()
                            .includes(searchValue.toLowerCase())
                        ) {
                          return item;
                        }
                      })

                      .filter((item) => {
                        if (filterType === "All Types") {
                          return item;
                        } else if (filterType == item.type_id) {
                          return item;
                        } else {
                          return;
                        }
                      })
                      .map((item, i) => {
                        return (
                          <CardItem
                            key={item.name + i}
                            cardName={item.name + " " + `(${item.location})`}
                            titleOne="Phone:"
                            detailOne={item.contact_phone}
                            titleTwo="Address:"
                            detailTwo={item.address}
                            editClick={async () => {
                              await this.props.getCurrentHotel(item);
                              this.renderViews("showEditForm");
                            }}
                            deleteClick={async () => {
                              await this.props.getCurrentHotel(item);
                              this.renderViews("showActionPrompt");
                            }}
                          />
                        );
                      })}
                  />
                )}

                {/* secondary */}
                {showSecondary && (
                  <TableList
                    title="Attraction Results"
                    items={attractions.map((item, i) => {
                      return (
                        <CardItem
                          noEditBtn
                          noDelBtn
                          key={item.name + i}
                          cardName={item.name}
                          titleOne="Author:"
                          detailOne={item.author && item.author.full_name}
                          editClick={async () => {
                            this.setState({ addPrompt: false });
                            await this.props.getCurrentHotel(item);
                            this.setState({
                              activeName: item.name,
                              activeItem: item,
                            });
                            this.renderViews("showFormPrompt");
                          }}
                          deleteClick={async () => {
                            await this.props.getCurrentHotel(item);
                            this.renderViews("showActionPrompt");
                          }}
                        />
                      );
                    })}
                  />
                )}

                {/* Features */}

                {showFeatures && (
                  <TableList
                    title="Activity Type Results"
                    items={activityTypes.map((item, i) => {
                      if (item.name === "All Types") {
                        return;
                      } else {
                        return (
                          <CardItem
                            noEditBtn
                            noDelBtn
                            key={item.name + i}
                            cardName={item.name}
                            titleOne="Author:"
                            detailOne={item.author && item.author.full_name}
                            editClick={async () => {
                              this.setState({ addPrompt: false });
                              await this.props.getCurrentHotel(item);
                              this.setState({
                                activeName: item.name,
                                activeItem: item,
                              });
                              this.renderViews("showFormPrompt");
                            }}
                            deleteClick={async () => {
                              await this.props.getCurrentHotel(item);
                              this.renderViews("showActionPrompt");
                            }}
                          />
                        );
                      }
                    })}
                  />
                )}

                {showForm && (
                  <div className="dashboard-main-content">
                    <AddActivity
                      backClick={async () => {
                        this.renderViews("showIndex");
                        await this.getMainDetails();
                      }}
                    />
                  </div>
                )}
                {showEditForm && (
                  <div className="dashboard-main-content">
                    <AddActivity
                      isEdit
                      title={`Edit ${this.props.currentHotel.name}`}
                      backClick={async () => {
                        this.renderViews("showIndex");
                        await this.getMainDetails();
                      }}
                    />
                  </div>
                )}
                {showActionPrompt && (
                  <ActionPrompt
                    text={this.state.actionText}
                    showModal={showActionPrompt}
                    item={this.props.currentHotel.name}
                    actionClick={this.handleDelete}
                    handleClose={() => this.renderViews("showActionPrompt")}
                  />
                )}
                {showFormPrompt && (
                  <FormPrompt
                    saveText={this.state.saveText}
                    showModal={showFormPrompt}
                    title={
                      (addPrompt &&
                        promptType === "secondary" &&
                        "Add Attraction") ||
                      (addPrompt &&
                        promptType === "feature" &&
                        "Add Activity Type") ||
                      (!addPrompt && "Edit " + activeItem.name)
                    }
                    body={
                      <div className="input-box">
                        <label className="label-text">Name</label>
                        <div className="form-group">
                          <span className="la la-briefcase form-icon" />
                          <input
                            required
                            className="form-control"
                            type="text"
                            name="text"
                            placeholder="Name"
                            value={activeName}
                            onChange={(e) =>
                              this.setState({ activeName: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    }
                    actionClick={() => {
                      if (addPrompt && promptType === "secondary") {
                        this.createAttraction();
                      } else if (addPrompt && promptType === "feature") {
                        this.createActivityType();
                      } else {
                        return;
                      }
                    }}
                    handleClose={() => this.renderViews("showFormPrompt")}
                  />
                )}

                {/* Footer */}
                <div className="row align-items-center">
                  <div className="col-lg-7">
                    <div className="copy-right padding-top-30px">
                      <p className="copy__desc">
                        © Copyright Book24 2020.
                        <a href="https://themeforest.net/user//portfolio"></a>
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
                {/* Footer */}
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

const mapStateToProps = (state) => {
  return {
    hotels: state.hotels.hotels,
    currentHotel: state.hotels.currentHotel,
  };
};

const mapDispatchToProps = {
  getHotelData,
  getCurrentHotel,
};

const AdminDashboardActivity__ = withRouter(AdminDashboardActivity);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDashboardActivity__);
