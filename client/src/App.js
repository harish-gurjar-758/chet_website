import React, { useEffect } from 'react';
import NavBar from './Components/NavBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './Components/Pages/HomePage';
import SignUpPage from './Components/Pages/SignUpPage';
import LogInPage from './Components/Pages/LogInPage';
import SettingsPage from './Components/Pages/SettingsPage';
import ProfilePage from './Components/Pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react'

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
    </div>
  );
}

export default App;
