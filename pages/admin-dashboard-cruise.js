import Head from "../components/DashboardHead";
import React, { Component } from "react";
import PreLoader from "../components/preloader";
import SubAdminHeader from "../components/subAdminHeader";
import SubAdminSideBar from "../components/subAdminSideBar";
import SubAdminUserCanvasMenu from "../components/subAdminUserCanvasMenu";
import AddCruise from "../components/add-cruise";
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
import DateTime from "react-datetime";

class AdminDashboardCruise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIndex: true,
      showFeatures: false,
      showForm: false,
      showEditForm: false,
      showActionPrompt: false,
      showFormPrompt: false,
      addPrompt: true,
      actionText: "Yes",
      token: "",
      type: "",
      name: "",
      address: "",
      description: "",
      check_in_time: "",
      check_out_time: "",
      sub_items: [],
      hotels: [],
      cruise: [],
      currentHotel: {},
      currentFeature: {},
      featureName: "",
      hotelFeatures: [],
      filterType: "Start Date",
      searchValue: "",
      fromTime: "",
      toTime: "",
    };
  }
  async componentDidMount() {
    let token = await Cookies.get("token");
    this.setState({ token });
    this.getMainDetails();
  }

  getMainDetails = async () => {
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "cruise", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ cruise: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            cruise: [...prevState.cruise, row],
          }));
        }
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
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
        });
        break;

      case "showForm":
        this.setState({
          showForm: true,
          showIndex: false,
          showEditForm: false,
          showFeatures: false,
        });
        break;
      case "showEditForm":
        this.setState({
          showEditForm: true,
          showForm: false,
          showIndex: false,
          showFeatures: false,
        });
        break;

      case "showActionPrompt":
        this.setState({
          showActionPrompt: !this.state.showActionPrompt,
          actionText: "Yes",
        });
        break;
      case "showFormPrompt":
        this.setState({ showFormPrompt: !this.state.showFormPrompt });
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
      .delete(API_URL + `cruise/${this.props.currentHotel.id}`, config)
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
      showForm,
      showEditForm,
      showActionPrompt,
      cruise,
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
          <SubAdminSideBar cruiseActive="page-active" />
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
                          <h2 className="sec__title font-size-30">Cruise</h2>
                        </div>
                      </div>
                      {/* end breadcrumb-content */}
                    </div>
                    {/* end col-lg-6 */}
                    <div className="col-lg-6">
                      <div className="list-items d-flex justify-content-end ">
                        <button
                          className="theme-btn theme-rgb-mid mr-2"
                          onClick={() => {
                            this.setState({ addPrompt: true });
                            showIndex
                              ? this.renderViews("showForm")
                              : this.renderViews("showFormPrompt");
                          }}
                        >
                          <i className="la la-plus mr-1" />
                          ADD CRUISE
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
                      <div
                        className="db_list_top"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div className="select-contain col-lg-4">
                          <label className="label-text">Filter By</label>
                          <select
                            className="select-contain-select"
                            value={filterType}
                            onChange={(e) =>
                              this.setState({ filterType: e.target.value })
                            }
                          >
                            <option value="Start Date">Start Date</option>
                            <option value="End Date">End Date</option>
                          </select>
                        </div>

                        <div className="col-lg-4">
                          <div className="input-box">
                            <label className="label-text">Date From</label>
                            <div className="form-group">
                              <DateTime
                                value={fromTime}
                                onChange={(e) => this.setState({ fromTime: e })}
                                timeFormat={false}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="input-box">
                            <label className="label-text">Date To</label>
                            <div className="form-group">
                              <DateTime
                                isValidDate={this.validTo}
                                value={toTime}
                                onChange={(e) => this.setState({ toTime: e })}
                                timeFormat={false}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                    title="Cruise Results"
                    items={cruise
                      .sort((a, b) => {
                        if (filterType == "Start Date") {
                          return (
                            new Date(
                              moment(b.start_date).format("YYYY-MM-DD HH:mm:ss")
                            ) -
                            new Date(
                              moment(a.start_date).format("YYYY-MM-DD HH:mm:ss")
                            )
                          );
                        } else if (filterType == "End Date") {
                          return (
                            new Date(
                              moment(b.end_date).format("YYYY-MM-DD HH:mm:ss")
                            ) -
                            new Date(
                              moment(a.end_date).format("YYYY-MM-DD HH:mm:ss")
                            )
                          );
                        }
                      })

                      .filter((item) => {
                        if (!fromTime || !toTime) {
                          return item;
                        } else if (
                          moment(
                            moment(item.start_date).format("YYYY-MM-DD")
                          ).isBetween(
                            moment(fromTime).format("YYYY-MM-DD"),
                            moment(toTime).format("YYYY-MM-DD")
                          )
                        ) {
                          return item;
                        }
                      })

                      .filter((item) => {
                        if (!searchValue) {
                          return item;
                        } else if (
                          item.name
                            .toLowerCase()
                            .includes(searchValue.toLowerCase()) ||
                          item.location
                            .toLowerCase()
                            .includes(searchValue.toLowerCase())
                        ) {
                          return item;
                        }
                      })

                      .map((item, i) => {
                        return (
                          <CardItem
                            key={item.name + i}
                            cardName={item.name}
                            titleOne="Location:"
                            detailOne={item.location}
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
                {/* Edit forms */}

                {showForm && (
                  <div className="dashboard-main-content">
                    <AddCruise
                      backClick={() => {
                        this.renderViews("showIndex");
                        this.getMainDetails();
                      }}
                    />
                  </div>
                )}
                {showEditForm && (
                  <div className="dashboard-main-content">
                    <AddCruise
                      isEdit
                      title={`Edit ${this.props.currentHotel.name}`}
                      backClick={() => {
                        this.renderViews("showIndex");
                        this.getMainDetails();
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

// const curHotel = (dispatch) => {
//   return {
//     onHotelClick: (item) =>
//       dispatch({ type: "GET_CURRENT_HOTEL", value: item }),
//   };
// };
const mapDispatchToProps = {
  getHotelData,
  getCurrentHotel,
};

const AdminDashboardCruise__ = withRouter(AdminDashboardCruise);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDashboardCruise__);
