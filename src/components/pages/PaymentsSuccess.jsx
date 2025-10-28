import React from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const token = params.get("token");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center">
      <h1 className="text-4xl font-bold text-green-700 mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-2">
        Thank you for your donation.
      </p>
      <p className="text-sm text-gray-500">Transaction ID: {token}</p>
    </div>
  );
};

export default PaymentSuccess;
