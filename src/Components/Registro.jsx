import React, {useState} from 'react'
import 'firebase/auth';
import {useFirebaseApp} from 'reactfire';
import { useHistory } from "react-router-dom";
import firebase from '../Config/firebase';
import swal from 'sweetalert';



const Registro = (props) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    
    const firebase =  useFirebaseApp();
    let history = useHistory();
    
    const handleSubmitRegistro = (e) => {
        e.preventDefault();
        
        if(!email.trim()){
            //console.log('ingrese email');
            setError('Ingrese un email');
            return;
        }
        
        if(!password.trim()){
            //console.log('ingrese password');
            setError('Ingrese password');
            return;
        }
        
        if(password.length < 6){
            //console.log('Password debe ser mayor o igual a 6 carácteres');
            setError('Password debe ser mayor o igual a 6 carácteres');
            return;
        }
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( (data) => {
                console.log('Usuario creado', data.user.uid);
                firebase.db.collection("usuarios").add({
                    nombre: nombre,
                    apellido: apellido,
                    email: email,
                    userId: data.user.uid
                })

                setTimeout(function(){ 
                    swal("¡Buen trabajo!", "¡Tu cuenta se registro con éxito!", "success");
                    history.push('/login') 
                }, 1000);
            })
            .catch( (error) => {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                
                console.error(errorCode);
                swal ( "Oops" ,  errorMessage ,  "error" )
                
            });
            
            setNombre('');
            setApellido('');
            setEmail('');
            setPassword('');
            setError('');
    }
    


    return (
        <div className="mt-5">
            <h3 className="text-center">
                Registra tu cuenta, para obtener más beneficios :)
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={handleSubmitRegistro}>
                        {
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
                        <input 
                            type="text" 
                            className="form-control mb-2"
                            placeholder="Ingrese nombre"
                            value={nombre}
                            onChange={ e => setNombre(e.target.value)}
                        />
                        <input 
                            type="text" 
                            className="form-control mb-2"
                            placeholder="Ingrese apellido"
                            value={apellido}
                            onChange={ e => setApellido(e.target.value)}
                        />
                        <input 
                            type="email" 
                            className="form-control mb-2"
                            placeholder="Ingrese un email"
                            value={email}
                            onChange={ e => setEmail(e.target.value)}
                        />
                        <input 
                            type="password" 
                            className="form-control mb-2"
                            placeholder="Ingrese una contraseña"
                            value={password}
                            onChange={ e => setPassword(e.target.value)}
                        />
                        <button className="btn btn-success btn-lg btn-block" type="submit">
                            Registrarse
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registro
