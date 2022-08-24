import React, {useEffect, useState} from 'react'
import axios from "axios";
import Cookies from 'universal-cookie';
import Animaciones from '../Animaciones';
import { Icon } from '@iconify/react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

//Componentes
import "../../Preventa/PTN-BOM/css/Proyectos.css"; 
import { LP } from './ListaProyectos';
import {url, url2} from "../Ocultar";
/* import { actualizarListaProy } from '../Routes/CRUDProyectos'; */
const cookies = new Cookies();
//Obtención del rol del usuario con sesión activa
let validatorrol = cookies.get('rol');
//Obtención del id del usuario con sesión activa
let validatorid = cookies.get('id_usuario');


var color = "false";
var color2 = "false";

function ContinuarPCE() {

    /*========================== Mostrar/Ocultar ==========================*/
    //Condicionales para almacenar datos
    const [show,setShow] = useState(true);//Lista de proyectos del usuario activo
    const [show1,setShow1] = useState(true);//Lista de proyectos en los que colabora el usuario activo

    const [show2,setShow2] = useState(true);//Tabla de proyectos
    /*=====================================================================*/


    function checarColor (){
        if(show  ===true){
            color ="true"
                }else{
                    color ="false"
                }    
          
      }
    
    
      function checarColor2 (){
        if(show1 ===true){
            color2 ="true"
                }else{
                    color2 ="false"
                }    
      }
    
    

    /*======================================== Buscador de proyectos ========================================*/
    // Almacenamiento de todos los proyectos existentes
    const[listaProyectos, setListaProyectos] = useState([]);
    
    //Almacenamiento de los proyectos semejantes a la clave introducido
    const [suggestions, setSuggestions] = useState([]);
    // Almacenamiento de la clave introducida del proyecto
    const[claveP,setClaveP] = useState([]);

    // Función que realiza la consulta a la tabla proyecto
    const getProyectos = async () => {
        try{
            if(validatorrol === "direccion"){
                const resProy = await axios.get(url +'/api/cotizador/proyecto/viewadmin');
                setListaProyectos(resProy.data.data);
                setSuggestions(resProy.data.data);
            }else{
                if(show === false){
                    const resProy = await axios.get(url2 + `/api/cotizador/proyecto/viewpreventas/${validatorid}`);
                    setListaProyectos(resProy.data.data);
                    setSuggestions(resProy.data.data);
                  }else if(show1 === false){
                    const resProy = await axios.get(url2 + `/api/cotizador/colaboradores/viewProyectos/${validatorid}`);
                    setListaProyectos(resProy.data.data);
                    setSuggestions(resProy.data.data);
                  }
            }
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


    /*===========================================================================================================*/
    return (
        <div className="">

{/* <Animaciones mytext="Resumen Proyectos " />

 */}
            
            
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
            <Table >
                {/*========================== Titulos Tabla ==========================*/}
                <thead>
                    <tr className="titulo-tabla-usuarios">
                        <th className='ocultar'>Mis Proyectos</th>
                        <th className='ocultar'>Proyectos en Colaboración</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="">
                        {/*========================== Divisa ==========================*/}
                        <td className={color} onChange={checarColor()}>
                            <button
                            className="icon"
                            type="button"
                            onClick={() => {
                            setShow(!show);
                            setShow1(true);
                            show ? setShow2(false):setShow2(true);


                            }}
                            >
                                Mis proyectos
                            {" "}
{/*                             {show ? "Mis Proyectos n " : "Ocultar"}{" "}
 */}
                            {show ?<Icon icon="bi:person-lines-fill"  width={"20px"}  color={"gray"}  />: <Icon icon="bi:person-lines-fill" width={"20px"}  color={"green"}  />   }{" "}


                            
                            </button>
                        </td>


                        <td  className={color2}  onChange={checarColor2 ()}>
                            <button
                            className="icon"
                            type="button"
                            onClick={() => {
                            setShow1(!show1);
                            setShow(true);
                            show1 ? setShow2(false):setShow2(true);
                            }}
                            >
                                Proyectos Compartidos
                            {" "}
                            {show1 ?<Icon icon="fluent:people-team-24-filled"  width={"20px"}  color={"gray"}  />: <Icon icon="fluent:people-team-24-filled" width={"20px"}  color={"green"}   />   }{" "}

                            </button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            {show2 ? (
                <div></div>
            ):(
                <div className="">
                {/*============= Titulo Animación =============*/}
              {/*   <Animaciones mytext="Buscar proyectos" />
 */}
                {/*********Búsqueda de Lista de Proyectos por Clave ********/}


                <>
                    {/*=================== Botón Mostrar Lista DIV =====================*/}
                    <br />
                    <Animaciones mytext="Resumen Proyectos " />
                    <LP
                        suggestionsP={suggestions}
                    />    
                        <br />
                        <br />
                        <br />
                </>
            </div>
            )}
        </div>
    );
}
export default ContinuarPCE;