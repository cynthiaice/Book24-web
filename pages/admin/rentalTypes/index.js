import React, { Component } from "react";
import { IconContext } from "react-icons";
import { MdSettings, MdDeleteForever } from "react-icons/md";
// import Button from "react-bootstrap/Button";
import { API_URL } from "../../../components/config.js";
import axios from "axios";import Cookies from 'js-cookie'
var moment = require("moment");
import Sidebar from "../sidebar";
import Link from 'next/link'
import { withRouter } from 'next/router'
import ReactTags from 'react-tag-autocomplete'

class RentalTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideSidenav: "hidden",
      show: false,
      rentalTypes: [],
      toDelete: "",
      showCreate: false,
      number: "",
      first_name: "",
      last_name: "",
      address: "",
      zip: "",
      email: "",
      password: "",
      error_div: false,
      error: "",
      checkInDate: '',
      checkOutDate: '',
      tags: [
      ],
      suggestions: [
        { id: 3, name: "wifi" },
        { id: 4, name: "ac" },
      ]
    };
    this.reactTags = React.createRef()
  }

  onDelete (i) {
    const tags = this.state.tags.slice(0)
    tags.splice(i, 1)
    this.setState({ tags })
  }
 
  onAddition (tag) {
    const tags = [].concat(this.state.tags, tag)
    this.setState({ tags })
  }

  toggleSidenav() {
    var css = this.state.showHideSidenav === "hidden" ? "show" : "hidden";
    this.setState({ showHideSidenav: css });
  }

  handleShow(id) {
    this.setState({ show: true, toDelete: id });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShowCreate() {
    this.setState({ showCreate: true });
  }

  handleCloseCreate() {
    this.setState({ showCreate: false });
  }
  handleNumber(e) {
    this.setState({ number: e.target.value });
  }

  async componentDidMount()  {
    console.log('dkdjdj')
   // const router = useRouter()
    console.log(this.props.token);
    let token = await Cookies.get('token') 
    if(token == null||token == ''){
  this.props.router.push('/login');
    }
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000
    };
    axios
      .get(API_URL + "rentalTypes", config)
      .then(response => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
    //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ rentalTypes: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState(prevState => ({
            rentalTypes: [...prevState.rentalTypes, row]
          }));
        }
      })
      .catch(error => {
     //   router.push("/");
        console.log(error);
      });
  }

  async delete() {
    console.log(this.state.toDelete);
    let token = await Cookies.get('token') 
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000
    };
    axios
      .delete(API_URL + "users/" + this.state.toDelete, config)
      .then(response => {
        console.log(response);
        window.price.reload();
      })
      .catch(error => {
        this.props.history.push("/");
        console.log(error);
      });
  }
  createRentalType(e) {
    e.preventDefault();
      this.setState({ error_div: false });
      var bodyParameters = {
        name: this.state.name,
        capacity: this.state.capacity,
      price: this.state.price,
      };
      console.log(bodyParameters);
      let token = Cookies.get('token') 
      var config = {
        headers: { Authorization: "Bearer " + token },
        timeout: 20000
      };
      axios
        .post(API_URL + "rentalType", bodyParameters, config)
        .then(response => {
          console.log(response);
        //  this.props.router('/admin/rentalTypes')
         window.location.reload();
        })
        .catch(error => {
          console.log(error);
          if (error.response.data) {
            this.setState({
              error: error.response.data.message,
              error_div: true
            });
            console.log(JSON.stringify(error));
          }
        });
    
  }

  render() {
    let { showHideSidenav, showCreate } = this.state;
    const rentalType_data = this.state.rentalTypes.map(
      function(item, index) {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.author.full_name}</td>
            {/* <td>
              <a
                href="#"
                onClick={this.handleShow.bind(this, item._id)}
                ref="btn"
              >
                <IconContext.Provider value={{ color: "#B1ADAD", size: 22 }}>
                  <MdDeleteForever />
                </IconContext.Provider>
              </a>
              <div className={showHideSidenav}>
                <p className="block-text">Block</p>
                <p className="suspend-text">Suspend</p>
              </div>
            </td> */}
          </tr>
        );
      }.bind(this)
    );

    const ModalRentalType = ({ handleClose, show, children }) => {
      const showHideClassName = show
        ? "modal display-block"
        : "modal display-none";

      return (
        <div className={showHideClassName}>
          <section className="modal-main">
            {children}
            <div className="button-row">
              <button onClick={this.delete.bind(this)}>Yes</button>{" "}
              <button onClick={handleClose}>Close</button>
            </div>
          </section>
        </div>
      );
    };
    const showHideClassNameCreate = showCreate
      ? "display-block"
      : "display-none";

    return (
      <div className="app-body">
      <Sidebar />
      <div className="main-box">
        <ModalRentalType
          show={this.state.show}
          handleClose={this.handleClose.bind(this)}
          delete={this.delete.bind(this)}
        >
          <p>Are you sure you want to delete this rentalType</p>
        </ModalRentalType>
        <p className="admin-header">Rental Type</p>
        <button
          className="admin-button"
          onClick={this.handleShowCreate.bind(this)}
        >
          <p>ADD RENTAL TYPE</p>
        </button>
        
        <div className={showHideClassNameCreate}>
          <p className="admin-header">Add Rental Type</p>
          {this.state.error_div && (
            <div className="error">{this.state.error}</div>
          )}
          <form onSubmit={this.createRentalType.bind(this)}>
            <div className="form-box">
              <div className="input-row">
                <p className="label-text">Name</p>
                <input
                  type="text"
                  value={this.state.name}
                  required
                  onChange={event =>
                    this.setState({ name: event.target.value })
                  }
                />

                
              </div>
            </div>
            <div className="input-row">
              {/* <button onClick={this.createRentalType.bind(this)}>Create</button>{" "} */}
              <input type="submit" value="Create" className="button" />
              <div
                className="button"
                onClick={this.handleCloseCreate.bind(this)}
              >
                Close
              </div>
            </div>
          </form>
        </div>
        <table id="customers">
          <tbody>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Author</th>
              {/* <th>Action</th> */}
            </tr>
            {rentalType_data}
          </tbody>
        </table>
      </div></div>
    );
  }
}

export default withRouter(RentalTypes);
