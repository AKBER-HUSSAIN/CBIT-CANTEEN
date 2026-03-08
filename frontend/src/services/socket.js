import { io } from 'socket.io-client';

// Replace with your backend WebSocket URL
const socket = io('https://cbit-canteen-1.onrender.com');

export default socket;
