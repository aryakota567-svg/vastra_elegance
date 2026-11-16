
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

const API_URL = "https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("userData") || "null");
  } catch {
    user = null;
  }

  const userId = user?.id;

  const [formData, setFormData] = useState({
    name: user?.username || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Fetch cart products
  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/cart?user_id=eq.${userId}&select=*,products(*)`,
          { headers }
        );

        console.log("Checkout cart response:", response.data);

        // Combine duplicate products only on Checkout
        const groupedCart = Object.values(
          response.data.reduce((acc, item) => {
            const productId = item.product_id;

            if (!acc[productId]) {
              acc[productId] = {
                ...item,
                quantity: Number(item.quantity || 1),
              };
            } else {
              acc[productId].quantity += Number(item.quantity || 1);
            }

            return acc;
          }, {})
        );

        setCart(groupedCart);
      } catch (err) {
        console.error(
          "Checkout cart error:",
          err.response?.data || err.message
        );

        setError(
          err.response?.data?.message ||
          err.response?.data?.hint ||
          err.message ||
          "Unable to load cart products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Get product object
  const getProduct = (item) => {
    return Array.isArray(item.products)
      ? item.products[0]
      : item.products;
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    const product = getProduct(item);

    return (
      total +
      Number(product?.price || 0) * Number(item.quantity || 1)
    );
  }, 0);

  // Place order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (placingOrder) return;

    if (!userId) {
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const { name, phone, address, city, state, pincode } = formData;

    if (
      !name.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pincode.trim()
    ) {
      setError("Please fill in all delivery details.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone.trim())) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!/^[0-9]{6}$/.test(pincode.trim())) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    try {
      setPlacingOrder(true);
      setError("");
      setSuccess("");

      // Use phone instead of phone_no
      const order = {
        user_id: userId,
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
        total_price: totalPrice,
        status: "pending",
      };

      console.log("Order data being sent:", order);

      // Save order in Supabase
      const orderResponse = await axios.post(
        `${API_URL}/orders`,
        order,
        { headers }
      );

      console.log("Order response:", orderResponse.data);

      // Order successfully placed
      setOrderPlaced(true);
      setSuccess("Your order has been placed successfully!");

      // Clear cart after successful order
      try {
        await axios.delete(
          `${API_URL}/cart?user_id=eq.${userId}`,
          { headers }
        );

        setCart([]);
      } catch (deleteError) {
        console.error(
          "Cart cleanup error:",
          deleteError.response?.data || deleteError.message
        );

        setSuccess(
          "Your order was placed successfully. Please refresh your cart if old items still appear."
        );
      }
    } catch (err) {
      console.error(
        "Order placement error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
        err.response?.data?.hint ||
        err.message ||
        "Unable to place your order. Please try again."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="checkout-loading">
        <div className="checkout-spinner"></div>
        <p>Loading your checkout...</p>
      </div>
    );
  }

  // Order success
  if (orderPlaced) {
    return (
      <div className="checkout-success-page">
        <div className="checkout-success-icon">✓</div>
        <h2>Order Placed Successfully!</h2>
        <p>{success}</p>

        <button
          className="checkout-orders-btn"
          onClick={() => navigate("/orders")}
        >
          View My Orders
        </button>
      </div>
    );
  }

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="checkout-empty-icon">🛍️</div>
        <h2>Your Checkout is Empty</h2>
        <p>Add products to your cart before proceeding.</p>

        <button onClick={() => navigate("/products")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        <div className="checkout-heading">
          <h1>Checkout</h1>
          <p>Complete your delivery details to place your order.</p>
        </div>

        {error && (
          <div className="checkout-error">{error}</div>
        )}

        {success && (
          <div className="checkout-success-message">{success}</div>
        )}

        <div className="checkout-layout">

          {/* LEFT SIDE - DELIVERY INFORMATION */}
          <div className="checkout-form-card">

            <h2>Delivery Information</h2>

            <p className="checkout-card-subtitle">
              Enter your details for delivery.
            </p>

            <form
              id="checkout-form"
              onSubmit={handlePlaceOrder}
            >
              <div className="checkout-input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="checkout-input-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter 10-digit phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                />
              </div>

              <div className="checkout-input-group">
                <label>Full Address</label>
                <textarea
                  name="address"
                  placeholder="House number, street, area"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div className="checkout-two-columns">

                <div className="checkout-input-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-input-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    placeholder="Enter state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="checkout-input-group">
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="Enter 6-digit pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  maxLength="6"
                />
              </div>

            </form>
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div className="checkout-summary-card">

            <h2>Order Summary</h2>

            <p className="checkout-card-subtitle">
              {cart.length} unique product{cart.length !== 1 ? "s" : ""}
            </p>

            <div className="checkout-products">

              {cart.map((item) => {
                const product = getProduct(item);

                return (
                  <div
                    className="checkout-product"
                    key={item.product_id}
                  >
                    <div className="checkout-product-image">
                      <img
                        src={product?.image || "/placeholder.png"}
                        alt={product?.title || "Product"}
                      />
                    </div>

                    <div className="checkout-product-details">
                      <h3>{product?.title || "Product"}</h3>

                      <p>
                        ₹{Number(product?.price || 0).toFixed(2)}
                      </p>

                      <span>
                        Quantity: {item.quantity}
                      </span>
                    </div>

                    <div className="checkout-product-total">
                      ₹
                      {(
                        Number(product?.price || 0) *
                        Number(item.quantity || 1)
                      ).toFixed(2)}
                    </div>
                  </div>
                );
              })}

            </div>

         
            <div className="checkout-price-details">

              <div>
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              <div>
                <span>Delivery Charges</span>
                <span className="checkout-free">FREE</span>
              </div>

              <div className="checkout-grand-total">
                <strong>Total Amount</strong>
                <strong>₹{totalPrice.toFixed(2)}</strong>
              </div>

            </div>

            <div className="checkout-secure-note">
              <span>🔒</span>
              <p>Your order details are securely submitted.</p>
            </div>

            {/* PLACE ORDER BUTTON - ORDER SUMMARY */}
            <button
              type="submit"
              form="checkout-form"
              className="checkout-place-order-btn"
              disabled={placingOrder}
            >
              {placingOrder
                ? "Placing Your Order..."
                : `Place Order · ₹${totalPrice.toFixed(2)}`}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
