// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import app from '../Firebase/firebase.config';

const auth = getAuth(app);

const Login = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

    const handleLogin = event => {

        event.preventDefault();
        setError('');
        setSuccess('');
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                setSuccess('Successfully loggedin');
            })
            .catch(error => {
                setError(error.message)
            })

    }

    const handleReset = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert('please provide a email address')
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('check your email')
            })
    }

    const myFunction = () => {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    return (
        <div className='text-center mt-5'>
            <h2 className='mb-4'>Please Login</h2>
            <form onSubmit={handleLogin}>
                <input className='w-25 p-2 mb-2 rounded' type="email" ref={emailRef} name="email" placeholder='Enter Your Email' id="email" />
                <br />
                <input className='w-25 p-2 mb-2 rounded' type="password" name="password" placeholder='Enter Your Password' id="password" />
                <br />
                <p className='d-flex align-items-center justify-content-center'><input type="checkbox" onClick={myFunction} />show password</p>
                <input className='btn btn-primary w-25' type="submit" value="Login" />
            </form>

            <p className='my-4'>Forgot password? Please <Link onClick={handleReset}>Reset password</Link></p>
            <p className='my-4'>New to this site? Please <Link to="/register">Register</Link></p>
            <p>{error}</p>
            <p>{success}</p>
        </div>
    );
};

export default Login;