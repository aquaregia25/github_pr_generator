import React, { createContext, useState, useEffect } from 'react';
import { createOctokit } from '../octokit';
import { useContext } from 'react';
import { PopupContext } from './PopupContext';
import { TrackerContext } from './TrackerContext';
import { useLocation, useNavigate } from 'react-router-dom/dist';
import { Octokit } from "octokit";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //PREVIOUS CONTEXTS
  const { openPopup } = useContext(PopupContext);
  const navigate = useNavigate();
  const location = useLocation();
  const {addActivityData}=useContext(TrackerContext);

  const [octokit, setOctokit] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [workingInOrg, setWorkingInOrg] = useState(null);



  useEffect(() => {
    if(location.pathname==='/repository')
      setWorkingInOrg(false);
    if(location.pathname==='/orgrepository')
      setWorkingInOrg(true);
      console.log(workingInOrg);
  }, [location.pathname,workingInOrg]);


  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };
  const handleLogin = async (ownerName, githubToken) => {
    try {
      const octokit = new Octokit({ auth: githubToken });
      const data=await octokit.rest.users.getAuthenticated();
      console.log(data);
      setOwnerDetails(data?.data);
      setOctokit(octokit);
      setIsAuthenticated(true);
    } catch (error) {
      openPopup('Error In Token Login!!' +error, 'error');
      console.log(error);
      addActivityData({ time: new Date(), type: "Error In Token Login", status: "error", message: error?.message });
      setOwnerDetails({});
    }
  };
  
  //ALL CONTEXT VALUES WHICH ARE EXPORTED
  const contextValues = {

    isAuthenticated,
    octokit,
    ownerDetails,
    workingInOrg,

    handleLogout,
    handleLogin,
  };
  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
