import React from 'react';
import './css/dashboard.css';

// Karena banyak ikon, kita akan gunakan placeholder atau FontAwesome jika sudah terinstal
// Untuk sekarang, kita fokus pada layout

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* 1. Header */}
      <header className="dashboard-header">
        <div className="header-app-info">
          <img src="/assets/healthify-logo.png" alt="logo" className="app-logo-sm" />
          <span>Healthify</span>
        </div>
        <div className="header-user-info">
          <span>zul</span>
          <img src="https://placehold.co/40x40/EFEFEF/333?text=Z" alt="user" className="user-avatar" />
        </div>
      </header>

      {/* 2. Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-text">
          <p>Hai, zul</p>
          <h2>Kamu hebat hari ini</h2>
          <p>setiap langkah kecil membawa perubahan besar</p>
        </div>
        <img src="https://placehold.co/120x100/A0D8D4/FFFFFF?text=Ilustrasi" alt="running illustration" className="welcome-illustration" />
      </section>
      
      {/* 3. BMI Card */}
      <section className="bmi-card">
        <div className="bmi-icon"></div>
        <div className="bmi-text">
          <p>Cek BMI GRATIS</p>
          <span>DISINI</span>
        </div>
      </section>

      {/* 4. Leaderboard */}
      <section className="leaderboard-card">
        <p>Leaderboard mingguan top 3</p>
        <div className="leaderboard-users">
          <div className="user-rank">
            <img src="https://placehold.co/40x40/EFEFEF/333?text=R" alt="rahma" />
            <span>rahma</span>
          </div>
          <div className="user-rank main">
            <img src="https://placehold.co/50x50/EFEFEF/333?text=L" alt="liana" />
            <span>liana</span>
          </div>
          <div className="user-rank">
            <img src="https://placehold.co/40x40/EFEFEF/333?text=Z" alt="zul" />
            <span>zul</span>
          </div>
        </div>
      </section>

      {/* 5. Stats Cards */}
      <section className="stats-grid">
        <div className="stat-card yellow">
          <p>langkah hari ini</p>
          <span>5.000</span>
        </div>
        <div className="stat-card green">
          <p>kalori masuk</p>
          <span>5.000</span>
          <div className="stat-icon water"></div>
        </div>
        <div className="stat-card light-green">
          <p>kalori terbakar</p>
          <span>5.000</span>
          <div className="stat-icon fire"></div>
        </div>
      </section>

      {/* 6. Main Menu Grid */}
      <section className="menu-grid">
        <div className="menu-card">
          <span>peta indonesia</span>
        </div>
        <div className="menu-card">
          <span>makan ideal</span>
        </div>
        <div className="menu-card">
          <span>Jalanin aja dulu</span>
        </div>
      </section>

      {/* 7. Footer Navigation */}
      <footer className="dashboard-footer">
        <div className="footer-nav-item">BMI</div>
        <div className="footer-nav-item">Peta</div>
        <div className="footer-nav-item home-icon"></div>
        <div className="footer-nav-item">Gerak</div>
        <div className="footer-nav-item">Makan</div>
      </footer>
    </div>
  );
}

export default Dashboard;
