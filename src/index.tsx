import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  HashRouter,
  Routes,
  Route
}
  from 'react-router-dom';
import './styles/styles.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Navbar />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<Home />} />
        <Route path="/maps" element={<Home />} />
        <Route path="/documents" element={<Home />} />
      </Routes >
    </HashRouter>
  </React.StrictMode>
);