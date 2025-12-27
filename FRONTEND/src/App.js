import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import semua halaman yang akan Anda gunakan untuk tugas

// Perhatikan 'L' besar pada Login
import Logan from './pages/logan.jsx'; 
import Register from './pages/register.jsx';
import Admin from './pages/admin.jsx';
import Akun from './pages/akun.jsx';
import Konten from './pages/konten.jsx';
import Edit from './pages/edit.jsx';
import Kendala from './pages/kendala.jsx';
import Kelolamakanan from './pages/kelola-makanan.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />   
        <Route path="/akun" element={<Akun />} />   
        <Route path="/konten" element={<Konten />} />   
        <Route path="/edit" element={<Edit />} />   
        <Route path="/kendala" element={<Kendala />} />   
        
        {/* Gunakan komponen dengan 'L' besar */}
        <Route path="/logan" element={<Logan />} />
        <Route path="/" element={<Logan />} />
        {/* Tambahkan juga untuk register agar siap untuk tugas berikutnya */}
        <Route path="/register" element={<Register />} />
        <Route path="/kelola" element={<Kelolamakanan />} />
      </Routes>
    </Router>
  );
}

export default App;

