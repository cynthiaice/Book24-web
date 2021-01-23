import Head from "next/head";
import React, { Component } from "react";
import DetailsHeader from "../components/detailsHeader";
import SignInModal from "../components/signInModal";
import Footer from "../components/footer";
import GridItem from "../components/gridItem";
import $ from "jquery";
import { withRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../components/config.js";
import { connect } from "react-redux";

class GridListingsFiltersCol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      events: [],
      tours: [],
      rentals: [],
      cars: [],
      activities: [],
      showHotel: true,
      showEvent: true,
      showTour: true,
      showRental: true,
      showCar: true,
      showActivity: true,
      queries: {},
    };
  }

  static getInitialProps({ query }) {
    return { query };
  }

  async componentDidMount() {
    console.log(this.props.router.query);
    let queries = this.props.order.search_queries;
    this.setState({ queries });

    if (
      this.props.router.query.type == "hotel" ||
      (queries && queries.typeQuery && queries.typeQuery == "hotel")
    ) {
      this.setState({
        showHotel: true,
        showActivity: false,
        showCar: false,
        showRental: false,
        showEvent: false,
        showTour: false,
      });
    }
    if (
      this.props.router.query.type == "event" ||
      (queries && queries.typeQuery && queries.typeQuery == "event")
    ) {
      this.setState({
        showEvent: true,

        showActivity: false,
        showCar: false,
        showRental: false,
        showHotel: false,
        showTour: false,
      });
    }
    if (
      this.props.router.query.type == "tour" ||
      (queries && queries.typeQuery && queries.typeQuery == "tour")
    ) {
      this.setState({
        showTour: true,
        showActivity: false,
        showCar: false,
        showRental: false,
        showEvent: false,
        showHotel: false,
      });
    }
    if (
      this.props.router.query.type == "activity" ||
      (queries && queries.typeQuery && queries.typeQuery == "activity")
    ) {
      this.setState({
        showActivity: true,
        showHotel: false,
        showCar: false,
        showRental: false,
        showEvent: false,
        showTour: false,
      });
    }
    if (
      this.props.router.query.type == "rental" ||
      (queries && queries.typeQuery && queries.typeQuery == "rental")
    ) {
      this.setState({
        showRental: true,
        showActivity: false,
        showCar: false,
        showHotel: false,
        showEvent: false,
        showTour: false,
      });
    }
    if (
      this.props.router.query.type == "car" ||
      (queries && queries.typeQuery && queries.typeQuery == "car")
    ) {
      this.setState({
        showCar: true,
        showActivity: false,
        showHotel: false,
        showRental: false,
        showEvent: false,
        showTour: false,
      });
    }

    this.getHotels();
  }

  getHotels = () => {
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "hotels", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ hotels: response.data.rows });
        // for (let i = 0; i < len; i++) {
        //   let row = response.data.rows[i];
        //   this.setState((prevState) => ({
        //     hotels: [...prevState.hotels, row],
        //   }));
        // }
        this.getEvents();
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

  getEvents = () => {
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "events", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ events: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            events: [...prevState.events, row],
          }));
        }
        this.getTours();
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

  getTours = () => {
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "tours", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ tours: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            tours: [...prevState.tours, row],
          }));
        }
        this.getCars();
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

  getCars = () => {
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "cars", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ cars: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            cars: [...prevState.cars, row],
          }));
        }
        this.getRentals();
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

  getRentals = () => {
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "cars", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ rentals: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            rentals: [...prevState.rentals, row],
          }));
        }
        this.getActivities();
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

  getActivities = () => {
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "thingsToDo", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ activities: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            activities: [...prevState.activities, row],
          }));
        }
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

  render() {
    const {
      hotels,
      tours,
      events,
      rentals,
      cars,
      activities,
      showActivity,
      showCar,
      showEvent,
      showHotel,
      showRental,
      showTour,
      queries,
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
        </Head>
        <div id="page">
          <DetailsHeader />

          <main>
            <div id="results">
              <div class="container">
                <div class="row">
                  <div class="col-lg-3 col-md-4 col-10">
                    <h4>
                      <strong>
                        {hotels.length +
                          tours.length +
                          activities.length +
                          events.length +
                          cars.length +
                          rentals.length}
                      </strong>{" "}
                      result for All listing
                    </h4>
                  </div>
                  <div class="col-lg-9 col-md-8 col-2">
                    <a href="#0" class="search_mob btn_search_mobile"></a>
                    {/* <!-- /open search panel --> */}
                    <div class="row no-gutters custom-search-input-2 inner">
                      <div class="col-lg-4">
                        <div class="form-group">
                          <input
                            class="form-control"
                            type="text"
                            placeholder="What are you looking for..."
                          />
                          <i class="icon_search px-2"></i>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="form-group">
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Where"
                          />
                          <i class="icon_pin_alt"></i>
                        </div>
                      </div>
                      <select
                        class="col-lg-3 nice-select wide"
                        style={{
                          border: "none",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          outline: "none",
                        }}
                        tabindex="0"
                      >
                        <option>All Categories</option>
                        <option class="option">Hotels</option>
                        <option class="option">Events</option>
                        <option class="option">Flight</option>
                        <option class="option">Tours</option>
                        <option class="option">Rentals</option>
                        <option class="option">Activities</option>
                      </select>
                      <div class="col-lg-1">
                        <button
                          value="Search"
                          style={{
                            border: "none",
                            outline: "none",
                            backgroundColor: "yellow",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ion-icon
                            name="search"
                            style={{
                              color: "#1281dd",
                            }}
                          ></ion-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- /row --> */}
                <div class="search_mob_wp">
                  <div class="custom-search-input-2">
                    <div class="form-group">
                      <input
                        class="form-control"
                        type="text"
                        placeholder="What are you looking for..."
                      />
                      <i class="icon_search px-2"></i>
                    </div>
                    <div class="form-group">
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Where"
                      />
                      <i class="icon_pin_alt"></i>
                    </div>
                    <select
                      class="nice-select wide"
                      style={{
                        border: "none",
                        width: "100%",
                        height: "100%",
                      }}
                      tabindex="0"
                    >
                      <option>All Categories</option>
                      <option class="option">Hotels</option>
                      <option class="option">Events</option>
                      <option class="option">Flight</option>
                      <option class="option">Tours</option>
                      <option class="option">Rentals</option>
                      <option class="option">Activities</option>
                    </select>
                    <div class="col-lg-1">
                      <input type="submit" value="Search" />
                    </div>
                  </div>
                </div>
                {/* <!-- /search_mobile --> */}
              </div>
              {/* <!-- /container --> */}
            </div>
            {/* <!-- /results --> */}

            <div class="filters_listing version_2  sticky_horizontal">
              <div class="container">
                <ul class="clearfix">
                  <li>
                    <div class="switch-field">
                      <input
                        type="radio"
                        id="all"
                        name="listing_filter"
                        checked="all"
                        checked
                      />
                      <label for="all">All</label>
                      <input
                        type="radio"
                        id="popular"
                        name="listing_filter"
                        checked="popular"
                      />
                      <label for="popular">Popular</label>
                      <input
                        type="radio"
                        id="latest"
                        name="listing_filter"
                        checked="latest"
                      />
                      <label for="latest">Latest</label>
                    </div>
                  </li>
                  <li>
                    <div class="layout_view">
                      <a href="#0" class="active">
                        <i class="icon-th"></i>
                      </a>
                      <a href="listing-2">
                        <i class="icon-th-list"></i>
                      </a>
                      <a href="list-map">
                        <i class="icon-map"></i>
                      </a>
                    </div>
                  </li>
                  <li>
                    <a
                      class="btn_map"
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
              {/* <!-- /container --> */}
            </div>
            {/* <!-- /filters --> */}

            <div class="collapse" id="collapseMap">
              <div id="map" class="map"></div>
            </div>
            {/* <!-- /Map --> */}

            <div class="container margin_60_35" style={{ paddingTop: "50px" }}>
              <div class="row">
                <aside class="col-lg-3" id="sidebar">
                  <div id="filters_col">
                    <a
                      data-toggle="collapse"
                      href="#collapseFilters"
                      aria-expanded="false"
                      aria-controls="collapseFilters"
                      id="filters_col_bt"
                    >
                      Filters{" "}
                    </a>
                    <div class="collapse show" id="collapseFilters">
                      <div class="filter_type">
                        <h6>Category</h6>
                        <ul>
                          <li>
                            <label class="container_check">
                              Hotels <small>{hotels.length}</small>
                              <input
                                type="checkbox"
                                checked={showHotel}
                                onChange={(e) => {
                                  this.setState({ showHotel: !showHotel });
                                }}
                              />
                              <span class="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label class="container_check">
                              Events <small>{events.length}</small>
                              <input
                                type="checkbox"
                                checked={showEvent}
                                onChange={(e) => {
                                  this.setState({ showEvent: !showEvent }, () =>
                                    console.log(this.state.showEvent)
                                  );
                                }}
                              />
                              <span class="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label class="container_check">
                              Tours <small>{tours.length}</small>
                              <input
                                type="checkbox"
                                checked={showTour}
                                onChange={(e) => {
                                  this.setState({ showTour: !showTour });
                                }}
                              />
                              <span class="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label class="container_check">
                              Cars <small>{cars.length}</small>
                              <input
                                type="checkbox"
                                checked={showCar}
                                onChange={(e) => {
                                  this.setState({ showCar: !showCar });
                                }}
                              />
                              <span class="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label class="container_check">
                              Rentals <small>{rentals.length}</small>
                              <input
                                type="checkbox"
                                checked={showRental}
                                onChange={(e) => {
                                  this.setState({ showRental: !showRental });
                                }}
                              />
                              <span class="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label class="container_check">
                              Activities <small>{activities.length}</small>
                              <input
                                type="checkbox"
                                checked={showActivity}
                                onChange={(e) => {
                                  this.setState({
                                    showActivity: !showActivity,
                                  });
                                }}
                              />
                              <span class="checkmark"></span>
                            </label>
                          </li>
                        </ul>
                      </div>
                      <div class="filter_type">
                        <h6>Distance</h6>
                        <div class="distance">
                          {" "}
                          Radius around selected destination <span></span> km
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          step="10"
                          checked="30"
                          data-orientation="horizontal"
                        />
                      </div>
                      <div class="filter_type">
                        <h6>Rating</h6>
                        <ul>
                          <li>
                            <label class="container_check">
                              Superb 9+ <small>34</small>
                              <input type="checkbox" />
                              <span class="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label class="container_check">
                              Very Good 8+ <small>21</small>
                              <input type="checkbox" />
                              <span class="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label class="container_check">
                              Good 7+ <small>15</small>
                              <input type="checkbox" />
                              <span class="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label class="container_check">
                              Pleasant 6+ <small>34</small>
                              <input type="checkbox" />
                              <span class="checkmark"></span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <!--/collapse --> */}
                  </div>
                  {/* <!--/filters col--> */}
                </aside>
                {/* <!-- /aside --> */}

                <div class="col-lg-9">
                  <div class="row">
                    {showHotel &&
                      hotels
                        .filter((item) => {
                          if (!queries) {
                            return item;
                          } else if (
                            (queries && queries.locationQuery == "all") ||
                            (queries && queries.typeQuery == "all")
                          ) {
                            if (
                              item.name
                                .toLowerCase()
                                .includes(
                                  queries && queries.nameQuery.toLowerCase()
                                )
                            ) {
                              return item;
                            }
                          } else if (
                            (queries && queries.nameQuery) ||
                            (queries && queries.locationQuery) ||
                            (queries && queries.typeQuery)
                          ) {
                            if (
                              item.name
                                .toLowerCase()
                                .includes(
                                  queries && queries.nameQuery.toLowerCase()
                                ) &&
                              item.location
                                .toLowerCase()
                                .includes(queries && queries.locationQuery)
                            ) {
                              return item;
                            }
                          }
                        })

                        .map((el, index) => {
                          return (
                            <GridItem
                              key={el.name + index + index}
                              name={el.name}
                              address={el.address}
                              image_url={
                                el &&
                                el.images &&
                                el.images[0] &&
                                el.images[0].url
                              }
                              description={el.description}
                              type={"Hotel"}
                              id={el.id}
                            />
                          );
                        })}
                    {showEvent &&
                      events

                        .filter((item) => {
                          if (!queries) {
                            return item;
                          } else if (
                            (queries && queries.locationQuery == "all") ||
                            (queries && queries.typeQuery == "all")
                          ) {
                            if (
                              item.name
                                .toLowerCase()
                                .includes(
                                  queries && queries.nameQuery.toLowerCase()
                                )
                            ) {
                              return item;
                            }
                          } else if (
                            (queries && queries.nameQuery) ||
                            (queries && queries.locationQuery) ||
                            (queries && queries.typeQuery)
                          ) {
                            if (
                              item.name
                                .toLowerCase()
                                .includes(
                                  queries && queries.nameQuery.toLowerCase()
                                ) &&
                              item.location
                                .toLowerCase()
                                .includes(queries && queries.locationQuery)
                            ) {
                              return item;
                            }
                          }
                        })

                        .map((el, index) => {
                          return (
                            <GridItem
                              key={el.name + index + index}
                              name={el.name}
                              address={el.address}
                              image_url={
                                el &&
                                el.images &&
                                el.images[0] &&
                                el.images[0].url
                              }
                              description={el.description}
                              type={"Event"}
                              id={el.id}
                            />
                          );
                        })}
                    {showTour &&
                      tours

                        .filter((item) => {
                          if (!queries) {
                            return item;
                          } else if (
                            (queries && queries.locationQuery == "all") ||
                            (queries && queries.typeQuery == "all")
                          ) {
                            if (
                              item.name
                                .toLowerCase()
                                .includes(
                                  queries && queries.nameQuery.toLowerCase()
                                )
                            ) {
                              return item;
                            }
                          } else if (
                            (queries && queries.nameQuery) ||
                            (queries && queries.locationQuery) ||
                            (queries && queries.typeQuery)
                          ) {
                            if (
                              item.name
                                .toLowerCase()
                                .includes(
                                  queries && queries.nameQuery.toLowerCase()
                                ) &&
                              item.location
                                .toLowerCase()
                                .includes(queries && queries.locationQuery)
                            ) {
                              return item;
                            }
                          }
                        })

                        .map((el, index) => {
                          return (
                            <GridItem
                              key={el.name + index + index}
                              name={el.name}
                              address={el.address}
                              image_url={
                                el &&
                                el.images &&
                                el.images[0] &&
                                el.images[0].url
                              }
                              description={el.description}
                              type={"Tour"}
                              id={el.id}
                            />
                          );
                        })}
                    {showRental &&
                      rentals
                        .filter((item) => {
                          if (!queries) {
                            return item;
                          } else if (
                            (queries && queries.locationQuery == "all") ||
                            (queries && queries.typeQuery == "all")
                          ) {
                            if (
                              item.name
                                .toLowerCase()
                                .includes(
                                  queries && queries.nameQuery.toLowerCase()
                                )
                            ) {
                              return item;
                            }
                          } else if (
                            (queries && queries.nameQuery) ||
                            (queries && queries.locationQuery) ||
                            (queries && queries.typeQuery)
                          ) {
                            if (
                              item.name
                                .toLowerCase()
                                .includes(
                                  queries && queries.nameQuery.toLowerCase()
                                ) &&
                              item.location
                                .toLowerCase()
                                .includes(queries && queries.locationQuery)
                            ) {
                              return item;
                            }
                          }
                        })

                        .map((el, index) => {
                          return (
                            <GridItem
                              key={el.name + index + index}
                              name={el.name}
                              address={el.address}
                              image_url={
                                el &&
                                el.images &&
                                el.images[0] &&
                                el.images[0].url
                              }
                              description={el.description}
                              type={"Rental"}
                              id={el.id}
                            />
                          );
                        })}
                    {showCar &&
                      cars
                        .filter((item) => {
                          if (!queries) {
                            return item;
                          } else if (
                            (queries && queries.locationQuery == "all") ||
                            (queries && queries.typeQuery == "all")
                          ) {
                            if (
                              item.name
                                .toLowerCase()
                                .includes(
                                  queries && queries.nameQuery.toLowerCase()
                                )
                            ) {
                              return item;
                            }
                          } else if (
                            (queries && queries.nameQuery) ||
                            (queries && queries.locationQuery) ||
                            (queries && queries.typeQuery)
                          ) {
                            if (
                              item.name
                                .toLowerCase()
                                .includes(
                                  queries && queries.nameQuery.toLowerCase()
                                ) &&
                              item.location
                                .toLowerCase()
                                .includes(queries && queries.locationQuery)
                            ) {
                              return item;
                            }
                          }
                        })

                        .map((el, index) => {
                          return (
                            <GridItem
                              key={el.name + index + index}
                              name={el.name}
                              address={el.address}
                              image_url={
                                el &&
                                el.images &&
                                el.images[0] &&
                                el &&
                                el.images &&
                                el.images[0] &&
                                el.images[0].url
                              }
                              description={el.description}
                              type={"Car"}
                              id={el.id}
                            />
                          );
                        })}
                    {showActivity &&
                      activities

                        .filter((item) => {
                          if (!queries) {
                            return item;
                          } else if (
                            (queries && queries.locationQuery == "all") ||
                            (queries && queries.typeQuery == "all")
                          ) {
                            if (
                              item.name
                                .toLowerCase()
                                .includes(
                                  queries && queries.nameQuery.toLowerCase()
                                )
                            ) {
                              return item;
                            }
                          } else if (
                            (queries && queries.nameQuery) ||
                            (queries && queries.locationQuery) ||
                            (queries && queries.typeQuery)
                          ) {
                            if (
                              item.name
                                .toLowerCase()
                                .includes(
                                  queries && queries.nameQuery.toLowerCase()
                                ) &&
                              item.location
                                .toLowerCase()
                                .includes(queries && queries.locationQuery)
                            ) {
                              return item;
                            }
                          }
                        })

                        .map((el, index) => {
                          return (
                            <GridItem
                              key={el.name + index + index}
                              name={el.name}
                              address={el.address}
                              image_url={
                                el &&
                                el.images &&
                                el.images[0] &&
                                el.images[0].url
                              }
                              description={el.description}
                              type={"Activity"}
                              id={el.id}
                            />
                          );
                        })}
                  </div>
                  {/* <!-- /row --> */}

                  {/* <p class="text-center">
                    <a href="#0" class="btn_1 rounded add_top_30">
                      Load more
                    </a>
                  </p> */}
                </div>
                {/* <!-- /col --> */}
              </div>
            </div>
            {/* <!-- /container --> */}
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

const mapStateToProps = (state) => {
  return {
    order: state.order,
  };
};

const GridListingsFiltersCol_ = withRouter(GridListingsFiltersCol);
export default connect(mapStateToProps)(GridListingsFiltersCol_);
