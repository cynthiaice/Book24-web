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
import Loader from "../../../components/loader";
import { withAlert } from "react-alert";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import ImageUploader from "react-images-upload";

const KeyCodes = {
  comma: "188",
  enter: "13",
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class Activitys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideSidenav: "hidden",
      show: false,
      activitys: [],
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
      checkInTime: "",
      checkOutTime: "",
      selectedActivityFacilities: [],
      address: "",
      activityNumber: "",
      activityEmail: "",
      logo: [],
      pictures: [],
      activityWebsite: "",
      address: "",
      featured: false,
      activityFacilites: [],
      attractions: [],
      activityTypes: [],
      selectedAttractions: [],
      type_id: "",
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
    const selectedAttractions = this.state.selectedAttractions.slice(0);
    selectedAttractions.splice(i, 1);
    this.setState({ selectedAttractions });
  }

  onAddition(selectedActivityFeature) {
    var isPresent = false;
    for (let i = 0; i < this.state.selectedAttractions.length; i++) {
      if (
        this.state.selectedAttractions[i].name == selectedActivityFeature.name
      ) {
        isPresent = true;
        break;
      }
    }
    if (!isPresent) {
      const selectedAttractions = [].concat(
        this.state.selectedAttractions,
        selectedActivityFeature
      );
      this.setState({ selectedAttractions }, () =>
        console.log(this.state.selectedAttractions)
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
      .get(API_URL + "thingsToDos", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ activitys: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            activitys: [...prevState.activitys, row],
          }));
        }
        this.getActivityTypes(token);
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  }

  getActivityTypes = async (token) => {
    if (token == null || token == "") {
      //    this.props.router.push("/login");
    }
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "thingsToDoTypes", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ activityTypes: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            activityTypes: [...prevState.activityTypes, row],
          }));
        }
        this.getAttractions(token);
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  };

  getAttractions = async (token) => {
    if (token == null || token == "") {
      //    this.props.router.push("/login");
    }
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "attractions", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ attractions: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            attractions: [...prevState.attractions, row],
          }));
        }
        // this.getActivityFacilities(token);
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
  createActivity(e) {
    const { alert } = this.props;
    e.preventDefault();
    this.setState({ error_div: false, loader: true });
    if (this.state.type_id == "") {
      this.setState({ error_div: false, loader: false });

      return alert.show(<div>A valid activity type is required</div>, {
        type: "error",
      });
    }
    var formData = new FormData();
    for (const key of Object.keys(this.state.pictures)) {
      formData.append("image", this.state.pictures[key]);
    }
    formData.append("name", this.state.name);
    formData.append("description", this.state.bio);
    formData.append("location", this.state.location);
    formData.append("address", this.state.address.label);
    formData.append("contact_email", this.state.hotelEmail);
    formData.append("contact_website", this.state.hotelWebsite);
    formData.append("contact_phone", this.state.hotelNumber);
    formData.append("verified", true);
    formData.append("type_id", this.state.type_id);

    formData.append("features", JSON.stringify(this.state.tags));
    formData.append("check_in_time", this.state.checkInTime);
    formData.append("check_out_time", this.state.checkOutTime);
    formData.append("featured", this.state.featured);

    let token = Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "thingsToDo", formData, config)
      .then((response) => {
        this.setState({ loader: false });
        console.log(response);
        window.location.reload();
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
    const content = () => {
      switch (true) {
        case pictures.length > 0:
          return <Images images={pictures} removeImage={this.removeImage} />;
        default:
          return <Buttons onChange={this.onChange} />;
      }
    };
    const activity_data = this.state.activitys.map(
      function (item, index) {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.author.full_name}</td>
            <td>{this.featuresConverter(item.attractions)}</td>
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

    const ModalActivity = ({ handleClose, show, children }) => {
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
          <ModalActivity
            show={this.state.show}
            handleClose={this.handleClose.bind(this)}
            delete={this.delete.bind(this)}
          >
            <p>Are you sure you want to delete this activity</p>
          </ModalActivity>
          <p className="admin-header">Activity</p>
          <div className="input-row">
            <button
              className="admin-button"
              onClick={this.handleShowCreate.bind(this)}
            >
              <p>ADD ACTIVITY</p>
            </button>
            <div style={{ width: "10px" }} />
            <button
              className="admin-button"
              onClick={() => this.props.router.push("/admin/attractions")}
            >
              <p>ATTRACTIONS</p>
            </button>
            <div style={{ width: "10px" }} />
            <button
              className="admin-button"
              onClick={() => this.props.router.push("/admin/activity-types")}
            >
              <p>ACTIVITY TYPES</p>
            </button>
            {/* <div style={{width:'10px'}} />
        <button
          className="admin-button"
          onClick={()=>this.props.router.push('/admin/activityFacilities')}
        >
          <p>FACILITIES</p>
        </button> */}
          </div>
          <div className={showHideClassNameCreate}>
            <p className="admin-header">Add Activity</p>
            {this.state.error_div && (
              <div className="error">{this.state.error}</div>
            )}
            {this.state.loader && <Loader />}
            <form onSubmit={this.createActivity.bind(this)}>
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
                  {/* <input
                    type="text"
                    required
                    value={this.state.address}
                    onChange={(event) =>
                      this.setState({ address: event.target.value })
                    }
                  /> */}
                  <p className="label-text">Description</p>
                  <textarea
                    placeholder="Enter description of activity"
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
                  <p className="label-text">Activity Website </p>
                  <input
                    type="text"
                    value={this.state.activityWebsite}
                    onChange={(event) =>
                      this.setState({ activityWebsite: event.target.value })
                    }
                  />
                  <p className="label-text">Activity Email </p>
                  <input
                    type="text"
                    value={this.state.activityEmail}
                    onChange={(event) =>
                      this.setState({ activityEmail: event.target.value })
                    }
                  />
                </div>
                <div className="input-row">
                  <p className="label-text">Activity Mobile Number </p>
                  <input
                    type="text"
                    value={this.state.activityNumber}
                    onChange={(event) =>
                      this.setState({ activityNumber: event.target.value })
                    }
                  />
                  {/* <p className="label-text">Upload activity logo </p>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    required
                    value={this.state.logo.url}
                    onChange={(event) =>
                      this.setState({ logo: event.target.files }, () =>
                        console.log(this.state.logo)
                      )
                    }
                  /> */}
                </div>
                <div className="input-row">
                  <p className="label-text">Upload activity images </p>
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
              </div>
              <p className="label-text">Choose an Activity type</p>

              <select
                name="activityType"
                id="activityTypeId"
                onChange={(activityType) =>
                  this.setState({ type_id: activityType.target.value })
                }
              >
                {this.state.activityTypes.map((element) => (
                  <option value={element.id}>{element.name}</option>
                ))}
              </select>
              <br />
              <br />
              <br />

              <ReactTags
                ref={this.reactTags}
                tags={this.state.selectedAttractions}
                suggestions={this.state.attractions}
                delimiters={delimiters}
                onDelete={this.onDelete.bind(this)}
                onAddition={this.onAddition.bind(this)}
                placeholderText="Add attractions"
                noSuggestionsText="No attractions"
                autoresize={false}
                minQueryLength={1}
              />
              <p>i.e {this.featuresConverter(this.state.attractions)}</p>
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
                {/* <button onClick={this.createActivity.bind(this)}>Create</button>{" "} */}
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
                <th>Activity name</th>
                <th>Author</th>
                <th>Attractions</th>
                {/* <th>Facilities</th> */}
                <th>Location</th>
                <th>Address</th>
                {/* <th>Action</th> */}
              </tr>
              {activity_data}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const Activitys_ = withRouter(Activitys);
export default withAlert()(Activitys_);
