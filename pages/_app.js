import React from "react";
import Head from "next/head";
// import '/font/stylesheet.css'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "react-datetime/css/react-datetime.css";
import withRedux from "next-redux-wrapper";
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import { Provider } from "react-redux";
import store from "../store";
import App, { Container } from "next/app";
import "react-datepicker/dist/react-datepicker.css";
import "react-input-range/lib/css/index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "react-image-lightbox/style.css";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    //Anything returned here can be access by the client
    return { pageProps: pageProps };
  }

  componentDidMount() {}

  render() {
    //Information that was returned  from 'getInitialProps' are stored in the props i.e. pageProps
    const { Component, pageProps } = this.props;

    // optional configuration
    const options = {
      // you can also just use 'bottom center'
      position: positions.MIDDLE,
      timeout: 5000,
      offset: "30px",
      // you can also just use 'scale'
      transition: transitions.SCALE,
    };

    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <div>
            <Head>
              <meta charSet="utf-8" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
              ></meta>
              <link
                rel="stylesheet"
                href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
              />
              <link
                rel="stylesheet"
                href="https://www.w3schools.com/w3css/4/w3.css"
              />
              <link
                rel="shortcut icon"
                href="images/favicon.ico"
                type="images/x-icon"
              />
              <link
                rel="apple-touch-icon"
                type="images/x-icon"
                href="images/apple-touch-icon-57x57-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                type="images/x-icon"
                sizes="72x72"
                href="images/apple-touch-icon-72x72-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                type="images/x-icon"
                sizes="114x114"
                href="images/apple-touch-icon-114x114-precomposed.png"
              />
              <link
                rel="apple-touch-icon"
                type="images/x-icon"
                sizes="144x144"
                href="images/apple-touch-icon-144x144-precomposed.png"
              />
              <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                crossOrigin="anonymous"
              />
              {/* <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          /> */}
              <script
                src="https://cdnjs.cloudflare.com/ajax/libs/jquery-nice-select/1.1.0/js/jquery.nice-select.min.js"
                integrity="sha512-NqYds8su6jivy1/WLoW8x1tZMRD7/1ZfhWG/jcRQLOzV1k1rIODCpMgoBnar5QXshKJGV7vi0LXLNXPoFsM5Zg=="
                crossorigin="anonymous"
              ></script>
              <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCabaQ0gls7rfTgLU2gW8vDBxlrTNZ1CW4&libraries=places"></script>
              <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
              <script
                src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
                integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
                crossOrigin="anonymous"
              ></script>
              <script
                src="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js"
                integrity="sha512-IsNh5E3eYy3tr/JiX2Yx4vsCujtkhwl7SLqgnwLNgf04Hrt9BT9SXlLlZlWx+OK4ndzAoALhsMNcCmkggjZB1w=="
                crossorigin="anonymous"
              ></script>
              <script
                src="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.js"
                integrity="sha512-C1zvdb9R55RAkl6xCLTPt+Wmcz6s+ccOvcr6G57lbm8M2fbgn2SUjUJbQ13fEyjuLViwe97uJvwa1EUf4F1Akw=="
                crossorigin="anonymous"
              ></script>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.css"
                integrity="sha512-WEQNv9d3+sqyHjrqUZobDhFARZDko2wpWdfcpv44lsypsSuMO0kHGd3MQ8rrsBn/Qa39VojphdU6CMkpJUmDVw=="
                crossorigin="anonymous"
              />
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css"
                integrity="sha512-+EoPw+Fiwh6eSeRK7zwIKG2MA8i3rV/DGa3tdttQGgWyatG/SkncT53KHQaS5Jh9MNOT3dmFL0FjTY08And/Cw=="
                crossorigin="anonymous"
              />
              <link rel="stylesheet" href="css/owl.carousel.min.css" />
              <link rel="stylesheet" href="css/owl.theme.default.min.css" />
              <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                crossorigin="anonymous"
              />
              <script
                src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
                integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
                crossOrigin="anonymous"
              ></script>
              <script
                src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
                integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
                crossOrigin="anonymous"
              ></script>
              <script
                src="https://unpkg.com/react/umd/react.production.min.js"
                crossorigin
              ></script>

              <script
                src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
                crossorigin
              ></script>

              <script
                src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
                crossorigin
              ></script>
            </Head>
            <Component {...pageProps} />
          </div>
        </AlertProvider>
      </Provider>
    );
  }
}

//withRedux wrapper that passes the store to the App Component
// export default withRedux(makeStore)(MyApp);
export default MyApp;
