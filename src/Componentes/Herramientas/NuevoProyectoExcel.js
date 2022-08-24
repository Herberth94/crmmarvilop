import React from "react";
import { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import axios from 'axios';
import Cookies from 'universal-cookie';
import swal from "sweetalert";
//Componentes
import Animaciones from "../Animaciones";
import Excel from "./excel";
import { url, url2 } from  "../Ocultar";


//Obtención del id del usuario con sesión activa
const cookies = new Cookies();
export let validatorid = cookies.get('id_usuario');

//Obtención de la fecha
const tiempoTranscurrido = Date.now();
export const hoy = new Date(tiempoTranscurrido);

// export let pId2;
// export function getIdP2 (proyecto_id){
//   pId2 = proyecto_id;
//   //console.log('Ultimo proyecto creado:',pId1);
// }

function NuevoProyectoExcel() {

  /*========================== Mostrar Ocultar Tabla ==========================*/
  const [show, setShow] = useState(true);
  const [idCliente, setIdCliente] = useState();

  

  const getProyectos = async () => {
    try{
      const resProy = await axios.get(url2 + `/api/cotizador/proyecto/viewpreventas/${validatorid}`);
      let proy = resProy.data.data.pop(); 
      //getIdP2(proy.proyecto_id);
    }catch(error){console.log(error);}
  }

  useEffect(()=>{
    getProyectos();
  },[])



  /*=================================== Buscador de clientes ===================================*/
  // Almacenamiento de los clientes existentes
  const [ListaC, setListaC] = useState([]);

  // Almacenamiento del id cliente encontrado en la busqueda
  var clienteId = { proyecto_id_cliente: '' }

  // Almacenamiento del nombre del cliente a buscar
  const [nombreC, setNombreC] = useState('');

  // Almacenamiento de los clientes semejantes al texto introducido en el input
  const [suggestions, setSuggestions] = useState([]);

  const [clavep, setclavep] = useState([])
  // Función que realiza la consulta a la tabla clientes
  useEffect(() => {
    async function listaClientes() {
      try {
        const respuesta = await axios.get(url + "/api/cotizador/clientes/view");
        setListaC(respuesta.data.reSql);
      } catch (error) { }
    }
    listaClientes();
  }, [])

  // Función que realiza la busqueda de los clientes semejantes a al nombre introducido 
  const onChangeTextCliente = (nombreC) => {
    let coincidencias = [];
    if (nombreC.length > 0) {
      coincidencias = ListaC.filter(cliente => {
        const regex = new RegExp(`${nombreC}`, "gi");
        return cliente.nombre_cliente.match(regex)
      })
    }
    setSuggestions(coincidencias);
    setNombreC(nombreC);
  }

  // Función que obtiene el nombre del cliente seleccionado
  const onSuggestHandler = (nombreC) => {
    setNombreC(nombreC);
    let i = Object.keys(ListaC);
    for (let c = 0; c < i.length; c++) {
      if (nombreC === ListaC[c].nombre_cliente) {
        setIdCliente(ListaC[c].cliente_id);
        //console.log(clienteId);
      }
    }
    //console.log(idCliente)
    setSuggestions([]);
  }
  /*============================================================================================*/

  /*=================================== Obtención de datos para la tabla proyecto ===================================*/
  // Almacenamiento de los datos
   const [datos, setDatos] = useState([{
    proyecto_clave: '',
    proyecto_descripcion: '',
    proyecto_plazo_meses: ''
  }]);

  // Obtención de los datos introducidos en los input
  const handleInputChange = (event) => {
    setDatos({
      ...datos, [event.target.name]: event.target.value,
    })
  }

  function notificacion (state){
    if(state === true){
      swal({
        title: "Listo",
        text: "Proyecto resgistrado correctamnete",
        icon: "success",
        button: "Cerrar" 
      })
    }else{
      swal({
        title: "Error",
        text: "Error al crear el proyecto",
        icon: "warning",
        button: "Cerrar" 
      })
    }
  }

  

  // Función que realiza la inserción del proyecto
  async function Send() {
    //console.log(hoy);
    // Obtención del id del cliente que se seleccionó en la búsqueda
    let i = Object.keys(ListaC);
    for (let c = 0; c < i.length; c++) {
      if (nombreC === ListaC[c].nombre_cliente) {
        clienteId.proyecto_id_cliente = ListaC[c].cliente_id
        //console.log(clienteId);
      }
    }

    const data = {
      proyecto_clave: datos.proyecto_clave,
      proyecto_descripcion: datos.proyecto_descripcion,
      proyecto_id_cliente: clienteId.proyecto_id_cliente,
      proyecto_fecha_creacion: hoy,
      proyecto_fecha_modificacion: hoy,
      proyecto_plazo_meses: datos.proyecto_plazo_meses
    };

    try {
      /*=================================== Inserción de proyecto con condicionante ===================================*/
      //Consulta de los usuarios registrados
      const resUsers = await axios.get(url + '/api/cotizador/users/view');
      let i = Object.keys(resUsers.data.reSql);
      i = parseInt(i.length);

      let notFound;//Variable que confirma que el usuario no esta registrado 
      let newArray = [];//Arreglo que se llena el numero de veces que no coinciden los id´s

      //Recorrido y comparación entre los usuarios registrados en la bd y el usuario activo
      for (let cont = 0; cont < i; cont++) {
        if (validatorid !== '' && parseInt(validatorid) === parseInt(resUsers.data.reSql[cont].id_usuario)) {
          const clave = await axios.post(url2 + `/api/cotizador/proyecto/agregar/${validatorid}`, data);
          setclavep(clave.data.id_proyecto);
          notificacion(clave.data.estado);
          const claveRespuestaBack = clave.data.msg
          alert(claveRespuestaBack);
        } else if (validatorid === '' || parseInt(validatorid) !== parseInt(resUsers.data.reSql[cont].id_usuario)) {
          newArray[cont] = true;
        }
      }
      //Filtro para extraer los datos que se han llenado con true
      let i1 = newArray.filter(nA => true);
      i1 = i1.length;
      //Comparación del numero de usuarios registrados en la bd con el numero de usuarios no encontrados
      if (i1 === i) {
        notFound = true;
      }
      if (notFound) {
        alert('Error al registrar el Proyecto')
        alert('El usuario que esta activo no se encuentra registrado');
      }
      /*===============================================================================================================*/
    } catch (error) {
      alert('Registro invalido del Proyecto')
    }
  }

  const enviarDatos = () => {
    if(show === true){
      Send();
      setDatos({
        ...datos, proyecto_clave: '',
                  proyecto_descripcion: '',
                  proyecto_plazo_meses: ''
      });
      setNombreC('');
    // event.preventDefault()
    // event.target.reset();
    }
  }

  function validar(){
    if (datos.proyecto_clave === '') {
      //console.log(clienteId.proyecto_id_cliente)
      swal({
        title: "Clave de Proyecto",
        text: "Ingresa la Clave del Proyecto",
        icon: "warning",
        button: "Cerrar" 
      })
        return false;
    }   
    else if(nombreC === '') {
      //console.log(clienteId.proyecto_id_cliente)
      swal({
        title: "Nombre del cliente",
        text: "Ingresa el nombre del cliente",
        icon: "warning",
        button: "Cerrar" 
      })
        return false;
    }else if(idCliente === '' || idCliente === undefined){
      swal({
        title: "Nombre del cliente",
        text: "No se encuentra registrado el cliente ingresado",
        icon: "warning",
        button: "Cerrar" 
      })
    }else{
      if (datos.proyecto_clave !== ''  && nombreC !== '' && idCliente !== '' && idCliente !== undefined) {
        setShow(!show);
        enviarDatos(); 
          return false;
      }
    }
};
  /*=================================================================================================================*/

  return (


    <div className="">

      <div>

        <Animaciones  mytext= "Datos Nuevo Proyecto" />
        
      </div>
      {/*======================= Titulo Animación =======================*/}
    {/*   <div> <Animaciones mytext="Datos Proyecto" /> </div>
 */}
      {/*=======================  Tabla Nuevo Proyecto ======================= */}
      {/* <form action="" method="post" onSubmit={enviarDatos}> */}
        <Table >

          {/*======================= Titulos Tabla ======================= */}


         


          <Thead>
            <Tr>
              <Th>Clave</Th>
              <Th>Descripción</Th>
              <Th> Cliente </Th>
              <Th> Plazo Meses </Th>
              <Th> Agregar Proyecto </Th>
            </Tr>
          </Thead>

          <Tbody>

            <Tr className="">

              {/*=======================  Clave proyecto ======================= */}
              <Td>
                <input
                 
                  type="text"
                  name="proyecto_clave"
                  onChange={handleInputChange}
                  value={datos.proyecto_clave}
                  placeholder="Ingrese Clave"
                />
              </Td>
              {/*======================= Descripción ======================= */}
              <Td>
                <input
                  type="text"
                  name="proyecto_descripcion"
                  onChange={handleInputChange}
                  value={datos.proyecto_descripcion}
                  placeholder="Ingrese Descripción"
                />
              </Td>
              {/*======================= Lista Clientes ======================= */}
              <Td>
                {" "}
                <input
                 
                  type="text"
                  name="nombre_cliente"
                  onChange={e => onChangeTextCliente(e.target.value)}
                  value={nombreC}
                  placeholder="Ingrese el nombre del cliente"
                />
                {suggestions && suggestions.map((suggestion, i) =>
                  <div key={i} className="selectCliente" onClick={() => onSuggestHandler(suggestion.nombre_cliente)}>
                    {suggestion.nombre_cliente}
                  </div>
                )}
              </Td>
              {/*======================= Plazo meses ======================= */}
              <Td>
                <input
                 
                  type="text"
                  name="proyecto_plazo_meses"
                  onChange={handleInputChange}
                  value={datos.proyecto_plazo_meses}
                  placeholder="Ingrese Plazo Meses"
                />
              </Td>
              <Td>
                {/*=======================  Boton Empezar Nuevo proyecto ======================= */}
 {/*                <button className="btn btn-primary modificar" type="submit"> Agregar proyecto  </button> */}
      <button 
      className="btn btn-primary modificar" 
      type="submit" 
      onClick={() => { 
        validar();
      }}>  
      {show ? 'Iniciar' : 'Ocultar Datos'}    
      </button>
      {show ? (
        <div >

        </div>
      ) : 
      
      
      (
        <div className="arregla">
      {/*     <DatosPTN clave={clavep} /> */}

      <Excel   clave={clavep} />

        </div>
      )}
            
              </Td>
            </Tr>
          </Tbody>
        </Table>
    </div>
  )
}

export default NuevoProyectoExcel