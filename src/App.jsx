import { Outlet } from 'react-router-dom'
import useAdmin from './hooks/useAdmin.js'
import Header from './components/layout/Header.jsx'
import Nav from './components/layout/Nav.jsx'
import Footer from './components/layout/Footer.jsx'
import './css/App.css'

const App = () => {
  const { admin } = useAdmin();

  return (
    <>
      {admin && (
        <div className="topbar-cyber">
          <Nav />
          <Header />
        </div>
      )}
      <Outlet />
      {admin && <Footer />}
    </>
  )
}

export default App
