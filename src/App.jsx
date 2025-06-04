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

function App() {
  return (
    <Router>
        <div className='App'>
          <TopBar />
          <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          </main>
          <Footer />
        </div>
       </Router>
  )
}

export default App
