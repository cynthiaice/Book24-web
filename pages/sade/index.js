import React, { Component } from "react";
import Head from "next/head";
// import "./styles/login.css";
import Cookies from "js-cookie";
import { API_URL } from "../../components/config.js";
///import { askForPermissioToReceiveNotifications } from '../../push-notification';
import axios from "axios";
import { withRouter, } from 'next/router'
//axios.defaults.withCredentials = true;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      email: "",
      password: "",
      error: "",
      error_div: false,
      fcmToken:''
    };
  }
  async componentDidMount(){

  }
  async log() {
    //    console.log("djdjd")
  
    let regg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regg.test(this.state.email) === false) {
      this.setState({ error: "Incorrect Credentials", error_div: true });
    } else if (this.state.password.length < 1 || this.state.email.length < 1) {
      this.setState({
        error: "Please fill all required fields",
        error_div: true
      });
    } else {
      this.setState({ error_div: false });
    //  let token = await askForPermissioToReceiveNotifications();
  //    console.log(token)
   //   this.setState({fcmToken: token})
      var bodyParameters = {
        email: this.state.email,
        password: this.state.password,
    //    device_token: token
      };
      axios
        .post(API_URL + "login", bodyParameters, {
          timeout: 20000
        })
        .then(async response => {
          console.log(response);
          let id = response.data.user.id;
          let token = response.data.authToken.token;
          let role = response.data.user.role;
          let name = response.data.user.name;
          let email = response.data.user.email;
          await Cookies.set("token", token, { expires: 14 });
          Cookies.set("id", id, { expires: 14 });
          Cookies.set("role", role, { expires: 14 });
          Cookies.set("name", name, { expires: 14 });
          Cookies.set('email',email,{expires:14})
          this.props.router.push('/admin/hotels')
          // this.props.setToken(token);
          // this.props.setId(id);
          //      Toast.show('Sign in successful');
          
          // this.props.setLog();
          //   this.props.history.push("/dashboard");
        })
        .catch(error => {
          console.log( error.response);
            this.setState({
              error: error.response.data,
              error_div: true
            });
            console.log(JSON.stringify(error));
          
        });
    }
  }

  // callAPI() {
  //     fetch("http://localhost:9000/testAPI")
  //         .then(res => res.text())
  //         .then(res => this.setState({ apiResponse: res }))
  //         .catch(err => err);
  // }

  // componentDidMount() {
  //     this.callAPI();
  // }

  render() {
    return (
      <div style={{position: 'relative'}}>
       <Head>
    <link href="css/login.css" rel="stylesheet"/></Head>
      <div className="middle-box">
        <p className="login-text">Log In</p>
        <p className="sub-text">Welcome! Fill details below to login</p>
        {this.state.error_div && (
          <div className="error">{this.state.error}</div>
        )}
        <div className="form-box">
          <p className="label-text">Email</p>
          <input
            type="email"
            value={this.state.email}
            onChange={event => this.setState({ email: event.target.value })}
          />
          <p className="label-text">Password</p>
          <input
            type="password"
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
          />
        </div>
        <button className="button" onClick={this.log.bind(this)}>
          Sign in
        </button>
        {/* <a href=""><p className="forgot-text">Forgot Password</p></a> */}
      </div> </div>
    );
  }
}

export default withRouter(Login);
