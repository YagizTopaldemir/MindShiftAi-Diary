const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const saltRounds = 10;
const JWT_SECRET = 'force_is_with_you'; 


const getUsers = () => {
  const data = fs.readFileSync(path.join(__dirname, '../User.json'), 'utf-8');
  return JSON.parse(data).users;
};

const saveUsers = (users) => {
  fs.writeFileSync(
    path.join(__dirname, '../User.json'),
    JSON.stringify({ users }, null, 2),
    'utf-8'
  );
};

router.post('/register', async (req, res) => {
  const { username, password } = req.body;


  if (!username || !password) {
    return res.status(400).json({ error: 'Kullanıcı adı ve şifre gerekli' });
  }

  const users = getUsers();

  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ error: "Bu kullanıcı adı zaten alınmış" });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    username,
    password: hashedPassword,
  };

  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: 'Kayıt başarılı', user: { username: newUser.username, id: newUser.id } });
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Kullanıcı adı ve şifre gerekli' });
  }

  const users = getUsers();
  const user = users.find(user => user.username === username);


  if (!user) {
    return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
  }


  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
  }


  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });

  res
    .cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: false 
    })
    .status(200)
    .json({ message: 'Giriş başarılı', user: { username: user.username, id: user.id } });
});

router.get('/me', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Giriş yapılmamış' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ user: decoded });
  } catch (err) {
    res.status(401).json({ error: 'Geçersiz token' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Çıkış yapıldı' });
});

module.exports = router;
