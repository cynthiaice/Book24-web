import React, { Component } from "react";
import { IconContext } from "react-icons";
import { MdSettings, MdDeleteForever } from "react-icons/md";
// import Button from "react-bootstrap/Button";
import { API_URL } from "../../../components/config.js";
import LocationInput from "../../../components/locationInput.js";
import axios from "axios";
import Cookies from "js-cookie";
var moment = require("moment");
import Sidebar from "../sidebar";
import Link from "next/link";
import { withRouter } from "next/router";
import ReactTags from "react-tag-autocomplete";
import Images from "./Images";
import Buttons from "./Buttons";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import DateTime from "react-datetime";
// import ImageUploader from "react-images-upload";

const KeyCodes = {
  comma: "188",
  enter: "13",
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideSidenav: "hidden",
      show: false,
      events: [],
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
      startDate: new Date(),
      endDate: new Date(),
      selectedEventFacilities: [],
      address: "",
      eventNumber: "",
      eventEmail: "",
      eventType: "free",
      logo: [],
      pictures: [],
      eventWebsite: "",
      address: "",
      featured: false,
      eventCategories: ["", "free", "paid"],
      eventTypes: [],
      selectedTicketType: [],
      ticketType: [],
      loader: false,
    };
    this.reactTags = React.createRef();
  }

  valid(current) {
    return current.isAfter(moment().subtract(1, "day"));
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  onDrop = (pictureFiles, pictureDataURLs) => {
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles),
    });
  };

  handleStartDate(e) {
    console.log(e.target);
    this.setState({ startDate: e.target.value }, () =>
      console.log(this.state.date)
    );
  }

  onDropLogo = (pictureFiles, pictureDataURLs) => {
    this.setState({
      logo: pictureFiles,
    });
  };

  onDelete(i) {
    const selectedTicketType = this.state.selectedTicketType.slice(0);
    selectedTicketType.splice(i, 1);
    this.setState({ selectedTicketType });
  }

  onAddition(selectedEventFeature) {
    var isPresent = false;
    for (let i = 0; i < this.state.selectedTicketType.length; i++) {
      if (this.state.selectedTicketType[i].name == selectedEventFeature.name) {
        isPresent = true;
        break;
      }
    }
    if (!isPresent) {
      const selectedTicketType = [].concat(
        this.state.selectedTicketType,
        selectedEventFeature
      );
      this.setState({ selectedTicketType }, () =>
        console.log(this.state.selectedTicketType)
      );
    }
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

  async componentDidMount() {
    console.log("dkdjdj");
    // const router = useRouter()
    console.log(this.props.token);
    let token = await Cookies.get("token");
    if (token == null || token == "") {
      //    this.props.router.push("/login");
    }
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "events", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ events: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            events: [...prevState.events, row],
          }));
        }
        this.getTicketType();
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  }

  getTicketType = async () => {
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "ticketTypes", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ ticketType: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            ticketType: [...prevState.ticketType, row],
          }));
        }
        // this.getEventFacilities(token);
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

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
  async createEvent(e) {
    e.preventDefault();
    this.setState({ error_div: false });
    if (this.state.location == "") {
      this.setState({
        error: "Select a location",
        error_div: true,
      });
    }
    var formData = new FormData();
    for (const key of Object.keys(this.state.pictures)) {
      formData.append("images", this.state.pictures[key]);
    }
    formData.append("name", this.state.name);
    formData.append("bio", this.state.bio);
    formData.append("location", this.state.location);
    formData.append("address", this.state.address.label);
    formData.append("contact_email", this.state.eventEmail);
    formData.append("contact_website", this.state.eventWebsite);
    formData.append("contact_phone", this.state.eventNumber);
    if (this.state.eventType == "paid") {
      formData.append(
        "ticket_type",
        JSON.stringify(this.state.selectedTicketType)
      );
    }
    formData.append("event_type", this.state.eventType);
    formData.append("start_date", this.state.startDate);
    formData.append("end_date", this.state.endDate);
    formData.append("featured", this.state.featured);

    let token = await Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "event", formData, config)
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
        }
      });
  }

  featuresConverter = (features) => {
    let text = "";
    if (features != null) {
      for (let i = 0; i < features.length; i++) {
        if (i == features.length - 1) {
          text += features[i].name + ":" + "\u20A6" + features[i].price + " ";
        } else {
          text += features[i].name + ":" + "\u20A6" + features[i].price + ", ";
        }
      }
    }

    return text;
  };

  mainFeaturesConverter = (features) => {
    let text = "";
    if (features != null) {
      for (let i = 0; i < features.length; i++) {
        if (i == features.length - 1) {
          text += features[i].name + ".";
        } else {
          text += features[i].name + ", ";
        }
      }
    }

    return text;
  };

  render() {
    let { showCreate, pictures, address } = this.state;

    const setAddress = (address) => this.setState({ address });

    const event_data = this.state.events.map(
      function (item, index) {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.author.full_name}</td>
            <td>
              {moment(item.start_date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
            </td>
            <td>
              {moment(item.end_date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
            </td>
            <td>{item.event_type}</td>
            <td>{this.featuresConverter(item.ticket_type)}</td>
            <td>{item.location}</td>
            <td>{item.address}</td>
            {/* <td>
              <a
                href="#"
                onClick={() => this.setState({ show: true, item })}
                ref="btn"
              >
                <IconContext.Provider value={{ color: "#B1ADAD", size: 22 }}>
                  <MdSettings />
                </IconContext.Provider>
              </a>
            </td> */}
          </tr>
        );
      }.bind(this)
    );

    const ModalEvent = ({ handleClose, show, children }) => {
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
          <ModalEvent
            show={this.state.show}
            handleClose={this.handleClose.bind(this)}
            delete={this.delete.bind(this)}
          >
            <p>Are you sure you want to delete this event</p>
          </ModalEvent>
          <p className="admin-header">Event</p>
          <div className="input-row">
            <button
              className="admin-button"
              onClick={this.handleShowCreate.bind(this)}
            >
              <p>ADD EVENT</p>
            </button>
            {/* <div style={{ width: "10px" }} />
            <button
              className="admin-button"
              onClick={() => this.props.router.push("/admin/eventCategory")}
            >
              <p>CATEGORY</p>
            </button> */}
            <div style={{ width: "10px" }} />
            <button
              className="admin-button"
              onClick={() => this.props.router.push("/admin/ticketType")}
            >
              <p>TICKET TYPE</p>
            </button>
            {/* <div style={{width:'10px'}} />
        <button
          className="admin-button"
          onClick={()=>this.props.router.push('/admin/eventFacilities')}
        >
          <p>FACILITIES</p>
        </button> */}
          </div>
          <div className={showHideClassNameCreate}>
            <p className="admin-header">Add Event</p>
            {this.state.error_div && (
              <div className="error">{this.state.error}</div>
            )}
            <form onSubmit={this.createEvent.bind(this)}>
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
                </div>
                <br />
                <div className="input-row">
                  <p className="label-text">
                    Choose an Event Type(free or paid)
                  </p>

                  <select
                    required
                    name="eventType"
                    id="eventTypeId"
                    onChange={(event) =>
                      this.setState({ eventType: event.target.value })
                    }
                  >
                    <option value={"free"}>Free</option>
                    <option value={"paid"}>Paid</option>
                  </select>
                </div>
                <br />
                <div className="input-row">
                  <p className="label-text">Location</p>
                  <LocationInput
                    saveLocation={(event) => {
                      this.setState({ location: event.target.value }, () =>
                        console.log(this.state.location)
                      );
                    }}
                  />
                </div>
                <br />
                <div className="input-row">
                  <p className="label-text">Address </p>
                  <GooglePlacesAutocomplete
                    apiKey="AIzaSyCabaQ0gls7rfTgLU2gW8vDBxlrTNZ1CW4"
                    selectProps={{
                      address,
                      onChange: setAddress,
                      styles: {
                        input: (provided) => ({
                          ...provided,
                          color: "#1281dd",
                          width: "200px",
                        }),
                        option: (provided) => ({
                          ...provided,
                          color: "#1281dd",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "#1281dd",
                        }),
                      },
                      placeholder: "Enter address",
                      componentRestrictions: {
                        country: "ng",
                      },
                      // query: {
                      //               key: "AIzaSyBRWIXQCbRpusFNiQitxMJy_89gguGk66w",
                      //               language: "en",
                      //               components: "country:ng"
                      //             }
                    }}
                  />
                  <br />
                  <p className="label-text">Description</p>
                  <textarea
                    placeholder="Enter description of event"
                    cols="30"
                    rows="5"
                    type="text"
                    value={this.state.bio}
                    required
                    onChange={(event) =>
                      this.setState({ bio: event.target.value })
                    }
                  />
                </div>
                <br />
                <div className="input-row">
                  <p className="label-text">Event Website </p>
                  <input
                    type="text"
                    value={this.state.eventWebsite}
                    onChange={(event) =>
                      this.setState({ eventWebsite: event.target.value })
                    }
                  />
                  <p className="label-text">Event Email </p>
                  <input
                    type="text"
                    value={this.state.eventEmail}
                    onChange={(event) =>
                      this.setState({ eventEmail: event.target.value })
                    }
                  />
                </div>
                <br />
                <div className="input-row">
                  <p className="label-text">Event Mobile Number </p>
                  <input
                    type="text"
                    value={this.state.eventNumber}
                    onChange={(event) =>
                      this.setState({ eventNumber: event.target.value })
                    }
                  />
                </div>
                <br />
                <div className="input-row">
                  <p className="label-text">Upload event images </p>
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
                <div className="input-row">
                  <p className="label-text">Start date and time </p>
                  <DateTime
                    isValidDate={this.valid}
                    value={this.state.startDate}
                    onChange={(event) => this.setState({ startDate: event })}
                  />
                  <p className="label-text">End date and time </p>
                  <DateTime
                    isValidDate={this.valid}
                    value={this.state.endDate}
                    onChange={(event) => this.setState({ endDate: event })}
                  />
                </div>
              </div>
              <br />
              <br />
              {this.state.eventType !== "free" && (
                <div>
                  <ReactTags
                    ref={this.reactTags}
                    tags={this.state.selectedTicketType}
                    suggestions={this.state.ticketType}
                    delimiters={delimiters}
                    onDelete={this.onDelete.bind(this)}
                    onAddition={this.onAddition.bind(this)}
                    placeholderText="Add ticket types"
                    noSuggestionsText="No ticket type match your input"
                    autoresize={false}
                    minQueryLength={1}
                  />
                  <br />
                  <p>i.e {this.mainFeaturesConverter(this.state.ticketType)}</p>
                  {this.state.selectedTicketType.map((element, index) => {
                    return (
                      <div>
                        <p className="label-text">{element.name}'s Price: </p>
                        <input
                          type="number"
                          // value={this.state.price}
                          required
                          onChange={(event) => {
                            let test_array = this.state.selectedTicketType;
                            test_array[index].price = event.target.value;
                            this.setState(
                              { selectedTicketType: test_array },
                              () => console.log(this.state.selectedTicketType)
                            );
                          }}
                        />
                        <br />
                      </div>
                    );
                  })}
                </div>
              )}
              <br />
              <input
                type="checkbox"
                id="featured"
                name="featured"
                value={this.state.featured}
                onChange={(event) =>
                  this.setState({ featured: event.target.value })
                }
                style={{ width: "30px", height: "30px" }}
              />
              <label for="featured"> Set as featured</label>
              <br></br>
              <div className="input-row">
                {/* <button onClick={this.createEvent.bind(this)}>Create</button>{" "} */}
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
                <th>Event name</th>
                <th>Author</th>
                <th>Start Date</th>
                <th>End Date</th>

                <th>Event Type</th>
                <th>Ticket types</th>
                {/* <th>Facilities</th> */}
                <th>Location</th>
                <th>Address</th>
                {/* <th>Action</th> */}
              </tr>
              {event_data}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(Events);
