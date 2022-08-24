import React ,{useState,useEffect}from 'react';
import Table from "react-bootstrap/Table";
import {Modal , Button} from "react-bootstrap";

export let infPartida = {}

const  ModalPartida = (props) => {
    const [show , setshow]= useState(true)
    const [enable , setenable]= useState([])
    useEffect(() => {
        let i = Object.keys(props.partida);
        i = i.length;
        setenable(Array(i).fill(true));
        setenable(Array(i).fill(true));
        
      },[]);
    // habilitar boton
    
    // conversion de objt a Array
    const array =props.partida;
    const obj = Object.assign({}, array);
    //console.log(obj)
    const [data, Setdata]=useState(obj)
    // cambio de estados
    const handleInputChange = (event) => 
    {
        Setdata({
            ...data,
            [event.target.name]: event.target.value,
          });
       
      }; 

    const envio =()=>{
        infPartida = data;
        console.log(infPartida)


        
    }
    const habilitar =(key)=>{
        let keys = parseInt(key);
        console.log(keys)
        let newArr =[];
        let i = props.partida;
        i = i.length;
        console.log(enable);
        for (let x = 0; x < i; x++){
            if(x == keys){
                newArr[x]= !enable[x];
                console.log(newArr[x])
                
            }
            if(x !== keys){
                newArr[x]= true;
            }
        }
        setenable(newArr);
        setshow(!show);
        if(!show){
          envio()
        }
    }

     
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
              <th>Descripción de partida</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
          { props.partida.map((key,index)=>(
              <tr key={key}>
                <td>{index}</td>
                <td>
                <input
                    className="input-name"
                    defaultValue={key}
                    name={index}
                    onChange={handleInputChange}
                    disabled={enable[index]}
                  ></input>
                </td>
                <td width={"100px"}>
                  <button
                    className="btn btn-primary Resetear"
                    type="button"
                    onClick={()=>{habilitar(index)}}
                    
                  >
                      {show ? 'Modificar':'aceptar' }
                 
                  </button>
                </td>

             </tr>        
          ))}
               
      
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

export default ModalPartida