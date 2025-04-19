import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import handleSubmit from '../Api.js';  
import "../App.css";

function HomePage() {
  const [Text, setText] = useState('');
  const [response, setResponse] = useState({
    moodAnalysis: '',
    advice: '',
    motivation: '',
  });
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userError, setUserError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          'http://localhost:7701/api/users/me',
          { withCredentials: true }
        );
        setUser(res.data.user);
      } catch (err) {
        console.error('Kullanıcı bilgisi alınamadı:', err);
        setUserError('Kullanıcı bilgisi yüklenemedi.');
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

 
  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:7701/api/users/logout',
        {},
        { withCredentials: true }
      );
      localStorage.setItem('userId', null);

      navigate('/login');
    } catch (err) {
      console.error('Çıkış yapılamadı:', err);

    }
  };

  const onSubmit = () => {
    handleSubmit(Text, setResponse);
  };

  if (loadingUser) {
    return <div>Yükleniyor...</div>;
  }

  if (userError) {
    navigate('/login')

  }

  return (
    <div className="App">
      <div className='navbar-container'>
        <div className='navbar'>
          <div className='left-nav'>
            <div className='menu' onClick={() => navigate('/menu')} >🗓️</div>
            <div 
              className='Userlogo'
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            >
              🧙<span style={{fontSize:'16px'}}>Logout</span>
            </div>
          </div>
          <div className='logo'><span style={{color:'#ca0b4a'}}>Mind</span>ShiftAI📕</div>
        </div>
      </div>

      <h1 className='Tittleh1'>📖Merhaba, {user.username} Bugün Nasıl Hissediyorsun?</h1>
      <div className='textareadiv'>
        <textarea
          value={Text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Bugün neler oldu? ✏️"
          className='mesajkutusu'
          maxLength={1500}
        />
        <div className='sendbut' onClick={onSubmit}>Günlüğü Gönder📬</div>
      </div>

      <div className='henuzyok'>
        Henüz mobil cihazlar için bir ui yok!
      </div>

      <div className='response-container'>
        {!response ? (
          <div className='notresponse'>
            <p>Henüz Cevap Yok</p>
          </div>
        ) : null}

        {response.moodAnalysis && (
          <div className='response'>
            <h2>😇Duygu Analizi</h2>
            <p>{response.moodAnalysis}</p>
          </div>
        )}

        {response.advice && (
          <div className='response'>
            <h2>⚕️Tavsiye</h2>
            <p>{response.advice}</p>
          </div>
        )}

        {response.motivation && (
          <div className='response'>  
            <h2>🤼‍♂️Motivasyon Cümlesi</h2>
            <p>{response.motivation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;