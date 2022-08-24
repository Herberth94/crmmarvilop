import React from "react";
import { useState } from "react";
import "../css/PTN_BOM.css";
import Table from "react-bootstrap/Table";


import Animaciones from "../../../Componentes/Animaciones";
import NuevoProyecto from "../Menu-Bom/NuevoProyecto";
import ContinuarProyecto from "../Menu-Bom/ContinuarProyecto";
import Proyectos from "../Menu-Bom/ResumenProyectos";
import { InsertDatosPartida } from '../Routes/GuardarPartida';
import { getIdPar } from '../Menu-Bom/DatosSP';
import { InsertDatosCats } from "../Routes/GuardarDatosCategorias";
import { getIdP2 } from "../Menu-Bom/NuevoProyecto";
import axios from "axios";
import Cookies from "universal-cookie";

function PTN_BOM() {
  {
    /*========================== Mostrar Ocultar Tabla ==========================*/
  }
  const [show, setShow] = useState(true);

  {
    /*========================== Mostrar Ocultar Botón ==========================*/
  }
  const [show2, setShow2] = useState(true);

  {
    /*========================== Mostrar Ocultar Datos Adicionales ==========================*/
  }
  const [show3, setShow3] = useState(true);

  const {getIdP} = InsertDatosPartida();
  const {getIdP1} = InsertDatosCats();
  
  // Función que realiza la consulta a la tabla proyectos 
  


  return (
    <div className="contenido-usuarios">
      {/*======================= Titulo Animación =======================*/}

      <Animaciones mytext=" Cotizaciones " />

      {/*========================== Tabla  Categorias ==========================*/}
      <Table  >
        {/*========================== Titulos Tabla ==========================*/}
        <thead>
          <tr className="titulo-tabla-usuarios">
            <th className="ocultar">Nuevo Proyecto</th>
            <th className="ocultar">Continuar Proyecto</th>
            <th className="ocultar"> Resumen </th>
          </tr>
        </thead>
        <tbody>
          <tr className="headerPropuesta">
            {/*========================== Nuevo Proyecto ==========================*/}
            <td>
              <button
                className="btn btn-primary modificar"
                type="button"
                onClick={() => {
                  getIdP('');
                  getIdPar('');
                  getIdP1('');
                  setShow(!show);
                  setShow2(true);
                  setShow3(true);
                }}
              >
                {" "}
                {show ? "Nuevo proyecto" : "Ocultar Proyecto"}{" "}
              </button>
              {show ? (
                <div></div>
              ) : (
                <div className="arregla divBuscadorInteligente">
                  {/*========================== Llamado al Componente ==========================*/}
                  <NuevoProyecto />
                </div>
              )}
            </td>

            <td>
              <button
                className="btn btn-primary modificar"
                type="button"
                onClick={() => {
                  getIdP2(''); 
                  setShow2(!show2);
                  setShow(true);
                  setShow3(true);
                }}
              >
                {" "}
                {show2 ? "Continuar Proyecto" : "Ocultar Proyecto"}{" "}
              </button>
              {show2 ? (
                <div></div>
              ) : (
                <div className="arregla divBuscadorInteligente" >
                  {/*========================== Llamado al Componente ==========================*/}
                  <ContinuarProyecto />
                </div>
              )}
            </td>

            <td>
              <button
                className="btn btn-primary modificar"
                type="button"
                onClick={() => {
                  setShow3(!show3);
                  setShow(true);
                  setShow2(true);
                }}
              >
                {" "}
                {show3 ? "Resumen" : "Ocultar Proyecto"}{" "}
              </button>
              {show3 ? (
                <div></div>
              ) : (
                <div className="arregla">
                  {/*========================== Llamado al Componente ==========================*/}
                  <Proyectos />
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default PTN_BOM;