import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
import { url2 } from "../../../Componentes/Ocultar";
import { pEstatus1 } from "../Menu-Bom/ContinuarProyecto";
import { hoy } from "../Menu-Bom/NuevoProyecto";

//Obtención del id del usuario con sesión activa
const cookies = new Cookies();
let validatorid = cookies.get('id_usuario');

export let pId;
export let idPartidaInsertada;


export const InsertDatosPartida = () => {
    /*=================================== Inserción de datos en la tabla partida ===================================*/
    // Almacenamiento del último proyecto insertado
    var listaProyectos = {
        proyecto_id:'',
        proyecto_clave:'',
        proyecto_descripcion:'',
        proyecto_id_cliente:'',
        proyecto_fecha_creacion:'',
        proyecto_id_cat_c_a_sptn_ma:'',
        proyecto_fecha_modificacion:'',
        proyecto_estatus:''
    };

    // Almacenamiento del id del último proyecto insertado
    var proyectoId = {
        proyecto_id:''
    };

    // Almacenamiento de los datos de una partida a insertar
    const[datosPartida, setDatosPartida] = useState({
        partida_nombre: '',
        partida_descripcion: ''
    });

    // Función que obtiene los datos introducidos en los inputs de los datos de una partida y los guarda en el objeto de datosPartida
    const handleInputChangePartida = (event) =>{
        setDatosPartida({
            ...datosPartida,[event.target.name] : event.target.value ,
        })
    }

    function getIdP (proyecto_id){
        pId = proyecto_id;
        //console.log(pId);
    }

    function getIdPartidaInsertada(id){
        idPartidaInsertada = id;
    }
    // function getIdP1 (proyecto_id){
    //     pId1 = proyecto_id;
    // }
    // Función que realiza la inserción de los datos a la tabla partida en la bd 
    async function SendPartida (){
        const data = {
            partida_nombre: datosPartida.partida_nombre,
            partida_descripcion: datosPartida.partida_descripcion
        };

        const dataFM = {
            proyecto_fecha_modificacion:hoy
        }

        if(pEstatus1 === 'En revision'){
            alert('No se puede continuar el Proyecto porque se encuentra En revision')
        }else if(pEstatus1 === 'Aceptado'){
            alert('No se puede continuar el Proyecto porque ha sido Aceptado')
        }else{
            try{
                // Obtención del id del último proyecto insertado del usuario activo
                const resGetProyectos = await axios.get(url2 + `/api/cotizador/proyecto/viewpreventas/${validatorid}`);
                listaProyectos = resGetProyectos.data.data.pop();
                proyectoId.proyecto_id = listaProyectos.proyecto_id;

    
                if(pId !== proyectoId.proveedor_id && pId!== ''){
                    const respuesta = await axios.post(url2 +`/api/cotizador/partida/${pId}`, data);
                    getIdPartidaInsertada(respuesta.data.data.insertId);
                    //console.log('Id de la nueva partida agregada: ',idPartidaInsertada);
                    await axios.put(url2 +`/api/cotizador/proyecto/updateFM/${pId}`, dataFM);
                    //console.log(pId);
                    const respuestaBack = respuesta.data.msg;
                    alert(respuestaBack);
                    
                    
                }else{
                    const respuesta2 = await axios.post( url2 +`/api/cotizador/partida/${proyectoId.proyecto_id}`, data); 
                    await axios.put(url2 + `/api/cotizador/proyecto/updateFM/${proyectoId.proyecto_id}`, dataFM);
                    getIdPartidaInsertada(respuesta2.data.data.insertId);
                    //console.log('Id de la nueva partida agregada: ',idPartidaInsertada);
                    //console.log(proyectoId.proyecto_id);
                    const respuestaBack2 = respuesta2.data.msg;
                    alert(respuestaBack2);
                }
                
            }catch (error){
                console.log(error);
            }
        }
        
    }

    const enviarDatosPartida = (event) =>{
        //console.log(pId);
        SendPartida();
        event.preventDefault()
        event.target.reset();
    }
    /*==============================================================================================================*/

    return{
        handleInputChangePartida,
        enviarDatosPartida,
        getIdP,
        datosPartida
    }
};
