import Head from "next/head";
import React, { Component } from "react";
import Header from "../components/header";
import HotelItem from "../components/hotelItem";
import TourItem from "../components/tourItem";
import EventItem from "../components/eventItem";
import TourGroup from "../components/toursGroup";
import SignInModal from "../components/signInModal";
import Footer from "../components/footer";
import { API_URL } from "../components/config.js";
import axios from "axios";
import Cookies from "js-cookie";
var moment = require("moment");
import Link from "next/link";
import easy_background from "../components/easy_background";
import { connect } from "react-redux";
import { setSearchData } from "../store/actions/order";
import states from "../components/states.json";
import { withRouter } from "next/router";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      hotels: [],
      events: [],
      tours: [],
      nameQuery: "",
      locationQuery: "all",
      typeQuery: "all",
      pageLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ pageLoading: true });
    var myIndex = 0;
    function carousel() {
      var i;
      var x = document.getElementsByClassName("mySlides");
      console.log(x);
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      myIndex++;
      if (myIndex > x.length) {
        myIndex = 1;
      }
      if (x[myIndex - 1] && x[myIndex - 1]) {
        x[myIndex - 1].style.display = "block";
      }
      setTimeout(carousel, 2000);
    }
    // easy_background(".hero_single",

    //   {
    //     slide: ["/images/forIndex/image1.jpg", "/images/forIndex/image2.jpg", "/images/forIndex/image3.webp", "/images/forIndex/image4.jpg"],

    //     delay: [5000, 5000, 5000, 5000,]
    //   }

    // );
    carousel();
    this.getHotels();
  }

  searchListing = async (e) => {
    e.preventDefault();

    this.props.setSearchData({
      nameQuery: this.state.nameQuery,
      locationQuery: this.state.locationQuery,
      typeQuery: this.state.typeQuery,
    });

    this.props.router.push("/listing");
  };
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
        this.setState({ hotels: response.data.rows, pageLoading: false });
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
        this.setState({ events: response.data.rows });
        // for (let i = 0; i < len; i++) {
        //   let row = response.data.rows[i];
        //   this.setState((prevState) => ({
        //     events: [...prevState.events, row],
        //   }));
        // }
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
        this.setState({ tours: response.data.rows });
        // for (let i = 0; i < len; i++) {
        //   let row = response.data.rows[i];
        //   this.setState((prevState) => ({
        //     tours: [...prevState.tours, row],
        //   }));
        // }
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

  render() {
    const { typeQuery, locationQuery, nameQuery } = this.state;
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
          <Header />

          <main className="pattern">
            <section className="hero_single version_2">
              <img
                className="mySlides w3-animate-right"
                src="/images/forIndex/image1.jpg"
              />
              <img
                className="mySlides w3-animate-right"
                src="/images/forIndex/cruise1.jpg"
              />
              <img
                className="mySlides w3-animate-right"
                src="/images/forIndex/car2.jpg"
              />
              <img
                className="mySlides w3-animate-right"
                src="/images/forIndex/tour2.jpg"
              />
              <img
                className="mySlides w3-animate-right"
                src="/images/forIndex/flight1.jpg"
              />
              <img
                className="mySlides w3-animate-right"
                src="/images/forIndex/events.png"
              />

              <div className="wrapper">
                <div className="container" style={{ zIndex: 2 }}>
                  <h1 style={{ color: "white" }}>
                    Find your next amazing experience!
                  </h1>
                  <p style={{ fontSize: "16px" }}>
                    Discover top rated hotels, popular events, flights, tours
                    and things to do in Nigeria
                  </p>
                  <form
                    onSubmit={(e) => {
                      this.searchListing(e);
                    }}
                  >
                    <div className="row no-gutters custom-search-input-2">
                      <div className="col-lg-4">
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="What are you looking for..."
                            value={nameQuery}
                            onChange={(e) =>
                              this.setState({ nameQuery: e.target.value })
                            }
                          />
                          <i className="icon_search"></i>
                        </div>
                      </div>
                      <div className="col-lg-3 mobile_margin_bottom">
                        <select
                          className="nice-select wide"
                          tabindex="0"
                          value={locationQuery}
                          onChange={(e) =>
                            this.setState({ locationQuery: e.target.value })
                          }
                        >
                          <option value="all">All Locations</option>

                          {states.map((element) => (
                            <option
                              value={element.toLowerCase()}
                              className="option"
                            >
                              {element}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-lg-3">
                        <select
                          className="nice-select wide"
                          tabindex="0"
                          value={typeQuery}
                          onChange={(e) =>
                            this.setState({ typeQuery: e.target.value })
                          }
                        >
                          <option value="all">All Categories</option>

                          <option className="option" value="hotel">
                            Hotels
                          </option>

                          <option className="option" value="event">
                            Events
                          </option>
                          <option className="option" value="flight">
                            Flight
                          </option>
                          <option className="option" value="tour">
                            Tours
                          </option>
                          <option className="option" value="rental">
                            Rentals
                          </option>
                          <option className="option" value="cruise">
                            Cruise
                          </option>
                          <option className="option" value="activity">
                            Activities
                          </option>
                        </select>
                        {/* <span className="current">All Categories</span><ul className="list">
                        <li data-value="All Categories" className="option selected">All Categories</li>
                        <li data-value="Hotels" className="option">Hotels</li><li data-value="Events" className="option">Events</li><li data-value="Flight" className="option">Flight</li><li data-value="Tour" className="option">Tour</li><li data-value="Rentals" className="option">Rentals</li><li data-value="Car" className="option">Car</li><li data-value="Activity" className="option">Activity</li></ul> */}
                        {/* </div> */}
                      </div>
                      <div className="col-lg-2">
                        <input type="submit" value="Search" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
            <div className="main_categories">
              <div className="container">
                <ul
                  className="clearfix"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignContent: "center",
                    flexDirection: "row",
                  }}
                >
                  {/* <li>
						<a >
							<i className="icon-shop"></i>
							<h3>Shops</h3>
						</a>
					</li> */}
                  <li>
                    <Link
                      href={{
                        pathname: "/hotel-list",
                        //   // query: { type: "hotel" },
                      }}
                    >
                      <a>
                        <i className="icon-lodging"></i>
                        <h3>Hotels</h3>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: "/event-list",
                        // // query: { type: "event" },
                      }}
                    >
                      <a>
                        <i>
                          <ion-icon name="calendar"></ion-icon>
                        </i>
                        <h3>Events</h3>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: "/flight-list",
                        //     // query: { type: "flight" },
                      }}
                    >
                      <a>
                        <i>
                          <ion-icon name="airplane"></ion-icon>
                        </i>

                        {/* <i className="icon-airplane-outline"></i> */}
                        <h3>Flight</h3>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: "/tour-list",
                        //   // query: { type: "tour" },
                      }}
                    >
                      <a>
                        <i>
                          <ion-icon name="earth"></ion-icon>
                        </i>

                        {/* <i className="icon-airplane-outline"></i> */}
                        <h3>Tour</h3>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: "/rental-list",
                        //   // query: { type: "rental" },
                      }}
                    >
                      <a>
                        <i>
                          <ion-icon name="home"></ion-icon>
                        </i>

                        <h3>Rentals</h3>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: "/car-list",
                        //    // query: { type: "car" },
                      }}
                    >
                      <a>
                        <i>
                          <ion-icon name="car"></ion-icon>
                        </i>

                        <h3>Cars</h3>
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={{
                        pathname: "/activity-list",
                        //  // query: { type: "activity" },
                      }}
                    >
                      <a>
                        <i>
                          <ion-icon name="restaurant"></ion-icon>
                        </i>
                        <h3>Activities</h3>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="container margin_60_35"
              style={{
                paddingTop: "60px",
              }}
            >
              <div className="main_title_3">
                <span></span>
                <h2>Popular Hotels</h2>
                <p>A compiled list of top Hotels in Nigeria</p>
                <Link
                  href={{
                    pathname: "/hotel-list",
                    // query: { type: "hotel" },
                  }}
                >
                  <a>See all</a>
                </Link>
              </div>
              <div className="row add_bottom_30">
                {this.state.hotels.map((el, index) => {
                  if (index < 4) {
                    let currentPrice =
                      el &&
                      el.rooms &&
                      el.rooms.sort((prev, curr) => {
                        return (
                          parseInt(prev.discount_rate) -
                          parseInt(curr.discount_rate)
                        );
                      });

                    return (
                      <HotelItem
                        isLoading={this.state.pageLoading}
                        discount={parseInt(
                          currentPrice &&
                            currentPrice[currentPrice.length - 1] &&
                            currentPrice[currentPrice.length - 1].discount_rate
                        )}
                        name={el.name}
                        address={
                          el.location.charAt(0).toUpperCase() +
                          el.location.slice(1) +
                          " " +
                          "Nigeria"
                        }
                        image_url={el.images[0].url}
                        link={"hotel"}
                        id={el.id}
                        subItems={el.rooms}
                        isFeatured={el.featured}
                      />
                    );
                  }
                })}
              </div>
              <div className="main_title_3">
                <span></span>
                <h2>Hot Events</h2>
                <p>Buy Tickets to top events around you</p>
                <Link
                  href={{
                    pathname: "/event-list",
                    // query: { type: "event" },
                  }}
                >
                  <a>See all</a>
                </Link>
              </div>
              {/* <br /> */}
              <div className="row vc_row wpb_row vc_inner add_bottom_30">
                {this.state.events.map((el, index) => {
                  if (index < 4) {
                    return (
                      <EventItem
                        key={index + el.name + el.id}
                        discount={parseInt(el.discount_rate)}
                        image_url={el.images[0].url}
                        name={el.name}
                        id={el.id}
                        isFeatured={el.featured}
                        address={
                          el.location.charAt(0).toUpperCase() +
                          el.location.slice(1) +
                          " " +
                          "Nigeria"
                        }
                      />
                    );
                  }
                })}
              </div>
              <div className="main_title_3">
                <span></span>
                <h2>Tour</h2>

                <p>Explore Nigeria, book a tour today!</p>
                <Link
                  href={{
                    pathname: "/tour-list",
                    // query: { type: "tour" },
                  }}
                >
                  <a>See all</a>
                </Link>
              </div>
              <div className="row vc_row wpb_row vc_inner add_bottom_30">
                {this.state.tours.map((el, index) => {
                  if (index < 4) {
                    return (
                      <TourItem
                        key={index + el.name + el.id}
                        discount={parseInt(el.discount_rate)}
                        name={el.name}
                        address={
                          el.location.charAt(0).toUpperCase() +
                          el.location.slice(1) +
                          " " +
                          "Nigeria"
                        }
                        image_url={el.images[0].url}
                        link={"tour"}
                        id={el.id}
                        isFeatured={el.featured}
                      />
                    );
                  }
                })}
              </div>
              <br />
              <div className="bg_color_1">
                <div className="container margin_80_55">
                  <div className="main_title_2">
                    <span>
                      <em></em>
                    </span>
                    <h2>Popular Cities</h2>
                    <p>Browse Popular Cities/Destinations</p>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-sm-6 city_box">
                      <a href="/listing" className="grid_item">
                        <figure>
                          <img src="/images/lagos.jpg" alt="" />
                          <div className="info">
                            <small> Hotels</small>
                            <small> Events</small>
                            <small> Tours</small>
                            <small> Rentals</small>
                            <small> Cars</small>
                            <small> Activity</small>
                            <h3>Lagos</h3>
                          </div>
                        </figure>
                      </a>
                    </div>
                    <div className="col-lg-4 col-sm-6 city_box">
                      <a href="/listing" className="grid_item">
                        <figure>
                          <img src="/images/abuja.jpg" alt="" />
                          <div className="info">
                            <small> Hotels</small>
                            <small> Events</small>
                            <small> Tours</small>
                            <small> Rentals</small>
                            <small> Cars</small>
                            <small> Activity</small>
                            <h3>Abuja</h3>
                          </div>
                        </figure>
                      </a>
                    </div>
                    <div className="col-lg-4 col-sm-6 city_box">
                      <a href="/listing" className="grid_item">
                        <figure>
                          <img src="/images/port.jpg" alt="" />
                          <div className="info">
                            <small> Hotels</small>
                            <small> Events</small>
                            <small> Tours</small>
                            <small> Rentals</small>
                            <small> Cars</small>
                            <small> Activity</small>
                            <h3>Port Harcourt</h3>
                          </div>
                        </figure>
                      </a>
                    </div>
                    <div className="col-lg-4 col-sm-6 city_box">
                      <a href="/listing" className="grid_item">
                        <figure>
                          <img src="/images/asaba.jpg" alt="" />
                          <div className="info">
                            <small> Hotels</small>
                            <small> Events</small>
                            <small> Tours</small>
                            <small> Rentals</small>
                            <small> Cars</small>
                            <small> Activity</small>
                            <h3>Asaba</h3>
                          </div>
                        </figure>
                      </a>
                    </div>
                    <div className="col-lg-4 col-sm-6 city_box">
                      <a href="/listing" className="grid_item ">
                        <figure>
                          <img src="/images/owerri.jpg" alt="" />
                          <div className="info">
                            <small> Hotels</small>
                            <small> Events</small>
                            <small> Tours</small>
                            <small> Rentals</small>
                            <small> Cars</small>
                            <small> Activity</small>
                            <h3>Owerri</h3>
                          </div>
                        </figure>
                      </a>
                    </div>
                    <div className="col-lg-4 col-sm-6 city_box">
                      <a href="/listing" className="grid_item">
                        <figure>
                          <img src="/images/ibadan.jpeg" alt="" />
                          <div className="info">
                            <small> Hotels</small>
                            <small> Events</small>
                            <small> Tours</small>
                            <small> Rentals</small>
                            <small> Cars</small>
                            <small> Activity</small>
                            <h3>Ibadan</h3>
                          </div>
                        </figure>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="call_section">
              <div className="wrapper">
                <div className="container margin_80_55">
                  <div className="main_title_2">
                    <span>
                      <em></em>
                    </span>
                    <h2>How it Works</h2>
                    <p>The 3 basic steps</p>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="box_how">
                        <i className="pe-7s-search"></i>
                        <h3>Search</h3>
                        <p>
                          Search for hotels, events,flight, tours, rentals, cars
                          or activities around you
                        </p>
                        <span></span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="box_how">
                        <i className="pe-7s-info"></i>
                        <h3>View Info</h3>
                        <p>
                          Read through the info of the selected hotel, event,
                          flight, tour, rental, etc. Info includes reviews,
                          images and many more to aid your search
                        </p>
                        <span></span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="box_how">
                        <i className="pe-7s-like2"></i>
                        <h3>Book, Reach or Call</h3>
                        <p>
                          Book the hotel of your choice, buy the ticket to the
                          event of your choice, book the tour of your choice and
                          many more
                        </p>
                      </div>
                    </div>
                  </div>
                  <p
                    className="text-center add_top_30 wow bounceIn"
                    data-wow-delay="0.5s"
                  >
                    <a href="/register" className="btn_1 rounded">
                      Register Now
                    </a>
                  </p>
                </div>
                <canvas id="hero-canvas" width="1920" height="1080"></canvas>
              </div>
            </div>
            <div className="container margin_80_55">
              <div className="main_title_2">
                <span>
                  <em></em>
                </span>
                <h2>Book24 App Available</h2>
                <p>Download our apps from the stores today</p>
              </div>
              <div className="row justify-content-center text-center">
                <div className="col-md-6">
                  <images
                    src="/images/mobile.svg"
                    alt=""
                    className="images-fluid add_bottom_45"
                  />
                  <div className="app_icons">
                    <a href="/#0" className="pr-lg-2">
                      <img src="/images/app_android.svg" alt="" />
                    </a>
                    <a href="/#0" className="pl-lg-2">
                      <img src="/images/app_apple.svg" alt="" />
                    </a>
                  </div>
                  <div className="add_bottom_15">
                    <small>*Booking made easy</small>
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
        {/* <script src="js/animated_canvas_min.js"></script> */}
        {/* <style global jsx>{`
          body {
            background: #fff;
          }
        `}</style> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  order: state.order,
});

const mapDispatchToProps = {
  setSearchData,
};

const Home_ = withRouter(Home);
export default connect(mapStateToProps, mapDispatchToProps)(Home_);
