import React, {useEffect, useState} from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Registro from './Components/Registro';
import Login from './Components/Login';
import Home from './Components/Home';
import ProductoDetalle from './Components/ProductoDetalle';
import ProductoAlta from './Components/ProductoAlta';
import firebase from './Config/firebase';
import { Navbar, Nav}  from 'react-bootstrap';
import { useFirebaseApp } from 'reactfire';

function App() {
  
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const firebase = useFirebaseApp();

  useEffect( () => {
    firebase.db.collection("productos").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            setItems(...items, querySnapshot.docs)
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        setError(error);
      });

  }, []);


  if (error) {
    return <div>Error: {error.message}</div>
  } else {
      return (
        <BrowserRouter>
        <>
          <header>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand as={Link} to="/">Mi Tienda</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/registro">Registro</Nav.Link>
                <Nav.Link as={Link} to="/producto/alta">Cargar de productos</Nav.Link>
              </Nav>
            </Navbar>
          </header>

          <Switch>
            <Route path="/producto/alta" exact component={ProductoAlta} />
            <Route path="/producto/detalle/:id" exact component={ProductoDetalle} />
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/registro">
              <Registro/>
            </Route>
            <Route path="/" exact component={()=> <Home productos={items} />} />
          </Switch>
        </>
      </BrowserRouter>
      );
  }
}

export default App;
