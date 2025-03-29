import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import axios from "axios";

const OrderPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("❌ No token found. Redirecting to login.");
      navigate("/login");
      return;
    }

    axios.get("http://localhost:3000/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setCartItems(res.data.items);
      setTotalAmount(res.data.items.reduce((sum, item) => sum + item.itemId.price * item.quantity, 0));
    })
    .catch((err) => console.error("❌ Error Fetching Cart:", err));

    axios.get("http://localhost:3000/api/wallet/balance", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setWalletBalance(res.data.balance))
    .catch((err) => console.error("❌ Error Fetching Wallet:", err));
  }, [token, navigate]);

  const placeOrder = () => {
    if (walletBalance < totalAmount) {
      alert("❌ Insufficient wallet balance!");
      return;
    }

    axios.post("http://localhost:3000/api/orders/place", 
      { items: cartItems },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => {
      console.log("✅ Order Placed:", res.data);
      alert("🎉 Order placed successfully!");

      axios.post("http://localhost:3000/api/orders/clear-cart", 
        {}, 
        { headers: { Authorization: `Bearer ${token}` } }
      ).then(() => console.log("🛒 Cart cleared"))
      .catch(err => console.error("❌ Error clearing cart:", err));

      setCartItems([]);
      navigate(`/order-status/${res.data.orderId}`); // ✅ Fixed
    })
    .catch((err) => console.error("❌ Error Placing Order:", err));
  };

  return (
    <Container className="mt-5">
      <h2>🛒 Order Summary</h2>
      <Card className="p-3">
        <h5>Total Items: {cartItems.length}</h5>
        <h5>Total Amount: ₹{totalAmount}</h5>
        <h5>Wallet Balance: ₹{walletBalance}</h5>
        <Button variant="success" onClick={placeOrder} disabled={walletBalance < totalAmount}>
          ✅ Place Order
        </Button>
      </Card>
    </Container>
  );
};

export default OrderPage;
