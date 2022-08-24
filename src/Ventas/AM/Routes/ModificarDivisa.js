import axios from 'axios';
import {url2} from "../../../Componentes/Ocultar";
import { hoy } from '../../../Preventa/PTN-BOM/Menu-Bom/NuevoProyecto';

export const EditDivisa = () => {

    const actualizacionDivisa = (data,newdata)=>{
        SendUpdatePrecio(data,data.proyecto_id, newdata)      
    }

    async function SendUpdatePrecio (data, proyecto_id, newdata){
        
        const dataActualizacion = {
            proyecto_valor_dolar: data.proyecto_valor_dolar,
            proyecto_id_moneda:data.proyecto_id_moneda
        };

        const dataFM = {
            proyecto_fecha_modificacion:hoy
        }

        const k = Object.keys(newdata);
        for(let keys of k){
            if(newdata[keys] !== ''){
                dataActualizacion[keys] = newdata[keys];
            }
            
        }
        if(data.proyecto_estatus === 'Aceptado'){
            alert('No se puede modificar este Proyecto, se encuentra en Estatus: Aceptado')
        }else{
            try {
                // console.log(dataActualizacion);
                // console.log(proyecto_id);
                await axios.put(url2 +`/api/cotizador/proyecto/updateFM/${proyecto_id}`, dataFM);
                const respuesta = await axios.put(url2 + `/api/cotizador/proyecto/updateDiv/${proyecto_id}`,dataActualizacion);
                const send2= respuesta.data.msg;
                alert(send2);
                } catch (error) {
                    console.log(error);
                    alert('Edición de Divisa invalido');
                }
        }
        
    }
    return {
        actualizacionDivisa
    }
};


    