import Head from "next/head";
import React, { Component} from "react";
import Header from '../components/header';
import SignInModal from '../components/signInModal';
import Footer from "../components/footer";
import $ from 'jquery';

class Confirm extends Component {
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
		<Header/>
        <div className="sub_header_in sticky_header">
		<div className="container">
			<h1>Booking</h1>
		</div>
	</div>
	<main>
		<div className="container margin_60">
			 <div className="row justify-content-center">
				<div className="col-md-5">
					<div id="confirm">
						<div className="icon icon--order-success svg add_bottom_15">
							<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72">
								<g fill="none" stroke="#8EC343" stroke-width="2">
									<circle cx="36" cy="36" r="35" style="stroke-dasharray:240px, 240px; stroke-dashoffset: 480px;"></circle>
									<path d="M17.417,37.778l9.93,9.909l25.444-25.393" style="stroke-dasharray:50px, 50px; stroke-dashoffset: 0px;"></path>
								</g>
							</svg>
						</div>
					<h2>Booking Confirmed!</h2>
					<p></p>
					</div>
				</div>
			</div>
		</div>
		<div className="bg_color_1">
			<div className="container margin_60_35">
				<div className="row">
					<div className="col-lg-4">
						<a href="#0" className="boxed_list">
							<i className="pe-7s-help2"></i>
							<h4>Need Help? Contact us</h4>
							<p>We are always available to assist you.</p>
						</a>
					</div>
					<div className="col-lg-4">
						<a href="#0" className="boxed_list">
							<i className="pe-7s-wallet"></i>
							<h4>Payments</h4>
							<p>All payments are processed through secure channels</p>
						</a>
					</div>
					<div className="col-lg-4">
						<a href="#0" className="boxed_list">
							<i className="pe-7s-note2"></i>
							<h4>Cancel Policy</h4>
							<p>Kindly refer to cancellation policy of property/service provider</p>
						</a>
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
export default Confirm;
