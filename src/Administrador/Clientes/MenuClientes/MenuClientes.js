import React from 'react'
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Animaciones from "../../../Componentes/Animaciones";
import RegistrarClientes from "./RegistrarClientes";
import AdministrarClientes from "./AdministrarClientes";

function MenuClientes() {
        //Habilitar/Deshabilitar tabla del resumen AM
        const [show, setShow] = useState(true)
        const [show2, setShow2] = useState(true)
  return (
 
 
 <div className="contenido-usuarios">


<Animaciones mytext= "Clientes" />

{/*========================== Tabla  Categorias ==========================*/}
<Table responsive id="nombreDiv">
  {/*========================== Titulos Tabla ==========================*/}
  <thead>
    <tr className="titulo-tabla-usuarios">
      <th className='ocultar'>Registrar Clientes</th>
      <th className='ocultar'>Administrar Clientes </th>
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
          {show ? "Registrar Clientes" : "Ocultar"}{" "}
        </button>
        {show ? (
          <div></div>
        ) : (
          <div className="arregla divBuscadorInteligente">
            {/*========================== Llamado al Componente ==========================*/}
             <RegistrarClientes/>
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
          {show2 ? "Administrar Clientes" : "Ocultar"}{" "}
        </button>
        {show2 ? (
          <div></div>
        ) : (
          <div className="arregla">
            {/*========================== Llamado al Componente ==========================*/}
            < AdministrarClientes/>
          </div>
        )}
      </td>
    </tr>
  </tbody>
</Table>




    </div>
  )
}

export default MenuClientes