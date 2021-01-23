import Head from "next/head";
import React, { Component} from "react";
import Header from '../components/header';
import SignInModal from '../components/signInModal';
import Footer from "../components/footer";
import $ from 'jquery';

class PrivacyPolicy extends Component {
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
		<div class="container margin_60_35">
			<div class="row">
				<aside class="col-lg-3" id="faq_cat">
						<div class="box_style_cat" id="faq_box">
							<ul id="cat_nav">
								<li><a href="#privacy" class="active"><i class="icon_document_alt"></i>Privacy</a></li>
								
							</ul>
						</div>
				</aside>
				<div class="col-lg-9" id="privacy">
					<h4 class="nomargin_top">Privacy</h4>
					<div role="tablist" class="add_bottom_45 accordion_2" id="privacy">
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a data-toggle="expand" href="#expandOne_payment" aria-expanded="true"><i class="indicator ti-minus"></i>Privacy</a>
								</h5>
							</div>

							<div id="expandOne_privacy" class="expand show" role="tabpanel" data-parent="#payment">
								<div class="card-body">
									<p>Your privacy is important to us. We value your trust and are committed to protecting and safeguarding any personal information you give us. This document, which we update from time to time, describes how we use and process your personal data and how we use cookies. It also tells you how you can contact us if you have questions about your personal information.
										Book24.ng provides online travel services through its own websites and mobile apps and through other online platforms such as partners’ websites and social media. The information that follows applies to all of these platforms.
										
									<p><strong>What kind of personal information does Book24.ng use?</strong></p>
								<p>When you make a reservation, you’ll be asked for your name, address, telephone number, email address, payment details, the names of guests traveling with you and your preferences for your stay.
										To make it easier to manage your reservations, you can open a user account. </p>
									<p>This allows you to save your personal settings, review previous bookings and manage future reservations.
										When you visit our website and/or mobile apps, even if you don’t make a reservation, we may collect certain information, like your IP address, or browser, and information about your computer’s operating system, application version, language settings and pages that have been shown to you. If you’re using a mobile device, we might also collect data that identifies your mobile device, device-specific settings and characteristics and latitude/longitude details.</p>
										We may also receive information about you when you use certain social media services.</p>
										
										
										
										 
										<p><strong>Why does Book24.ng collect, use and share your personal data?</strong></p>
										•	<p><strong>Reservations: </strong>First and foremost, we use your personal data to complete and administer your online reservation and forward your reservation details to the service you have booked.</p>
										•	<p><strong>Customer service:</strong> We provide international customer service 24/7 from our local offices in english language. Sharing your details with our global customer service allows for a quick response when you need us – including helping you find an appropriate service and any questions you might have about your reservation.</p>
										•	<p><strong>Guest reviews: </strong>We may use your contact information to invite you to write a guest review after service rendered. This can help other travelers choose a place to stay that suits them best.</p>
										•	<p><strong>Account administration: </strong>We offer a user account facility on our website and mobile apps. We use the information you give us to administer this, allowing you to manage your bookings, take advantage of special offers, make future reservations more easily and manage your personal settings. Managing personal settings allows you to keep and share lists, share photos, see services that you’ve searched for before, and see other information you’ve provided about services and destinations. It also allows you to see any reviews you submitted about services you’ve used. If you want, you can share certain information in your user account by creating a public profile that’s associated with either your own first name or a screen name of your choice. The type of information you can share on this platform includes your photo, your lists, your plans for future trips, your reviews and other information about services and destinations.</p>
										•	<p><strong>Marketing activities:</strong> We also use your information for marketing activities, as permitted by law. <p>For example:
										o	When you make a reservation with us or set up a user account, we may use your contact information to send you news about similar travel-related products and services. We also send our customers regular newsletters by email. You can opt out, or unsubscribe, from marketing communication at any time.
										o	Based on the information you share with us, individualized offers may be shown to you on the Book24.ng website, in mobile apps or on third-party websites, including social media sites.</p>
										o	When we believe that a particular offer may be of interest to you, we may decide to make contact with you by email and/or phone.</p>
										•	<p><strong>Other communications: </strong>There may be other times when we get in touch by email, or by SMS, depending on the contact information you share with us. There could be a number of reasons for this:
										o	We may need to respond to and handle requests you have made.
										o	If you haven’t finalized a reservation online, we may email you a reminder to continue with your reservation. We believe that this additional service is useful to you because it allows you to carry on with a reservation without having to search for the service items again or fill in all the reservation details from scratch.
										o	When you use our services, we may send you a questionnaire or invite you to provide a review about your experience with Book24.ng.
										o	We may also send you other material related to your reservation, such as how to contact Book24.ng  if you need assistance while you’re away, or a summary of previous reservations you made using Book24.ng.</p>
										•	<p><strong>Market research: </strong>We sometimes ask our customers to take part in market research. Any additional personal details that you give us as part of the market research will only be used with your consent.
										•	Fraud detection and prevention: We may use personal data for the detection and prevention of fraud and other illegal or unwanted activities.</p>
										•	<p><strong>Improving our services:</strong> Finally, we use personal information for analytical purposes, to improve our services, enhance the user experience, and improve the functionality and quality of our online travel services.</p>
										 
									<p><strong>How does Book24.ng use social media?</strong></p>
								<p>We use social media to promote our service partners’ properties and to promote, improve and facilitate our own service website. For example, we integrated social media plugins into the Book24.ng website. So when you click on one of the buttons and register with your social media account, information is shared with your social media provider, and possibly presented on your social media profile to be shared with others in your network.
										In addition to implementing these buttons, Book24.ng uses social media by maintaining accounts on several social media sites and by offering social apps. <p>These social media services may allow you to share information with Book24.ng. When you register with a social media app, you’ll be told which information will be shared with Book24.ng. The information you choose to share with us may include the basic information that’s already available in your social media profile, email address, name etc. This information is necessary to create a unique user experience either in the mobile app itself or on our website. It facilitates things like personalizing our website to suit your needs, connecting you with your friends on travel destinations and analyzing and enhancing our travel-related services.</p>
										We may also enable you to sign in to Book24.ng website and mobile apps with your social media accounts. Your social media provider will be able to tell you more about how they use and process your data in such cases.</p>
										 
									<strong>How does Book24.ng share your data with third parties?</strong>
								<p>In certain circumstances, we may share your personal data with third parties.
								The service you booked: In order to complete your reservation, we need to transfer relevant reservation details to the services (hotels/events/rentals/flights) you booked with. This may include information like your name, contact and payment details, the names of guests traveling with you and any preferences you specified when making a booking.</p>
										
									<p><strong>Book24.ng Mobile Apps?</strong></p>
								<p>We have free apps for a variety of mobile devices (Android and IOS) and use versions of our regular website that have been optimized for mobile. These apps and mobile websites process your personal details in a similar way as our website does–and they also allow you to use location services to find services nearby.</p>
										 
									<p><strong>How does Book24.ng use guest reviews and other destination-related information you share with us?</strong></p>
									<p>After your use any service booked through us, you’ll be invited to submit a guest review, which may ask for information about the service item, the surrounding areas, and the destination. If you don’t want your name to show with your review, you can use your screen name (which you can choose in your user account) or it can be displayed anonymously. By completing a guest review, you’re agreeing that it can be displayed (as further described in our Terms and Conditions) on, for example, the relevant service information page on our websites, in our mobile apps, in our social media accounts and in social apps, or on the website of the relevant property or on our business partner’s website, to inform other travelers about the quality of the service item you used.</p>
									<p>If you indicate that a guest review was helpful – or not helpful – we will aggregate this with feedback from other customers in order to sort and prioritize guest reviews. We may use the information in your lists or in other destination-related information you share with us in an anonymous format to help other travelers find the right destination.</p>
										 
									<p><strong>Cookies</strong></p>
								<p><strong>What is a cookie?</strong></p>
									<p>A cookie is a small amount of data that is placed in the browser of your computer or on your mobile device. This Privacy and Cookies Policy applies to cookies and similar technologies (hereafter together referred to as “cookies”).</p>
										 
									<p><strong>Why are cookies used?</strong></p>
									<p>Web pages have no memory. If you are surfing from page to page within a website, you will not be recognized as the same user across pages. Cookies enable your browser to be recognized by the website. So cookies are mainly used to remember the choices you have made – choices such as the language you prefer and the currency you use. They will also make sure you are recognized when you return to a website.</p>
										 
									<p><strong>Do all cookies do the same thing?</strong></p>
								<p>No, there are different types of cookies and different ways of using them. Cookies can be categorized according to their function, their lifespan and according to who places them on a website.</p>
										 
									<p><strong>How are cookies used?</strong></p>
									<p>Our website uses the following types of cookies:</p>
										•	<p><strong>Technical cookies:</strong></p> <p>We try to provide our visitors with an advanced and user-friendly website that adapts automatically to their needs and wishes. To achieve this, we use technical cookies to show you our website, to make it function correctly, to create your user account, to sign you in and to manage your bookings. These technical cookies are absolutely necessary for our website to function properly.</p>
										•	<p><strong>Functional cookies:</strong> </p><p>We also use functional cookies to remember your preferences and to help you use our website efficiently and effectively. For example, we remember your preferred currency and language, your searches and the property you viewed earlier. These functional cookies are not strictly necessary for the functioning of our website, but they add functionality for you and enhance your experience.</p>
										•	<p><strong>Analytics cookies:</strong></p> <p>We use these cookies to gain insight on how our visitors use the website, to find out what works and what doesn’t, to optimize and improve our website and to ensure we continue to be interesting and relevant. The data we gather includes which web pages you viewed, which referring/exit pages you entered and left from, which platform type you used, date and time stamp information and details such as the number of clicks you make on a given page, your mouse movements and scrolling activity, the search words you use and the text you type while using our website. We also use analytics cookies as part of our online advertising campaigns to learn how users interact with our website after they’ve been shown an online advertisement, which may include advertisements on third-party websites. We will not know who you are, and we only obtain anonymous data.</p>
										•	<p><strong>Commercial cookies:</strong></p> <p>We use these to show you book24.ng advertisements on other websites. This is called “retargeting” and it aims to be based on your browsing activities on our website, such as the destinations you’ve been searching for, the properties you’ve viewed and the prices you’ve been shown.</p>
									<p>In order to control the collection of data for analytical purposes by Google Analytics, you may want to visit the following link: Google Analytics Opt-out Browser Add-on.</p>
										 
										<strong>Who has access to Book24.ng cookie data?</strong>
										Only Book24.ng has access to Book24.ng cookies. Cookies placed by third parties can be accessed by these third parties.
										 
									<p><strong>How can you manage your cookie preferences?</strong></p>
									<p>Using your browser settings in, for example, Internet Explorer, Safari, Firefox or Chrome, you can set which cookies to accept and which to reject. Where you find these settings depends on which browser you use. Use the “Help” function in your browser to locate the settings you need.
										If you choose not to accept certain cookies, you may not be able to use some functions on our website. Plus, opting out of an online advertising network doesn’t mean that you won’t receive or be subject to online advertising or marketing analysis. It means that the network you opted out of will no longer deliver ads tailored to your web preferences and browsing patterns.</p>
										 
									<p><strong>Security</strong></p>
								<p><strong>What security procedures does Book24.ng put in place to safeguard your personal data?</strong></p>
							<p>In accordance with International data protection laws, we observe reasonable procedures to prevent unauthorized access and the misuse of personal information.
										We use appropriate business systems and procedures to protect and safeguard the personal information you give us. We also use security procedures and technical and physical restrictions for accessing and using the personal information on our servers. <p>Only authorized personnel are permitted to access personal information in the course of their work.</p>
										Your credit card details – when they are needed as part of the reservation process – are stored for a maximum of 10 days. After that, your credit card data will be either permanently deleted from our systems or will remain hashed in our system for fraud detection purposes. This is unless you have chosen to store your credit card details in your personal account.</p>
									<p><strong>How can you control the personal data you have given to Book24.ng?</strong></p>
								<p>You always have the right to review the personal information we keep about you. You can request an overview of your personal data by emailing us at <strong>support@book24.ng.</strong> Please write “Request personal information” in the subject line of your email and include a copy of your identity card to help us prevent unauthorized individuals from accessing your personal data.
										If the personal information we have for you is incorrect, we will update it at your request. You can also ask us to remove your personal data from our customer database by sending an email to <strong>support@book24.ng</strong> with “Request for removal of personal information” in the subject line. However, we may need to retain certain information, for example, for legal or administrative purposes, such as record keeping or to detect fraudulent activities. You can delete your user account at any time by signing into your account on the Book24.ng website and choosing to remove your account.</p>
										 
									<p>Last updated, February 2020</p>
									</div>
								</div>
							</div>
						</div>
				</div>
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
export default PrivacyPolicy;
