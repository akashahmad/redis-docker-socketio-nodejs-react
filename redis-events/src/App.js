import React, { useState, useEffect } from "react";
import EventsView from "./containers/Events/EventsView";
const ENDPOINT = "http://localhost:5000";

function App() {
  return <EventsView />;
}

export default App;
