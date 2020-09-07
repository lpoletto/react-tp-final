import React, {useEffect, useState} from 'react';
import firebase from '../Config/firebase';
import { Button }  from 'react-bootstrap';



const ProductoDetalle = (props) => {
    const [producto, setProducto] = useState({});
    const [mensaje, setMensaje] = useState('');

    useEffect( () => {
        firebase.db.doc("productos/"+props.match.params.id)
        .get()
        .then(doc => {
            setProducto(doc.data());
        });
        
        /* fetch(`https://jsonfy.com/items/${props.match.params.id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setProducto(result[0])
                },
                (error) => {
                    alert(error);
                }
            ) */
    }, [props.match.params.id]);

    const handeClick = () => {
        setMensaje("¡Gracias por su compra!");
    }
    
    return (
        <div className="text-center">
            <h3>{producto.name}</h3>
            <p>Precio: ${producto.price}</p>
            <p>SKU: {producto.sku}</p>
            <p>Descripción: {producto.descripcion}</p>
            <hr/>
            <div>
                <Button variant="success" onClick={handeClick}>Comprar</Button><br/>
                <p>{mensaje}</p>
            </div>
        </div>
    )
}

export default ProductoDetalle;
