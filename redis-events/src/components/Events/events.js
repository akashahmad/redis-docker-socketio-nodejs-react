import React, { useState, useEffect } from "react";
import "./events.css";

import tickMark from "../../assets/images/tick.svg";

const Events = (props) => {
  console.log("Table Console: ", props.events);
  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.events.map((event) => (
            <tr key={event.anonymousId + event.userId + event.messageId + event.sentAt}>
              <td>
                <div className="roundedCheck flex">
                  <img src={tickMark} alt="Tick mark" />
                </div>
              </td>
              <td>{event.type}</td>
              <td>{event.context.ip}</td>
              <td>{event.userId}</td>
              <td>{event.messageId}</td>
              <td>{event.anonymousId}</td>
              <td>{event.receivedAt}</td>
              <td>{event.sentAt}</td>
              <td>{event.event}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Events;
