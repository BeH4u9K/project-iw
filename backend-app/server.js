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
  if (phone === '+77777777777' && password === '@228Admin') {
    return res.json({ success: true, admin: true });
  } else if (phone && password) {
    users.push({ phone, password });
    console.log('Users:', users);
    return res.json({ success: true, admin: false });
  }
  res.json({ success: false });
});

app.post('/api/admin/add', (req, res) => {
  const { movieData } = req.body;
  movies.push(movieData);
  console.log('Added Movie:', movieData);
  res.json({ success: true });
});

app.post('/api/admin/delete', (req, res) => {
  const { movieData } = req.body;
  const index = movies.indexOf(movieData);
  if (index !== -1) {
    movies.splice(index, 1);
    console.log('Deleted Movie:', movieData);
    res.json({ success: true });
  } 
});

app.get('/api/movies', (req, res) => {
  console.log('Movies:', movies);
  res.json({ movies });
});

app.listen(5000, () => {
  console.log('Сервер запущен на порту 5000');
});
