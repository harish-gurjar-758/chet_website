import React, { useEffect } from 'react';
import NavBar from './Components/NavBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SignUpPage from './Pages/SignUpPage';
import LogInPage from './Pages/LogInPage';
import SettingsPage from './Pages/SettingsPage';
import ProfilePage from './Pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser) return (
    <div>
      <p><Loader /></p>
    </div>
  )

  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={
            authUser ? <HomePage /> : <Navigate to="/login" />
          }
        />
        <Route
          path='/signup'
          element={
            !authUser ? <SignUpPage /> : <Navigate to="/" />
          }
        />
        <Route
          path='/login' element={
            !authUser ? <LogInPage /> : <Navigate to="/" />
          }
        />
        <Route
          path='/settings'
          element={
            authUser ? <SettingsPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path='/profile'
          element={
            authUser ? <ProfilePage /> : <Navigate to="/login" />
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
