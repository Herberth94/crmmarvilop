import React from 'react'
import Table from 'react-bootstrap/Table';
import "./task.css"

function Tareas() {
  return (
    <div  className='task'>

   {/*      <h2>Tareas</h2> */}


<div className='proyectos-crm'>


   
 
<Table striped bordered hover  className='tareas'  >
      <thead>
        <tr >
          <th>#</th>
          <th>Nombre Proyecto</th>
          <th>Fecha</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td width={"2%"}>1</td>
          <td width={"70%"}>CRM</td>
          <td width={"10%"}>20-06-2022</td>
          <td>En curso</td>
          <td width={"20px"}><i className="bi bi-person-circle"></i></td>
        </tr>
        <tr>
          <td>2</td>
          <td width={"2%"}>CRM - Data</td>
          <td>20-06-2022 </td>
          <td>Finalizada</td>
          <td width={"2%"}><i className="bi bi-person-circle"></i></td>
        </tr>
      
      </tbody>
    </Table>
 


</div>
        <div  className='caja'>

     
        <div  className='epicas'>

            <h3>Epic </h3>

            

        <Table striped bordered hover   className='tareas'  >
      <thead>
        <tr >
          <th  >#</th>
          <th>Nombre</th>
       
        </tr>
      </thead>
      <tbody>
        <tr>
          <td width={"2%"}>1</td>
          <td width={"70%"}>Definir los Alcances</td>
       
        </tr>
        <tr>
          <td>2</td>
          <td>Desarrollar Fron-end </td>
         
        </tr>
      
      </tbody>
    </Table>



<div  className='agregar'>


            <button className='boton-epicas'>
             +   Crear epic
            </button>
    </div>

        </div>


        <div  className='actividades'>
        <h3>actividades</h3>




        <Table striped bordered hover   className='tareas'  >
      <thead>
        <tr >
          <th  >#</th>
          <th>Categoria</th>
          <th>Actividad</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td width={"2%"}>1</td>
          <td width={"2%"}>Tarea</td>
          <td width={"70%"}>Definir los Alcances</td>
          <td>En curso</td>
          <td width={"20px"}><i className="bi bi-person-circle"></i></td>
        </tr>
        <tr>
          <td>2</td>
          <td width={"2%"}>Sub-Tarea</td>
          <td>Desarrollar Fron-end </td>
          <td>Finalizada</td>
          <td width={"2%"}><i className="bi bi-person-circle"></i></td>
        </tr>
      
      </tbody>
    </Table>
        </div>


        <div  className='ajustes'>
        <h3>Adicionales</h3>

        </div>


        </div>







    </div>
  )
}

export default Tareas