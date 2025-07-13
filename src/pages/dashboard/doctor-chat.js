import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// ✅ Assets (images, icons)
import bg1 from '../../assets/images/bg/bg-chat.png'
import dr1 from '../../assets/images/doctors/01.jpg'
import dr2 from '../../assets/images/doctors/02.jpg'

// ✅ Reusable layout components
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import AdminFooter from "../../components/dashboard/adminFooter";
import ScrollTop from "../../components/scrollTop";

// ✅ 3rd party UI helpers
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css'
import SimpleSearchBar from '../../components/search'
import { BiSend, FiClock } from '../../assets/icons/vander'

export default function DoctorChat() {
  // ==============================
  // ✅ STATE & REFERENCES
  // ==============================
  const [messages, setMessages] = useState([]); // All messages for current room
  const [newMessage, setNewMessage] = useState(''); // The input field value
  const [connectionStatus, setConnectionStatus] = useState('connecting'); // WS status
  const [selectedPatient, setSelectedPatient] = useState(null); // Currently active patient
  const [searchTerm, setSearchTerm] = useState(''); // Search bar filter text
  const [currentRoom, setCurrentRoom] = useState(null); // Joined room ID
  const [show2, setShow2] = useState(false); // Toggle for search dropdown
  const wsRef = useRef(null); // Reference to WebSocket connection

  // ✅ Static patient list
  // In production: replace with a fetch from your backend to get real patient data + status.
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", status: "online", avatar: dr2 },
    { id: 2, name: "Jane Smith", status: "offline", avatar: dr2 },
    { id: 3, name: "Alice Johnson", status: "online", avatar: dr2 },
    { id: 4, name: "Bob Brown", status: "offline", avatar: dr2 },
  ]);

  // ==============================
  // ✅ USE EFFECT: CONNECT WEBSOCKET
  // ==============================
  useEffect(() => {
    // Open WebSocket connection to your server
    wsRef.current = new WebSocket('ws://your-server-url');

    wsRef.current.onopen = () => {
      setConnectionStatus('connected');
      // Example: doctor joins a general room or authenticates
      wsRef.current.send(JSON.stringify({
        type: 'join_room',
        room: 'doctor_room'
      }));
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch(data.type) {
        case 'message':
          // Server pushed a new message → add to local list
          setMessages(prev => [...prev, data.message]);
          break;

        case 'room_joined':
          // Server confirms room join success
          setCurrentRoom(data.room);
          break;

        case 'status_update':
          // Example: server pushes patient status update
          setPatients(prev =>
            prev.map(p =>
              p.id === data.patientId ? { ...p, status: data.status } : p
            )
          );
          break;

        default:
          console.log('Unknown message type:', data.type);
      }
    };

    wsRef.current.onerror = (error) => {
      setConnectionStatus('error');
      console.error('WebSocket error:', error);
    };

    wsRef.current.onclose = () => {
      setConnectionStatus('disconnected');
    };

    // ✅ Cleanup WS on unmount
    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  // ==============================
  // ✅ PATIENT SELECT: JOIN ROOM & LOAD HISTORY
  // ==============================
  const handlePatientSelect = async (patient) => {
    setSelectedPatient(patient);
    setMessages([]); // Clear chat when switching

    const roomId = `room_${patient.id}`;
    setCurrentRoom(roomId);

    // 👉 If you have REST API, fetch old messages for this room:
    // const res = await fetch(`/api/rooms/${roomId}/messages`);
    // const oldMsgs = await res.json();
    // setMessages(oldMsgs);

    // Tell backend to join room
    wsRef.current.send(JSON.stringify({
      type: 'join_room',
      room: roomId
    }));
  };

  // ==============================
  // ✅ SEND MESSAGE TO PATIENT
  // ==============================
  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentRoom) return;

    const message = {
      text: newMessage,
      sender: 'doctor',
      timestamp: new Date().toISOString(),
      roomId: currentRoom
    };

    // Push to server (will be saved + broadcast to room)
    wsRef.current.send(JSON.stringify({
      type: 'message',
      ...message
    }));

    // Optimistic update → show immediately in chat
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  // ==============================
  // ✅ FILTERED PATIENT LIST
  // ==============================
  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* ==============================
          ✅ Navbar & Sidebar Layout 
      ============================== */}
      <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container-fluid"/>
      <section className="bg-dashboard">
        <div className="container-fluid">
          <div className="row">
            <Sidebar colClass="col-xl-3 col-lg-4 col-md-5 col-12 d-none d-lg-block"/>

            <div className="col-xl-9 col-lg-8 mt-4 pt-2 mt-sm-0 pt-sm-0">
              <div className="row">

                {/* ==============================
                    ✅ LEFT: Patients List Panel
                ============================== */}
                <div className="col-xl-3 col-lg-5 col-md-5 col-12">
                  <div className="card border-0 rounded shadow">
                    <div className="text-center p-4 border-bottom">
                      <img src={dr1} className="avatar avatar-md-md rounded-pill shadow" alt=""/>
                      <h5 className="mt-3 mb-1">Dr. Calvin Carlo</h5>
                      <p className="text-muted mb-0">Orthopedic</p>
                    </div>

                    {/* Search input */}
                    <SimpleSearchBar 
                      onSearch={setSearchTerm}
                      placeholder="Search patients..."
                    />

                    {/* Patients list */}
                    <SimpleBar className="p-2 chat chat-list" style={{maxHeight:'450px'}}>
                      {filteredPatients.map((patient) => (
                        <div 
                          key={patient.id}
                          className="patient-item"
                          onClick={() => handlePatientSelect(patient)}
                          style={{cursor:'pointer', padding:'8px', borderBottom:'1px solid #eee'}}
                        >
                          <div className="d-flex align-items-center">
                            <img 
                              src={patient.avatar} 
                              className="avatar avatar-md-sm rounded-circle border shadow" 
                              alt={patient.name}
                            />
                            <div className="ms-3">
                              <h6 className="text-dark mb-0">{patient.name}</h6>
                              <small className="text-muted">
                                Status: <span className={patient.status === 'online' ? 'text-success' : 'text-danger'}>
                                  {patient.status}
                                </span>
                              </small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </SimpleBar>
                  </div>
                </div>

                {/* ==============================
                    ✅ RIGHT: Chat Panel
                ============================== */}
                <div className="col-xl-9 col-lg-7 col-md-7 col-12 mt-4 pt-2 mt-sm-0 pt-sm-0">
                  <div className="card chat chat-person border-0 shadow rounded">
                    <div className="d-flex justify-content-between border-bottom p-4">
                      <div className="d-flex">
                        <img src={selectedPatient?.avatar || dr2} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                        <div className="overflow-hidden ms-3">
                          <h6 className="text-dark mb-0 h6 d-block text-truncate">
                            {selectedPatient?.name || 'Select a patient'}
                          </h6>
                          <small className="text-muted">
                            <i className={`mdi mdi-checkbox-blank-circle ${selectedPatient?.status === 'online' ? 'text-success' : 'text-danger'} on-off align-text-bottom`}></i>
                            {selectedPatient?.status || ''}
                          </small>
                        </div>
                      </div>
                    </div>

                    {/* Chat messages */}
                    <SimpleBar style={{backgroundImage:`url(${bg1})`,maxHeight:'500px', backgroundPosition:'center'}}>
                      <ul className="p-4 list-unstyled mb-0 chat">
                        {messages.map((message, index) => (
                          <li key={index} className={`message ${message.sender === 'doctor' ? 'chat-right' : ''}`}>
                            <div className="d-inline-block">
                              <div className="d-flex chat-type mb-3">
                                <div className="position-relative">
                                  <img 
                                    src={message.sender === 'doctor' ? dr1 : selectedPatient?.avatar} 
                                    className="avatar avatar-md-sm rounded-circle border shadow" 
                                    alt=""
                                  />
                                  <i className={`mdi mdi-checkbox-blank-circle ${message.sender === 'doctor' ? 'text-success' : 'text-danger'} on-off align-text-bottom`}></i>
                                </div>
                                <div className="chat-msg" style={{maxWidth:'500px'}}>
                                  <p className="text-muted small shadow px-3 py-2 bg-light rounded mb-1">
                                    {message.text}
                                  </p>
                                  <small className="text-muted msg-time">
                                    <FiClock className="me-1" />
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </SimpleBar>

                    {/* Message input */}
                    <div className="p-2 rounded-bottom shadow">
                      <div className="row">
                        <div className="col">
                          <input 
                            type="text" 
                            className="form-control border" 
                            placeholder="Enter Message..." 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                          />
                        </div>
                        <div className="col-auto">
                          <Link 
                            to="#" 
                            className="btn btn-icon btn-primary"
                            onClick={handleSendMessage}
                          >
                            <BiSend />
                          </Link>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Footer & ScrollTop */}
      <AdminFooter/>
      <ScrollTop/>
    </>
  );
}
