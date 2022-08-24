import React, {useEffect, useState} from 'react'
import { Table} from 'react-super-responsive-table';
import axios from "axios";
import Cookies from 'universal-cookie';
import Animaciones from '../../../Componentes/Animaciones';

//Componentes
import "../css/Proyectos.css";
import {CrudProyectos} from '../Routes/CRUDProyectos';
import { EditProyecto } from '../Routes/ModificarProyectos';
import {url, url2} from "../../../Componentes/Ocultar";
/* import { actualizarListaProy } from '../Routes/CRUDProyectos'; */
const cookies = new Cookies();
//Obtención del rol del usuario con sesión activa
let validatorrol = cookies.get('rol');
//Obtención del id del usuario con sesión activa
let validatorid = cookies.get('id_usuario');


//Obtener URL 
var URLactual = window.location.href;



function Proyectos(props) {

    /*========================== Mostrar/Ocultar ==========================*/
    //Condicionales para almacenar datos
    const [show,setShow] = useState(true);//Lista de proyectos del usuario activo
    const [show1,setShow1] = useState(true);//Lista de proyectos en los que colabora el usuario activo






    const [show2,setShow2] = useState(true);//Tabla de proyectos
    /*=====================================================================*/

    /*======================================== Buscador de proyectos ========================================*/
    // Almacenamiento de todos los proyectos existentes
    const[listaProyectos, setListaProyectos] = useState([]);
    
    //Almacenamiento de los proyectos semejantes a la clave introducido
    const [suggestions, setSuggestions] = useState([]);
    // Almacenamiento de la clave introducida del proyecto
    const[claveP,setClaveP] = useState([]);

    // Almacenamiento de los clientes existentes
    const [ListaC, setListaC] = useState ([]);

    // Función que realiza la consulta a la tabla proyecto
    const getProyectos = async () => {
        try{
            if(validatorrol === "direccion"){
                const resProy = await axios.get(url +'/api/cotizador/proyecto/viewadmin');
                setListaProyectos(resProy.data.data);
                setSuggestions(resProy.data.data);
            }else{
                if(props.continue === "mis-proyectos"  ){
                    const resProy = await axios.get(url2 + `/api/cotizador/proyecto/viewpreventas/${validatorid}`);
                    setListaProyectos(resProy.data.data);
                    setSuggestions(resProy.data.data);
                  }else if(props.continue=== "compartidos" ){
                    const resProy = await axios.get(url2 + `/api/cotizador/colaboradores/viewProyectos/${validatorid}`);
                    setListaProyectos(resProy.data.data);
                    setSuggestions(resProy.data.data);
                  }
            }
            const resC = await axios.get(url + "/api/cotizador/clientes/view");
            setListaC(resC.data.reSql);
        }catch(error){console.log(error);}
    }

    useEffect(()=>{
        getProyectos();
    },[show,show1])

    useEffect(()=>{
        if(claveP === ''){
            setSuggestions(listaProyectos)
        }
    },[claveP])
    
    // Función que realiza la busqueda de los proyectos semejantes a la clave introducida 
    const onChangeTextClaveP = (claveP) => {
        let coincidencias = [];
        if(claveP.length>0){
            coincidencias = listaProyectos.filter(proyecto => {
            const regex = new RegExp(`${claveP}`, "gi");
            return proyecto.proyecto_clave.match(regex)
            })
        }
        setSuggestions(coincidencias);
        //console.log('Suggestions:',suggestions);
        setClaveP(claveP);
    }
    /*=======================================================================================================*/

    /*=================================== Edición de los datos de un proyecto ===================================*/
    const [first, setfirst] = useState(false);
    
    const {actualizacionProy} = EditProyecto();

    const envioDataProy =  (cliente, dataCliente, data, key, newdata) => {
        if(first){
            actualizacionProy(cliente[key],dataCliente,data[key],newdata);
        } 
    }
    /*===========================================================================================================*/

    /*===========================================================================================================*/
    return (
        <div className="contenido-marvilop">

<Animaciones mytext="Resumen Proyectos " />


            
            
            <div className = "buscador-inteligente">

 
<form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" 
                    type="search" 
                    placeholder="Buscar por Clave 🔎" 
                    aria-label="Search"
                    name="proyecto_clave"
                    onChange={e => onChangeTextClaveP(e.target.value)}
                    value={claveP}
                    
                    />

                </form>

     


        </div>

                   
                    <CrudProyectos
                        suggestionsP={suggestions}
                        clientes={ListaC}
                        setfirst={setfirst}
                        envioDataP={envioDataProy}
                        show2={show2}
                        setShow2={setShow2}
                    />    
           
                   </div>
            
     
    );
}
export default Proyectos