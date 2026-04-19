import { io } from "socket.io-client";

const socket = io("https://chatapp-backend-2-s1pn.onrender.com", {
  transports: ["websocket"],   // ✅ correct
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 5
});

export default socket; 
