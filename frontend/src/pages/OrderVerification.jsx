import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from 'react-bootstrap';
import '../styles//OrderVerification.css';

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
    <div className="order-verification">
      <h2>Order Verification</h2>

      {/* QR Code for Order */}
      {orderId ? (
        <div className="qr-section">
          <QRCodeCanvas value={orderId} size={200} />
          <p>Scan this QR Code to verify your order.</p>
        </div>
      ) : (
        <Button onClick={() => setOrderId(`ORDER-${Math.floor(Math.random() * 10000)}`)}>
          Generate Order QR
        </Button>
      )}

      {/* Scanned QR Code Input */}
      <div className="scan-section">
        <input
          type="text"
          placeholder="Enter scanned QR code"
          value={scannedId || ''}
          onChange={(e) => setScannedId(e.target.value)}
        />
        <Button onClick={handleVerify} className="verify-btn">
          Verify Order
        </Button>
      </div>

      {verified && <p className="success-message">✅ Order Verified Successfully!</p>}
    </div>
  );
};

export default OrderVerification;
