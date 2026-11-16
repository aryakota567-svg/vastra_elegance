import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import "./wishlist.css";
import { FaHeart } from "react-icons/fa"; // Importing the filled heart icon

const Wishlist = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const [wishlist, setWishlist] = useState([]);

  // Fetch all items on initial render
  const fetchAllWishlist = async (userId) => {
    try {
      const res = await axios.get(
        `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/wishlist?user_id=eq.${userId}&select=id,product_id,products(title,image,price)`,
        {
          headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
        }
      );

      const grouped = {};
      for (let item of res.data) {
        grouped[item.product_id] = item;
      }

      setWishlist(Object.values(grouped));
      console.log("wishlist page :", res.data);
    } catch (err) {
      console.log("something went wrong", err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchAllWishlist(user.id);
    }
  }, [user?.id]);

  // Remove individual product on clicking heart icon
  const handleRemove = async (productId, itemId) => {
    try {
      // 1. Remove from database
      await axios.delete(`https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/wishlist`, {
        params: {
          user_id: `eq.${user.id}`,
          product_id: `eq.${productId}`
        },
        headers: {
          apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
        }
      });

      // 2. Animate and update state immediately locally
      setWishlist(prevWishlist => prevWishlist.filter(item => item.product_id !== productId));
      
    } catch (err) {
      console.log("Failed to remove item from wishlist", err);
    }
  };

  return (
    <>
      <div className="wishlistprodcontainer">
        {wishlist.map((item) => (
          <div key={item.id} className="childcontainerwishli">
            {/* Wrapper added to facilitate floating heart positioning */}
            <div className="wishlist-img-wrapper">
              <img src={item.products?.image} alt={item.products?.title} className="wishlistimg" />
              <button 
                className="wishlist-heart-btn"
                onClick={() => handleRemove(item.product_id, item.id)}
              >
                <FaHeart />
              </button>
            </div>
            
            <div className="mattconwishli">
              <h3>{item.products?.title}</h3>
              <h5>{item.products?.price}/-</h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Wishlist;
