import React from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import AdminFooter from "../../components/dashboard/adminFooter";
import ScrollTop from '../../components/scrollTop';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import './doctorSchedule.css';

export default function DoctorSchedule() {
  const events = [
    {
      id: '1',
      title: 'Reserved Day',
      start: '2025-05-07',
      extendedProps: {
        status: 'reserved',
        user: 'User 1',
        hours: [
          { time: "09:00", available: false },
          { time: "10:00", available: true },
          { time: "11:00", available: false },
          { time: "12:00", available: true },
        ]
      }
    },
    {
      id: '2',
      title: 'Reserved Day',
      start: '2025-05-08',
      extendedProps: {
        status: 'reserved',
        user: 'User 2',
        hours: [
          { time: "09:00", available: false },
          { time: "10:00", available: true },
          { time: "11:00", available: false },
          { time: "12:00", available: true },
        ]
      }
    },
    {
      id: '3',
      title: 'Conference',
      start: '2025-03-18',
      end: '2025-04-20',
      extendedProps: {
        status: 'normal',
        user: '',
      }
    },
    {
      id: '4',
      title: 'Party',
      start: '2025-04-29T20:00:00',
      extendedProps: {
        status: 'available',
        user: '',
      }
    },
  ];

  const renderEventContent = (eventInfo) => {
    const { status, user, hours } = eventInfo.event.extendedProps;

    if (status === 'reserved') {
      return (
        <div className="reserved-event-content">
          <div className="reserved-title">{eventInfo.event.title}</div>
          <div className="merged-hour-container">
            {hours?.map((hour, idx) => (
              <div
                key={idx}
                className={hour.available ? 'available-hour' : 'unavailable-hour'}
              >
                {hour.time} - {hour.available ? 'Available' : `Not Available: Reserved by ${user.toUpperCase()}`}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (status === 'available') {
      return <div className="available-event-content">{eventInfo.event.title}</div>;
    }

    return <div className="normal-event-content">{eventInfo.event.title}</div>;
  };

  return (
    <>
      <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container-fluid" />
      <section className="bg-dashboard">
        <div className="container-fluid">
          <div className="row">
            <Sidebar colClass="col-xl-3 col-lg-4 col-md-5 col-12" />
            <div className="col-xl-9 col-lg-8 col-md-7 mt-4 pt-2 mt-sm-0 pt-sm-0">
              <h5 className="mb-0">Schedule Timing</h5>
              <div className="row">
                <div className="col-xl-2 col-lg-4 col-12 mt-4">
                  <div id="external-events">
                    <div className="card border-0 p-4 shadow rounded">
                      <span className="h6">All Events</span>
                      {["Meeting", "Operations", "Lunch", "Conference", "Business Meeting"].map((evt, i) => (
                        <div key={i} className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event">
                          <div className="fc-event-main">{evt}</div>
                        </div>
                      ))}
                      <div className="mt-2">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="drop-remove" />
                          <label className="form-check-label" htmlFor="drop-remove">
                            Remove after drop
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-10 col-lg-8 col-12 mt-4">
                  <div id="calendar-container" className="card rounded border-0 shadow p-4">
                    <FullCalendar
                      initialView="dayGridMonth"
                      plugins={[dayGridPlugin]}
                      events={events}
                      eventContent={renderEventContent}
                      headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,dayGridWeek,dayGridDay'
                      }}
                      height="auto"
                    />
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
