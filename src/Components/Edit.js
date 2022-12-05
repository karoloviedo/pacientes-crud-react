import React from 'react';
import { Link } from "react-router-dom";
import Api from "../Servicios/api";


class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            datosCargados: false, 
            paciente: []
        }
    } 

    cambioValor = (e) =>{
        const state = this.state.empleado;
        state[e.target.name]=e.target.value;
        this.setState({empleado: state});
    }
    
    enviarDatos = (e) =>{
        e.preventDefault();
        console.log("formulario enviado");
        const{ id, nombre, apellido, sexo} = this.state.empleado;
        console.log(nombre);
        console.log(apellido);
        console.log(sexo);

        var datosEnviar = {id: id, nombre: nombre, apellido: apellido, sexo: sexo}

        fetch(Api+'?actualizar=1',{
            method:'POST',
            body:JSON.stringify(datosEnviar)
        })
        
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            this.props.history.push('/');
        })
        .catch(console.log)
    }

    componentDidMount(){
        // console.log(this.match.params.id);
        // const id = this.props.params.id;
        // console.log("id:",id);
        // console.log(this.routeParams);
        //aqui consume los datos para editar 
        // fetch(Api+'?consultar='+this.match.params.id)
        fetch(Api+'?consultar=')
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            this.setState({datosCargados: true, paciente: datosRespuesta[0]})
        })
        .catch(console.log)
    }
    
    render() { 
        const {datosCargados, paciente}=this.state
        if(!datosCargados){
            return(<div>
                Cargando...
            </div>);
        }
        else{

        return (             
            <div className="card">
                <div className="card-header">
                   Edición del Paciente
                </div>
                <div className="card-body">
                    <div className="card-body">
                        <form onSubmit={this.enviarDatos}>
                            <div className='form-group'>
                                <label>Clave:</label>
                                <input type="text" readOnly className="form-control" id="id" onChange={this.cambioValor} value={paciente.id} name="id" placeholder="Id" ></input>
                            </div>
                            <div className='form-group'>
                                <label>Nombre:</label>
                                <input type="text" className="form-control" id="nombre" onChange={this.cambioValor} value={paciente.nombre} name="nombre" placeholder="Nombre" ></input>
                                <small className='text-muted'>Escriba el nombre del paciente.</small>
                            </div>
                            <div className='form-group'>
                                <label>Apellido:</label>
                                <input type="text" className="form-control" id="apellido" onChange={this.cambioValor} value={paciente.apellido} name="apellido" placeholder="Apellido" ></input>
                                <small className='text-muted'>Escriba el apellido del paciente.</small>
                            </div>
                            <div className='form-group'>
                                <label>Sexo:</label>
                                <input type="text" className="form-control" id="sexo" onChange={this.cambioValor} value={paciente.sexo} name="sexo" placeholder="Sexo" ></input>
                                <small className='text-muted'>Escriba el sexo del paciente.</small>
                            </div>
                            <div className='btn-group'>
                                <button type='submit' className='btn btn-success m-1'>Actualizar paciente</button>
                                <Link to={'/'} className='btn btn-danger m-1'>Cancelar</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
         );
        }
    }
}

 
export default Edit;