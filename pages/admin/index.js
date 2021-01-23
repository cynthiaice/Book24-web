import React, { Component } from "react";
import Calendar from 'react-calendar';
import Chart from "chart.js";
// import { API_URL } from '../../../root.js'
import axios from "axios";
import { IconContext } from "react-icons";


import { MdViewQuilt } from "react-icons/md";
import { FaUsersCog, FaListAlt, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import Sidebar from "./sidebar";
var moment = require('moment');
import { withRouter } from "next/router";


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        name: '', bookings: [], users: [] };
  }

  chartRef = React.createRef();
    
  async componentDidMount() {
    let token = await Cookies.get("token");
    if (token == null || token == "") {
      //    this.props.router.push("/login");

    }
      const myChartRef = this.chartRef.current.getContext("2d");
      new Chart(myChartRef, {
          type: "line",
          data: {
              //Bring in data
              labels: ["Jan", "Feb", "March"],
              datasets: [
                  {
                      label: "Bookings",
                      data: [86, 67, 91],
                  }
              ]
          },
          options: {
              //Customize chart options
          }
      });
      let name = Cookies.get('name') 
      this.setState({name})
     // this.getApiData();
  }

  async getApiData(){
    // console.log(this.props.token)
    // if(!this.props.token){
    //   window.location.reload();
    // }
    let token = await Cookies.get('token') // => 'value'
let id = Cookies.get('id') // => 'value'
let role = Cookies.get('role')
    var config = {
        headers: {'Authorization': "Bearer " + token},
        timeout: 20000
    };
    await axios
    .get(
      API_URL+"bookings", config
    )
    .then(async response => {
      console.log(response);
      if (response.data && response.data.length > 0) {
        console.log("response.data");
          console.log("here" + response.data);     
         if(response.data.message == 'Token is not valid'){
            this.props.router.push("/");
          }
          var len = response.data.length;
          this.setState({bookings: [],})
          for (let i = 0; i < len; i++) {
            let row = response.data[i];
            this.setState(prevState => ({
                bookings: [...prevState.bookings, row]
              }));
          }
    }
      axios.get(API_URL+"users/" + this.props.id, config).then(async response => {
        console.log(response);
        if(response.data.message == 'Token is not valid'){
            this.props.router.push("/");
        }
        this.setState({first_name: response.data.first_name})
        await axios.get(API_URL+"users" , config).then(response => {
            console.log(response);
            if(response.data.message == 'Token is not valid'){
                //    this.props.router.push("/login");

            }
            var len = response.data.length;
          this.setState({users: [],})
          for (let i = 0; i < len; i++) {
            let row = response.data[i];
            this.setState(prevState => ({
                users: [...prevState.users, row]
              }));
          }
          }).catch(error => {
        //    this.setState({regLoader: false})
          if(error.code == 'ECONNABORTED'){
       //     Toast.show('Connection TImeout')
        }else if(error.response.status == 404){
            this.props.router.push("/");
        }else{
       //   Toast.show(error.message)
          if(error.message == 'Token is not valid'){
            this.props.router.push("/");
          }
        }
          console.log(error);
        });
      }).catch(error => {
    //    this.setState({regLoader: false})
      if(error.code == 'ECONNABORTED'){
   //     Toast.show('Connection TImeout')
    }else if(error.response.status == 404){
        this.props.router.push("/");
    }else{
   //   Toast.show(error.message)
      if(error.message == 'Token is not valid'){
        this.props.router.push("/");
      }
    }
      console.log(error);
    });
    })
    .catch(error => {
        this.setState({regLoader: false})
      if(error.code == 'ECONNABORTED'){
   //     Toast.show('Connection TImeout')
    }else{
     //   Toast.show(error.message)
        if(error.message == 'Token is not valid'){
            this.props.router.push("/");
        }
    }
      console.log(error);
    });
  }

  render() {
    return (
      <div className="app-body">
      <Sidebar />
      <div className="main-box">
      <p className="welcome-header">Hey {/*this.state.name*/}</p>
      <p className="date-text">
      {moment().format("dddd, MMMM Do YYYY")}
      </p>
      <div className="content-box">
      <div className="first-content-div">
          <div className="card-holder">
          <div className="card-div">
              <p className="total-text">TOTAL BOOKING</p>
              <p className="total-value">{this.state.bookings.length}</p>             
          </div>
          <div className="card-div">
              <p className="total-text">TOTAL USERS</p>
              <p className="total-value">{this.state.users.length}</p>             
          </div>
          </div>
          <p className="daily-text">Daily Booking Analysis</p>
          <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
      </div>
      {/* <div className="first-content-div">
      <p className="daily-text">Booking Count</p>
      <div className="order-count-div">
      <p className="total-count-text">This year: {this.state.bookings.length}</p>
      <p className="total-count-text">This month: **</p>
      </div>
      </div> */}
      </div>
      </div></div>
    );
  }
}

export default withRouter(Admin);
