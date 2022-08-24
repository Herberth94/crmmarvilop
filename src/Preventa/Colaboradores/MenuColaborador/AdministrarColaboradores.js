import React, { useState,useEffect } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
//Componentes
import Animaciones from "../../../Componentes/Animaciones";
import {url,url2} from "../../../Componentes/Ocultar";
import { CrudColaboradores } from "../Routes/CRUDColaboradores";

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';





const cookies = new Cookies();
//Obtención del rol del usuario con sesión activa
let validatorrol = cookies.get('rol');
//Obtención del id del usuario con sesión activa
let validatorid = cookies.get('id_usuario');


function AdministrarColaboradores(props) {
  /*========================== Mostrar/Ocultar ==========================*/
  const [show2,setShow2] = useState(true);//Tabla colaboradores
  const [textBVer,setTextBVer] = useState([]);//Texto de los botones
  /*=====================================================================*/

  /*========================== Activar/Desactivar ==========================*/
  const [show,setShow] = useState([]);//Botones que muestran los colaboradores
  /*========================================================================*/

  /*======================================== Buscador de proyectos ========================================*/
  //Almacenamiento de todos los proyectos existentes
  const[listaProyectos, setListaProyectos] = useState([]);

  //Almacenamiento de los proyectos semejantes a la clave introducido
  const [suggestions, setSuggestions] = useState([]);
  
  // Almacenamiento de la clave introducida del proyecto 
  const[claveP,setClaveP] = useState([]);

  // Función que realiza la consulta a la tabla proyectos 
  const getProyectos = async () => {
    try{
      if(validatorrol === "direccion"){
        const resProy = await axios.get(url + '/api/cotizador/proyecto/viewadmin');
        setListaProyectos(resProy.data.data);
        setSuggestions(resProy.data.data);
    }else{
          const resProy = await axios.get(url2 + `/api/cotizador/proyecto/viewpreventas/${validatorid}`);
          setListaProyectos(resProy.data.data);
          setSuggestions(resProy.data.data);
    }
    }catch(error){console.log(error);}
  }

  useEffect(()=>{
      getProyectos();
  },[])
  
  useEffect(()=>{
    if(claveP === ''){
      setSuggestions(listaProyectos)
    }
  },[claveP])

  /*== Función que realiza la busqueda de los proyectos semejantes a la clave introducida ==*/
  const onChangeTextClaveP = (claveP) => {
      let coincidencias = [];
      if(claveP.length>0){
          coincidencias = listaProyectos.filter(proyecto => {
          const regex = new RegExp(`${claveP}`, "gi");
          return proyecto.proyecto_clave.match(regex)
          })
      }
      setSuggestions(coincidencias);
      setClaveP(claveP);
  }
  /*=======================================================================================================*/

  /*================================================== Colaboradores ==================================================*/
  //Almacenamiento de las marcas
  const [listaColabs, setListaColabs] = useState([]);
  //Función que consulta todas las marcas existentes
  const getColabs = async (pId) => {
      try {
          
            const resColabs =  await axios.get(url2 + `/api/cotizador/colaboradores/view/${pId}`);
            setListaColabs(resColabs.data.data);
          
          
      } catch(error){console.log(error)}
      console.log(listaColabs);
  }
  /*===================================================================================================================*/
  
  useEffect(() => {
    let i = Object.keys(listaProyectos)
    i = i.length
    setShow(Array(i).fill(true));
    setTextBVer(Array(i).fill('bi bi-eye'));
  },[listaProyectos])

  const habilitar2 = (key) =>{
    key = parseInt(key);
    const newArr =[];
    const newArr2 = [];
    const colores= [];
    let c = Object.keys(listaProyectos);
    setShow(Array(c).fill(true));
    setTextBVer(Array(c).fill('bi bi-eye'));
    // console.log('suggesKeys:',listaProyectos);
    // console.log('suggesKeys:',c);
    c = c.length;
    for (let i = 0 ; i < c ; i++){
        if(i === key){
            newArr[i] = !show[i];
            setShow2(newArr[i]);
            if(show[i] === false){
                newArr2[i] = 'bi bi-eye';
            }else{
                newArr2[i] = 'bi bi-eye-slash-fill';
            }
        }
        if(i !== key){
            newArr[i]=true;
            newArr2[i] = ' bi bi-eye ';
        }
        
    }   
    setShow(newArr);
    setTextBVer(newArr2);
}

  return (
    <div className="administracion">
   
      <Animaciones  mytext="Administrar Colaboradores "/>
      <div className="table-responsive">

 {/*        <div className = "buscador-inteligente">
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" 
                    type="search" 
                    placeholder="Buscar por Clave🔎" 
                    aria-label="Search"
                    name="proyecto_clave"
                    onChange={e => onChangeTextClaveP(e.target.value)}
                    value={claveP}
                    
                    />

                </form>
        </div> */}
        {/****************************Lista de los Proyectos Creados ****************************************/}
        {/*============= Titulo Animación =============*/}
     
        <Table    id = "daTable"  >
            <Thead>

   {/*             <tr className="titulo-tabla-usuarios">
                <th></th>
           
                <th className="titulo-tabla">{props.estado ? "Colaboradores Ventas" : "Colaboradores Preventa"}</th>
              </tr> */}
              <Tr >
                <Th>ID</Th>
                <Th>Clave</Th>
                <Th>Descripción</Th>
                <Th>Cliente</Th>
                <Th>Fecha  Creación</Th>
                <Th>Fecha  Modificación</Th>
                <Th>Estatus</Th>
                <Th>Plazo meses</Th>
                <Th>{props.estado ? "Colaboradores Ventas" : "Colaboradores Preventa"}</Th>
              </Tr>
            </Thead>
                                
            <Tbody>
            {Object.keys(suggestions).map((key) => (    
                <Tr key={suggestions[key].proyecto_id} >
                    <Td>{suggestions[key].proyecto_id}</Td>   
                    <Td>{suggestions[key].proyecto_clave}</Td>  
                    <Td>{suggestions[key].proyecto_descripcion}</Td>  
                    <Td>{suggestions[key].nombre_cliente}</Td> 
                    <Td >{suggestions[key].proyecto_fecha_creacion}</Td>
                    <Td >{suggestions[key].proyecto_fecha_modificacion}</Td>
                    <Td  className= {suggestions[key].proyecto_estatus } >{suggestions[key].proyecto_estatus}</Td>  
                    <Td  >{suggestions[key].proyecto_plazo_meses}</Td> 
                    <Td>
                      <button 
                        className="sn-boton" 
                        type="button" 
                        onClick={() => {
                          habilitar2(key);
                          getColabs(suggestions[key].proyecto_id);
                        }}
                        > 
                         
                          <i className= {textBVer[key]} ></i>
                        </button>
                    </Td>
                </Tr>  
            ))}
            </Tbody>          
        </Table>
        <div>
          {show2 ? (
            <div>
              {/*=================== Ocultar Lista DIV  =========================*/}
            </div>
          ) : (
            <div>
            {/*=================== Botón Mostrar Lista DIV =====================*/}
            <br />
            <CrudColaboradores
                colabs={listaColabs}
                estado={props.estado}
                //envioData={envioData}
                //setfirst={setfirst}
            />
        </div>  
          )}
        </div>
      </div>
    </div>
  );
}

export default AdministrarColaboradores;