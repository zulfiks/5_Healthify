import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import './css/logan.css'; // Pastikan file CSS ini ada di folder src/pages/css/

function LoginAdmin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Mengirim data login ke Backend Flask
// Ganti IP angka menjadi 'localhost' atau '127.0.0.1'
const response = await fetch('http://192.168.1.7:5000/api/login/admin', {
          method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login Berhasil
        localStorage.setItem('isAdminLoggedIn', 'true');
        // Simpan email admin yang login untuk keperluan sidebar nanti
        localStorage.setItem('adminEmail', email);
        
        navigate('/admin'); // Pindah ke Dashboard
      } else {
        // Login Gagal (Password salah / User tidak ada)
        setError(data.message || 'Login gagal. Periksa email dan sandi.');
      }
    } catch (err) {
      console.error(err);
      setError('Gagal terhubung ke server. Pastikan backend (app.py) sudah jalan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="elegant-container">
      <div className="elegant-card">
        
        {/* Hiasan Latar Belakang */}
        <div className="circle-deco top-right"></div>
        <div className="circle-deco bottom-left"></div>

        {/* BAGIAN KIRI: Branding / Logo */}
        <div className="card-left">
          <div className="brand-content">
            <div className="brand-header">
              <div className="brand-icon">H</div>
              <h1>Healthify Admin</h1>
            </div>
            <h2>Kelola Kesehatan<br/>Lebih Mudah.</h2>
            <p>Platform manajemen terpadu untuk memantau aktivitas pengguna dan konten edukasi.</p>
          </div>
          <div className="copyright">© 2025 Healthify Inc.</div>
        </div>

        {/* BAGIAN KANAN: Form Login */}
        <div className="card-right">
          <div className="form-header">
            <h3>Selamat Datang!</h3>
            <p>Silakan masuk untuk mengakses dashboard.</p>
          </div>

          {/* Kotak Pesan Error */}
          {error && (
            <div className="alert-box">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail className="icon" size={20} />
                <input
                  type="email"
                  required
                  placeholder="admin@healthify.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '60px' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock className="icon" size={20} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '60px' }}
                />
              </div>
            </div>

            <div className="form-options">
              <label><input type="checkbox" /> Ingat saya</label>
              <a href="#">Lupa Sandi?</a>
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 size={20} className="spin" /> Memproses...
                </>
              ) : (
                <>
                  Log In <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;