import Head from "next/head";
import React, { Component } from "react";
import Header from "../components/header";
import DetailsHeader from "../components/detailsHeader";
import ActivityItem from "../components/activityItem";
import DetailsItem from "../components/detailsItem";
import PreLoader from "../components/preloader";
import SignInModal from "../components/signInModal";
import Footer from "../components/footer";
import $ from "jquery";
import Cookies from "js-cookie";
import moment from "moment";
import { withRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../components/config.js";
import BlueLoader from "../components/blueLoader";
import OutsideClickHandler from "react-outside-click-handler";

class ActivityListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      token: "",
      type: "all",
      loader: false,
      activity: [],
      activity_types: [],
      searchValue: "",
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
    console.log("\n");
    console.log("\n");
    console.log(this.props.router.query);
    console.log("\n");
    console.log("\n");

    const type = this.props.router.query.type
      ? this.props.router.query.type
      : "";

    this.getActivityTypes(token, type);
  }

  getActivityTypes = (token, type) => {
    this.setState({ loader: true });
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "thingsToDoTypes/", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        this.setState({
          activity_types: response.data.rows,
        });
        this.getActivities(token);
      })
      .catch((error) => {
        //   router.push("/");
        this.setState({ loader: false });
        console.log(error.response);
      });
  };

  getActivities = (token) => {
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "thingsToDos/", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        this.setState({
          loader: false,
          activity: response.data.rows,
        });
      })
      .catch((error) => {
        //   router.push("/");
        this.setState({
          loader: false,
        });
        console.log(error.response);
      });
  };

  render() {
    const { loader, activity, activity_types, type, searchValue } = this.state;
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
        </Head>
        <div id="page">
          <DetailsHeader makeBlue={true} />

          <main>
            <div id="results">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-4 col-10">
                    <h4>
                      <strong></strong> Things To Do{" "}
                    </h4>
                  </div>
                  <div class="col-lg-8 mt-2">
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
                        placeholder="Search by destination, activity name, location..."
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
                </div>
                {/* /row --> */}
                <div className="search_mob_wp">
                  <div className="custom-search-input-2">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="What are you looking for..."
                      />
                      <i className="icon_search"></i>
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Where"
                      />
                      <i className="icon_pin_alt"></i>
                    </div>
                    <select
                      className="nice-select wide"
                      tabindex="0"
                      onChange={(e) => this.setState({ type: e.target.value })}
                    >
                      <option className="option" value={"all"}>
                        All
                      </option>
                      {activity_types.map((el, index) => {
                        return (
                          <option
                            className="option"
                            value={el.name.toLowerCase()}
                            key={el.name + index + index}
                          >
                            {el.name}
                          </option>
                        );
                      })}
                    </select>
                    <input type="submit" value="Search" />
                  </div>
                </div>
                {/* /search_mobile --> */}
              </div>
              {/* /container --> */}
            </div>
            {/* /results --> */}

            <div className="filters_listing sticky_horizontal">
              <div className="container">
                <ul className="clearfix">
                  <li>
                    <div className="switch-field">
                      <input
                        type="radio"
                        id="all"
                        name="listing_filter"
                        value="all"
                        checked
                      />
                      <label for="all">All</label>
                      <input
                        type="radio"
                        id="popular"
                        name="listing_filter"
                        value="popular"
                      />
                      <label for="popular">Popular</label>
                      <input
                        type="radio"
                        id="latest"
                        name="listing_filter"
                        value="latest"
                      />
                      <label for="latest">Latest</label>
                    </div>
                  </li>
                  <li>
                    <a
                      className="btn_filt"
                      data-toggle="collapse"
                      href="#filters"
                      aria-expanded="false"
                      aria-controls="filters"
                      data-text-swap="Less filters"
                      data-text-original="More filters"
                    >
                      More filters
                    </a>
                  </li>
                  <li>
                    <div className="layout_view">
                      <a href="#0" className="active">
                        <i className="icon-th"></i>
                      </a>
                      <a href="listing-2.html">
                        <i className="icon-th-list"></i>
                      </a>
                      <a href="list-map.html">
                        <i className="icon-map"></i>
                      </a>
                    </div>
                  </li>
                  <li>
                    <a
                      className="btn_map"
                      data-toggle="collapse"
                      href="#collapseMap"
                      aria-expanded="false"
                      aria-controls="collapseMap"
                      data-text-swap="Hide map"
                      data-text-original="View on map"
                    >
                      View on map
                    </a>
                  </li>
                </ul>
              </div>
              {/* /container --> */}
            </div>
            {/* /filters --> */}

            <div className="collapse" id="collapseMap">
              <div id="map" className="map"></div>
            </div>
            {/* /Map --> */}

            <div className="collapse" id="filters">
              <div className="container margin_30_5">
                <div className="row">
                  <div className="col-md-4">
                    <h6>Rating</h6>
                    <ul>
                      <li>
                        <label className="container_check">
                          Superb 9+ <small>34</small>
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check">
                          Very Good 8+ <small>43</small>
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check">
                          Good 7+ <small>67</small>
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check">
                          Pleasant 6+ <small>89</small>
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <h6>Tags</h6>
                    <ul>
                      <li>
                        <label className="container_check">
                          Beaches<small>23</small>
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check">
                          Bars <small>43</small>
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check">
                          Malls <small>43</small>
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check">
                          Parks <small>43</small>
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check">
                          Zoo <small>43</small>
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check">
                          Art Gallery <small>43</small>
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check">
                          Restaurants<small>34</small>
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check">
                          Resorts <small>43</small>
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check">
                          Museums <small>11</small>
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <div className="add_bottom_30">
                      <h6>Distance</h6>
                      <div className="distance">
                        {" "}
                        Radius around selected destination <span></span> km
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="10"
                        value="30"
                        data-orientation="horizontal"
                      />
                    </div>
                  </div>
                </div>
                {/* /row --> */}
              </div>
            </div>
            {/* /Filters --> */}

            <div className="container margin_60_35">
              <div className="category_filter">
                <label className="container_radio">
                  All
                  <input
                    type="radio"
                    value="all"
                    checked={type == "all" ? true : false}
                    className="selected"
                    onChange={(e) => this.setState({ type: "all" })}
                  />
                  <span className="checkmark"></span>
                </label>
                {activity_types !== null &&
                  activity_types.map((el, index) => {
                    return (
                      <label className="container_radio">
                        {el.name}
                        <input
                          type="radio"
                          value={el.name.toLowerCase()}
                          checked={type == el.name.toLowerCase() ? true : false}
                          onChange={(e) =>
                            this.setState({ type: e.target.value })
                          }
                        />
                        <span className="checkmark"></span>
                      </label>
                    );
                  })}
              </div>
              <div className="isotope-wrapper">
                <div className="row">
                  {loader && <BlueLoader />}
                  {activity
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
                    .map((el, index) => {
                      if (type == "all" || type == el.type.name.toLowerCase()) {
                        return (
                          <ActivityItem el={el} key={el.name + index + index} />
                        );
                      }
                    })}
                </div>
                {/* /row --> */}
              </div>
              {/* /isotope-wrapper --> */}

              {/* <p className="text-center"><a href="#0" className="btn_1 rounded add_top_30">Load more</a></p> */}
            </div>
            {/* /col --> */}

            {/* /container --> */}
          </main>
          <Footer />
        </div>
        <SignInModal />
        <div id="toTop"></div>
        <script src="js/common_scripts.js"></script>
        <script src="js/functions.js"></script>
        <script src="assets/validate.js"></script>
        <script src="http://maps.googleapis.com/maps/api/js"></script>
        <script src="js/map_single_hotel.js"></script>
        <script src="js/infobox.js"></script>
        <script src="js/input_qty.js"></script>
        <script>{`
	$(function() {
	  $('input[name="dates"]').daterangepicker({
		  autoUpdateInput: false,
		  parentEl:'#input-dates',
		  opens: 'left',
		  locale: {
			  cancelLabel: 'Clear'
		  }
	  });
	  $('input[name="dates"]').on('apply.daterangepicker', function(ev, picker) {
		  $(this).val(picker.startDate.format('MM-DD-YY') + ' > ' + picker.endDate.format('MM-DD-YY'));
	  });
	  $('input[name="dates"]').on('cancel.daterangepicker', function(ev, picker) {
		  $(this).val('');
	  });
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
export default withRouter(ActivityListing);
