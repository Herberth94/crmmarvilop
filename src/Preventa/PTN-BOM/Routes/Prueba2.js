import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

import Animaciones from '../../../Componentes/Animaciones';
import { url, url2 } from '../../../Componentes/Ocultar';
import Cookies from 'universal-cookie';
import { Partida_catalogo } from '../../../Ventas/Operaciones/totalPartida';
import Formulario from '../../../Administrador/PropuestaEconomica/Menu-Propuesta/Formulario';
import swal from "sweetalert"
import ExportExcel2 from '../../../Administrador/PropuestaEconomica/Menu-Propuesta/ExportarExcel2';


const cookies = new Cookies();
//Obtención del rol del usuario con sesión activa
let validatorrol = cookies.get('rol');
//let validatorrol ="administrador";
//Obtención del id del usuario con sesión activa
let validatorid = cookies.get('id_usuario');

let estatus;
function Prueba2() {

    const [enable, setenable] = useState([]);// Inputs


           /*========================= Editar =========================*/
           const [data,setData] = useState ({
            proyecto_clave:'',
            proyecto_descripcion:'',
            proyecto_plazo_meses:''   
        });

        const handleInputChange = (event) => {
            setData ({
            ...data,[event.target.name] : event.target.value ,
            })
        }

    const MostrarError=()=>{

 
        swal({
          title: "Validación",
          text: "Solo se puede generar una Propuesta Económica en proyectos aceptados.",
          icon: "warning",
          button: "Cerrar"
      
        })
      
   
    }

    /*========================== Mostrar/Ocultar ==========================*/
    const [show,setShow] = useState([]); 
    const [show2,setShow2] = useState(true); // Resumen AM
    const [textBVer,setTextBVer] = useState([]);// Texto de los botones de mostrar
    /*=====================================================================*/

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
                const resProy = await axios.get(url + '/api/cotizador/proyecto/viewadmin');
                setListaProyectos(resProy.data.data);
                setSuggestions(resProy.data.data);
            }else{
                const resProy = await axios.get(url2 + `/api/cotizador/proyecto/viewpreventas/${validatorid}`);
                setListaProyectos(resProy.data.data);
                setSuggestions(resProy.data.data);
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
        setClaveP(claveP);
    }
    /*=======================================================================================================*/

    function getEstatus(et){
        estatus = et;
        //console.log(estatus);
    }

    useEffect(() => {
        let i = Object.keys(suggestions)
        i = i.length
        setShow(Array(i).fill(true));
        setTextBVer(Array(i).fill('bi bi-eye'));
    },[suggestions])

    const habilitar = (key) =>{
        key = parseInt(key);
        const newArr =[];
        const newArr2 = [];
        let c = Object.keys(suggestions);
        c = c.length;
        setShow(Array(c).fill(true));
        setTextBVer(Array(c).fill('bi bi-eye'));
        // if(estatus === 'Aceptado'){

        // }else{
        //     alert('Solo se puede generar una Propuesta Economica en proyectos aceptados')
        // }
        for (let i = 0 ; i < c ; i++){
            if(i === key){
                // if(estatus === 'Aceptado'){
                //     newArr[i] = !show[i];
                // }else{
                //     newArr[i] = show[i];
                // }
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
                newArr2[i] = 'bi bi-eye';
            }
        }   
        setShow(newArr);
        setTextBVer(newArr2);
    }
    
    const { 
        getTotalPar,
        getPorcentajesPar,
        getTotalCats,
        getPorcentajesCats,
        getDivisaProy,
        getPorcentajesCI,
        getFinanciamieno
  
    } = Partida_catalogo();

    async function consultarTotalesP(id){

        getTotalPar('');
        getPorcentajesPar('');

        getTotalCats('');
        getPorcentajesCats('');
    
        getDivisaProy('');
        getPorcentajesCI('');
        getFinanciamieno('');

        try{
            const resTotPar = await axios.get(url2 + `/api/cotizador/am/viewTotalesPartidas/${id}`);
            getTotalPar(resTotPar.data.data);

            const resAMPar = await axios.get(url2 + `/api/cotizador/am/viewAMPartidas/${id}`);
            getPorcentajesPar(resAMPar.data.data);

            const resTotCats = await axios.get(url2 + `/api/cotizador/am/viewTotalesCategorias/${id}`);
            getTotalCats(resTotCats.data.data);

            const resAMCats = await axios.get(url2 + `/api/cotizador/am/viewAMCategorias/${id}`);
            getPorcentajesCats(resAMCats.data.data);

            const dProy = await axios.get(url2 + `/api/cotizador/am/viewDivisa/${id}`);
            getDivisaProy(dProy.data.data);
            //console.log(dProy.data.data);

            const resCI = await axios.get(url2 + `/api/cotizador/ci/view/${id}`);
            getPorcentajesCI(resCI.data.data);
            
            const resdF = await axios.get(url2 + `/api/cotizador/proporcionalidad/view/${id}`);
            getFinanciamieno(resdF.data.data);

        }catch (error){
            console.log(error);
        }
        //console.log('Categorias',totalCategorias);
    }

    return (
        <div className="contenido-marvilop">

<div  className='animacion-table'>
   

            <div>
                <Animaciones mytext="Resumen proyectos" />
            </div>
{/*             <div className = "buscador-inteligente">

 
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
        </div>  */} 
                {/*============= Titulo Animación =============*/}
               {/*  <div> <Animaciones mytext="Proyectos " /> </div>
 */}
            <Table    id = "daTable">
                <Thead>

               
                    <Tr>
                        <Th>ID</Th>
                        <Th>Clave</Th>
                        <Th>Descripción</Th>
                        <Th>Cliente</Th>
                        <Th>Fecha Creación</Th>
                        <Th>Fecha Modificación</Th>
                        <Th>Estatus</Th>
                        <Th>Plazo de meses</Th>
                        <Th>Detalles </Th>
                        <Th>Modificar</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                                
                <Tbody>
                    {Object.keys(suggestions).map((key) => (    
                        //checar aqui va los titulos
                    <Tr key={suggestions[key].proyecto_id} >
                        <Td>
                            
                            {suggestions[key].proyecto_id}
                        
                        
                        </Td>  

                        <Td>
                           
                            
                       { suggestions[key].proyecto_clave}
                                
                        </Td>  
                        <Td>{suggestions[key].proyecto_descripcion}</Td>  
                        <Td>{suggestions[key].nombre_cliente}</Td> 
                        <Td>{suggestions[key].proyecto_fecha_creacion}</Td>
                        <Td>{suggestions[key].proyecto_fecha_modificacion}</Td>
                        <Td className={suggestions[key].proyecto_estatus}>{suggestions[key].proyecto_estatus}</Td> 
                        <Td>{suggestions[key].proyecto_plazo_meses}</Td>
                        <Td>
                            <button 
                            className="sn-boton ver" 
                            onClick={() => {
                            getEstatus(suggestions[key].proyecto_estatus);
                  
                                consultarTotalesP(suggestions[key].proyecto_id);
                                habilitar(key);
                         
                               
                           
                            } 
                            }
                            >
                           <i className=   {textBVer[key]}  ></i>
                    
                            </button>
                        </Td> 












                        
                    </Tr>  
                    ))}
                </Tbody>          
            </Table>
            {show2 ? (
                <div></div>
            ) : (
                <div className="">
                    {/*========================== Llamado al Componente ==========================*/}
                    {/*           <CostosIndirectos/> */}
                    <Formulario/>
                </div>
            )}
              
              </div>
                            
    </div>
  );
};
export default Prueba2