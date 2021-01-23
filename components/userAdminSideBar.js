import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "../components/config.js";
import moment from "moment";
import Link from "next/link";
const UserAdminSideBar = ({
  dbActive,
  bookActive,
  profileActive,
  wishActive,
  setActive,
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

  return (
    <div className="sidebar-nav">
      <div className="sidebar-nav-body">
        <div className="side-menu-close">
          <i className="la la-times" />
        </div>
        {/* end menu-toggler */}
        <div className="author-content">
          <div className="d-flex align-items-center">
            <div className="author-img avatar-sm">
              <img src="images/team8.jpg" alt="testimonial image" />
            </div>
            <div className="author-bio">
              <h4 className="author__title">{user.full_name}</h4>
              <span className="author__meta">
                {moment(user.createdAt).format("MMM YYYY")}
              </span>
            </div>
          </div>
        </div>
        <div className="sidebar-menu-wrap">
          <ul className="sidebar-menu list-items">
            <li className={dbActive}>
              <Link href="user-dashboard">
                <a>
                  <i className="la la-dashboard mr-2" />
                  Dashboard
                </a>
              </Link>
            </li>

            <li className={bookActive}>
              <Link href="user-dashboard-booking">
                <a>
                  <i className="la la-shopping-cart mr-2 text-color" />
                  My Booking
                </a>
              </Link>
            </li>

            <li className={profileActive}>
              <Link href="user-dashboard-profile">
                <a>
                  <i className="la la-user mr-2 text-color-2" />
                  My Profile
                </a>
              </Link>
            </li>

            {/* <li><Link href="user-dashboard-reviews"><i className="la la-star mr-2 text-color-3" />My Reviews
            </Link></li> */}
            <li className={wishActive}>
              <Link href="user-dashboard-wishlist">
                <a>
                  <i className="la la-heart mr-2 text-color-4" />
                  Wishlist
                </a>
              </Link>
            </li>
            {/* <li className={setActive}>
              <Link href="user-dashboard-settings">
                <a>
                  <i className="la la-cog mr-2 text-color-5" />
                  Settings
                </a>
              </Link>
            </li> */}
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
                  <i className="la la-power-off mr-2 text-color-6" />
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
export default UserAdminSideBar;
