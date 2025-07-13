import React, { useEffect, useState } from 'react';
import { connectWebSocket, sendMessage, disconnectWebSocket } from '../services/websocket';
import { getOnlineUsers, getMessages } from '../services/api';
import { getUser } from '../utils/tokenStorage';

import { FiClock } from 'react-icons/fi';
import { BiSend } from 'react-icons/bi';

// Replace these imports with your actual avatar images
import dr1 from '../assets/dr1.png'; 
import dr2 from '../assets/dr2.png';

export default function DoctorChat() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUsername(user.username);

      // Connect WebSocket
      connectWebSocket(user.username, (incomingMessage) => {
        setMessages((prev) => [...prev, incomingMessage]);
      });

      // Load online users (optional)
      getOnlineUsers().then(setOnlineUsers);

      // For example, pick the first roomId or from your logic
      const firstRoomId = 'your-room-uuid'; // TODO: replace with real room ID
      setCurrentRoomId(firstRoomId);

      // Load existing messages for room
      getMessages(firstRoomId)
        .then(setMessages)
        .catch(console.error);
    }
  }, []);

  const handleSend = () => {
    if (!message || !currentRoomId) return;

    sendMessage({
      content: message,
      messageRoomId: currentRoomId,
      sender: username,
      messageType: 'TEXT', // if you have MessageType enum
    });

    setMessage('');
  };

  return (
    <>
      {/* You can keep your Navbar, Sidebar, and other UI parts here */}

      <div className="chat-container">
        <ul className="chat-messages">
          {messages.map((msg, index) => (
            <li key={index} className={msg.sender === username ? 'chat-right' : ''}>
              <div className="d-inline-block">
                <div className="d-flex chat-type mb-3">
                  <div className="position-relative chat-user-image">
                    <img
                      src={msg.sender === username ? dr1 : dr2}
                      className="avatar avatar-md-sm rounded-circle border shadow"
                      alt=""
                    />
                    <i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom"></i>
                  </div>
                  <div className="chat-msg" style={{ maxWidth: '500px' }}>
                    <p className="text-muted small shadow px-3 py-2 bg-light rounded mb-1">{msg.content}</p>
                    <small className="text-muted msg-time">
                      <FiClock className="me-1" />
                      just now
                    </small>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="chat-input">
          <input
            type="text"
            className="form-control border"
            placeholder="Enter Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <button className="btn btn-primary" onClick={handleSend}>
            <BiSend />
          </button>
        </div>
      </div>
    </>
  );
}
