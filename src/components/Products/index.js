import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './products.css';
import { RiSparkling2Line, RiGalleryView2 } from 'react-icons/ri';
import { HiMiniSparkles } from 'react-icons/hi2';
import { GiAmpleDress } from 'react-icons/gi';
import { MdGirl } from 'react-icons/md';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa"; // Imported filled heart
import { MdAddShoppingCart } from "react-icons/md";
import { MdOutlineBoy } from "react-icons/md";
import { MdOutlineChair } from "react-icons/md";
import { GiOfficeChair } from "react-icons/gi"

const Products = ({ displayUser }) => {
  const [Product, setProduct] = useState([]);
  const [wishlist, setWishlist] = useState([]); // Track wishlisted item IDs locally
  const user = JSON.parse(localStorage.getItem("userData"));

  const addToCart = async (product) => {
    try {
      if (!user) {
        alert("Please Login");
        Navigate("/Login");
        return;
      }
      const res = await axios.post("https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart", {
        user_id: user.id,
        product_id: product.id,
        quantity: 1
      }, {
        headers: {
          apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
          "Content-Type": "application/json",
          Prefer: "return=representation",
        }
      });
      console.log(res.data);
      alert("Product Added to Cart");
    } catch (err) {
      console.log("something went wrong", err);
    }
  };

  const handleWishlistToggle = async (product) => {
    if (!user) {
      alert("Please Login");
      Navigate("/Login");
      return;
    }

    const isWishlisted = wishlist.includes(product.id);

    if (isWishlisted) {
      try {
        // Remove from Supabase wishlist database
        await axios.delete(`https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/wishlist`, {
          params: {
            user_id: `eq.${user.id}`,
            product_id: `eq.${product.id}`
          },
          headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
          }
        });
        // Update local state
        setWishlist(wishlist.filter(id => id !== product.id));
        
      } catch (err) {
        console.log("Error removing from wishlist", err);
      }
    } else {
      try {
        // Add to Supabase wishlist database
        await axios.post("https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/wishlist", {
          user_id: user.id,
          product_id: product.id
        }, {
          headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
            "Content-Type": "application/json",
            Prefer: "return=representation",
          }
        });
        // Update local state
        setWishlist([...wishlist, product.id]);
       
      } catch (err) {
        console.log("something went wrong", err);
      }
    }
  };

  const fecthAllProducts = async (category = "") => {
    try {
      const res = await axios.get('https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/products', {
        params: {
          select: '*',
          ...(category && { category: `eq.${category}` }),
        },
        headers: {
          apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA',
        },
      });
      setProduct(res.data);
    } catch (err) {
      console.log('something went wrong', err);
    }
  };

  // Optional: Fetch initial wishlist states for the logged-in user on load
  const fetchUserWishlist = async () => {
    if (!user) return;
    try {
      const res = await axios.get('https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/wishlist', {
        params: { user_id: `eq.${user.id}`, select: 'product_id' },
        headers: {
          apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA',
        }
      });
      setWishlist(res.data.map(item => item.product_id));
    } catch (err) {
      console.log("Error fetching user wishlist", err);
    }
  };

  useEffect(() => {
    fecthAllProducts();
    fetchUserWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="buttonuserna">
        <div className="usernameenjoys">
          <p className="welcomeback">
            Welcome back, <span className="displayuser">{displayUser?.username}</span>
            <span className="dispayuserstar"> <RiSparkling2Line /></span>
          </p>
          <h6 className="discovertoday">Discover today's exclusive collections hand picked for you</h6>
        </div>

        <div className='individualbtn'>
          <h4 onClick={() => fecthAllProducts("")}><RiGalleryView2 /> All</h4>
          <h4 onClick={() => fecthAllProducts("Sarees")} ><HiMiniSparkles /> Sarees</h4>
          <h4 onClick={() => fecthAllProducts("Kurtis")} ><MdGirl /> Kurtis</h4>
          <h4 onClick={() => fecthAllProducts("Ladies")} ><GiAmpleDress /> Dresses</h4>
          <h4 onClick={() => fecthAllProducts("Men")} ><MdOutlineBoy />  Men</h4>
          <h4 onClick={() => fecthAllProducts("Furniture")} ><GiOfficeChair /> Furniture</h4>
          <h4 onClick={() => fecthAllProducts("Sofas")} ><MdOutlineChair /> Sofas</h4>
        </div>
      </div>

      <div className="product-container">
        {Product.map((item) => {
          const isWishlisted = wishlist.includes(item.id);
          return (
            <div className="product-child" key={item.id}>
              <Link to={`/Products/${item.id}`}><img src={item.image} alt={item.title} className="prod-image" /></Link>
              <div className="prod-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <div className='pricenstock'>
                  <h4>{item.price}/-</h4>
                  <p className='stock'>{item.stock} in stock</p>
                </div>
                <button onClick={() => addToCart(item)} className='addtocartbtn'><MdAddShoppingCart /> Add to cart</button>
              </div>
              
              {/* Dynamic conditional class assignment based on wishlist state */}
              <button 
                onClick={() => handleWishlistToggle(item)} 
                className={`wishlistbtn ${isWishlisted ? 'active' : ''}`}
              >
                {isWishlisted ? <FaHeart /> : <CiHeart />}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
