import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaQrcode, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import '../styles/OrderVerification.css';

const OrderVerification = () => {
  const [orderId, setOrderId] = useState('');
  const [scannedId, setScannedId] = useState(null);
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    if (scannedId === orderId) {
      setVerified(true);
    } else {
      alert('Invalid QR Code');
    }
  };

  return (
    <Container className="order-verification py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center mb-4">Order Verification</h2>

        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            {orderId ? (
              <motion.div 
                className="qr-section"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="qr-container">
                  <QRCodeCanvas value={orderId} size={200} />
                </div>
                <p className="mt-3">
                  <FaQrcode className="me-2" />
                  Scan this QR Code to verify your order
                </p>
                <div className="order-id">Order ID: {orderId}</div>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => setOrderId(`ORDER-${Math.floor(Math.random() * 10000)}`)}
                  className="generate-btn"
                >
                  <FaQrcode className="me-2" />
                  Generate Order QR
                </Button>
              </motion.div>
            )}

            <motion.div 
              className="scan-section mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                placeholder="Enter scanned QR code"
                value={scannedId || ''}
                onChange={(e) => setScannedId(e.target.value)}
                className="form-control mb-3"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleVerify} className="verify-btn">
                  Verify Order
                </Button>
              </motion.div>
            </motion.div>

            {verified && (
              <motion.p 
                className="success-message mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FaCheckCircle className="me-2" />
                Order Verified Successfully!
              </motion.p>
            )}
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default OrderVerification;
