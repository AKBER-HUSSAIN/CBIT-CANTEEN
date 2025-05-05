import React, { useState } from 'react';
import axios from 'axios';

const AddFoodItem = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);  // To manage loading state
  const [message, setMessage] = useState('');     // To display success or error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation to ensure fields are not empty
    if (!name || !category || !price || !imageUrl) {
      setMessage('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/menu/add', {
        name,
        category,
        price,
        imageUrl,
      });

      setMessage(response.data.message || 'Food item added successfully!');
      setLoading(false);

      // Reset form after submission
      setName('');
      setCategory('');
      setPrice('');
      setImageUrl('');
    } catch (error) {
      setMessage('Failed to add food item. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Food Item</h2>
      {message && <p className="text-center mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Food Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full p-2 ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded`}
          disabled={loading}
        >
          {loading ? 'Adding Item...' : 'Add Food Item'}
        </button>
      </form>
    </div>
  );
};

export default AddFoodItem;
