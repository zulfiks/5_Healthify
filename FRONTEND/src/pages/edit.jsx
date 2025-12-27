import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './css/admin.css';
import Sidebar from './sidebar.jsx';

// Data dummy untuk simulasi, agar kita punya sesuatu untuk diedit
// Di aplikasi nyata, data ini akan diambil dari server/database
const DUMMY_ARTICLES = [
    { id: 1, judul: 'Isi Piringku', kategori: 'Pola Makan', tautan: 'http://link.satu' },
    { id: 2, judul: 'A day in', kategori: 'Hidup Sehat', tautan: 'http://link.dua' },
    { id: 3, judul: 'Memulai Olahraga', kategori: 'Olahraga', tautan: 'http://link.tiga' },
    { id: 4, judul: 'Diet', kategori: 'Nutrisi', tautan: 'http://link.empat' },
    { id: 5, judul: '4 Sehat', kategori: 'Pola Makan', tautan: 'http://link.lima' },
    { id: 6, judul: 'Senam', kategori: 'Olahraga', tautan: 'http://link.enam' },
];

function FormKonten() {
  const navigate = useNavigate();
  // useParams() mengambil parameter dari URL, dalam kasus ini adalah 'id'
  const { id } = useParams(); 

  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('');
  const [tautan, setTautan] = useState('');

  // isEditMode akan bernilai 'true' jika ada 'id' di URL
  const isEditMode = Boolean(id); 

  // useEffect ini berjalan saat halaman dimuat
  // Jika ini mode edit, ia akan mencari artikel yang sesuai dan mengisi form
  useEffect(() => {
    if (isEditMode) {
      console.log(`Mode Edit untuk ID: ${id}`);
      const artikelToEdit = DUMMY_ARTICLES.find(item => item.id === parseInt(id));
      if (artikelToEdit) {
        setJudul(artikelToEdit.judul);
        setKategori(artikelToEdit.kategori);
        setTautan(artikelToEdit.tautan);
      }
    }
  }, [id, isEditMode]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!judul || !kategori || !tautan) {
      alert('Semua field harus diisi!');
      return;
    }

    const formData = { id: isEditMode ? parseInt(id) : Date.now(), judul, kategori, tautan };

    if (isEditMode) {
      // Di aplikasi nyata, Anda akan mengirim request 'PUT' atau 'PATCH' ke server
      console.log('Memperbarui data:', formData);
    } else {
      // Di aplikasi nyata, Anda akan mengirim request 'POST' ke server
      console.log('Menambah data baru:', formData);
    }
    
    // Kembali ke halaman daftar konten setelah submit
    navigate('/admin/konten-eduksi');
  };

  return (
    <div className="admin-page-container">
        <Sidebar />
        <main className="main-content">
            <header className="main-header">
                {/* Judul halaman berubah sesuai mode */}
                <h1>{isEditMode ? 'Edit Konten Edukasi' : 'Tambah Konten Baru'}</h1>
                <button onClick={() => navigate(-1)} className="back-button">Back</button>
            </header>

            <form onSubmit={handleSubmit} className="content-form">
                <div className="form-group">
                    <label htmlFor="judul">Judul</label>
                    <input 
                        type="text" 
                        id="judul" 
                        value={judul}
                        onChange={(e) => setJudul(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="kategori">Kategori</label>
                    <input 
                        type="text" 
                        id="kategori" 
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tautan">Tautan</label>
                    <input 
                        type="text" 
                        id="tautan" 
                        value={tautan}
                        onChange={(e) => setTautan(e.target.value)}
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="button-submit">
                        {/* Teks tombol berubah sesuai mode */}
                        {isEditMode ? 'Simpan Perubahan' : 'Tambah Konten'}
                    </button>
                </div>
            </form>
        </main>
    </div>
  );
}

export default FormKonten;

