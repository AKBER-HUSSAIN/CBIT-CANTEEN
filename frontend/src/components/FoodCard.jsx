import { motion } from 'framer-motion';

const FoodCard = ({ name, price, image, description }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card h-100"
    >
      <img 
        src={image} 
        className="card-img-top rounded-top" 
        alt={name}
        style={{ height: 200, objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text text-muted">{description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fs-5">₹{price}</span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
