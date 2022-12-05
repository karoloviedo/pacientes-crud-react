import React from 'react';
import Index from './Components/Index';
import Create from './Components/Create';
import Edit from './Components/Edit';
// import SinglePacientes from './Components/SinglePacientes';
import {  BrowserRouter as Router,  Route,  Routes, Link, useParams} from "react-router-dom";

function App() {
  const { id } = useParams();
  return (  
    <Router>
      <div> {id} </div>
      <nav className="navbar navbar-expand navbar-light bg-light"> 
        <div className="nav navbar-nav">
          <Link to={"/"} className="btn btn-primary float-right m-1">Listado </Link>
          <Link to={"/create"} className="btn btn-primary float-right m-1">Crear Paciente</Link>
          <Link to={"/edit/:id"} className="btn btn-primary float-right m-1">Editar Paciente</Link>
        </div>
      </nav>
      <div className="container">
      <br></br>
        <Routes>
          <Route path='/' element={<Index></Index>}> </Route>
          <Route path='/create' element={<Create></Create>}> </Route>
          <Route path='/edit/:id' element={<Edit></Edit>}> </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
