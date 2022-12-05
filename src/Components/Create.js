import React from 'react';
import { Link } from "react-router-dom";
import Api from "../Servicios/api";

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            nombre:"",
            apellido:"",
            sexo:""
        }
    }

    cambioValor = (e) =>{
        const state = this.state;
        state[e.target.name]=e.target.value;
        this.setState({state});
    }

    enviarDatos = (e) =>{
        e.preventDefault();
        console.log("formulario enviado");
        const{nombre, apellido, sexo} = this.state;
        console.log(nombre);
        console.log(apellido);
        console.log(sexo);

        var datosEnviar = {nombre: nombre, apellido: apellido, sexo: sexo}

        fetch(Api+'?insertar=1',{
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
    render() { 

        const{nombre, apellido, sexo} = this.state;

        return ( 
            <div className="card">
                <div className="card-header">
                    Creación del Paciente
                </div>
                <div className="card-body">
                    <form onSubmit={this.enviarDatos}>
                        <div className='form-group'>
                            <label>Nombre:</label>
                            <input type="text" className="form-control" id="nombre" onChange={this.cambioValor} value={nombre} name="nombre" placeholder="Nombre" ></input>
                            <small className='text-muted'>Escriba el nombre del paciente.</small>
                        </div>
                        <div className='form-group'>
                            <label>Apellido:</label>
                            <input type="text" className="form-control" id="apellido" onChange={this.cambioValor} value={apellido} name="apellido" placeholder="Apellido" ></input>
                            <small className='text-muted'>Escriba el apellido del paciente.</small>
                        </div>
                        <div className='form-group'>
                            <label>Sexo:</label>
                            <input type="text" className="form-control" id="sexo" onChange={this.cambioValor} value={sexo} name="sexo" placeholder="Sexo" ></input>
                            <small className='text-muted'>Escriba el sexo del paciente.</small>
                        </div>
                        <div className='btn-group'>
                            <button type='submit' className='btn btn-success m-1'>Agrega un nuevo paciente</button>
                            <Link to={'/'} className='btn btn-danger m-1'>Cancelar</Link>
                        </div>
                    </form>
                </div>
            </div>
         );
    }
}
 
export default Create;