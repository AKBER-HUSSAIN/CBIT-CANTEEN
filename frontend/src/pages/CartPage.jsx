import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Form } from 'react-bootstrap';
import './CartPage.css';

const CartPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const initialItems = [
    { id: 1, name: 'Pizza', price: 10, quantity: 1, image: '/assets/pizza.jpg' },
    { id: 2, name: 'Burger', price: 5, quantity: 1, image: '/assets/burger.jpg' },
  ];

  const [cartItems, setCartItems] = useState(initialItems);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={`cart-page ${darkMode ? 'dark' : ''}`}>
      <div className="cart-items">
        {cartItems.map(item => (
          <motion.div 
            className="cart-item"
            key={item.id}
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 60 }}
          >
            <Card className="cart-card">
              <Card.Body>
                <div className="cart-item-details">
                  <Card.Img variant="top" src={item.image} />
                  <div className="cart-item-info">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>${item.price}</Card.Text>
                    <div className="quantity-selector">
                      <Button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</Button>
                      <Form.Control type="number" value={item.quantity} onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)} />
                      <Button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</Button>
                    </div>
                    <Button variant="danger" onClick={() => handleRemove(item.id)} className="remove-item-btn">Remove</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="total-price">
        <h3>Total Price: ${totalPrice}</h3>
        <Button variant="success" className="checkout-btn">Proceed to Checkout</Button>
      </div>

      <div className="dark-mode-toggle">
        <Button onClick={() => setDarkMode(!darkMode)}>
          Toggle Dark Mode
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
