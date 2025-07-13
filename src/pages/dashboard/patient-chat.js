import React, { useEffect, useState, useRef } from "react";

// Layout components
import Navbar from "../../components/navbar";
import PatientSidebar from "../../components/patientSidebar";
import AdminFooter from "../../components/dashboard/adminFooter";
import ScrollTop from "../../components/scrollTop";

// 3rd party
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css'
import SimpleSearchBar from '../../components/search'
import { BiSend, FiClock } from '../../assets/icons/vander'

export default function PatientChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);
  const wsRef = useRef(null);

  // Static patient list (or contacts)
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", status: "online" },
    { id: 2, name: "Jane Smith", status: "offline" },
    { id: 3, name: "Alice Johnson", status: "online" },
  ]);

  useEffect(() => {
    wsRef.current = new WebSocket('ws://your-server-url');

    wsRef.current.onopen = () => {
      setConnectionStatus('connected');
      wsRef.current.send(JSON.stringify({
        type: 'join_room',
        room: 'patient_room'
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

    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  // Select patient
  const handlePatientSelect = (patient) => {
    setMessages([]);
    setCurrentRoom(`room_patient_${patient.id}`);

    wsRef.current.send(JSON.stringify({
      type: 'join_room',
      room: `room_patient_${patient.id}`
    }));
  };

  // Send message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentRoom) return;

    const message = {
      text: newMessage,
      sender: 'patient',
      timestamp: new Date().toISOString(),
      roomId: currentRoom
    };

    wsRef.current.send(JSON.stringify({
      type: 'message',
      ...message
    }));

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  // Filter patients by search term
  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container-fluid"/>
      <section className="bg-dashboard">
        <div className="container-fluid">
          <div className="row">
            <PatientSidebar colClass="col-xl-3 col-lg-4 col-md-5 col-12 d-none d-lg-block"/>

            <div className="col-xl-9 col-lg-8 mt-4 pt-2 mt-sm-0 pt-sm-0">
              <div className="row">

                {/* Left: Patient list */}
                <div className="col-xl-3 col-lg-5 col-md-5 col-12">
                  <div className="card border-0 rounded shadow">
                    <div className="text-center p-4 border-bottom">
                      <h5 className="mt-3 mb-1">Your Patients</h5>
                      <p className="text-muted mb-0">Select to chat</p>
                    </div>

                    <SimpleSearchBar
                      onSearch={setSearchTerm}
                      placeholder="Search patients..."
                    />

                    <SimpleBar className="p-2 chat chat-list" style={{maxHeight:'450px'}}>
                      {filteredPatients.map(patient => (
                        <div
                          key={patient.id}
                          className="patient-item"
                          onClick={() => handlePatientSelect(patient)}
                          style={{cursor:'pointer', padding:'8px', borderBottom:'1px solid #eee'}}
                        >
                          <h6>{patient.name}</h6>
                          <small className={patient.status === 'online' ? 'text-success' : 'text-danger'}>
                            {patient.status}
                          </small>
                        </div>
                      ))}
                    </SimpleBar>
                  </div>
                </div>

                {/* Right: Chat window */}
                <div className="col-xl-9 col-lg-7 col-md-7 col-12 mt-4 pt-2 mt-sm-0 pt-sm-0">
                  <div className="card chat chat-person border-0 shadow rounded">
                    <SimpleBar style={{maxHeight:'500px'}}>
                      <ul className="p-4 list-unstyled mb-0 chat">
                        {messages.map((msg, i) => (
                          <li key={i} className="message chat-right">
                            <div className="chat-msg shadow px-3 py-2 bg-light rounded mb-1">
                              {msg.text}
                              <br />
                              <small className="text-muted">
                                <FiClock className="me-1" />
                                {new Date(msg.timestamp).toLocaleTimeString()}
                              </small>
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
                            onChange={e => setNewMessage(e.target.value)}
                          />
                        </div>
                        <div className="col-auto">
                          <button className="btn btn-icon btn-primary" onClick={handleSendMessage}>
                            <BiSend />
                          </button>
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

      <AdminFooter />
      <ScrollTop />
    </>
  );
}
