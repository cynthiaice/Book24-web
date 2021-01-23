import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "../components/config.js";

const UserAdminHeader = () => {
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
    <div className="dashboard-nav">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="menu-wrapper">
              <div className="logo mr-5">
                <a href="">
                  <img
                    src="/images/logobook24.png"
                    width="120"
                    // height="60"
                    alt="logo"
                    className="logo_sticky"
                  />
                </a>
                <div className="menu-toggler">
                  <i className="la la-bars" />
                  <i className="la la-times" />
                </div>
                {/* end menu-toggler */}
                <div className="user-menu-open">
                  <i className="la la-user" />
                </div>
                {/* end user-menu-open */}
              </div>
              <div className="dashboard-search-box">
                <div className="contact-form-action">
                  <form action="#">
                    <div className="form-group mb-0">
                      <input
                        className="form-control"
                        type="text"
                        name="text"
                        placeholder="Search"
                      />
                      <button className="search-btn">
                        <i className="la la-search" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="nav-btn ml-auto">
                <div className="notification-wrap d-flex align-items-center">
                  <div className="notification-item mr-2">
                    <div className="dropdown">
                      <a
                        href="#"
                        className="dropdown-toggle drop-reveal-toggle-icon"
                        id="notificationDropdownMenu"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="la la-bell" />
                        <span className="noti-count">4</span>
                      </a>
                      <div className="dropdown-menu dropdown-reveal dropdown-menu-xl dropdown-menu-right">
                        <div className="dropdown-header drop-reveal-header">
                          <h6 className="title">
                            You have <strong className="text-black">4</strong>{" "}
                            notifications
                          </h6>
                        </div>
                        <div className="list-group drop-reveal-list">
                          <a
                            href="#"
                            className="list-group-item list-group-item-action"
                          >
                            <div className="msg-body d-flex align-items-center">
                              <div className="icon-element flex-shrink-0 mr-3 ml-0">
                                <i className="la la-bell" />
                              </div>
                              <div className="msg-content w-100">
                                <h3 className="title pb-1">
                                  Your request has been sent
                                </h3>
                                <p className="msg-text">2 min ago</p>
                              </div>
                            </div>
                            {/* end msg-body */}
                          </a>
                          <a
                            href="#"
                            className="list-group-item list-group-item-action"
                          >
                            <div className="msg-body d-flex align-items-center">
                              <div className="icon-element bg-2 flex-shrink-0 mr-3 ml-0">
                                <i className="la la-check" />
                              </div>
                              <div className="msg-content w-100">
                                <h3 className="title pb-1">
                                  Your account has been created
                                </h3>
                                <p className="msg-text">1 day ago</p>
                              </div>
                            </div>
                            {/* end msg-body */}
                          </a>
                          <a
                            href="#"
                            className="list-group-item list-group-item-action"
                          >
                            <div className="msg-body d-flex align-items-center">
                              <div className="icon-element bg-3 flex-shrink-0 mr-3 ml-0">
                                <i className="la la-user" />
                              </div>
                              <div className="msg-content w-100">
                                <h3 className="title pb-1">
                                  Your account updated
                                </h3>
                                <p className="msg-text">2 hrs ago</p>
                              </div>
                            </div>
                            {/* end msg-body */}
                          </a>
                          <a
                            href="#"
                            className="list-group-item list-group-item-action"
                          >
                            <div className="msg-body d-flex align-items-center">
                              <div className="icon-element bg-4 flex-shrink-0 mr-3 ml-0">
                                <i className="la la-lock" />
                              </div>
                              <div className="msg-content w-100">
                                <h3 className="title pb-1">
                                  Your password changed
                                </h3>
                                <p className="msg-text">Yesterday</p>
                              </div>
                            </div>
                            {/* end msg-body */}
                          </a>
                        </div>
                        <a
                          href="#"
                          className="dropdown-item drop-reveal-btn text-center"
                        >
                          View all
                        </a>
                      </div>
                      {/* end dropdown-menu */}
                    </div>
                  </div>
                  {/* end notification-item */}
                  <div className="notification-item">
                    <div className="dropdown">
                      <a
                        href="#"
                        className="dropdown-toggle"
                        id="userDropdownMenu"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-sm flex-shrink-0 mr-2">
                            <img src="images/team8.jpg" alt="team-img" />
                          </div>
                          <span className="font-size-14 font-weight-bold">
                            {user.full_name}
                          </span>
                        </div>
                      </a>
                      <div className="dropdown-menu dropdown-reveal dropdown-menu-md dropdown-menu-right">
                        <div className="dropdown-item drop-reveal-header user-reveal-header">
                          <h6 className="title text-uppercase">Welcome!</h6>
                        </div>
                        <div className="list-group drop-reveal-list user-drop-reveal-list">
                          <a
                            href="user-dashboard-profile.html"
                            className="list-group-item list-group-item-action"
                          >
                            <div className="msg-body">
                              <div className="msg-content">
                                <h3 className="title">
                                  <i className="la la-user mr-2" />
                                  My Profile
                                </h3>
                              </div>
                            </div>
                            {/* end msg-body */}
                          </a>
                          <a
                            href="user-dashboard-booking.html"
                            className="list-group-item list-group-item-action"
                          >
                            <div className="msg-body">
                              <div className="msg-content">
                                <h3 className="title">
                                  <i className="la la-shopping-cart mr-2" />
                                  My Booking
                                </h3>
                              </div>
                            </div>
                            {/* end msg-body */}
                          </a>
                          <a
                            href="user-dashboard-reviews.html"
                            className="list-group-item list-group-item-action"
                          >
                            <div className="msg-body">
                              <div className="msg-content">
                                <h3 className="title">
                                  <i className="la la-heart mr-2" />
                                  My Reviews
                                </h3>
                              </div>
                            </div>
                            {/* end msg-body */}
                          </a>
                          <a
                            href="user-dashboard-settings.html"
                            className="list-group-item list-group-item-action"
                          >
                            <div className="msg-body">
                              <div className="msg-content">
                                <h3 className="title">
                                  <i className="la la-gear mr-2" />
                                  Settings
                                </h3>
                              </div>
                            </div>
                            {/* end msg-body */}
                          </a>
                          <div className="section-block" />
                          <a
                            href="index.html"
                            className="list-group-item list-group-item-action"
                          >
                            <div className="msg-body">
                              <div className="msg-content">
                                <h3 className="title">
                                  <i className="la la-power-off mr-2" />
                                  Logout
                                </h3>
                              </div>
                            </div>
                            {/* end msg-body */}
                          </a>
                        </div>
                      </div>
                      {/* end dropdown-menu */}
                    </div>
                  </div>
                  {/* end notification-item */}
                </div>
              </div>
              {/* end nav-btn */}
            </div>
            {/* end menu-wrapper */}
          </div>
          {/* end col-lg-12 */}
        </div>
        {/* end row */}
      </div>
      {/* end container-fluid */}
    </div>
  );
};
export default UserAdminHeader;
