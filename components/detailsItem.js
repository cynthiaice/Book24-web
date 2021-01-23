const DetailsItem = ({image_url,name, price})=>{
    return(
        <div className="room_type first">
        <div className="row">
          <div className="col-md-4">
            <img
              src={image_url}
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-md-8">
            <h4>{name}</h4>
            <div className="row add_bottom_30">
								<div className="col-md-6">
									<ul className="bullets">
										<li>Price - {"\u20A6"}{price}</li>
									</ul>
								</div>
								{/* <div className="col-md-6">
									<ul className="bullets">
										<li>Timeam inimicus</li>
										<li>Oportere democritum</li>
										<li>Cetero inermis</li>
										<li>Pertinacia eum</li>
									</ul>
								</div> */}
							</div>
          </div>
        </div>
        {/*<!-- /row --> */}
      </div>
    );
}
export default DetailsItem