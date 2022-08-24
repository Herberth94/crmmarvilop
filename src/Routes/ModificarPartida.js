import axios from 'axios';
import {url2} from "../Componentes/Ocultar";
import { pEstatus,pId } from '../Preventa/PTN-BOM/Routes/CRUDProyectos';
import { hoy } from '../Preventa/PTN-BOM/Menu-Bom/NuevoProyecto';

export const EditPartida = () => {

    const actualizacionPar = (data,newdata)=>{
        SendUpdatePartida(data,data.partida_id,newdata)      
    }

    async function SendUpdatePartida (data,id,newdata){
        const dataActualizacion = {
            partida_nombre:data.partida_nombre, 
            partida_descripcion:data.partida_descripcion
        };

        const dataFM = {
            proyecto_fecha_modificacion:hoy
        }
        
        const k = Object.keys(newdata);
        for(let keys of k){
            if(newdata[keys]!==''){
                dataActualizacion[keys] = newdata[keys]
            }    
        } 
        

        if(pEstatus === 'En revision'){
            alert('El proyecto no puede ser editado porque se encuentra En revision')
        }else if(pEstatus === 'Aceptado'){
            alert('El proyecto no puede ser editado porque ha sido Aceptado')
        }else{
            try {
                await axios.put(url2 +`/api/cotizador/proyecto/updateFM/${pId}`, dataFM);
                const respuesta = await axios.put(url2 + `/api/cotizador/partida/update/${id}`,dataActualizacion);
                const respuestaBack = respuesta.data.msg
                alert(respuestaBack);
            }catch (error){
                alert('Edición de Partida invalido');
                console.log(error);
            }
        } 
    }
    return {
        actualizacionPar
    }
};


    