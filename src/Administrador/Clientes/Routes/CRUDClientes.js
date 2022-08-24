import React, { useState, useEffect } from 'react'

import Animaciones from '../../../Componentes/Animaciones';


import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';




var array = [1, 5, 10, 15];

export const CrudClientes = (props) => {
    /*========================== Mostrar/Ocultar ==========================*/
    const [activar, setActivar] = useState([]);
    const [textBModificar, setTextBModificar] = useState([]);//Texto de los botones de modificar
    /*=====================================================================*/

    /*========================== Habilitar/Deshabilitar ==========================*/
    const [enable, setenable] = useState([]);//Inputs
    /*============================================================================*/

    const [data, setData] = useState({
        nombre_cliente: '',
        razon_social: '',
        telefono: '',
        cliente_direccion: ''
    });

    const handleInputChange = (event) => {
        setData({
            ...data, [event.target.name]: event.target.value,
        })
    }

    const [datos, Setdatos] = useState()

    useEffect(() => {
        Setdatos(props.clientes);
    }, [props.clientes]);

    useEffect(() => {
        let i = Object.keys(props.clientes)
        i = i.length
        setActivar(Array(i).fill(true));
        setTextBModificar(Array(i).fill('bi bi-pencil-square'));
        setenable(Array(i).fill(true));
    }, [])

    const habilitar = (key) => {
        key = parseInt(key);
        const newArr = []
        const newArr2 = [];
        const newArr3 = [];
        let c = Object.keys(props.clientes);
        c = c.length;
        for (let i = 0; i < c; i++) {
            if (i === key) {
                newArr[i] = !enable[i];
                if (enable[i] === false) {
                    newArr2[i] = 'bi bi-pencil-square';
                    setData({
                        ...data, nombre_cliente: '',
                        razon_social: '',
                        telefono: '',
                        cliente_direccion: ''
                    })
                } else {
                    newArr2[i] = 'bi bi-check-lg';
                }
                newArr3[i] = !activar[i];
            }
            if (i !== key) {
                newArr[i] = true;
                newArr2[i] = 'bi bi-pencil-square';
                newArr3[i] = true;
            }

        }
        setenable(newArr);
        setTextBModificar(newArr2);
        setActivar(newArr3);
    }

    return (
        <div className='administracion'>

            <div>
                <Animaciones mytext="Administración de Clientes" />
            </div>



            <form>
                {/*===================     Tabla Clientes   ========================*/}
                <Table    id = "daTable"   >
                    <Thead>



                        {/*=================== Titulos Tabla Clientes ===================*/}
                        <Tr >
                            <Th>ID</Th>
                            <Th>Cliente</Th>
                            <Th>Razón Social</Th>
                            <Th>Teléfono</Th>
                            <Th></Th>
                            <Th></Th>
                            <Th>Dirección</Th>
                            {/*         <th>Eliminar</th> */}
                            <Th>Modificar</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {/*=================== Contenido Tabla Clientes =================*/}
                        {Object.keys(props.clientes).map((key) => (
                            <Tr key={key}>
                                <Td>{props.clientes[key].cliente_id}</Td>


                                <Td>
                                    <input
                                        className="input-name"
                                        defaultValue={props.clientes[key].nombre_cliente}
                                        onChange={handleInputChange}
                                        disabled={enable[key]}
                                        name="nombre_cliente"
                                    ></input>
                                </Td>
                                {/*================= Razón Social ==================*/}
                                <Td>
                                    <input
                                        className="input-name"
                                        defaultValue={props.clientes[key].razon_social}
                                        onChange={handleInputChange}
                                        disabled={enable[key]}
                                        name="razon_social"
                                    ></input>{" "}
                                </Td>
                                {/*================= Teléfono ==================*/}
                                <Td>
                                    <input
                                        className="input-name"
                                        defaultValue={props.clientes[key].telefono}
                                        onChange={handleInputChange}
                                        disabled={enable[key]}
                                        name="telefono"
                                    >
                                        
                                        </input>{" "}


                                    
                            
                                </Td>

                                <Td width={"90px"}>

                             <span  className='actions'>
                                        <i class="bi bi-telephone-forward"></i>
                                        <i class="bi bi-envelope"></i>
                             </span>
                                </Td>
                                {/*================= Dirección==================*/}
                                <Td>
                                    <input
                                        className="input-name"
                                        defaultValue={props.clientes[key].cliente_direccion}
                                        onChange={handleInputChange}
                                        disabled={enable[key]}
                                        name="cliente_direccion"
                                    ></input>{" "}
                                </Td>
                                {/*     <td>
                                {" "}
                                <button
                                    className="btn btn-primary Mod"
                                    type="button"
                                    onClick={() => {
                                    props.envioData(datos,key,data); 
                                    habilitar(key); 
                                    props.setfirst(activar[key]) ; 
                                    }}
                                >{textBModificar[key]}
                                </button>
                            </td> */}

                                {enable[key] ? (
                                    <Td width={"100px"} >
                                        <button
                                            className="sn-boton" type="button"
                                            onClick={() => {
                                                // props.envioData(datos,key,data); 
                                                habilitar(key);
                                                props.setfirst(activar[key]);
                                            }}
                                        >
                                            <i className={textBModificar[key]}  ></i>
                                        </button>

                                    </Td>
                                ) : (


                                    <>
                                        <Td width={"100px"} >
                                            <button
                                                className="sn-boton" type="button"
                                                onClick={() => {
                                                    props.envioData(datos, key, data);
                                                    habilitar(key);
                                                    props.setfirst(activar[key]);
                                                }}
                                            >
                                                <i className={textBModificar[key]}  ></i>
                                            </button>

                                        </Td>

                                        <Td width={"100px"}>
                                            <button
                                                className="sn-boton cancelar" type="button"
                                                onClick={() => {
                                                    /*   props.envioData(datos,key,data);  */
                                                    habilitar(key);
                                                    props.setfirst(activar[key]);
                                                }}
                                            >
                                                <i className="bi bi-x-lg"  ></i>
                                            </button>

                                        </Td>
                                    </>
                                )}



                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </form>

            <br />
        </div>
    )
}