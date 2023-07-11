import React, { createContext, useState } from 'react';

// Create the TrackerContext
export const TrackerContext = createContext();

export const TrackerProvider = ({ children }) => {
  const [activityData, setActivityData] = useState([]);

  const addActivityData = (type,status,message) => {
    setActivityData((prevData) => [...prevData,{time: new Date(),type,status,message } ]);
  };

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
