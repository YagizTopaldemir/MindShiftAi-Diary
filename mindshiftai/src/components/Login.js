import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // CSS dosyamızı import edelim
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('Kullanıcı adı ve şifre gerekli');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:7701/api/users/login',
        { username, password },
        { withCredentials: true }
      );
      localStorage.setItem('userId', response.data.user.id);

      setSuccessMessage(response.data.message);
      navigate('/home')
      setError('');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || 'Bir hata oluştu');
    }
  };

  return (
    <div className="login-page">
      <div className="login-panel">
        <h1 style={{margin:0,padding:0}}><span style={{color:'#ca0b4a'}}>Mind</span>ShiftAI📕</h1>
        <h2>Giriş Yap</h2>
        {error && <p className="error">⛔{error}</p>}
        {successMessage && <p className="success">✅{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
          <label htmlFor="username">Kullanıcı Adı</label>
          <input
            type="text"
            placeholder='Kullanıcı Adı'
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          </div>
        <div>
        <label htmlFor="password">Şifre</label>
          <input
            type="password"
            id="password"
            placeholder='Şifre'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
          <button type="submit">Giriş Yap</button>

        </form>
        <div style={{marginTop:20}}>Hesabın yok mu ? <span onClick={() => navigate('/register')} style={{color:'#c0392b',cursor:'pointer'}}>Kayıt ol</span></div>
      </div>
      <div className="image-panel">

      </div>
    </div>
  );
};

export default Login;
