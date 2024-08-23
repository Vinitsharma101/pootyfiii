const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Route to list songs
app.get('/DownloadedSongs', (req, res) => {
  const songsDir = path.join(__dirname, 'public', 'DownloadedSongs');
  fs.readdir(songsDir, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading directory');
    }
    const songs = files.filter(file => file.endsWith('.mp3'));
    res.json(songs);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});