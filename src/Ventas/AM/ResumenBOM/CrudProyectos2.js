import axios from 'axios';
import React ,{useState, useEffect} from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
//Componentes
import {url2} from "../../../Componentes/Ocultar";
import { EditPartida } from '../../../Routes/ModificarPartida';
import { EditCats } from '../../../Routes/ModificarCategorias';
import {CrudPartidas2} from './CrudPartidas2';
import { CrudCategorias2 } from './CrudCategorias2';




let pId;
export let pEstatus;

export const CrudProyectos2 = (props) => {
    /*======================================== Habilitar/Deshabilitar ========================================*/
    const [enable, setenable] = useState([]);// Inputs
    const [activar, setActivar] = useState([]);
    /*=========================================================================================================*/

    /*========================== Mostrar/Ocultar ==========================*/
    const [show,setShow] = useState(true); //Menu resumen
    const [show2,setShow2] = useState(true); //Lista de partidas
    const [show3,setShow3] = useState(true); //Lista de categorias
    const [textBModificar,setTextBModificar] = useState([]);//Texto de los botones de modificar
    const [show4,setShow4] = useState([]);
    const [textBVer,setTextBVer] = useState([]);// Texto de los botones de mostrar
    /*=====================================================================*/

    /*================================================== Proyectos ==================================================*/
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

        const [datos, Setdatos] = useState();
        // Almacenamiento del nombre del cliente a buscar
        const [nombreC, setNombreC] = useState([]);
        // Almacenamiento de los clientes semejantes al texto introducido en el input
        const [suggestionsClientes, setSuggestionsClientes] = useState ([]);

        //const [sCInput, setScInput] = useState([]);

        useEffect(() => {
            Setdatos(props.suggestionsP);
        },[props.suggestionsP]);


        useEffect(() => {
            let i = Object.keys(props.suggestionsP)
            i = i.length
            setenable(Array(i).fill(true));
            setShow4(Array(i).fill(true));
            setActivar(Array(i).fill(true));
            setTextBModificar(Array(i).fill('bi bi-pencil-square'));
            setTextBVer(Array(i).fill('bi bi-eye'));
            const arrayNombresC = []
            //console.log(enable);
            for(let c = 0 ; c < i ;c++){
                arrayNombresC[c] = props.suggestionsP[c].nombre_cliente;
            }
            setNombreC(arrayNombresC);

            
        },[props.suggestionsP])

        
        const habilitar = (key) =>{
            key = parseInt(key);
            const newArr =[] 
            const newArr2 = [];
            const newArr3 = [];
            let p = Object.keys(props.suggestionsP);
            p = p.length;
            for (let i = 0 ; i < p ; i++){
                if(i === key){
                    newArr[i] = !enable[i];
                    if(enable[i] === false){
                        newArr2[i] = 'bi bi-pencil-square';
                        setData({
                            ...data,proyecto_clave:'',
                                    proyecto_descripcion:'',
                                    proyecto_plazo_meses:''
                        })
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

            const arrayNombresC = [];

            if (activar === true){
                for(let c = 0 ; c < p ;c++){
                    if(c === key){
                        arrayNombresC[c] = '';
                    }else{
                        arrayNombresC[c] = nombreC[c];
                    }
                
                }
                setNombreC(arrayNombresC);
            }
        }

        const habilitar1 = (key) =>{
            setShow2(true);
            setShow3(true);
            key = parseInt(key);
            const newArr =[];
            const newArr2 = [];
            let c = Object.keys(props.suggestionsP);
            c = c.length;
            setTextBVer(Array(c).fill('bi bi-eye'));
            for (let i = 0 ; i < c ; i++){
                if(i === key){
                    newArr[i] = !show4[i];
                    setShow(newArr[i]);
                    if(show4[i] === false){
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
            setShow4(newArr);
            setTextBVer(newArr2);
        }
        /*==========================================================*/

        /*=================================== Buscador de clientes ===================================*/
        // Función que realiza la busqueda de los clientes semejantes a al nombre introducido 
        const onChangeTextCliente = (nombreCliente, key) => {
            let coincidencias = [];
            if(nombreCliente.length>0){
            coincidencias = props.clientes.filter(cliente => {
                const regex = new RegExp(`${nombreCliente}`, "gi");
                return cliente.nombre_cliente.match(regex)
                })
            }
            setSuggestionsClientes(coincidencias);

            key = parseInt(key);
            let i = Object.keys(props.suggestionsP)
            i = i.length;
            const arrayNombresC = []
            for(let c = 0 ; c < i ;c++){
                if(c === key){
                    arrayNombresC[c] = nombreCliente;
                }else{
                    arrayNombresC[c] = nombreC[c];
                }
            }
            setNombreC(arrayNombresC);

            // const arraySC = [];
            // for(let c = 0 ; c < i ; c++){
            //     arraySC[c] = coincidencias;
            // }
            // setScInput(arraySC);

            //console.log('clientes de cada input:',arraySC);
            //setNombreC1(nombreCliente);
            //console.log('nombres clientes:',nombreC);
        }

        // Función que obtiene el nombre del cliente seleccionado
        const onSuggestHandler = (nC, key) => {
            //console.log(nC);
            key = parseInt(key);
            let i = Object.keys(props.suggestionsP)
            i = i.length;
            const arrayNombresC = []
            for(let c = 0 ; c < i ;c++){
                if(c === key){
                    arrayNombresC[c] = nC;
                }else{
                    arrayNombresC[c] = nombreC[c];
                }
            }
            setNombreC(arrayNombresC);
            //console.log('array de nombreC seleccionado:', nombreC);
            //setNombreC(nombreC);
            setSuggestionsClientes([]);
        }

        function getProyEstatus(st){
            pEstatus = st;
        }

            /*===== Mostrar Proyecto actual =====*/
            const [proyecto,setProyecto] = useState('')
            // const [cProy,setCProy] = useState('');
            // const [desProy,setDesProy] = useState('');
            // const [clProy,setClProy] = useState('');
            /*===================================*/

        function getIdP (proyecto){
            pId = proyecto.proyecto_id;
            // setCProy(proyecto.proyecto_clave);
            // setDesProy(proyecto.proyecto_descripcion);
            // setClProy(proyecto.nombre_cliente);
            setProyecto(`Proyecto: FO-ING-01 BOM - ${proyecto.proyecto_clave} - ${proyecto.proyecto_descripcion}  -  ${proyecto.nombre_cliente}`)
            
            getProyEstatus(proyecto.proyecto_estatus);
            //console.log('Estatus:',proyecto.proyecto_estatus);
            
            //console.log(pEstatus);
        }
        /*============================================================================================*/
    /*===============================================================================================================*/
    
    /*================================================== Partidas ==================================================*/
        /*========================= Resumen - Partidas de un proyecto =========================*/
        // Almacenamiento de las partidas
        const[listaPartidas, setListaPartidas] = useState([]);
        
        // Función que realiza la consulta a la tabla partida
        async function getDatosPartida(id){
            try{
                const resPP = await axios.get(url2 + `/api/cotizador/partida/viewPP/${id}`); 
                    setListaPartidas(resPP.data.data);
            }catch(error){
                console.log(error);
            }
        }
        /*=====================================================================================*/

        /*========================= Envío de nuevos datos =========================*/
        const [first,setfirst] = useState(false);

        const {actualizacionPar} = EditPartida();
        
        const envioDataPartida = (data, key, newdata) => {
            if(first){
                actualizacionPar(data[key], newdata);
            }
        }
        /*=========================================================================*/
    /*==============================================================================================================*/

    /*================================================== Categorias ==================================================*/
        /*========================= Resumen - Categorias de un proyecto =========================*/
        // Almacenamiento de los datos de las categorias
        const[listaCategorias, setListaCategorias] = useState([]);
        
        // Función que realiza la consulta a la tabla partida
        async function getDatosCats(proyecto_id){
            try{
                const resCtsP = await axios.get(url2 + `/api/cotizador/catd/view/${proyecto_id}`);
                    setListaCategorias(resCtsP.data.data);
            }catch(error){
                console.log(error);
            }
        }
        /*=====================================================================================*/

        /*========================= Envío de nuevos datos =========================*/
        const [first1,setfirst1] = useState(false);

        const {actualizacionCats} = EditCats();
        
        const envioDataCats = (data, key, newdata) => {
            if(first1){
                actualizacionCats(data[key], newdata);
            }
        }
        /*=========================================================================*/
    /*==============================================================================================================*/
    return (
        <div>
            <Table  id ="daTable">
                <Thead>
                    <Tr >
                        <Th>ID</Th>
                        <Th>Clave</Th>
                        <Th>Descripción</Th>
                        <Th>Cliente</Th>
                        <Th>Fecha Creación</Th>
                        <Th>Fecha Modificación</Th>
                        <Th>Estatus</Th>
                        <Th>Plazo Meses</Th>
                     {/*    <th>Modificar</th> */}
                        <Th>Detalles</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                                
                <Tbody>
                    {Object.keys(props.suggestionsP).map((key) => (    
                        <Tr key={props.suggestionsP[key].proyecto_id} >
                            <Td>{props.suggestionsP[key].proyecto_id}</Td>  
                            <Td>
                            {props.suggestionsP[key].proyecto_clave} 
                                
                            </Td>   

                            <Td>
                            {props.suggestionsP[key].proyecto_descripcion} 
                                
                            </Td>  

                            <Td>
                            {nombreC[key]}
                           
                            </Td> 

                            <Td>{props.suggestionsP[key].proyecto_fecha_creacion}</Td>

                            <Td>{props.suggestionsP[key].proyecto_fecha_modificacion}</Td>

                            <Td  className={props.suggestionsP[key].proyecto_estatus}>{props.suggestionsP[key].proyecto_estatus}</Td>
                            <Td >
                            {props.suggestionsP[key].proyecto_plazo_meses} 
                               
                            </Td> 


                        
                        <Td >
                        {" "}
                        <button
                            className="sn-boton"
                            type="button"
                            onClick={() => {
                                getIdP(props.suggestionsP[key]);
                                //getDatosPartida(props.suggestionsP[key]);
                                habilitar1(key);
                            }}
                        >
                            <i className= {textBVer[key]}></i>
                        </button>
                    </Td>
                        </Tr>  
                    ))}
                </Tbody>          
            </Table>

            <br/>
            <br/>


            {show ? (
                <></>
            ):(
                <div className='menu2'>
                  

                            <Table >
                                {/*========================== Titulos Tabla ==========================*/}
                                <thead>
                                    <tr >
                                        <th className='ocultar'>Partidas</th>
                                        <th className='ocultar'>Categorías</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                        {/*========================== Divisa ==========================*/}
                                        <td>
                                            <button
                                            className="btn btn-primary modificar"
                                            type="button"
                                            onClick={() => {
                                            getDatosPartida(pId); 
                                            setShow2(!show2);
                                            setShow3(true);
                                            }}
                                            >
                                            {" "}
                                            {show2 ? "Mostrar Partidas" : "Ocultar"}{" "}
                                            </button>
                                            {show2 ? (
                                            <></>
                                            ) : (
                                                <div className='arregla multiple'>
                                            
                                                        {/*=================== Botón Mostrar Lista DIV =====================*/}
                                                        <br />
                                                        <CrudPartidas2
                                                        partidas={listaPartidas}
                                                        setfirst={setfirst}
                                                        envioDataPar={envioDataPartida}
                                                        proyecto={proyecto}
                                                        />   
                                                 
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                            className="btn btn-primary modificar"
                                            type="button"
                                            onClick={() => {
                                                getDatosCats(pId);
                                                setShow3(!show3);
                                                setShow2(true);
                                            }}
                                            >
                                            {" "}
                                            {show3 ? "Mostrar Categorias" : "Ocultar"}{" "}
                                            </button>
                                            {show3 ? (
                                                <></>
                                            ):(
                                                <div className="arregla multiple">
                                                  
                                                        {/*========================== Llamado al Componente ==========================*/}
                                                        <CrudCategorias2
                                                        dcats={listaCategorias}
                                                        setfirst={setfirst1}
                                                        envioData={envioDataCats}
                                                        />
                                                
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

            )}
            {/* </form> */}
        </div>
    )
}
