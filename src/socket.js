import { io } from "socket.io-client";

const socket = io("https://chatapp-backend-2-s1pn.onrender.com", {
  transports: ["polling", "websocket"]
});

export default socket; 
