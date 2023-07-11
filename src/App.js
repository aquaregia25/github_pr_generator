import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import ComponentRoutes from './Routes';
import { AuthProvider } from './utils/ContextApi/AuthContext';
import { OrgRequestProvider } from './utils/ContextApi/OrgRequestContext';
import { PopupProvider } from './utils/ContextApi/PopupContext';
import { RequestProvider } from './utils/ContextApi/RequestContext';
import { TrackerProvider } from './utils/ContextApi/TrackerContext';
import { LoaderProvider } from './utils/ContextApi/LoaderContext.js';


function App() {
  return (
    <>
      <Router>
        <LoaderProvider>
        <PopupProvider>
          <TrackerProvider>
            <AuthProvider>
              <OrgRequestProvider>
              <RequestProvider>
                <ComponentRoutes />
              </RequestProvider>
              </OrgRequestProvider>
            </AuthProvider>
          </TrackerProvider>
        </PopupProvider>
        </LoaderProvider>
      </Router>

    </>
  );
}

export default App;
