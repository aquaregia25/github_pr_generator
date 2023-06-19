import React, { createContext, useState } from 'react';

// Create the TrackerContext
export const TrackerContext = createContext();

// Create a TrackerProvider component to wrap your app
export const TrackerProvider = ({ children }) => {
  const [activityData, setActivityData] = useState([]);

  // Add a function to manipulate the data
  const addActivityData = (newData) => {
    setActivityData((prevData) => [...prevData, newData]);
  };

  // Pass the data and function to the value prop
  const value = {
    activityData,
    addActivityData,
  };

  return (
    <TrackerContext.Provider value={value}>
      {children}
    </TrackerContext.Provider>
  );
};
