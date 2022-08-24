import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Cookies from "universal-cookie";

const cookies = new Cookies();


function MenuVentas() {


    const cierreSesion = () => {
        cookies.remove("id_usuario", { path: "/" });
        cookies.remove("rol", { path: "/" });
        cookies.remove('estado_login', { path: "/" });
        window.location.href = "../Login.js";
    };

    return (

        <div className='menu-principal' >
            <Navbar expand="lg">
                <Container fluid>
                    <Navbar.Brand id="titulo" href="/">Marvilop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-dark-example" id="icono" />
                    <Navbar.Collapse id="navbar-dark-example">
                        <Nav>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Home"
                                menuVariant="dark"
                                
                            >
                        

                                <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title={"Herramientas "}
                                    menuVariant="dark"
                                >
                                    <NavDropdown.Item href="/calculadora">Calculadora</NavDropdown.Item>
                                    <NavDropdown.Divider />
{/*                                     <NavDropdown.Item href="/plantilla-excel">Cargar Plantilla Excel</NavDropdown.Item>
                                    <NavDropdown.Divider /> */}
                                    <NavDropdown.Item href="/documentacion">Documentación</NavDropdown.Item>
                                </NavDropdown>




                                <NavDropdown.Item href="#" onClick={cierreSesion} >Salir</NavDropdown.Item>
                            </NavDropdown>


                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Administrador"
                                menuVariant="dark"
                            >

                              {/*   Registros */}
                                <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title="Registros"
                                    menuVariant="dark"
                                >
  
                                    <NavDropdown.Item href="/registrar-clientes">Clientes</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/registrar-proveedores">Proveedores</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/registrar-marcas">Marcas</NavDropdown.Item>

                                </NavDropdown>


                        {/*    Administración */}
                                <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Administración"
                                menuVariant="dark"
                            >

                                <NavDropdown.Item href="/administrar-clientes">Clientes</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/administrar-proveedores-marcas">Proveedores y Marcas</NavDropdown.Item>

                            </NavDropdown>


                              {/*    Proyectos*/}

{/*                             <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Proyectos"
                                menuVariant="dark"
                            >
                                <NavDropdown.Item href="/asignar-proyectos">Asignar Proyecto</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/administrar-asignaciones">Administrar Asignaciones</NavDropdown.Item>
                            </NavDropdown>
 */}



                            </NavDropdown>

                    {/* ======================================================  */}                  
                                             {/* Preventa */}
                    {/* ======================================================  */}    
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Preventa"
                                menuVariant="dark"
                            >

                                
                                    <NavDropdown
                                        id="nav-dropdown-dark-example"
                                        title="BOM"
                                        menuVariant="dark"
                                    >
{/*                                         <NavDropdown.Item href="/nuevo-proyecto">Nuevo proyecto</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/continuar-proyecto">Continuar Proyecto           
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider /> */}
                                        <NavDropdown.Item href="/resumen-proyecto">Resumen</NavDropdown.Item>


                                    </NavDropdown>


                            </NavDropdown>



                    {/* ======================================================  */}                  
                                             {/* Venta */}
                    {/* ======================================================  */} 



                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Venta "
                                menuVariant="dark"
                            >
                               
                                    <NavDropdown
                                        id="nav-dropdown-dark-example"
                                        title="Análisis de Margen "
                                        menuVariant="dark"
                                    >
                                        <NavDropdown.Item href="/divisa">Agregar Divisa</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/resumen-am">Resumen AM</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/costos-indirectos">Costos Indirectos</NavDropdown.Item>
                                    </NavDropdown>


                                            
                                    <NavDropdown
                                        id="nav-dropdown-dark-example"
                                        title="Proporcionalidad "
                                        menuVariant="dark"
                                    >
                                        <NavDropdown.Item href="/resumen">Resumen</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/registrar-financiamiento">Registrar Financiamiento</NavDropdown.Item>
                                    </NavDropdown>



                                            
                                    <NavDropdown
                                        id="nav-dropdown-dark-example"
                                        title="Propuesta Económica "
                                        menuVariant="dark"
                                    >
                                        <NavDropdown.Item href="/administrar-propuesta">Administrar Propuesta</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/imprimir-propuesta">Imprimir Propuesta</NavDropdown.Item>
                                    </NavDropdown>









                            </NavDropdown>














                        </Nav>
                    </Navbar.Collapse>
                </Container>




            </Navbar>
        </div>
    );
}

export default MenuVentas;