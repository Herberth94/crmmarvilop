import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Animaciones from "../../../Componentes/Animaciones";
import { url, url2 } from '../../../Componentes/Ocultar';
import Cookies from 'universal-cookie';
import {Partida_catalogo} from '../../Operaciones/totalPartida'
import CostosIndirectos from './CostosIndirectos';


const cookies = new Cookies();
//Obtención del rol del usuario con sesión activa
let validatorrol = cookies.get('rol');
//let validatorrol ="administrador";
//Obtención del id del usuario con sesión activa
let validatorid = cookies.get('id_usuario');

export let estatusProy1;
export let pId;

function BuscadorInteligente() {

    const { 
        getTotalPar,
        getPorcentajesPar,
        getTotalCats,
        getPorcentajesCats,
        getDivisaProy,
        getFinanciamieno,
        getPorcentajesCI} = Partida_catalogo();


    //Habilitar/Deshabilitar tabla del resumen AM
    const [show, setShow] = useState([]);
    const [show1, setShow1] = useState(true);
    const [textBVer,setTextBVer] = useState([]);//Texto de los botones de detalles



    // Almacenamiento de todos los proyectos existentes 
    const[listaProyectos, setListaProyectos] = useState([]);

    //Almacenamiento de los proyectos semejantes a la clave introducido
    const [suggestions, setSuggestions] = useState([]);

    // Almacenamiento de la clave introducida del proyecto 
    const[claveP,setClaveP] = useState([]);

    /*== Función que realiza la consulta a la tabla proyectos ==*/
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


    const[pCI, setPCI] = useState([]);

    async function consultarTotalesP(id){          //console.log(id)
        try{

            getTotalPar('');
            getPorcentajesPar('');
            getPorcentajesCats('');
            getDivisaProy('');
            getPorcentajesCI('');
            getFinanciamieno('');

          
 
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

            const resCI = await axios.get(url2 + `/api/cotizador/ci/view/${id}`);
            getPorcentajesCI(resCI.data.data);
            setPCI(resCI.data.data);

            const resdF = await axios.get(url2 + `/api/cotizador/proporcionalidad/view/${id}`);
            getFinanciamieno(resdF.data.data);

        }catch (error){
            console.log(error);
        }//console.log('Categorias',totalCategorias);
    }

    useEffect(() => {
        let i = Object.keys(suggestions)
        i = i.length
        setShow(Array(i).fill(true));
        setTextBVer(Array(i).fill('bi bi-eye'));
    },[suggestions])

    const habilitar = (key) =>{
        //console.log(key);
        key = parseInt(key);
        const newArr =[];
        const newArr2 = [];
        let c = Object.keys(suggestions);
        c = c.length;
        setShow(Array(c).fill(true));
        setTextBVer(Array(c).fill('bi bi-eye'));
        for (let i = 0 ; i < c ; i++){
            if(i === key){
                newArr[i] = !show[i];
                setShow1(newArr[i]);
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

    function getEstatusProy (estatus,id){
        estatusProy1 = estatus;
        pId = id;
    }

  return (

    <div className="contenido-marvilop">


        <div  className='animacion-table'>
   
   
      <div> <Animaciones mytext="Costos Indirectos" /> </div>
{/*       <div className = "buscador-inteligente">
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
        {/*============= Titulo Animación =============*/}
      {/*   <div> <Animaciones mytext="Proyectos " /> </div> */}
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
            <Th>Plazo de meses</Th>
            <Th>Detalles</Th>
            </Tr>
            </Thead>
                    
            <Tbody>
            {Object.keys(suggestions).map((key) => (    
            //checar aqui va los titulos
            <Tr key={suggestions[key].proyecto_id} >
            <Td width={"80px"}>{suggestions[key].proyecto_id}</Td>   
            <Td>{suggestions[key].proyecto_clave}</Td>  
            <Td>{suggestions[key].proyecto_descripcion}</Td>  
            <Td>{suggestions[key].nombre_cliente}</Td> 
            <Td>{suggestions[key].proyecto_fecha_creacion}</Td>
            <Td>{suggestions[key].proyecto_fecha_modificacion}</Td>
            <Td className = {suggestions[key].proyecto_estatus}>{suggestions[key].proyecto_estatus}</Td> 
            <Td>{suggestions[key].proyecto_plazo_meses}</Td>
            <Td width={"100px"}>
                <button 
                 className="sn-boton" 
                onClick={() => {
           
                    habilitar(key);
                    getEstatusProy(suggestions[key].proyecto_estatus,suggestions[key].proyecto_id);

                   consultarTotalesP(pId);

                }}
                >
                     <i className=   {textBVer[key]}  ></i>
                    
                  </button>
            </Td> 
            </Tr>  
            ))}
            </Tbody>          
        </Table>
        {show1 ? (
            <div></div>
        ) : (
            <div className="">
                {/*========================== Llamado al Componente ==========================*/}
                {/*           <CostosIndirectos/> */}
                < CostosIndirectos
                    ci={pCI}
                />
            </div>
        )}
            

    </div>
    </div>


  )
}

export default BuscadorInteligente