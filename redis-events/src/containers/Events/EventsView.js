import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Events from "../../components/Events/events";
import searchIcon from "../../assets/images/searchIcon.svg";
import "./EventsView.css";

const socket = socketIOClient("http://localhost:5000");


const EventsView = (props) => {
  const [events, setEvents] = useState([]);
  const [loadEvents, setLoadEvents] = useState(true);

  const getEvents = () => {
    socket.on("FromAPI", (data) => {
      let newData = events;
      newData.push(JSON.parse(data));
      setEvents(newData);
      console.log(newData);
    });
  }
  useEffect(() => {
    getEvents()
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (!loadEvents) {
      socket.disconnect();
    }
  }, [loadEvents]);

  const liveEvents = () => {
    setLoadEvents(true);
  };

  const pauseEvents = () => {
    setLoadEvents(false);
  };

  return (
    <div className="wrapper">
      {/* LOAD OR STOP THE EVENTS */}
      <div className="header">
            <div className="flex">
                <div className="flex w-10">
                    <button  id="headerButtonInactive" onClick={liveEvents}>Live</button>
                    <button  className={loadEvents ? "Inactive" : "active"}   id="headerButtonActive"  onClick={pauseEvents}>Pause</button>
                </div>
                <div id="searchDiv" className="w-86">
                    <img id="searchIcon" src={searchIcon}  alt="Search icon" />
                    <input type="text" placeholder="Type to search" />
                </div>
                <div>

                </div>
            </div>
        </div>
      {events.length ? <Events events={events} /> : <p>No events</p>}
    </div>
  );
};

export default EventsView;
