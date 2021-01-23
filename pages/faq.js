import Head from "next/head";
import React, { Component} from "react";
import Header from '../components/header';
import SignInModal from '../components/signInModal';
import Footer from "../components/footer";
import $ from 'jquery';

class FAQ extends Component {
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
             <meta name="description" content="Book24 - Advanced Travel and Event Booking Solution.."/>
    <meta name="author" content="Book24"/>
    <title>Book24 | Advanced Travel and Event Booking Solution.</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
    <link href="css/bootstrap.min.css" rel="stylesheet"/>
    <link href="css/style.css" rel="stylesheet"/>
	<link href="css/vendors.css" rel="stylesheet"/>
    <link href="css/custom.css" rel="stylesheet"/>
        </Head>
        <div id="page">
		<Header makeBlue={true}/>
		{/* <div className="sub_header_in sticky_header">
		<div className="container">
			<h1>FAQ Section</h1>
		</div>
	</div> */}
	<main>
		<div class="container margin_60_35">
			<div class="row">
				<aside class="col-lg-3" id="faq_cat">
						<div class="box_style_cat" id="faq_box">
							<ul id="cat_nav">
								<li><a href="#booking" class="active"><i class="icon_document_alt"></i>Booking</a></li>
								<li><a href="#payment"><i class="icon_document_alt"></i>Payment</a></li>
								<li><a href="#cancellation"><i class="icon_document_alt"></i>Cancellation</a></li>
								<li><a href="#listing"><i class="icon_document_alt"></i>Listing</a></li>
							</ul>
						</div>
						{/*/sticky */}
				</aside>
				{/*/aside */}
				
				<div class="col-lg-9" id="faq">
					<h4 class="nomargin_top">Booking</h4>
					<div role="tablist" class="add_bottom_45 accordion_2" id="booking">
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a data-toggle="collapse" href="#collapseOne_booking" aria-expanded="true"><i class="indicator ti-minus"></i>Will i get a confirmation when I make a reservation.</a>
								</h5>
							</div>

							<div id="collapseOne_booking" class="collapse show" role="tabpanel" data-parent="#booking">
								<div class="card-body">
									<p>Yes, you will get a confirmation email and SMS from us when you make a reservation on our website or mobile apps</p>
								</div>
							</div>
						</div>
						{/* /card */}
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseTwo_booking" aria-expanded="false">
										<i class="indicator ti-plus"></i>Where can I check my booking details and status?
									</a>
								</h5>
							</div>
							<div id="collapseTwo_booking" class="collapse" role="tabpanel" data-parent="#booking">
								<div class="card-body">
									<p>You can always view your booking details and status online by signing in and selecting "My bookings" from the account menu. If you don't know your sign in details, you can follow the "My bookings" link in your confirmation email.</p>
									
								</div>
							</div>
						</div>
						{/* /card */}
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseThree_booking" aria-expanded="false">
										<i class="indicator ti-plus"></i>I have not received my booking confirmation and cannot locate my booking online.
									</a>
								</h5>
							</div>
							<div id="collapseThree_booking" class="collapse" role="tabpanel" data-parent="#booking">
								<div class="card-body">
									<p> In most cases, you will receive your booking confirmation (PDF file) by email within 30 minutes of booking completion. If you still haven't received it after that time, please check your junk mail and/or spam folders. You can also view your booking details and status online by signing in and selecting "My bookings" from the account menu. If you still cannot locate your booking and have not received your booking confirmation after 24 hours, please feel free to contact us.</p>
								</div>
							</div>
						</div>
						{/* /card */}
						
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseFour_booking" aria-expanded="false">
										<i class="indicator ti-plus"></i>How can I get more information about the room or property's facility?
									</a>
								</h5>
							</div>
							<div id="collapseFour_booking" class="collapse" role="tabpanel" data-parent="#booking">
								<div class="card-body">
									<p>You can find details about the property in your confirmation email or on the property detail page. For anything else, you can also contact property directly.</p>
									
								</div>
							</div>
						</div>
						{/* /card */}
					</div>
					{/* /accordion payment */}
					
					<h4 class="nomargin_top">Payment</h4>
					<div role="tablist" class="add_bottom_45 accordion_2" id="payment">
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a data-toggle="collapse" href="#collapseOne_payment" aria-expanded="true"><i class="indicator ti-plus"></i>Are my payment details secure?</a>
								</h5>
							</div>

							<div id="collapseOne_payment" class="collapse" role="tabpanel" data-parent="#payment">
								<div class="card-body">
									<p>Yes, your details are secure because all payments are processed through secure chanels</p>
								</div>
							</div>
						</div>
						{/* /card */}
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseTwo_payment" aria-expanded="false">
										<i class="indicator ti-plus"></i>Can i reserve a service and pay later?
									</a>
								</h5>
							</div>
							<div id="collapseTwo_payment" class="collapse" role="tabpanel" data-parent="#payment">
								<div class="card-body">
									<p>For hotels, yes you can reserve online and choose to pay at the hotel</p>
									<p>But for events, tours, and flight, you can only pay online so we can confirm your booking. </p>
								</div>
							</div>
						</div>
						{/* /card */}
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseThree_payment" aria-expanded="false">
										<i class="indicator ti-plus"></i>How soon will my payment be processed
									</a>
								</h5>
							</div>
							<div id="collapseThree_payment" class="collapse" role="tabpanel" data-parent="#payment">
								<div class="card-body">
									<p>All payments are processed instantly, except for declined payments which could be as a result of wrong payment details or issue with your financial institution</p>
								</div>
							</div>
						</div>
						{/* /card */}
					</div>
					{/* /accordion cancellation */}
					
					<h4 class="nomargin_top">Cancellation</h4>
					<div role="tablist" class="add_bottom_45 accordion_2" id="cancellation">
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a data-toggle="collapse" href="#collapseOne_cancellation" aria-expanded="true"><i class="indicator ti-plus"></i>How can I cancel my booking?</a>
								</h5>
							</div>

							<div id="collapseOne_cancellation" class="collapse" role="tabpanel" data-parent="#cancellation">
								<div class="card-body">
									<p>You can cancel your booking online on the book24 website or app. Any cancellation fees are determined by the property/service and listed in your cancellation policy.


									</p>
								</div>
							</div>
						</div>
						{/* /card */}
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseTwo_cancellation" aria-expanded="false">
										<i class="indicator ti-plus"></i>Will I be charged if I cancel my booking?
									</a>
								</h5>
							</div>
							<div id="collapseTwo_cancellation" class="collapse" role="tabpanel" data-parent="#cancellation">
								<div class="card-body">
									<p>If you have a free cancellation booking, you won't pay a cancellation fee. If your booking is no longer free to cancel or is non-refundable, you may incur a cancellation fee. Any cancellation fees for a booking is determined by the property.</p>
								</div>
							</div>
						</div>
						{/* /card */}
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseThree_cancellation" aria-expanded="false">
										<i class="indicator ti-plus"></i>Where can I find the cancellation policy?
									</a>
								</h5>
							</div>
							<div id="collapseThree_cancellation" class="collapse" role="tabpanel" data-parent="#cancellation">
								<div class="card-body">
									<p>When searching for the room, you should be able to find the booking conditions and the cancellation policy along with other room information. You can also find this information on your booking voucher.</p>
								</div>
							</div>
						</div>
						{/* /card */}
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseFour_cancellation" aria-expanded="false">
										<i class="indicator ti-plus"></i>When will I get my refund?
									</a>
								</h5>
							</div>
							<div id="collapseFour_cancellation" class="collapse" role="tabpanel" data-parent="#cancellation">
								<div class="card-body">
									<p>Refunds, if applicable, will immediately be submitted to our bank. From the submission/refund date, banks may take up to 30 days to refund this amount, or until your next billing cycle. The refund should be converted to your local currency by your credit card company.</p>
								</div>
							</div>
						</div>
						{/* /card */}
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseFive_cancellation" aria-expanded="false">
										<i class="indicator ti-plus"></i>How do I know if my booking was cancelled?
									</a>
								</h5>
							</div>
							<div id="collapseFive_cancellation" class="collapse" role="tabpanel" data-parent="#cancellation">
								<div class="card-body">
									<p>After you cancel a booking with us, you should receive an email confirming the cancellation. Check your inbox and spam/junk mail folders.</p>
								</div>
							</div>
						</div>
						{/* /card */}
					</div>
					{/* /accordion cancellation */}
					
					<h4 class="nomargin_top">Add Listing</h4>
					<div role="tablist" class="add_bottom_45 accordion_2" id="listing">
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a data-toggle="collapse" href="#collapseOne_listing" aria-expanded="true"><i class="indicator ti-plus"></i>Does Book24.ng charge for adding a property to it’s website?.</a>
								</h5>
							</div>

							<div id="collapseOne_listing" class="collapse" role="tabpanel" data-parent="#listing">
								<div class="card-body">
									<p>No. Book24.ng does not charge for adding properties/hotels to it’s web/mobile apps.</p>
								</div>
							</div>
						</div>
						{/* /card */}
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseTwo_listing" aria-expanded="false">
										<i class="indicator ti-plus"></i>  Does Book24 collect any commisions on properties?.
									</a>
								</h5>
							</div>
							<div id="collapseTwo_listing" class="collapse" role="tabpanel" data-parent="#listing">
								<div class="card-body">
									<p>Yes. The commission rate is disclosed upon uploading your property to book24.ng.</p>
								</div>
							</div>
						</div>
						{/* /card */}
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseThree_listing" aria-expanded="false">
										<i class="indicator ti-plus"></i>How long does a property last on book24.ng.
									</a>
								</h5>
							</div>
							<div id="collapseThree_listing" class="collapse" role="tabpanel" data-parent="#listing">
								<div class="card-body">
									<p>Properties on book24.ng are never deleted. Any property added on book24.ng is permanent, but also subject to modifications.</p>
								</div>
							</div>
						</div>
						{/* /card */}
					</div>
					{/* /accordion listing */}
					
					
				</div>
				{/* /col */}
			</div>
			{/* row */}
		</div>
		{/*/container*/}
	</main>
	<Footer/>
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
export default FAQ;
