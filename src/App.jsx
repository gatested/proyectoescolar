import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import './styles/App.css'
import Footer from './elements/footer.jsx'
import Home from './pages/Home.jsx'
import TopBar from './elements/topbar.jsx'
import AboutUs from './pages/AboutUs.jsx';
import Products from './pages/Products.jsx';
import PDP from './pages/PDP.jsx';

function App() {
  return (
    <Router>
        <div className='App'>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <TopBar />
            <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/About-us" element={<AboutUs />} />
              <Route path="/Product/:id" element={<PDP />} />
              <Route path="*" element={
                <div style={{marginTop: "100px", textAlign: "center"}}>
                  <h1>404</h1>
                  <h2>¡Lo sentimos!</h2>
                  <p>La página que buscas no existe</p>
                  <Link to="/">Volver a la página principal</Link>
                </div>
                } />
            </Routes>
            </main>
            <Footer />
          </SkeletonTheme>
        </div>
       </Router>
  )
}

export default App
