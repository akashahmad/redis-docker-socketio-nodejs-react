import React, { useState, useEffect } from "react";
import {socket} from '../../config'
import Events from "../../components/Events/events";
import searchIcon from "../../assets/images/searchIcon.svg";
import "./EventsView.css";



const EventsView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    // eslint-disable-next-line
  }, []);


  const getEvents = () => {
    socket.on("FromAPI", (data) => {
      let newData = events;
      newData.push(JSON.parse(data));
      setEvents([...newData]);
    });
  }
  const liveEvents = () => {
    socket.connect();
  };

  const pauseEvents = () => {
    socket.disconnect();
  };

  return (
    <div className="wrapper">
      {/* LOAD OR STOP THE EVENTS */}
      <div className="header">
        <div className="flex">
          <div className="flex">
            <button id="headerButtonInactive" onClick={liveEvents}>Live</button>
            <button id="headerButtonActive" onClick={pauseEvents}>Pause</button>
          </div>
          <div id="searchDiv">
            <img id="searchIcon" src={searchIcon} alt="Search icon" />
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
