

// filepath: c:\Users\VIRAJ M\Desktop\cbit_canteen_2\CBIT-CANTEEN\frontend\src\pages\EmailVerification.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const EmailVerification = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await API.get(`/auth/verify-email/${token}`);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Verification failed!");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="text-center mt-5">
      <h2>{message}</h2>
    </div>
  );
};

export default EmailVerification;