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

class Invoice extends Component {
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
  }

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
        </Head>
        <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="invoice-title add_top_30">
              <h2>Invoice</h2><h3 className="float-right">Order # 12345</h3>
            </div>
            <hr />
            <div className="row">
              <div className="col-6">
                <address>
                  <strong>Billing Info:</strong><br />
                  Jane Ade<br />
                  Sanusi street, Surulere<br />
                  No. 4B<br />
                  Lagos, 105102
                </address>
              </div>
              <div className="col-6 text-right">
                <address>
                  <strong>Address:</strong><br />
                  Jane Ade<br />
                  Sanusi street, Surulere<br />
                  No. 4B<br />
                  Lagos, 105102
                </address>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <address>
                  <strong>Payment Method:</strong><br />
                  Visa ending **** 4242<br />
                  jsmith@email.com
                </address>
              </div>
              <div className="col-6 text-right">
                <address>
                  <strong>Order Date:</strong><br />
                  October 7, 2020<br /><br />
                </address>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="add_top_15">
              <h3><strong>Order summary</strong></h3>
              <div className="table-responsive">
                <table className="table table-condensed">
                  <thead>
                    <tr>
                      <td><strong>Property/Service</strong></td>
                      <td className="text-center"><strong>Price</strong></td>
                      <td className="text-center"><strong>Quantity</strong></td>
                      <td className="text-right"><strong>Total</strong></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Four points by sheraton Deluxe room</td>
                      <td className="text-center">10.99</td>
                      <td className="text-center">1</td>
                      <td className="text-right">10.99</td>
                    </tr>
                    <tr>
                      <td>Lagos City Tour</td>
                      <td className="text-center">20.00</td>
                      <td className="text-center">3</td>
                      <td className="text-right">60.00</td>
                    </tr>
                    <tr>
                      <td>Oriental Hotel single room</td>
                      <td className="text-center">600.00</td>
                      <td className="text-center">1</td>
                      <td className="text-right">600.00</td>
                    </tr>
                    <tr>
                      <td className="thick-line" />
                      <td className="thick-line" />
                      <td className="thick-line text-center"><strong>Subtotal</strong></td>
                      <td className="thick-line text-right">670.99</td>
                    </tr>
                    <tr>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
        <style global jsx>{`
        .invoice-title h2, .invoice-title h3 {
        display: inline-block;
    }
    
    .table > tbody > tr > .no-line {
        border-top: none;
    }
    
    .table > thead > tr > .no-line {
        border-bottom: none;
    }
    
    .table > tbody > tr > .thick-line {
        border-top: 2px solid;
    }
        `}</style>
      </div>
    );
  }
}
export default withRouter(Invoice);
