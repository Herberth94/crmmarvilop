import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Cookies from "universal-cookie";
const cookies = new Cookies();



function MenuPreventa() {

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
                                    <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title="Cargar Plantilla Excel"
                                    menuVariant="dark"
                                    
                                    >
                                        <NavDropdown.Item href="/plantilla-excel">Nuevo Proyecto</NavDropdown.Item>
                                        <NavDropdown.Item href="/continuarP-excel">Continuar Proyecto</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown.Divider />
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
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/registrar-colaboradores">Colaboradores</NavDropdown.Item>

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
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/administrar-colaboradores">Colaboradores</NavDropdown.Item>
                            </NavDropdown>


                              {/*    Proyectos*/}

                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Proyectos"
                                menuVariant="dark"
                            >
                                <NavDropdown.Item href="/asignar-proyectos">Asignar Proyecto</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/administrar-asignaciones">Administrar Asignaciones</NavDropdown.Item>
                            </NavDropdown>




                            </NavDropdown>

                    {/* ======================================================  */}                  
                                             {/* Preventa */}
                    {/* ======================================================  */}    
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Preventa"
                                menuVariant="dark"
                            >

                                
                                  
                                        <NavDropdown.Item href="/nuevo-proyecto">Nuevo proyecto (BOM)</NavDropdown.Item>
                                        <NavDropdown.Divider />



                             <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Continuar Proyecto"
                                menuVariant="dark"
                            >                        
                                        <NavDropdown.Item href="/mis-proyectos"   > Mis Proyectos</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/proyectos-compartidos"   >Proyectos Compartidos          
                                    </NavDropdown.Item>
                            </NavDropdown>



                            <NavDropdown.Divider />

                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Resumen"
                                menuVariant="dark"
                            >                        
                                        <NavDropdown.Item href="/mis-proyectos-r"   > Mis Proyectos</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/proyectos-compartidos-r"   >Proyectos Compartidos          
                                    </NavDropdown.Item>
                            </NavDropdown>

                                 
                            

                                   

                            </NavDropdown>



                        </Nav>
                    </Navbar.Collapse>
                </Container>




            </Navbar>
        </div>
    );
}

export default MenuPreventa;