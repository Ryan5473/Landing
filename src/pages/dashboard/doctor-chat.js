import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import bg1 from '../../assets/images/bg/bg-chat.png'
import dr1 from '../../assets/images/doctors/01.jpg'
import dr2 from '../../assets/images/doctors/02.jpg'
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import AdminFooter from "../../components/dashboard/adminFooter";
import ScrollTop from "../../components/scrollTop";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css'
import SimpleSearchBar from '../../components/search'
import { BiSend, FiClock } from '../../assets/icons/vander'

export default function DoctorChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [show2, setShow2] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket('ws://your-server-url');

    wsRef.current.onopen = () => {
      setConnectionStatus('connected');
      wsRef.current.send(JSON.stringify({
        type: 'join_room',
        room: 'doctor_room'
      }));
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch(data.type) {
        case 'message':
          setMessages(prev => [...prev, data.message]);
          break;
        case 'room_joined':
          setCurrentRoom(data.room);
          break;
        case 'room_left':
          setCurrentRoom(null);
          break;
        case 'patient_status':
          setPatients(prev => prev.map(p => 
            p.id === data.patientId ? {...p, status: data.status} : p
          ));
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
      handleReconnection();
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleReconnection = () => {
    const reconnect = () => {
      setTimeout(() => {
        if (wsRef.current?.readyState === WebSocket.CLOSED) {
          wsRef.current = new WebSocket('ws://your-server-url');
          setupWebSocketHandlers();
        }
      }, 5000);
    };
    reconnect();
  };

  const setupWebSocketHandlers = () => {
    wsRef.current.onopen = () => {
      setConnectionStatus('connected');
      wsRef.current.send(JSON.stringify({
        type: 'join_room',
        room: 'doctor_room'
      }));
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch(data.type) {
        case 'message':
          setMessages(prev => [...prev, data.message]);
          break;
        case 'room_joined':
          setCurrentRoom(data.room);
          break;
        case 'room_left':
          setCurrentRoom(null);
          break;
        case 'patient_status':
          setPatients(prev => prev.map(p => 
            p.id === data.patientId ? {...p, status: data.status} : p
          ));
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
      handleReconnection();
    };
  };

  const fetchPatients = async (searchTerm) => {
    try {
      const response = await fetch(`/api/patients?search=${searchTerm}`);
      const data = await response.json();
      setPatients(data.patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handlePatientSelect = async (patient) => {
    try {
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          patientId: patient.id,
          doctorId: 'current_doctor_id'
        })
      });
      const roomData = await response.json();

      wsRef.current.send(JSON.stringify({
        type: 'join_room',
        room: roomData.roomId
      }));

      setSelectedPatient(patient);
      setCurrentRoom(roomData.roomId);
      setMessages(roomData.messages);
    } catch (error) {
      console.error('Error creating/joining room:', error);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentRoom) return;

    const message = {
      text: newMessage,
      sender: 'doctor',
      timestamp: new Date().toISOString(),
      roomId: currentRoom
    };

    wsRef.current.send(JSON.stringify({
      type: 'message',
      ...message
    }));

    setNewMessage('');
  };

  return (
    <>
      <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container-fluid"/>
      <section className="bg-dashboard">
        <div className="container-fluid">
          <div className="row">
            <Sidebar colClass="col-xl-3 col-lg-4 col-md-5 col-12 d-none d-lg-block"/>
            <div className="col-xl-9 col-lg-8 mt-4 pt-2 mt-sm-0 pt-sm-0">
              <div className="row">
                <div className="col-xl-3 col-lg-5 col-md-5 col-12">
                  <div className="card border-0 rounded shadow">
                    <div className="text-center p-4 border-bottom">
                      <img src={dr1} className="avatar avatar-md-md rounded-pill shadow" alt=""/>
                      <h5 className="mt-3 mb-1">Dr. Calvin Carlo</h5>
                      <p className="text-muted mb-0">Orthopedic</p>
                    </div>
                    <SimpleSearchBar 
                      onSearch={setSearchTerm}
                      placeholder="Search patients..."
                    />
                    <SimpleBar className="p-2 chat chat-list" style={{maxHeight:'450px'}}>
                      {patients.map((patient) => (
                        <div 
                          key={patient.id}
                          className="patient-item"
                          onClick={() => handlePatientSelect(patient)}
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
                <div className="col-xl-9 col-lg-7 col-md-7 col-12 mt-4 pt-2 mt-sm-0 pt-sm-0">
                  <div className="card chat chat-person border-0 shadow rounded">
                    <div className="d-flex justify-content-between border-bottom p-4">
                      <div className="d-flex">
                        <img src={dr2} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                        <div className="overflow-hidden ms-3">
                          <h6 className="text-dark mb-0 h6 d-block text-truncate">
                            {selectedPatient?.name || 'Select a patient'}
                          </h6>
                          <small className="text-muted">
                            <i className={`mdi mdi-checkbox-blank-circle ${selectedPatient?.status === 'online' ? 'text-success' : 'text-danger'} on-off align-text-bottom`}></i>
                            {selectedPatient?.status || 'Select a patient'}
                          </small>
                        </div>
                      </div>
                      <ul className="list-unstyled mb-0">
                        <li className="dropdown dropdown-primary list-inline-item">
                          <button 
                            type="button" 
                            className="btn btn-icon btn-pills btn-primary dropdown-toggle p-0"
                            onClick={() => setShow2(!show2)}
                          >
                            <i className="mdi mdi-magnify"></i>
                          </button>
                          <div 
                            className={`dropdown-menu dd-menu dropdown-menu-end bg-white shadow rounded border-0 mt-3 py-0 ${show2 ? 'show' : ''}`}
                            style={{width:'200px', right:'0'}}
                          >
                            <form>
                              <input 
                                type="text" 
                                id="text1" 
                                name="name" 
                                className="form-control border bg-white"
                                placeholder="Search patients..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                            </form>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <SimpleBar 
                      style={{backgroundImage:`url(${bg1})`,maxHeight:'500px', backgroundPosition:'center'}}
                    >
                      <ul className="p-4 list-unstyled mb-0 chat">
                        {messages.map((message, index) => (
                          <li key={index} className={`message ${message.sender === 'doctor' ? 'chat-right' : ''}`}>
                            <div className="d-inline-block">
                              <div className="d-flex chat-type mb-3">
                                <div className="position-relative">
                                  <img 
                                    src={message.sender === 'doctor' ? dr1 : dr2} 
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
      <AdminFooter/>
      <ScrollTop/>
    </>
  );
}