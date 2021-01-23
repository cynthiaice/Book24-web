import Head from "next/head";
import React, { Component} from "react";
import Header from '../components/header';
import SignInModal from '../components/signInModal';
import Footer from "../components/footer";
import $ from 'jquery';

class Contacts extends Component {
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
	
        <div class="sub_header_in sticky_header">
		<div class="container">
			<h1>Contact Book24</h1>
		</div>
	</div>
		
	<main>
		<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19864.623539539858!2d-0.1407216728393208!3d51.51178603603532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604cb878e81b3%3A0x91f10fa364452046!2sCovent+Garden%2C+Londra+WC2E+8BG%2C+Regno+Unito!5e0!3m2!1sit!2ses!4v1538380105649" width="600" height="450" allowfullscreen id="map_iframe"></iframe>
		<div class="container margin_60_35">
			<div class="row justify-content-center">
				
				<div class="col-xl-5 col-lg-6 pr-xl-5">
					<div class="main_title_3">
						<span></span>
						<h2>Send us a message</h2>
						<p>We are always available to assist you.</p>
					</div>
					<div id="message-contact"></div>
					<form method="post" action="assets/contact.php" id="contactform" autocomplete="off">
						<div class="form-group">
							<label>Name</label>
							<input class="form-control" type="text" id="name_contact" 
                            name="name_contact"/>
						</div>
						<div class="form-group">
							<label>Last name</label>
							<input class="form-control" type="text" id="lastname_contact" 
                            name="lastname_contact"/>
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label>Email</label>
									<input class="form-control" type="email" id="email_contact" 
                                    name="email_contact"/>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label>Telephone</label>
									<input class="form-control" type="text" id="phone_contact" 
                                    name="phone_contact"/>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label>Message</label>
							<textarea class="form-control" id="message_contact" 
                            name="message_contact" style={{height:"120px"}} />
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label>Are you human? 3 + 1 =</label>
									<input class="form-control" type="text"
                                     id="verify_contact" name="verify_contact"/>
								</div>
							</div>
						</div>
						<p class="add_top_30"><input type="submit" value="Submit" 
                        class="btn_1" id="submit-contact"/></p>
					</form>
				</div>
				<div class="col-xl-5 col-lg-6 pl-xl-5">
					<div class="box_contacts">
						<i class="ti-support"></i>
						<h2>Need Help?</h2>
						<a href="#0">+234 812 590 0497</a> - <a href="#0">contact@book24.ng</a>
					</div>
					<div class="box_contacts">
						<i class="ti-help-alt"></i>
						<h2>Questions?</h2>
						<a href="#0">+234 812 590 0497</a> - <a href="#0">info@book24.ng</a>
					</div>
					<div class="box_contacts">
						<i class="ti-home"></i>
						<h2>Address</h2>
						<p>22 Olatunde Amolegbe Street<br/>Bera estate, Chevron - Lagos</p>
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
export default Contacts;
