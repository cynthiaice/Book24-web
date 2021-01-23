
const TourGroup = ({tours}) => {
	console.log(tours)
    return (
        <div id="reccomended" className="owl-carousel owl-theme"
        style={{marginBottom: "30px"}}>    
    {/* {tours.map((el,index)=>{
		
		console.log(index)
		console.log('\n')
        return  */}
		<div className="item">
					<div className="strip grid">
						<figure>
							<a href="detail-restaurant.html" className="wish_bt"></a>
							<a href="detail-restaurant.html">
                            <img 
							src="/images/location_5.jpg"
							//src={el.images[0].url}
							 className="img-fluid" alt="" 
                            width="400" height="266"/><div className="read_more">
                            <span>Read more</span>
                            </div></a>
							<small>Featured</small>
						</figure>
						<div className="wrapper">
						<h3><a href="detail-hotel.html">Hotel Concorde</a></h3>
							<p>Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu.</p>
							{/* <h3><a href="detail-restaurant.html">{el.name}</a></h3> */}
							{/* <p>{el.description}</p> */}
							{/* <a className="address" 
                            href="https://www.google.com/maps/dir//Assistance+%E2%80%93+H%C3%B4pitaux+De+Paris,+3+Avenue+Victoria,+75004+Paris,+Francia/@48.8606548,2.3348734,14z/data=!4m15!1m6!3m5!1s0x47e66e1de36f4147:0xb6615b4092e0351f!2sAssistance+Publique+-+H%C3%B4pitaux+de+Paris+(AP-HP)+-+Si%C3%A8ge!8m2!3d48.8568376!4d2.3504305!4m7!1m0!1m5!1m1!1s0x47e67031f8c20147:0xa6a9af76b1e2d899!2m2!1d2.3504327!2d48.8568361">Get directions</a> */}
						</div>
						<ul>
							<li><span className="loc_open">Now Open</span></li>
							{/* <li><div className="score"><span>Superb<em>350 Reviews</em></span><strong>8.9</strong></div></li> */}
						</ul>
					</div>
				</div>
    {/* })} */}
    </div>
    );

}
export default TourGroup;