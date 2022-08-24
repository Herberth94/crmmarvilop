import axios from "axios";
import { useState } from "react";
import {url, url2} from "../../../Componentes/Ocultar";




export const InsertDatosMarca = () => {
    /*=================================== Inserción de datos en la tabla proveedor ===================================*/

    // Almacenamiento de los datos
    const[datosMarca, setDatosMarca] = useState({
        marca_nombre:''
    })
    // Función que obtiene los datos introducidos en los inputs 
    const handleInputChange = (event) =>{
        setDatosMarca({
            ...datosMarca,[event.target.name] : event.target.value ,
        })
    }
    
    // Función que realiza la inserción de los datos a la tabla proveedor en la bd 
    async function SendMarca (nombreProv,ListaProv){
        //console.log(nombreProv);
        // Almacenamiento del id del proveedor encontrado en la busqueda
        let proveedorId = {proveedor_id:''}
        
        // Almacenamiento del id de la marca encontrada en la busqueda
        let marcaId = {marca_id:''}

        // Obtención del id del proveedor que se seleccionó en la búsqueda
        let i = Object.keys(ListaProv);
        for (let c = 0; c < i.length; c++) {
            if (nombreProv === ListaProv[c].proveedor_nombre) {
                proveedorId.proveedor_id = ListaProv[c].proveedor_id
                //console.log('proveedor id:',proveedorId);
            }        
        }

        const data = {
            marca_nombre:datosMarca.marca_nombre.toUpperCase()
        };

        //console.log("proveedor id", proveedorId.proveedor_id);
        if (proveedorId.proveedor_id !== '' && datosMarca.marca_nombre !== ''){
            try{
                const resMarcas = await axios.get( url + '/api/cotizador/marca/view');
                //console.log(resMarcas.data.data);
                // Obtención del id de la marca que se seleccionó en la búsqueda
                let i1 = Object.keys(resMarcas.data.data);
                for (let c = 0; c < i1.length; c++) {
                    if (datosMarca.marca_nombre.toUpperCase() === resMarcas.data.data[c].marca_nombre.toUpperCase()) {
                        marcaId.marca_id = resMarcas.data.data[c].marca_id
                    //console.log('proveedor id:',proveedorId);
                    }        
                }
                console.log('ProveedorId:',proveedorId.proveedor_id);
                console.log('Se encontro la Marca:', 'Id:',marcaId.marca_id);
                if(marcaId.marca_id !== ''){
                    const respuesta = await axios.post( url2 +`/api/cotizador/marca/agregarPM/${proveedorId.proveedor_id}/${marcaId.marca_id}`);
                    const respuestaBack = respuesta.data.msg
                    //console.log(respuestaBack)
                    alert(respuestaBack)
                }else{
                    const respuesta = await axios.post( url2 +`/api/cotizador/marca/agregar/${proveedorId.proveedor_id}`, data); 
                    const respuestaBack = respuesta.data.msg
                    //console.log(respuestaBack)
                    alert(respuestaBack)
                }
                
            }catch (error){
                console.log(error);
                alert('Registro de marca invalido')
            }
        }else{
            alert('¡ERROR! Debes ingresar todos los campos solicitados')
        }
    }

    const enviarDatosMarca = (event,nombreProv,setNombreProv, ListaProv) =>{
        SendMarca(nombreProv, ListaProv);
        event.preventDefault()
        event.target.reset();
        setNombreProv('');
    }

    
    
    /*==============================================================================================================*/
    return{
        handleInputChange,
        enviarDatosMarca
    }
};
