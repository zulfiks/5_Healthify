import React, { useState, useEffect } from 'react';
import { Search, Trash2, Trophy } from 'lucide-react'; // Hapus import Edit dan X karena tidak dipakai lagi
import './css/admin.css';
import Sidebar from './sidebar.jsx';

function Akun() {
  const [semuaPengguna, setSemuaPengguna] = useState([]);
  const [penggunaTampil, setPenggunaTampil] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // NOTE: State untuk Modal (showModal, formData, currentId) sudah DIHAPUS

  // 1. FETCH DATA
  const fetchUsers = () => {
    setLoading(true);
    fetch('http://192.168.1.7:5000/api/users')
      .then(res => res.json())
      .then(data => {
        // Urutkan berdasarkan Poin Tertinggi (Leaderboard Style)
        const sortedData = data.sort((a, b) => b.poin - a.poin);
        setSemuaPengguna(sortedData);
        setPenggunaTampil(sortedData);
        setLoading(false);
      })
      .catch(err => console.error("Error:", err));
  };

  useEffect(() => { fetchUsers(); }, []);

  // NOTE: handleEdit dan handleSubmit sudah DIHAPUS

  // 2. DELETE FUNCTION (TETAP ADA)
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus user ini selamanya?")) {
      fetch(`http://192.168.1.7:5000/api/users/${id}`, { 
        method: 'DELETE' 
      })
      .then(res => {
        if (res.ok) {
          return res.json().then(data => {
             alert("User berhasil dihapus!"); 
             fetchUsers(); // Refresh data
          });
        } else {
          throw new Error("Gagal menghapus user. Cek backend.");
        }
      })
      .catch(err => {
        console.error("Error deleting:", err);
        alert("Gagal menghapus! Kemungkinan user ini memiliki data riwayat (Foreign Key) di database yang tidak boleh hilang.");
      });
    }
  };

  // 3. SEARCH FUNCTION
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === '') { setPenggunaTampil(semuaPengguna); } 
    else {
      const filtered = semuaPengguna.filter(u => u.nama.toLowerCase().includes(term));
      setPenggunaTampil(filtered);
    }
  };

  return (
    <div className="admin-page-container">
      <Sidebar />
      <main className="main-content">
        <header className="main-header"><h1>Manajemen Akun (Leaderboard)</h1></header>

        <div className="report-table-section">
          <div className="search-bar-container">
             <Search className="search-icon" size={18} style={{position:'absolute', left:'10px', top:'50%', transform:'translateY(-50%)', color:'#999'}}/>
             <input type="text" placeholder="Cari pengguna..." className="search-input" value={searchTerm} onChange={handleSearch} style={{paddingLeft:'35px'}}/>
          </div>

          {loading ? <p>Memuat...</p> : (
            <table className="report-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Pengguna</th>
                  <th>Email</th>
                  <th>Fisik (T/B)</th>
                  <th>Poin</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {penggunaTampil.map((user, index) => (
                  <tr key={user.id}>
                    <td>#{index + 1}</td>
                    <td><strong>{user.nama}</strong><br/><span style={{fontSize:'12px', color:'#888'}}>{user.gender}, {user.umur} thn</span></td>
                    <td>{user.email}</td>
                    <td>{user.tinggi}cm / {user.berat}kg</td>
                    <td>
                      <span style={{display:'flex', alignItems:'center', gap:'5px', color:'#d97706', fontWeight:'bold'}}>
                        <Trophy size={14}/> {user.poin}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {/* Tombol Edit DIHAPUS, sisa tombol Delete saja */}
                        <button className="delete-button" onClick={() => handleDelete(user.id)} title="Hapus User">
                          <Trash2 size={14}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal Pop-up Edit sudah DIHAPUS sepenuhnya dari sini */}
        
      </main>
    </div>
  );
}
export default Akun;