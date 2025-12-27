import React, { useState, useEffect } from 'react';
import { 
  Search, LucidePlus, LucideEdit, LucideTrash2, LucideX 
} from 'lucide-react';
import './css/admin.css'; 
import Sidebar from './sidebar.jsx';

function KelolaMakanan() {
  // State Data
  const [makanan, setMakanan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // State Modal & Form
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // Form Data sesuai kolom CSV
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    proteins: '',
    fat: '',
    carbohydrate: '',
    image: ''
  });

  // --- 1. GET DATA ---
  const fetchMakanan = () => {
    setLoading(true);
    fetch('http://192.168.1.7:5000/api/makanan')
      .then(res => res.json())
      .then(data => {
        setMakanan(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMakanan();
  }, []);

  // --- 2. HANDLER MODAL ---
  const handleAddNew = () => {
    setIsEdit(false);
    setFormData({ name: '', calories: '', proteins: '', fat: '', carbohydrate: '', image: '' });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setCurrentId(item.id);
    setFormData({
      name: item.name,
      calories: item.calories,
      proteins: item.proteins,
      fat: item.fat,
      carbohydrate: item.carbohydrate,
      image: item.image
    });
    setShowModal(true);
  };

  // --- 3. SAVE DATA (CREATE / UPDATE) ---
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const url = isEdit 
      ? `http://192.168.1.7:5000/api/makanan/${currentId}`
      : 'http://192.168.1.7:5000/api/makanan';
    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      alert(isEdit ? "Makanan diperbarui!" : "Makanan ditambahkan!");
      setShowModal(false);
      fetchMakanan(); // Refresh tabel
    })
    .catch(err => console.error("Error saving:", err));
  };

  // --- 4. DELETE DATA ---
  const handleHapus = (id) => {
    if (window.confirm('Yakin ingin menghapus makanan ini?')) {
      fetch(`http://192.168.1.7:5000/api/makanan/${id}`, { method: 'DELETE' })
        .then(res => {
          if (res.ok) {
            alert("Makanan dihapus!");
            fetchMakanan();
          }
        });
    }
  };

  // Filter Pencarian
  const filteredMakanan = makanan.filter((item) => {
    const nama = item.name || item.Food || item.Nama || ""; 
    return nama.toString().toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="admin-page-container">
      <Sidebar />

      <main className="main-content">
        <header className="main-header">
          <h1>Kelola Data Makanan</h1>
          <button className="add-new-button" onClick={handleAddNew}>
            <LucidePlus size={16} /> Add new
          </button>
        </header>

        <div className="report-table-section">
          
          {/* Search Bar */}
          <div className="search-bar-container" style={{marginBottom: '20px', position: 'relative', maxWidth: '300px'}}>
            <Search className="search-icon" size={18} style={{position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999'}} />
            <input 
              type="text" 
              className="search-input"
              placeholder="Cari makanan..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{paddingLeft: '35px', width: '100%', padding: '10px 10px 10px 35px', borderRadius: '6px', border: '1px solid #ddd'}}
            />
          </div>

          {/* Tabel */}
          {loading ? <p>Memuat data...</p> : (
            <table className="report-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Gambar</th> {/* Kolom Gambar Baru */}
                  <th>Nama</th>
                  <th>Kalori</th>
                  <th>Protein</th>
                  <th>Lemak</th>
                  <th>Karbo</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredMakanan.length > 0 ? (
                  filteredMakanan.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{item.id}</td>
                      <td>
                        <img 
                          src={item.image || "https://via.placeholder.com/50?text=No+Img"} 
                          alt={item.name} 
                          style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px'}}
                          onError={(e) => { e.target.src = "https://via.placeholder.com/50?text=Error"; }}
                        />
                      </td>
                      <td><strong>{item.name}</strong></td>
                      <td>{item.calories}</td>
                      <td>{item.proteins}</td>
                      <td>{item.fat}</td>
                      <td>{item.carbohydrate}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="edit-button" onClick={() => handleEdit(item)}>
                            <LucideEdit size={14} /> Edit
                          </button>
                          <button className="delete-button" onClick={() => handleHapus(item.id)}>
                            <LucideTrash2 size={14} /> Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="8" style={{textAlign:'center', padding:'20px'}}>Tidak ada data.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* --- MODAL FORM --- */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{isEdit ? 'Edit Makanan' : 'Tambah Makanan Baru'}</h2>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  <LucideX size={24}/>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nama Makanan</label>
                  <input type="text" required value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>

                {/* Baris Gizi (Grid) */}
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px'}}>
                    <div className="form-group">
                        <label>Kalori (kkal)</label>
                        <input type="number" required value={formData.calories}
                            onChange={(e) => setFormData({...formData, calories: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label>Protein (g)</label>
                        <input type="number" step="0.1" required value={formData.proteins}
                            onChange={(e) => setFormData({...formData, proteins: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label>Lemak (g)</label>
                        <input type="number" step="0.1" required value={formData.fat}
                            onChange={(e) => setFormData({...formData, fat: e.target.value})} />
                    </div>
                    <div className="form-group">
                        <label>Karbohidrat (g)</label>
                        <input type="number" step="0.1" required value={formData.carbohydrate}
                            onChange={(e) => setFormData({...formData, carbohydrate: e.target.value})} />
                    </div>
                </div>

                <div className="form-group">
                  <label>Link Gambar (URL)</label>
                  <input type="url" required value={formData.image} placeholder="https://..."
                    onChange={(e) => setFormData({...formData, image: e.target.value})} />
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

export default KelolaMakanan;