import { useContext } from 'react';
import LandingPage from './pages/landingpage';
import './index.css';
import Register from './pages/Register';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardHome from './pages/DashboardHome';
import { AuthContext } from './context/AuthContext';
import ContentListPage from './pages/ContentListPage';
import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import ContentPage from './pages/ContentPage';
import NotFound from './pages/NotFound';
import CreatePostForm from './pages/CreatePostForm';


function App() {
  const {loading, isAuthenticated } = useContext(AuthContext); 
  
  if(loading){
    return <Loader/>
  }

  return (
    <Routes>
      {isAuthenticated ? (
        // Authenticated routes
        <>
          <Route path='content' element={<ContentListPage/>}  />
          <Route path='content/:slug' element={<ContentPage />} />
          <Route path="/dashboard" element={ <ProtectedRoute> <DashboardLayout>  <DashboardHome /> </DashboardLayout> </ProtectedRoute>}/>
          <Route path='*' element={<NotFound />} />
          <Route path='' element={<LandingPage />} />
          <Route path='create_post' element={<CreatePostForm/>} />
        </>
      ) : (
        // Unauthenticated routes
        <>
          <Route path='' element={<LandingPage />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </>
      )}
    </Routes>
  );
}

export default App;
