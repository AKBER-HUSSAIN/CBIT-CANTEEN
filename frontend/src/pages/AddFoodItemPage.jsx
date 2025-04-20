import React from 'react';
import AddFoodItem from './AddFoodItem';  // Assuming AddFoodItem is the form you already have

const AddFoodItemPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Add New Food Item</h2>
      <AddFoodItem />  {/* The form component you created earlier */}
    </div>
  );
};

export default AddFoodItemPage;
