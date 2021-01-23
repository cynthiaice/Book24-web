import React, { useState, useEffect, Component } from "react";
import Cookies from "js-cookie";

class DetailsHeader extends Component{
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

	  render(){
    return (
        <header className="header_in">
		<div className="container">
			<div className="row">
				<div className="col-lg-3 col-12">
					<div id="logo">
						<a href="/">
		{/* <p className="hellix-medium-blue-18">Book24</p> */}
							<img src="/images/logo_sticky.svg" width="165" height="35" alt="" className="logo_sticky"/>
						</a>
					</div>
				</div>
				<div className="col-lg-9 col-12">
					<ul id="top_menu">
						<li><a href="account.html" className="btn_add">Add Listing</a></li>
						<li><a href="#sign-in-dialog" id="sign-in" className="login" title="Sign In">Sign In</a></li>
						<li><a href="wishlist.html" className="wishlist_bt_top" title="Your wishlist">Your wishlist</a></li>
					</ul>
					<a href="#menu" className="btn_mobile">
						<div className="hamburger hamburger--spin" id="hamburger">
							<div className="hamburger-box">
								<div className="hamburger-inner"></div>
							</div>
						</div>
					</a>
					<nav id="menu" className="main-menu">
		    <ul>
		        <li><span><a href="#0">Home</a></span>
		            <ul>
		                <li><a href="/">Home version 1</a></li>
		                <li><a href="index-2.html">Home version 2</a></li>
		                <li><a href="index-3.html">Home version 3</a></li>
		                <li><a href="index-4.html">Home version 4</a></li>
		                <li><a href="index-5.html">Home version 5</a></li>
		                <li><a href="index-6.html">Home version 6 (GDPR)</a></li>
		                <li><a href="index-7.html">Src Address Autocomplete</a></li>
		            </ul>
		        </li>
		        <li><span><a href="#0">Listings</a></span>
		            <ul>
		                <li>
		                    <span><a href="#0">Grid Layout</a></span>
		                    <ul>
		                        <li><a href="grid-listings-filterscol-search-aside.html">Sidebar+Search mobile 1</a></li>
		                        <li><a href="grid-listings-filterstop-search-aside.html">Full+Search mobile 1</a></li>
		                        <li><a href="grid-listings-filterscol.html">Sidebar+Search mobile 2</a></li>
		                        <li><a href="grid-listings-filterstop.html">Full+Search mobile 2</a></li>
		                        <li><a href="grid-listings-isotope.html">Full+Isotope filter</a></li>
		                    </ul>
		                </li>
		                <li>
		                    <span><a href="#0">Row Layout</a></span>
		                    <ul>
		                        <li><a href="row-listings-filterscol-search-aside.html">Sidebar+Search mobile 1</a></li>
		                        <li><a href="row-listings-filterstop-search-aside.html">Full+Search mobile 1</a></li>
		                        <li><a href="row-listings-filterscol.html">Sidebar+Search mobile 2</a></li>
		                        <li><a href="row-listings-filterstop.html">Full+Search mobile 2</a></li>
		                        <li><a href="row-listings-isotope.html">Full+Isotope filter</a></li>
		                    </ul>
		                </li>
		                <li><a href="listing-map.html">Listing Map</a></li>
		                 <li>
		                    <span><a href="#0">Open Street Map</a></span>
		                    <ul>
								<li><a href="grid-listings-filterscol-search-aside-openstreetmap.html">Sidebar+Search mobile 1</a></li>
								<li><a href="grid-listings-filterstop-search-aside-openstreetmap.html">Full+Search mobile 1</a></li>
								<li><a href="grid-listings-filterscol-openstreetmap.html">Sidebar+Search mobile 2</a></li>
								<li><a href="grid-listings-filterstop-openstreetmap.html">Full+Search mobile 2</a></li>
								<li><a href="grid-listings-isotope-openstreetmap.html">Full+Isotope filter</a></li>
								<li><a href="row-listings-filterscol-search-aside-openstreetmap.html">Sidebar+Search mobile 1</a></li>
								<li><a href="row-listings-filterstop-search-aside-openstreetmap.html">Full+Search mobile 1</a></li>
								<li><a href="row-listings-filterscol-openstreetmap.html">Sidebar+Search mobile 2</a></li>
								<li><a href="row-listings-filterstop-openstreetmap.html">Full+Search mobile 2</a></li>
								<li><a href="row-listings-isotope-openstreetmap.html">Full+Isotope filter</a></li>
								<li><a href="detail-hotel-openstreetmap.html">Detail page 1</a></li>
								<li><a href="listing-map-openstreetmap.html">Listing Map</a></li>
							</ul>
		                </li>
		               <li>
		                    <span><a href="#0">Detail pages</a></span>
		                    <ul>
		                        <li><a href="detail-hotel.html">Detail page 1</a></li>
		                        <li><a href="detail-restaurant.html">Detail page 2</a></li>
		                        <li><a href="detail-shop.html">Detail page 3</a></li>
		                        <li><a href="detail-carousel.html">Detail page Carousel 1</a></li>
		                        <li><a href="detail-carousel-2.html">Detail page Carousel 2</a></li>
		                    </ul>
		                </li>
		                <li><a href="bookings.html">Bookings - Purchases</a></li>
		                <li><a href="checkout.html">Checkout</a></li>
		                <li><a href="confirm.html">Confirm</a></li>
		            </ul>
		        </li>
		        <li><span><a href="#0">Pages</a></span>
		            <ul>
		                <li><a href="admin_section/index.html">Admin section</a></li>
		                <li><a href="blog.html">Blog</a></li>
		                <li><a href="account.html">Account</a></li>
		                <li><a href="help.html">Help Section</a></li>
		                <li><a href="faq.html">FAQ Section</a></li>
		                <li><a href="wishlist.html">Wishlist page</a></li>
		                <li><a href="contacts.html">Contacts</a></li>
		                <li>
		                    <span><a href="#0">Icon Packs</a></span>
		                    <ul>
		                        <li><a href="icon-pack-1.html">Icon pack 1</a></li>
		                        <li><a href="icon-pack-2.html">Icon pack 2</a></li>
		                        <li><a href="icon-pack-3.html">Icon pack 3</a></li>
		                        <li><a href="icon-pack-4.html">Icon pack 4</a></li>
		                    </ul>
		                </li>
		                <li><a href="about.html">About</a></li>
		                <li><a href="media-gallery.html">Media gallery</a></li>
		            </ul>
		        </li>
		        <li><span><a href="#0">Extra</a></span>
		            <ul>
		                <li><a href="404.html">404 page</a></li>
		                <li><a href="contacts-2.html">Contacts 2</a></li>
		                <li><a href="pricing-tables.html">Pricing tables</a></li>
		                <li><a href="login.html">Login</a></li>
		                <li><a href="register.html">Register</a></li>
		                <li><a href="menu-options.html">Menu Options</a></li>
		                <li><a href="invoice.html">Invoice</a></li>
		                <li><a href="coming_soon/index.html">Coming Soon</a></li>
		            </ul>
		        </li>
		        <li><span><a href="#0">Buy template</a></span></li>
		    </ul>
		</nav>
				</div>
			</div>
		</div>
	</header>
	);
	}
}

export default DetailsHeader;