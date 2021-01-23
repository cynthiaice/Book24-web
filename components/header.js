import React, { useState, useEffect, Component } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
    };
  }

  async componentDidMount() {
    let token = await Cookies.get("token");
    if (token == null || token == "") {
      console.log("false tojken");
      this.setState({ auth: false });
    } else {
      console.log(token);
      this.setState({ auth: true });
    }
  }

  authMenu = () => {
    return (
      <nav id="menu" className="main-menu">
        <ul>
          <Link
            href={{
              pathname: "/",
              query: { type: "hotel" },
            }}
          >
            <li>
              <span>
                <a href="/">Home</a>
              </span>
              <ul></ul>
            </li>
          </Link>
          <Link
            href={{
              pathname: "/bookings",
              //      query: { type: "hotel" },
            }}
          >
            <li>
              <span>
                <a href="/bookings">Bookings</a>
              </span>
              <ul></ul>
            </li>
          </Link>
          <Link
            href={{
              pathname: "/hotel-list",
              query: { type: "hotel" },
            }}
          >
            <li>
              <span>
                <a>Hotels</a>
              </span>
              <ul>
                <li />
              </ul>
            </li>
          </Link>
          <Link
            href={{
              pathname: "/event-list",
            }}
          >
            <li>
              <span>
                <a href="/hotels">Events</a>
              </span>
              <ul></ul>
            </li>
          </Link>
          <Link
            href={{
              pathname: "/cruises-list",
              //   query: { type: "cruise" },
            }}
          >
            <li>
              <span>
                <a href="/cruises-list">Cruise</a>
              </span>
              <ul></ul>
            </li>
          </Link>
          <Link
            href={{
              pathname: "/tour-list",
              query: { type: "tour" },
            }}
          >
            <li>
              <span>
                <a href="/flight">Flight</a>
              </span>
              <ul></ul>
            </li>
          </Link>
          <Link
            href={{
              pathname: "/tour-list",
            }}
          >
            <li>
              <span>
                <a>Tour</a>
              </span>
              <ul></ul>
            </li>
          </Link>
          <Link
            href={{
              pathname: "/rental-list",
            }}
          >
            <li>
              <span>
                <a>Rentals</a>
              </span>
              <ul></ul>
            </li>
          </Link>
          <Link
            href={{
              pathname: "/activity-list",
            }}
          >
            <li>
              <span>
                <a href="/activity">Activity</a>
              </span>
              <ul>
                <li>
                  <a href="/restaurants">Restaurants</a>
                </li>
                <li>
                  <a href="/beaches">Beaches</a>
                </li>
                <li>
                  <a href="/malls">Malls</a>
                </li>
                <li>
                  <a href="/bars">Bars</a>
                </li>
                <li>
                  <a href="/resorts">Resorts</a>
                </li>
              </ul>
            </li>
          </Link>
          <li>
            <span>
              <a href="/car-list">Car</a>
            </span>
          </li>
        </ul>
      </nav>
    );
  };

  noAuthMenu = (
    <nav id="menu" className="main-menu">
      <ul>
        <Link
          href={{
            pathname: "/",
          }}
        >
          <li>
            <span>
              <a href="/">Home</a>
            </span>
            <ul></ul>
          </li>
        </Link>
        <Link
          href={{
            pathname: "/hotel-list",
            //	  query: { type: "hotel" },
          }}
        >
          <li>
            <span>
              <a>Hotels</a>
            </span>
            <ul>
              <li />
            </ul>
          </li>
        </Link>
        <Link
          href={{
            pathname: "/event-list",
            // query: { type: "event" },
          }}
        >
          <li>
            <span>
              <a>Events</a>
            </span>
            <ul></ul>
          </li>
        </Link>
        <Link
          href={{
            pathname: "/tour-list",
            //	  query: { type: "tour" },
          }}
        >
          <li>
            <span>
              <a>Flight</a>
            </span>
            <ul></ul>
          </li>
        </Link>
        <Link
          href={{
            pathname: "/cruises-list",
            //   query: { type: "cruise" },
          }}
        >
          <li>
            <span>
              <a href="/cruises-list">Cruise</a>
            </span>
            <ul></ul>
          </li>
        </Link>
        <Link
          href={{
            pathname: "/tour-list",
          }}
        >
          <li>
            <span>
              <a>Tour</a>
            </span>
            <ul></ul>
          </li>
        </Link>
        <Link
          href={{
            pathname: "/rental-list",
          }}
        >
          <li>
            <span>
              <a>Rentals</a>
            </span>
            <ul></ul>
          </li>
        </Link>
        <Link
          href={{
            pathname: "/activity-list",
          }}
        >
          <li>
            <span>
              <a href="/activity">Activity</a>
            </span>
            <ul>
              <li>
                <a href="/restaurants">Restaurants</a>
              </li>
              <li>
                <a href="/beaches">Beaches</a>
              </li>
              <li>
                <a href="/malls">Malls</a>
              </li>
              <li>
                <a href="/bars">Bars</a>
              </li>
              <li>
                <a href="/resorts">Resorts</a>
              </li>
            </ul>
          </li>
        </Link>
        <Link
          href={{
            pathname: "/car-list",
          }}
        >
          <li>
            <span>
              <a>Car</a>
            </span>
          </li>
        </Link>
        <li>
          <a href="/login" className="btn_add">
            <p style={{ fontSize: "14px" }}>LOGIN</p>
          </a>
        </li>
      </ul>
    </nav>
  );

  render() {
    const { auth } = this.state;
    const { makeBlue } = this.props;
    return (
      <div>
        <header
          className={
            makeBlue ? "header menu_fixed blue_back" : "header menu_fixed"
          }
        >
          <div id="logo" style={{ paddingLeft: "30px" }} className="row">
            <a href="/" title="Book24">
              <div className="row" style={{ alignItems: "center" }}>
                <img
                  src="/images/logobook24.png"
                  width="150"
                  // height="60"
                  alt=""
                  className="logo_normal"
                />
                {/* <p
                  className="hellix-medium-white-18"
                  style={{ marginLeft: "10px" }}
                >
                  Book24
                </p> */}
              </div>
              <div className="row logo_sticky" style={{ alignItems: "center" }}>
                <img
                  src="/images/logobook24.png"
                  width="150"
                  // height="60"
                  alt=""
                  className="logo_sticky"
                />
                {/* <p
                  className="hellix-medium-blue-18"
                  style={{ marginLeft: "10px" }}
                >
                  Book24
                </p> */}
              </div>
            </a>
          </div>
          {auth != null && auth && (
            <ul id="top_menu">
              <li>
                <a
                  href={
                    (Cookies.get("token") &&
                      Cookies.get("role") == "super-admin" &&
                      "/sade") ||
                    (Cookies.get("token") &&
                      Cookies.get("role") == "guest" &&
                      "/user-dashboard") ||
                    "/login"
                  }
                  class="btn_add"
                >
                  {(Cookies.get("token") && Cookies.get("name")) || "Login"}
                </a>
              </li>
              {/* <li><a href="#sign-in-dialog" id="sign-in" class="login" title="Sign In">Sign In</a></li> */}
              <li>
                <a
                  href="/wishlist"
                  class="wishlist_bt_top"
                  title="Your wishlist"
                >
                  Your wishlist
                </a>
              </li>
            </ul>
          )}
          {auth != null && !auth && this.noAuthMenu}
          {auth != null && auth && this.authMenu()}
          <a href="/#menu" className="btn_mobile">
            <div className="hamburger hamburger--spin" id="hamburger">
              <div className="hamburger-box">
                <div className="hamburger-inner"></div>
              </div>
            </div>
          </a>
        </header>
      </div>
    );
  }
}
export default Header;
