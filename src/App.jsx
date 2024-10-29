import './App.css'
import React, { Suspense, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route , NavLink} from 'react-router-dom'


const Home = React.lazy( ()=> import('./components/Home'))
const FakultasList = React.lazy( ()=> import('./components/fakultas/List'))
const ProdiList = React.lazy( ()=> import('./components/prodi/List'))
const FakultasCreate = React.lazy( ()=> import('./components/fakultas/Create'))
const FakultasEdit = React.lazy( ()=> import('./components/fakultas/Edit'))
const ProdiCreate = React.lazy( ()=> import('./components/prodi/Create'))
const ProdiEdit = React.lazy( ()=> import('./components/prodi/Edit'))
const LoginPage = React.lazy( ()=> import('./components/Auth/login'))
const RegisterPage = React.lazy( ()=> import('./components/Auth/register'))
const ProtectedRoute = React.lazy( ()=> import('./components/Auth/ProtectedRoute'))
const LogoutPage = React.lazy( ()=> import('./components/Auth/Logout'))
function App() { 
  
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  // Sync state with localStorage (in case token changes outside of the app)
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken !== token) {
      setToken(savedToken);
    }
  }, [token]);
  return (
    <>
        <Router>
          { 
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">Navbar</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink className={({isActive}) => `nav-link ${isActive ? "active" : ""}`} to={"/fakultas"} aria-current="page">Fakultas</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={({isActive}) => `nav-link ${isActive ? "active" : ""}`} to={"/prodi"} aria-current="page">Prodi</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={({isActive}) => `nav-link ${isActive ? "active" : ""}`} to={"/"} aria-current="page">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    {token ? (
                      <NavLink className='nav-link' to={"/logout"} aria-current="page">Logout</NavLink>
                    ) : (
                      <NavLink className='nav-link' to={"/login"} aria-current="page">Login</NavLink>
                    )

                    }
                  </li>

                </ul>
              </div>
            </div>
          </nav>
          }
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<LoginPage setToken={setToken} />} />
              <Route exact path="/register" element={<RegisterPage />} />
              <Route exact path="/logout" element={<LogoutPage setToken={setToken} />} />
              <Route exact path="/register" element={ <ProtectedRoute> <RegisterPage /> </ProtectedRoute>} />
                <Route exact path="/fakultas" element={<ProtectedRoute> <FakultasList /> </ProtectedRoute>} />
                <Route exact path="/prodi" element={<ProtectedRoute> <ProdiList /> </ProtectedRoute>} />
                <Route exact path="/prodi/create" element={<ProtectedRoute> <ProdiCreate /> </ProtectedRoute>} />
                <Route exact path="/fakultas/create" element={<ProtectedRoute> <FakultasCreate /> </ProtectedRoute>} />
                <Route exact path="/fakultas/edit/:id" element={<ProtectedRoute> <FakultasEdit /> </ProtectedRoute>} />
                <Route exact path="/prodi/edit/:id" element={<ProtectedRoute> <ProdiEdit /> </ProtectedRoute>} />
            </Routes>
          </Suspense>
        </Router>
    </>
  )
}

export default App
