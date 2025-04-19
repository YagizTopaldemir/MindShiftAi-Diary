const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const datapath = path.join(__dirname, '..', 'Data.json');


router.post('/save', (req, res) => {
  const { userId, text, moodAnalysis, advice, motivation, response } = req.body;

  if (!userId || !text) {
    return res.status(400).json({ message: 'userId ve text zorunlu.' });
  }

  fs.readFile(datapath, (err, data) => {
    let existingData = [];

    if (!err && data.length > 0) {
      existingData = JSON.parse(data);
    }

    const newDiary = {
      userId,
      entry: {
        original: text,
        moodAnalysis,
        advice,
        motivation,
        response
      },
      timeStamp: new Date().toISOString(),
    };

    existingData.push(newDiary);

    fs.writeFile(datapath, JSON.stringify(existingData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Veri yazılamadı' });
      }

      res.json({ message: 'Günlük kaydedildi!' });
    });
  });
});


router.get('/all/:userId', (req, res) => {
  const { userId } = req.params;

  fs.readFile(datapath, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Veri okunamadı' });
    }

    const allEntries = JSON.parse(data);
    const userEntries = allEntries.filter(entry => entry.userId === userId);

    res.json(userEntries);
  });
});

module.exports = router;
