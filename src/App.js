import './App.css';
import Mainpage from './pages/Mainpage/Mainpage'
import RepositoryPage from './pages/Repopage/Repopage';
import { RequestProvider } from './utils/ContextApi/RequestContext';
import { PopupProvider } from './utils/ContextApi/PopupContext';
import { TrackerProvider } from './utils/ContextApi/TrackerContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <PopupProvider>
          <TrackerProvider>
            <RequestProvider>
              <Routes>
                <Route exact path="/" element={<Mainpage />} />
                <Route path="/repository" element={<RepositoryPage />} />
              </Routes>
            </RequestProvider>
          </TrackerProvider>
        </PopupProvider>
      </Router>

    </>
  );
}

export default App;
