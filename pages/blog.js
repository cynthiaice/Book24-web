import Head from "next/head";
import React, { Component} from "react";
import Header from '../components/header';
import SignInModal from '../components/signInModal';
import Footer from "../components/footer";
import $ from 'jquery';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {}
  
  render() {
    return (
      <div>
        <Head>
             <meta name="description" content="Book24 - Advanced Travel and Event Booking Solution.."/>
    <meta name="author" content="Book24"/>
    <title>Book24 | Advanced Travel and Event Booking Solution.</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
    <link href="css/bootstrap.min.css" rel="stylesheet"/>
    <link href="css/style.css" rel="stylesheet"/>
	<link href="css/vendors.css" rel="stylesheet"/>
    <link href="css/custom.css" rel="stylesheet"/>
	<link href="css/blog.css" rel="stylesheet"/>
        </Head>
        <div id="page">
		<Header makeBlue={true}/>
		<div className="sub_header_in sticky_header">
		<div className="container">
			<h1>Book24 Blog</h1>
		</div>
	</div>
    <main>
		<div className="container margin_60_35">
			<div className="row">
				<div className="col-lg-9">
					<div className="row">
						<div className="col-md-6">
							<article className="blog">
								<figure>
									<a href="blog-post.html"><img src="/images/blog-1.jpg" alt=""/>
										<div className="preview"><span>Read more</span></div>
									</a>
								</figure>
								<div className="post_info">
									<small>Category - 20 Nov. 2017</small>
									<h2><a href="blog-post.html">Ea exerci option hendrerit</a></h2>
									<p>Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei.</p>
									<ul>
										<li>
											<div className="thumb"><img src="/images/avatar.jpg" alt=""/></div> Admin
										</li>
										<li><i className="ti-comment"></i>20</li>
									</ul>
								</div>
							</article>
						</div>
						<div className="col-md-6">
							<article className="blog">
								<figure>
									<a href="blog-post.html"><img src="/images/blog-2.jpg" alt=""/>
										<div className="preview"><span>Read more</span></div>
									</a>
								</figure>
								<div className="post_info">
									<small>Category - 20 Nov. 2017</small>
									<h2><a href="blog-post.html">At usu sale dolorum offendit</a></h2>
									<p>Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei.</p>
									<ul>
										<li>
											<div className="thumb"><img src="/images/avatar.jpg" alt=""/></div> Admin
										</li>
										<li><i className="ti-comment"></i>20</li>
									</ul>
								</div>
							</article>
						</div>
						<div className="col-md-6">
							<article className="blog">
								<figure>
									<a href="blog-post.html"><img src="/images/blog-3.jpg" alt=""/>
										<div className="preview"><span>Read more</span></div>
									</a>
								</figure>
								<div className="post_info">
									<small>Category - 20 Nov. 2017</small>
									<h2><a href="blog-post.html">Iusto nominavi petentium in</a></h2>
									<p>Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei.</p>
									<ul>
										<li>
											<div className="thumb"><img src="/images/avatar.jpg" alt=""/></div> Admin
										</li>
										<li><i className="ti-comment"></i>20</li>
									</ul>
								</div>
							</article>
						</div>
						<div className="col-md-6">
							<article className="blog">
								<figure>
									<a href="blog-post.html"><img src="/images/blog-4.jpg" alt=""/>
										<div className="preview"><span>Read more</span></div>
									</a>
								</figure>
								<div className="post_info">
									<small>Category - 20 Nov. 2017</small>
									<h2><a href="blog-post.html">Assueverit concludaturque quo</a></h2>
									<p>Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei.</p>
									<ul>
										<li>
											<div className="thumb"><img src="/images/avatar.jpg" alt=""/></div> Admin
										</li>
										<li><i className="ti-comment"></i>20</li>
									</ul>
								</div>
							</article>
						</div>
						<div className="col-md-6">
							<article className="blog">
								<figure>
									<a href="blog-post.html"><img src="/images/blog-5.jpg" alt=""/>
										<div className="preview"><span>Read more</span></div>
									</a>
								</figure>
								<div className="post_info">
									<small>Category - 20 Nov. 2017</small>
									<h2><a href="blog-post.html">Nec nihil menandri appellantur</a></h2>
									<p>Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei.</p>
									<ul>
										<li>
											<div className="thumb">
                                            <img src="/images/avatar.jpg" alt=""/></div> Admin
										</li>
										<li><i className="ti-comment"></i>20</li>
									</ul>
								</div>
							</article>
						</div>
						<div className="col-md-6">
							<article className="blog">
								<figure>
									<a href="blog-post.html"><img src="/images/blog-6.jpg" alt=""/>
										<div className="preview"><span>Read more</span></div>
									</a>
								</figure>
								<div className="post_info">
									<small>Category - 20 Nov. 2017</small>
									<h2><a href="blog-post.html">Te congue everti his salutandi</a></h2>
									<p>Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei.</p>
									<ul>
										<li>
											<div className="thumb">
                                            <img src="/images/avatar.jpg" alt=""/></div> Admin
										</li>
										<li><i className="ti-comment"></i>20</li>
									</ul>
								</div>
							</article>
						</div>
					</div>
					<div className="pagination__wrapper add_bottom_30">
						<ul className="pagination">
							<li><a href="#0" className="prev" title="previous page">&#10094;</a></li>
							<li>
								<a href="#0" className="active">1</a>
							</li>
							<li>
								<a href="#0">2</a>
							</li>
							<li>
								<a href="#0">3</a>
							</li>
							<li>
								<a href="#0">4</a>
							</li>
							<li><a href="#0" 
                            className="next" title="next page">&#10095;</a></li>
						</ul>
					</div>
				</div>
				<aside className="col-lg-3">
					<div className="widget search_blog">
						<div className="form-group">
							<input type="text" name="search" id="search" 
                            className="form-control" placeholder="Search.."/>
							<span><input type="submit" value="Search"/></span>
						</div>
					</div>
					<div className="widget">
						<div className="widget-title">
							<h4>Latest Post</h4>
						</div>
						<ul className="comments-list">
							<li>
								<div className="alignleft">
									<a href="#0"><img src="/images/blog-5.jpg" alt=""/></a>
								</div>
								<small>Category - 11.08.2016</small>
								<h3><a href="#" title="">Verear qualisque ex minimum...</a></h3>
							</li>
							<li>
								<div className="alignleft">
									<a href="#0"><img src="/images/blog-6.jpg" alt=""/></a>
								</div>
								<small>Category - 11.08.2016</small>
								<h3><a href="#" title="">Verear qualisque ex minimum...</a></h3>
							</li>
							<li>
								<div className="alignleft">
									<a href="#0"><img src="/images/blog-4.jpg" alt=""/></a>
								</div>
								<small>Category - 11.08.2016</small>
								<h3><a href="#" title="">Verear qualisque ex minimum...</a></h3>
							</li>
						</ul>
					</div>
					<div className="widget">
						<div className="widget-title">
							<h4>Categories</h4>
						</div>
						<ul className="cats">
							<li><a href="#">Food <span>(12)</span></a></li>
							<li><a href="#">Places to visit <span>(21)</span></a></li>
							<li><a href="#">New Places <span>(44)</span></a></li>
							<li><a href="#">Suggestions and guides <span>(31)</span></a></li>
						</ul>
					</div>
					<div className="widget">
						<div className="widget-title">
							<h4>Popular Tags</h4>
						</div>
						<div className="tags">
							<a href="#">Food</a>
							<a href="#">Bars</a>
							<a href="#">Cooktails</a>
							<a href="#">Shops</a>
							<a href="#">Best Offers</a>
							<a href="#">Transports</a>
							<a href="#">Restaurants</a>
						</div>
					</div>
				</aside>
			</div>
		</div>
	</main>
	<Footer/>
	</div>
	<SignInModal />	
	<div id="toTop"></div>
    <script src="js/common_scripts.js"></script>
	<script src="js/functions.js"></script>
	<script src="assets/validate.js"></script>
    <script>{`
		$('.wish_bt.liked').on('click', function (c) {
			$(this).parent().parent().parent().fadeOut('slow', function (c) {});
		});
        `}</script>
        {/* <style global jsx>{`
          body {
            background: #fff;
          }
        `}</style> */}
      </div>
    );
  }
}
export default Blog;
