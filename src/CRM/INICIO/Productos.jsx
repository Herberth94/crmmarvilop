import React from 'react'
import './marvilopCRM.css'
import { Link } from 'react-router-dom';
import logoMarvilop from "./img/logoMarvilop.png";

import Caracteristicas from "./Caracteristicas";


import { Icon } from '@iconify/react';





function Productos() {
    return (
        <div>


            <div className=' containerHome color-productos'>
                <div className='container-home-letras'>
                    <div>
                        {/* <h4 className='titulo-home titulo-color-softwareMedida'>CRM</h4> */}
                    </div>
                    <div>
                        <img className='imgLetrasLogo letras-marvilop' src={logoMarvilop} alt="letras logo"></img>

                    </div>
                    <div>
                        <p className="subtitulo-info-beneficios">Es una herramienta de  desarrollo e implementación de Software de Ventas que ha permitido que nuestros clientes generen cotizaciones y gestionen su área de ventas de manera óptima.</p>
                    </div>
                    <div className='container-buttons'>

                        <button className='boton-contactanos-marvilop'>
                            Solicitar Demo
                        </button>
                        <button className='boton-contactanos-marvilop'>
                            Pruébalo
                        </button>
                    </div>
                </div>

                <div className='ratio ratio-16x9 video-marvilop'>
                    <iframe src="https://www.youtube.com/embed/Xr-4parug3M?start=5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                </div>
            </div>

            <hr></hr>

            <div className='titulos-container-software-medida'>
                <h6 id='titulo-software'>Todas las Herramientas que Necesitas </h6>
                <h6 id='titulo-software'>Para Hacer Crecer tu Negocio </h6>

            </div>
            <br></br>
            <br></br>

            <div className='contenedor-caracteristicas'>
                <div className='caracteristicas'>
                    <div className='icon-caracteristicas'>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="3em" height="3em" color="#9fafc1" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z" /></svg>
                    </div>
                    <h5 className='titulo-caracteristicas'>Emailing</h5>
                    <p className='parrafo-caracteristicas'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nesciunt, quae consequuntur veritatis sunt obcaecati commodi reiciendis accusantium quis nulla qui ex ratione placeat ad, reprehenderit nemo quisquam quasi nisi!</p>

                </div>

                <div className='caracteristicas'>
                    <div className='icon-caracteristicas'>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="3em" height="3em" color="#9fafc1" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM305.8 637.7c3.1 3.1 8.1 3.1 11.3 0l138.3-137.6L583 628.5c3.1 3.1 8.2 3.1 11.3 0l275.4-275.3c3.1-3.1 3.1-8.2 0-11.3l-39.6-39.6a8.03 8.03 0 0 0-11.3 0l-230 229.9L461.4 404a8.03 8.03 0 0 0-11.3 0L266.3 586.7a8.03 8.03 0 0 0 0 11.3l39.5 39.7z" /></svg>
                    </div>
                    <div>
                        <h5 className='titulo-caracteristicas'>Reportes y Gráficas</h5>
                        <p className='parrafo-caracteristicas'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, pariatur, voluptates, magnam deserunt placeat perferendis fugiat rerum optio amet nulla vero minus quibusdam commodi. Sequi quas tempore consequuntur minima eius.</p>
                    </div>

                </div>

                <div className='caracteristicas'>
                    <div className='icon-caracteristicas'>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="3em" height="3em" color="#9fafc1" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><g fill="none"><rect width="40" height="32" x="4" y="8" stroke="currentColor" stroke-linejoin="round" stroke-width="4" rx="3" /><path stroke="currentColor" stroke-width="4" d="M4 11a3 3 0 0 1 3-3h34a3 3 0 0 1 3 3v9H4v-9Z" /><circle r="2" fill="currentColor" transform="matrix(0 -1 -1 0 10 14)" /><circle r="2" fill="currentColor" transform="matrix(0 -1 -1 0 16 14)" /></g></svg>
                    </div>
                    <h5 className='titulo-caracteristicas'>Herramientas de Marketing </h5>
                    <p className='parrafo-caracteristicas'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio modi corrupti, reprehenderit accusantium beatae aliquam dolor neque officia debitis atque omnis voluptate laudantium et porro ea saepe aliquid. Repellendus, quos?</p>

                </div>

            </div>
            <div className='contenedor-caracteristicas'>
                <div className='caracteristicas'>
                    <div className='icon-caracteristicas'>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="3em" height="3em" color="#9fafc1" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z" /></svg>
                    </div>
                    <h5 className='titulo-caracteristicas'>Aumenta tus ventas</h5>
                    <p className='parrafo-caracteristicas'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nesciunt, quae consequuntur veritatis sunt obcaecati commodi reiciendis accusantium quis nulla qui ex ratione placeat ad, reprehenderit nemo quisquam quasi nisi!</p>

                </div>

                <div className='caracteristicas'>
                    <div className='icon-caracteristicas'>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="3em" height="3em" color="#9fafc1" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM305.8 637.7c3.1 3.1 8.1 3.1 11.3 0l138.3-137.6L583 628.5c3.1 3.1 8.2 3.1 11.3 0l275.4-275.3c3.1-3.1 3.1-8.2 0-11.3l-39.6-39.6a8.03 8.03 0 0 0-11.3 0l-230 229.9L461.4 404a8.03 8.03 0 0 0-11.3 0L266.3 586.7a8.03 8.03 0 0 0 0 11.3l39.5 39.7z" /></svg>
                    </div>
                    <div>
                        <h5 className='titulo-caracteristicas'>Optimiza tus operaciones</h5>
                        <p className='parrafo-caracteristicas'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, pariatur, voluptates, magnam deserunt placeat perferendis fugiat rerum optio amet nulla vero minus quibusdam commodi. Sequi quas tempore consequuntur minima eius.</p>
                    </div>

                </div>

                <div className='caracteristicas'>
                    <div className='icon-caracteristicas'>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="3em" height="3em" color="#9fafc1" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><g fill="none"><rect width="40" height="32" x="4" y="8" stroke="currentColor" stroke-linejoin="round" stroke-width="4" rx="3" /><path stroke="currentColor" stroke-width="4" d="M4 11a3 3 0 0 1 3-3h34a3 3 0 0 1 3 3v9H4v-9Z" /><circle r="2" fill="currentColor" transform="matrix(0 -1 -1 0 10 14)" /><circle r="2" fill="currentColor" transform="matrix(0 -1 -1 0 16 14)" /></g></svg>
                    </div>
                    <h5 className='titulo-caracteristicas'>Seguimiento de Clientes </h5>
                    <p className='parrafo-caracteristicas'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio modi corrupti, reprehenderit accusantium beatae aliquam dolor neque officia debitis atque omnis voluptate laudantium et porro ea saepe aliquid. Repellendus, quos?</p>

                </div>

            </div>



            <div>
                < Caracteristicas />

            </div>
            <br />
            <div className='titulos-container-software-medida'>
                <h6 id='titulo-software'>Planes de Negocios y Precios  </h6>
                <p id='paragraph-precios'>Compara las características de Nuestros Planes y Escoge el Plan que se Ajuste a tus Necesidades</p>
                <br />
           
                <a type="button" href='/precios' className="btn btn-secondary plan">Seleccionar Plan</a>
                <br />

            </div>
            <br />


        </div>

    )
}
export default Productos