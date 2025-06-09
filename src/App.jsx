import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from 'react-router-dom';

import './styles/App.css'
import Footer from './elements/footer'
import Home from './pages/Home'
import TopBar from './elements/topbar'
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import PDP from './pages/PDP';
import ReactGA from 'react-ga4'
ReactGA.initialize('G-KYK7FZDPK7')

function usePageview() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname})
  }, [location])
}
function PageRouterWraper() {
  usePageview()
  return null;
}

function App() {
  return (
    <Router>
      <PageRouterWraper />
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
