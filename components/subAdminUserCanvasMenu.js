
const SubAdminUserCanvasMenu = () => {
    return (
        <div className="user-canvas-container">
        <div className="side-menu-close">
          <i className="la la-times" />
        </div>{/* end menu-toggler */}
        <div className="user-canvas-nav">
          <div className="section-tab section-tab-2 text-center pt-4 pb-3 pl-4">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="notification-tab" data-toggle="tab" href="#notification" role="tab" aria-controls="notification" aria-selected="false">
                  Notifications
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="message-tab" data-toggle="tab" href="#message" role="tab" aria-controls="message" aria-selected="false">
                  Messages
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="account-tab" data-toggle="tab" href="#account" role="tab" aria-controls="account" aria-selected="true">
                  Account
                </a>
              </li>
            </ul>
          </div>{/* end section-tab */}
        </div>
        <div className="user-canvas-nav-content">
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="notification" role="tabpanel" aria-labelledby="notification-tab">
              <div className="user-sidebar-item">
                <div className="notification-item">
                  <div className="list-group drop-reveal-list">
                    <a href="#" className="list-group-item list-group-item-action">
                      <div className="msg-body d-flex align-items-center">
                        <div className="icon-element flex-shrink-0 mr-3 ml-0"><i className="la la-bell" /></div>
                        <div className="msg-content w-100">
                          <h3 className="title pb-1">Your request has been sent</h3>
                          <p className="msg-text">2 min ago</p>
                        </div>
                      </div>{/* end msg-body */}
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                      <div className="msg-body d-flex align-items-center">
                        <div className="icon-element bg-2 flex-shrink-0 mr-3 ml-0"><i className="la la-check" /></div>
                        <div className="msg-content w-100">
                          <h3 className="title pb-1">Your account has been created</h3>
                          <p className="msg-text">1 day ago</p>
                        </div>
                      </div>{/* end msg-body */}
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                      <div className="msg-body d-flex align-items-center">
                        <div className="icon-element bg-3 flex-shrink-0 mr-3 ml-0"><i className="la la-user" /></div>
                        <div className="msg-content w-100">
                          <h3 className="title pb-1">Your account updated</h3>
                          <p className="msg-text">2 hrs ago</p>
                        </div>
                      </div>{/* end msg-body */}
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                      <div className="msg-body d-flex align-items-center">
                        <div className="icon-element bg-4 flex-shrink-0 mr-3 ml-0"><i className="la la-lock" /></div>
                        <div className="msg-content w-100">
                          <h3 className="title pb-1">Your password changed</h3>
                          <p className="msg-text">Yesterday</p>
                        </div>
                      </div>{/* end msg-body */}
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                      <div className="msg-body d-flex align-items-center">
                        <div className="icon-element bg-5 flex-shrink-0 mr-3 ml-0"><i className="la la-envelope" /></div>
                        <div className="msg-content w-100">
                          <h3 className="title pb-1">Your email sent</h3>
                          <p className="msg-text">Yesterday</p>
                        </div>
                      </div>{/* end msg-body */}
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                      <div className="msg-body d-flex align-items-center">
                        <div className="icon-element bg-6 flex-shrink-0 mr-3 ml-0"><i className="la la-envelope" /></div>
                        <div className="msg-content w-100">
                          <h3 className="title pb-1">Your email changed</h3>
                          <p className="msg-text">Yesterday</p>
                        </div>
                      </div>{/* end msg-body */}
                    </a>
                  </div>
                </div>{/* end notification-item */}
              </div>
            </div>
            <div className="tab-pane fade" id="message" role="tabpanel" aria-labelledby="message-tab">
              <div className="user-sidebar-item">
                <div className="notification-item">
                  <div className="list-group drop-reveal-list">
                    <a href="#" className="list-group-item list-group-item-action">
                      <div className="msg-body d-flex align-items-center">
                        <div className="avatar flex-shrink-0 mr-3">
                          <img src="/images/team8.jpg" alt="" />
                        </div>
                        <div className="msg-content w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <h3 className="title pb-1">Steve Wornder</h3>
                            <span className="msg-text">3 min ago</span>
                          </div>
                          <p className="msg-text">Ancillae delectus necessitatibus no eam</p>
                        </div>
                      </div>{/* end msg-body */}
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                      <div className="msg-body d-flex align-items-center">
                        <div className="avatar flex-shrink-0 mr-3">
                          <img src="/images/team9.jpg" alt="" />
                        </div>
                        <div className="msg-content w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <h3 className="title pb-1">Marc Twain</h3>
                            <span className="msg-text">1 hrs ago</span>
                          </div>
                          <p className="msg-text">Ancillae delectus necessitatibus no eam</p>
                        </div>
                      </div>{/* end msg-body */}
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                      <div className="msg-body d-flex align-items-center">
                        <div className="avatar flex-shrink-0 mr-3">
                          <img src="/images/team10.jpg" alt="" />
                        </div>
                        <div className="msg-content w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <h3 className="title pb-1">Enzo Ferrari</h3>
                            <span className="msg-text">2 hrs ago</span>
                          </div>
                          <p className="msg-text">Ancillae delectus necessitatibus no eam</p>
                        </div>
                      </div>{/* end msg-body */}
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                      <div className="msg-body d-flex align-items-center">
                        <div className="avatar flex-shrink-0 mr-3">
                          <img src="/images/team11.jpg" alt="" />
                        </div>
                        <div className="msg-content w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <h3 className="title pb-1">Lucas Swing</h3>
                            <span className="msg-text">3 hrs ago</span>
                          </div>
                          <p className="msg-text">Ancillae delectus necessitatibus no eam</p>
                        </div>
                      </div>{/* end msg-body */}
                    </a>
                  </div>
                </div>{/* end notification-item */}
              </div>
            </div>
            <div className="tab-pane fade" id="account" role="tabpanel" aria-labelledby="account-tab">
              <div className="user-action-wrap user-sidebar-panel">
                <div className="notification-item">
                  <a href="user-dashboard-profile.html" className="dropdown-item">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-sm flex-shrink-0 mr-2"><img src="/images/team8.jpg" alt="team-img" /></div>
                      <span className="font-size-14 font-weight-bold">Ali Tufan</span>
                    </div>
                  </a>
                  <div className="list-group drop-reveal-list user-drop-reveal-list">
                    <a href="user-dashboard-profile.html" className="list-group-item list-group-item-action">
                      <div className="msg-body">
                        <div className="msg-content">
                          <h3 className="title"><i className="la la-user mr-2" />My Profile</h3>
                        </div>
                      </div>{/* end msg-body */}
                    </a>
                    <a href="user-dashboard-booking.html" className="list-group-item list-group-item-action">
                      <div className="msg-body">
                        <div className="msg-content">
                          <h3 className="title"><i className="la la-shopping-cart mr-2" />My Booking</h3>
                        </div>
                      </div>{/* end msg-body */}
                    </a>
                    <a href="user-dashboard-reviews.html" className="list-group-item list-group-item-action">
                      <div className="msg-body">
                        <div className="msg-content">
                          <h3 className="title"><i className="la la-heart mr-2" />My Reviews</h3>
                        </div>
                      </div>{/* end msg-body */}
                    </a>
                    <a href="user-dashboard-settings.html" className="list-group-item list-group-item-action">
                      <div className="msg-body">
                        <div className="msg-content">
                          <h3 className="title"><i className="la la-gear mr-2" />Settings</h3>
                        </div>
                      </div>{/* end msg-body */}
                    </a>
                    <div className="section-block" />
                    <a href="/" className="list-group-item list-group-item-action">
                      <div className="msg-body">
                        <div className="msg-content">
                          <h3 className="title"><i className="la la-power-off mr-2" />Logout</h3>
                        </div>
                      </div>{/* end msg-body */}
                    </a>
                  </div>
                </div>{/* end notification-item */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
export default SubAdminUserCanvasMenu