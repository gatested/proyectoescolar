import { useLocation, Navigate } from 'react-router-dom'
import ProfilePage from './Profile'
import { Link } from 'react-router-dom'

function CatchAllRoute() {
  const location = useLocation()
  
  if (location.pathname.startsWith('/@')) {
    const username = location.pathname.replace('/@', '')
    return <ProfilePage username={username} />
  }

  // Si no es un perfil, muestra 404
  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h1>404</h1>
      <h2>¡Lo sentimos!</h2>
      <p>La página que buscas no existe</p>
      <Link to="/">Volver a la página principal</Link>
    </div>
  )
}

export default CatchAllRoute
