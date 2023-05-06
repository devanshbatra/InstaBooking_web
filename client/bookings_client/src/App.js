import React from 'react';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Hotel from './pages/hotel/Hotel';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import theme from './theme';
const App = () => {

  return (
    <ThemeProvider theme={theme} >
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/hotels" element={<List/>} />
          <Route path="/hotels/:id" element={<Hotel/>} />
        </Routes>
      </BrowserRouter >
    </ThemeProvider>
  );
}

export default App;
