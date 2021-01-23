import React, { Component } from "react";
import { IconContext } from "react-icons";
import { MdSettings, MdDeleteForever } from "react-icons/md";
// import Button from "react-bootstrap/Button";
import { API_URL } from "../../../components/config.js";
import axios from "axios";
import Cookies from "js-cookie";
import LocationInput from "../../../components/locationInput";
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

class Discounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideSidenav: "hidden",
      show: false,
      discounts: [],
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
      selectedDiscountFacilities: [],
      address: "",
      discountNumber: "",
      discountEmail: "",
      logo: [],
      pictures: [],
      discountWebsite: "",
      address: "",
      featured: false,
      discountFacilites: [],
      discountFeatures: [],
      selectedDiscountFeatures: [],
      discounts: [],
      discountTypes: [],
      price: "",
      discountType: "single",
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
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
    const selectedDiscountFeatures = this.state.selectedDiscountFeatures.slice(
      0
    );
    selectedDiscountFeatures.splice(i, 1);
    this.setState({ selectedDiscountFeatures });
  }

  onAddition(selectedDiscountFeature) {
    var isPresent = false;
    for (let i = 0; i < this.state.selectedDiscountFeatures.length; i++) {
      if (
        this.state.selectedDiscountFeatures[i].name ==
        selectedDiscountFeature.name
      ) {
        isPresent = true;
        break;
      }
    }
    if (!isPresent) {
      const selectedDiscountFeatures = [].concat(
        this.state.selectedDiscountFeatures,
        selectedDiscountFeature
      );
      this.setState({ selectedDiscountFeatures }, () =>
        console.log(this.state.selectedDiscountFeatures)
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
      .get(API_URL + "discounts", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ discounts: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            discounts: [...prevState.discounts, row],
          }));
        }
        this.getDiscountFeatures(token);
      })
      .catch((error) => {
        //   router.push("/");
        console.log(error);
      });
  }

  getDiscountFeatures = async (token) => {
    if (token == null || token == "") {
      //    this.props.router.push("/login");
    }
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .get(API_URL + "discountFeatures", config)
      .then((response) => {
        console.log(response);
        if (response.data.message == "Token is not valid") {
          //      router.push("/");
        }
        var len = response.data.rows.length;
        this.setState({ discountFeatures: [] });
        for (let i = 0; i < len; i++) {
          let row = response.data.rows[i];
          this.setState((prevState) => ({
            discountFeatures: [...prevState.discountFeatures, row],
          }));
        }
        // this.getDiscountFacilities(token);
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
  createDiscount(e) {
    e.prdiscountDefault();
    this.setState({ error_div: false });
    var bodyParameters = {
      name: this.state.name,
      bio: this.state.bio,
      location: this.state.location,
      address: this.state.address,
      contact_email: this.state.discountEmail,
      contact_website: this.state.discountWebsite,
      contact_phone: this.state.discountNumber,
      verified: true,
      features: this.state.tags,
      check_in_time: this.state.startDate,
      check_out_time: this.state.endDate,
      //   logo: this.state.logo,
      image: this.state.pictures,
    };
    console.log(bodyParameters);
    let token = Cookies.get("token");
    var config = {
      headers: { Authorization: "Bearer " + token },
      timeout: 20000,
    };
    axios
      .post(API_URL + "discount", bodyParameters, config)
      .then((response) => {
        console.log(response);
        this.props.router("/admin/rooms");
        //   window.location.reload();
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
    const discount_data = this.state.discounts.map(
      function (item, index) {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.author.full_name}</td>
            <td>{item.discountType}</td>
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

    const ModalDiscount = ({ handleClose, show, children }) => {
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
          <ModalDiscount
            show={this.state.show}
            handleClose={this.handleClose.bind(this)}
            delete={this.delete.bind(this)}
          >
            <p>Are you sure you want to delete this discount</p>
          </ModalDiscount>
          <p className="admin-header">Discount</p>
          <br />
          <div className="input-row">
            <button
              className="admin-button"
              onClick={this.handleShowCreate.bind(this)}
            >
              <p>ADD DISCOUNT</p>
            </button>
            <div style={{ width: "10px" }} />
            {/* <button
              className="admin-button"
              onClick={() => this.props.router.push("/admin/discountTypes")}
            >
              <p>RENTAL TYPES</p>
            </button> */}
            {/* <div style={{width:'10px'}} />
        <button
          className="admin-button"
          onClick={()=>this.props.router.push('/admin/discountFacilities')}
        >
          <p>FACILITIES</p>
        </button> */}
          </div>
          <div className={showHideClassNameCreate}>
            <p className="admin-header">Add Discount</p>
            {this.state.error_div && (
              <div className="error">{this.state.error}</div>
            )}
            <form onSubmit={this.createDiscount.bind(this)}>
              <div className="form-box">
                <br />
                <div className="input-row">
                  <p className="label-text">Name</p>
                  <input
                    type="text"
                    value={this.state.name}
                    required
                    onChange={(discount) =>
                      this.setState({ name: discount.target.value })
                    }
                  />
                </div>
                <br />
                <div className="input-row">
                  <p className="label-text">Price</p>
                  <input
                    type="number"
                    value={this.state.price}
                    required
                    onChange={(discount) =>
                      this.setState({ price: discount.target.value })
                    }
                  />
                </div>
                <br />
                <div className="input-row">
                  <p className="label-text">Description</p>
                  <textarea
                    placeholder="Enter description of discount"
                    cols="30"
                    rows="5"
                    type="text"
                    value={this.state.bio}
                    required
                    onChange={(discount) =>
                      this.setState({ bio: discount.target.value })
                    }
                  />
                </div>
                <br />
                <p className="label-text">Discount type </p>
                <input
                  type="radio"
                  id="once"
                  name="discountType"
                  value="once"
                  onChange={(e) =>
                    this.setState({ discountType: e.target.value })
                  }
                />
                <label for="once">Once</label>
                <br />
                <input
                  type="radio"
                  id="continuous"
                  name="discountType"
                  value="continuous"
                  onChange={(e) =>
                    this.setState({ discountType: e.target.value })
                  }
                />
                <label for="continuous">Continuous</label>
                <br />
                {this.state.discountType == "single" ? (
                  <div className="input-row">
                    <p className="label-text">Start date and time</p>
                    <DateTime
                      dateFormat={false}
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
                ) : (
                  <div className="input-row">
                    <input
                      type="checkbox"
                      id="monday"
                      name="monday"
                      value={this.state.monday}
                      onChange={(day) =>
                        this.setState({ monday: day.target.value })
                      }
                      style={{ width: "30px", height: "30px" }}
                    />
                    <label for="monday" style={{ marginRight: "10px" }}>
                      {" "}
                      Monday
                    </label>
                    <input
                      type="checkbox"
                      id="tuesday"
                      name="tuesday"
                      value={this.state.tuesday}
                      onChange={(day) =>
                        this.setState({ tuesday: day.target.value })
                      }
                      style={{ width: "30px", height: "30px" }}
                    />
                    <label for="tuesday" style={{ marginRight: "10px" }}>
                      {" "}
                      Tuesday
                    </label>
                    <input
                      type="checkbox"
                      id="wednesday"
                      name="wednesday"
                      value={this.state.wednesday}
                      onChange={(day) =>
                        this.setState({ wednesday: day.target.value })
                      }
                      style={{ width: "30px", height: "30px" }}
                    />
                    <label for="wednesday" style={{ marginRight: "10px" }}>
                      {" "}
                      Wednesday
                    </label>
                    <input
                      type="checkbox"
                      id="thursday"
                      name="thursday"
                      value={this.state.thursday}
                      onChange={(day) =>
                        this.setState({ thursday: day.target.value })
                      }
                      style={{ width: "30px", height: "30px" }}
                    />
                    <label for="thursday" style={{ marginRight: "10px" }}>
                      {" "}
                      Thursday
                    </label>
                    <input
                      type="checkbox"
                      id="friday"
                      name="friday"
                      value={this.state.friday}
                      onChange={(day) =>
                        this.setState({ friday: day.target.value })
                      }
                      style={{ width: "30px", height: "30px" }}
                    />
                    <label for="friday" style={{ marginRight: "10px" }}>
                      Friday
                    </label>
                    <input
                      type="checkbox"
                      id="saturday"
                      name="saturday"
                      value={this.state.saturday}
                      onChange={(day) =>
                        this.setState({ saturday: day.target.value })
                      }
                      style={{ width: "30px", height: "30px" }}
                    />
                    <label for="friday" style={{ marginRight: "10px" }}>
                      Saturday
                    </label>
                    <input
                      type="checkbox"
                      id="sunday"
                      name="sunday"
                      value={this.state.sunday}
                      onChange={(day) =>
                        this.setState({ sunday: day.target.value })
                      }
                      style={{ width: "30px", height: "30px" }}
                    />
                    <label for="friday" style={{ marginRight: "10px" }}>
                      Sunday
                    </label>
                  </div>
                )}
              </div>
              <br />
              <p className="label-text">Choose a Discount Type</p>

              <select
                name="discount"
                id="discountId"
                onChange={(discount) =>
                  this.setState({ discount: discount.target.value })
                }
              >
                <option value={"hotel"}>{"Hotel"}</option>
                <option value={"tour"}>{"Tour"}</option>
              </select>
              <br />
              {/* <input
                type="checkbox"
                id="featured"
                name="featured"
                value={this.state.featured}
                onChange={(discount) =>
                  this.setState({ featured: discount.target.value })
                }
                style={{ width: "30px", height: "30px" }}
              />
              <label for="featured"> Set as featured</label> */}
              <br></br>
              <br />
              <div className="input-row">
                {/* <button onClick={this.createDiscount.bind(this)}>Create</button>{" "} */}
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
                <th>Discount name</th>
                <th>Author</th>
                <th>Discount Type</th>
                {/* <th>Facilities</th> */}
                <th>Location</th>
                <th>Address</th>
                {/* <th>Action</th> */}
              </tr>
              {discount_data}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(Discounts);
