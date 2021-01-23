import Head from "../components/DashboardHead";
import React, { Component } from "react";
import PreLoader from "../components/preloader";
import SubAdminHeader from "../components/subAdminHeader";
import SubAdminSideBar from "../components/subAdminSideBar";
import SubAdminUserCanvasMenu from "../components/subAdminUserCanvasMenu";
import CardItem from "../components/CardItem";
import $ from "jquery";
import Cookies from "js-cookie";
import moment from "moment";
import { withRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../components/config.js";
import Tabs from "../components/tabs";
import TextField from "../components/TextField";
import BookingsList from "../components/admin-bookings-list";
import FormPrompt from "../components/FormPrompt";
import { connect } from "react-redux";

class AdminDashboardBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      showFormPrompt: false,
      token: "",
      type: "",
      name: "",
      address: "",
      description: "",
      check_in_time: "",
      check_out_time: "",
      sub_items: [],
      loader: false,
      bookings: [],
      hotelBookings: [],
      eventBookings: [],
      tourBookings: [],
      cruiseBookings: [],
      rentalBookings: [],
      filterValue: "All",
      fromTime: "",
      toTime: "",
      searchValue: "",
    };
  }

  async componentDidMount() {
    let token = await Cookies.get("token");
    this.setState({ token }, () => this.getHotelBookings());
    console.log(token);
  }

  getHotelBookings = () => {
    this.setState({ loader: true });
    var config = {
      headers: { Authorization: "Bearer " + this.state.token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "hotelBookings-admin", config)
      .then(async (response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          row.type = "hotel";
          this.setState((prevState) => ({
            bookings: [...prevState.bookings, row],
            hotelBookings: [...prevState.hotelBookings, row],
          }));
        }
        await this.getEventTickets();
      })
      .catch((error) => {
        this.setState({ loader: false });

        //   router.push("/");
        console.log(error);
      });
  };

  getEventTickets = async () => {
    var config = {
      headers: { Authorization: "Bearer " + this.state.token },
      timeout: 20000,
    };
    await axios
      .get(API_URL + "eventTickets-admin", config)
      .then(async (response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          row.type = "event";
          row.check_in_date = row.event.start_date;
          row.check_out_date = row.event.end_date;
          this.setState((prevState) => ({
            bookings: [...prevState.bookings, row],
            eventBookings: [...prevState.eventBookings, row],
          }));
        }
        await this.getTourBookings();
      })
      .catch((error) => {
        //   router.push("/");
        this.setState({ loader: false });

        console.log(error);
      });
  };

  getTourBookings = () => {
    var config = {
      headers: { Authorization: "Bearer " + this.state.token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "tourBookings-admin", config)
      .then(async (response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          row.type = "tour";
          row.check_in_date = row.tour.start_date;
          row.check_out_date = row.tour.end_date;
          this.setState((prevState) => ({
            bookings: [...prevState.bookings, row],
            tourBookings: [...prevState.tourBookings, row],
          }));
        }
        await this.getRentalBookings();
        this.setState({ loader: false }, () => {
          if (this.state.bookings.length <= 0) {
            //    this.props.router.push("/");
          }
        });
      })
      .catch((error) => {
        this.setState({ loader: false });

        //   router.push("/");
        console.log(error);
      });
  };

  getRentalBookings = () => {
    var config = {
      headers: { Authorization: "Bearer " + this.state.token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "rentalBookings-admin", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          row.type = "rental";
          row.check_in_date = row.rental.start_date;
          row.check_out_date = row.rental.end_date;
          this.setState((prevState) => ({
            bookings: [...prevState.bookings, row],
            rentalBookings: [...prevState.rentalBookings, row],
          }));
        }
        this.setState({ loader: false }, () => {
          if (this.state.bookings.length <= 0) {
            this.props.router.push("/");
          }
        });
      })
      .catch((error) => {
        this.setState({ loader: false });

        //   router.push("/");
        console.log(error);
      });
  };

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
        if (len <= 0) {
          this.props.router.push("/listing");
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
          sub_items:
            type == "hotel"
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
  renderViews = (name) => {
    switch (name) {
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
  render() {
    const {
      hotelBookings,
      eventBookings,
      tourBookings,
      cruiseBookings,
      rentalBookings,
      filterValue,
      fromTime,
      toTime,
      searchValue,
      showFormPrompt,
    } = this.state;

    let currentFeature = this.props.currentHotel;
    return (
      <div>
        <Head />

        <div className="section-bg">
          {/* start cssload-loader */}

          <SubAdminUserCanvasMenu />
          <SubAdminSideBar bookActive="page-active" />
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
                          <h2 className="sec__title font-size-30">Bookings</h2>
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
                        <div
                          className="form-title-wrap"
                          style={{ border: "none" }}
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <h3 className="title">Booking Results</h3>
                          </div>
                        </div>

                        <Tabs>
                          <div className="tab_title_single">
                            Hotels <button>{hotelBookings.length}</button>
                          </div>
                          <BookingsList
                            searchValue={searchValue}
                            bookings={hotelBookings}
                            value={filterValue}
                            onChange={(e) => {
                              this.setState({ filterValue: e.target.value });
                            }}
                            fromTime={fromTime}
                            fromChange={(e) => this.setState({ fromTime: e })}
                            toTime={toTime}
                            toChange={(e) => this.setState({ toTime: e })}
                            viewClick={() => {
                              this.renderViews("showFormPrompt");
                            }}
                          />
                          <div className="tab_title_single">
                            Events <button>{eventBookings.length}</button>
                          </div>
                          <BookingsList
                            searchValue={searchValue}
                            bookings={eventBookings}
                            value={filterValue}
                            onChange={(e) => {
                              this.setState({ filterValue: e.target.value });
                            }}
                            fromTime={fromTime}
                            fromChange={(e) => this.setState({ fromTime: e })}
                            toTime={toTime}
                            toChange={(e) => this.setState({ toTime: e })}
                            viewClick={() => {
                              this.renderViews("showFormPrompt");
                            }}
                          />
                          <div className="tab_title_single">
                            Tours <button>{tourBookings.length}</button>
                          </div>
                          <BookingsList
                            searchValue={searchValue}
                            bookings={tourBookings}
                            value={filterValue}
                            onChange={(e) => {
                              this.setState({ filterValue: e.target.value });
                            }}
                            fromTime={fromTime}
                            fromChange={(e) => this.setState({ fromTime: e })}
                            toTime={toTime}
                            toChange={(e) => this.setState({ toTime: e })}
                            viewClick={() => {
                              this.renderViews("showFormPrompt");
                            }}
                          />
                          <div className="tab_title_single">
                            Cruise <button>{cruiseBookings.length}</button>
                          </div>
                          <BookingsList
                            searchValue={searchValue}
                            bookings={cruiseBookings}
                            value={filterValue}
                            onChange={(e) => {
                              this.setState({ filterValue: e.target.value });
                            }}
                            fromTime={fromTime}
                            fromChange={(e) => this.setState({ fromTime: e })}
                            toTime={toTime}
                            toChange={(e) => this.setState({ toTime: e })}
                            viewClick={() => {
                              this.renderViews("showFormPrompt");
                            }}
                          />
                          <div className="tab_title_single">
                            Rentals <button>{rentalBookings.length}</button>
                          </div>
                          <BookingsList
                            searchValue={searchValue}
                            bookings={rentalBookings}
                            value={filterValue}
                            onChange={(e) => {
                              this.setState({ filterValue: e.target.value });
                            }}
                            fromTime={fromTime}
                            fromChange={(e) => this.setState({ fromTime: e })}
                            toTime={toTime}
                            toChange={(e) => this.setState({ toTime: e })}
                            viewClick={() => {
                              this.renderViews("showFormPrompt");
                            }}
                          />
                        </Tabs>
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
                  {/* end row */}
                </div>

                {showFormPrompt && (
                  <FormPrompt
                    saveText=""
                    showModal={showFormPrompt}
                    title={
                      (currentFeature.room && currentFeature.room.name) ||
                      (currentFeature.tour && currentFeature.tour.name) ||
                      (currentFeature.event && currentFeature.event.name) ||
                      (currentFeature.cruise && currentFeature.cruise.name) ||
                      (currentFeature.rental && currentFeature.rental.name) ||
                      "Details"
                    }
                    body={
                      <div className="form-content contact-form-action">
                        <div className="row">
                          <TextField
                            label="Payment reference"
                            className="la la-money-bill form-icon"
                            type="text"
                            value={currentFeature.payment_reference}
                            disabled
                          />
                          <TextField
                            label="Date created"
                            className="la la-money-bill form-icon"
                            type="text"
                            value={moment(currentFeature.createdAt).format(
                              "YYYY-MM-DD h:mm A"
                            )}
                            disabled
                          />
                          {currentFeature.type === "hotel" && (
                            <TextField
                              label="Room booked"
                              className="la la-money-bill form-icon"
                              type="text"
                              value={
                                currentFeature.room && currentFeature.room.name
                              }
                              disabled
                            />
                          )}

                          <TextField
                            label={
                              (currentFeature.paid && "Amount Paid") || "Price"
                            }
                            className="la la-money-bill form-icon"
                            type="text"
                            value={currentFeature.price}
                            disabled
                          />

                          {currentFeature.type === "hotel" && (
                            <TextField
                              label="Check in date"
                              className="la la-money-bill form-icon"
                              type="text"
                              value={moment(
                                currentFeature.check_in_date
                              ).format("YYYY-MM-DD h:mm A")}
                              disabled
                            />
                          )}
                          {currentFeature.type === "hotel" && (
                            <TextField
                              label="Check out date"
                              className="la la-money-bill form-icon"
                              type="text"
                              value={moment(
                                currentFeature.check_out_date
                              ).format("YYYY-MM-DD h:mm A")}
                              disabled
                            />
                          )}

                          <TextField
                            label="Client name"
                            className="la la-money-bill form-icon"
                            type="text"
                            value={
                              currentFeature.owner &&
                              currentFeature.owner.full_name
                            }
                            disabled
                          />
                        </div>
                      </div>
                    }
                    //  actionClick={this.updateUser}
                    handleClose={() => this.renderViews("showFormPrompt")}
                  />
                )}
                {/* end container-fluid */}
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
const mapStateToProps = (state) => {
  return {
    currentHotel: state.hotels.currentHotel,
  };
};

const AdminDashboardBooking_ = withRouter(AdminDashboardBooking);

export default connect(mapStateToProps)(AdminDashboardBooking_);
