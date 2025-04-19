import React, { useEffect, useState } from 'react';
import "./Journalpage.css"; // CSS aynı stil için kullanılıyor
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MotivationPage() {
  const navigate = useNavigate();
  const [motivations, setMotivations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMotivations = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const res = await axios.get(`http://localhost:7701/api/all/${userId}`);
        console.log("Gelen motivasyonlar:", res.data);
        setMotivations(res.data);
      } catch (error) {
        console.error("Motivasyonlar alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMotivations();
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
        <h1>Motivasyonlar</h1>
        {loading ? (
          <p>Motivasyonlar yükleniyor...</p>
        ) : motivations.length === 0 ? (
          <p>Hiç motivasyon bulunamadı.</p>
        ) : (
          motivations.slice().reverse().map((motivation, index) => (
            <div key={index} className='entry-card'>
              <p style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <strong>🕟 Tarih</strong> {new Date(motivation.timeStamp).toLocaleDateString()}
              </p>
              <p style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <strong>💪 Motivasyon</strong> {motivation.entry.motivation}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
