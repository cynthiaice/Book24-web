import Head from "next/head";
import React, { Component} from "react";
import Header from '../components/header';
import SignInModal from '../components/signInModal';
import Footer from "../components/footer";
import $ from 'jquery';

class DetailEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {}
  
  render() {
    return (
      <div>
        <Head>
             <meta name="description" content="Book24 - Advanced Travel and Event Booking Solution"/>
    <meta name="author" content="Book24"/>
    <title>Book24 | Premium directory of hotels, tours, events, rentals and
            many more.</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
    <link href="css/bootstrap.min.css" rel="stylesheet"/>
    <link href="css/style.css" rel="stylesheet"/>
	<link href="css/vendors.css" rel="stylesheet"/>
    <link href="css/custom.css" rel="stylesheet"/>
        </Head>
        <div id="page">
		<Header/>
	
        <main>		
		<div className="hero_in hotels_detail">
			<div className="wrapper">
				<span className="magnific-gallery">
					<a href="img/gallery/hotel_list_1.jpg" className="btn_photos" title="Photo title" data-effect="mfp-zoom-in">View photos</a>
					<a href="img/gallery/hotel_list_2.jpg" title="Photo title" data-effect="mfp-zoom-in"></a>
					<a href="img/gallery/hotel_list_3.jpg" title="Photo title" data-effect="mfp-zoom-in"></a>
				</span>
			</div>
		</div>
		{/*<!--/hero_in--> */}
		
		<nav className="secondary_nav sticky_horizontal_2">
			<div className="container">
				<ul className="clearfix">
					<li><a href="#description" className="active">Description</a></li>
					<li><a href="#reviews">Reviews</a></li>
					<li><a href="#sidebar">Booking</a></li>
				</ul>
			</div>
		</nav>

		<div className="container margin_60_35">
				<div className="row">
					<div className="col-lg-8">
						<section id="description">
							<div className="detail_title_1">
								<div className="cat_star"><i className="icon_star"></i><i className="icon_star"></i><i className="icon_star"></i><i className="icon_star"></i></div>
								<h1>Hotel Mariott</h1>
								<a className="address" href="https://www.google.com/maps/dir//Assistance+%E2%80%93+H%C3%B4pitaux+De+Paris,+3+Avenue+Victoria,+75004+Paris,+Francia/@48.8606548,2.3348734,14z/data=!4m15!1m6!3m5!1s0x47e66e1de36f4147:0xb6615b4092e0351f!2sAssistance+Publique+-+H%C3%B4pitaux+de+Paris+(AP-HP)+-+Si%C3%A8ge!8m2!3d48.8568376!4d2.3504305!4m7!1m0!1m5!1m1!1s0x47e67031f8c20147:0xa6a9af76b1e2d899!2m2!1d2.3504327!2d48.8568361">438 Rush Green Road, Romford</a>
							</div>
							<p>Per consequat adolescens ex, cu nibh commune <strong>temporibus vim</strong>, ad sumo viris eloquentiam sed. Mea appareat omittantur eloquentiam ad, nam ei quas oportere democritum. Prima causae admodum id est, ei timeam inimicus sed. Sit an meis aliquam, cetero inermis vel ut. An sit illum euismod facilisis, tamquam vulputate pertinacia eum at.</p>
							<p>Cum et probo menandri. Officiis consulatu pro et, ne sea sale invidunt, sed ut sint <strong>blandit</strong> efficiendi. Atomorum explicari eu qui, est enim quaerendum te. Quo harum viris id. Per ne quando dolore evertitur, pro ad cibo commune.</p>
							<h5 className="add_bottom_15">Amenities</h5>
							<div className="row add_bottom_30">
								<div className="col-lg-6">
									<ul className="bullets">
										<li>Dolorem mediocritatem</li>
										<li>Mea appareat</li>
										<li>Prima causae</li>
										<li>Singulis indoctum</li>
									</ul>
								</div>
								<div className="col-lg-6">
									<ul className="bullets">
										<li>Timeam inimicus</li>
										<li>Oportere democritum</li>
										<li>Cetero inermis</li>
										<li>Pertinacia eum</li>
									</ul>
								</div>
							</div>
							{/*<!-- /row --> */}						
							<hr/>
							<div className="room_type first">
								<div className="row">
									<div className="col-md-4">
										<img src="/images/gallery/hotel_list_1.jpg" className="img-fluid" alt=""/>
									</div>
									<div className="col-md-8">
										<h4>Single Room</h4>
										<p>Sit an meis aliquam, cetero inermis vel ut. An sit illum euismod facilisis, tamquam vulputate pertinacia eum at.</p>
										<ul className="hotel_facilities">
											<li><img src="/images/hotel_facilites_icon_2.svg" alt=""/>Single Bed</li>
											<li><img src="/images/hotel_facilites_icon_4.svg" alt=""/>Free Wifi</li>
											<li><img src="/images/hotel_facilites_icon_5.svg" alt=""/>Shower</li>
											<li><img src="/images/hotel_facilites_icon_7.svg" alt=""/>Air Condition</li>
											<li><img src="/images/hotel_facilites_icon_8.svg" alt=""/>Hairdryer</li>
										</ul>
									</div>
								</div>
								{/*<!-- /row --> */}
							</div>
							{/*<!-- /rom_type --> */}
							<div className="room_type alternate">
								<div className="row">
									<div className="col-md-4">
										<img src="/images/gallery/hotel_list_2.jpg" className="img-fluid" alt=""/>
									</div>
									<div className="col-md-8">
										<h4>Double Room</h4>
										<p>Sit an meis aliquam, cetero inermis vel ut. An sit illum euismod facilisis, tamquam vulputate pertinacia eum at.</p>
										<ul className="hotel_facilities">
											<li><img src="/images/hotel_facilites_icon_3.svg" alt=""/>Double Bed</li>
											<li><img src="/images/hotel_facilites_icon_4.svg" alt=""/>Free Wifi</li>
											<li><img src="/images/hotel_facilites_icon_6.svg" alt=""/>Bathtub</li>
											<li><img src="/images/hotel_facilites_icon_7.svg" alt=""/>Air Condition</li>
											<li><img src="/images/hotel_facilites_icon_8.svg" alt=""/>Hairdryer</li>
										</ul>
									</div>
								</div>
								{/*<!-- /row --> */}
							</div>
							{/*<!-- /rom_type --> */}
							<div className="room_type last">
								<div className="row">
									<div className="col-md-4">
										<img src="/images/gallery/hotel_list_3.jpg" className="img-fluid" alt=""/>
									</div>
									<div className="col-md-8">
										<h4>Suite Room</h4>
										<p>Sit an meis aliquam, cetero inermis vel ut. An sit illum euismod facilisis, tamquam vulputate pertinacia eum at.</p>
										<ul className="hotel_facilities">
											<li><img src="/images/hotel_facilites_icon_3.svg" alt=""/>King size Bed</li>
											<li><img src="/images/hotel_facilites_icon_4.svg" alt=""/>Free Wifi</li>
											<li><img src="/images/hotel_facilites_icon_6.svg" alt=""/>Bathtub</li>
											<li><img src="/images/hotel_facilites_icon_7.svg" alt=""/>Air Condition</li>
											<li><img src="/images/hotel_facilites_icon_9.svg" alt=""/>Swimming pool</li>
											<li><img src="/images/hotel_facilites_icon_3.svg" alt=""/>Hairdryer</li>
										</ul>
									</div>
								</div>
								{/*<!-- /row --> */}
							</div>
							{/*<!-- /rom_type --> */}
							<hr/>
							<h3>Prices</h3>
							<table className="table table-striped add_bottom_45">
								<tbody>
									<tr>
										<td>Low (from 23/03 to 31/05)</td>
										<td>140$</td>
									</tr>
									<tr>
										<td>Middle (from 23/03 to 31/05)</td>
										<td>180$</td>
									</tr>
									<tr>
										<td>High (from 23/03 to 31/05)</td>
										<td>200$</td>
									</tr>
								</tbody>
							</table>
							<hr/>
							<h3>Location</h3>
							<div id="map" className="map map_single add_bottom_45"></div>
							{/*<!-- End Map --> */}
						</section>
						{/*<!-- /section --> */}
					
						<section id="reviews">
							<h2>Reviews</h2>
							<div className="reviews-container add_bottom_30">
								<div className="row">
									<div className="col-lg-3">
										<div id="review_summary">
											<strong>8.5</strong>
											<em>Superb</em>
											<small>Based on 4 reviews</small>
										</div>
									</div>
									<div className="col-lg-9">
										<div className="row">
											<div className="col-lg-10 col-9">
												<div className="progress">
													<div className="progress-bar" role="progressbar" style={{width: "90%"}} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											<div className="col-lg-2 col-3"><small><strong>5 stars</strong></small></div>
										</div>
										<div className="row">
											<div className="col-lg-10 col-9">
												<div className="progress">
													<div className="progress-bar" role="progressbar" style={{width: "95%"}} aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											<div className="col-lg-2 col-3"><small><strong>4 stars</strong></small></div>
										</div>
										<div className="row">
											<div className="col-lg-10 col-9">
												<div className="progress">
													<div className="progress-bar" role="progressbar" style={{width: "60%"}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											<div className="col-lg-2 col-3"><small><strong>3 stars</strong></small></div>
										</div>
										<div className="row">
											<div className="col-lg-10 col-9">
												<div className="progress">
													<div className="progress-bar" role="progressbar" style={{width: "20%"}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											<div className="col-lg-2 col-3"><small><strong>2 stars</strong></small></div>
										</div>
										<div className="row">
											<div className="col-lg-10 col-9">
												<div className="progress">
													<div className="progress-bar" role="progressbar" style={{width: 0}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											<div className="col-lg-2 col-3"><small><strong>1 stars</strong></small></div>
										</div>
									</div>
								</div>
							</div>

							<div className="reviews-container">

								<div className="review-box clearfix">
									<figure className="rev-thumb"><img src="/images/avatar1.jpg" alt=""/>
									</figure>
									<div className="rev-content">
										<div className="rating">
											<i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star"></i>
										</div>
										<div className="rev-info">
											Admin – April 03, 2016:
										</div>
										<div className="rev-text">
											<p>
												Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
											</p>
										</div>
									</div>
								</div>
								<div className="review-box clearfix">
									<figure className="rev-thumb"><img src="/images/avatar2.jpg" alt=""/>
									</figure>
									<div className="rev-content">
										<div className="rating">
											<i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star"></i>
										</div>
										<div className="rev-info">
											Ahsan – April 01, 2016:
										</div>
										<div className="rev-text">
											<p>
												Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
											</p>
										</div>
									</div>
								</div>
								<div className="review-box clearfix">
									<figure className="rev-thumb"><img src="/images/avatar3.jpg" alt=""/>
									</figure>
									<div className="rev-content">
										<div className="rating">
											<i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star"></i>
										</div>
										<div className="rev-info">
											Sara – March 31, 2016:
										</div>
										<div className="rev-text">
											<p>
												Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
											</p>
										</div>
									</div>
								</div>
							</div>
						</section>
						<hr/>

							<div className="add-review">
								<h5>Leave a Review</h5>
								<form>
									<div className="row">
										<div className="form-group col-md-6">
											<label>Name and Lastname *</label>
											<input type="text" name="name_review" id="name_review" placeholder="" className="form-control"/>
										</div>
										<div className="form-group col-md-6">
											<label>Email *</label>
											<input type="email" name="email_review" id="email_review" className="form-control"/>
										</div>
										<div className="form-group col-md-6">
											<label>Rating </label>
											<div className="custom-select-form">
											<select name="rating_review" id="rating_review" className="wide">
												<option value="1">1 (lowest)</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
												<option value="5" selected>5 (medium)</option>
												<option value="6">6</option>
												<option value="7">7</option>
												<option value="8">8</option>
												<option value="9">9</option>
												<option value="10">10 (highest)</option>
											</select>
											</div>
										</div>
										<div className="form-group col-md-12">
											<label>Your Review</label>
											<textarea name="review_text" id="review_text" className="form-control" style={{height:"130px"}}></textarea>
										</div>
										<div className="form-group col-md-12 add_top_20 add_bottom_30">
											<input type="submit" value="Submit" className="btn_1" id="submit-review"/>
										</div>
									</div>
								</form>
							</div>
					</div>
					<aside className="col-lg-4" id="sidebar">
						<div className="box_detail booking">
							<div className="price">
								<span>45$ <small>person</small></span>
								<div className="score"><span>Good<em>350 Reviews</em></span><strong>7.0</strong></div>
							</div>

							<div className="form-group" id="input-dates">
								<input className="form-control" type="text" name="dates" placeholder="When.."/>
								<i className="icon_calendar"></i>
							</div>

							<div className="dropdown">
								<a href="#" data-toggle="dropdown">Guests <span id="qty_total">0</span></a>
								<div className="dropdown-menu dropdown-menu-right">
									<div className="dropdown-menu-content">
										<label>Adults</label>
										<div className="qty-buttons">
											<input type="button" value="+" className="qtyplus" name="adults"/>
											<input type="text" name="adults" id="adults" value="0" className="qty"/>
											<input type="button" value="-" className="qtyminus" name="adults"/>
										</div>
									</div>
									<div className="dropdown-menu-content">
										<label>Childrens</label>
										<div className="qty-buttons">
											<input type="button" value="+" className="qtyplus" name="child"/>
											<input type="text" name="child" id="child" value="0" className="qty"/>
											<input type="button" value="-" className="qtyminus" name="child"/>
										</div>
									</div>
								</div>
							</div>
							<div className="form-group clearfix">
								<div className="custom-select-form">
									<select className="wide">
										<option>Room Type</option>	
										<option>Single Room</option>
										<option>Double Room</option>
										<option>Suite Room</option>
									</select>
								</div>
							</div>
							<a href="checkout.html" className=" add_top_30 btn_1 full-width purchase">Purchase</a>
							<a href="wishlist.html" className="btn_1 full-width outline wishlist"><i className="icon_heart"></i> Add to wishlist</a>
							<div className="text-center"><small>No money charged in this step</small></div>
						</div>
						<ul className="share-buttons">
							<li><a className="fb-share" href="#0"><i className="social_facebook"></i> Share</a></li>
							<li><a className="twitter-share" href="#0"><i className="social_twitter"></i> Share</a></li>
							<li><a className="gplus-share" href="#0"><i className="social_googleplus"></i> Share</a></li>
						</ul>
					</aside>
				</div>
		</div>
	</main>
	<Footer/>
	</div>
	<SignInModal />	
	<div id="toTop"></div>
    <script src="js/common_scripts.js"></script>
	<script src="js/functions.js"></script>
	<script src="assets/validate.js"></script>
	<script src="http://maps.googleapis.com/maps/api/js"></script>
	<script src="js/map_single_hotel.js"></script>
	<script src="js/infobox.js"></script>
	<script src="js/input_qty.js"></script>
	<script>{`
	$(function() {
	  $('input[name="dates"]').daterangepicker({
		  autoUpdateInput: false,
		  parentEl:'#input-dates',
		  opens: 'left',
		  locale: {
			  cancelLabel: 'Clear'
		  }
	  });
	  $('input[name="dates"]').on('apply.daterangepicker', function(ev, picker) {
		  $(this).val(picker.startDate.format('MM-DD-YY') + ' > ' + picker.endDate.format('MM-DD-YY'));
	  });
	  $('input[name="dates"]').on('cancel.daterangepicker', function(ev, picker) {
		  $(this).val('');
	  });
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
export default DetailEvent;