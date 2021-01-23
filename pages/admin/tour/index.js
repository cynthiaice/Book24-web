import React, { Component } from "react";
import { IconContext } from "react-icons";
import { MdSettings, MdDeleteForever } from "react-icons/md";
// import Button from "react-bootstrap/Button";
import { API_URL } from "../../../components/config.js";
import LocationInput from "../../../components/locationInput.js";
import axios from "axios";
import Cookies from "js-cookie";
import DateTime from "react-datetime";
import moment from "moment";
import Sidebar from "../sidebar";
import Link from "next/link";
import { withRouter } from "next/router";
import ReactTags from "react-tag-autocomplete";
import Images from "./Images";
import Buttons from "./Buttons";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import ImageUploader from "react-images-upload";

const KeyCodes = {
  comma: "188",
  enter: "13",
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class Tours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideSidenav: "hidden",
      show: false,
      tours: [],
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
      checkInTime: new Date(),
      checkOutTime: new Date(),
      selectedTourFacilities: [],
      address: "",
      tourNumber: "",
      tourEmail: "",
      logo: [],
      pictures: [],
      tourWebsite: "",
      address: "",
      price: "",
      featured: false,
      tourFacilites: [],
      tourFeatures: [
        {
          id: 1,
          name: "Single",
        },
        {
          id: 2,
          name: "Group",
        },
      ],
      selectedTourFeatures: [],
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

  onDropLogo = (pictureFiles, pictureDataURLs) => {
    this.setState({
      logo: pictureFiles,
    });
  };

  onDelete(i) {
    const selectedTourFeatures = this.state.selectedTourFeatures.slice(0);
    selectedTourFeatures.splice(i, 1);
    this.setState({ selectedTourFeatures });
  }

  onAddition(selectedTourFeature) {
    var isPresent = false;
    for (let i = 0; i < this.state.selectedTourFeatures.length; i++) {
      if (this.state.selectedTourFeatures[i].name == selectedTourFeature.name) {
        isPresent = true;
        break;
      }
    }
    if (!isPresent) {
      const selectedTourFeatures = [].concat(
        this.state.selectedTourFeatures,
        selectedTourFeature
      );
      this.setState({ selectedTourFeatures });
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
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "tours", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ tours: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            tours: [...prevState.tours, row],
          }));
        }
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
  async createTour(e) {
    e.preventDefault();
    this.setState({ error_div: false });
    var formData = new FormData();
    for (const key of Object.keys(this.state.pictures)) {
      formData.append("images", this.state.pictures[key]);
    }
    formData.append("name", this.state.name);
    formData.append("description", this.state.bio);
    formData.append("location", this.state.location);
    formData.append("address", this.state.address.label);
    formData.append("contact_email", this.state.tourEmail);
    formData.append("contact_website", this.state.tourWebsite);
    formData.append("contact_phone", this.state.tourNumber);
    formData.append("verified", true);
    formData.append(
      "tour_packages",
      JSON.stringify(this.state.selectedTourFeatures)
    );
    formData.append("check_in_time", this.state.checkInTime);
    formData.append("check_out_time", this.state.checkOutTime);
    formData.append("featured", this.state.featured);
    formData.append("price", this.state.price);

    let token = await Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "tour", formData, config)
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
          text += features[i].name + ".";
        } else {
          text += features[i].name + ", ";
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

    const tour_data = this.state.tours.map(
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
            <td>{this.featuresConverter(item.tour_packages)}</td>
            <td>{item.location}</td>
            <td>{item.address}</td>
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

    const ModalTour = ({ handleClose, show, children }) => {
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
          <ModalTour
            show={this.state.show}
            handleClose={this.handleClose.bind(this)}
            delete={this.delete.bind(this)}
          >
            <p>Are you sure you want to delete this tour</p>
          </ModalTour>
          <p className="admin-header">Tour</p>
          <br />
          <div className="input-row">
            <button
              className="admin-button"
              onClick={this.handleShowCreate.bind(this)}
            >
              <p>ADD TOUR</p>
            </button>
            {/* <div style={{ width: "10px" }} />
            <button
              className="admin-button"
              onClick={() => this.props.router.push("/admin/tourCategory")}
            >
              <p>CATEGORY</p>
            </button>
            <div style={{ width: "10px" }} />
            <button
              className="admin-button"
              onClick={() => this.props.router.push("/admin/ticketType")}
            >
              <p>TICKET TYPE</p>
            </button> */}
            {/* <div style={{width:'10px'}} />
        <button
          className="admin-button"
          onClick={()=>this.props.router.push('/admin/tourFacilities')}
        >
          <p>FACILITIES</p>
        </button> */}
          </div>
          <div className={showHideClassNameCreate}>
            <p className="admin-header">Add Tour</p>
            {this.state.error_div && (
              <div className="error">{this.state.error}</div>
            )}
            <form onSubmit={this.createTour.bind(this)}>
              <div className="form-box">
                <br />
                <div className="input-row">
                  <p className="label-text">Name</p>
                  <input
                    type="text"
                    value={this.state.name}
                    required
                    onChange={(tour) =>
                      this.setState({ name: tour.target.value })
                    }
                  />
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
                  {/* <input
                    type="text"
                    required
                    value={this.state.address}
                    onChange={(tour) =>
                      this.setState({ address: tour.target.value })
                    }
                  /> */}
                  <p className="label-text">Description</p>
                  <textarea
                    placeholder="Enter description of tour"
                    cols="30"
                    rows="5"
                    type="text"
                    value={this.state.bio}
                    required
                    onChange={(tour) =>
                      this.setState({ bio: tour.target.value })
                    }
                  />
                </div>
                <br />
                <div className="input-row">
                  <p className="label-text">Tour Website </p>
                  <input
                    type="text"
                    required
                    value={this.state.tourWebsite}
                    onChange={(tour) =>
                      this.setState({ tourWebsite: tour.target.value })
                    }
                  />
                  <p className="label-text">Tour Email </p>
                  <input
                    type="text"
                    required
                    value={this.state.tourEmail}
                    onChange={(tour) =>
                      this.setState({ tourEmail: tour.target.value })
                    }
                  />
                </div>
                <br />
                <div className="input-row">
                  <p className="label-text">Tour Mobile Number </p>
                  <input
                    type="text"
                    required
                    value={this.state.tourNumber}
                    onChange={(tour) =>
                      this.setState({ tourNumber: tour.target.value })
                    }
                  />
                  {/* <p className="label-text">Upload tour logo </p>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    required
                    value={this.state.logo.url}
                    onChange={(tour) =>
                      this.setState({ logo: tour.target.files }, () =>
                        console.log(this.state.logo)
                      )
                    }
                  /> */}
                </div>
                <br />
                <div className="input-row">
                  <p className="label-text">Upload tour images </p>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    required
                    multiple
                    //    value={this.state.logo.url}
                    onChange={(tour) => {
                      let test_pictures = [];
                      for (let i = 0; i < tour.target.files.length; i++) {
                        test_pictures.push(tour.target.files[i]);
                      }
                      this.setState({ pictures: test_pictures }, () =>
                        console.log(this.state.pictures)
                      );
                    }}
                  />
                </div>
                <ReactTags
                  ref={this.reactTags}
                  tags={this.state.selectedTourFeatures}
                  suggestions={this.state.tourFeatures}
                  delimiters={delimiters}
                  onDelete={this.onDelete.bind(this)}
                  onAddition={this.onAddition.bind(this)}
                  placeholderText="Add tour packages"
                  noSuggestionsText="No tour package matches your input"
                  autoresize={false}
                  minQueryLength={1}
                />
                <br />
                <p>i.e {this.featuresConverter(this.state.tourFeatures)}</p>
                {this.state.selectedTourFeatures.map((element, index) => {
                  return (
                    <div>
                      <p className="label-text">{element.name}'s Price: </p>
                      <input
                        type="number"
                        // value={this.state.price}
                        required
                        onChange={(event) => {
                          let test_array = this.state.selectedTourFeatures;
                          test_array[index].price = event.target.value;
                          this.setState(
                            { selectedTourFeatures: test_array },
                            () => console.log(this.state.selectedTourFeatures)
                          );
                        }}
                      />
                      <br />
                    </div>
                  );
                })}
                <br />
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
                  <p className="label-text">Start date and time </p>
                  <DateTime
                    isValidDate={this.valid}
                    value={this.state.checkInTime}
                    onChange={(event) => this.setState({ checkInTime: event })}
                  />
                  <p className="label-text">End date and time </p>
                  <DateTime
                    isValidDate={this.valid}
                    value={this.state.checkOutTime}
                    onChange={(event) => this.setState({ checkOutTime: event })}
                  />
                </div>
              </div>
              <br />
              <p className="label-text">Price</p>
              <input
                type="number"
                value={this.state.price}
                required
                onChange={(tour) => this.setState({ price: tour.target.value })}
              />
              <br />
              <input
                type="checkbox"
                id="featured"
                name="featured"
                value={this.state.featured}
                onChange={(tour) =>
                  this.setState({ featured: tour.target.value })
                }
                style={{ width: "30px", height: "30px" }}
              />
              <label for="featured"> Set as featured</label>
              <br></br>
              <br />
              <div className="input-row">
                {/* <button onClick={this.createTour.bind(this)}>Create</button>{" "} */}
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
                <th>Tour name</th>
                <th>Author</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Tour features</th>
                {/* <th>Facilities</th> */}
                <th>Location</th>
                <th>Address</th>
                {/* <th>Action</th> */}
              </tr>
              {tour_data}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(Tours);
