import React, { Component } from "react";
import { IconContext } from "react-icons";
import { MdViewQuilt } from "react-icons/md";
import {
  FaUsersCog,
  FaListAlt,
  FaUsers,
  FaMapMarkerAlt,
  FaAddressBook,
  FaCar,
  FaWarehouse,
} from "react-icons/fa";
import { IoIosPricetags, IoIosBonfire, IoMdBonfire } from "react-icons/io";
import { withRouter } from "next/router";
import Head from 'next/head';
import Cookies from "js-cookie";
// import { Link, withRouter } from 'react-router-dom';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  async componentDidMount() {
    let token = await Cookies.get("token");
        if (token == null || token == "") {
        this.props.router.push("/sade");
    
        }
   }

  // callAPI() {
  //     fetch("http://localhost:9000/testAPI")
  //         .then(res => res.text())
  //         .then(res => this.setState({ apiResponse: res }))
  //         .catch(err => err);
  // }

  // componentDidMount() {
  //     this.callAPI();
  // }

  press(value) {
    const { pathname } = this.props.router;
    if (value != pathname) {
      this.props.router.push(value);
    }
  }

  render() {
    const { pathname } = this.props.router;
    console.log(pathname + "   k");
    return (
      <div>
      <div className="main-box-sidebar">
            <Head>
            <link href="/css/hotels.css" rel="stylesheet"/>
    <link href="/css/sidebar.css" rel="stylesheet"/>
    <link href="/css/adminIndex.css" rel="stylesheet"/></Head>
        {/* <img src={require("../../images/logo.png")} className="logo-image" /> */}
        <p className="hellix-medium-white-18" style={{ color: "black", fontSize:"36px" }}>
          Book24
        </p>

        <div className="line-div" />
        <button
          onClick={this.press.bind(this, "/admin/")}
          //  to="/"
          className={
            pathname === "/admin/"
              ? "route active-route"
              : "route inactive-route"
          }
        >
          {/* <button className={pathname === '/admin/' ? "route active-route" : "route inactive-route"}> */}
          {pathname === "/admin/" ? (
            <IconContext.Provider value={{ color: "#1281dd", size: 22 }}>
              <MdViewQuilt />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: "#757575", size: 22 }}>
              <MdViewQuilt />
            </IconContext.Provider>
          )}

          <p
            className={pathname === "/admin/" ? "active-text" : "inactive-text"}
          >
            Dashboard
          </p>
          {/* </button> */}
        </button>
        <button
          onClick={this.press.bind(this, "/admin/hotels")}
          //to="/hotels"
          className={
            pathname === "/admin/hotels"
              ? "route active-route"
              : "route inactive-route"
          }
        >
          {pathname === "/admin/hotels" ? (
            <IconContext.Provider value={{ color: "#1281dd", size: 22 }}>
              <FaUsersCog />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: "#757575", size: 22 }}>
              <FaUsersCog />
            </IconContext.Provider>
          )}
          <p
            className={
              pathname === "/admin/hotels" ? "active-text" : "inactive-text"
            }
          >
            Hotels
          </p>
        </button>
        <button
          onClick={this.press.bind(this, "/admin/events")}
          //to="/hotels"
          className={
            pathname === "/admin/events"
              ? "route active-route"
              : "route inactive-route"
          }
        >
          {pathname === "/admin/events" ? (
            <IconContext.Provider value={{ color: "#1281dd", size: 22 }}>
              <FaAddressBook />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: "#757575", size: 22 }}>
              <FaAddressBook />
            </IconContext.Provider>
          )}
          <p
            className={
              pathname === "/admin/events" ? "active-text" : "inactive-text"
            }
          >
            Events
          </p>
        </button>
        <button
          onClick={this.press.bind(this, "/admin/tour")}
          //to="/hotels"
          className={
            pathname === "/admin/tour"
              ? "route active-route"
              : "route inactive-route"
          }
        >
          {pathname === "/admin/tour" ? (
            <IconContext.Provider value={{ color: "#1281dd", size: 22 }}>
              <FaMapMarkerAlt />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: "#757575", size: 22 }}>
              <FaMapMarkerAlt />
            </IconContext.Provider>
          )}
          <p
            className={
              pathname === "/admin/tour" ? "active-text" : "inactive-text"
            }
          >
            Tours
          </p>
        </button>
        <button
          onClick={this.press.bind(this, "/admin/discounts")}
          //to="/hotels"
          className={
            pathname === "/admin/discounts"
              ? "route active-route"
              : "route inactive-route"
          }
        >
          {pathname === "/admin/discounts" ? (
            <IconContext.Provider value={{ color: "#1281dd", size: 22 }}>
              <IoIosPricetags />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: "#757575", size: 22 }}>
              <IoIosPricetags />
            </IconContext.Provider>
          )}
          <p
            className={
              pathname === "/admin/discounts" ? "active-text" : "inactive-text"
            }
          >
            Discounts
          </p>
        </button>
        <button
          onClick={this.press.bind(this, "/admin/activities")}
          //to="/hotels"
          className={
            pathname === "/admin/activities"
              ? "route active-route"
              : "route inactive-route"
          }
        >
          {pathname === "/admin/activities" ? (
            <IconContext.Provider value={{ color: "#1281dd", size: 22 }}>
              <IoMdBonfire />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: "#757575", size: 22 }}>
              <IoMdBonfire />
            </IconContext.Provider>
          )}
          <p
            className={
              pathname === "/admin/activities" ? "active-text" : "inactive-text"
            }
          >
            Activities
          </p>
        </button>
        <button
          onClick={this.press.bind(this, "/admin/cars")}
          //to="/hotels"
          className={
            pathname === "/admin/cars"
              ? "route active-route"
              : "route inactive-route"
          }
        >
          {pathname === "/admin/cars" ? (
            <IconContext.Provider value={{ color: "#1281dd", size: 22 }}>
              <FaCar />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: "#757575", size: 22 }}>
              <FaCar />
            </IconContext.Provider>
          )}
          <p
            className={
              pathname === "/admin/cars" ? "active-text" : "inactive-text"
            }
          >
            Cars
          </p>
        </button>
        <button
          onClick={this.press.bind(this, "/admin/rentals")}
          //to="/hotels"
          className={
            pathname === "/admin/rentals"
              ? "route active-route"
              : "route inactive-route"
          }
        >
          {pathname === "/admin/rentals" ? (
            <IconContext.Provider value={{ color: "#1281dd", size: 22 }}>
              <FaWarehouse />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: "#757575", size: 22 }}>
              <FaWarehouse />
            </IconContext.Provider>
          )}
          <p
            className={
              pathname === "/admin/rentals" ? "active-text" : "inactive-text"
            }
          >
            Rentals
          </p>
        </button>
        <button
          onClick={this.press.bind(this, "/admin/rooms")}
          //   to="/rooms"
          className={
            pathname === "/admin/rooms"
              ? "route active-route"
              : "route inactive-route"
          }
        >
          {pathname === "/admin/rooms" ? (
            <IconContext.Provider value={{ color: "#1281dd", size: 22 }}>
              <FaListAlt />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: "#757575", size: 22 }}>
              <FaListAlt />
            </IconContext.Provider>
          )}
          <p
            className={
              pathname === "/admin/rooms" ? "active-text" : "inactive-text"
            }
          >
            Rooms
          </p>
        </button>
        <button
          onClick={this.press.bind(this, "/admin/users")}
          className={
            pathname === "/admin/users"
              ? "route active-route"
              : "route inactive-route"
          }
        >
          {pathname === "/admin/users" ? (
            <IconContext.Provider value={{ color: "#1281dd", size: 22 }}>
              <FaUsers />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider
              value={{ color: "#757575", size: 22, marginRight: 10 }}
            >
              <FaUsers />
            </IconContext.Provider>
          )}
          <p
            className={
              pathname === "/admin/users" ? "active-text" : "inactive-text"
            }
          >
            Users
          </p>
        </button>
        {/* <button 
        onClick={this.press.bind(this, '/admin/dropbox')} 
        className={pathname === '/admin/dropbox' ? "route active-route" : "route inactive-route"}>
        {pathname === '/admin/dropbox' ?           <IconContext.Provider value={{ color: "#1281dd", size: 22 }}>
        <FaMapMarkerAlt />
          </IconContext.Provider> :           <IconContext.Provider value={{ color: "#757575", size: 22 }}>
          <FaMapMarkerAlt />
          </IconContext.Provider>}
          <p className={pathname === '/admin/dropbox' ? "active-text" : "inactive-text"}>Dropboxes</p>
        </button> */}
        {/* <button 
        onClick={this.press.bind(this, '/admin/pricelist')} 
        className={pathname === '/admin/pricelist' ? "route active-route" : "route inactive-route"}>
        {pathname === '/admin/pricelist' ?           <IconContext.Provider value={{ color: "#1281dd", size: 22 }}>
        <IoIosPricetags />
          </IconContext.Provider> :           <IconContext.Provider value={{ color: "#757575", size: 22 }}>
          <IoIosPricetags />
          </IconContext.Provider>}
          <p className={pathname === '/admin/pricelist' ? "active-text" : "inactive-text"}>Pricelist</p>
        </button> */}
      </div></div>
    );
  }
}

export default withRouter(Sidebar);
