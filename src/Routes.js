import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Mainpage from './pages/Mainpage';
import OrgRepositoryPage from './pages/OrgRepopage';
import RepositoryPage from './pages/Repopage';
import { AuthContext } from './utils/ContextApi/AuthContext';

function ComponentRoutes() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Routes>
            <Route exact path="/" element={<Mainpage />} />
            { isAuthenticated&&<Route path="/repository" element={<RepositoryPage />} />}
            { isAuthenticated&&<Route path="/orgrepo" element={<OrgRepositoryPage />} />}
        </Routes>
    );
}

export default ComponentRoutes;