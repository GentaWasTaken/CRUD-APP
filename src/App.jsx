import './App.css'
import React, {Suspense} from 'react'
import { BrowserRouter as Router, Routes, Route , NavLink} from 'react-router-dom'


const Home = React.lazy( ()=> import('./components/Home'))
const FakultasList = React.lazy( ()=> import('./components/fakultas/List'))
const ProdiList = React.lazy( ()=> import('./components/prodi/List'))
const FakultasCreate = React.lazy( ()=> import('./components/fakultas/Create'))
const FakultasEdit = React.lazy( ()=> import('./components/fakultas/Edit'))
const ProdiCreate = React.lazy( ()=> import('./components/prodi/Create'))
const ProdiEdit = React.lazy( ()=> import('./components/prodi/Edit'))
function App() {

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
                </ul>
              </div>
            </div>
          </nav>
          }
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/fakultas" element={<FakultasList />} />
              <Route exact path="/prodi" element={<ProdiList />} />
              <Route exact path="/prodi/create" element={<ProdiCreate />} />
              <Route exact path="/fakultas/create" element={<FakultasCreate />} />
              <Route exact path="/fakultas/edit/:id" element={<FakultasEdit />} />
              <Route exact path="/prodi/edit/:id" element={<ProdiEdit />} />
            </Routes>
          </Suspense>
        </Router>
    </>
  )
}

export default App
