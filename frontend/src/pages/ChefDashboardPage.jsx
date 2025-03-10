import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Badge } from 'react-bootstrap';
import './ChefDashboardPage.css';

const ChefDashboardPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const orders = [
    { id: 1, foodName: 'Pizza', price: 10, status: 'Pending', image: '/assets/pizza.jpg' },
    { id: 2, foodName: 'Burger', price: 5, status: 'Pending', image: '/assets/burger.jpg' },
    { id: 3, foodName: 'Pasta', price: 8, status: 'Completed', image: '/assets/pasta.jpg' },
  ];

  const handleMarkAsCompleted = (id) => {
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, status: 'Completed' } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className={`chef-dashboard ${darkMode ? 'dark' : ''}`}>
      <div className="order-list">
        {orders.map(order => (
          <motion.div 
            className="order-card"
            key={order.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 50 }}
          >
            <Card className="order-card-style">
              <Card.Body>
                <div className="order-info">
                  <Card.Img variant="top" src={order.image} />
                  <div className="order-details">
                    <Card.Title>{order.foodName}</Card.Title>
                    <Card.Text>${order.price}</Card.Text>
                    <Badge variant={order.status === 'Pending' ? 'warning' : 'success'}>
                      {order.status}
                    </Badge>
                    <Button 
                      variant="primary" 
                      className="mark-completed-btn" 
                      onClick={() => handleMarkAsCompleted(order.id)}
                    >
                      Mark as Completed
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="dark-mode-toggle">
        <Button onClick={() => setDarkMode(!darkMode)}>
          Toggle Dark Mode
        </Button>
      </div>
    </div>
  );
};

export default ChefDashboardPage;
