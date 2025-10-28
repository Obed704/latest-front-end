import React, { useState, useEffect } from "react";
import Navbar from "../Header";
import Footer from "../Footer";
import ChatBolt from "../ChatBolt";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ✅ CSS animations using Tailwind utilities
const styles = `
@keyframes scrollVertical {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
@keyframes scrollHorizontal {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-scroll-vertical {
  animation: scrollVertical 25s linear infinite;
}
.animate-scroll-horizontal {
  animation: scrollHorizontal 25s linear infinite;
}
`;

const FundTheirFuturePage = () => {
  const [leftImages, setLeftImages] = useState([]);
  const [rightImages, setRightImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [message, setMessage] = useState("");
  const [paymentType, setPaymentType] = useState("one-time");
  const [processing, setProcessing] = useState(false);

  // ✅ Fetch donation images from backend
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/donation-images`)
      .then((res) => res.json())
      .then((data) => {
        setLeftImages(data.filter((i) => i.side === "left").map((i) => `${BACKEND_URL}${i.image}`));
        setRightImages(data.filter((i) => i.side === "right").map((i) => `${BACKEND_URL}${i.image}`));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching images:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Payment Handler
  const handlePayment = async (provider) => {
    if (!selectedAmount) return alert("Please select an amount");
    setProcessing(true);
    try {
      let endpoint = "";
      if (provider === "paypal") endpoint = "/api/payments/paypal";
      else if (provider === "stripe")
        endpoint = paymentType === "monthly"
          ? "/api/payments/stripe/subscription"
          : "/api/payments/stripe";

      const res = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedAmount, message }),
      });

      const data = await res.json();

      if (provider === "paypal" && data.id) {
        window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${data.id}`;
      } else if (provider === "stripe" && data.url) {
        window.location.href = data.url;
      } else {
        alert(`${provider} initialization failed`);
      }
    } catch (err) {
      console.error(`${provider} payment error:`, err);
      alert(`${provider} payment failed`);
    } finally {
      setProcessing(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-gray-600">
        Loading images...
      </div>
    );

  return (
    <>
      {/* Inject animations */}
      <style>{styles}</style>

      <Navbar bg="bg-black" />
      <ChatBolt />

      <div className="bg-gray-50 font-sans min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Desktop view - vertical scrolling */}
        <div className="hidden md:flex items-center justify-center gap-8 w-full">
          <div className="relative w-44 h-[500px] overflow-hidden rounded-xl shadow-lg bg-white">
            <div className="absolute animate-scroll-vertical space-y-4">
              {leftImages.concat(leftImages).map((img, idx) => (
                <img key={idx} src={img} alt="donation" className="rounded-xl shadow-md w-full object-cover" />
              ))}
            </div>
          </div>

          {/* Donation Form */}
          <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Choose amount</h2>

            <div className="flex justify-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => setPaymentType("one-time")}
                className={`px-4 py-2 rounded transition ${
                  paymentType === "one-time" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                One-Time
              </button>
              <button
                type="button"
                onClick={() => setPaymentType("monthly")}
                className={`px-4 py-2 rounded transition ${
                  paymentType === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                Monthly
              </button>
            </div>

            {[10, 100, 300, 510, 1000, 2000].map((value) => (
              <label
                key={value}
                className={`flex items-center border border-blue-300 rounded-lg px-4 py-2 mb-2 cursor-pointer ${
                  selectedAmount === value ? "bg-blue-50 border-blue-600" : ""
                }`}
              >
                <input
                  type="radio"
                  name="amount"
                  value={value}
                  checked={selectedAmount === value}
                  onChange={() => setSelectedAmount(value)}
                  className="mr-3 accent-blue-600"
                />
                ${value}
              </label>
            ))}

            <textarea
              placeholder="Write a comment..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-300"
            />

            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={() => handlePayment("stripe")}
                disabled={processing}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition"
              >
                {processing ? "Processing..." : "Pay with Credit Card (Stripe)"}
              </button>
              <button
                onClick={() => handlePayment("paypal")}
                disabled={processing}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg transition"
              >
                {processing ? "Processing..." : "Pay with PayPal"}
              </button>
            </div>
          </div>

          <div className="relative w-44 h-[500px] overflow-hidden rounded-xl shadow-lg bg-white">
            <div className="absolute animate-scroll-vertical space-y-4">
              {rightImages.concat(rightImages).map((img, idx) => (
                <img key={idx} src={img} alt="donation" className="rounded-xl shadow-md w-full object-cover" />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile view - horizontal scrolling */}
        <div className="flex flex-col items-center gap-6 w-full md:hidden mt-6">
          <div className="relative h-36 w-full overflow-hidden rounded-xl shadow-lg bg-white">
            <div className="absolute flex animate-scroll-horizontal space-x-4">
              {leftImages.concat(leftImages).map((img, idx) => (
                <img key={idx} src={img} alt="donation" className="h-36 w-auto rounded-xl shadow-md object-cover" />
              ))}
            </div>
          </div>

          {/* Donation Form reused */}
          <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Choose amount</h2>

            <div className="flex justify-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => setPaymentType("one-time")}
                className={`px-4 py-2 rounded transition ${
                  paymentType === "one-time" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                One-Time
              </button>
              <button
                type="button"
                onClick={() => setPaymentType("monthly")}
                className={`px-4 py-2 rounded transition ${
                  paymentType === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                Monthly
              </button>
            </div>

            {[10, 100, 300, 510, 1000, 2000].map((value) => (
              <label
                key={value}
                className={`flex items-center border border-blue-300 rounded-lg px-4 py-2 mb-2 cursor-pointer ${
                  selectedAmount === value ? "bg-blue-50 border-blue-600" : ""
                }`}
              >
                <input
                  type="radio"
                  name="amount"
                  value={value}
                  checked={selectedAmount === value}
                  onChange={() => setSelectedAmount(value)}
                  className="mr-3 accent-blue-600"
                />
                ${value}
              </label>
            ))}

            <textarea
              placeholder="Write a comment..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-300"
            />

            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={() => handlePayment("stripe")}
                disabled={processing}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition"
              >
                {processing ? "Processing..." : "Pay with Credit Card (Stripe)"}
              </button>
              <button
                onClick={() => handlePayment("paypal")}
                disabled={processing}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg transition"
              >
                {processing ? "Processing..." : "Pay with PayPal"}
              </button>
            </div>
          </div>

          <div className="relative h-36 w-full overflow-hidden rounded-xl shadow-lg bg-white">
            <div className="absolute flex animate-scroll-horizontal space-x-4">
              {rightImages.concat(rightImages).map((img, idx) => (
                <img key={idx} src={img} alt="donation" className="h-36 w-auto rounded-xl shadow-md object-cover" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FundTheirFuturePage;
