import React from 'react'
import './precios.css';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

function Precios() {
    return (

        <div className='section'>

            <div className='container-title'>
                <h1 id='title-precios'>Escoge un plan para hacer crecer tu negocio </h1>
                <div className='paragraph-demo'>
                    <p id='paragraph-precios-one'>Mira un video detallado del funcionamiento del software</p>
                    <p id='paragraph-precios ' className='ver-demo'>Ver Demo</p>
                </div>
                <p id='paragraph-precios' className=' try-it'>Pruébalo aquí</p>
            </div>
            <hr></hr>

            <div class="btn-group btn-group-lg btn-principal" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary">Mensual</button>
                <button type="button" class="btn btn-secondary">Anual</button>
            </div>

            <div className="pricingTable">

                <ul className="pricingTable-firstTable">
                    <li className="pricingTable-firstTable_table">
                        <Icon icon="bi:person-fill" color="#9fafc1" width="60" className='icon-precios' />
                        <h1 className="pricingTable-firstTable_table__header">Básico</h1>
                        <p className="pricingTable-firstTable_table__pricing"><span>$</span><span>5499</span>  <span className="centavos">99</span>    <span>MXN</span>  </p>
                        <h5 id='description-prices'>El mejor Kit de Ventas All-in-One para Equipos de 1 a 3 Personas.</h5>

                        <ul className="pricingTable-firstTable_table__options">
                            <li>Emailing</li>
                            <li>Seguimiento de Clientes </li>
                            <li>Reportes y Gráficas</li>
                            <li>Herramientas de Marketing</li>
                            <li>Gestión de Tareas</li>
                            <li>Soporte</li>
                        </ul>
                        <div className="txt">
                            <Link to='contacto' className='links'>
                                <h3 className="pricingTable-firstTable_table__getstart">Empieza Ahora</h3>
                            </Link>

                        </div>
                    </li>


                    <li className="pricingTable-firstTable_table">
                        <Icon icon="pepicons:persons-print" color="#9fafc1" width="60" className='icon-precios' />
                        <h1 className="pricingTable-firstTable_table__header">Premium</h1>
                        <p className="pricingTable-firstTable_table__pricing"><span>$</span><span>10299</span> <span className="centavos">99</span>     <span>MXN</span></p>
                        <h5 id='description-prices'>El mejor Kit de Ventas All-in-One para Equipos de 1 a 3 Personas</h5>

                        <ul className="pricingTable-firstTable_table__options">
                            <li>Emailing</li>
                            <li>Seguimiento de Clientes </li>
                            <li>Reportes y Gráficas</li>
                            <li>Herramientas de Marketing</li>
                            <li>Gestión de Tareas</li>
                            <li>Soporte</li>
                        </ul>
                        <Link to='contacto' className='links'>

                            <h3 className="pricingTable-firstTable_table__getstart">Empieza Ahora</h3>
                        </Link>
                    </li>

                    <li className="pricingTable-firstTable_table">
                        <Icon icon="clarity:building-solid" color="#9fafc1" width="60" className='icon-precios' />
                        <h1 className="pricingTable-firstTable_table__header">Optimum</h1>
                        <p className="pricingTable-firstTable_table__pricing"><span>$</span><span>10299</span> <span className="centavos">99</span>     <span>MXN</span></p>
                        <h5 id='description-prices'>El mejor Kit de Ventas All-in-One para Equipos de 1 a 3 Personas.</h5>

                        <ul className="pricingTable-firstTable_table__options">
                            <li>Emailing</li>
                            <li>Seguimiento de Clientes</li>
                            <li>Reportes y Gráficas</li>
                            <li>Herramientas de Marketing</li>
                            <li>Gestión de Tareas</li>
                            <li>Soporte</li>
                        </ul>
                        <Link to='contacto' className='links'>

                            <h3 className="pricingTable-firstTable_table__getstart">Empieza Ahora</h3>
                        </Link>
                    </li>

                </ul>
            </div>

            <hr></hr>

            <div>
                <h3 id='title-precios ' className='planes'>Compara las Características de Nuestros Planes</h3>
                <p id='paragraph-precios ' className='paragraph-color'>Escoge el plan que se ajuste a tus necesidades</p>

            </div>


            <table class="table table-bordered table-prices">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">
                            <div className='container-row-table'>

                                <p>Selecciona un Plan</p>
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-secondary">Mensual</button>
                                    <button type="button" class="btn btn-secondary">Anual</button>
                                </div>
                            </div>
                        </th>
                        <th scope="col"><span>Basic</span><br></br><span>$</span><span>10299</span> <span className="centavos">99</span>     <span>MXN</span></th>
                        <th scope="col"><span>Premiun</span><br></br><span>$</span><span>10299</span> <span className="centavos">99</span>     <span>MXN</span></th>
                        <th scope="col"><span>Optimum</span><br></br><span>$</span><span>10299</span> <span className="centavos">99</span>     <span>MXN</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Característica</th>
                        <td><Icon icon="akar-icons:check" color="#9fafc1" width="40" /></td>
                        <td><Icon icon="akar-icons:check" color="#9fafc1" width="40" /></td>
                        <td><Icon icon="akar-icons:check" color="#9fafc1" width="40" /></td>

                    </tr>
                    <tr>
                        <th scope="row">Característica</th>
                        <td><Icon icon="akar-icons:check" color="#9fafc1" width="40" /></td>
                        <td><Icon icon="akar-icons:check" color="#9fafc1" width="40" /></td>
                        <td><Icon icon="akar-icons:check" color="#9fafc1" width="40" /></td>

                    </tr>
                    <tr>
                        <th scope="row">Característica</th>
                        <td><Icon icon="ant-design:line-outlined" color="#9fafc1" width="40" /></td>
                        <td><Icon icon="akar-icons:check" color="#9fafc1" width="40" /></td>
                        <td><Icon icon="akar-icons:check" color="#9fafc1" width="40" /></td>
                        
                    </tr>
                    <tr>
                        <th scope="row">Característica</th>
                        <td><Icon icon="ant-design:line-outlined" color="#9fafc1" width="40" /></td>
                        <td><Icon icon="akar-icons:check" color="#9fafc1" width="40" /></td>
                        <td><Icon icon="akar-icons:check" color="#9fafc1" width="40" /></td>
                        
                    </tr>
                    <tr>
                        <th scope="row">Característica</th>
                        <td><Icon icon="ant-design:line-outlined" color="#9fafc1" width="40" /></td>
                        <td><Icon icon="ant-design:line-outlined" color="#9fafc1" width="40" /></td>
                        <td><Icon icon="akar-icons:check" color="#9fafc1" width="40" /></td>
                        
                    </tr>
                    <tr>
                        <th scope="row">Característica</th>
                        <td><Icon icon="ant-design:line-outlined" color="#9fafc1" width="40" /></td>
                        <td><Icon icon="ant-design:line-outlined" color="#9fafc1" width="40" /></td>
                        <td><Icon icon="akar-icons:check" color="#9fafc1" width="40" /></td>
                        
                    </tr>
                    <tr>
                        <th scope="row"></th>
                        <td><button type="button" class="btn btn-secondary">Seleccionar Plan</button></td>
                        <td><button type="button" class="btn btn-secondary">Seleccionar Plan</button></td>
                        <td><button type="button" class="btn btn-secondary">Seleccionar Plan</button></td>

                        
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default Precios
