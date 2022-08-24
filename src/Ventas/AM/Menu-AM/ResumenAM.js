import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Cookies from 'universal-cookie';
import Animaciones from '../../../Componentes/Animaciones';
//Componentes
import {Partida_catalogo} from '../../Operaciones/totalPartida';
import { url, url2 } from '../../../Componentes/Ocultar';
import {  Cantidad,descuentoCliente,  prov, listaProv,desFabrica, costoPTN, margenGanancia, precioVenta , margenDirecto ,
precioFinalVenta,
costoSinIndirectos,
costoFianalProyecto,
datosCompletosAM,
datosCompletosTotal,
stringDolar,
totalMensual,
margenReal,
totalMensualFinal,
comprobacionFinanciamieno
} from "../../Operaciones/OperacionesAM";
import { EditAM } from '../Routes/ModificarDatosAm';
import {costosIndirectos, equivale,  totalIndirecto} from "../../Operaciones/OperacionesAM";
import swal from "sweetalert"



let mensu = totalMensual[totalMensual.length];


const cookies = new Cookies();
//Obtención del rol del usuario con sesión activa
let validatorrol = cookies.get('rol');
//let validatorrol ="administrador";
//Obtención del id del usuario con sesión activa
let validatorid = cookies.get('id_usuario');

export let estatusProy;
export let pId;

const ResumenAM = () => {

    const { 
        getTotalPar,
        getPorcentajesPar,
        getTotalCats,
        getPorcentajesCats,
        getDivisaProy,
        getPorcentajesCI,
        getFinanciamieno} = Partida_catalogo();

    /*======================================== Buscador de proyectos ========================================*/
    // Almacenamiento de todos los proyectos existentes 
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
    /*=======================================================================================================*/
    
    const [partidas, setPartidas] = useState([]);
    const [cats, setCats] = useState([]);
    /*=============================== Función que consulta los datos de un proyeco para el resumen AM ===============================*/  
    async function consultarTotalesP(id){          //console.log(id)
        try{
            getTotalPar('');
            getPorcentajesPar('');
            getTotalCats('');
            getPorcentajesCats('');  
            getDivisaProy('');
            getPorcentajesCI('');
            getFinanciamieno('');
            setCats('');
            setPartidas('');

            const resTotPar = await axios.get(url2 + `/api/cotizador/am/viewTotalesPartidas/${id}`);
            getTotalPar(resTotPar.data.data);

            const resAMPar = await axios.get(url2 + `/api/cotizador/am/viewAMPartidas/${id}`);
            getPorcentajesPar(resAMPar.data.data);
            setPartidas(resAMPar.data.data);

            const resTotCats = await axios.get(url2 + `/api/cotizador/am/viewTotalesCategorias/${id}`);
            getTotalCats(resTotCats.data.data);

            const resAMCats = await axios.get(url2 + `/api/cotizador/am/viewAMCategorias/${id}`);

            getPorcentajesCats(resAMCats.data.data);
            setCats(resAMCats.data.data);

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
    /*===============================================================================================================================*/

    /*========================== Mostrar/Ocultar ==========================*/
    const [activar, setActivar] = useState([]);
    const [textBModificar,setTextBModificar] = useState([]);//Texto de los botones de modificar
    const [textBVer,setTextBVer] = useState([]);//Texto de los botones de detalles
    const [show, setShow] = useState([]);//Tabla del resumen AM
    const [show1, setShow1] = useState(true);
    /*=====================================================================*/
    const [data,setData] = useState ({
        desc_cliente: '', 
        margen_ganancia:'',
        cantidad:'',
        desc_fabrica:''
    });

    const handleInputChange = (event) => {
        setData({
          ...data,[event.target.name] : event.target.value
        })
    }

    const [enable, setenable] = useState([]);
    
    useEffect(() => {
        let i = Object.keys(datosCompletosAM)
        i = i.length
        setenable(Array(i).fill(true));
        setActivar(Array(i).fill(true));
        setTextBModificar(Array(i).fill('bi bi-pencil-square'));
    },[datosCompletosAM])

    const habilitar = (key) =>{
        //console.log(datosCompletosAM[key]);
        key = parseInt(key);
        const newArr =[] 
        const newArr2 = [];
        const newArr3 = [];
        let c = Object.keys(datosCompletosAM);
        let d = Object.keys(data);
        c = c.length;
        for (let i = 0 ; i < c ; i++){
            if(i === key){
                newArr[i] = !enable[i];
                if(enable[i] === false){
                    newArr2[i] = 'bi bi-pencil-square';
                    setData({
                        ...data, desc_cliente : '',
                        margen_ganancia:'',
                        cantidad:'',
                        desc_fabrica:''
                      })
                    // if(data.des_cliente !== ''){
                    //     descuentoCliente[key] = data.des_cliente;
                    // }else if(data.margen_ganancia !== ''){
                    //     margenGanancia[key] = data.margen_ganancia;
                    // }else if(data.cantidad !== ''){
                    //     Cantidad[key] = data.cantidad;
                    // }else if(data.descuento_fabrica !== ''){
                    //     desFabrica[key] = data.descuento_fabrica
                    // }
                }else{
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

    useEffect(() => {
        let i = Object.keys(suggestions)
        i = i.length
        setShow(Array(i).fill(true));
        setTextBVer(Array(i).fill('bi bi-eye'));
    },[suggestions])

    const habilitar2 = (key) =>{
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

    const {actualizacion} = EditAM();

    const envioData = (key) => {
        if(activar[key] === false){
            actualizacion(partidas,cats,datosCompletosAM[key],data);
        }
    }

    function getEstatusProy (estatus,id){
        estatusProy = estatus;
        pId = id;
    }

    return (
        <div className="contenido-marvilop">



<div  className='animacion-table'>   


<div > <Animaciones mytext="Resumen AM " /> </div>

      {/*       <div> <Animaciones mytext="AM COMPLETO" /> </div> */}
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
                {/****************************Lista de los Proyectos Creados ****************************************/}
                {/*============= Titulo Animación =============*/}


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
                            <Th>Plazo Meses</Th>
                            <Th>Resumen AM</Th>
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
                                <Td className={suggestions[key].proyecto_estatus}>{suggestions[key].proyecto_estatus}</Td> 
                                <Td >{suggestions[key].proyecto_plazo_meses}</Td>
                                <Td >
                                    <button 
                                    className="sn-boton" 
                                    onClick={() => {
                                        consultarTotalesP(suggestions[key].proyecto_id);
                                        habilitar2(key);
                                        getEstatusProy(suggestions[key].proyecto_estatus,suggestions[key].proyecto_id);
                                    }}
                                    >
                                       <i className=  {textBVer[key]}></i> 
                                        
                                      </button>
                                </Td> 
                            </Tr>  
                        ))}
                    </Tbody>          
                </Table>

  </div>   
      
            {show1 ? (
                <div></div>
            ):(
                <div className="animacion-table">

                    <Animaciones mytext="Resumen Am " />
                    <div className="">
                        <Table  id="edit"  className="edit">
                            <Thead>                     
                                <Tr >
                                    <Th>Nombre Partida</Th>
                                    <Th className="listacl">Lista cl </Th>
                                    <Th>Desc. Cliente %</Th>
                                    <Th className="listacl">Precio  Venta</Th>
                                    <Th>Margen Ganancia %</Th>
                                    <Th className="listacl">Precio Lista Unitario Prov</Th>
                                    <Th>Cantidad</Th>
                                    <Th className="listacl">Lista Prov</Th>
                                    <Th>Desc Fabrica %</Th>
                                    <Th className="listacl">Costo PTN</Th>
                                    <Th>Margen Directo %</Th>
                                    <Th>Modificar</Th>
                                    
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {/*=================== Contenido Tabla Clientes =================*/}
                                {Object.keys(datosCompletosAM).map((key) => (
                                <Tr key={key}>
                                    <Td>{datosCompletosAM[key]}</Td>
                                    {/*================= Descripcion General Partida ==================*/}
                                    <Td  > {"$ "} {datosCompletosTotal[key]}</Td>
                                    {/*================= Descuento Cliente ==================*/}
                                    <Td className="editar" >
                                        <input
                                        className="input-name"
                                        type="number"
                                        defaultValue={descuentoCliente[key]}
                                        disabled={enable[key]} 
                                        onChange={handleInputChange}
                                        name="desc_cliente" 
                                        ></input> 
                                    </Td>
                                    {/*================= Precio Venta ==================*/}
                                    <Td   > {"$ "} {precioVenta[key]} </Td>
                                    {/*================= Margen Ganancia==================*/}
                                    <Td  className="editar">
                                        <input
                                        className="input-name"
                                        type="number"
                                        defaultValue={margenGanancia[key]}
                                        disabled={enable[key]} 
                                        onChange={handleInputChange}
                                        name="margen_ganancia" 
                                        ></input>
                                    </Td>
                                    {/*================= PrecioLista Unitario ==================*/}
                                    <Td >{"$ "} {prov[key]}</Td>
                                    {/*================= Cantidad ==================*/}
                                    <Td className="editar">
                                        <input
                                        className="input-name"
                                        type="number"
                                        defaultValue={Cantidad[key]}
                                        disabled={enable[key]} 
                                        onChange={handleInputChange}
                                        name="cantidad" 
                                        ></input>
                                    </Td>
                                    {/*================= Lista prov ==================*/}
                                    <Td  > {"$ "} {listaProv[key]}</Td>
                                    {/*================= Descuento Fabrica ==================*/}    
                               
                                    <Td  className="editar">
                                        <input
                                        className="input-name"
                                        type="number"
                                        defaultValue={desFabrica[key]}
                                        disabled={enable[key]} 
                                        onChange={handleInputChange}
                                        name="desc_fabrica" 
                                        ></input>
                                    </Td>
                                    {/*================= Costo PTN ==================*/}
                                    <Td >{"$ "} {costoPTN[key]}  </Td>
                                    {/*================= Margen Directo ==================*/}
                                    <Td>{margenDirecto[key] } {" % "}</Td>






                                    {/*================= Botón Modificar ==================*/}
                             {/*        <td>
                                        <button 
                                        className="btn btn-primary Mod"
                                        onClick={()=>{
                                            habilitar(key);
                                            envioData(key);
                                        }}
                                        > {textBModificar[key]}
                                        </button>
                                    </td> */}



{enable[key] ? (
                                <Td  >
                                    <button 
                                    className=  "sn-boton" type="button"
                                    onClick={()=>{
                                       // props.envioData(datos,key,data); 
                                        habilitar(key); 
                                        envioData(key);
                                    }}
                                    >
                                        <i className  = {textBModificar[key]}  ></i>
                                    </button>
                                    
                                </Td>
                            ):(
                              
                              
                              <>
                                    <Td  >
                                    <button 
                                    className="sn-boton" type="button"
                                    onClick={()=>{
                                      
                                       /*  habilitar(key); 
                                        envioData(key); */
                                      consultarTotalesP(suggestions[key].proyecto_id); 
                                      
                                    }}
                                    >
                                        <i className= {textBModificar[key]}  ></i>
                                    </button>
                                
                                </Td>

                                <Td >
                                    <button 
                                    className="sn-boton" type="button"
                                    onClick={()=>{
                                      /*   props.envioData(datos,key,data);  */
                                        habilitar(key); 
                                      
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



               
<br/>
<br/>
                        <div> <Animaciones mytext="Costos Indirectos " /> </div>
 
                        <Table >
                <Thead>


                    {/*=================== Titulos Tabla Clientes ===================*/}
                    <Tr >
                        <Th>Descripción</Th>
                        <Th>Equivale a % </Th>
                        <Th>Total </Th>
                        <Th>Divisa </Th>

 
                    </Tr>
                </Thead>
                <Tbody>
                    {/*=================== Contenido Tabla Clientes =================*/}

                    {Object.keys(costosIndirectos).map((key) => (
                        <Tr key={key}>
                            {/*================= Descripción==================*/}
                            <Td  >{costosIndirectos[key]}</Td>

                            {/*================= Equivale ==================*/}
                            <Td  className="editar" >
                                        <input
                                        className="input-name"
                                        type="number"
                                        defaultValue={equivale[key] }
                                        disabled={true} 
                                        onChange={handleInputChange}
                                        name="porcentaje" 
                                        ></input> 
                                    </Td>
                            {/*================= Total Indirecto ==================*/}
                            <Td >  {"$ "}  { totalIndirecto[key]} </Td>
                            <Td >{stringDolar}</Td>

                            

                            {/*================= Editar==================*/}


                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <br/>
            <br/>
      
                        <div>
                    {/*     <div> <Animaciones mytext="Totales " /> </div> */}
                    <div> <Animaciones mytext="Costos Totales Finales " /> </div>
 
                            <Table>
                                <Thead>

                                    {/*=================== Titulos Tabla Clientes ===================*/}
                                    <Tr >
                                        <Th>Precio Final de Venta</Th>
                                        <Th>Costo (Sin Indirecto)</Th>
                                        <Th>Costo Final del Proyecto</Th>
                                        <Th>Divisa</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {/*=================== Contenido Tabla Clientes =================*/}
                                            <Tr > 
                                            <Td   className='amarillo'> {"$ "}{precioFinalVenta } {stringDolar}</Td>  
                                            <Td className='azul'>{"$ "} {costoSinIndirectos}  {stringDolar}</Td>    
                                            <Td  className='verde'>{"$ "} {costoFianalProyecto}  </Td>   
                                            <Td   className='verde'>{stringDolar}   </Td>     
                                            </Tr >
                                </Tbody>
                            </Table>

                            <br/>
                            <br/>
                        </div>









                        <div>
               
                            <Table >
                                <Thead>

                                    {/*=================== Titulos Tabla Clientes ===================*/}
                                    <Tr >
                                        <Th>Precio Total de Venta Sin IVA </Th>
                                        <Th>Costo Final</Th>
                                        <Th>Mensual</Th>                
                                        <Th>Margen Real</Th>
                                        <Th>Divisa</Th>
                                      
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {/*=================== Contenido Tabla Clientes =================*/}
                                            <Tr > 
                                            <Td   className='verde'> {"$ "}{precioFinalVenta } {stringDolar}</Td>  

                                            
                                     {/*        <td className='azul'>{" $ "} {costoPTN[costoPTN.length -1]}  {stringDolar}</td>    
 */}
                                            <Td  className='azul'>{"$ "} {costoFianalProyecto}  </Td> 

                                                <Td   className='verde'>{"$ "} { totalMensualFinal}   </Td>   
                                                <Td    className='azul'>{ margenReal } {" %"}   </Td>   
                                                <Td   className='verde'>{stringDolar}   </Td> 
                                            </Tr >
                                </Tbody>
                            </Table>
                            <br/>
                            
                            <br/>
                        </div>



                    </div>
                </div>
                    


                    
            )}
        </div>
    )
}

export default ResumenAM