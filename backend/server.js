const express = require('express')
const cors = require('cors')
const SaveRoute = require('./routes/SaveResponse')
const userRoutes = require('./routes/UsersRoutes');
const cookieParser = require('cookie-parser');

const app = express()
const PORT = 7701

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));
app.use(express.json())

app.use(cookieParser());


app.use('/api', SaveRoute);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});