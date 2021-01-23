import React from "react";
import CardItem from "./CardItem";
import moment from "moment";
import DateTime from "react-datetime";
import { connect } from "react-redux";
import { getCurrentHotel } from "../store/actions/hotels";
class BookingsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      searchTest: [],
    };
    this.searchRef = React.createRef();
  }

  validTo = (current) => {
    return current.isAfter(moment(this.props.fromTime));
  };

  searchResult = () => {};
  render() {
    const {
      bookings,
      value,
      onChange,
      fromTime,
      fromChange,
      toTime,
      toChange,
      searchValue,
      viewClick,
    } = this.props;
    return (
      <div className="form-content pb-2">
        <div
          className="db_list_top"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="select-contain col-lg-4">
            <label className="label-text">Filter By</label>
            <select
              className="select-contain-select"
              onChange={onChange}
              style={{ padding: "10px 10px 10px 0px" }}
            >
              <option value="All">All</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Date">Date</option>
            </select>
          </div>
          <div className="col-lg-4">
            <div className="input-box">
              <label className="label-text">Date From</label>
              <div className="form-group">
                <DateTime
                  value={fromTime}
                  onChange={fromChange}
                  timeFormat={false}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="input-box">
              <label className="label-text">Date To</label>
              <div className="form-group">
                <DateTime
                  isValidDate={this.validTo}
                  value={toTime}
                  onChange={toChange}
                  timeFormat={false}
                />
              </div>
            </div>
          </div>
        </div>

        <div id="booking-list-container">
          <h3></h3>
          {bookings

            .sort((a, b) => {
              return (
                new Date(moment(b.createdAt).format("YYYY-MM-DD")) -
                new Date(moment(a.createdAt).format("YYYY-MM-DD"))
              );
            })
            .filter((item) => {
              if (!fromTime || !toTime) {
                return item;
              } else if (
                moment(moment(item.createdAt).format("YYYY-MM-DD")).isBetween(
                  moment(fromTime).format("YYYY-MM-DD"),
                  moment(toTime).format("YYYY-MM-DD")
                )
              ) {
                return item;
              }
            })
            .filter((item) => {
              if (!searchValue) {
                return item;
              } else if (
                (item.owner &&
                  item.owner.full_name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())) ||
                item.payment_reference
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                (item.tour &&
                  item.tour.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())) ||
                (item.room &&
                  item.room.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()))
              ) {
                return item;
              }
            })
            .map((item, i) => {
              let card = (
                <CardItem
                  btn
                  btnText="View"
                  viewClick={async () => {
                    await this.props.getCurrentHotel(item);
                    viewClick();
                  }}
                  noEditBtn
                  noDelBtn
                  isBook
                  btnText="View"
                  key={item.payment_reference + i}
                  cardName={item.payment_reference}
                  showStat
                  badge={(item.paid && "badge-success") || "badge-danger"}
                  status={(item.paid && "Paid") || "Pending"}
                  titleOne="Booked by: "
                  detailOne={` ${
                    item.owner && item.owner.full_name
                  } on ${moment(item.createdAt).format(
                    "dddd, MMM Do YYYY"
                  )} From ${moment(item.check_in_date).format(
                    "dddd, MMM Do YYYY"
                  )} to ${moment(item.check_out_date).format(
                    "dddd, MMM Do YYYY"
                  )}`}
                  // titleTwo="Author:"
                  // detailTwo={item.author && item.author.full_name}
                  // editClick={async () => {
                  //   await this.props.getCurrentHotel(item);
                  //   this.renderViews("showEditForm");
                  // }}
                  // deleteClick={async () => {
                  //   await this.props.getCurrentHotel(item);
                  //   this.renderViews("showActionPrompt");
                  // }}
                />
              );
              if (value === "All" || value === "Date") {
                return card;
              } else if (value === "Paid") {
                if (item.paid) {
                  return card;
                }
              } else if (value === "Pending") {
                if (!item.paid) {
                  return card;
                }
              }
            })}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {
  getCurrentHotel,
};
export default connect(null, mapDispatchToProps)(BookingsList);
