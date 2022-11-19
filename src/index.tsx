import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/home/Home';
import Navbar from './components/Navbar';
import {
  HashRouter,
  Routes,
  Route,
  useLocation
}
  from 'react-router-dom';
import './styles/styles.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/**
 * Scrolls the user back to the top of the window each time after routing to another page.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

root.render(
  <React.StrictMode>
    <HashRouter>
      <ScrollToTop />
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