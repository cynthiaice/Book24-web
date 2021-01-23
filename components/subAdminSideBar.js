import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "../components/config.js";
import Link from "next/link";

const SubAdminSideBar = ({
  dbActive,
  bookActive,
  hotelActive,
  eventActive,
  tourActive,
  cruiseActive,
  discountActive,
  actActive,
  carActive,
  rentActive,
  roomActive,
  userActive,
}) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getData = async () => {
      let token = await Cookies.get("token");

      var config = {
        headers: { Authorization: "Bearer " + token },
        timeout: 20000,
      };
      await axios
        .get(API_URL + "me", config)
        .then((response) => {
          if (response.data.message == "Token is not valid") {
            //      router.push("/");
          }
          let res = response.data;
          setUser(res);
        })
        .catch((error) => {
          //   router.push("/");
          console.log(error.response);
        });
    };

    getData();
  }, []);

  const iconStyle = {
    marginRight: "7.5px",
    marginBottom: "-2px",
    color: "#1281dd",
  };

  return (
    <div className="sidebar-nav sidebar--nav">
      <div className="sidebar-nav-body">
        <div className="side-menu-close">
          <i className="la la-times" />
        </div>
        {/* end menu-toggler */}
        <div className="author-content">
          <div className="d-flex align-items-center">
            <div className="author-img avatar-sm">
              <img src="/images/team9.jpg" alt="testimonial image" />
            </div>
            <div className="author-bio">
              <h4 className="author__title">{user.full_name}</h4>
              <span className="author__meta">Welcome to Admin Panel</span>
            </div>
          </div>
        </div>
        <div className="sidebar-menu-wrap">
          <ul className="sidebar-menu toggle-menu list-items">
            <li className={dbActive}>
              <Link href="sade">
                <a>
                  <ion-icon name="apps" style={iconStyle} />
                  Dashboard
                </a>
              </Link>
            </li>

            <li className={bookActive}>
              <Link href="admin-dashboard-booking">
                <a>
                  <ion-icon name="book" style={iconStyle} />
                  Bookings
                </a>
              </Link>
            </li>
            <li className={hotelActive}>
              <Link href="admin-dashboard-hotels">
                <a>
                  <ion-icon name="bed" style={iconStyle} />
                  Hotels
                </a>
              </Link>
            </li>
            <li className={roomActive}>
              <Link href="admin-dashboard-rooms">
                <a>
                  <ion-icon name="business" style={iconStyle} />
                  Rooms
                </a>
              </Link>
            </li>
            <li className={eventActive}>
              <Link href="admin-dashboard-events">
                <a>
                  <ion-icon name="calendar" style={iconStyle} />
                  Events
                </a>
              </Link>
            </li>
            <li className={tourActive}>
              <Link href="admin-dashboard-tours">
                <a>
                  <ion-icon name="earth" style={iconStyle}></ion-icon>
                  Tours
                </a>
              </Link>
            </li>
            <li className={cruiseActive}>
              <Link href="admin-dashboard-cruise">
                <a>
                  <ion-icon name="boat" style={iconStyle} />
                  Cruise
                </a>
              </Link>
            </li>
            {/* <li className={discountActive}>
              <Link href="admin-dashboard-discounts">
              <a>  <ion-icon name="wallet" style={iconStyle} />
                Discounts
              
              </a>
              </Link>
            </li> */}
            <li className={actActive}>
              <Link href="admin-dashboard-activities">
                <a>
                  <ion-icon name="restaurant" style={iconStyle} />
                  Activities
                </a>
              </Link>
            </li>
            <li className={carActive}>
              <Link href="admin-dashboard-cars">
                <a>
                  <ion-icon name="car" style={iconStyle} />
                  Cars
                </a>
              </Link>
            </li>
            <li className={rentActive}>
              <Link href="admin-dashboard-rentals">
                <a>
                  <ion-icon name="home" style={iconStyle} />
                  Rentals
                </a>
              </Link>
            </li>

            <li className={userActive}>
              <Link href="admin-dashboard-users">
                <a>
                  <ion-icon
                    name="people"
                    style={iconStyle}
                    className="hydrated"
                  />
                  Users
                </a>
              </Link>
            </li>

            <li>
              <Link href="/">
                <a
                  onClick={() => {
                    Cookies.remove("token");
                    Cookies.remove("id");
                    Cookies.remove("role");
                    Cookies.remove("name");
                    Cookies.remove("email");
                  }}
                >
                  <i className="la la-power-off mr-2 text-color-11" />
                  Logout
                </a>
              </Link>
            </li>
          </ul>
        </div>
        {/* end sidebar-menu-wrap */}
      </div>
    </div>
  );
};
export default SubAdminSideBar;
