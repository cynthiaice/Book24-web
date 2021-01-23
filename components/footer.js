import React, { Fragment, useState } from "react";
import Link from "next/link";

const Footer = () => {
  const [language, setlanguage] = useState("English");
  const [currency, setcurrency] = useState("Naira");
  return (
    <footer className="plus_border">
      <div className="container margin_60_35">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <h3 data-target="#collapse_ft_1">Quick Links</h3>
            <div className="collapse dont-collapse-sm" id="collapse_ft_1">
              <ul className="links">
                <li>
                  <a href="/about">About us</a>
                </li>
                <li>
                  <a href="/faq">FAQ</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
                <li>
                  <a href="/account">My account</a>
                </li>
                <li>
                  <a href="/register">Create account</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <h3 data-target="#collapse_ft_2">Categories</h3>
            <div className="collapse dont-collapse-sm" id="collapse_ft_2">
              <ul className="links">
                <li>
                  <Link
                    href={{
                      pathname: "/listing",
                      query: { type: "hotel" },
                    }}
                  >
                    <a>Hotels</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: "/listing",
                      query: { type: "event" },
                    }}
                  >
                    <a>Events</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: "/listing",
                      query: { type: "tour" },
                    }}
                  >
                    <a>Flight</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: "/cruises-list",
                      query: { type: "cruise" },
                    }}
                  >
                    <a>Cruise</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: "/listing",
                      query: { type: "tour" },
                    }}
                  >
                    <a>Tour</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: "/listing",
                      query: { type: "rental" },
                    }}
                  >
                    <a>Rentals</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: "/listing",
                      query: { type: "car" },
                    }}
                  >
                    <a>Cars</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: "/listing",
                      query: { type: "activity" },
                    }}
                  >
                    <a>Activities</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <h3 data-target="#collapse_ft_3">Contacts</h3>
            <div className="collapse dont-collapse-sm" id="collapse_ft_3">
              <ul className="contacts">
                <li>
                  <i className="ti-home"></i>22 Olatunde Amolegbe Street
                  <br />
                  Bera estate, Chevron, Lagos.
                </li>
                <li>
                  <i className="ti-headphone-alt"></i>08125900497
                </li>
                <li>
                  <i className="ti-email"></i>
                  <a href="/#0">info@book24.ng</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <h3 data-target="#collapse_ft_4">Keep in touch</h3>
            <div className="collapse dont-collapse-sm" id="collapse_ft_4">
              <div id="newsletter">
                <div id="message-newsletter"></div>
                <form
                  method="post"
                  action="assets/newsletter.php"
                  name="newsletter_form"
                  id="newsletter_form"
                >
                  <div className="form-group">
                    <input
                      type="email"
                      name="email_newsletter"
                      id="email_newsletter"
                      className="form-control"
                      placeholder="Your email"
                    />
                    <input
                      type="submit"
                      value="Submit"
                      id="submit-newsletter"
                    />
                  </div>
                </form>
              </div>
              <div className="follow_us">
                <h5>Follow Us</h5>
                <ul>
                  <li>
                    <a href="/#0">
                      <i className="ti-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#0">
                      <i className="ti-twitter-alt"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#0">
                      <i className="ti-google"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#0">
                      <i className="ti-pinterest"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#0">
                      <i className="ti-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-6">
            <ul id="footer-selector">
              <li>
                <div className="styled-select pl-2" id="lang-selector">
                  English
                </div>
              </li>
              <li>
                <div className="styled-select pl-2" id="currency-selector">
                  Naira
                </div>
              </li>
              <li>
                <img
                  src="/images/cards.png"
                  alt=""
                  width={"100px"}
                  height={"24px"}
                />
              </li>
            </ul>
          </div>
          <div className="col-lg-6">
            <ul id="additional_links">
              <li>
                <a href="/terms">Terms and conditions</a>
              </li>
              <li>
                <a href="/privacy-policy">Privacy</a>
              </li>
              <li>
                <span>© 2020 Book24</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
