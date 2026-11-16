
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./orders.css";

const API_URL =
  "https://wqjaxtdxzjmlsaeoxyhq.supabase.co/rest/v1";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxamF4dGR4emptbHNhZW94eWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDE4MTcsImV4cCI6MjA5NjkxNzgxN30.Np2wvORlImgoan2P7DPeJK8SN8P305vl9ISsUTSMWYA";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const user = JSON.parse(
        localStorage.getItem("userData") || "null"
      );

      if (!user?.id) {
        setError("Please login to view your orders.");
        setOrders([]);
        return;
      }

      const response = await axios.get(
        `${API_URL}/orders?user_id=eq.${encodeURIComponent(
          user.id
        )}&select=*`,
        { headers }
      );

      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error(
        "Orders API Error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
        err.response?.data?.hint ||
        err.message ||
        "Unable to fetch your orders."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  const getStatusClass = (status) => {
    const value = String(status || "pending").toLowerCase();

    if (value === "delivered") return "delivered";
    if (value === "cancelled") return "cancelled";
    if (value === "shipped") return "shipped";
    if (value === "confirmed") return "confirmed";

    return "pending";
  };

  return (
    <div className="orders-page">
      <div className="orders-container">

        <div className="orders-header">
          <div>
            <h2>My Orders</h2>
            <p>Track and manage your purchases</p>
          </div>

          <button
            className="orders-refresh-btn"
            onClick={fetchOrders}
            disabled={loading}
          >
            <i className="bi bi-arrow-clockwise"></i>
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {loading ? (
          <div className="orders-loading">
            <div className="orders-spinner"></div>
            <p>Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="orders-error">
            <i className="bi bi-exclamation-circle"></i>
            <h3>Unable to Load Orders</h3>
            <p>{error}</p>
            <button onClick={fetchOrders}>
              Try Again
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="orders-empty">
            <i className="bi bi-bag"></i>
            <h3>No Orders Yet</h3>
            <p>
              You haven't placed any orders yet.
              Your purchases will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="orders-count">
              Showing {orders.length}{" "}
              {orders.length === 1 ? "order" : "orders"}
            </div>

            <div className="orders-list">
              {orders.map((order, index) => (
                <div
                  className="order-card"
                  key={order.id || index}
                >
                  <div className="order-card-header">
                    <div>
                      <span className="order-label">
                        ORDER ID
                      </span>
                      <h3>#{order.id || "N/A"}</h3>
                    </div>

                    <span
                      className={`order-status ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>

                  <div className="order-divider"></div>

                  <div className="order-details-grid">
                    <div className="order-detail">
                      <span>Customer Name</span>
                      <strong>{order.name || "N/A"}</strong>
                    </div>

                    <div className="order-detail">
                      <span>Phone Number</span>
                      <strong>{order.phone || "N/A"}</strong>
                    </div>

                    <div className="order-detail">
                      <span>Order Date</span>
                      <strong>{formatDate(order.created_at)}</strong>
                    </div>

                    <div className="order-detail">
                      <span>Total Amount</span>
                      <strong className="order-total">
                        {formatPrice(order.total_price)}
                      </strong>
                    </div>
                  </div>

                  <div className="order-address">
                    <i className="bi bi-geo-alt"></i>
                    <div>
                      <span>Delivery Address</span>
                      <p>
                        {[
                          order.address,
                          order.city,
                          order.state,
                          order.pincode,
                        ]
                          .filter(Boolean)
                          .join(", ") || "Address unavailable"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
