import io from 'socket.io-client'

const socket = io('https://chat-app-backend-azure-omega.vercel.app/');

export default socket; 