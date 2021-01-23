import Head from "next/head";
import React, { Component} from "react";
import Header from '../components/header';
import SignInModal from '../components/signInModal';
import Footer from "../components/footer";
import $ from 'jquery';

class Terms extends Component {
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
			<h1>Terms Section</h1>
		</div>
	</div> */}
	<main>
    <div className="container margin_60_35">
			<div className="row">
				<aside className="col-lg-3" id="faq_cat">
						<div className="box_style_cat" id="faq_box">
							<ul id="cat_nav">
								<li><a href="#terms-and-conditions" className="active"><i className="icon_document_alt"></i>Terms And Conditions</a></li>
								
							</ul>
						</div>
				</aside>
				
				<div className="col-lg-9" id="privacy">
					<h4 className="nomargin_top">Terms And Conditions</h4>
					<div role="tablist" className="add_bottom_45 accordion_2" id="terms-and-conditions">
						<div className="card">
							<div className="card-header" role="tab">
								<h5 className="mb-0">
									<a data-toggle="expand" href="#expandOne_terms-and-conditions" aria-expanded="true"><i className="indicator ti-minus"></i>Terms And Conditions</a>
								</h5>
							</div>

							<div id="expandOne_terms-and-conditions" className="expand show" role="tabpanel" data-parent="#terms-and-conditions">
								<div className="card-body">
                                <p>These terms and conditions apply to all types of services Book24.ng offers, both direct or indirect. The terms “you”, and “customer” refer to the individual person or corporation who subscribes to our platform and offers, creates an account with us or makes a booking (whether complete/incomplete, successful/unsuccessful) through this website. The terms “Final Party” and “service Provider” refers to the hotel, event, tour, rental, car (not limited to organisations that go by ‘the specified names’ only, but also applies to ‘any related service provider’) that is advertised on Book24.ng regardless of whether a signed deal between us and them exists or does not.</p>
									<p>Terms and conditions may be revised and modified occasionally, hence, it is advisable not to familiarise yourself with them at any point in time, but review them each and every time you use any of our services. Services (direct and indirect) apply to everything provided online, through mobile devices and computers of all platforms, by email, telephone, post or through direct contact with our staff. You accept that you have read, understood and agreed to the terms and conditions (as well as our privacy policy) below, if and when you make use of our service in any way, including but not limited to browsing this website, rating or giving reviews, commenting on a review, or making a reservation.</p>
										
										
									<p><strong>Legal Use</strong></p>
								<p>Your utilisation of any of our services warrant that you will not make unlawful use of this website or any contents and materials we provide through other means with which we correspond with you or final parties on your behalf.</p>
										
										 
								<p><strong>Our Service Scope</strong></p>
								<p>Book24.ng provides temporary accommodation of all types, which include event halls, motels, hotels, apartments, etc, car rentals and travel bookings. </p><p>The provision of these services are found on the website through which you can book for your chosen service. By placing a reservation through us, you enter into a legally binding agreement with the direct service provider (hotel, event managers, car rental agents and the likes) with which your reservation is made to. </p> Right after your reservation is placed, Book24.ng acts simply as a mediator between you and the service provider.
								We pass along information you have provided towards placing a reservation unto the final party and relay confirmation messages, updates and invoices back to you via SMS and email for and on their behalf. The accuracy of information provided on the website is exclusive to the service providers who are responsible for updating their accounts with Book24.ng on their current status. Though we aim to provide information about final parties which are as correct as possible, we will not confirm, neither will we guarantee that they are complete or accurate.
								Any recommendations on our website are not given by us, we do not verify them and therefore cannot give assurance about them. We will only offer suggestions based on criteria provided by you, but choices made by you are entirely your decision and any disappointments that is met cannot amount to a liability that we would bear.
								
								<p><strong>Price Guarantee and Currency Exchange Rates</strong></p>
								<p>We offer three ways to make payment. There is an option to Pay in Cash on Your Arrival at the hotel, in which case, Book24.ng cannot guarantee that your reservation will be kept for you until you arrive, or that we will inform you about cancellations before you arrive, and we are not responsible for any disappointments that may be faced by choosing this payment method or a hotel that accepts only it. With some hotels, you are only able to make payment for your reservation using this medium.</p>
									<p>We present another option to pay into our locally operated Bank Account; you can pay money in three different ways: if you are not in Nigeria, an international bank transfer can be done, if you are situated anywhere within Nigeria, a local online bank transfer can be done or you may pay money directly into our bank account at any recognised branch of the bank we operate with.</p>
								<p>The third payment option we offer is through the use of ATM Cards. You can pay with your ATM card through a third party link we provide on the website and mobile apps. Book24.ng does not process any other type of card payments, including credit card payments. Any amount charged to you will be in Nigerian Naira. Tax rates and foreign exchange rates could change in the time between booking and stay.</p>
									<p><strong>Third Parties</strong></p>
								<p>Backlinks to websites operated by other parties may be found on this website and are provided for reference purposes only. We do not in any way imply an endorsement of the contents and operations on such websites. Book24.ng does not participate in their management and is not responsible for your use of these websites.</p>
								<p><strong>Cancellation and no-show policy</strong></p>
								<p>Cancellation policies are two sides of a coin. By booking through Book24.ng you accept both the cancellation and no-show terms of the service provider and ours. Book24.ng will give full refund of amount paid but not yet transferred to the service provider. Refunds of money already paid to the final party will attract their cancellation/no-show charges and also have our delivery/execution of operations cost deducted. If you pay directly to the service provider, Book24.ng will not be accountable for or entitled to reimburse these types of payments. Any of such refunds that come through us are only so on request by the service provider and are not in any way our obligation.
								Service providers can only apply cancellation charges to payments already received by them and are fully responsible for payments made directly by clients either on arrival or through electronic means. Book24.ng will not be answerable to any incidence of late or no payment by the customer to the service provider. To that end, we advice all final parties (having a signed deal with us or not) to ensure they provide alternative means of receiving long distance payments, much preferably in the form of a Nigerian Bank Account.</p>
								<p><strong>Refund policy</strong></p>
								<p>Refund of payment already paid to your preferred service provider is subject to their cancellation/no show charge. Payment not paid to the service provider at the time of cancellation attracts 100% refund.</p>
								<p><strong>Further Correspondence</strong></p>
								<p>Right after you make a reservation through the website, we will send a confirmation of receipt of this request and send subsequent emails and SMSs to keep you updated on the booking progress. You will most likely confirm your booking through  SMS and email. (Please note that some service providers either do not reserve their spaces or cannot guaranty the availability of your desired room/suite/apartment/tour/hall/ etc without prepayment).</p>
							<p>We will remain in touch with you from the day you make your reservation, up until a few. Days after you checkout to ensure you had a pleasant experience. We also welcome your feedback on services on our platforms.</p>
							<p><strong>Customer Ratings and Reviews</strong></p>
							<p>Ratings and reviews of services are given by the public. Book24.ng has no control over the rating tendencies and we cannot guarantee that the reviews are accurate or true, most of which are solely dependent on the likes and dislikes of the individual.</p>
							<p><strong>Disclaimer</strong></p>
							<p>Book24.ng bears no responsibility for any liability that may arise from the booking service, either to the service provider, customer or any government agency. All final parties that offer Pay on Arrival options are liable for any loss they may incure and have to take their own measures to ensure they receive payments from customers.</p>
								
								
								</div>
							</div>
						</div>

				</div>
			</div>
		</div></div>
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
export default Terms;
