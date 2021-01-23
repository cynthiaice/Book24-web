import Head from "next/head";
import React, { Component } from "react";
import Header from "../components/header";
import SignInModal from "../components/signInModal";
import Footer from "../components/footer";
import BookedItem from "../components/bookedItem";
import { API_URL } from "../components/config.js";
import axios from "axios";
import Cookies from "js-cookie";
import BlueLoader from "../components/blueLoader";
import { withRouter } from "next/router";

class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      bookings: [],
      token: "",
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
      .get(API_URL + "hotelBookings", config)
      .then((response) => {
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
          }));
        }
        this.getEventTickets();
      })
      .catch((error) => {
        this.setState({ loader: false });

        //   router.push("/");
        console.log(error);
      });
  };

  getEventTickets = () => {
    var config = {
      headers: { Authorization: "Bearer " + this.state.token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "eventTickets", config)
      .then((response) => {
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
          }));
        }
        this.getTourBookings();
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
      .get(API_URL + "tourBookings", config)
      .then((response) => {
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

  render() {
    const { loader } = this.state;
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
          <Header />
          <div className="sub_header_in sticky_header">
            <div className="container">
              <h1>Bookings</h1>
            </div>
          </div>
          <main>
            <div className="container margin_60_35">
              {this.state.bookings.length > 0 && (
                <div className="box_booking">
                  {this.state.bookings.map((item, index) => {
                    return <BookedItem item={item} />;
                  })}
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {loader && <BlueLoader />}
              </div>

              {/* <p className="text-right"><a href="checkout.html" className="btn_1">Checkout</a></p> */}
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
export default withRouter(Bookings);
