import './App.css';
import Mainpage from './pages/Mainpage/Mainpage'
import RepositoryPage from './pages/Repopage/Repopage';
import OrgRepositoryPage from './pages/OrgRepopage/OrgRepopage';
import { RequestProvider } from './utils/ContextApi/RequestContext';
import { OrgRequestProvider } from './utils/ContextApi/OrgRequestContext';
import { PopupProvider } from './utils/ContextApi/PopupContext';
import { TrackerProvider } from './utils/ContextApi/TrackerContext';
import { AuthProvider } from './utils/ContextApi/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <PopupProvider>
          <TrackerProvider>
            <AuthProvider>
              <OrgRequestProvider>
              <RequestProvider>
                <Routes>
                  <Route exact path="/" element={<Mainpage />} />
                  <Route path="/repository" element={<RepositoryPage />} />
                  <Route path="/orgrepo" element={<OrgRepositoryPage />} />
                </Routes>
              </RequestProvider>
              </OrgRequestProvider>
            </AuthProvider>
          </TrackerProvider>
        </PopupProvider>
      </Router>

    </>
  );
}

export default App;
