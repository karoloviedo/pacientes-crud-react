<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "pacientes_bd";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);


// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["consultar"])){
    $sqlPacientes = mysqli_query($conexionBD,"SELECT * FROM pacientes WHERE id=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlPacientes) > 0){
        $pacientees = mysqli_fetch_all($sqlPacientes,MYSQLI_ASSOC);
        echo json_encode($pacientees);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqlPacientes = mysqli_query($conexionBD,"DELETE FROM pacientes WHERE id=".$_GET["borrar"]);
    if($sqlPacientes){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recepciona en método post los datos 
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $nombre=$data->nombre;
    $apellido=$data->apellido;
    $sexo=$data->sexo;
        if(($apellido!="")&&($nombre!="")&&($sexo!="")){
            
    $sqlPacientes = mysqli_query($conexionBD,"INSERT INTO pacientes(nombre,apellido,sexo) VALUES('$nombre','$apellido','$sexo') ");
    echo json_encode(["success"=>1]);
        }
    exit();
}
// Actualiza datos pero recepciona datos y una clave para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $id=(isset($data->id))?$data->id:$_GET["actualizar"];
    $nombre=$data->nombre;
    $apellido=$data->apellido;
    $sexo=$data->sexo;
    $sqlPacientes = mysqli_query($conexionBD,"UPDATE pacientes SET nombre='$nombre',apellido='$apellido',sexo='$sexo' WHERE id='$id'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla pacientes
$sqlPacientes = mysqli_query($conexionBD,"SELECT * FROM pacientes ");
if(mysqli_num_rows($sqlPacientes) > 0){
    $pacientees = mysqli_fetch_all($sqlPacientes,MYSQLI_ASSOC);
    echo json_encode($pacientees);
}
else{ echo json_encode([["success"=>0]]); }


?>