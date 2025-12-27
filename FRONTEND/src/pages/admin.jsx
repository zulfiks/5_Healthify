import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/admin.css';
import Sidebar from './sidebar.jsx';

function Admin() {
  const navigate = useNavigate();
  
  // State untuk menyimpan data statistik & tabel
  const [stats, setStats] = useState({
    users: 0,
    konten: 0,
    laporan: 0
  });
  const [laporanTerbaru, setLaporanTerbaru] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- FUNGSI AMBIL SEMUA DATA (Parallel Fetching) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Kita panggil 3 API sekaligus biar cepat
        const [resUsers, resKonten, resLaporan] = await Promise.all([
          fetch('http://192.168.1.7:5000/api/users'),
          fetch('http://192.168.1.7:5000/api/konten'),
          fetch('http://192.168.1.7:5000/api/laporan')
        ]);

        const dataUsers = await resUsers.json();
        const dataKonten = await resKonten.json();
        const dataLaporan = await resLaporan.json();

        // Update State Statistik
        setStats({
          users: dataUsers.length,
          konten: dataKonten.length,
          laporan: dataLaporan.length
        });

        // Ambil 5 laporan terakhir untuk ditampilkan di tabel dashboard
        // (Kita balik urutannya biar yang terbaru di atas, lalu ambil 5)
        const recentLaporan = dataLaporan.reverse().slice(0, 5);
        setLaporanTerbaru(recentLaporan);

        setIsLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-page-container">
      
      {/* Sidebar dengan navigasi */}
      <Sidebar />

      <main className="main-content">
        <header className="main-header">
          <h1>Dashboard Admin</h1>
        </header>

        {/* --- KARTU STATISTIK --- */}
        <section className="stats-cards">
          <div className="stat-card">
            <p>Total Pengguna</p>
            <span>{isLoading ? '...' : stats.users}</span>
          </div>
          <div className="stat-card">
            <p>Artikel Edukasi</p>
            <span>{isLoading ? '...' : stats.konten}</span>
          </div>
          <div className="stat-card">
            <p>Laporan Masuk</p>
            <span>{isLoading ? '...' : stats.laporan}</span>
          </div>
        </section>

        {/* --- TABEL LAPORAN TERBARU --- */}
        <section className="report-table-section">
          <h2>Laporan Kendala Terbaru</h2>
          <table className="report-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Pengguna</th>
                <th>Tanggal</th>
                <th>Kendala</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                    Sedang memuat data...
                  </td>
                </tr>
              ) : laporanTerbaru.length > 0 ? (
                laporanTerbaru.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.pengguna}</td>
                    <td>{item.tanggal}</td>
                    <td>{item.deskripsi}</td> {/* Sesuaikan dengan nama kolom di DB */}
                    <td>
                      <span className={`status ${item.status ? item.status.toLowerCase() : ''}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                    Belum ada laporan masuk.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default Admin;