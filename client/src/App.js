import React from 'react';
import NavBar from './Components/NavBar';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<>this is home page</>} />
      </Routes>
    </div>
  );
}

export default App;
