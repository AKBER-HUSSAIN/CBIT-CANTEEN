import React, { useEffect, useState } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  // ✅ Fetch Orders & Transactions
  useEffect(() => {
    axios.get("http://localhost:3000/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setOrders(res.data))
    .catch((err) => console.error("❌ Error Fetching Orders:", err));

    axios.get("http://localhost:3000/api/orders/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setTransactions(res.data))
    .catch((err) => console.error("❌ Error Fetching Transactions:", err));
  }, [token]);

  return (
    <Container className="mt-5">
      <h2>📜 Order History</h2>

      <h4 className="mt-4">🛒 Past Orders</h4>
      {orders.length > 0 ? (
        orders.map((order) => (
          <Card key={order._id} className="mb-3">
            <Card.Body>
              <Card.Title>Order ID: {order._id}</Card.Title>
              <Card.Text>Total: ₹{order.totalAmount}</Card.Text>
              <ListGroup>
                {order.items.map((item) => (
                  <ListGroup.Item key={item.itemId._id}>
                    {item.itemId.name} - {item.quantity}x
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No past orders found.</p>
      )}

      <h4 className="mt-4">💰 Transaction History</h4>
      {transactions.length > 0 ? (
        transactions.map((tx) => (
          <Card key={tx._id} className="mb-3">
            <Card.Body>
              <Card.Title>Transaction ID: {tx._id}</Card.Title>
              <Card.Text>Type: {tx.type}</Card.Text>
              <Card.Text>Amount: ₹{tx.amount}</Card.Text>
              <Card.Text>Date: {new Date(tx.date).toLocaleString()}</Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No transactions found.</p>
      )}
    </Container>
  );
};

export default OrderHistory;
