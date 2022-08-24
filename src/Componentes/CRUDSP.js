import axios from 'axios';
import React ,{useState, useEffect} from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Animaciones from './Animaciones';

import { EditPrecio } from '../Routes/ModificarPrecio';
import { CrudPrecios } from './CRUDPrecios';
import { pEstatus } from '../Preventa/PTN-BOM/Routes/CRUDProyectos';

import {url, url2} from "./Ocultar"



export const CrudSp = (props) => {
    /*======================================== Habilitar/Deshabilitar ========================================*/
    const [enable, setenable] = useState([]);//Inputs
    /*==================================================================================================================*/
    /*========================== Mostrar/Ocultar ==========================*/
    const [show,setShow] = useState(true);// Tabla de precios
    const [activar, setActivar] = useState([]);
    const [textBModificar,setTextBModificar] = useState([]);//Texto de los botones de modificar
    const [textBVer,setTextBVer] = useState([]);// Texto de los botones de mostrar
    const [show1,setShow1] = useState([]);
    /*=====================================================================*/

    /*================================================== SP ==================================================*/
        /*========================= Editar =========================*/
        const [data,setData] = useState ({
            sp_no_parte:'',
            sp_descripcion:'',
            sp_meses:'',
            sp_semanas: '',
            sp_id_categoria:'',
            sp_comentarios:''      
        });

        const handleInputChange = (event) => {
            setData ({
            ...data,[event.target.name] : event.target.value ,
            })
        }

        const [datos, Setdatos] = useState();

        // Almacenamiento del nombre del proveedor a buscar
        const [nombreProv, setNombreProv] = useState([]);
        // Almacenamiento del nombre del proveedor a buscar
        const [nombreMarca, setNombreMarca] = useState([]);
        // Almacenamiento del No. de lista de un servicio/producto a buscar
        const [nP, setNP] = useState([]);
        // Almacenamiento de la Descripcion de un servicio/producto a buscar
        const [desc, setDesc] = useState([]);

        useEffect(() => {
            Setdatos(props.sp); 
        },[props.sp]);


        useEffect(() => {
            let i = Object.keys(props.sp)
            i = i.length
            setenable(Array(i).fill(true));
            setActivar(Array(i).fill(true));
            setShow1(Array(i).fill(true));
            setTextBModificar(Array(i).fill('bi bi-pencil-square'));
            setTextBVer(Array(i).fill('bi bi-eye'));

            const arrayNombresProv = []
            const arrayNombresMarca = []
            const arrayNP = [];
            const arrayDesc = [];
            for(let c = 0 ; c < i ;c++){
                arrayNombresProv[c] = props.sp[c].proveedor_nombre;
                arrayNombresMarca[c] = props.sp[c].marca_nombre;
                arrayNP[c] = props.sp[c].spnp_np;
                arrayDesc[c] = props.sp[c].spd_des;
            }
            setNombreProv(arrayNombresProv);
            setNombreMarca(arrayNombresMarca);
            setNP(arrayNP);
            setDesc(arrayDesc);
        },[props.sp])

        
        const habilitar = (key) =>{
            key = parseInt(key);
            const newArr =[];
            const newArr2 = [];
            const newArr3 = [];
            let c1 = Object.keys(props.sp);
            c1 = c1.length;
            for (let i = 0 ; i < c1 ; i++){
                if(i === key){
                    newArr[i] = !enable[i];
                    if(enable[i] === false){
                        newArr2[i] = 'bi bi-pencil-square';
                        setData({
                            ...data,sp_no_parte:'',
                                    sp_descripcion:'',
                                    sp_meses:'',
                                    sp_semanas: '',
                                    sp_id_categoria:'',
                                    sp_comentarios:''  
                        })
                    }else{
                        newArr2[i] = 'bi bi-check-lg';
                        listaMarcas(props.sp[key].proveedor_nombre);
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

            const arrayNombresProv = [];
            const arrayNombresMarca = [];
            const arrayNP = [];
            const arrayDesc = [];
            if (activar === true){
                for(let c = 0 ; c < c1 ;c++){
                    if(c === key){
                        arrayNombresProv[c] = '';
                        arrayNombresMarca[c] = '';
                        arrayNP[c] = '';
                        arrayDesc[c] = '';
                    }else{
                        arrayNombresProv[c] = nombreProv[c];
                        arrayNombresMarca[c] = nombreMarca[c];
                        arrayNP[c] = nP[c];
                        arrayDesc[c] = desc[c];
                    }
                }
                setNombreProv(arrayNombresProv);
                setNombreMarca(arrayNombresMarca);
                setNP(arrayNP);
                setDesc(arrayDesc);
            } 
        }

        const habilitar1 = (key) =>{
            key = parseInt(key);
            const newArr =[];
            const newArr2 = [];
            let c = Object.keys(props.sp);
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

        /*================================================================ Buscadores ================================================================*/
        /*=================================== Buscador de No. de lista ===================================*/
        // Almacenamiento de los No. de lista semejantes al texto introducido en el input
        const [suggestionsNP, setSuggestionsNP] = useState ([]);

         // Función que realiza la busqueda de los No. lista similares al introducido
         const onChangeTextNP = (noP,key) => {
            let coincidencias = [];
            if(noP.length>0){
                coincidencias = props.listaNP.filter(np => {
                    const regex = new RegExp(`${noP}`, "gi");
                    return np.spnp_np.match(regex)
                })
            }
            setSuggestionsNP(coincidencias);

            key = parseInt(key);
            let i = Object.keys(props.sp)
            i = i.length;
            const arrayNP = []
            for(let c = 0 ; c < i ;c++){
                if(c === key){
                    arrayNP[c] = noP;
                }else{
                    arrayNP[c] = nP[c];
                }
            }
            setNP(arrayNP);
            setData ({
                ...data,['sp_no_parte'] : noP ,
            })
            //console.log(data);
        }

        // Función que obtiene el No. de parte seleccionado
        const onSuggestHandlerNP = (noP,key) => {
            key = parseInt(key);
            let i = Object.keys(props.sp)
            i = i.length;
            const arrayNP = []
            for(let c = 0 ; c < i ;c++){
                if(c === key){
                    arrayNP[c] = noP;
                }else{
                    arrayNP[c] = nP[c];
                }
            }
            setNP(arrayNP);
            setData ({
                ...data,['sp_no_parte'] : noP ,
            })
            //console.log(data);
            //console.log(listaMarca);
            setSuggestionsNP([]);
        }
        /*================================================================================================*/

        /*=================================== Buscador de Descripciones ===================================*/
        // Almacenamiento de las descripciones semejantes al texto introducido en el input
        const [suggestionsDesc, setSuggestionsDesc] = useState ([]);

         // Función que realiza la busqueda de los No. lista similares al introducido
         const onChangeTextDesc = (d,key) => {
            let coincidencias = [];
            if(d.length>0){
                coincidencias = props.listaDesc.filter(des => {
                    const regex = new RegExp(`${d}`, "gi");
                    return des.spd_des.match(regex)
                })
            }
            setSuggestionsDesc(coincidencias);

            key = parseInt(key);
            let i = Object.keys(props.sp)
            i = i.length;
            const arrayDesc = []
            for(let c = 0 ; c < i ;c++){
                if(c === key){
                    arrayDesc[c] = d;
                }else{
                    arrayDesc[c] = desc[c];
                }
            }
            setDesc(arrayDesc);
            setData ({
                ...data,['sp_descripcion'] : d ,
            })
        }

        // Función que obtiene el No. de parte seleccionado
        const onSuggestHandlerDesc = (d,key) => {
            key = parseInt(key);
            let i = Object.keys(props.sp)
            i = i.length;
            const arrayDesc = []
            for(let c = 0 ; c < i ;c++){
                if(c === key){
                    arrayDesc[c] = d;
                }else{
                    arrayDesc[c] = desc[c];
                }
            }
            setDesc(arrayDesc);
            setData ({
                ...data,['sp_descripcion'] : d ,
            })
            //console.log(listaMarca);
            setSuggestionsDesc([]);
        }
        /*================================================================================================*/

        /*=================================== Buscador de proveedores ===================================*/
        // Almacenamiento del id del proveedor encontrado en la busqueda
        var proveedorId = {proveedor_id:''}

        // Almacenamiento de los proveedores semejantes al texto introducido en el input
        const [suggestionsProv, setSuggestionsProv] = useState ([]);

        // Función que realiza la busqueda de los clientes semejantes a al nombre introducido 
        const onChangeTextProv = (nP,key) => {
            let coincidencias = [];
            if(nP.length>0){
                coincidencias = props.proveedores.filter(proveedor => {
                    const regex = new RegExp(`${nP}`, "gi");
                    return proveedor.proveedor_nombre.match(regex)
                })
            }
            setSuggestionsProv(coincidencias);

            key = parseInt(key);
            let i = Object.keys(props.sp)
            i = i.length;
            const arrayNombresProv = []
            for(let c = 0 ; c < i ;c++){
                if(c === key){
                    arrayNombresProv[c] = nP;
                }else{
                    arrayNombresProv[c] = nombreProv[c];
                }
            }
            setNombreProv(arrayNombresProv);
        }

        // Almacenamiento de las marcas existentes
        const [listaMarca, setListaMarca] = useState ([]);
        // Función que realiza la consulta a la tabla marca
        async function listaMarcas(proveedor){
            let i = Object.keys(props.proveedores);
            for (let c = 0; c < i.length; c++) {
            if (proveedor === props.proveedores[c].proveedor_nombre) {
                proveedorId.proveedor_id = props.proveedores[c].proveedor_id
                //console.log('proveedor id:',proveedorId);
                }
            }
            try {
                if(proveedorId.proveedor_id !== ''){
                    const respuesta = await axios.get(url2 + `/api/cotizador/provmarcas/view/${proveedorId.proveedor_id}`);
                    setListaMarca(respuesta.data.data);
                }
            } catch (error) {console.log(error);}
        }


        // Función que obtiene el nombre del cliente seleccionado
        const onSuggestHandlerProv = (nP,key) => {
            key = parseInt(key);
            let i = Object.keys(props.sp)
            i = i.length;
            const arrayNombresProv = []
            for(let c = 0 ; c < i ;c++){
                if(c === key){
                    arrayNombresProv[c] = nP;
                }else{
                    arrayNombresProv[c] = nombreProv[c];
                }
            }
            setNombreProv(arrayNombresProv);
            listaMarcas(nP);
            
            //console.log(listaMarca);
            setSuggestionsProv([]);
        }
        /*============================================================================================*/

        /*=================================== Buscador de marcas con respecto al proveedor seleccionado ===================================*/
        // Almacenamiento de los proveedores semejantes al texto introducido en el input
        const [suggestionsMarca, setSuggestionsMarca] = useState ([]);

        // Función que realiza la busqueda de los clientes semejantes a al nombre introducido 
        const onChangeTextMarca = (nM,key) => {
            let coincidencias = [];
            if(nM.length>0){
            coincidencias = listaMarca.filter(marca => {
                const regex = new RegExp(`${nM}`, "gi");
                return marca.marca_nombre.match(regex)
                })
            }

            setSuggestionsMarca(coincidencias);
            key = parseInt(key);
            let i = Object.keys(props.sp)
            i = i.length;
            const arrayNombresMarca = []
            for(let c = 0 ; c < i ;c++){
                if(c === key){
                    arrayNombresMarca[c] = nM;
                }else{
                    arrayNombresMarca[c] = nombreMarca[c];
                }
            }
            setNombreMarca(arrayNombresMarca);
        }

        // Función que obtiene el nombre del cliente seleccionado
        const onSuggestHandlerMarca = (nM, key) => {
            key = parseInt(key);
            let i = Object.keys(listaMarca)
            i = i.length;
            const arrayNombresMarca = []
            for(let c = 0 ; c < i ;c++){
                if(c === key){
                    arrayNombresMarca[c] = nM;
                }else{
                    arrayNombresMarca[c] = nombreMarca[c];
                }
            }
            setNombreMarca(arrayNombresMarca);
            setSuggestionsMarca([]);
        }
        
        /*============================================================================================*/
        /*============================================================================================================================================*/
        
        /*=================================== Eliminación de un servicio/producto junto con sus precios ===================================*/
        /*=================================================================================================================================*/
        async function SendDeleteSP(id){
            //console.log(id);
            try {
                const confirmacion = window.confirm("¿Seguro que quieres borrar esta Partida?" );

                if(confirmacion){
                    await axios.delete(url2 + `/api/cotizador/precio/delete/${id}`);
                    alert('Servicio/producto eliminado exitosamente')
                }else{

                }
                
            } catch (error) {
                console.log(error);
                alert('Eliminación del Servicio/producto invalido')
            }
        }

        function deleteSP(id){
            if(pEstatus === 'Aceptado'){
                alert('El proyecto no puede ser editado porque ha sido Aceptado')
            }else if(pEstatus === 'En revision'){
                alert('El proyecto no puede ser editado porque se encuentra En revision')
            }else{
                SendDeleteSP(id);
            }
        }
        /*=================================================================================================================================*/
    /*========================================================================================================*/

    /*================================================== Precios ==================================================*/
        /*======================================== Resumen deL precio de un servicio/producto ========================================*/
        // Almacenamiento del precio 
        const[listaPrecios, setListaPrecios] = useState([]);

        // Función que realiza la consulta a la tabla precios
        async function getDatosPrecios(sp_id){
            try{
                const resPrecSP = await axios.get(url2 + `/api/cotizador/precio/viewSPP/${sp_id}`);
                setListaPrecios(resPrecSP.data.data);
            }catch(error){
                console.log(error);
            }
        }

        const [npSP,setNPSP] = useState('');
        const [desSP,setDesSP] = useState('');
        function getNameSp (sp){
            setNPSP(sp.spnp_np);
            setDesSP(sp.spd_des);
        }
        /*============================================================================================================================*/

        /*========================= Envío de nuevos datos =========================*/
        const [first,setfirst] = useState(false);

        const {actualizacionPrecio} = EditPrecio();
        
        const envioDataPrecio = (estado,data, key, newdata) => {
            if(first){
                actualizacionPrecio(estado,data[key], newdata);
            }
        }
        /*=========================================================================*/
    /*=============================================================================================================*/


    return (
        <div className=''>
             <br/>
            <br/>
            <br/>
            
           {/* <form> */}
                {/******************Lista de los servicios/productos de una partida ****************************************/}
                {/*============= Titulo Animación =============*/}
                <Animaciones mytext="Servicios/Productos" />
                <Table>
                    <Thead>
                     
                        <Tr >
                            <Th>ID</Th>
                            <Th># Parte</Th>
                            <Th>Descripción</Th>
                            <Th>Duración Meses</Th>
                            <Th>Entrega Semanas</Th>
                            <Th>Proveedor</Th>
                            <Th>Marca</Th>
                            <Th>Categoria</Th>
                            <Th>Comentarios</Th>
                            <Th>Eliminar</Th>
                            <Th>Precios</Th>
                            <Th>Modificar</Th>
                            <Th></Th>
                        </Tr>
                        </Thead>

                        <Tbody>
                            {Object.keys(props.sp).map((key) => (    
                            <Tr key={key} >
                                <td>{props.sp[key].sp_id}</td>
                               <Td>
                                    <input
                                    value={nP[key]} 
                                    disabled={enable[key]} 
                                    onChange={e => onChangeTextNP(e.target.value, key)}
                                    name="sp_no_parte" 
                                    />
                                    {Object.keys(suggestionsNP).map((i)=>
                                    {if(enable[key]){
                                        return(
                                        <></>
                                        )
                                    }else{
                                        return(
                                            <div 
                                            key={i} 
                                            className="selectCliente" 
                                            onClick={() => onSuggestHandlerNP(suggestionsNP[i].spnp_np,key)}
                                            >
                                                {suggestionsNP[i].spnp_np}
                                            </div>
                                        )
                                    }}
                                    )}

                                </Td>  
                                <Td>
                                    <input
                                    value={desc[key]} 
                                    disabled={enable[key]} 
                                    onChange={e => onChangeTextDesc(e.target.value, key)}
                                    name="sp_descripcion" 
                                    />
                                    {Object.keys(suggestionsDesc).map((i)=>
                                    {if(enable[key]){
                                        return(
                                        <></>
                                        )
                                    }else{
                                        return(
                                            <div 
                                            key={i} 
                                            className="selectCliente" 
                                            onClick={() => onSuggestHandlerDesc(suggestionsDesc[i].spd_des,key)}
                                            >
                                                {suggestionsDesc[i].spd_des}
                                            </div>
                                        )
                                    }}
                                    )}

                                </Td> 
                                <Td>
                                    <input
                                  
                                    defaultValue={props.sp[key].sp_meses} 
                                    disabled={enable[key]} 
                                    onChange={handleInputChange}
                                    name="sp_meses" 
                                    ></input>
                                </Td>
                                <Td >
                                    <input
                                 
                                    defaultValue={props.sp[key].sp_semanas} 
                                    disabled={enable[key]} 
                                    onChange={handleInputChange}
                                    name="sp_semanas" 
                                    ></input>
                                </Td>
                                <Td>
                                    {" "}
                                    <input
                                  
                                    type="text"
                                    name="proveedor_nombre"
                                    onChange={e => onChangeTextProv(e.target.value, key)}
                                    value={nombreProv[key]}
                                    disabled={enable[key]} 
                                    placeholder="Proveedor"
                                    />
                                    {Object.keys(suggestionsProv).map((i)=>
                                    {if(enable[key]){
                                        return(
                                        <></>
                                        )
                                    }else{
                                        return(
                                            <div 
                                            key={i} 
                                            className="selectCliente" 
                                            onClick={() => onSuggestHandlerProv(suggestionsProv[i].proveedor_nombre,key)}
                                            >
                                                {suggestionsProv[i].proveedor_nombre}
                                            </div>
                                        )
                                    }}
                                    )}
                                </Td>
                                <Td >
                                    {" "}
                                    <input
                                   
                                    type="text"
                                    name="marca_nombre"
                                    onChange={e => onChangeTextMarca(e.target.value,key)}
                                    value={nombreMarca[key]}
                                    disabled={enable[key]} 
                                    placeholder="Marca"
                                    />
                                    {Object.keys(suggestionsMarca).map((i)=>
                                    {if(enable[key]){
                                        return(
                                            <></>
                                        )
                                    }else{
                                        return(
                                            <div 
                                            key={i} 
                                            className="selectCliente" 
                                            onClick={() => onSuggestHandlerMarca(suggestionsMarca[i].marca_nombre,key)}
                                            >
                                                {suggestionsMarca[i].marca_nombre}
                                            </div>
                                        )
                                    }}
                                    
                                    )}
                                </Td>
                                <Td width={"200px"}>
                                    {" "}
                                    <select 
                                    id="lista-opciones" 
                                    name="sp_id_categoria" 
                                    defaultValue={props.sp[key].sp_id_categoria} 
                                    disabled={enable[key]} 
                                    onChange={handleInputChange}>
                                        <option value={0}></option>
                                        <option value={1}>Tecnología Principal</option>
                                        <option value={2}>Sub-tecnología</option>
                                        <option value={3}>Equipamiento</option>
                                        <option value={4}>Licencia</option>
                                        <option value={5}>Soporte</option>
                                        <option value={6}>Implementación</option>
                                    </select>
                                </Td> 
                                <Td>
                                    <input
                        
                                    defaultValue={props.sp[key].sp_comentarios} 
                                    disabled={enable[key]} 
                                    onChange={handleInputChange}
                                    name="sp_comentarios" 
                                    ></input>
                                </Td>
                                <Td>
                                    <button 
                                    className="sn-boton eliminar"
                                    onClick={()=>{
                                        deleteSP(props.sp[key].sp_id_precio)
                                    }}
                                    >

<i class="bi bi-trash-fill"></i>
                                    
                                    
                                    
                                     </button>
                                </Td>



                                <Td>
                                    <button 
                                    className="sn-boton ver" 
                                    onClick={() => {
                                        getDatosPrecios(props.sp[key].sp_id); 
                                        habilitar1(key);
                                        getNameSp(props.sp[key]);
                                    }}
                                    >
                                      <i className=     {textBVer[key]}  ></i>
                                   
                                    </button>
                                </Td>



                           {/*      <td>
                                <button 
                                    className="btn btn-primary Mod" 
                                    onClick={()=>{
                                        habilitar(key); 
                                        props.envioDataSP(nombreProv, props.proveedores,nombreMarca, listaMarca, data, key, datos);
                                        props.setfirst(activar[key]);
                                    }}
                                    >{textBModificar[key]}
                                    </button> 
                                </td>  */}



                                
{enable[key] ? (
                                <Td >
                                    <button 
                                    className=  "sn-boton" type="button"
                                    onClick={()=>{
                                    //    props.envioData(datos,key,data); 
                                        habilitar(key); 
                                        props.setfirst(activar[key]); 
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
                                        props.envioDataSP(nombreProv, props.proveedores,nombreMarca, listaMarca, data, key, datos);
                                        props.setfirst(activar[key]);
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
                                        props.setfirst(activar[key]); 
                                        setSuggestionsProv('');
                                        setSuggestionsMarca('');
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
                {show ? (
                                <></>
                            ):(
                            <>
                            {/*=================== Botón Mostrar Lista DIV =====================*/}
                            <br />
                                <CrudPrecios
                                precios={listaPrecios}
                                setfirst={setfirst}
                                envioDataPrecio={envioDataPrecio}
                                proyecto={props.proyecto}
                                partida={props.partida}
                                np={npSP}
                                des={desSP}
                                estado={true}
                                />    
                            </>
                            )}
                
            {/* </form> */}
        </div>
    )
}