import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Utensils, BookOpen, AlertCircle, 
  X, Save, User, LogOut, ChevronRight, Lock
} from 'lucide-react';
import './css/admin.css';

// Gunakan localhost agar stabil
const API_BASE_URL = 'http://192.168.1.7:5000'; 

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // State Profil
  const [adminData, setAdminData] = useState({ nama: 'Admin', email: '' });
  const [showModal, setShowModal] = useState(false);
  
  // State Form Edit
  const [formData, setFormData] = useState({ 
    nama: '', 
    passwordLama: '', 
    passwordBaru: '',
    konfirmasiPassword: '' 
  });

  // 1. Ambil Data Profil Saat Dimuat
  useEffect(() => {
    const email = localStorage.getItem('adminEmail');
    if (email) {
      fetch(`${API_BASE_URL}/api/admin/profile?email=${email}`)
        .then(res => {
            if (!res.ok) throw new Error("Gagal mengambil data");
            return res.json();
        })
        .then(data => { if (data.nama) setAdminData(data); })
        .catch(err => console.error("Koneksi Error:", err));
    }
  }, []);

  const handleProfileClick = () => {
    // Reset form saat modal dibuka, isi nama dengan data terbaru
    setFormData({ 
        nama: adminData.nama, 
        passwordLama: '', 
        passwordBaru: '', 
        konfirmasiPassword: '' 
    });
    setShowModal(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    // Validasi Password Baru
    if (formData.passwordBaru && formData.passwordBaru !== formData.konfirmasiPassword) {
        alert("Password baru dan konfirmasi tidak cocok!");
        return;
    }
    
    // Validasi Password Lama (Wajib jika ingin ganti password)
    if (formData.passwordBaru && !formData.passwordLama) {
        alert("Harap masukkan password lama untuk keamanan.");
        return;
    }

    const email = localStorage.getItem('adminEmail');
    
    fetch(`${API_BASE_URL}/api/admin/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email_lama: email, 
        nama: formData.nama, 
        password_lama: formData.passwordLama, 
        password_baru: formData.passwordBaru   
      })
    })
    .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Gagal update profil");
        return data;
    })
    .then(() => {
      alert("Profil berhasil diperbarui!");
      // Update tampilan nama langsung tanpa refresh
      setAdminData(prev => ({ ...prev, nama: formData.nama }));
      setShowModal(false);
    })
    .catch(err => {
        console.error(err);
        alert("Error: " + err.message);
    });
  };

  const handleLogout = () => {
    if(window.confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.clear();
      navigate('/logan');
    }
  };

  const isActive = (path) => currentPath === path ? 'active' : '';

  return (
    <>
      <aside className="sidebar">
        {/* HEADER */}
        <div className="sidebar-header">
          <img src="/assets/healthify logo.png" alt="logo" width="32" />
          <span>Healthify<span style={{color:'#333'}}>Admin</span></span>
        </div>

        {/* NAVIGASI */}
        <nav className="sidebar-nav">
          <div onClick={() => navigate('/admin')} className={`nav-item ${isActive('/admin')}`}>
            <LayoutDashboard size={20} /> <span>Dashboard</span>
          </div>
          <div onClick={() => navigate('/akun')} className={`nav-item ${isActive('/akun')}`}>
            <Users size={20} /> <span>Manajemen Akun</span>
          </div>
          <div onClick={() => navigate('/konten')} className={`nav-item ${currentPath.startsWith('/konten') ? 'active' : ''}`}>
            <BookOpen size={20} /> <span>Konten Edukasi</span>
          </div>
          <div onClick={() => navigate('/kendala')} className={`nav-item ${isActive('/kendala')}`}>
            <AlertCircle size={20} /> <span>Laporan Kendala</span>
          </div>
          <div onClick={() => navigate('/kelola')} className={`nav-item ${isActive('/kelola-makanan')}`}>
            <Utensils size={20} /> <span>Kelola Makanan</span>
          </div>
        </nav>

        {/* FOOTER: PROFIL & LOGOUT */}
        <div className="sidebar-footer">
          <div className="admin-profile" onClick={handleProfileClick} title="Klik untuk edit profil">
            {/* LOGIC AVATAR DINAMIS DI SINI */}
            <img 
              src={`https://placehold.co/40x40/EFEFEF/0d9488?text=${adminData.nama ? adminData.nama.charAt(0).toUpperCase() : 'A'}`} 
              alt="avatar" 
              style={{ borderRadius: '10px' }} 
            />
            <div className="admin-info" style={{flex: 1}}>
              <strong>{adminData.nama}</strong>
              <span>Admin <ChevronRight size={12}/></span>
            </div>
          </div>
          
          <div onClick={handleLogout} className="nav-item" style={{color:'#ef4444', marginTop:'5px'}}>
            <LogOut size={20} /> <span>Logout</span>
          </div>
        </div>
      </aside>

      {/* --- MODAL EDIT PROFIL UPDATE --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{display:'flex', alignItems:'center', gap:'10px', margin:0}}>
                <User size={24} className="text-teal-600"/> Edit Profil
              </h2>
              <button className="close-btn" onClick={() => setShowModal(false)}><X size={24}/></button>
            </div>
            
            <form onSubmit={handleSaveProfile} style={{marginTop:'20px'}}>
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input 
                  type="text" 
                  value={formData.nama} 
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  required 
                />
              </div>

              <hr style={{margin: '20px 0', border: '0', borderTop: '1px solid #eee'}} />
              <p style={{fontSize: '12px', color: '#666', marginBottom: '10px'}}>
                <Lock size={12} style={{marginRight: '5px'}}/>
                Isi di bawah ini HANYA jika ingin mengganti password
              </p>

              <div className="form-group">
                <label>Password Lama (Verifikasi)</label>
                <input 
                  type="password" 
                  placeholder="Masukkan password saat ini" 
                  value={formData.passwordLama} 
                  onChange={(e) => setFormData({...formData, passwordLama: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Password Baru</label>
                <input 
                  type="password" 
                  placeholder="Password baru" 
                  value={formData.passwordBaru} 
                  onChange={(e) => setFormData({...formData, passwordBaru: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Konfirmasi Password Baru</label>
                <input 
                  type="password" 
                  placeholder="Ulangi password baru" 
                  value={formData.konfirmasiPassword} 
                  onChange={(e) => setFormData({...formData, konfirmasiPassword: e.target.value})}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Batal</button>
                <button type="submit" className="save-btn">
                  <Save size={18}/> Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;