import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Form } from 'react-bootstrap';
import './MenuPage.css';

const MenuPage = () => {
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const foodItems = [
    { id: 1, name: 'Pizza', category: 'Italian', price: 10, image: '/assets/pizza.jpg' },
    { id: 2, name: 'Burger', category: 'Fast Food', price: 5, image: '/assets/burger.jpg' },
    // Add more items here...
  ];

  const filteredItems = foodItems.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`menu-page ${darkMode ? 'dark' : ''}`}>
      <div className="search-bar">
        <Form.Control
          type="text"
          placeholder="Search food items"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="food-items">
        {filteredItems.map(item => (
          <motion.div 
            className="food-item"
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.category}</Card.Text>
                <Card.Text>${item.price}</Card.Text>
                <Button variant="primary">Add to Cart</Button>
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

export default MenuPage;

