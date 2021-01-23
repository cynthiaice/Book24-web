import React, { Component } from "react";
import { IconContext } from "react-icons";
import { MdSettings, MdDeleteForever } from "react-icons/md";
// import Button from "react-bootstrap/Button";
import { API_URL } from "../../../components/config.js";
import axios from "axios";
import Cookies from "js-cookie";
var moment = require("moment");
import Sidebar from "../sidebar";
import Link from "next/link";
import { withRouter } from "next/router";
import ReactTags from "react-tag-autocomplete";
import Loader from "../../../components/loader";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideSidenav: "hidden",
      show: false,
      rooms: [],
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
      checkInDate: "",
      checkOutDate: "",
      roomType: "",
      price: "",
      capacity: "",
      hotel: "",
      roomTypes: [],
      hotels: [],
      is_wifi: false,
      is_shower: false,
      size: "",
      no_of_beds: "",
      pictures: [],
      loader: false,
      show:false,
      item:{}
    };
    this.reactTags = React.createRef();
  }

  onDelete(i) {
    const selectedRoomTypes = this.state.selectedRoomTypes.slice(0);
    selectedRoomTypes.splice(i, 1);
    this.setState({ selectedRoomTypes });
  }

  onAddition(tag) {
    const selectedRoomTypes = [].concat(this.state.selectedRoomTypes, tag);
    this.setState({ selectedRoomTypes });
  }

  toggleSidenav() {
    var css = this.state.showHideSidenav === "hidden" ? "show" : "hidden";
    this.setState({ showHideSidenav: css });
  }

  handleEdit = async(e) => {
    const {name,price,upload_images,
      images,id} = this.state.item
    e.preventDefault();
    this.setState({ error_div: false, editLoader: true });
    if(upload_images || images){
    var formData = new FormData();
    if(upload_images != null && Object.keys(upload_images).length > 0){
        for (const key of Object.keys(upload_images)) {
      formData.append("upload_images", upload_images[key]);
    }
    }
    console.log(upload_images)
    formData.append("name", name);
    formData.append("price", price);
    
    // var post_data = {
    //   name,
    //   bio
    // }
    formData.append("images", JSON.stringify(images))
    }else{
      var formData = {
      name,
      price
      }
    }

    console.log(formData)
    let token = await Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "update-rooms/"+id.toString(), formData, config)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          this.setState({
            error: error.response.data.message,
            error_div: true,
          });
          console.log(JSON.stringify(error));
          if (error.response.statusCode == 401) {
            this.props.router.push("/sade");
          }
        }
      }).finally(()=>this.setState({ editLoader: false }));
    }

  setHotel = (event) => {
    console.log('dkdkdk')
    this.setState({ hotel: event.target.value }, () =>
       console.log(this.state.hotel)
     )
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

  getHotels = (token) => {
    console.log("roomtype");
    if (token == null || token == "") {
      this.props.router.push("/login");
    }
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "hotels", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ hotels: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            hotels: [...prevState.hotels, row],
          }));
        }
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

  async componentDidMount() {
    console.log("dkdjdj");
    // const router = useRouter()
    console.log(this.props.token);
    let token = await Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "rooms", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ rooms: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            rooms: [...prevState.rooms, row],
          }));
        }
        this.getHotels(token);
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  }

  async delete() {
    console.log(this.state.toDelete);
    let token = await Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .delete(API_URL + "users/" + this.state.toDelete, config)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        this.props.history.push("/");
        console.log(error);
      });
  }

  createRoom =(e)=> {
    e.preventDefault();
    this.setState({ error_div: false, loader: true });

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    var formData = new FormData();
    for (const key of Object.keys(this.state.pictures)) {
      formData.append("images", this.state.pictures[key]);
    }
    formData.append("name", this.state.name);
    formData.append("hotel_id", this.state.hotel);
    formData.append("price", this.state.price);
    formData.append("capacity", this.state.capacity);
    formData.append("is_wifi", this.state.is_wifi);
    formData.append("is_shower", this.state.is_shower);
    formData.append("size", this.state.size);
    formData.append("no_of_beds", this.state.no_of_beds);
    let token = Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "room", formData, config)
      .then((response) => {
        this.setState({ loader: false });
        console.log(response);
        //    this.props.router('/admin/rooms')
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data) {
          this.setState({
            error: error.response.data.message,
            error_div: true,
            loader: false,
          });
          console.log(JSON.stringify(error));
        }
      });
  }

  featuresConverter = (features) => {
    let text = "";
    for (let i = 0; i < features.length; i++) {
      if (i == features.length - 1) {
        text += features[i].name + ".";
      } else {
        text += features[i].name + ", ";
      }
    }
    return text;
  };

  render() {
    let { showHideSidenav, showCreate } = this.state;
    const room_data = this.state.rooms.map(
      function (item, index) {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.capacity}</td>
            <td>{item.hotel&&item.hotel.name}</td>
            <td>{item.author&&item.author.full_name}</td>
            <td>
              <a
                href="#"
                onClick={() => this.setState({ show: true, item })}
                ref="btn"
              >
                <IconContext.Provider value={{ color: "#B1ADAD", size: 22 }}>
                  <MdSettings />
                </IconContext.Provider>
              </a>
            </td>
          </tr>
        );
      }.bind(this)
    );

    const ModalRoom = ({ handleClose, show, children }) => {
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
          <ModalRoom
            show={this.state.show}
            handleClose={this.handleClose.bind(this)}
            delete={this.delete.bind(this)}
          >
            <p>Are you sure you want to delete this room</p>
          </ModalRoom>
          <p className="admin-header">Room</p>
          <button
            className="admin-button"
            onClick={this.handleShowCreate.bind(this)}
          >
            <p>ADD ROOM</p>
          </button>
          {/* <button
          className="admin-button"
          onClick={()=>this.props.router.push('/admin/roomTypes')}
        >
          <p>ROOM TYPE</p>
        </button> */}
          <div className={showHideClassNameCreate}>
            <p className="admin-header">Add Room</p>
            {this.state.error_div && (
              <div className="error">{this.state.error}</div>
            )}
            {this.state.loader && <Loader />}
            <form onSubmit={this.createRoom.bind(this)}>
              <div className="form-box">
                <div className="input-row">
                  <p className="label-text">Name</p>
                  <input
                    type="text"
                    value={this.state.name}
                    required
                    onChange={(event) =>
                      this.setState({ name: event.target.value })
                    }
                  />
                  <p className="label-text">Price</p>
                  <input
                    type="number"
                    value={this.state.price}
                    required
                    onChange={(event) =>
                      this.setState({ price: event.target.value })
                    }
                  />
                </div>
                <div className="input-row">
                  <p className="label-text">Capacity</p>
                  <input
                    type="number"
                    value={this.state.capacity}
                    required
                    onChange={(event) =>
                      this.setState({ capacity: event.target.value })
                    }
                  />
                </div>
              </div>
              <p className="label-text">Choose a hotel</p>

              <select
                name="hotel"
                id="hotelId"
                onChange={this.setHotel}
                value={this.state.hotel}
              >
              <option>{'Select hotel'}</option>
                {this.state.hotels.map((element) => {
                  console.log(element.id)
                  return <option value={element.id}>{element.name}</option>
                })}
              </select>
              <br />
              <div className="input-row">
                <p className="label-text">Room size </p>
                <input
                  type="text"
                  value={this.state.size}
                  onChange={(event) =>
                    this.setState({ size: event.target.value })
                  }
                />
                <p className="label-text">No of beds </p>
                <input
                  type="text"
                  value={this.state.no_of_beds}
                  onChange={(event) =>
                    this.setState({ no_of_beds: event.target.value })
                  }
                />
              </div>
              <br />
              <input
                type="checkbox"
                id="wifi"
                name="wifi"
                defaultChecked={this.state.is_wifi}
                onChange={() =>
                  this.setState({ is_wifi: !this.state.is_wifi })
                }
                style={{ width: "30px", height: "30px" }}
              />
              <label for="wifi"> Free Wifi</label>
              <br />
              <br />
              <input
                type="checkbox"
                id="shower"
                name="shower"
                defaultChecked={this.state.is_shower}
                onChange={() =>
                  this.setState({ is_shower: !this.state.is_shower })
                }
                style={{ width: "30px", height: "30px" }}
              />
              <label for="shower"> Shower/BathtUB</label>
              <br />
              <div className="input-row">
                <p className="label-text">Upload Room images </p>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  required
                  multiple
                  //    value={this.state.logo.url}
                  onChange={(event) => {
                    let test_pictures = [];
                    for (let i = 0; i < event.target.files.length; i++) {
                      test_pictures.push(event.target.files[i]);
                    }
                    this.setState({ pictures: test_pictures }, () =>
                      console.log(this.state.pictures)
                    );
                  }}
                />
              </div>
              <div className="input-row" id="images">
                {this.state.pictures.map((element) => (
                  <img
                    src={URL.createObjectURL(element)}
                    width={"50px"}
                    style={{ marginRight: "10px" }}
                    height={"50px"}
                  />
                ))}
              </div>
              <br />
              <div className="input-row">
                {/* <button onClick={this.createRoom.bind(this)}>Create</button>{" "} */}
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
                <th>Price</th>
                <th>Capacity</th>

                <th>Hotel</th>
                <th>Author</th>
                <th>Action</th>
              </tr>
              {room_data}
            </tbody>
          </table>
          <Modal
            show={this.state.show}
            onHide={() => this.setState({ show: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Hotel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Name"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={this.state.item.name}
                    onChange={(event) => {
                      let new_item = this.state.item;
                      new_item.name = event.target.value;
                      this.setState({ item: new_item }, () =>
                        console.log(this.state.item)
                      );
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Price</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Price"
                    aria-label="Userprice"
                    aria-describedby="basic-addon1"
                    value={this.state.item.price}
                    onChange={(event) => {
                      let new_item = this.state.item;
                      new_item.price = event.target.value;
                      this.setState({ item: new_item }, () =>
                        console.log(this.state.item)
                      );
                    }}
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                <div className="col-lg-12">Upload new Images</div>
                <br/>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    required
                    multiple
                    label={'Upload new Images'}
                    //    value={this.state.logo.url}
                    onChange={(event) => {
                      let new_item = this.state.item;
                      let test_pictures = [];
                      for (let i = 0; i < event.target.files.length; i++) {
                        test_pictures.push(event.target.files[i]);
                      }
                      new_item.upload_images = test_pictures;
                      this.setState({ item: new_item }, () =>
                        console.log(this.state.item)
                      );
                    }}
                  />
                </InputGroup>
                <br/>
                {this.state.item &&
                  this.state.item.upload_images &&
                  this.state.item.upload_images.map((element) => (
                    <img
                      src={URL.createObjectURL(element)}
                      width={"50px"}
                      style={{ marginRight: "10px" }}
                      height={"50px"}
                    />
                  ))}
                <InputGroup className="column">
                  <div className="col-lg-12">Previous Images</div>
                  <div className="col-lg-12 input-row" id="images">
                    {this.state.item &&
                      this.state.item.images &&
                      this.state.item.images.map((element, index) => (
                        <div className="column">
                          <img
                            src={element.url}
                            width={"100px"}
                            style={{ marginRight: "10px" }}
                            height={"100px"}
                          />
                          <button
                            onClick={() => {
                              let prev_item = this.state.item;
                              prev_item.images.splice(index, 1);
                              this.setState({ item: prev_item });
                            }}
                          >
                            <IconContext.Provider
                              value={{ color: "red", size: 22 }}
                            >
                              <MdDeleteForever />
                            </IconContext.Provider>
                          </button>
                        </div>
                      ))}
                  </div>
                </InputGroup></div>
                </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => this.setState({ show: false })}
              >
                Close
              </Button>
              <Button variant="primary" onClick={this.handleEdit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
   
    );
  }
}

export default withRouter(Rooms);
