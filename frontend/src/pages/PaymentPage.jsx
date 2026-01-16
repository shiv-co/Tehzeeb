import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import { clearCart, clearBuyNowItem } from "../redux/cartSlice.js";


const COLORS = {
  primary: "#B3541E",
  secondary: "#D6A74F",
  accent: "#A5A58D",
  text: "#3E2F1C",
  background: "#F5EBDD",
};

// Your backend URL
const API_URL = "https://tehzeeb-pi47.vercel.app/api";
// const API_URL = "http://localhost:5000/api";
// For local dev use:
export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Get cart items & total price from Redux
  const { cartItems, buyNowItem } = useSelector(
    (state) => state.cart
  );

const orderPayload = location.state?.orderPayload;
const amount = orderPayload?.amount;
  
  useEffect(() => {
  if (!amount) {
    alert("Invalid payment amount. Redirecting to checkout.");
    navigate("/checkout");
  }
}, [amount]);


  // Get address stored from checkout page
  const shippingInfo = JSON.parse(sessionStorage.getItem("shippingInfo"));


  useEffect(() => {

    if (!shippingInfo) {
      alert("Missing checkout details.");
      navigate("/checkout");
    }
  }, []);

  // ----------------------------
  // LOAD RAZORPAY SDK
  // ----------------------------
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ----------------------------
  // HANDLE PAYMENT
  // ----------------------------
  const handlePayment = async () => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert("Failed to load Razorpay. Check your internet connection.");
      return;
    }

    try {
      // STEP 1 → Create order in backend
      const { data: orderData } = await axios.post(
        `${API_URL}/payment/create-order`,
        { amount }
      );

      // STEP 2 → Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay key
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Tehzeeb Creations",
        description: "Order Payment",
        image: "/icons/Logo1.png",
        order_id: orderData.id,
        handler: async function (response) {
          // STEP 3 → Send payment verification to backend
          const userId = JSON.parse(localStorage.getItem("userInfo"))?._id;

          const verifyRes = await axios.post(`${API_URL}/payment/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: amount,
            shippingInfo,
            buyNowItem,
            cartItems,
            userId,
          });

          if (verifyRes.data.success) {
            dispatch(clearCart());
            dispatch(clearBuyNowItem());

            navigate(`/order-success?trackingId=${verifyRes.data.trackingId}`);
          } else {
            alert("Payment verification failed");
          }
        },
        theme: {
          color: COLORS.primary,
        },
        prefill: {
          name: shippingInfo.fullName,
          email: shippingInfo.email,
          contact: shippingInfo.phone,
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
      alert("Payment initiation failed. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen py-10 px-6"
      style={{ background: COLORS.background }}
    >
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: COLORS.primary }}
        >
          Payment
        </h1>

        {/* Order Summary */}
        <div className="mb-6 border p-4 rounded-lg">
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: COLORS.text }}
          >
            Order Summary
          </h2>

          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between mb-2">
              <span style={{ color: COLORS.text }}>{item.name}</span>
              <span style={{ color: COLORS.primary }}>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}

          <div className="flex justify-between mt-3 text-lg font-bold">
            <span>Total</span>
            <span style={{ color: COLORS.primary }}>₹{amount}</span>
          </div>
        </div>

        {/* Shipping Info */}

        {/* Shipping Info */}
        <div className="mb-8 border p-4 rounded-lg">
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: COLORS.text }}
          >
            Shipping Information
          </h2>

          {shippingInfo ? (
            <>
              <p>{shippingInfo.fullName}</p>
              <p>{shippingInfo.phone}</p>
              <p>{shippingInfo.address}</p>
              <p>
                {shippingInfo.city} - {shippingInfo.postalCode}
              </p>
            </>
          ) : (
            <p className="text-red-500">
              No shipping info found. Redirecting...
            </p>
          )}
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          className="w-full py-3 rounded-xl text-lg font-bold text-white shadow-md hover:opacity-90"
          style={{ background: COLORS.primary }}
        >
          Pay ₹{amount} Securely
        </button>
      </div>
    </div>
  );
}



