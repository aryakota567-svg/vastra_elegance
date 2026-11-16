import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import "./cart.css";
import { useNavigate } from "react-router-dom";

const API_HEADERS = {
  apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA",
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

const Cart = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCart = async () => {
      try {
        const res = await axios.get(
          `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart?user_id=eq.${user?.id}&select=*,products(*)`,
          { headers: API_HEADERS }
        );

        // Group rows by product_id correctly to retain true total row count
        const grouped = {};
        for (let item of res.data) {
          if (grouped[item.product_id]) {
            grouped[item.product_id].quantity += item.quantity || 1;
          } else {
            grouped[item.product_id] = { ...item };
          }
        }
        setCart(Object.values(grouped));
      } catch (err) {
        console.error("Failed to load cart items:", err);
      }
    };

    if (user?.id) {
      fetchAllCart();
    }
  }, [user?.id]);

  const increaseCart = async (targetItem) => {
    try {
      const targetQuantity = targetItem.quantity + 1;
      await axios.patch(
        `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart?id=eq.${targetItem.id}`,
        { quantity: targetQuantity },
        { headers: API_HEADERS }
      );

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === targetItem.id ? { ...item, quantity: targetQuantity } : item
        )
      );
    } catch (err) {
      console.error("Could not increase item count:", err);
    }
  };

  const decreaseCart = async (targetItem) => {
    if (targetItem.quantity <= 1) return;
    try {
      const targetQuantity = targetItem.quantity - 1;
      await axios.patch(
        `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart?id=eq.${targetItem.id}`,
        { quantity: targetQuantity },
        { headers: API_HEADERS }
      );

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === targetItem.id ? { ...item, quantity: targetQuantity } : item
        )
      );
    } catch (err) {
      console.error("Could not decrease item count:", err);
    }
  };

  const deleteCartItem = async (itemId) => {
    try {
      await axios.delete(
        `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart?id=eq.${itemId}`,
        { headers: API_HEADERS }
      );
      setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const clearEntireCart = async () => {
    if (!user?.id) return;
    try {
      await axios.delete(
        `https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1/cart?user_id=eq.${user.id}`,
        { headers: API_HEADERS }
      );
      setCart([]);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  const calculateGrandTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.products?.price || 0;
      return total + item.quantity * price;
    }, 0);
  };

  const totalItemsCount = cart.length;

  return (
    <div className="cart-page-wrapper">
      <div className="cart-header-title">
        <h1>Shopping Cart</h1>
        <span className="cart-items-badge">{totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}</span>
      </div>

      <div className="cart-main-layout">
        <div className="cart-items-column">
          {cart.length === 0 ? (
            <div className="empty-cart-message">
              <p>Your shopping cart is currently empty.</p>
              <button className="continue-shopping-link" onClick={() => navigate("/")}>
                Go Back Shopping
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-left">
                    <img 
                      src={item.products?.image} 
                      alt={item.products?.title || "Product"} 
                      className="cart-item-image" 
                    />
                    <div className="cart-item-details">
                      <h3 className="product-title">{item.products?.title}</h3>
                      <p className="product-price">₹{item.products?.price}</p>
                      
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn" 
                          onClick={() => decreaseCart(item)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button className="quantity-btn" onClick={() => increaseCart(item)}>+</button>
                      </div>
                    </div>
                  </div>

                  <div className="cart-item-right">
                    <span className="item-row-total">
                      ₹{(item.quantity * (item.products?.price || 0)).toLocaleString("en-IN")}
                    </span>
                    <button 
                      className="delete-item-btn" 
                      onClick={() => deleteCartItem(item.id)}
                      title="Remove Item"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
              <button className="clear-cart-btn" onClick={clearEntireCart}>
                Clear Cart
              </button>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-summary-column">
            <div className="order-summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{calculateGrandTotal().toLocaleString("en-IN")}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-shipping-text">FREE</span>
              </div>
              <hr className="summary-divider" />
              <div className="summary-row grand-total-row">
                <span>Total</span>
                <span>₹{calculateGrandTotal().toLocaleString("en-IN")}</span>
              </div>
              
              <button className="checkout-btn" onClick={() => navigate("/checkout")}>
                🔒 Proceed to Checkout
              </button>
              
              <button className="continue-btn" onClick={() => navigate("/")}>
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
