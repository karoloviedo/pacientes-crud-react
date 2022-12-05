import { useParams } from "react-router-dom";

const SinglePacientes = () =>{

    const { id } = useParams();

    return(
        {id}
    );

};

export default SinglePacientes;