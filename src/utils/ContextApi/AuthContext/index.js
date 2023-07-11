import { Octokit } from "octokit";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom/dist';
import { PopupContext } from '../PopupContext';
import { TrackerContext } from '../TrackerContext';
import { LoaderContext } from '../LoaderContext.js';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  //PREVIOUS CONTEXTS
  const { openPopup } = useContext(PopupContext);
  const { showLoader, hideLoader } = useContext(LoaderContext);
  const {addActivityData}=useContext(TrackerContext);

  const [octokit, setOctokit] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [workingInOrg, setWorkingInOrg] = useState(null);


  
  useEffect(() => {
    if(location.pathname==='/repository')
      setWorkingInOrg(false);
    if(location.pathname==='/orgrepo')
      setWorkingInOrg(true);
  }, [location.pathname,workingInOrg]);


  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };
  const handleLogin = async (ownerName, githubToken) => {
    showLoader();
    try {
      const octokit = new Octokit({ auth: githubToken });
      const data=await octokit.rest.users.getAuthenticated();
      setOwnerDetails(data?.data);
      setOctokit(octokit);
      setIsAuthenticated(true);
    } catch (error) {
      openPopup('Error In Token Login!!' +error, 'error');
      addActivityData("Error In Token Login", "error", error?.message || error);
      setOwnerDetails({});
    } finally {
      hideLoader();
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
