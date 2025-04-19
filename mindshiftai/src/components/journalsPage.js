import React, { useEffect, useState } from 'react';
import "./Journalpage.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Journalpage() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const res = await axios.get(`http://localhost:7701/api/all/${userId}`);
        console.log("Gelen günlükler:", res.data); // BURASI ÖNEMLİ
        setEntries(res.data);
      } catch (error) {
        console.error("Günlükler alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEntries();
  }, []);
  
  return (
    <div className='Journalpage'>
      <div className='navbar-container'>
        <div className='navbar'>
          <div className='navbar-left'>
            <div className='home' onClick={() => navigate('/menu')}>
              🗓️<span style={{ fontSize: 15, fontWeight: 600 }}>Menu</span>
            </div>
          </div>
          <div className='navbar-right'></div>
        </div>
      </div>

      <div className='entries-container'>
        <h1>Günlükler</h1>
        {loading ? (
          <p>Günlükler yükleniyor...</p>
        ) : entries.length === 0 ? (
          <p>Hiç günlük bulunamadı.</p>
        ) : (
            entries.slice().reverse().map((entry, index) => (
                <div key={index} className='entry-card'>
                  <p style={{display:'flex',flexDirection:'column',gap:10}}><strong>🕟Tarih</strong> {new Date(entry.timeStamp).toLocaleDateString()}</p>
                  <p style={{display:'flex',flexDirection:'column',gap:10}}><strong>💾İçerik</strong> {entry.entry.original}</p>
                </div>
              ))
        )}
      </div>
    </div>
  );
}
 
 