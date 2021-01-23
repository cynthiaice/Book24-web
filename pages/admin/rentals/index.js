import React, { Component } from "react";
import { IconContext } from "react-icons";
import { MdSettings, MdDeleteForever } from "react-icons/md";
// import Button from "react-bootstrap/Button";
import { API_URL } from "../../../components/config.js";
import axios from "axios";
import Cookies from "js-cookie";
import LocationInput from "../../../components/locationInput"
import Sidebar from "../sidebar";
import Link from "next/link";
import { withRouter } from "next/router";
import ReactTags from "react-tag-autocomplete";
import Images from "./Images";
import Buttons from "./Buttons";
import DateTime from "react-datetime";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import moment from "moment";
// import ImageUploader from "react-images-upload";

const KeyCodes = {
  comma: "188",
  enter: "13",
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class Rentals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideSidenav: "hidden",
      show: false,
      rentals: [],
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
      selectedRentalFacilities: [],
      address: "",
      rentalNumber: "",
      rentalEmail: "",
      logo: [],
      pictures: [],
      rentalWebsite: "",
      address: "",
      featured: false,
      rentalFacilites: [],
      rentalFeatures: [],
      selectedRentalFeatures: [],
      rentals: [],
      rentalTypes: [],
      price: "",
      rental_type: '',
      location: ''
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
    const selectedRentalFeatures = this.state.selectedRentalFeatures.slice(0);
    selectedRentalFeatures.splice(i, 1);
    this.setState({ selectedRentalFeatures });
  }

  onAddition(selectedRentalFeature) {
    var isPresent = false;
    for (let i = 0; i < this.state.selectedRentalFeatures.length; i++) {
      if (
        this.state.selectedRentalFeatures[i].name == selectedRentalFeature.name
      ) {
        isPresent = true;
        break;
      }
    }
    if (!isPresent) {
      const selectedRentalFeatures = [].concat(
        this.state.selectedRentalFeatures,
        selectedRentalFeature
      );
      this.setState({ selectedRentalFeatures }, () =>
        console.log(this.state.selectedRentalFeatures)
      );
    }
  }

  valid(current) {
    return current.isAfter(moment().subtract(1, "day"));
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
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "rentals", config)
      .then((response) => {
        console.log(response);
        console.log('sks')
        var len = response.data.rows.length;
        this.setState({ rentals: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            rentals: [...prevState.rentals, row],
          }));
        }
        this.getRentalTypes();
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  }

  getRentalTypes = async () => {
    console.log('sksjs')
    var config = {
      timeout: 20000,
    };
    axios
      .get(API_URL + "rentalTypes", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ rentalTypes: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            rentalTypes: [...prevState.rentalTypes, row],
          }));
        }
        // this.getRentalFacilities(token);
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
  createRental(e) {
    e.preventDefault();
    this.setState({ error_div: false });
        var formData = new FormData();
    for (const key of Object.keys(this.state.pictures)) {
        formData.append('images', this.state.pictures[key])
    }
    formData.append('name', this.state.name);
    formData.append('description', this.state.bio);
    formData.append('location', this.state.location);
    formData.append('address', this.state.address.label);
    formData.append('contact_email', this.state.hotelEmail);
    formData.append('contact_website', this.state.hotelWebsite);
    formData.append('contact_phone', this.state.hotelNumber);
    formData.append('verified', true);
     formData.append('rental_type', this.state.rental_type||this.state.rentalTypes[0].name);
    formData.append('start_date', this.state.checkInTime)
    formData.append('end_date', this.state.checkOutTime)
    formData.append('featured', this.state.featured)
    formData.append('price', this.state.price)
    let token = Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "rental", formData, config)
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
    const rental_data = this.state.rentals.map(
      function (item, index) {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.author.full_name}</td>
            <td>{item.rentalType}</td>
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

    const ModalRental = ({ handleClose, show, children }) => {
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
          <ModalRental
            show={this.state.show}
            handleClose={this.handleClose.bind(this)}
            delete={this.delete.bind(this)}
          >
            <p>Are you sure you want to delete this rental</p>
          </ModalRental>
          <p className="admin-header">Rental</p>
          <br/><div className="input-row">
            <button
              className="admin-button"
              onClick={this.handleShowCreate.bind(this)}
            >
              <p>ADD RENTAL</p>
            </button>
            <div style={{ width: "10px" }} />
            <button
              className="admin-button"
              onClick={() => this.props.router.push("/admin/rentalTypes")}
            >
              <p>RENTAL TYPES</p>
            </button>
            {/* <div style={{width:'10px'}} />
        <button
          className="admin-button"
          onClick={()=>this.props.router.push('/admin/rentalFacilities')}
        >
          <p>FACILITIES</p>
        </button> */}
          </div>
          <div className={showHideClassNameCreate}>
            <p className="admin-header">Add Rental</p>
            {this.state.error_div && (
              <div className="error">{this.state.error}</div>
            )}
            <form onSubmit={this.createRental.bind(this)}>
              <div className="form-box">
                <br/><div className="input-row">
                  <p className="label-text">Name</p>
                  <input
                    type="text"
                    value={this.state.name}
                    
                    onChange={(rental) =>
                      this.setState({ name: rental.target.value })
                    }
                  />
                  <p className="label-text">Location</p>
                  <LocationInput saveLocation={(event) => {
                     this.setState({ location: event.target.value },
                     ()=>console.log(this.state.location))
                  }} />
                </div>
                <br/><div className="input-row">
                  <p className="label-text">Price</p>
                  <input
                    type="number"
                    value={this.state.price}
                    
                    onChange={(rental) =>
                      this.setState({ price: rental.target.value })
                    }
                  />
                </div>
                <br/><div className="input-row">
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
                    
                    value={this.state.address}
                    onChange={(rental) =>
                      this.setState({ address: rental.target.value })
                    }
                  /> */}
                  <p className="label-text">Description</p>
                  <textarea
                    placeholder="Enter description of rental"
                    cols="30"
                    rows="5"
                    type="text"
                    value={this.state.bio}
                    
                    onChange={(rental) =>
                      this.setState({ bio: rental.target.value })
                    }
                  />
                </div>
                <br/><div className="input-row">
                  <p className="label-text">Rental Website </p>
                  <input
                    type="text"
                    
                    value={this.state.rentalWebsite}
                    onChange={(rental) =>
                      this.setState({ rentalWebsite: rental.target.value })
                    }
                  />
                  <p className="label-text">Rental Email </p>
                  <input
                    type="text"
                    
                    value={this.state.rentalEmail}
                    onChange={(rental) =>
                      this.setState({ rentalEmail: rental.target.value })
                    }
                  />
                </div>
                <br/><div className="input-row">
                  <p className="label-text">Rental Mobile Number </p>
                  <input
                    type="text"
                    
                    value={this.state.rentalNumber}
                    onChange={(rental) =>
                      this.setState({ rentalNumber: rental.target.value })
                    }
                  />
                  {/* <p className="label-text">Upload rental logo </p>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    
                    value={this.state.logo.url}
                    onChange={(rental) =>
                      this.setState({ logo: rental.target.files }, () =>
                        console.log(this.state.logo)
                      )
                    }
                  /> */}
                </div>
                <br/><div className="input-row">
                  <p className="label-text">Upload rental images </p>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    
                    multiple
                    //    value={this.state.logo.url}
                    onChange={(rental) => {
                      let test_pictures = [];
                      for (let i = 0; i < rental.target.files.length; i++) {
                        test_pictures.push(rental.target.files[i]);
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
                <br/><div className="input-row">
                  <p className="label-text">Check In Time </p>
                  <DateTime
                    dateFormat={false}
                    value={this.state.checkInTime}
                    onChange={(event) => this.setState({ checkInTime: event })}
                  />
                  <p className="label-text">Check Out Time </p>
                  <DateTime
                    dateFormat={false}
                    // isValidDate={valid}
                    value={this.state.checkOutTime}
                    onChange={(event) => this.setState({ checkOutTime: event })}
                  />
                </div>
              </div>
              <br />
              <br />
              <p className="label-text">Choose a Rental Type</p>

              <select
                name="rental"
                id="rentalId"
                onChange={(rentalType) =>
                  this.setState({ rental_type: rentalType.target.value })
                }
                value={this.state.rental_type}
              >
                {this.state.rentalTypes.map((element) => (
                  <option value={element.name}>{element.name}</option>
                ))}
              </select>
              <br />
              <br />   <br />   <br />
              <input
                type="checkbox"
                id="featured"
                name="featured"
                value={this.state.featured}
                onChange={(rental) =>
                  this.setState({ featured: rental.target.value })
                }
                style={{ width: "30px", height: "30px" }}
              />
              <label for="featured"> Set as featured</label>
              <br></br>
              <br/><div className="input-row">
                {/* <button onClick={this.createRental.bind(this)}>Create</button>{" "} */}
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
                <th>Rental name</th>
                <th>Author</th>
                <th>Rental Type</th>
                {/* <th>Facilities</th> */}
                <th>Location</th>
                <th>Address</th>
                {/* <th>Action</th> */}
              </tr>
              {rental_data}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(Rentals);
