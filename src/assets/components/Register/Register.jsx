/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Register.css'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth'
import app from '../Firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('');
        setError('')
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        console.log(name,email,password)

        // password validation
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Please Add Atleast One Uppercase')
            return
        }
        //firebase email signin 
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                setSuccess('Successfully Registered')
                event.target.reset()
                verifyEmail(loggedUser);
            })
            .catch(error => {
                console.error(error)
                setError(error.message)
            })
    }

    const updateUserData = (user, name)=> {
        updateUserData(user, {
            dasplayName : name
        })
        .then(()=>{
            console.log('user name updated')
        })
        .catch(error=>{
            setError(error.message)
        })
    }

    const verifyEmail = user => {

        // email verification
        sendEmailVerification(user)
            .then(result => {
                console.log(result);
                alert('please verify your email address')
            })
    }

    return (
        <div className='register-form'>
            <h2 className='mb-4'>Please Register</h2>
            <form onSubmit={handleSubmit}>
                <input className='w-25 p-2 mb-2 rounded' type="text" name="name" placeholder='Enter Your name' id="name" />
                <br />
                <input className='w-25 p-2 mb-2 rounded' type="email" name="email" placeholder='Enter Your Email' id="email" />
                <br />
                <input className='w-25 p-2 mb-2 rounded' type="password" name="password" placeholder='Enter Your Password' id="password" />
                <br />
                <input className='btn btn-primary w-25' type="submit" value="Register" />
            </form>
            <p className='mt-4'>Already have an Account? Please <Link to="/login">Login</Link></p>

            <p className='w-25 mx-auto mt-4 text-danger'>{error}</p>
            <p className='w-25 mx-auto mt-4 text-success'>{success}</p>
        </div>
    );
};

export default Register;