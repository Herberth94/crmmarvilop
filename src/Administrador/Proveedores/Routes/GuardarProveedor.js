import axios from "axios";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { url } from "../../../Componentes/Ocultar";



export const InsertDatosProvedor = () => {
    /*=================================== Inserción de datos en la tabla proveedor ===================================*/

    // Almacenamiento de los datos
    const [datosProv, setDatosProv] = useState({
        proveedor_nombre: '',
        proveedor_telefono: '',
        proveedor_email: ''
    });

    // Función que obtiene los datos introducidos en los inputs 
    const handleInputChange = (event) => {
        setDatosProv({
            ...datosProv, [event.target.name]: event.target.value,
        })
    }

    // Función que realiza la inserción de los datos a la tabla proveedor en la bd 
    async function SendProveedor() {
        const data = {
            proveedor_nombre: datosProv.proveedor_nombre.toUpperCase(),
            proveedor_telefono: datosProv.proveedor_telefono,
            proveedor_email: datosProv.proveedor_email
        };
        //console.log(id);
        if (data.proveedor_nombre.toUpperCase() !== '') {
            //console.log(data.proveedor_nombre)
            try {
                const resProvs = await axios.get(url + "/api/cotizador/proveedor/view");
                console.log(resProvs.data.data);
                let k = Object.keys(resProvs.data.data);
                k = k.length;
                const arrayNoExiste = [];
                for(let c = 0 ; c < k ; c++){
                    if(datosProv.proveedor_nombre.toUpperCase() === resProvs.data.data[c].proveedor_nombre.toUpperCase()){
                        arrayNoExiste[c] = false;
                     }else{
                        arrayNoExiste[c] = true;
                         //alert('¡ERROR!: El Proveedor ya se encuentra registrado ')
                     }
                }
                const notFound = arrayNoExiste.filter(array => array === true);
                // console.log(arrayNoExiste);
                // console.log('Existentes principio',k);
                // console.log('Existentes Final',notFound.length);
                let insertar;
                if(k === notFound.length){
                    insertar = true;
                    //console.log('No existe un Proveedor similar, se puede realizar la insersión');
                }else{
                    insertar = false;
                    alert('No se puede realizar la inserción, ya existe el Proveedor');
                }

                if(insertar){
                    const respuesta = await axios.post(url + '/api/cotizador/proveedor/agregar', data);
                    const respuestaBack = respuesta.data.msg
                    console.log(respuestaBack)
                    alert(respuestaBack)
                }
            }
            catch (error) {
                console.log(error);
            }
        } else {
            alert("Error en el registro, verifica que los datos ingresados sean correctos")

        }
    }

    const enviarDatosProv = (event) => {
        SendProveedor();
        event.preventDefault()
        event.target.reset();
    }



    /*==============================================================================================================*/
    return {
        handleInputChange,
        enviarDatosProv
    }
};
