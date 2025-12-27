import React from 'react';
import './css/register.css';

function Register() {
    return (
        <div className="register-container">
      <img src="/assets/healthify logo.png" alt="Healthify Logo" className="app-logo" />
            <h1 className='app-title'>Healthify</h1>

            <div className='register-card'>
                <h2>Sign up</h2>

                <form className='register-form'>
                    <label htmlFor='nama'>Nama</label>
                    <div className='input-group'>
                        <input type='text' id='nama' name='nama' />
                    </div>

                    <label htmlFor='email'>Email</label>
                    <div className='input-group'>
                        <input type='email' id='email' name='email'/>
                    '</div>
                    <label htmlFor='password'>Password</label>
                    <div className='input-group'>
                        <input type='password' id='password' name='password'></input>
                    </div>

                    <label htmlFor='konfirmasi-password'>Konfirmasi Password</label>
                    <div className='input-group'>
                        <input type='password' id='konfirmasi-password' name='password'></input>
                    </div>

                    <button type='submit' className='register-button'>Masuk</button>
                </form>
                  
                  <div className='register-links'>
                    <p>sudah punya akun? <a href='/login' className='login-link'>masuk disini</a></p>
                </div>
            </div>
                  <p className="design-credit">design by kel yareuuuu</p>

        </div>
    );
} 

export default Register;