import React from 'react'
import Producto from './Producto';
import {Container, Row, Col, Jumbotron}  from 'react-bootstrap';

const Home = (props) => {
    return (
        <>
            <Jumbotron fluid className="bg-success">
                <Container className="text-white">
                    <h1 className="display-2">Bienvenidos a tienda online</h1>
                    <h2 className="display-4">Ofertas de la semana</h2>
                    <hr className="bg-white"/>
                </Container>
            </Jumbotron>     
            <Container>
                <Row>
                    <Col>             

                        {
                            props.productos.map(item => <Producto key={item.id} id={item.id} data={item.data()}/>)
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home
