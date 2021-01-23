import Head from "next/head";
import React, { Component } from "react";
import Header from "../components/header";
import DetailsHeader from "../components/detailsHeader";
import CarListItem from "../components/carListItem";
import PreLoader from "../components/preloader";
import SignInModal from "../components/signInModal";
import Footer from "../components/footer";
import $ from "jquery";
import Cookies from "js-cookie";
import moment from "moment";
import { withRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../components/config.js";
import InputRange from "react-input-range";
import OutsideClickHandler from "react-outside-click-handler";
class CarList extends Component {
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
      cars: [],
      showFilterPrice: false,
      showFilterFacility: false,
      showFilterType: false,
      carFeatures: [],
      selectedFacilities: [],
      carCategories: [],
      selectedTypes: [],
      priceValues: { min: 0, max: 900000 },
      currentSort: "",
      searchValue: "",
    };
  }

  async componentDidMount() {
    this.getData();
  }

  handleCheckboxChange = (state, name, field) => {
    let newArr = [...state, name];
    if (state.includes(name)) {
      newArr = newArr.filter((day) => day !== name);
    }
    this.setState({
      [field]: newArr,
    });
  };
  renderFilterViews = (name) => {
    switch (name) {
      case "showFilterPrice":
        this.setState({
          showFilterPrice: !this.state.showFilterPrice,
          showFilterFacility: false,
          showFilterType: false,
        });
        break;
      case "showFilterFacility":
        this.setState({
          showFilterPrice: false,
          showFilterFacility: !this.state.showFilterFacility,
          showFilterType: false,
        });
        break;
      case "showFilterType":
        this.setState({
          showFilterPrice: false,
          showFilterFacility: false,
          showFilterType: !this.state.showFilterType,
        });
        break;

      default:
        this.setState({
          showFilterPrice: !this.state.showFilterPrice,
          showFilterFacility: false,
          showFilterType: false,
        });
    }
  };

  getData = async () => {
    let token = await Cookies.get("token");
    if (token == null || token == "") {
      this.props.router.push("/login");
    }
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "cars/", config)
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
          cars: response.data.rows,
        });
        this.getCarFeatures(token);
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error.response);
      });
  };

  getCarFeatures = async (token) => {
    if (token == null || token == "") {
      //    this.props.router.push("/login");
    }
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "carFeatures", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows;
        this.setState({ carFeatures: len });

        this.getCarCategories(token);
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };
  getCarCategories = async (token) => {
    if (token == null || token == "") {
      //    this.props.router.push("/login");
    }
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "carCategories", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows;
        this.setState({ carCategories: len });
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

  render() {
    const {
      showFilterType,
      showFilterFacility,
      showFilterPrice,
      carFeatures,
      selectedFacilities,
      carCategories,
      selectedTypes,
      priceValues,
      currentSort,
      searchValue,
      cars,
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
        <div id="page">
          {/* start cssload-loader */}

          <DetailsHeader makeBlue={true} />

          {/* ================================
    START CARD AREA
================================= */}
          <section className="card-area section--padding">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="filter-wrap margin-bottom-30px">
                    <div className="filter-top d-flex align-items-center justify-content-between pb-4">
                      <div>
                        <h3 className="title font-size-24">
                          {cars.length} Cars found
                        </h3>
                        <p className="font-size-14">
                          <span className="mr-1 pt-1">
                            Book with confidence:
                          </span>
                        </p>
                      </div>
                      <div className="layout-view d-flex align-items-center">
                        <a
                          href="car-grid.html"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Grid View"
                          className="active"
                        >
                          <i className="la la-th-large" />
                        </a>
                        <a
                          href="car-list.html"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="List View"
                        >
                          <i className="la la-th-list" />
                        </a>
                      </div>
                    </div>
                    {/* end filter-top */}

                    <div className="filter-bar d-flex align-items-center justify-content-between">
                      <div className="filter-bar-filter d-flex flex-wrap align-items-center">
                        <div className="filter-option">
                          <h3 className="title font-size-16">Filter by:</h3>
                        </div>
                        <OutsideClickHandler
                          onOutsideClick={() => {
                            this.setState({ showFilterPrice: false });
                          }}
                        >
                          <div className="filter-option">
                            <div className="dropdown dropdown-contain">
                              <a
                                className="dropdown-toggle dropdown-btn dropdown--btn"
                                href="#"
                                role="button"
                                onClick={() =>
                                  this.renderFilterViews("showFilterPrice")
                                }
                              >
                                Filter Price
                              </a>
                              {showFilterPrice && (
                                <div
                                  className="dropdown-menu dropdown-menu-wrap"
                                  style={{ display: "flex" }}
                                >
                                  <div className="dropdown-item">
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        paddingBottom: "20px",
                                      }}
                                    >
                                      <h6
                                        style={{
                                          fontSize: "10px",
                                          fontWeight: "bold",
                                          color: "#287dfa",
                                        }}
                                      >
                                        {"₦" +
                                          priceValues.min.toLocaleString() +
                                          "-" +
                                          "₦" +
                                          priceValues.max.toLocaleString()}
                                      </h6>
                                    </div>
                                    <InputRange
                                      formatLabel={(value) =>
                                        `₦ ${value.toLocaleString()}`
                                      }
                                      maxValue={900000}
                                      minValue={0}
                                      value={priceValues}
                                      onChange={(value) =>
                                        this.setState({ priceValues: value })
                                      }
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </OutsideClickHandler>
                        <OutsideClickHandler
                          onOutsideClick={() => {
                            this.setState({ showFilterFacility: false });
                          }}
                        >
                          <div className="filter-option">
                            <div className="dropdown dropdown-contain">
                              <a
                                className="dropdown-toggle dropdown-btn dropdown--btn"
                                href="#"
                                role="button"
                                //  data-toggle="dropdown"
                                onClick={() =>
                                  this.renderFilterViews("showFilterFacility")
                                }
                              >
                                Facilities
                              </a>
                              {showFilterFacility && (
                                <div
                                  className="dropdown-menu dropdown-menu-wrap"
                                  style={{ display: "flex" }}
                                >
                                  <div className="dropdown-item">
                                    <div className="checkbox-wrap">
                                      {carFeatures.map((item, i) => {
                                        return (
                                          <div class="custom-checkbox">
                                            <input
                                              type="checkbox"
                                              id={item.name + i + i}
                                              onChange={() =>
                                                this.handleCheckboxChange(
                                                  selectedFacilities,
                                                  item.name,
                                                  "selectedFacilities"
                                                )
                                              }
                                              checked={
                                                (selectedFacilities.includes(
                                                  item.name
                                                ) &&
                                                  true) ||
                                                false
                                              }
                                            />
                                            <label htmlFor={item.name + i + i}>
                                              {item.name}
                                            </label>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  {/* end dropdown-item */}
                                </div>
                              )}
                              {/* end dropdown-menu */}
                            </div>
                            {/* end dropdown */}
                          </div>
                        </OutsideClickHandler>

                        {/* Filter By Hotel type */}
                        <OutsideClickHandler
                          onOutsideClick={() => {
                            this.setState({ showFilterType: false });
                          }}
                        >
                          <div className="filter-option">
                            <div className="dropdown dropdown-contain">
                              <a
                                className="dropdown-toggle dropdown-btn dropdown--btn"
                                href="#"
                                role="button"
                                // data-toggle="dropdown"
                                onClick={() =>
                                  this.renderFilterViews("showFilterType")
                                }
                              >
                                Car Type
                              </a>
                              {showFilterType && (
                                <div
                                  className="dropdown-menu dropdown-menu-wrap"
                                  style={{ display: "flex" }}
                                >
                                  <div className="dropdown-item">
                                    <div className="checkbox-wrap">
                                      {carCategories.map((item, i) => {
                                        return (
                                          <div class="custom-checkbox">
                                            <input
                                              type="checkbox"
                                              id={item.name + i + i}
                                              onChange={() =>
                                                this.handleCheckboxChange(
                                                  selectedTypes,
                                                  item.id,
                                                  "selectedTypes"
                                                )
                                              }
                                              checked={
                                                (selectedTypes.includes(
                                                  item.id
                                                ) &&
                                                  true) ||
                                                false
                                              }
                                            />
                                            <label htmlFor={item.name + i + i}>
                                              {item.name}
                                            </label>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  {/* end dropdown-item */}
                                </div>
                              )}
                              {/* end dropdown-menu */}
                            </div>
                            {/* end dropdown */}
                          </div>
                        </OutsideClickHandler>
                        {/* Filter By Hotel type */}
                      </div>
                      <div class="col-lg-4">
                        <div
                          class="form-group"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#D3D3D3",
                            borderRadius: "3px",
                            paddingRight: "3px",
                          }}
                        >
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Search by destination, car name, location..."
                            value={searchValue}
                            onChange={(e) =>
                              this.setState({
                                searchValue: e.target.value,
                              })
                            }
                          />
                          <i class="icon_search px-2"></i>
                        </div>
                      </div>
                      {/* end filter-bar-filter */}
                      <div className="select-contain">
                        <select
                          className="select-contain-select"
                          value={currentSort}
                          onChange={(e) =>
                            this.setState({ currentSort: e.target.value })
                          }
                        >
                          <option value={1}>Sort by default</option>
                          <option value={2}>Best Seller</option>
                          <option value={3}>Price: low to high</option>
                          <option value={4}>Price: high to low</option>
                          <option value={5}>A to Z</option>
                        </select>
                      </div>
                      {/* end select-contain */}
                    </div>
                    {/* end filter-bar */}
                  </div>
                  {/* end filter-wrap */}
                </div>
                {/* end col-lg-12 */}
              </div>
              {/* end row */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    {cars

                      .sort((a, b) => {
                        if (currentSort == 3) {
                          if (parseInt(a.price) > parseInt(b.price)) {
                            return 1;
                          } else {
                            return -1;
                          }
                        } else if (currentSort == 4) {
                          if (parseInt(a.price) > parseInt(b.price)) {
                            return -1;
                          } else {
                            return 1;
                          }
                        } else if (currentSort == 5) {
                          if (a.name > b.name) {
                            return 1;
                          } else {
                            return -1;
                          }
                        }
                      })
                      .filter((item) => {
                        if (searchValue == "") {
                          return item;
                        } else if (
                          item.name
                            .toLowerCase()
                            .includes(searchValue.toLowerCase()) ||
                          item.location
                            .toLowerCase()
                            .includes(searchValue.toLowerCase()) ||
                          item.address
                            .toLowerCase()
                            .includes(searchValue.toLowerCase())
                        ) {
                          return item;
                        }
                      })

                      .filter((item) => {
                        if (selectedFacilities.length === 0) {
                          return item;
                        } else if (selectedFacilities.length > 0) {
                          let i;
                          for (
                            i = 0;
                            i < JSON.parse(item.features).length;
                            i++
                          ) {
                            if (
                              selectedFacilities.includes(
                                JSON.parse(item.features)[i].name
                              )
                            ) {
                              return item;
                            }
                          }
                        }
                      })

                      .filter((item) => {
                        if (selectedTypes.length === 0) {
                          return item;
                        } else if (selectedTypes.length > 0) {
                          if (
                            selectedTypes.includes(parseInt(item.carCategory))
                          ) {
                            return item;
                          }
                        }
                      })

                      .filter((item) => {
                        if (
                          priceValues.min === 0 &&
                          priceValues.max === 900000
                        ) {
                          return item;
                        } else {
                          if (
                            parseInt(item.price) >= priceValues.min &&
                            parseInt(item.price) <= priceValues.max
                          ) {
                            return item;
                          }
                        }
                      })

                      .filter((item) => {
                        if (currentSort != 2) {
                          return item;
                        } else {
                          if (currentSort == 2) {
                            if (item.featured) {
                              return item;
                            }
                          }
                        }
                      })

                      .map((el, index) => {
                        return (
                          <CarListItem
                            item={el}
                            key={el.name + index + index}
                          />
                        );
                      })}{" "}
                  </div>
                  {/* end row */}
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="btn-box mt-3 text-center">
                        {/* <button type="button" className="theme-btn"><i className="la la-refresh mr-1" />Load More</button> */}
                        <p className="font-size-13 pt-2">
                          Showing {cars.length} Cars
                        </p>
                      </div>
                      {/* end btn-box */}
                    </div>
                    {/* end col-lg-12 */}
                  </div>
                  {/* end row */}
                </div>
                {/* end col-lg-8 */}

                {/* end col-lg-4 */}
              </div>
              {/* end row */}
            </div>
            {/* end container */}
          </section>
          {/* end card-area */}
          {/* ================================
    END CARD AREA
================================= */}
          <div className="section-block" />
          {/* ================================
    START INFO AREA
================================= */}
          <section className="info-area info-bg padding-top-90px padding-bottom-70px">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 responsive-column">
                  <a href="#" className="icon-box icon-layout-2 d-flex">
                    <div className="info-icon flex-shrink-0 bg-rgb text-color-2">
                      <i className="la la-phone" />
                    </div>
                    {/* end info-icon*/}
                    <div className="info-content">
                      <h4 className="info__title">Need Help? Contact us</h4>
                      <p className="info__desc">
                        We are always available to assist you.
                      </p>
                    </div>
                    {/* end info-content */}
                  </a>
                  {/* end icon-box */}
                </div>
                {/* end col-lg-4 */}
                <div className="col-lg-4 responsive-column">
                  <a href="#" className="icon-box icon-layout-2 d-flex">
                    <div className="info-icon flex-shrink-0 bg-rgb-2 text-color-3">
                      <i className="la la-money" />
                    </div>
                    {/* end info-icon*/}
                    <div className="info-content">
                      <h4 className="info__title">Payments</h4>
                      <p className="info__desc">
                        All payments are processed through secure channels
                      </p>
                    </div>
                    {/* end info-content */}
                  </a>
                  {/* end icon-box */}
                </div>
                {/* end col-lg-4 */}
                <div className="col-lg-4 responsive-column">
                  <a href="#" className="icon-box icon-layout-2 d-flex">
                    <div className="info-icon flex-shrink-0 bg-rgb-3 text-color-4">
                      <i className="la la-times" />
                    </div>
                    {/* end info-icon*/}
                    <div className="info-content">
                      <h4 className="info__title">Cancel Policy</h4>
                      <p className="info__desc">
                        Kindly refer to cancellation policy of property/service
                        provider
                      </p>
                    </div>
                    {/* end info-content */}
                  </a>
                  {/* end icon-box */}
                </div>
                {/* end col-lg-4 */}
              </div>
              {/* end row */}
            </div>
            {/* end container */}
          </section>
          {/* end info-area */}
          {/* ================================
    END INFO AREA
================================= */}
          {/* ================================
    START CTA AREA
================================= */}
          <section className="cta-area subscriber-area section-bg-2 padding-top-60px padding-bottom-60px">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-7">
                  <div className="section-heading">
                    <h2 className="sec__title font-size-30 text-white">
                      Subscribe to see Secret Deals
                    </h2>
                  </div>
                  {/* end section-heading */}
                </div>
                {/* end col-lg-7 */}
                <div className="col-lg-5">
                  <div className="subscriber-box">
                    <div className="contact-form-action">
                      <form action="#">
                        <div className="input-box">
                          <label className="label-text text-white">
                            Enter email address
                          </label>
                          <div className="form-group mb-0">
                            <span className="la la-envelope form-icon" />
                            <input
                              className="form-control"
                              type="email"
                              name="email"
                              placeholder="Email address"
                            />
                            <button
                              className="theme-btn theme-btn-small submit-btn"
                              type="submit"
                            >
                              Subscribe
                            </button>
                            <span className="font-size-14 pt-1 text-white-50">
                              <i className="la la-lock mr-1" />
                              Don't worry your information is safe with us.
                            </span>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* end section-heading */}
                </div>
                {/* end col-lg-5 */}
              </div>
              {/* end row */}
            </div>
            {/* end container */}
          </section>
          {/* end cta-area */}
          {/* ================================
    END CTA AREA
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
export default withRouter(CarList);
