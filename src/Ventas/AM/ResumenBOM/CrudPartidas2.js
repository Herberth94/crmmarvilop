import axios from 'axios';
import React ,{useState, useEffect} from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { EditSP } from '../../../Preventa/PTN-BOM/Routes/ModificarSP';
import { CrudSp2 } from './CrudSP2.js';
import { url, url2 } from '../../../Componentes/Ocultar';
import Animaciones from '../../../Componentes/Animaciones';


export const CrudPartidas2 = (props) => {
    /*======================================== Habilitar/Deshabilitar secciones ========================================*/
    const[show,setShow] = useState(true);//Tabla servicios/productos
    const [enable, setenable] = useState([]);//Inputs
    /*==================================================================================================================*/

    /*========================== Mostrar/Ocultar ==========================*/
    const [activar, setActivar] = useState([]);
    const [textBModificar,setTextBModificar] = useState([]);//Texto de los botones de modificar
    const [textBVer,setTextBVer] = useState([]);// Texto de los botones de mostrar
    const [show1,setShow1] = useState([]);
    /*=====================================================================*/

    /*================================================== Partidas ==================================================*/
        /*========================= Editar =========================*/

        const [data,setData] = useState ({
            partida_nombre:'',
            partida_descripcion:''      
        });

        const handleInputChange = (event) => {
            setData ({
            ...data,[event.target.name] : event.target.value ,
        })
        }

        const [datos, Setdatos] = useState();
        

        useEffect(() => {
            Setdatos(props.partidas); 
        },[props.partidas]);


        useEffect(() => {
            let i = Object.keys(props.partidas);
            i = i.length;
            setenable(Array(i).fill(true)); 
            setActivar(Array(i).fill(true));
            setShow1(Array(i).fill(true));
            setTextBModificar(Array(i).fill('bi bi-pencil-square'));
            setTextBVer(Array(i).fill('bi bi-eye'));
        },[props.partidas])

        
        const habilitar = (key) =>{
            key = parseInt(key);
            const newArr =[];
            const newArr2 = [];
            const newArr3 = [];
            let c = Object.keys(props.partidas);
            c = c.length;
            for (let i = 0 ; i < c ; i++){
                if(i === key){
                    newArr[i] = !enable[i];
                    if(enable[i] === false){
                        newArr2[i] = 'bi bi-pencil-square';
                        setData({
                            ...data,partida_nombre:'',
                                    partida_descripcion:''  
                        })
                    }else{
                        newArr2[i] = 'bi bi-check-lg';
                    }
                    newArr3[i] = !activar[i];
                }
                if(i !== key){
                    newArr[i] = true;
                    newArr2[i] = 'bi bi-pencil-square';
                    newArr3[i] = true;
                }
    
            }   
            setenable(newArr);
            setTextBModificar(newArr2);
            setActivar(newArr3);
        }
    
        const habilitar1 = (key) =>{
            key = parseInt(key);
            const newArr =[];
            const newArr2 = [];
            let c = Object.keys(props.partidas);
            c = c.length;
            setShow1(Array(c).fill(true));
            setTextBVer(Array(c).fill('bi bi-eye'));
            for (let i = 0 ; i < c ; i++){
                if(i === key){
                    newArr[i] = !show1[i];
                    setShow(newArr[i]);
                    if(show1[i] === false){
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
            setShow1(newArr);
            setTextBVer(newArr2);
        }
        /*==========================================================*/

        /*=================================== Eliminación de una partida y sus servicios/productos ===================================*/
        async function SendDeletePartida(id){
            getDatosSP(id);
            //console.log(listaSP);
            const confirmacion = window.confirm("¿Seguro que quieres borrar esta Partida?" );

            if(confirmacion){
                let cSP = Object.keys(listaSP);
                for(let c = 0; c < cSP;c++){
                    try {
                        await axios.delete(url2  +`/api/cotizador/precio/delete/${listaSP[c].sp_id_precio}`);
                        setShow(!show);
                    } catch (error) {}
                }
                try{
                    await axios.delete(url2 +`/api/cotizador/partida/delete/${id}`);
                    alert('Partida eliminada exitosamene');
                } catch (error) {
                    console.log(error);
                    alert('Eliminación de partida invalido')
                }
            }else{

            }
            
        }
        /*============================================================================================================================*/
    /*==============================================================================================================*/

    /*================================================== servicios/productos ==================================================*/
        /*========================= Resumen - servicios/productos de una partida =========================*/
        // Almacenamiento del los servicios_productos
        const[listaSP, setListaSP] = useState([]);

        // Almacenamiento de los proveedores existentes para el buscador
        const [ListaProv, setListaProv] = useState ([]);

        // Almacenamiento de los no de parte existentes para el buscador
        const [ListaNp, setListaNp] = useState ([]);

        // Almacenamiento de las descripciones existentes para el buscador
        const [ListaDes, setListaDes] = useState ([]);

        // Función que realiza la consulta a las tablas servicio_producto y proveedores
        async function getDatosSP(partida_id){
            try{
                const resPSP = await axios.get(url2 +`/api/cotizador/sp/viewPSP/${partida_id}`);
                setListaSP(resPSP.data.data);
                const respuesta = await axios.get(url + '/api/cotizador/proveedor/view');
                setListaProv(respuesta.data.data);
                const resNp = await axios.get(url + '/api/cotizador/sp/viewSpnp');
                setListaNp(resNp.data.data);
                const resDes = await axios.get(url + '/api/cotizador/sp/viewSpd');
                setListaDes(resDes.data.data);

            }catch(error){
                console.log(error);
            }
        }

        const [namePar,setNamePar] = useState('')

        function getNamePar(partida){
            setNamePar(partida.partida_nombre);
            //console.log(namePar);
        }
        /*================================================================================================*/

        /*========================= Envío de nuevos datos =========================*/
        const [first,setfirst] = useState(false);

        const {actualizacionSP} = EditSP();

        const envioDataSp = (nP, dataProv, nM, dataM,newdata, key, data) => {
            if(first){
                actualizacionSP(nP[key],dataProv,nM[key],dataM,data[key], newdata);
            }
        }
        /*=========================================================================*/
    /*=========================================================================================================================*/
    return (
        <div className=''>
           {/* <form> */}
               <Animaciones mytext="Partidas" />
 
                <Table>
                    <Thead>
                        <Tr >
                            <Th>ID</Th>
                            <Th>Nombre</Th>
                            <Th>Descripción</Th>
                        {/*     <th>Eliminar</th>
                         */}
                            <Th>Servicios Productos</Th>
                          {/*   <th>Modificar</th> */}
                            <Th></Th>
                        </Tr>
                    </Thead>
                                    
                    <Tbody>
                        {Object.keys(props.partidas).map((key) => (    
                            //checar aqui va los titulos
                            <Tr key={key} >
                                <Td>{props.partidas[key].partida_id}</Td>
                                <Td>
                                {props.partidas[key].partida_nombre} 
                                   
                                </Td>
                                <Td>
                                {props.partidas[key].partida_descripcion}
                                   
                                </Td> 
                        
                        <Td width={"100px"}>
                            {" "}
                            <button
                                className="sn-boton ver"
                                type="button"
                                onClick={() => {
                                    habilitar1(key);
                                    getDatosSP(props.partidas[key].partida_id);
                                    getNamePar(props.partidas[key])
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
                    <div></div>
                ):(
                    <div>
                    {/*=================== Botón Mostrar Lista DIV =====================*/}
                    <br />
                        <CrudSp2
                        sp={listaSP}
                        proveedores={ListaProv}
                        // nP={ListaNp}
                        // descripciones={ListaDes}
                        setfirst={setfirst}
                        envioDataSP={envioDataSp}
                        proyecto={props.proyecto}
                        partida={namePar}
                        />    
                    </div>
                )}
            {/* </form> */}
        </div>
    )
}