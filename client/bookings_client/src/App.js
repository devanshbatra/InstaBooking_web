import React from 'react';
import Home from './pages/Home';
import List from './pages/List';
import Hotel from './pages/Hotel';
import Login from './pages/Login';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import theme from './theme';
import Register from './pages/Register';
const App = () => {

  return (
    <ThemeProvider theme={theme} >
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/hotels" element={<List/>} />
          <Route path="/hotels/:id" element={<Hotel/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter >
    </ThemeProvider>
  );
}

export default App;
