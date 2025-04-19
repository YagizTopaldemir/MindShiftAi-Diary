import React, { useEffect, useState } from 'react';
import "./Journalpage.css"; // CSS aynı stil için kullanılıyor
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MoodAnlPage() {
  const navigate = useNavigate();
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const res = await axios.get(`http://localhost:7701/api/all/${userId}`);
        console.log("Gelen ruh hallerı:", res.data);
        setMoods(res.data);
      } catch (error) {
        console.error("Ruh halleri alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
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
        <h1>Ruh Halleri</h1>
        {loading ? (
          <p>Ruh halleri yükleniyor...</p>
        ) : moods.length === 0 ? (
          <p>Hiç ruh hali kaydı bulunamadı.</p>
        ) : (
          moods.slice().reverse().map((mood, index) => (
            <div key={index} className='entry-card'>
              <p style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <strong>🕟 Tarih</strong> {new Date(mood.timeStamp).toLocaleDateString()}
              </p>
              <p style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <strong>😊 Ruh Hali</strong> {mood.entry.moodAnalysis}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
