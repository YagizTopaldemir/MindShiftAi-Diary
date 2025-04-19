import React, { useEffect, useState } from 'react';
import "./Journalpage.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdvicePage() {
  const navigate = useNavigate();
  const [advices, setAdvices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvices = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const res = await axios.get(`http://localhost:7701/api/all/${userId}`);
        console.log("Gelen tavsiyeler:", res.data);
        setAdvices(res.data);
      } catch (error) {
        console.error("Tavsiyeler alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvices();
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
        <h1>Tavsiyeler</h1>
        {loading ? (
          <p>Tavsiyeler yükleniyor...</p>
        ) : advices.length === 0 ? (
          <p>Hiç tavsiye bulunamadı.</p>
        ) : (
          advices.slice().reverse().map((advice, index) => (
            <div key={index} className='entry-card'>
              <p style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <strong>🕟 Tarih</strong> {new Date(advice.timeStamp).toLocaleDateString()}
              </p>
              <p style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <strong>💡 Tavsiye</strong> {advice.entry.advice}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
