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

class CarCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideSidenav: "hidden",
      show: false,
      carCategories: [],
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
      .get(API_URL + "carCategories", config)
      .then(response => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
    //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ carCategories: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState(prevState => ({
            carCategories: [...prevState.carCategories, row]
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
        window.location.reload();
      })
      .catch(error => {
        this.props.history.push("/");
        console.log(error);
      });
  }
  createCarFeature(e) {
    e.preventDefault();
      this.setState({ error_div: false });
      var bodyParameters = {
        name: this.state.name,

      };
      console.log(bodyParameters);
      let token = Cookies.get('token') 
      var config = {
        headers: { Authorization: "Bearer " + token },
        timeout: 20000
      };
      axios
        .post(API_URL + "carCategory", bodyParameters, config)
        .then(response => {
          console.log(response);
        //  this.props.router.push('/admin/rooms')
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

  categoriesConverter = (categories) => {
    let text = '';
    for(let i=0;i<categories.length;i++){
      if(i== categories.length-1){
        text+= categories[i].name+'.';
      }else{
         text+= categories[i].name+', '
      }
      
    }
    return text;
  }

  render() {
    let { showHideSidenav, showCreate } = this.state;
    const carCategory_data = this.state.carCategories.map(
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

    const ModalCarFeature = ({ handleClose, show, children }) => {
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
        <ModalCarFeature
          show={this.state.show}
          handleClose={this.handleClose.bind(this)}
          delete={this.delete.bind(this)}
        >
          <p>Are you sure you want to delete this carCategory</p>
        </ModalCarFeature>
        <p className="admin-header">Car Category</p>
        <button
          className="admin-button"
          onClick={this.handleShowCreate.bind(this)}
        >
          <p>ADD CAR CATEGORY</p>
        </button>
        <div className={showHideClassNameCreate}>
          <p className="admin-header">Add Car Category</p>
          {this.state.error_div && (
            <div className="error">{this.state.error}</div>
          )}
          <form onSubmit={this.createCarFeature.bind(this)}>
            <div className="form-box">
              <br/><div className="input-row">
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
            <br/><div className="input-row">
              {/* <button onClick={this.createCarFeature.bind(this)}>Create</button>{" "} */}
              <input type="submit" value="Create" className="button" />
              <div
                className="button"
                onClick={this.handleCloseCreate.bind(this)}
              >
                Close
              </div>
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
            {carCategory_data}
          </tbody>
        </table>
      </div></div>
    );
  }
}

export default withRouter(CarCategories);
