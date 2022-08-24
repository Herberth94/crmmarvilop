import React from 'react'
import Table from 'react-bootstrap/Table';
import "./oportunidades.css"

function Oportunidades() {
  return (
    <div className='oportunidades'>
        <h2>Oportunidades</h2>

        <div  className='gmail'>  


        <Table striped bordered hover   className='tareas'  >
      <thead>
        <tr >
          <th  >#</th>
         <th>Correos</th>
         <th></th>
         <th></th>
       
        </tr>
      </thead>
      <tbody>
        <tr>
          <td width={"2%"}>1</td>
          <td width={"70%"}>@delfos369.com </td>
          <td  width={"2%"}><i className="bi bi-envelope"></i></td>
          <td width={"2%"}><i className="bi bi-telephone-outbound-fill"></i></td>
       
        </tr>
        <tr>
          <td>2</td>
          <td>@delfos369.com </td>
          <td><i className="bi bi-envelope"></i></td>
          <td><i className="bi bi-telephone-outbound-fill"></i></td>
         
        </tr>


        <tr>
          <td>2</td>
          <td>@delfos369.com </td>
          <td><i className="bi bi-envelope"></i></td>
          <td><i className="bi bi-telephone-outbound-fill"></i></td>
         
        </tr>
      
      </tbody>
    </Table>

        </div>



        
        <div  className='correos'>  

        
        <label htmlFor="password" className="label">Para:</label>   
            <input id="password"
              type="mail"
              name="password"
              className="card-input"
      
              data-type="password"
              placeholder="Ingrese Responsable Proyecto" />

         <label htmlFor="password" className="label">Asunto:</label>   
            <input id="password"
              type="text"
              name="password"
              className="card-input"
      
              data-type="password"
              placeholder="Ingrese Responsable Proyecto" />




              <textarea className='detalles' />

              



             
             
             <button className="btn-login" type="submit"     >   
              <span>Enviar</span>
            </button>






        </div>





    </div>
  )
}

export default Oportunidades