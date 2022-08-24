import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Animaciones from "../../../Componentes/Animaciones";
//Componentes
import { EditProvs } from "../Routes/ModificarProveedor";
import { url } from "../../../Componentes/Ocultar";
import { CrudProveedores } from "../Routes/CRUDProveedores";



function AdministrarProveedor() {

  /*======================================== Buscador de proveedores ========================================*/
  //Almacenamiento de todos los proveedores existentes
  const [listaProv, setListaProv] = useState([]);

  //Almacenamiento de los proveedores semejantes al nombre introducido
  const [suggestions, setSuggestions] = useState([]);

  // Almacenamiento de la clave introducida del proyecto 
  const [nombreProv, setNombreProv] = useState([]);

  // Función que realiza la consulta a la tabla proyectos 
  const getProvs = async () => {
    try {
      const resProv = await axios.get(url + '/api/cotizador/proveedor/view');
      setListaProv(resProv.data.data);
      setSuggestions(resProv.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  //const [actualizarProvs,setActualizarProvs] = useState(false);

  useEffect(() => {
    getProvs();
  }, [])

  useEffect(() => {
    if (nombreProv === '') {
      setSuggestions(listaProv);
    }
  }, [nombreProv])

  //Función que realiza la busqueda de los proveedores semejantes al nombre e introducido
  const onChangeTextNombreProv = (nProv) => {
    let coincidencias = [];
    if (nProv !== '') {
      coincidencias = listaProv.filter(proveedor => {
        const regex = new RegExp(`${nProv}`, "gi");
        return proveedor.proveedor_nombre.match(regex)
      })
      //console.log(coincidencias);
      //console.log(listaProv);
    }
    setSuggestions(coincidencias);
    setNombreProv(nProv);
  }
  /*=======================================================================================================*/
  const { actualizacion } = EditProvs();
  const [first, setfirst] = useState(false);

  const envioData = (datos, key, data) => {
    if (first) {
      actualizacion(datos[key], data);
    }
  };


  return (
    <div className="">


{/* 
        <div className="buscador-inteligente">
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2"
              type="search"
              placeholder="Buscar por Clave 🔎"
              aria-label="Search"
              name="proyecto_clave"
              onChange={e => onChangeTextNombreProv(e.target.value)}
              value={nombreProv}

            />
          </form>
        </div>
 */}


        <div>
          {/*=================== Botón Mostrar Lista DIV =====================*/}
    
          <CrudProveedores
            proveedores={suggestions}
            setfirst={setfirst}
            envioData={envioData}
          //setActualizarProvs={setActualizarProvs}
          />
        </div>
      </div>

  );
}

export default AdministrarProveedor;