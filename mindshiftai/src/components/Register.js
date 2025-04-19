import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password || !confirmPassword) {
      setError('Tüm alanları doldur lütfen 🙃');
      return;
    }

    if (password !== confirmPassword) {
      setError('Şifreler uyuşmuyor 🤨');
      return;
    }

    try {
      const response = await axios.post('http://localhost:7701/api/users/register', {
        username,
        password,
      });

      setSuccessMessage(response.data.message || 'Kayıt başarılı 🎉');
      setError('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      } else {
        setError('Bir hata oluştu 😬');
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-panel">
      <h1 style={{margin:0,padding:0}}><span style={{color:'#ca0b4a'}}>Mind</span>ShiftAI📕</h1>    
        <h2>Kayıt Ol</h2>
        {error && <p className="error">⛔{error}</p>}
        {successMessage && <p className="success">✅{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Kullanıcı Adı:</label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder='Kullanıcı Adı'
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Şifre:</label>
            <input
              type="password"
              id="password"
              placeholder='Şifre'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Şifre (Tekrar):</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder='Şifre (Tekrar)'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Kayıt Ol</button>
        </form>
        <div style={{marginTop:20}}>Hesabın var mı ? <span onClick={() => navigate('/login')} style={{color:'#c0392b',cursor:'pointer'}}>Giriş yap</span></div>

      </div>
      <div className="image-panel"></div>
    </div>
  );
};

export default Register;
