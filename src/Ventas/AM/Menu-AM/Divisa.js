import { computeHeadingLevel } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Cookies from 'universal-cookie';
import Animaciones from "../../../Componentes/Animaciones";
import {url, url2} from "../../../Componentes/Ocultar";
import { EditDivisa } from '../Routes/ModificarDivisa';
const cookies = new Cookies();
//Obtención del rol del usuario con sesión activa
let validatorrol = cookies.get('rol');
//Obtención del id del usuario con sesión activa
let validatorid = cookies.get('id_usuario');

export let proyEstatus;



function Divisa() {
    //Almacenamiento de todos los proyectos existentes 
    const[listaProyectos, setListaProyectos] = useState([]);
    
    //Almacenamiento de los proyectos semejantes a la clave introducido
    const [suggestions, setSuggestions] = useState([]);

    //Almacenamiento de la clave introducida del proyecto
    const[claveP,setClaveP] = useState([]);

    function getEstatus (estatus){
        proyEstatus = estatus;
    }

    const getProyectos = async () => {
        try{
            if(validatorrol === "direccion"){
                const resProy = await axios.get(url + '/api/cotizador/proyecto/viewadmin');
                setListaProyectos(resProy.data.data);
                setSuggestions(resProy.data.data);
                //console.log(resProy.data.data);
            }else{
                const resProy = await axios.get(url2 + `/api/cotizador/proyecto/viewpreventas/${validatorid}`);
                setListaProyectos(resProy.data.data);
                setSuggestions(resProy.data.data);
                //console.log(resProy.data.data);
            }
        }catch(error){
            console.log(error);
        }
    }
    
    useEffect(()=>{
        getProyectos();
    },[])

    useEffect(()=>{
        if(claveP === ''){
            setSuggestions(listaProyectos);
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

    const {actualizacionDivisa} = EditDivisa();

    const [firts, setFirts] = useState (false);

    function EnviarDivisa(data, key, newdata){
        if(firts){
            // console.log('Old Data:',data[key]);
            // console.log('New Data:',newdata);
            actualizacionDivisa(data[key],newdata);
        }
    }
    /*================================================== Divisa ==================================================*/
        /*========================= Editar =========================*/
        const [activar, setActivar] = useState([]);
        const [textBModificar,setTextBModificar] = useState([]);//Texto de los botones de modificar
        
        const [data,setData] = useState ({
            proyecto_valor_dolar:'',
            proyecto_id_moneda:''
        });

        const handleInputChange = (event) => {
            setData ({
            ...data,[event.target.name] : event.target.value ,
            })
            console.log(data);
        }

        const [enable, setenable] = useState([]);
        const [datos, Setdatos] = useState();
        
        useEffect(() => {
            Setdatos(suggestions); 
        },[suggestions]);


        useEffect(() => {
            let i = Object.keys(suggestions)
            i = i.length
            //console.log(i)
            setActivar(Array(i).fill(true));
            setTextBModificar(Array(i).fill('bi bi-pencil-square'));
            setenable(Array(i).fill(true)); 
        },[suggestions])

        
        const habilitar = (key) =>{
            key = parseInt(key);
            const newArr =[] 
            const newArr2 = [];
            const newArr3 = [];
            let p = Object.keys(suggestions);
            p = p.length;
            for (let i = 0 ; i < p ; i++){
                if(i === key){
                    newArr[i] = !enable[i];
                    if(enable[i] === false){
                        newArr2[i] = 'bi bi-pencil-square';
                        setData({
                            ...data,proyecto_valor_dolar:'',
                                    proyecto_id_moneda:''
                        })
                    }else{
                        setData({
                                proyecto_id_moneda:suggestions[key].proyecto_id_moneda
                        })
                        newArr2[i] = 'bi bi-check-lg';
                    }
                    newArr3[i] = !activar[i];
                }
                if(i !== key){
                    newArr[i]=true;
                    newArr2[i] = 'bi bi-pencil-square';
                    newArr3[i]=true;
                }

            }   
            setenable(newArr);
            setTextBModificar(newArr2);
            setActivar(newArr3);
        }

        // useEffect(()=>{
        //     getProyectos();
        // },[firts === true])
        /*==========================================================*/
    /*============================================================================================================*/
  return (
    <div className="contenido-marvilop">


        <div  className='animacion-table'> 


     
            {/*======================= Titulo Animación =======================*/}
         <div> <Animaciones mytext="Datos Divisa" /> </div> 
                {/*********Búsqueda de Proyectos AM ********/}

{/*                 <div className = "buscador-inteligente">

 
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

     


        </div> */}

                    {/****************************Lista de los Proyectos Creados ****************************************/}
            {/*  
                <div> <Animaciones mytext="Proyectos" /> </div>
 */}
                <Table   id = "daTable" >

        
                    <Thead>
                        <Tr >
                            <Th>ID</Th>
                            <Th>Clave</Th>
                            <Th>Descripción</Th>
                            <Th>Cliente</Th>
                            <Th>Fecha Creación</Th>
                            <Th>Fecha Modificación</Th>
                            <Th>Estatus</Th>
                            <Th>Valor Divisa</Th>
                            <Th>Moneda</Th>
                            <Th>Plazo Meses</Th>
                            <Th>Divisa</Th>
                            <Th></Th>
                             
                        </Tr>
                    </Thead>         
                    <Tbody>
                        {Object.keys(suggestions).map((key) => (    
                            //checar aqui va los titulos
                            <Tr key={suggestions[key].proyecto_id} >
                                <Td >{suggestions[key].proyecto_id}</Td>   
                                <Td>{suggestions[key].proyecto_clave}</Td>  
                                <Td>{suggestions[key].proyecto_descripcion}</Td>  
                                <Td>{suggestions[key].nombre_cliente}</Td> 
                                <Td>{suggestions[key].proyecto_fecha_creacion}</Td>
                                <Td>{suggestions[key].proyecto_fecha_modificacion}</Td>
                                <Td className={suggestions[key].proyecto_estatus} >{suggestions[key].proyecto_estatus}</Td> 
                                <Td >
                                    <input 
                                    className="input-name" 
                                    defaultValue={suggestions[key].proyecto_valor_dolar} 
                                    disabled={enable[key]} 
                                    onChange={handleInputChange}
                                    name="proyecto_valor_dolar" 
                                    ></input>
                                </Td>

                                <Td >
                                <select 
                                id="lista-opciones" 
                                name="proyecto_id_moneda" 
                                defaultValue={suggestions[key].proyecto_id_moneda} 
                                disabled={enable[key]} 
                                onChange={handleInputChange}
                                >
                                    <option value={0}></option>
                                    <option value={1}>MXN</option>
                                    <option value={2}>USD</option>
                                </select>
                                </Td>
                                <Td>{suggestions[key].proyecto_plazo_meses}</Td> 
                              {/*   <td>
                                    <button 
                                    className="btn btn-primary" 
                                    onClick={() => {
                                        habilitar(key);
                                        EnviarDivisa(datos,key,data);
                                        setFirts(activar[key])
                                    }}
                                    >
                                        {textBModificar[key]}
                                    </button>
                                </td>  */}



{enable[key] ? (
                                <Td  >
                                    <button 
                                    className=  "sn-boton" type="button"
                                    onClick={()=>{
                                       // props.envioData(datos,key,data); 
                                       habilitar(key);
                                       EnviarDivisa(datos,key,data);
                                       setFirts(activar[key])
                                    }}
                                    >
                                        <i className  = {textBModificar[key]}  ></i>
                                    </button>
                                    
                                </Td>
                            ):(
                              
                              
                              < >
                                    <Td  >
                                    <button 
                                    className="sn-boton" type="button"
                                    onClick={()=>{
                                        habilitar(key);
                                        EnviarDivisa(datos,key,data);
                                        setFirts(activar[key])
                                    }}
                                    >
                                        <i className= {textBModificar[key]}  ></i>
                                    </button>
                                
                                </Td>

                                <Td >
                                    <button 
                                    className="sn-boton cancelar" type="button"
                                    onClick={()=>{
                                      /*   props.envioData(datos,key,data);  */
                                      habilitar(key);
                                  
                                      setFirts(activar[key])
                                    }}
                                    >
                                        <i className= "bi bi-x-lg"  ></i>
                                    </button>
                                   
                                </Td>
                                </>
                            )}
                            </Tr>  
                        ))}
                    </Tbody>          
                </Table>
          
                </div>
    </div>
  )
}

export default Divisa