import React, { useEffect } from 'react';
import NavBar from './Components/NavBar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/Pages/HomePage';
import SignUpPage from './Components/Pages/SignUpPage';
import LogInPage from './Components/Pages/LogInPage';
import SettingsPage from './Components/Pages/SettingsPage';
import ProfilePage from './Components/Pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser) return (
    <div>
      <p>Loading..</p>
    </div>
  )

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
