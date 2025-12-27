import React, { useState, useEffect } from 'react';
import { ImageIcon, Trash2 } from 'lucide-react'; // Tambah Icon Trash
import './css/admin.css';
import Sidebar from './sidebar.jsx';

function LaporanKendala() {
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH DATA ---
  const fetchLaporan = () => {
    fetch('http://192.168.1.7:5000/api/laporan')
      .then(res => res.json())
      .then(data => {
        // Urutkan dari yang terbaru (ID besar ke kecil)
        const sorted = data.sort((a, b) => b.id - a.id);
        setLaporan(sorted);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  };

  useEffect(() => {
    fetchLaporan();
  }, []);

  // --- GANTI STATUS ---
  const handleStatusChange = (id, newStatus) => {
    fetch(`http://192.168.1.7:5000/api/laporan/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
    .then(res => {
      if (res.ok) {
        fetchLaporan(); // Refresh otomatis
      }
    });
  };

  // --- HAPUS LAPORAN ---
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus laporan ini?")) {
      fetch(`http://192.168.1.7:5000/api/laporan/${id}`, {
        method: 'DELETE'
      })
      .then(res => {
        if (res.ok) {
          alert("Laporan dihapus!");
          fetchLaporan();
        } else {
          alert("Gagal menghapus.");
        }
      });
    }
  };

  // --- WARNA STATUS ---
  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' }; // HIJAU (Request user)
      case 'Proses':  return { bg: '#fef9c3', text: '#854d0e', border: '#fde047' }; // KUNING
      case 'Selesai': return { bg: '#dbeafe', text: '#1e40af', border: '#bfdbfe' }; // BIRU
      default: return { bg: '#f3f4f6', text: '#374151', border: '#e5e7eb' };
    }
  };

  return (
    <div className="admin-page-container">
      <Sidebar />
      <main className="main-content">
        <header className="main-header"><h1>Laporan Kendala</h1></header>

        <div className="report-table-section">
          {loading ? <p>Memuat...</p> : (
            <table className="report-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Pengguna</th>
                  <th>Tanggal</th>
                  <th>Deskripsi</th>
                  <th>Bukti</th>
                  <th>Status</th>
                  <th>Aksi</th> {/* Kolom Hapus */}
                </tr>
              </thead>
              <tbody>
                {laporan.map((item) => {
                  const style = getStatusColor(item.status);
                  return (
                    <tr key={item.id}>
                      <td>#{item.id}</td>
                      <td>
                        <strong>{item.pengguna}</strong><br/>
                        <span style={{fontSize:'11px', color:'#777'}}>{item.email}</span>
                      </td>
                      <td>{item.tanggal}</td>
                      <td>{item.deskripsi}</td>
                      
                      {/* BUKTI FOTO */}
                      <td>
                        {item.image ? (
                          <a 
                            href={`http://192.168.1.7:5000/static/uploads/${item.image}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            style={{
                              color:'#0d9488', display:'flex', gap:'5px', 
                              alignItems:'center', textDecoration:'none', fontWeight:'bold'
                            }}
                          >
                            <ImageIcon size={16}/> Lihat Foto
                          </a>
                        ) : (
                          <span style={{color:'#ccc'}}>-</span>
                        )}
                      </td>

                      {/* DROPDOWN STATUS WARNA-WARNI */}
                      <td>
                        <select 
                          value={item.status} 
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '20px',
                            border: `1px solid ${style.border}`,
                            backgroundColor: style.bg,
                            color: style.text,
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '12px',
                            appearance: 'none', // Hilangkan panah default browser biar rapi
                            textAlign: 'center'
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Proses">Proses</option>
                          <option value="Selesai">Selesai</option>
                        </select>
                      </td>

                      {/* TOMBOL HAPUS */}
                      <td>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="delete-button"
                          style={{padding: '6px', borderRadius: '6px'}}
                          title="Hapus Laporan"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
export default LaporanKendala;