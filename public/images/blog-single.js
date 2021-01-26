import Head from "next/head";
import React, { Component } from "react";
import Header from "../components/header";
import DetailsHeader from "../components/detailsHeader";
import DetailsItem from "../components/detailsItem";import PreLoader from "../components/preloader";
import SignInModal from "../components/signInModal";
import Footer from "../components/footer";
import $ from "jquery";
import Cookies from "js-cookie";
import moment from "moment";
import { withRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../components/config.js";

class BlogSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      token: "",
      type: "",
      name: "",
      address: "",
      description: "",
      check_in_time: "",
      check_out_time: "",
      sub_items: [],
    };
  }

  async componentDidMount() {
    let token = await Cookies.get("token");
    if (token == null || token == "") {
      console.log("false tojken");
      this.setState({ auth: false });
    } else {
      console.log(token);
      this.setState({ auth: true, token });
    }
  }

  getData = (token, type, id) => {
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + type + "s/" + id, config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.length;
        if(len <= 0){
          this.props.router.push('/listing')
        }
        this.setState({
          type: type,
          name: response.data.name,
          address: response.data.address,
          description: response.data.description,
          check_in_time: response.data.check_in_time
            ? response.data.check_in_time
            : response.data.start_date,
          check_out_time: response.data.check_out_time
            ? response.data.check_out_time
            : response.data.end_date,
          sub_items: type == "hotel"
              ? response.data.rooms
              : type == "event"
              ? response.data.ticket_type
              : type == "tour"
              ? response.data.tour_packages
              : [],
        });
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error.response);
      });
  };

  render() {
    const {
      type,
      name,
      address,
      description,
      check_in_time,
      check_out_time,
      sub_items,
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
          <link rel="stylesheet" href="css/bootstrap-select.min.css"/>
    <link rel="stylesheet" href="css/line-awesome.css"/>
    <link rel="stylesheet" href="css/owl.carousel.min.css"/>
    <link rel="stylesheet" href="css/owl.theme.default.min.css"/>
    <link rel="stylesheet" href="css/jquery.fancybox.min.css"/>
    <link rel="stylesheet" href="css/daterangepicker.css"/>
    <link rel="stylesheet" href="css/animate.min.css"/>
    <link rel="stylesheet" href="css/animated-headline.css"/>
    <link rel="stylesheet" href="css/jquery-ui.css"/>
    <link rel="stylesheet" href="css/jquery.filer.css"/>
    <link rel="stylesheet" href="css/flag-icon.min.css" />
        </Head>
        <div id="page">
              {/* start cssload-loader */}
      
          <DetailsHeader makeBlue={true}/>
  {/* ================================
    START BREADCRUMB AREA
================================= */}
<section className="breadcrumb-area bread-bg-9">
          <div className="breadcrumb-wrap">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="breadcrumb-content">
                    <div className="section-heading">
                      <h2 className="sec__title">Blog Details</h2>
                    </div>
                  </div>{/* end breadcrumb-content */}
                </div>{/* end col-lg-6 */}
                <div className="col-lg-6">
                  <div className="breadcrumb-list">
                    <ul className="list-items d-flex justify-content-end">
                      <li><a href="index.html">Home</a></li>
                      <li>Blog</li>
                      <li>Blog Details</li>
                    </ul>
                  </div>{/* end breadcrumb-list */}
                </div>{/* end col-lg-6 */}
              </div>{/* end row */}
            </div>{/* end container */}
          </div>{/* end breadcrumb-wrap */}
          <div className="bread-svg-box">
            <svg className="bread-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none"><polygon points="100 0 50 10 0 0 0 10 100 10" /></svg>
          </div>{/* end bread-svg */}
        </section>{/* end breadcrumb-area */}
        {/* ================================
    END BREADCRUMB AREA
================================= */}
        {/* ================================
    START CARD AREA
================================= */}
        <section className="card-area section--padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="card-item blog-card blog-card-layout-2 blog-single-card mb-5">
                  <div className="card-img before-none">
                    <img src="images/imgfood.jpg" alt="blog-img" />
                  </div>
                  <div className="card-body px-0 pb-0">
                    <div className="post-categories">
                      <a href="#" className="badge">Travel</a>
                      <a href="#" className="badge">lifestyle</a>
                    </div>
                    <h3 className="card-title font-size-28">Table Manners Around the  &amp; World</h3>
                    <p className="card-meta pb-3">
                      <span className="post__author">By <a href="#" className="text-gray">Admin </a></span>
                      <span className="post-dot" />
                      <span className="post__date"> 1 January, 2020</span>
                      <span className="post-dot" />
                      <span className="post__time"><a href="#" className="text-gray">4 Comments</a></span>
                      <span className="post-dot" />
                      <span className="post__time"><a href="#" className="text-gray">202 Likes</a></span>
                    </p>
                    <div className="section-block" />
                    <p className="card-text py-3">One of the most exciting parts of travelling and exploring a new country is getting to try all the delicious local dishes and culinary specialities. But did you know that exploring a country’s local cuisine can be a minefield of do’s and don’ts when it comes to table manners? What’s considered the height of politeness in one country may be seen as extremely ill-mannered in another country.

Don’t let this put you off trying exciting new dishes! Eating food and sharing a meal is one of the best ways to learn about another culture, and make friends with locals. With a little bit of preparation on table etiquette and cutlery etiquette, you’ll be ready to tuck in no matter where you are! Join us as we examine dining etiquette around the world.</p>
                    <p className="card-text pb-3"></p>
                    <div className="photo-block-gallery">
                      <h3 className="title pb-2">Table etiquette in Africa:</h3>
                     <h4 className="title pb-2"> Ethiopia</h4>
                      <p className="card-text pb-4">Cutlery etiquette is not common in Ethiopia, as most meals are eaten by hand. Remember to only use your right hand to eat, as the left hand is seen as unclean in many North African and middle eastern cultures. Food is shared and comes on a large plate placed in the centre of the table. Don’t reach across the plate for food on the other side, as it’s seen as bad table manners.</p>
                      <div className="row">
                        <div className="col-lg-4 responsive-column">
                          <div className="photo-block-item">
                            <a href="images/etiopia.jpg" data-fancybox="gallery" data-caption="Showing image - 01" data-speed={700}>
                              <img src="images/destination-img2.jpg" alt="img" />
                            </a>
                          </div>
                        </div>{/* end col-lg-4 */}
                        <div className="col-lg-4 responsive-column">
                          <div className="photo-block-item">
                            <a href="images/etiopiajpg" data-fancybox="gallery" data-caption="Showing image - 02" data-speed={700}>
                              <img src="images/destination-img3.jpg" alt="img" />
                            </a>
                          </div>
                        </div>{/* end col-lg-4 */}
                        <div className="col-lg-4 responsive-column">
                          <div className="photo-block-item">
                            <a href="images/destination-img4.jpg" data-fancybox="gallery" data-caption="Showing image - 03" data-speed={700}>
                              <img src="images/destination-img4.jpg" alt="img" />
                            </a>
                          </div>
                        </div>{/* end col-lg-4 */}
                        <div className="col-lg-6 responsive-column">
                          <div className="photo-block-item">
                            <a href="images/destination-img5.jpg" data-fancybox="gallery" data-caption="Showing image - 04" data-speed={700}>
                              <img src="images/destination-img5.jpg" alt="img" />
                            </a>
                          </div>
                        </div>{/* end col-lg-6 */}
                        <div className="col-lg-6 responsive-column">
                          <div className="photo-block-item">
                            <a href="images/destination-img6.jpg" data-fancybox="gallery" data-caption="Showing image - 05" data-speed={700}>
                              <img src="images/destination-img6.jpg" alt="img" />
                            </a>
                          </div>
                        </div>{/* end col-lg-6 */}
                      </div>{/* end row */}
                    </div>
                    <p className="card-text padding-bottom-35px">Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
                    <div className="blockquote-item margin-bottom-35px">
                      <blockquote className="mb-0">
                        <p className="blockquote__text">
                          Creativity is just connecting things. When you ask creative people how
                          they did something, they feel a little guilty because they didn't really do it,
                          they just saw something. It seemed obvious to them after a while.
                          That's because they were able to connect experiences they've had
                          and synthesize new things.
                        </p>
                        <h4 className="blockquote__meta">- Steve Jobs <span>Founder of Apple Inc.</span></h4>
                      </blockquote>
                    </div>
                    <h3 className="title">Make better travel decisions</h3>
                    <p className="card-text pt-3 pb-4">Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus. Vestibulum id ligula porta felis euismod semper</p>
                    <div className="section-block" />
                    <h3 className="title pt-4">Getting Started</h3>
                    <p className="card-text py-3">Sed ut perspiciatis unde omnis iste natus error sit voluptatem eaque ipsa quae ab illo inventore incididunt ut labore et dolore magna Boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price.</p>
                    <p className="card-text pb-4">However, who has the willpower to actually sit through a self-imposed MCSE training. who has the willpower to actually sit through a self-imposed</p>
                    <div className="section-block" />
                    <div className="post-tag-wrap d-flex align-items-center justify-content-between py-4">
                      <ul className="tag-list">
                        <li><a href="#">Tour</a></li>
                        <li><a href="#">Nature</a></li>
                        <li><a href="#">Beaches</a></li>
                      </ul>
                      <div className="post-share">
                        <ul>
                          <li>
                            <i className="la la-share icon-element" />
                            <ul className="post-share-dropdown d-flex align-items-center">
                              <li><a href="#"><i className="lab la-facebook-f" /></a></li>
                              <li><a href="#"><i className="lab la-twitter" /></a></li>
                              <li><a href="#"><i className="lab la-instagram" /></a></li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="section-block" />
                    <div className="post-navigation d-flex justify-content-between py-4">
                      <a href="#" className="btn theme-btn-hover-gray line-height-35"><i className="la la-arrow-left mr-2" />The best hotels in Europe: 2020</a>
                      <a href="#" className="btn theme-btn-hover-gray line-height-35">The 10 best flight journeys in the world<i className="la la-arrow-right ml-2" /></a>
                    </div>
                    <div className="section-block" />
                    <div className="post-author-wrap">
                      <div className="author-content pt-5">
                        <div className="d-flex">
                          <div className="author-img author-img-md mr-4">
                            <a href="#"><img src="images/team8.jpg" alt="testimonial image" /></a>
                          </div>
                          <div className="author-bio">
                            <h4 className="author__title"><a href="#">Trizen</a></h4>
                            <span className="author__meta">About the Author</span>
                            <p className="author__text pt-1">Donec vehicula nunc in turpis rutrum porta. Nullam lacinia ante non turpis aliquam mattis. Pellentesque luctus leo eget metus egestas egestas.</p>
                            <ul className="social-profile pt-3">
                              <li><a href="#"><i className="lab la-facebook-f" /></a></li>
                              <li><a href="#"><i className="lab la-twitter" /></a></li>
                              <li><a href="#"><i className="lab la-instagram" /></a></li>
                              <li><a href="#"><i className="lab la-linkedin-in" /></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{/* end card-item */}
                <div className="section-block" />
                <div className="related-posts pt-5 pb-4">
                  <h3 className="title">Related Posts</h3>
                  <div className="row pt-4">
                    <div className="col-lg-6 responsive-column">
                      <div className="card-item blog-card">
                        <div className="card-img">
                          <img src="images/blog-img.jpg" alt="blog-img" />
                          <div className="post-format icon-element">
                            <i className="la la-photo" />
                          </div>
                          <div className="card-body">
                            <div className="post-categories">
                              <a href="#" className="badge">Travel</a>
                              <a href="#" className="badge">lifestyle</a>
                            </div>
                            <h3 className="card-title line-height-26"><a href="blog-single.html">When Traveling Avoid Expensive Hotels &amp; Resorts</a></h3>
                            <p className="card-meta">
                              <span className="post__date"> 1 January, 2020</span>
                              <span className="post-dot" />
                              <span className="post__time">5 Mins read</span>
                            </p>
                          </div>
                        </div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                          <div className="author-content d-flex align-items-center">
                            <div className="author-img">
                              <img src="images/small-team1.jpg" alt="testimonial image" />
                            </div>
                            <div className="author-bio">
                              <a href="#" className="author__title">Leroy Bell</a>
                            </div>
                          </div>
                          <div className="post-share">
                            <ul>
                              <li>
                                <i className="la la-share icon-element" />
                                <ul className="post-share-dropdown d-flex align-items-center">
                                  <li><a href="#"><i className="lab la-facebook-f" /></a></li>
                                  <li><a href="#"><i className="lab la-twitter" /></a></li>
                                  <li><a href="#"><i className="lab la-instagram" /></a></li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>{/* end card-item */}
                    </div>{/* end col-lg-6 */}
                    <div className="col-lg-6 responsive-column">
                      <div className="card-item blog-card">
                        <div className="card-img">
                          <img src="images/blog-img2.jpg" alt="blog-img" />
                          <div className="post-format icon-element">
                            <i className="la la-play" />
                          </div>
                          <div className="card-body">
                            <div className="post-categories">
                              <a href="#" className="badge">Video</a>
                            </div>
                            <h3 className="card-title line-height-26"><a href="blog-single.html">My Best Travel Tips: The Ultimate Travel Guide</a></h3>
                            <p className="card-meta">
                              <span className="post__date"> 1 February, 2020</span>
                              <span className="post-dot" />
                              <span className="post__time">4 Mins read</span>
                            </p>
                          </div>
                        </div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                          <div className="author-content d-flex align-items-center">
                            <div className="author-img">
                              <img src="images/small-team2.jpg" alt="testimonial image" />
                            </div>
                            <div className="author-bio">
                              <a href="#" className="author__title">Phillip Hunt</a>
                            </div>
                          </div>
                          <div className="post-share">
                            <ul>
                              <li>
                                <i className="la la-share icon-element" />
                                <ul className="post-share-dropdown d-flex align-items-center">
                                  <li><a href="#"><i className="lab la-facebook-f" /></a></li>
                                  <li><a href="#"><i className="lab la-twitter" /></a></li>
                                  <li><a href="#"><i className="lab la-instagram" /></a></li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>{/* end card-item */}
                    </div>{/* end col-lg-6 */}
                  </div>{/* end row */}
                </div>
                <div className="section-block" />
                <div className="comments-list pt-5">
                  <h3 className="title">Showing 3 Comments</h3>
                  <div className="comment pt-5">
                    <div className="comment-avatar">
                      <img className="avatar__img" alt="" src="images/team8.jpg" />
                    </div>
                    <div className="comment-body">
                      <div className="meta-data">
                        <h3 className="comment__author">Jenny Doe</h3>
                        <div className="meta-data-inner">
                          <p className="comment__date">April 5, 2019</p>
                        </div>
                      </div>
                      <p className="comment-content">
                        Lorem ipsum dolor sit amet, dolores mandamus moderatius ea ius, sed civibus vivendum imperdiet ei, amet tritani sea id. Ut veri diceret fierent mei, qui facilisi suavitate euripidis
                      </p>
                      <div className="comment-reply">
                        <a className="theme-btn" href="#" data-toggle="modal" data-target="#replayPopupForm">
                          <span className="la la-mail-reply mr-1" />Reply
                        </a>
                      </div>
                    </div>
                  </div>{/* end comments */}
                  <div className="comment comment-reply-item">
                    <div className="comment-avatar">
                      <img className="avatar__img" alt="" src="images/team9.jpg" />
                    </div>
                    <div className="comment-body">
                      <div className="meta-data">
                        <h3 className="comment__author">Jenny Doe</h3>
                        <div className="meta-data-inner">
                          <p className="comment__date">April 5, 2019</p>
                        </div>
                      </div>
                      <p className="comment-content">
                        Lorem ipsum dolor sit amet, dolores mandamus moderatius ea ius, sed civibus vivendum imperdiet ei, amet tritani sea id. Ut veri diceret fierent mei, qui facilisi suavitate euripidis
                      </p>
                      <div className="comment-reply">
                        <a className="theme-btn" href="#" data-toggle="modal" data-target="#replayPopupForm">
                          <span className="la la-mail-reply mr-1" />Reply
                        </a>
                      </div>
                    </div>
                  </div>{/* end comments */}
                  <div className="comment">
                    <div className="comment-avatar">
                      <img className="avatar__img" alt="" src="images/team10.jpg" />
                    </div>
                    <div className="comment-body">
                      <div className="meta-data">
                        <h3 className="comment__author">Jenny Doe</h3>
                        <div className="meta-data-inner">
                          <p className="comment__date">April 5, 2019</p>
                        </div>
                      </div>
                      <p className="comment-content">
                        Lorem ipsum dolor sit amet, dolores mandamus moderatius ea ius, sed civibus vivendum imperdiet ei, amet tritani sea id. Ut veri diceret fierent mei, qui facilisi suavitate euripidis
                      </p>
                      <div className="comment-reply">
                        <a className="theme-btn" href="#" data-toggle="modal" data-target="#replayPopupForm">
                          <span className="la la-mail-reply mr-1" />Reply
                        </a>
                      </div>
                    </div>
                  </div>{/* end comments */}
                  <div className="btn-box load-more text-center">
                    <button className="theme-btn theme-btn-small theme-btn-transparent" type="button">Load More Comment</button>
                  </div>
                </div>{/* end comments-list */}
                <div className="comment-forum pt-5">
                  <div className="form-box">
                    <div className="form-title-wrap">
                      <h3 className="title">Add a Comment</h3>
                    </div>{/* form-title-wrap */}
                    <div className="form-content">
                      <div className="contact-form-action">
                        <form method="post">
                          <div className="row">
                            <div className="col-lg-6 responsive-column">
                              <div className="input-box">
                                <label className="label-text">Name</label>
                                <div className="form-group">
                                  <span className="la la-user form-icon" />
                                  <input className="form-control" type="text" name="text" placeholder="Your name" />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 responsive-column">
                              <div className="input-box">
                                <label className="label-text">Email</label>
                                <div className="form-group">
                                  <span className="la la-envelope-o form-icon" />
                                  <input className="form-control" type="email" name="email" placeholder="Email address" />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="input-box">
                                <label className="label-text">Message</label>
                                <div className="form-group">
                                  <span className="la la-pencil form-icon" />
                                  <textarea className="message-control form-control" name="message" placeholder="Write message" defaultValue={""} />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group">
                                <div className="custom-checkbox">
                                  <input type="checkbox" id="chbyes" />
                                  <label htmlFor="chbyes">Save my name, email, and website in this browser for the next time I comment.</label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="btn-box">
                                <button type="button" className="theme-btn">Leave a Comment</button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>{/* end contact-form-action */}
                    </div>{/* end form-content */}
                  </div>{/* end form-box */}
                </div>{/* end comment-forum */}
              </div>{/* end col-lg-8 */}
              <div className="col-lg-4">
                <div className="sidebar mb-0">
                  <div className="sidebar-widget">
                    <h3 className="title stroke-shape">Search Post</h3>
                    <div className="contact-form-action">
                      <form action="#">
                        <div className="input-box">
                          <div className="form-group mb-0">
                            <input className="form-control pl-3" type="text" placeholder="Type your keywords..." />
                            <button className="search-btn" type="submit"><i className="la la-search" /></button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>{/* end sidebar-widget */}
                  <div className="sidebar-widget">
                    <h3 className="title stroke-shape">Categories</h3>
                    <div className="sidebar-category">
                      <div className="custom-checkbox">
                        <input type="checkbox" id="cat1" />
                        <label htmlFor="cat1">All <span className="font-size-13 ml-1">(55)</span></label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="cat2" />
                        <label htmlFor="cat2">Active Adventure Tours <span className="font-size-13 ml-1">(8)</span></label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="cat3" />
                        <label htmlFor="cat3">Ecotourism <span className="font-size-13 ml-1">(5)</span></label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="cat4" />
                        <label htmlFor="cat4">Escorted Tours <span className="font-size-13 ml-1">(2)</span></label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="cat5" />
                        <label htmlFor="cat5">Group Tours <span className="font-size-13 ml-1">(11)</span></label>
                      </div>
                      <div className="custom-checkbox">
                        <input type="checkbox" id="cat6" />
                        <label htmlFor="cat6">Ligula <span className="font-size-13 ml-1">(3)</span></label>
                      </div>
                      <div className="collapse" id="categoryMenu">
                        <div className="custom-checkbox">
                          <input type="checkbox" id="cat7" />
                          <label htmlFor="cat7">Family Tours <span className="font-size-13 ml-1">(4)</span></label>
                        </div>
                        <div className="custom-checkbox">
                          <input type="checkbox" id="cat8" />
                          <label htmlFor="cat8">City Trips <span className="font-size-13 ml-1">(5)</span></label>
                        </div>
                        <div className="custom-checkbox">
                          <input type="checkbox" id="cat9" />
                          <label htmlFor="cat9">National Parks Tours <span className="font-size-13 ml-1">(3)</span></label>
                        </div>
                        <div className="custom-checkbox">
                          <input type="checkbox" id="cat10" />
                          <label htmlFor="cat10">Vacations <span className="font-size-13 ml-1">(3)</span></label>
                        </div>
                        <div className="custom-checkbox">
                          <input type="checkbox" id="cat11" />
                          <label htmlFor="cat11">Early booking <span className="font-size-13 ml-1">(7)</span></label>
                        </div>
                        <div className="custom-checkbox">
                          <input type="checkbox" id="cat12" />
                          <label htmlFor="cat12">Last minute <span className="font-size-13 ml-1">(2)</span></label>
                        </div>
                      </div>{/* end collapse */}
                      <a className="btn-text" data-toggle="collapse" href="#categoryMenu" role="button" aria-expanded="false" aria-controls="categoryMenu">
                        <span className="show-more">Show More <i className="la la-angle-down" /></span>
                        <span className="show-less">Show Less <i className="la la-angle-up" /></span>
                      </a>
                    </div>
                  </div>{/* end sidebar-widget */}
                  <div className="sidebar-widget">
                    <div className="section-tab section-tab-2 pb-3">
                      <ul className="nav nav-tabs" id="myTab3" role="tablist">
                        <li className="nav-item">
                          <a className="nav-link" id="recent-tab" data-toggle="tab" href="#recent" role="tab" aria-controls="recent" aria-selected="true">
                            Recent
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link active" id="popular-tab" data-toggle="tab" href="#popular" role="tab" aria-controls="popular" aria-selected="false">
                            Popular
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" id="new-tab" data-toggle="tab" href="#new" role="tab" aria-controls="new" aria-selected="false">
                            New
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-content" id="myTabContent">
                      <div className="tab-pane " id="recent" role="tabpanel" aria-labelledby="recent-tab">
                        <div className="card-item card-item-list recent-post-card">
                          <div className="card-img">
                            <a href="blog-single.html" className="d-block">
                              <img src="images/small-img4.jpg" alt="blog-img" />
                            </a>
                          </div>
                          <div className="card-body">
                            <h3 className="card-title"><a href="blog-single.html">Pack wisely before traveling</a></h3>
                            <p className="card-meta">
                              <span className="post__date"> 1 March, 2020</span>
                              <span className="post-dot" />
                              <span className="post__time">3 Mins read</span>
                            </p>
                          </div>
                        </div>{/* end card-item */}
                        <div className="card-item card-item-list recent-post-card">
                          <div className="card-img">
                            <a href="blog-single.html" className="d-block">
                              <img src="images/small-img5.jpg" alt="blog-img" />
                            </a>
                          </div>
                          <div className="card-body">
                            <h3 className="card-title"><a href="blog-single.html">Change your place and get the fresh air</a></h3>
                            <p className="card-meta">
                              <span className="post__date"> 1 March, 2020</span>
                              <span className="post-dot" />
                              <span className="post__time">3 Mins read</span>
                            </p>
                          </div>
                        </div>{/* end card-item */}
                        <div className="card-item card-item-list recent-post-card mb-0">
                          <div className="card-img">
                            <a href="blog-single.html" className="d-block">
                              <img src="images/small-img6.jpg" alt="blog-img" />
                            </a>
                          </div>
                          <div className="card-body">
                            <h3 className="card-title"><a href="blog-single.html">Introducing this amazing city</a></h3>
                            <p className="card-meta">
                              <span className="post__date"> 1 March, 2020</span>
                              <span className="post-dot" />
                              <span className="post__time">3 Mins read</span>
                            </p>
                          </div>
                        </div>{/* end card-item */}
                      </div>{/* end tab-pane */}
                      <div className="tab-pane fade show active" id="popular" role="tabpanel" aria-labelledby="popular-tab">
                        <div className="card-item card-item-list recent-post-card">
                          <div className="card-img">
                            <a href="blog-single.html" className="d-block">
                              <img src="images/small-img7.jpg" alt="blog-img" />
                            </a>
                          </div>
                          <div className="card-body">
                            <h3 className="card-title"><a href="blog-single.html">The Castle on the Cliff: Majestic, Magic</a></h3>
                            <p className="card-meta">
                              <span className="post__date"> 1 March, 2020</span>
                              <span className="post-dot" />
                              <span className="post__time">3 Mins read</span>
                            </p>
                          </div>
                        </div>{/* end card-item */}
                        <div className="card-item card-item-list recent-post-card">
                          <div className="card-img">
                            <a href="blog-single.html" className="d-block">
                              <img src="images/small-img8.jpg" alt="blog-img" />
                            </a>
                          </div>
                          <div className="card-body">
                            <h3 className="card-title"><a href="blog-single.html">Change your place and get the fresh air</a></h3>
                            <p className="card-meta">
                              <span className="post__date"> 1 March, 2020</span>
                              <span className="post-dot" />
                              <span className="post__time">3 Mins read</span>
                            </p>
                          </div>
                        </div>{/* end card-item */}
                        <div className="card-item card-item-list recent-post-card mb-0">
                          <div className="card-img">
                            <a href="blog-single.html" className="d-block">
                              <img src="images/small-img9.jpg" alt="blog-img" />
                            </a>
                          </div>
                          <div className="card-body">
                            <h3 className="card-title"><a href="blog-single.html">All Aboard the Rocky Mountaineer</a></h3>
                            <p className="card-meta">
                              <span className="post__date"> 1 March, 2020</span>
                              <span className="post-dot" />
                              <span className="post__time">3 Mins read</span>
                            </p>
                          </div>
                        </div>{/* end card-item */}
                      </div>{/* end tab-pane */}
                      <div className="tab-pane " id="new" role="tabpanel" aria-labelledby="new-tab">
                        <div className="card-item card-item-list recent-post-card">
                          <div className="card-img">
                            <a href="blog-single.html" className="d-block">
                              <img src="images/small-img7.jpg" alt="blog-img" />
                            </a>
                          </div>
                          <div className="card-body">
                            <h3 className="card-title"><a href="blog-single.html">The Castle on the Cliff: Majestic, Magic</a></h3>
                            <p className="card-meta">
                              <span className="post__date"> 1 March, 2020</span>
                              <span className="post-dot" />
                              <span className="post__time">3 Mins read</span>
                            </p>
                          </div>
                        </div>{/* end card-item */}
                        <div className="card-item card-item-list recent-post-card">
                          <div className="card-img">
                            <a href="blog-single.html" className="d-block">
                              <img src="images/small-img8.jpg" alt="blog-img" />
                            </a>
                          </div>
                          <div className="card-body">
                            <h3 className="card-title"><a href="blog-single.html">Change your place and get the fresh air</a></h3>
                            <p className="card-meta">
                              <span className="post__date"> 1 March, 2020</span>
                              <span className="post-dot" />
                              <span className="post__time">3 Mins read</span>
                            </p>
                          </div>
                        </div>{/* end card-item */}
                        <div className="card-item card-item-list recent-post-card mb-0">
                          <div className="card-img">
                            <a href="blog-single.html" className="d-block">
                              <img src="images/small-img9.jpg" alt="blog-img" />
                            </a>
                          </div>
                          <div className="card-body">
                            <h3 className="card-title"><a href="blog-single.html">All Aboard the Rocky Mountaineer</a></h3>
                            <p className="card-meta">
                              <span className="post__date"> 1 March, 2020</span>
                              <span className="post-dot" />
                              <span className="post__time">3 Mins read</span>
                            </p>
                          </div>
                        </div>{/* end card-item */}
                      </div>{/* end tab-pane */}
                    </div>
                  </div>{/* end sidebar-widget */}
                  <div className="sidebar-widget">
                    <h3 className="title stroke-shape">Archives</h3>
                    <div className="sidebar-list">
                      <ul className="list-items">
                        <li><i className="la la-dot-circle mr-2 text-color" /><a href="#">June 2015</a></li>
                        <li><i className="la la-dot-circle mr-2 text-color" /><a href="#">May 2016</a></li>
                        <li><i className="la la-dot-circle mr-2 text-color" /><a href="#">April 2017</a></li>
                        <li><i className="la la-dot-circle mr-2 text-color" /><a href="#">February 2019</a></li>
                      </ul>
                    </div>
                  </div>{/* end sidebar-widget */}
                  <div className="sidebar-widget">
                    <h3 className="title stroke-shape">Tag Cloud</h3>
                    <ul className="tag-list">
                      <li><a href="#">Travel</a></li>
                      <li><a href="#">Adventure</a></li>
                      <li><a href="#">Tour</a></li>
                      <li><a href="#">Nature</a></li>
                      <li><a href="#">Island</a></li>
                      <li><a href="#">Parks</a></li>
                      <li><a href="#">Cruise</a></li>
                      <li><a href="#">Mountains</a></li>
                      <li><a href="#">Bar</a></li>
                      <li><a href="#">Beaches</a></li>
                      <li><a href="#">Nightlife</a></li>
                    </ul>
                  </div>{/* end sidebar-widget */}
                  <div className="sidebar-widget">
                    <h3 className="title stroke-shape">About us</h3>
                    <div className="sidebar-about">
                      <div className="sidebar-about-img">
                        <img src="images/book24logo.png" alt="" />
                        <p className="font-size-28 font-weight-bold text-white">Book24</p>
                      </div>
                      <p className="pt-3">Your One-Stop Travel and Event Booking Solution</p>
                    </div>
                  </div>{/* end sidebar-widget */}
                  <div className="sidebar-widget">
                    <h3 className="title stroke-shape">Follow &amp; Connect</h3>
                    <ul className="social-profile">
                      <li><a href="https://facebook.com/book24.ng"><i className="lab la-facebook-f" /></a></li>
                      <li><a href="https://twitter.com/book24.ng"><i className="lab la-twitter" /></a></li>
                      <li><a href="https://instagram.com/book24.ng"><i className="lab la-instagram" /></a></li>
                      <li><a href="https://linkedin.com/company/book24.ng"><i className="lab la-linkedin-in" /></a></li>
                    </ul>
                  </div>{/* end sidebar-widget */}
                </div>{/* end sidebar */}
              </div>{/* end col-lg-4 */}
            </div>{/* end row */}
          </div>{/* end container */}
        </section>{/* end card-area */}
        {/* ================================
    END CARD AREA
================================= */}
        {/* ================================
    START CTA AREA
================================= */}
        <section className="cta-area subscriber-area section-bg-2 padding-top-60px padding-bottom-60px">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="section-heading">
                  <h2 className="sec__title font-size-30 text-white">Subscribe to see Secret Deals</h2>
                </div>{/* end section-heading */}
              </div>{/* end col-lg-7 */}
              <div className="col-lg-5">
                <div className="subscriber-box">
                  <div className="contact-form-action">
                    <form action="#">
                      <div className="input-box">
                        <label className="label-text text-white">Enter email address</label>
                        <div className="form-group mb-0">
                          <span className="la la-envelope form-icon" />
                          <input className="form-control" type="email" name="email" placeholder="Email address" />
                          <button className="theme-btn theme-btn-small submit-btn" type="submit">Subscribe</button>
                          <span className="font-size-14 pt-1 text-white-50"><i className="la la-lock mr-1" />Don't worry your information is safe with us.</span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>{/* end section-heading */}
              </div>{/* end col-lg-5 */}
            </div>{/* end row */}
          </div>{/* end container */}
        </section>{/* end cta-area */}
        {/* ================================
    END CTA AREA
================================= */}
         <Footer />
        </div>
        <SignInModal />
        <div id="toTop"></div>
        <script src="js/jquery-3.4.1.min.js"></script>
<script src="js/jquery-ui.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/bootstrap-select.min.js"></script>
<script src="js/moment.min.js"></script>
<script src="js/daterangepicker.js"></script>
<script src="js/owl.carousel.min.js"></script>
<script src="js/jquery.fancybox.min.js"></script>
<script src="js/jquery.countTo.min.js"></script>
<script src="js/animated-headline.js"></script>
<script src="js/jquery.filer.min.js"></script>
<script src="js/jquery.ripples-min.js"></script>
<script src="js/quantity-input.js"></script>
{/* <script src="js/copy-text-script.js"></script> */}
{/*<script src="js/navbar-sticky.js"></script>*/}
<script src="js/main.js"></script>
        <script src="js/common_scripts.js"></script>
        <script src="js/functions.js"></script>
        <script src="assets/validate.js"></script>
        <script src="http://maps.googleapis.com/maps/api/js"></script>
        <script src="js/map_single_hotel.js"></script>
        <script src="js/infobox.js"></script>
        <script src="js/input_qty.js"></script>
        <script>{`
	
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
export default withRouter(BlogSingle);
