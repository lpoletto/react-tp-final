import React, {useState} from 'react'
import 'firebase/auth';
import {useFirebaseApp, useUser} from 'reactfire';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const firebase =  useFirebaseApp();
    const user = useUser(); 
    let history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();


        if(!email.trim()){
            //console.log('ingrese email');
            setError('Ingrese email');
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
        
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( () => {
                console.log('Pasando toda las validaciones', user.email);


                setTimeout(() => {
                    swal("¡Login correcto!", "¡Vamos al Home!", "success");
                    history.push('/');
                }, 2000)
                
            })
            .catch((error)=>{
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                
                console.error(errorCode);
                swal ( "Oops" ,  errorMessage ,  "error" )
            });

        setEmail('');
        setPassword('');
        setError('');
    }

    
    return (
        <div className="mt-5">
            <h3 className="text-center">
                ¡Hola de nuevo! Inicia sesión para continuar :)
            </h3>
            
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={handleSubmit}>
                        {
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
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
                            Iniciar sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
