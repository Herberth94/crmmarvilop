import React from 'react'
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Animaciones from "../../../Componentes/Animaciones";
import RegistrarUsuarios   from "./RegistrarUsuarios";
import AdministrarUsuarios from "./AdministrarUsuarios";


function MenuUsuarios() {
  /*========================== Mostrar/Ocultar =========================*/
  const [show, setShow] = useState(true);//Componente registrar Usuario
  const [show2, setShow2] = useState(true);// Componentes administrar Usuario
  /*====================================================================*/

  return (
    <div className="contenido-usuarios">
      <Animaciones mytext= " Usuarios " />
      {/*========================== Tabla  Categorias ==========================*/}
      <Table responsive id="nombreDiv">
        {/*========================== Titulos Tabla ==========================*/}
        <thead>
          <tr className="titulo-tabla-usuarios">
            <th className='ocultar'>Registrar Usuarios</th>
            <th className='ocultar'> Administrar Usuarios </th>
          </tr>
        </thead>
        <tbody>
          <tr className="headerPropuesta">
            {/*========================== Divisa ==========================*/}
            <td>
              <button
                className="btn btn-primary modificar"
                type="button"
                onClick={() => {
                  setShow(!show);
                  setShow2(true);
                }}
              >
                {" "}
                {show ? "Registrar Usuarios" : "Ocultar"}{" "}
              </button>
              {show ? (
                <div></div>
              ) : (
                <div className="arregla divBuscadorInteligente">
                  {/*========================== Llamado al Componente ==========================*/}
                  < RegistrarUsuarios />
                </div>
              )}
            </td>

            <td>
              <button
                className="btn btn-primary modificar"
                type="button"
                onClick={() => {
                  setShow2(!show2);
                  setShow(true);
                }}
              >
                {" "}
                {show2 ? "Administrar Usuarios" : "Ocultar"}{" "}
              </button>
              {show2 ? (
                <div></div>
              ) : (
                <div className="arregla">
              





                  {/*========================== Llamado al Componente ==========================*/}
                  <AdministrarUsuarios/>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default MenuUsuarios