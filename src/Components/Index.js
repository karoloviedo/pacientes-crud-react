import React from 'react';
import { Link } from "react-router-dom";
import Api from "../Servicios/api";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            pacientes: []
        }
    }

    borrarRegistros = (id) =>{
        fetch(Api+'?borrar='+id)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            this.cargarDatos();
        })
        .catch(console.log)
    }

    cargarDatos(){
        fetch(Api)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            this.setState({datosCargados: true, pacientes: datosRespuesta})
        })
        .catch(console.log)
    }

    componentDidMount(){
        this.cargarDatos();
    }
    render() { 
        const {datosCargados, pacientes}=this.state
        if(!datosCargados){
            return(<div>
                Cargando...
            </div>);
        }
        else{
        return ( 
            <div className="card">
                <div className="card-header">
                <Link to={"/create"} className='btn btn-success m-2'>Agrega un nuevo Paciente</Link>
                </div>
                <div className="card-body">
                    <div className="container">
                        <div className="mb-4">
                            <h4>Lista de Pacientes</h4>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover" id="nuestratabla">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Sexo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pacientes.map(
                                           (pacientes) =>(
                                            <tr key={pacientes.id}>
                                                <td>{pacientes.id}</td>
                                                <td>{pacientes.nombre}</td>
                                                <td>{pacientes.apellido}</td>
                                                <td>{pacientes.sexo}</td>
                                                <td>
                                                    <div className='btn-group' role="group" aria-label="">
                                                        <Link to={"/edit/"+pacientes.id} className='btn btn-success m-2'>Editar</Link>
                                                        <button type='button' className='btn btn-danger m-2' onClick={()=>this.borrarRegistros(pacientes.id)}>Eliminar</button>
                                                    </div>
                                                </td>
                                            </tr>
                                           )
                                        )  
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
       
         );
        }
    }
}
 
export default Index;