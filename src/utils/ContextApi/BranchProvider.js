// MyProvider.js
import React from 'react';
import CreateContext from './MyContext';

const MyProvider = (props) => {
  // Define the data that you want to share
  const [sharedData, setSharedData] = useState(
{
    "repos":[],
    
}




  );

  // Function to update the shared data
  const updateData = (id, newMessage) => {
    setSharedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, message: newMessage } : item
      )
    );
  };

  return (
    <CreateContext.Provider value={sharedData,updateData}>
      {props.children}
    </CreateContext.Provider>
  );
};

export default MyProvider;
