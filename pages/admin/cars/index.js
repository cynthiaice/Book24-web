import React, { Component } from "react";
import { IconContext } from "react-icons";
import { MdSettings, MdDeleteForever } from "react-icons/md";
// import Button from "react-bootstrap/Button";
import { API_URL } from "../../../components/config.js";
import LocationInput from "../../../components/locationInput.js";
import axios from "axios";
import Loader from "../../../components/loader";
import Cookies from "js-cookie";
var moment = require("moment");
import Sidebar from "../sidebar";
import Link from "next/link";
import { withRouter } from "next/router";
import ReactTags from "react-tag-autocomplete";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import ImageUploader from "react-images-upload";

const KeyCodes = {
  comma: "188",
  enter: "13",
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class Cars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideSidenav: "hidden",
      show: false,
      cars: [],
      toDelete: "",
      showCreate: false,
      number: "",
      name: "",
      last_name: "",
      address: "",
      zip: "",
      email: "",
      password: "",
      error_div: false,
      error: "",
      checkInTime: "",
      checkOutTime: "",
      selectedCarFacilities: [],
      address: "",
      carNumber: "",
      carEmail: "",
      logo: [],
      pictures: [],
      carWebsite: "",
      address: "",
      featured: false,
      carFacilites: [],
      carFeatures: [],
      selectedCarFeatures: [],
      cars: [],
      carCategories: [],
      carCategory: "",
      carColor: "",
      carYear: "",
      carMilleage: "",
      carModel: "",
      price: "",
      loader: false,
    };
    this.reactTags = React.createRef();
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

  onDelete(i) {
    const selectedCarFeatures = this.state.selectedCarFeatures.slice(0);
    selectedCarFeatures.splice(i, 1);
    this.setState({ selectedCarFeatures });
  }

  onAddition(selectedCarFeature) {
    var isPresent = false;
    for (let i = 0; i < this.state.selectedCarFeatures.length; i++) {
      if (this.state.selectedCarFeatures[i].name == selectedCarFeature.name) {
        isPresent = true;
        break;
      }
    }
    if (!isPresent) {
      const selectedCarFeatures = [].concat(
        this.state.selectedCarFeatures,
        selectedCarFeature
      );
      this.setState({ selectedCarFeatures }, () =>
        console.log(this.state.selectedCarFeatures)
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
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "cars", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ cars: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            cars: [...prevState.cars, row],
          }));
        }
        this.getCarFeatures(token);
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  }

  getCarFeatures = async (token) => {
    if (token == null || token == "") {
      //    this.props.router.push("/login");
    }
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "carFeatures", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ carFeatures: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            carFeatures: [...prevState.carFeatures, row],
          }));
        }
        this.getCarCategories(token);
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

  getCarCategories = async (token) => {
    if (token == null || token == "") {
      //    this.props.router.push("/login");
    }
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "carCategories", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ carCategories: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            carCategories: [...prevState.carCategories, row],
          }));
        }
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
  createCar(e) {
    e.preventDefault();
    this.setState({ error_div: false, loader: true });
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    var formData = new FormData();
    for (const key of Object.keys(this.state.pictures)) {
      formData.append("images", this.state.pictures[key]);
    }
    formData.append("name", this.state.name);
    formData.append("description", this.state.bio);
    formData.append("location", this.state.location);
    formData.append("address", this.state.address.label);
    formData.append("contact_email", this.state.hotelEmail);
    formData.append("contact_website", this.state.hotelWebsite);
    formData.append("contact_phone", this.state.hotelNumber);
    formData.append("carColor", this.state.carColor);
    formData.append("carCategory", this.state.carCategory);
    formData.append("carModel", this.state.carModel);
    formData.append("carMilleage", this.state.carMilleage);
    formData.append("carYear", this.state.carYear);
    formData.append("price", this.state.price);
    formData.append("features", JSON.stringify(this.state.selectedCarFeatures));

    console.log(formData);
    let token = Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "car", formData, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
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

  onChange = (e) => {
    const files = Array.from(e.target.files);
    this.setState({ uploading: true });

    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file);
    });
    fetch(`${API_URL}/image-upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((images) => {
        this.setState({
          uploading: false,
          images,
        });
      });
  };

  render() {
    let { showCreate, pictures, address } = this.state;

    const setAddress = (address) => this.setState({ address });
    const car_data = this.state.cars.map(
      function (item, index) {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.author.full_name}</td>
            <td>{this.featuresConverter(item.features)}</td>
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

    const ModalCar = ({ handleClose, show, children }) => {
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
          <ModalCar
            show={this.state.show}
            handleClose={this.handleClose.bind(this)}
            delete={this.delete.bind(this)}
          >
            <p>Are you sure you want to delete this car</p>
          </ModalCar>
          <p className="admin-header">Car</p>
          <div className="input-row">
            <button
              className="admin-button"
              onClick={this.handleShowCreate.bind(this)}
            >
              <p>ADD CAR</p>
            </button>
            <div style={{ width: "10px" }} />
            <button
              className="admin-button"
              onClick={() => this.props.router.push("/admin/carFeatures")}
            >
              <p>CAR FEATURES</p>
            </button>
            <div style={{ width: "10px" }} />
            <button
              className="admin-button"
              onClick={() => this.props.router.push("/admin/carCategory")}
            >
              <p>CAR CATEGORY</p>
            </button>
          </div>
          <div className={showHideClassNameCreate}>
            <p className="admin-header">Add Car</p>
            {this.state.error_div && (
              <div className="error">{this.state.error}</div>
            )}
            <form onSubmit={this.createCar.bind(this)}>
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
                  <p className="label-text">Location</p>
                  <LocationInput
                    saveLocation={(event) => {
                      this.setState({ location: event.target.value }, () =>
                        console.log(this.state.location)
                      );
                    }}
                  />
                </div>
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
                  <p className="label-text">Car Model</p>
                  <input
                    type="text"
                    required
                    value={this.state.carModel}
                    onChange={(event) =>
                      this.setState({ carModel: event.target.value })
                    }
                  />
                </div>
                <div className="input-row">
                  <p className="label-text">Car Color</p>
                  <input
                    type="text"
                    required
                    value={this.state.carColor}
                    onChange={(event) =>
                      this.setState({ carColor: event.target.value })
                    }
                  />
                  <p className="label-text">Car Milleage</p>
                  <input
                    type="text"
                    required
                    value={this.state.carMilleage}
                    onChange={(event) =>
                      this.setState({ carMilleage: event.target.value })
                    }
                  />
                </div>
                <div className="input-row">
                  <p className="label-text">Car Year</p>
                  <input
                    type="text"
                    required
                    value={this.state.carYear}
                    onChange={(event) =>
                      this.setState({ carYear: event.target.value })
                    }
                  />
                  <p className="label-text">Description</p>
                  <textarea
                    placeholder="Enter description of car"
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
                <div className="input-row">
                  <p className="label-text">Car Website </p>
                  <input
                    type="text"
                    value={this.state.carWebsite}
                    onChange={(event) =>
                      this.setState({ carWebsite: event.target.value })
                    }
                  />
                  <p className="label-text">Car Email </p>
                  <input
                    type="text"
                    value={this.state.carEmail}
                    onChange={(event) =>
                      this.setState({ carEmail: event.target.value })
                    }
                  />
                </div>
                <div className="input-row">
                  <p className="label-text">Car Mobile Number </p>
                  <input
                    type="text"
                    value={this.state.carNumber}
                    onChange={(event) =>
                      this.setState({ carNumber: event.target.value })
                    }
                  />
                </div>
                <div className="input-row">
                  <p className="label-text">Upload car images </p>
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
                  <p className="label-text">Price </p>
                  <input
                    type="number"
                    required
                    value={this.state.price}
                    onChange={(event) =>
                      this.setState({ price: event.target.value })
                    }
                  />
                </div>
              </div>
              <br />
              <p className="label-text">Choose a Car Category</p>

              <select
                name="carCategory"
                id="carCategoryId"
                onChange={(carCategory) =>
                  this.setState({ carCategory: carCategory.target.value })
                }
              >
                {this.state.carCategories.map((element) => (
                  <option value={element.id}>{element.name}</option>
                ))}
              </select>
              <br />
              <br />

              <ReactTags
                ref={this.reactTags}
                tags={this.state.selectedCarFeatures}
                suggestions={this.state.carFeatures}
                delimiters={delimiters}
                onDelete={this.onDelete.bind(this)}
                onAddition={this.onAddition.bind(this)}
                placeholderText="Add car features"
                noSuggestionsText="No car features match your input"
                autoresize={false}
                minQueryLength={1}
              />
              <p>i.e {this.featuresConverter(this.state.carFeatures)}</p>
              {/* <ImageUploader
        withIcon={true}
        buttonText="Choose Logo"
        onChange={this.onDropLogo}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      /> */}
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
                {/* <button onClick={this.createCar.bind(this)}>Create</button>{" "} */}
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
                <th>Car name</th>
                <th>Author</th>
                <th>Features</th>
                {/* <th>Facilities</th> */}
                <th>Location</th>
                <th>Address</th>
                {/* <th>Action</th> */}
              </tr>
              {car_data}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(Cars);
