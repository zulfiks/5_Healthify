import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/login.css'; 

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    
    if (!email || !password) {
      setError('Email dan Password tidak boleh kosong!');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // 1. Kirim data ke Backend Flask
// Ganti IP angka menjadi 'localhost' atau '127.0.0.1'
            const response = await fetch('http://192.168.1.7:5000/api/login/admin', {
            headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 2. Jika Login Berhasil (HTTP 200)
        console.log('Login sukses:', data);
        
        // (Opsional) Simpan status login di localStorage biar kalau refresh gak logout
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminEmail', email);

        navigate('/admin'); // Pindah ke Dashboard
      } else {
        // 3. Jika Gagal (HTTP 401/400)
        setError(data.message || 'Login gagal. Cek kembali email sandi.');
      }

    } catch (err) {
      console.error("Error login:", err);
      setError("Terjadi kesalahan koneksi ke server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      
      <div className="login-illustration">
        <img src="/assets/image.png" alt="Running Illustration" />
      </div>

      <div className="login-form-container">
        <img src="/assets/healthify logo.png" alt="Healthify Logo" className="app-logo" />
        <h1 className="app-title">Healthify</h1>

        <div className="login-card">
          <h2>LOGIN</h2>
          
          <form className="login-form" onSubmit={handleLogin}>
            {error && <p className="error-message" style={{color: 'red', textAlign: 'center'}}>{error}</p>}
            
            <label htmlFor="email">Email</label>
            <div className="input-group">
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@healthify.com"
              />
            </div>

            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukan password"
              />
            </div>

            <button 
              type="submit" 
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Memproses...' : 'Log in'}
            </button>
          </form>

          <div className="login-links">
            <a href="#">Lupa Sandi?</a>
            <p>Belum punya akun? <span style={{color:'#aaa'}}>Hubungi IT</span></p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;