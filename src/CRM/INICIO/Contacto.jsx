/* eslint-disable no-unused-vars */
// /* eslint-disable no-whitespace-before-property */
import "./contacto.css";
import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';


function Contacto() {
    const [datos, setDatos] = useState({
        nombre: "",
        email: "",
        numero: "",
        texto: "",
    });
    const handleInputChange = (event) => {
        //console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        });
    };
    async function verificar() {
        try {
            let forms = {
                name: datos.nombre,
                email: datos.email,
                numero: datos.numero,
                texto: datos.texto,
            };

            let send = await axios.post(
                "https://apidelfos.herokuapp.com/api/form",
                forms
            );
            let send2 = send.data;
            console.log(send2);
            alert("Información enviada");
        } catch (error) {
            console.error(error);
        }
    }
    const enviarDatos = (event) => {
        verificar();
        event.preventDefault();
        //guardado de datos
        event.target.reset();
    };

    return (

        <div id="fondo">


            <div className="section">
                <div className="flex flex-column justify-center items-center ">
                    <div className="">
                        {/* *********************************  REDES SOCIALES  ****************************************/}

                        <div className="container">
                            <div className="box">

                         

                            </div>
                        </div>



                        <div className="animated fadeInUp ease-out-circ d-1 a-2">
                            <div id="content1">
                                <div id="left1">
                                    <div className="contacto2">
                                        <div className="servicio-ind">
                                            <h3>
                                                <a
                                                    href="mailto:hola@delfos369.com?Subject=Información"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >

                                                </a>
                                                Contacto

                                            </h3>

                                            <p>

                                                <a href={"mailto:hola@delfos369.com?Subject=Información"} className="icon-contact" target="_blank" rel="noreferrer">
                                                    <Icon icon="bx:bxl-gmail" width="25" />
                                                </a>

                                                <a href="tel:5568148078" target="_blank" className="icon-contact" rel="noreferrer">
                                                    <Icon icon="eva:phone-call-fill" width="20" />
                                                </a>

                                                <a
                                                    href="https://goo.gl/maps/EkGkS1DLTmZdbmib6"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="icon-contact"
                                                >

                                                    <Icon icon="zmdi:google-maps" width="20" />
                                                </a>

                                            </p>
                                        </div>
                                    </div>
                                </div>

   
                            </div>

                        </div>

                        {/************************************************************* CONTACTO ***************************** */}

                        <div className="animated fadeInUp ease-out-circ d-1 a-2">
                            <div className="container">
                                <div className="box">

                                    <div className="title">
                                        <span className="block"></span>
                                        <h1 >Escríbenos<span></span></h1>
                                    </div>


                                </div>
                            </div>

                            <form action="" method="post" id="form" onSubmit={enviarDatos}>
                                <div className="form">
                                    <div className="grupo">
                                        <input
                                            type="text"
                                            id="name"
                                            name="nombre"
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <span className="barra"></span>
                                        <label htmlFor="">Nombre</label>
                                    </div>
                                    <div className="grupo">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <span className="barra"></span>
                                        <label htmlFor="">Email</label>
                                    </div>
                                    <div className="grupo">
                                        <input
                                            type="tel"
                                            name="numero"
                                            id="telefono"
                                            pattern="[0-9]{10}"
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <span className="barra"></span>
                                        <label htmlFor="">Teléfono</label>
                                    </div>
                                    <div className="grupo">
                                        <textarea
                                            name="texto"
                                            cols="40"
                                            rows="5"
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                        <span className="barra"></span>
                                        <label htmlFor="">Escríbenos</label>
                                    </div>

                                    <div className="boton-formulario">
                                        <button type="submit">Enviar</button>
                                        <br />
                                        <br />

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


            </div>






            <div className="private">

                <br />
                <br />

                {/* <Link to='aviso-privacidad' className='links'>
          <h2 >Aviso de Privacidad</h2>
        </Link> */}

            </div>



        </div>
    );
}
export default Contacto;

