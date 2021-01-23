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

class ListingMap extends Component {
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
    };
  }

  static getInitialProps({ query }) {
    return { query };
  }

  async componentDidMount() {
    console.log("\n");
    console.log("\n");
    console.log(this.props.router.query);
    console.log("\n");
    console.log("\n");

    if (this.props.router.query.type == "hotel") {
      this.setState({
        showHotel: true,
        showActivity: false,
        showCar: false,
        showRental: false,
        showEvent: false,
        showTour: false,
      });
    }
    if (this.props.router.query.type == "event") {
      this.setState({
        showEvent: true,

        showActivity: false,
        showCar: false,
        showRental: false,
        showHotel: false,
        showTour: false,
      });
    }
    if (this.props.router.query.type == "tour") {
      this.setState({
        showTour: true,
        showActivity: false,
        showCar: false,
        showRental: false,
        showEvent: false,
        showHotel: false,
      });
    }
    if (this.props.router.query.type == "activity") {
      this.setState({
        showActivity: true,
        showHotel: false,
        showCar: false,
        showRental: false,
        showEvent: false,
        showTour: false,
      });
    }
    if (this.props.router.query.type == "rental") {
      this.setState({
        showRental: true,
        showActivity: false,
        showCar: false,
        showHotel: false,
        showEvent: false,
        showTour: false,
      });
    }
    if (this.props.router.query.type == "car") {
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
        this.setState({ hotels: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            hotels: [...prevState.hotels, row],
          }));
        }
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
        <div className="container-fluid full-height">
          <div className="row row-height">
            <div className="col-lg-5 content-left order-md-last order-sm-last order-last">
              <div id="results_map_view">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-10">
                      <h4><strong>145</strong> result for All listing</h4>
                    </div>
                    <div className="col-2">
                      <a href="#0" className="search_mob btn_search_mobile map_view" /> {/* /open search panel */}
                    </div>
                  </div>
                  {/* /row */}
                  <div className="search_mob_wp">
                    <div className="custom-search-input-2 map_view">
                      <div className="form-group">
                        <input className="form-control" type="text" placeholder="What are you looking for..." />
                        <i className="icon_search" />
                      </div>
                      <div className="form-group">
                        <input className="form-control" type="text" placeholder="Where" />
                        <i className="icon_pin_alt" />
                      </div>
                      <select className="wide">
                        <option>All Categories</option>	
                        <option>Shops</option>
                        <option>Hotels</option>
                        <option>Restaurants</option>
                        <option>Bars</option>
                        <option>Events</option>
                        <option>Fitness</option>
                      </select>
                      <input type="submit" defaultValue="Search" />
                    </div>
                  </div>
                  {/* /search_mobile */}
                </div>
                {/* /container */}
              </div>
              {/* /results */}
              <div className="filters_listing version_3">
                <div className="container-fluid">
                  <ul className="clearfix">
                    <li>
                      <div className="switch-field">
                        <input type="radio" id="all" name="listing_filter" defaultValue="all" defaultChecked />
                        <label htmlFor="all">All</label>
                        <input type="radio" id="popular" name="listing_filter" defaultValue="popular" />
                        <label htmlFor="popular">Popular</label>
                        <input type="radio" id="latest" name="listing_filter" defaultValue="latest" />
                        <label htmlFor="latest">Latest</label>
                      </div>
                    </li>
                    <li><a className="btn_filt_map" data-toggle="collapse" href="#filters" aria-expanded="false" aria-controls="filters" data-text-swap="Less filters" data-text-original="More filters">More filters</a></li>
                  </ul>
                </div>
                {/* /container */}
              </div>
              {/* /filters */}
              <div className="collapse map_view" id="filters">
                <div className="container-fluid margin_30_5">
                  <h6>Rating</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <ul>
                        <li>
                          <label className="container_check">Superb 9+ <small>245</small>
                            <input type="checkbox" />
                            <span className="checkmark" />
                          </label>
                        </li>
                        <li>
                          <label className="container_check">Very Good 8+ <small>123</small>
                            <input type="checkbox" />
                            <span className="checkmark" />
                          </label>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul>
                        <li>
                          <label className="container_check">Good 7+ <small>32</small>
                            <input type="checkbox" />
                            <span className="checkmark" />
                          </label>
                        </li>
                        <li>
                          <label className="container_check">Pleasant 6+ <small>12</small>
                            <input type="checkbox" />
                            <span className="checkmark" />
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <h6>Tags</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <ul>
                        <li>
                          <label className="container_check">Wireless Internet
                            <input type="checkbox" />
                            <span className="checkmark" />
                          </label>
                        </li>
                        <li>
                          <label className="container_check">Smoking Allowed
                            <input type="checkbox" />
                            <span className="checkmark" />
                          </label>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul>
                        <li>
                          <label className="container_check">Wheelchair Accesible
                            <input type="checkbox" />
                            <span className="checkmark" />
                          </label>
                        </li>
                        <li>
                          <label className="container_check">Parking
                            <input type="checkbox" />
                            <span className="checkmark" />
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /row */}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="add_bottom_30">
                        <h6>Distance</h6>
                        <div className="distance"> Radius around selected destination <span /> km</div>
                        <input type="range" min={10} max={100} step={10} defaultValue={30} data-orientation="horizontal" />
                      </div>
                    </div>
                  </div>
                  {/* /row */}
                </div>
              </div>
              {/* /Filters */}
              <div className="strip map_view add_top_20">
                <div className="row no-gutters">
                  <div className="col-4">
                    <figure>
                      <a href="detail-restaurant.html"><img src="img/location_1.jpg" className="img-fluid" alt="" /></a>
                      <small>Bar</small>
                    </figure>
                  </div>
                  <div className="col-8">
                    <div className="wrapper">
                      <a href="#0" className="wish_bt" />
                      <h3><a href="detail-restaurant.html">Da Alfredo</a></h3>
                      <small>27 Old Gloucester St</small>
                      <p><a href="#0" onclick="onHtmlClick('Marker',1)" className="address">View on Map</a></p>
                    </div>
                    <ul>
                      <li><span className="loc_open">Now Open</span></li>
                      <li><div className="score"><span>Superb<em>350 Reviews</em></span><strong>8.9</strong></div></li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* /strip map_view */}
              <div className="strip map_view">
                <div className="row no-gutters">
                  <div className="col-4">
                    <figure>
                      <a href="detail-restaurant.html"><img src="img/location_2.jpg" className="img-fluid" alt="" /></a>
                      <small>Bar</small>
                    </figure>
                  </div>
                  <div className="col-8">
                    <div className="wrapper">
                      <a href="#0" className="wish_bt" />
                      <h3><a href="detail-restaurant.html">Limon Bar</a></h3>
                      <small>438 Rush Green Road, Romford</small>
                      <p><a href="#0" onclick="onHtmlClick('Marker',2)" className="address">View on Map</a></p>
                    </div>
                    <ul>
                      <li><span className="loc_open">Now Open</span></li>
                      <li><div className="score"><span>Good<em>350 Reviews</em></span><strong>7.0</strong></div></li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* /strip list_view */}
              <div className="strip map_view">
                <div className="row no-gutters">
                  <div className="col-4">
                    <figure>
                      <a href="detail-shop.html"><img src="img/location_3.jpg" className="img-fluid" alt="" /></a>
                      <small>Shop</small>
                    </figure>
                  </div>
                  <div className="col-8">
                    <div className="wrapper">
                      <a href="detail-shop.html" className="wish_bt" />
                      <h3><a href="detail.html">Mary Boutique</a></h3>
                      <small>43 Stephen Road, Bexleyheath</small>
                      <p><a href="#0" onclick="onHtmlClick('Marker',3)" className="address">View on Map</a></p>
                    </div>
                    <ul>
                      <li><span className="loc_closed">Now Closed</span></li>
                      <li><div className="score"><span>Good<em>350 Reviews</em></span><strong>7.0</strong></div></li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* /strip list_view */}
              <div className="strip map_view">
                <div className="row no-gutters">
                  <div className="col-4">
                    <figure>
                      <a href="detail.html"><img src="img/location_4.jpg" className="img-fluid" alt="" /></a>
                      <small>Bar</small>
                    </figure>
                  </div>
                  <div className="col-8">
                    <div className="wrapper">
                      <a href="detail-restaurant.html" className="wish_bt" />
                      <h3><a href="detail.html">Garden Bar</a></h3>
                      <small>40 Beechwood Road, Sanderstead</small>
                      <p><a href="detail-restaurant.html" onclick="onHtmlClick('Marker',4)" className="address">View on Map</a></p>
                    </div>
                    <ul>
                      <li><span className="loc_closed">Now Closed</span></li>
                      <li><div className="score"><span>Superb<em>350 Reviews</em></span><strong>9.0</strong></div></li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* /strip list_view */}
              <div className="strip map_view">
                <div className="row no-gutters">
                  <div className="col-4">
                    <figure>
                      <a href="detail-hotel.html"><img src="img/location_5.jpg" className="img-fluid" alt="" /></a>
                      <small>Hotel</small>
                    </figure>
                  </div>
                  <div className="col-8">
                    <div className="wrapper">
                      <a href="detail-hotel.html" className="wish_bt" />
                      <h3><a href="detail.html">Mariott Hotel</a></h3>
                      <small>213 Malden Road, New Malden</small>
                      <p><a href="#0" onclick="onHtmlClick('Marker',5)" className="address">View on Map</a></p>
                    </div>
                    <ul>
                      <li><span className="loc_open">Now Open</span></li>
                      <li><div className="score"><span>Good<em>350 Reviews</em></span><strong>7.5</strong></div></li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* /strip list_view */}
              <p className="text-center add_top_30"><a href="#0" className="btn_1 rounded"><strong>Load more</strong></a></p>
            </div>
            {/* /content-left*/}
            <div className="col-lg-7 map-right">
              <div id="map_right_listing" />
              {/* map*/}
            </div>
            {/* /map-right*/}
          </div>
          {/* /row*/}
        </div>
        {/* /container-fluid */}
      </main> <Footer />
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
        <style global jsx>{`
        html,
        body {
            height: 100%;
        }
        `}</style>
      </div>
    );
  }
}
export default withRouter(ListingMap);
