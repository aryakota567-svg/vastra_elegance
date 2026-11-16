
import {useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';




import saree1 from "../images/saree1.jpeg";
import saree2 from "../images/saree2.jpeg";
import saree3 from "../images/saree3.jpeg";
import miniBanner1 from "../images/miniBanner1.jpg"
import categoryimg1 from "../images/categoryimg1.jpg";
import categoryimg2 from "../images/categoryimg2.jpg";
import categoryimg3 from "../images/categoryimg3.jpg";
import categoryimg4 from "../images/categoryimg4.jpg";
import styledby1  from "../images/styledby1.jpg";
import styledby2  from "../images/styledby2.jpg";
import styledby3  from "../images/styledby3.jpg";
import styledby4  from "../images/styledby4.jpg";
import styledby5  from "../images/styledby5.jpg";
import styledby6  from "../images/styledby6.jpg";
import trendingnow1 from "../images/trendingnow1.webp";
import trendingnow2 from "../images/trendingnow2.jpg";
import trendingnow3 from "../images/trendingnow3.jpeg";
import trendingnow4 from "../images/trendingnow4.avif";
import trendingnow5 from "../images/trendingnow5.avif";
import trendingnow6 from "../images/trendingnow6.avif";
import trendingnow7 from "../images/trendingnow7.avif";
import trendingnow8 from "../images/trendingnow8.avif";
import justlanded1 from "../images/justlanded1.jpg";
import justlanded2 from "../images/justlanded2.webp";
import justlanded3 from "../images/justlanded3.webp";
import justlanded4 from "../images/justlanded4.webp"


import { FaLongArrowAltRight } from "react-icons/fa";
 












const Home = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleredirect = () => {
    navigate('/Products');
  };

  


  return (
    <>
    {/*Hero SECTION START*/}
      <div className="home-container">
        <div className="custom-carousel-wrapper">
          <Carousel 
            fade                  
            slide={false}         // Bypasses competing JS transitions to eliminate the freeze
            activeIndex={index}   
            onSelect={handleSelect} 
            indicators={true} 
            controls={false}      
            interval={4000}       // Autoplays every 4 seconds
            wrap={true}           // Continuous infinite loop execution
            pause={false}         // Keeps looping uninterrupted even if hovered
            touch={true}          // Activates native mobile swiping controls
          >
            {/* Slide 1: Elegance in Every Thread */}
            <Carousel.Item>
              <div className="slide-image-container">
                <img src={saree1} className="slide-img" alt="New Collection" />
              </div>
              <div className="custom-caption-overlay left-align">
                <span className="collection-badge">NEW COLLECTION</span>
                <h1 className="main-title">Elegance in Every<br />Thread</h1>
                <p className="description-text">
                  Handcrafted sarees and lehengas that celebrate tradition with a modern touch.
                </p>
                <button className="cta-button" onClick={handleredirect}>Shop Now &rarr;</button>
              </div>
            </Carousel.Item>

            {/* Slide 2: Lehengas That Steal the Show */}
            <Carousel.Item>
              <div className="slide-image-container">
                <img src={saree2} className="slide-img" alt="Festive Edit" />
              </div>
              <div className="custom-caption-overlay right-align">
                <span className="collection-badge">FESTIVE EDIT</span>
                <h1 className="main-title">Lehengas That Steal<br />the Show</h1>
                <p className="description-text">
                  From sangeet nights to wedding days &mdash; find your perfect silhouette.
                </p>
                <button className="cta-button" onClick={handleredirect}>Explore &rarr;</button>
              </div>
            </Carousel.Item>

            {/* Slide 3: Kurtis You'll Live In */}
            <Carousel.Item>
              <div className="slide-image-container">
                <img src={saree3} className="slide-img" alt="Everyday Ethnic" />
              </div>
              <div className="custom-caption-overlay left-align">
                <span className="collection-badge">EVERYDAY ETHNIC</span>
                <h1 className="main-title">Kurtis You'll Live In</h1>
                <p className="description-text">
                  Effortless style for work, weekends, and everything in between.
                </p>
                <button className="cta-button" onClick={handleredirect}>View All &rarr;</button>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

    {/*Hero SECTION END*/} 

    <div className='minibanner'>
      <img src={miniBanner1} alt='' className='bannerwidth' />
    </div>

      <div className="headerdown">
        
        <div className="subheaderdown">
          <div className="icon">
            🚚
          </div>
          <div>
            <h6>Free Shipping</h6>
            <p>On orders above ₹999</p>

          </div>
        </div>

        <div className="subheaderdown">
          <div className="icon">
            ↩️
          </div>
          <div>
            <h6>Easy Returns</h6>
            <p>7-day hassle-free returns</p>
          </div>
        </div>
        
        <div className="subheaderdown">
          <div className="icon">
            🔒
          </div>
          <div>
            <h6>Secure Payment</h6>
            <p>100% protected checkout</p>
          </div>
        </div>

         <div className="subheaderdown" >
          <div className="icon">
            ✨
          </div>
          <div>
            <h6>Authentic Craft</h6>
            <p>Handpicked quality fabrics</p>
          </div>
        </div>

      </div>

       <div className="catheader">
        <h2 className="headingcateg">Shop by Category</h2>
        <p>From timeless classics to contemporary fusion</p>
        </div>
        


        <div className="catcardcontainer">
          <div className="categorycard">
           <img src ={categoryimg1} alt="" className="categoryimg"/>
            <div className="categoryimgcontent">
              <h5 className="catname">Sarees</h5>
              <p className="pacat">Timeless drapes</p> 
              <Link to="/Products" className='explore'>Explore →</Link> 
              
              </div>
          </div>

          <div className="categorycard">
            <img src ={categoryimg2} alt="" className="categoryimg"/>
            <div className="categoryimgcontent">
              <h5 className="catname">Kurtis</h5>
              <p className="pacat">Daily elegance</p> 
              <Link to="/Products" className='explore'>Explore →</Link>
                            
              </div>
          </div>

          <div className="categorycard">
            <img src ={categoryimg3} alt="" className="categoryimg"/>
            <div className="categoryimgcontent">
              <h5 className="catname">Lehangas</h5>
              <p className="pacat">Grand occasions</p> 
              <Link to="/Products" className='explore'>Explore →</Link>              
              </div>
          </div>

          <div className="categorycard">
            <img src ={categoryimg4} alt="" className="categoryimg"/>
            <div className="categoryimgcontent">
              <h5 className="catname">Indo-Western</h5>
              <p className="pacat">Fusion fashion</p> 
              <Link to="/Products"className='explore'>Explore →</Link>             
              </div>
          </div>
        </div>


  
  <div>
      <div className='trendingnowhead'>
  <h1>
    Trending Now
  </h1>
  </div>
  
  <div className='trendingnowcards'>
    <div className='tredingindicard'>
     <Link to="/Products"><img src={trendingnow1} alt='' className='trendingnowimg'/></Link>
      <div className='trendingmatt'>
        <h5>Kanchipuram Silk Saree</h5>
        <h6>₹2,999</h6>
      </div>
    </div>

    <div  className='tredingindicard'>
       <Link to="/Products"><img src={trendingnow2} alt='' className='trendingnowimg'/></Link>
      <div className='trendingmatt'>
        <h5>Georgette Saree</h5>
        <h6>₹1,499</h6>
      </div>

    </div>

     <div  className='tredingindicard'>
      <Link to="/Products"><img src={trendingnow3} alt='' className='trendingnowimg'/></Link>
      <div className='trendingmatt'>
        <h5>Chiffon Saree</h5>
        <h6>₹1,299</h6>
      </div>

    </div>

     <div  className='tredingindicard'>
       <Link to="/Products"><img src={trendingnow4} alt='' className='trendingnowimg'/></Link>
      <div className='trendingmatt'>
        <h5>Designer Party Saree</h5>
        <h6>₹3,999</h6>
      </div>

    </div>

    <div  className='tredingindicard'>
       <Link to="/Products"><img src={trendingnow5} alt='' className='trendingnowimg'/></Link>
      <div className='trendingmatt'>
        <h5>Linen Saree</h5>
        <h6>₹1,799</h6>
      </div>

    </div>

     <div  className='tredingindicard'>
       <Link to="/Products"><img src={trendingnow6} alt='' className='trendingnowimg'/></Link>
      <div className='trendingmatt'>
        <h5>Organza Saree</h5>
        <h6>₹2,499</h6>
      </div>

    </div>

     <div  className='tredingindicard'>
       <Link to="/Products"><img src={trendingnow7} alt='' className='trendingnowimg'/></Link>
      <div className='trendingmatt'>
        <h5>Wedding Silk Saree</h5>
        <h6>₹4,999</h6>
      </div>

    </div>

     <div  className='tredingindicard'>
      <Link to="/Products"><img src={trendingnow8} alt='' className='trendingnowimg'/></Link>
      <div className='trendingmatt'>
        <h5>Printed Casual Saree</h5>
        <h6>₹899</h6>
      </div>

    </div>

   
  </div>
  </div>



 <div className='shopthesale'>
  <h6 className='limitedoffer'>LIMITED TIME OFFER</h6>
  <h1 className='flatoff'>Flat 30% off On Festive Collection</h1>
  <p className='usecode'>Use code <span className='ethnic'>ETHNIC30</span> at checkout. Hurry, offer ends soon!</p>
  <Link to="/Products"><button className='buttonshopsale'>Shop the Sale <FaLongArrowAltRight /></button></Link>

 </div>



  <div>
    <div className='trendingnowhead'>
      <h1>Just Landed</h1>
    </div>

    <div className='trendingnowcards'>
      <div className='tredingindicard'>
      <Link to="/Products"><img src={justlanded1} alt='' className='trendingnowimg'/></Link>
      <div className='trendingmatt'>
        <h5>Banarasi Silk Saree</h5>
        <h6>₹3,499</h6>
      </div>
    </div>

    <div className='tredingindicard'>
      <Link to="/Products"><img src={justlanded2} alt='' className='trendingnowimg'/></Link>
      <div className='trendingmatt'>
        <h5>Anarkali Kurti</h5>
        <h6>₹1,299</h6>
      </div>
    </div>

    <div className='tredingindicard'>
      <Link to="/Products"><img src={justlanded3} alt='' className='trendingnowimg'/></Link>
      <div className='trendingmatt'>
        <h5>Cotton Kurti</h5>
        <h6>₹799</h6>
      </div>
    </div>

    <div className='tredingindicard'>
      <Link to="/Products"><img src={justlanded4} alt='' className='trendingnowimg'/></Link>
      <div className='trendingmatt'>
        <h5>Printed Kurti</h5>
        <h6>₹999</h6>
      </div>
    </div>

    </div>
  </div>
       
    
    
    
    
    
    

       



      <div className="Reviewspage">
        <h3 className="headreview" >What Our Customers Say</h3>

       <div className="reviewscontainer">
         <div className="reviewchild">
          <h4 className="stars">★ ★ ★ ★ ★</h4>
          <p className="parareview">"The Banarasi saree I ordered was absolutely stunning — the zari work was even more beautiful in person!"</p>
          <h6>— Priya S.</h6>
        </div>

        <div className="reviewchild">
          <h4 className="stars">★ ★ ★ ★ ★</h4>
          <p className="parareview">"Fast delivery and the kurti fit was perfect. The fabric quality is incredible for the price."</p>
          <h6>— Anjali M.</h6>
        </div>

         <div className="reviewchild">
          <h4 className="stars">★ ★ ★ ★ ☆</h4>
          <p className="parareview">"Wore their lehenga to my cousin's wedding and got so many compliments. Felt like a boutique purchase!"</p>
          <h6>— Meera K.</h6>
        </div>
       </div>
      </div>




      <div className='stayinloop'>
        <h3 className='hstay'>Stay in the Loop</h3>
        <p className='getearly'>Get early access to new collections, festive drops, and exclusive offers — straight <br /> to your inbox</p>
        <div className='inputsubs'>
          <input type='email' className='inputfillems'/>
          <button className='btnsubs'>Subscribe</button>
        </div>
      </div>


      <div className='styledbyyoucon'>
       <div className='mat-con'><h2>#StyledByYou</h2>
       <p>Tag us and get featured</p></div>

       <div className='styledbyyouimages'>
        <div className='img-container'>
          <img src ={styledby1}  alt='' className='styledimg' />
        </div>
        <div className='img-container'> 
          <img src ={styledby2}  alt=''  className='styledimg'/>
        </div>
       <div className='img-container'>
         <img src={styledby3} alt=''  className='styledimg'/>
       </div >
       <div className='img-container'>
         <img src={styledby4} alt=''  className='styledimg'/>
       </div>
      <div className='img-container'>
          <img src={styledby5} alt=''  className='styledimg'/>
      </div>
       <div className='img-container'>
         <img src={styledby6} alt='' className='styledimg' />
       </div>
        
       </div>


      </div>

    
    </>
  );
};

export default Home;
