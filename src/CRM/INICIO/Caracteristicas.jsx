import './servicios.css';
import { Link } from 'react-router-dom';
import { Card, CardGroup } from 'react-bootstrap';



function Caracteristicas() {

    return (


        <div className="section">
            <div className="flex flex-column justify-center items-center ">
                <div className="banner_servicios">
                <div className='titulos-container-software-medida'>
                    <h6 id='titulo-software'>Características </h6>

                 </div>
                 <br />

                    <div className="card">


                        <CardGroup>

                            <Card>
                                <Card.Body>
                                    <Card.Title>Responsivo</Card.Title>
                                    <Card.Text>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos debitis possimus non illo odit natus placeat, exercitationem asperiores expedita dicta quaerat aspernatur quas nostrum! Illum nesciunt tempore velit ut debitis?
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Link to='/consultoria' className='links'>
                                        <h3 className="pricingTable-firstTable_table__getstart">Más Información</h3>
                                    </Link>
                                </Card.Footer>
                            </Card>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Autogestivo</Card.Title>
                                    <Card.Text>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, minima aspernatur. Voluptate similique, praesentium maxime, perferendis ea illum repudiandae deleniti repellendus, veritatis rerum accusantium laboriosam expedita voluptas excepturi vel! Quasi?
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Link to='/softwareMedida' className='links'>
                                        <h3 className="pricingTable-firstTable_table__getstart">Más Información</h3>
                                    </Link>
                                </Card.Footer>
                            </Card>

                            <Card>
                                <Card.Body>
                                    <Card.Title>Alta disponibilidad</Card.Title>
                                    <Card.Text>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium nihil quo unde iusto voluptate! Provident vero harum ex velit aperiam assumenda dolore, aliquid voluptatem repellat labore similique corporis, maiores veritatis.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Link to='/aplicacionesMoviles' className='links'>
                                        <h3 className="pricingTable-firstTable_table__getstart">Más Información</h3>
                                    </Link>
                                </Card.Footer>
                            </Card>

                        </CardGroup>

                    </div>









                </div>

            </div>


        </div>

    );

}
export default Caracteristicas;
