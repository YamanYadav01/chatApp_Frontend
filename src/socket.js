import { io } from "socket.io-client";

const socket = io(
    origin: "https://chat-app-frontend-bice-seven.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
});

export default socket; 
