const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = [];
const movies = ["1 фильм", "2 фильм", "3 фильм", "4 фильм", "5 фильм", "6 фильм"]; 

app.post('/api/login', (req, res) => {
  const { phone, password } = req.body;
  if (phone && password) {
    users.push({ phone, password });
    console.log(users);
    return res.json({ success: true });
  }
  res.json({ success: false });
});

app.get('/api/movies', (req, res) => {
  console.log(movies);
  res.json({ movies });
});

app.post('/api/movies', (req, res) => {
  const { movieData } = req.body;
  movies.push(movieData);
  
  console.log(movies);
  res.json({ movies });
});

app.listen(5000, () => {
  console.log('Сервер запущен на порту 5000');
});
