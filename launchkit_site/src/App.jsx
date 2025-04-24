import { useContext } from 'react';
import LandingPage from './pages/landingpage';
import './index.css';
import Register from './pages/Register';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthContext } from './context/AuthContext';
import ContentListPage from './pages/ContentListPage';

function App() {
  const { IsAuthenticated } = useContext(AuthContext); // Get the user from AuthContext

  return (
    <Routes>
      {IsAuthenticated ? (
        // Authenticated routes
        <>
          <Route path='content_blocks' element={<ContentListPage/>}  />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='*' element={<Navigate to='/dashboard' />} />
        </>
      ) : (
        // Unauthenticated routes
        <>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='' element={<LandingPage />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </>
      )}
    </Routes>
  );
}

export default App;
