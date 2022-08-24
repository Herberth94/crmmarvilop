import React ,{useState, useEffect} from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

export const CrudMarcas = (props) => {

    /*========================== Mostrar/Ocultar ==========================*/
    const [activar, setActivar] = useState([]);
    const [textBModificar,setTextBModificar] = useState([]);//Texto de los botones de modificar
    /*=====================================================================*/

    /*========================== Habilitar/Deshabilitar ==========================*/
    const [enable, setenable] = useState([]);//Inputs
    /*============================================================================*/

    const [data,setData] = useState ({
        marca_nombre:''  
    });
    const handleInputChange = (event) => {
        setData({
          ...data,[event.target.name] : event.target.value
      })
    }

    const [datos, setDatos] = useState([]);

    useEffect(() => {
        setDatos(props.marcas); 
    },[props.marcas]);

    useEffect(() => {
        let i = Object.keys(props.marcas)
         i = i.length
        setenable(Array(i).fill(true));
        setActivar(Array(i).fill(true));
        setTextBModificar(Array(i).fill('bi bi-pencil-square'));
    },[props.marcas])

    const habilitar = (key) =>{
        key = parseInt(key);
        const newArr =[] 
        const newArr2 = [];
        const newArr3 = [];
        let c = Object.keys(props.marcas);
        c = c.length;
        for (let i = 0 ; i < c ; i++){
            if(i === key){
                newArr[i] = !enable[i];
                if(enable[i] === false){
                    newArr2[i] = 'bi bi-pencil-square';
                    setData({
                        ...data,marca_nombre:''
                    })
                }else{
                    newArr2[i] = 'bi bi-check-lg';
                }
                newArr3[i] = !activar[i];
            }
            if(i !== key){
                newArr[i]=true;
                newArr2[i] = 'bi bi-pencil-square';
                newArr3[i]=true;
            }

        }   
        setenable(newArr);
        setTextBModificar(newArr2);
        setActivar(newArr3);
    }

    return (
        <div  className='administracion2'>
            {/*===================     Tabla Proveedores   ========================*/}
            <Table  >
                <Thead>

            
                    {/*=================== Titulos Tabla Proveedores ===================*/}
                    <Tr >
                        <Th>ID</Th>
                        <Th>Marca</Th>
                        <Th>Modificar</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {/*=================== Contenido Tabla Marcas =================*/}
                    {Object.keys(props.marcas).map((key) => (
                    <Tr key={key}>
                        <Td>{props.marcas[key].marca_id}</Td>
                        {/*=================== Nombre de la marca =================*/}
                        <Td>
                            <input
                            className="input-name"
                            defaultValue={props.marcas[key].marca_nombre}
                            onChange={handleInputChange}
                            disabled={enable[key]}
                            name="marca_nombre"
                            ></input>
                        </Td>
                        {/*=================== Botón modificar =================*/}
                  {/*       <td>
                            {" "}
                            <button
                                className="btn btn-primary Mod"
                                type="button"
                                onClick={() => {
                                habilitar(key);
                                props.envioData(datos,key,data); 
                                props.setfirst(activar[key]);
                                }}
                            >{textBModificar[key]}
                            </button>
                        </td> */}


{enable[key] ? (
                                <Td width={"100px"} >
                                    <button 
                                    className=  "sn-boton " type="button"
                                    onClick={()=>{
                                       // props.envioData(datos,key,data); 
                                        habilitar(key); 
                                        props.setfirst(activar[key]); 
                                    }}
                                    >
                                        <i className  = {textBModificar[key]}  ></i>
                                    </button>
                                    
                                </Td>
                            ):(
                              
                              
                              < >
                                    <Td  >
                                    <button 
                                    className="sn-boton " type="button"
                                    onClick={()=>{
                                        props.envioData(datos,key,data); 
                                        habilitar(key); 
                                        props.setfirst(activar[key]); 
                                    }}
                                    >
                                        <i className= {textBModificar[key]}  ></i>
                                    </button>
                                
                                </Td>

                                <Td >
                                    <button 
                                    className="sn-boton cancelar" type="button"
                                    onClick={()=>{
                                      /*   props.envioData(datos,key,data);  */
                                        habilitar(key); 
                                       props.setfirst(activar[key]); 
                                    }}
                                    >
                                        <i className= "bi bi-x-lg"  ></i>
                                    </button>
                                   
                                </Td>
                                </>
                            )}




                    </Tr>  
                    ))}
                </Tbody>
            </Table>
        </div>
    )
}