import React from 'react'
import {Link} from "react-router-dom";
import {ListGroup, Container, Row, Col}  from 'react-bootstrap';

const Producto = (props) => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <ListGroup>
                            <ListGroup.Item variant="success" as={Link} to={'/producto/detalle/'+props.id}>{props.data.name}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
            
            {/*<ul>
                <li>
                    <Link to={'/producto/detalle/'+props.id}>{props.data.name}</Link>
                </li>
            </ul> */}
        </>
    )
}

export default Producto
