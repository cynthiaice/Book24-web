import React, { Component } from "react";
import { IconContext } from "react-icons";
import { MdSettings, MdDeleteForever } from "react-icons/md";
// import Button from "react-bootstrap/Button";
import { API_URL } from "../../../components/config.js";
import LocationInput from "../../../components/locationInput";
import Loader from "../../../components/loader";
import axios from "axios";
import Cookies from "js-cookie";
var moment = require("moment");
import Sidebar from "../sidebar";
import Link from "next/link";
import { withRouter } from "next/router";
import ReactTags from "react-tag-autocomplete";
import Images from "./Images";
import Buttons from "./Buttons";
import DateTime from "react-datetime";
import Head from "next/head";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
// import ImageUploader from "react-images-upload";

const KeyCodes = {
  comma: "188",
  enter: "13",
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class Hotels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideSidenav: "hidden",
      show: false,
      hotels: [],
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
      selectedHotelFacilities: [],
      address: "",
      hotelNumber: "",
      hotelEmail: "",
      logo: [],
      pictures: [],
      hotelWebsite: "",
      address: "",
      featured: false,
      hotelFacilites: [],
      hotelFeatures: [],
      selectedHotelFeatures: [],
      loader: false,
      show: false,
      item: {},
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
    const selectedHotelFeatures = this.state.selectedHotelFeatures.slice(0);
    selectedHotelFeatures.splice(i, 1);
    this.setState({ selectedHotelFeatures });
  }

  onAddition(selectedHotelFeature) {
    var isPresent = false;
    for (let i = 0; i < this.state.selectedHotelFeatures.length; i++) {
      if (
        this.state.selectedHotelFeatures[i].name == selectedHotelFeature.name
      ) {
        isPresent = true;
        break;
      }
    }
    if (!isPresent) {
      const selectedHotelFeatures = [].concat(
        this.state.selectedHotelFeatures,
        selectedHotelFeature
      );
      this.setState({ selectedHotelFeatures }, () =>
        console.log(this.state.selectedHotelFeatures)
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
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "hotels", config)
      .then((response) => {
        console.log(response);
        var len = response.data.rows.length;
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            hotels: [...prevState.hotels, row],
          }));
        }
        this.getHotelFeatures();
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  }

  getHotelFeatures = async () => {
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "hotelFeatures", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ hotelFeatures: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            hotelFeatures: [...prevState.hotelFeatures, row],
          }));
        }
        // this.getHotelFacilities(token);
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error.response);
        if (error.response.status == 401) {
          this.props.router.push("/sade");
        }
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

  handleEdit = async (e) => {
    const { name, bio, upload_images, images, id } = this.state.item;
    e.preventDefault();
    this.setState({ error_div: false, editLoader: true });
    var formData = new FormData();
    if (upload_images != null && Object.keys(upload_images).length > 0) {
      for (const key of Object.keys(upload_images)) {
        formData.append("upload_images", upload_images[key]);
      }
    }
    console.log(upload_images);
    formData.append("name", name);
    formData.append("bio", bio);
    console.log(formData);
    // var post_data = {
    //   name,
    //   bio
    // }
    formData.append("images", JSON.stringify(images));
    let token = await Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "update-hotels/" + id.toString(), formData, config)
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
      })
      .finally(() => this.setState({ editLoader: false }));
  };
  async createHotel(e) {
    e.preventDefault();
    this.setState({ error_div: false, loader: true });
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    var formData = new FormData();
    for (const key of Object.keys(this.state.pictures)) {
      formData.append("images", this.state.pictures[key]);
    }
    formData.append("name", this.state.name);
    formData.append("bio", this.state.bio);
    formData.append("location", this.state.location);
    formData.append("address", this.state.address.label);
    formData.append("contact_email", this.state.hotelEmail);
    formData.append("contact_website", this.state.hotelWebsite);
    formData.append("contact_phone", this.state.hotelNumber);
    formData.append("verified", true);
    formData.append(
      "features",
      JSON.stringify(this.state.selectedHotelFeatures)
    );
    formData.append("check_in_time", this.state.checkInTime);
    formData.append("check_out_time", this.state.checkOutTime);
    formData.append("featured", this.state.featured);

    let token = await Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "hotel", formData, config)
      .then((response) => {
        this.setState({ loader: false });
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        this.setState({ loader: false });

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
    const hotel_data = this.state.hotels.map(
      function (item, index) {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.author && item.author.full_name}</td>
            <td>{this.featuresConverter(item.features)}</td>
            <td>{item.location}</td>
            <td>{item.address}</td>
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

    const ModalHotel = ({ handleClose, show, children }) => {
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
        <Head></Head>
        <Sidebar />
        <div className="main-box">
          {/* <ModalHotel
            show={this.state.show}
            handleClose={this.handleClose.bind(this)}
            delete={this.delete.bind(this)}
          >
            <p>Are you sure you want to delete this hotel</p>
          </ModalHotel> */}
          <p className="admin-header">Hotel</p>
          <br />
          <div className="input-row">
            <button
              className="admin-button"
              onClick={this.handleShowCreate.bind(this)}
            >
              <p>ADD HOTEL</p>
            </button>
            <div style={{ width: "10px" }} />
            <button
              className="admin-button"
              onClick={() => this.props.router.push("/admin/hotelFeatures")}
            >
              <p>FEATURES</p>
            </button>
            {/* <div style={{width:'10px'}} />
        <button
          className="admin-button"
          onClick={()=>this.props.router.push('/admin/hotelFacilities')}
        >
          <p>FACILITIES</p>
        </button> */}
          </div>
          <div className={showHideClassNameCreate}>
            <p className="admin-header">Add Hotel</p>
            {this.state.error_div && (
              <div className="error">{this.state.error}</div>
            )}
            {this.state.loader && <Loader />}
            <form onSubmit={this.createHotel.bind(this)}>
              <div className="form-box">
                <br />
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
                  {/* <input
                    type="text"
                    value={this.state.location}
                    required
                    onChange={(event) =>
                      this.setState({ location: event.target.value })
                    }
                  /> */}
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
                    onChange={(event) =>
                      this.setState({ address: event.target.value })
                    }
                  /> */}
                  <p className="label-text">Description</p>
                  <textarea
                    placeholder="Enter description of hotel"
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
                  <p className="label-text">Hotel Website </p>
                  <input
                    type="text"
                    required
                    value={this.state.hotelWebsite}
                    onChange={(event) =>
                      this.setState({ hotelWebsite: event.target.value })
                    }
                  />
                  <p className="label-text">Hotel Email </p>
                  <input
                    type="text"
                    required
                    value={this.state.hotelEmail}
                    onChange={(event) =>
                      this.setState({ hotelEmail: event.target.value })
                    }
                  />
                </div>
                <br />
                <div className="input-row">
                  <p className="label-text">Hotel Mobile Number </p>
                  <input
                    type="text"
                    required
                    value={this.state.hotelNumber}
                    onChange={(event) =>
                      this.setState({ hotelNumber: event.target.value })
                    }
                  />
                </div>
                <br />
                <div className="input-row">
                  <p className="label-text">Upload hotel images </p>
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
                  <p className="label-text">Check In Time </p>
                  <DateTime
                    dateFormat={false}
                    value={this.state.checkInTime}
                    onChange={(event) => this.setState({ checkInTime: event })}
                  />
                  {/* <input
                    type="text"
                    required
                    value={this.state.checkInTime}
                    onChange={(event) =>
                      this.setState({ checkInTime: event.target.value })
                    }
                  /> */}
                  <p className="label-text">Check Out Time </p>
                  <DateTime
                    dateFormat={false}
                    value={this.state.checkOutTime}
                    onChange={(event) => this.setState({ checkOutTime: event })}
                  />
                </div>
              </div>
              <br />

              <ReactTags
                ref={this.reactTags}
                tags={this.state.selectedHotelFeatures}
                suggestions={this.state.hotelFeatures}
                delimiters={delimiters}
                onDelete={this.onDelete.bind(this)}
                onAddition={this.onAddition.bind(this)}
                placeholderText="Add hotel features"
                noSuggestionsText="No hotel features match your input"
                autoresize={false}
                minQueryLength={1}
              />
              <p>i.e {this.featuresConverter(this.state.hotelFeatures)}</p>
              {/* <ImageUploader
        withIcon={true}
        buttonText="Choose Logo"
        onChange={this.onDropLogo}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      /> */}
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
              <br />
              <div className="input-row">
                {/* <button onClick={this.createHotel.bind(this)}>Create</button>{" "} */}
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
                <th>Hotel name</th>
                <th>Author</th>
                <th>Features</th>
                {/* <th>Facilities</th> */}
                <th>Location</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
              {hotel_data}
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
                    <InputGroup.Text id="basic-addon1">
                      Description
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Description"
                    aria-label="description"
                    aria-describedby="basic-addon1"
                    value={this.state.item.bio}
                    as="textarea"
                    onChange={(event) => {
                      let new_item = this.state.item;
                      new_item.bio = event.target.value;
                      this.setState({ item: new_item }, () =>
                        console.log(this.state.item)
                      );
                    }}
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <div className="col-lg-12">Upload new Images</div>
                  <br />
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    required
                    multiple
                    label={"Upload new Images"}
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
                <br />
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
                </InputGroup>

                {/* <label htmlFor="basic-url">Your vanity URL</label> */}
                {/* <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon3">
        https://example.com/users/
      </InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl id="basic-url" aria-describedby="basic-addon3" />
  </InputGroup> */}

                {/* <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text>$</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl aria-label="Amount (to the nearest dollar)" />
    <InputGroup.Append>
      <InputGroup.Text>.00</InputGroup.Text>
    </InputGroup.Append>
  </InputGroup> */}
                {/* 
  <InputGroup>
    <InputGroup.Prepend>
      <InputGroup.Text>With textarea</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl as="textarea" aria-label="With textarea" />
  </InputGroup> */}
              </div>
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

export default withRouter(Hotels);
