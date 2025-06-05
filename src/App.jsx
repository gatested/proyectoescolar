import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import './styles/App.css'
import Footer from './elements/footer.jsx'
import Home from './pages/Home.jsx'
import TopBar from './elements/topbar.jsx'
import AboutUs from './pages/AboutUs.js';

function App() {
  return (
    <Router>
        <div className='App'>
          <TopBar />
          <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Products" element={<h1>Productos</h1>} />
            <Route path="/About-us" element={<AboutUs />} />
          </Routes>
          </main>
          <Footer />
        </div>
       </Router>
  )
}

export default App
