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
import EditPostForm from './pages/EditPostForm';
import CreateCategoryForm from './pages/CreateCategoryForm';
import CategoriesList from './pages/CategoriesList';
import PublicContentPage from './pages/PublicContentPage';

function App() {
  
  return (
    <Routes>

          <Route path='blog/:slug' element={<PublicContentPage/>}  />
          <Route path='content' element={<ContentListPage/>}  />
          <Route path='' element={<LandingPage />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<NotFound />} />

        // Authenticated routes

        <Route element={<ProtectedRoute/>} >
            <Route path='dashboard/content' element={<ContentListPage/>}  />
            <Route path='blog/:slug' element={<ContentPage />} />
            <Route path="/dashboard" element={  <DashboardLayout>  <DashboardHome /> </DashboardLayout>}/>
            <Route path='content/create' element={<CreatePostForm/>} />
            <Route path='content/update/:id' element={<EditPostForm/>} />
            <Route path='categories/create' element={<CreateCategoryForm/>} />
            <Route path='categories' element={<CategoriesList/>} />
        </Route>
    </Routes>
  );
}

export default App;
