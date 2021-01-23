import Link from "next/link";
import moment from "moment";
const BookedItem = ({item}) =>{
    const check_in_date = item.check_in_date
    const created_date = item.createdAt
    const name = item.name
    const ref = item.payment_reference
    const type = item.type

    let icon_class = '';
    if(type == 'event'){
        icon_class= "event_booking"
    }
    if(type == 'hotel'){
        icon_class= "hotel_booking"
    }
    if(type == 'tour'){
        icon_class= "tour_booking"
    }

    return(
<div className="strip_booking">
					<div className="row">
						<div className="col-lg-2 col-md-2">
							<div className="date">
								<span className="month">{moment(check_in_date).format('MMM')}</span>
								<span className="day"><strong>{moment(check_in_date).format('DD')}</strong>{moment(check_in_date).format('ddd')}</span>
							</div>
						</div>
						<div className="col-lg-6 col-md-5">
							<h3 className={icon_class}>{name}
                            {/* <span>2 Adults / 2 Childs</span> */}
                            </h3>
						</div>
						<div className="col-lg-2 col-md-3">
							<ul className="info_booking">
								<li><strong>Booking id</strong>{ref}</li>
								<li><strong>Booked on</strong> {moment(created_date).format('ddd MMM DD YYYY')}</li>
							</ul>
						</div>
						{/* <div className="col-lg-2 col-md-2">
							<div className="booking_buttons">
								<a href="#0" className="btn_2">Edit</a>
								<a href="#0" className="btn_3">Cancel</a>
							</div>
						</div> */}
					</div>
					{/* <!-- /row --> */}
				</div>
    )
}
export default BookedItem;