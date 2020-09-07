import React, {useState} from 'react';
import firebase from '../Config/firebase';
import { Button, Form, Row, Col, Container, InputGroup, FormControl}  from 'react-bootstrap';


const ProductoAlta = () => {
    const [datos, setDatos] = useState({name : '', price : '', sku : '', descripcion : ''});
    
    const handleChange = (e) => {
        const target = e.target
        const value = target.value;
        const name = target.name;

        setDatos({
            ...datos,
            [name] : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Conectando a la bd de Firebase e insertando datos
        firebase.db.collection('productos').add(datos)
        .then(function(docRef) {
            console.log("Documento insertado con ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error al añadir documento: ", error);
        });

        // Limpiamos el formulario
        setDatos({name : '', price : '', sku : '', descripcion : ''});

    };

    return (
        <>
            <Container>
                <h2 className="text-center">Carga de Productos</h2>
                <Row className="justify-content-center">
                    <Col className="col-12 col-sm-8 col-md-6 col-xl-4">
                        <Form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3">
                                <FormControl placeholder="Ingrese nuevo procuto" type="text" name="name" value={datos.name} onChange={handleChange} required/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl placeholder="Ingrese el precio del procuto" type="number" name="price" value={datos.price} onChange={handleChange} required/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl placeholder="Ingrese SKU del procuto" type="text" name="sku" value={datos.sku} onChange={handleChange} required/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <FormControl placeholder="Ingrese descripcion del procuto" type="text" name="descripcion" value={datos.descripcion} onChange={handleChange} required/>
                            </InputGroup>
                            <Button type="submit" variant="success" block>Guardar</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            
            
            
            {/*<form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre: </label>
                    <input type="text" name="name" value={datos.name} onChange={handleChange}/>
                </div>
                <div>
                    <label>Precio: </label>
                    <input type="number" name="price" value={datos.price} onChange={handleChange}/>
                </div>
                
            </form> */}
        </>
    )
}

export default ProductoAlta;
