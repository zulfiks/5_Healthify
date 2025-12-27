import React, { useState } from 'react';
import './css/modal.css'; // Kita akan buat file CSS baru untuk modal

// Komponen ini menerima dua props:
// - `onClose`: fungsi untuk menutup modal
// - `onTambah`: fungsi untuk mengirim data artikel baru ke halaman induk
function TambahKontenModal({ onClose, onTambah }) {
  // State untuk setiap input di dalam form
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('');
  const [tautan, setTautan] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!judul || !kategori || !tautan) {
      alert('Semua field harus diisi!');
      return;
    }
    
    // Membuat objek artikel baru
    const artikelBaru = {
      id: Date.now(), // ID unik berdasarkan waktu saat ini
      judul,
      kategori,
      tautan,
      publikasi: new Date().toLocaleDateString('en-GB'), // Format tanggal dd/mm/yyyy
    };
    
    // Mengirim data baru ke komponen induk
    onTambah(artikelBaru);
    // Menutup modal setelah data dikirim
    onClose();
  };

  return (
    // Latar belakang gelap di belakang modal
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Tambah Konten Edukasi Baru</h2>
        <form onSubmit={handleSubmit}>
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
            {/* Tombol type="button" agar tidak men-submit form */}
            <button type="button" className="button-cancel" onClick={onClose}>Batal</button>
            <button type="submit" className="button-submit">Tambah</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TambahKontenModal;
