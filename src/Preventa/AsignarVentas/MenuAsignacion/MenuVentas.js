import React from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Animaciones from "../../../Componentes/Animaciones";

///QUitary ppner AdministrarVentas

import AdministrarColaboradores from "../../Colaboradores/MenuColaborador/AdministrarColaboradores";

////////////
import AsignarProyecto from "./AsignarProyecto";

function MenuVentas() {
  //Habilitar/Deshabilitar tabla del resumen AM
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(true);
  return (

    
    <div className="contenido-usuarios">
      <Animaciones mytext="Proyectos " />

      {/*========================== Tabla  Categorias ==========================*/}
      <Table responsive id="nombreDiv">
        {/*========================== Titulos Tabla ==========================*/}
        <thead>
          <tr className="titulo-tabla-usuarios">
            <th className="ocultar">Asignar Proyectos</th>
            <th className="ocultar">Administrar Ventas </th>
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
                {show ? "Asignar Proyectos" : "Ocultar"}{" "}
              </button>
              {show ? (
                <div></div>
              ) : (
                <div className="arregla divBuscadorInteligente">
                  {/*========================== Llamado al Componente ==========================*/}
                  <AsignarProyecto />
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
                {show2 ? "Administrar Usuarios Ventas" : "Ocultar"}{" "}
              </button>
              {show2 ? (
                <div></div>
              ) : (
                <div className="arregla">
                  {/*========================== Llamado al Componente ==========================*/}
                  <AdministrarColaboradores estado={true} />
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default MenuVentas;
