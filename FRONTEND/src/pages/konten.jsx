import React, { useState, useEffect } from 'react';
import { 
  LucidePlus, LucideEdit, LucideTrash2, LucideExternalLink, LucideX, LucideImage 
} from 'lucide-react';
import './css/admin.css'; 
import Sidebar from './sidebar.jsx'; 

function KontenEdukasi() {
  const [artikel, setArtikel] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false); 
  const [currentId, setCurrentId] = useState(null);
  
  // TAMBAHAN: Ada field 'foto' sekarang
  const [formData, setFormData] = useState({
    judul: '',
    kategori: 'Pola Makan',
    publikasi: '',
    tautan: '',
    foto: '' 
  });

  const fetchKonten = () => {
    setLoading(true);
    fetch('http://192.168.1.7:5000/api/konten')
      .then((res) => res.json())
      .then((data) => {
        setArtikel(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal ambil data:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchKonten();
  }, []);

  const handleAddNew = () => {
    setIsEdit(false);
    // Reset form termasuk foto
    setFormData({ judul: '', kategori: 'Pola Makan', publikasi: '', tautan: '', foto: '' });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setCurrentId(item.id);
    setFormData({
      judul: item.judul,
      kategori: item.kategori,
      publikasi: item.publikasi, 
      tautan: item.tautan,
      foto: item.foto || '' // Load foto jika ada
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEdit 
      ? `http://192.168.1.7:5000/api/konten/${currentId}` 
      : 'http://192.168.1.7:5000/api/konten';
      
    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      alert(isEdit ? "Data berhasil diperbarui!" : "Data berhasil ditambahkan!");
      setShowModal(false);
      fetchKonten(); 
    })
    .catch(err => console.error("Error saving:", err));
  };

  const handleHapus = (id) => {
    if (window.confirm('Yakin ingin menghapus data ini selamanya?')) {
      fetch(`http://192.168.1.7:5000/api/konten/${id}`, { method: 'DELETE' })
        .then(res => {
          if (res.ok) {
            alert("Data berhasil dihapus!");
            fetchKonten(); 
          } else {
             alert("Gagal menghapus (Cek Backend)");
          }
        })
        .catch(err => console.error("Gagal menghapus:", err));
    }
  };

  return (
    <div className="admin-page-container">
      <Sidebar />

      <main className="main-content">
        <header className="main-header">
          <h1>Konten Edukasi</h1>
          <button className="add-new-button" onClick={handleAddNew}>
            <LucidePlus size={16} /> Add new
          </button>
        </header>

        <section className="report-table-section">
          {loading ? <p>Memuat data...</p> : (
            <table className="report-table">
              <thead>
                <tr>
                  <th>Cover</th> {/* KOLOM BARU */}
                  <th>Judul</th>
                  <th>Kategori</th>
                  <th>Publikasi</th>
                  <th>Tautan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {artikel.length > 0 ? (
                  artikel.map((item) => (
                    <tr key={item.id}>
                      {/* TAMPILKAN GAMBAR */}
                      <td>
                        {item.foto ? (
                          <img 
                            src={item.foto} 
                            alt="Cover" 
                            style={{width:'50px', height:'40px', objectFit:'cover', borderRadius:'4px'}}
                            onError={(e) => {e.target.style.display='none'}} // Sembunyikan jika link rusak
                          />
                        ) : (
                          <div style={{width:'50px', height:'40px', background:'#eee', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <LucideImage size={16} color="#ccc"/>
                          </div>
                        )}
                      </td>
                      <td><strong>{item.judul}</strong></td>
                      <td>{item.kategori}</td>
                      <td>{item.publikasi}</td>
                      <td>
                         <a href={item.tautan} target="_blank" rel="noreferrer" className="link-style">
                           Link <LucideExternalLink size={12}/>
                         </a>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="edit-button" onClick={() => handleEdit(item)}>
                            <LucideEdit size={14} />
                          </button>
                          <button className="delete-button" onClick={() => handleHapus(item.id)}>
                            <LucideTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding:'20px' }}>
                      Belum ada konten edukasi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </section>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{isEdit ? 'Edit Konten' : 'Tambah Konten Baru'}</h2>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  <LucideX size={24}/>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Judul Konten</label>
                  <input type="text" required value={formData.judul} onChange={(e) => setFormData({...formData, judul: e.target.value})} />
                </div>

                <div className="form-group">
                  <label>Kategori</label>
                  <select value={formData.kategori} onChange={(e) => setFormData({...formData, kategori: e.target.value})}>
                    <option value="Pola Makan">Pola Makan</option>
                    <option value="Hidup Sehat">Hidup Sehat</option>
                    <option value="Olahraga">Olahraga</option>
                    <option value="Nutrisi">Nutrisi</option>
                  </select>
                </div>

                {/* INPUT BARU UNTUK GAMBAR */}
                <div className="form-group">
                  <label>URL Gambar (Link Foto)</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: https://i.imgur.com/abc.jpg"
                    value={formData.foto}
                    onChange={(e) => setFormData({...formData, foto: e.target.value})}
                  />
                  <small style={{color:'#888', fontSize:'11px'}}>*Masukkan link gambar langsung (akhiran .jpg/.png)</small>
                </div>

                <div className="form-group">
                  <label>Tanggal Publikasi</label>
                  <input type="date" required value={formData.publikasi} onChange={(e) => setFormData({...formData, publikasi: e.target.value})} />
                </div>

                <div className="form-group">
                  <label>Link Artikel (Tautan)</label>
                  <input type="url" required value={formData.tautan} onChange={(e) => setFormData({...formData, tautan: e.target.value})} />
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Batal</button>
                  <button type="submit" className="save-btn">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default KontenEdukasi;