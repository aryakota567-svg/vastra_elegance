import { Link } from "react-router-dom"
import "./footer.css"




import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaPinterestSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";


const Footer = ()=> {
    return(
        <>

        <footer class="footer-container">
  <div class="footer-content">
    
  
    <div class="footer-brand">
      <h2 class="footer-logo">
       <span class="logo-symbol">❈</span>  Vastra Elegance 
      </h2>
      <p class="brand-description">
        Celebrating the art of Indian ethnic fashion. From hand-woven Banarasi sarees to contemporary indo-western designs — we bring tradition to your doorstep with love and authenticity.
      </p>
      <div class="social-icons">
        <FaInstagram />
        <FaFacebook />
        <FaPinterestSquare />
        <FaYoutube />

      </div>
    </div>

   
    <div class="footer-links-column">
      <h3 class="column-title">QUICK LINKS</h3>
      <ul class="links-list">
        <li><Link to ="/">Home</Link></li>
        <li><Link to ="/products">All Products</Link></li>
        <li><Link to="/category/sarees">Sarees</Link></li>
        <li><Link href="/category/kurtis">Kurtis</Link></li>
        <li><Link href="/category/lehengas">Lehengas</Link></li>
        <li><Link href="/category/indo-western">Indo-Western</Link></li>
      </ul>
    </div>

    
    <div class="footer-links-column">
      <h3 class="column-title">CUSTOMER SERVICE</h3>
      <ul class="links-list">
        <li>My Orders</li>
        <li>My Wishlist</li>
        <li>Shopping Cart</li>
        <li>Returns & Refunds</li>
        <li>Shipping Policy</li>
        <li>Terms & Conditions</li>
        <li>Privacy Policy</li>
      </ul>
    </div>

   
    <div class="footer-right-column">
      <div class="contact-info">
        <h3 class="column-title">GET IN TOUCH</h3>
        <p> Hyderabad, Telangana, India</p>
        <p> +91 98765 43210</p>
        <p> support@vastraelegance.com</p>
      </div>
      
      <div class="newsletter-container">
        <h3 class="column-title">NEWSLETTER</h3>
        <form class="newsletter-form">
          <input type="email" placeholder="Your email address" required />
          <button type="submit" aria-label="Subscribe">&rarr;</button>
        </form>
        <p class="newsletter-subtext">Get updates on new collections & exclusive offers.</p>
      </div>
    </div>

  </div>

  
  <div class="footer-bottom">
    <p class="copyright">&copy; 2026 Vastra Elegance. All rights reserved.</p>
    <div class="payment-methods">
      <span>We accept:</span>
      <span class="payment-badge">VISA</span>
      <span class="payment-badge">MASTERCARD</span>
      <span class="payment-badge">UPI</span>
      <span class="payment-badge">COD</span>
    </div>
  </div>
</footer>

        </>
    )

}
export default Footer