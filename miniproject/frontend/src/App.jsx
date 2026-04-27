import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BrowseItems from './pages/BrowseItems';
import AddItem from './pages/AddItem';
import MyItems from './pages/MyItems';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';

// Simple Toast context to avoid installing react-toastify for speed
// eslint-disable-next-line react-refresh/only-export-components
export const ToastContext = React.createContext();

function App() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter(t => t.id !== id));
    }, 3000);
  };

  return (
    <ThemeProvider>
      <ToastContext.Provider value={{ addToast }}>
        <Router>
          <div className="page-wrapper">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<BrowseItems />} />
                <Route path="/add" element={<AddItem />} />
                <Route path="/my-items" element={<MyItems />} />
              </Routes>
            </main>
            <Footer />

            <div className="toast-container">
              {toasts.map(t => (
                <div key={t.id} className="toast">
                  <span>✨</span> {t.message}
                </div>
              ))}
            </div>
          </div>
        </Router>
      </ToastContext.Provider>
    </ThemeProvider>
  );
}

export default App;
