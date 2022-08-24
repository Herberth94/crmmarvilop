import React from 'react';
import Table from "react-bootstrap/Table";
import {Modal , Button} from "react-bootstrap";

const ModalCat = (props) => {
  
         
   return (
    <>
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Datos de Categoria
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table responsive  striped bordered hover size="sm">
        <thead>
            <tr className="titulo-tabla-usuarios">
              <th>id</th>
              <th>Categoria_Nombre</th>
              <th>descripción</th>
              <th>cantidad</th>
              <th>comentarios</th>
              <th>Precio_Lista</th>
              <th>Precio_Unitario</th>
              <th>Moneda</th>
            </tr>
          </thead>
          <tbody>
        
        {Object.keys(props.proyecto_id).map((key) => (    
            <tr key={props.proyecto_id[key].cd_id} >
                <td>{props.proyecto_id[key].cd_id}</td>
                <td>{props.proyecto_id[key].cat_nombre}</td>   
                <td>{props.proyecto_id[key].cd_descripcion}</td>   
                <td>{props.proyecto_id[key].cd_cantidad}</td>  
                <td>{props.proyecto_id[key].cd_comentarios}</td>  
                <td>{props.proyecto_id[key].precio_lista}</td> 
                <td>{props.proyecto_id[key].precio_unitario}</td>
                <td>{props.proyecto_id[key].moneda_nombre}</td>
               
            </tr>))}        
        </tbody>            
        </Table>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default ModalCat