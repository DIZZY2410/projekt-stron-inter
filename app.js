const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

function loadPosts() {
  const data = fs.readFileSync(path.join(__dirname, 'posts.json'), 'utf-8');
  return JSON.parse(data);
}

app.get('/', (req, res) => {
  const posts = loadPosts();
  res.render('index', { posts });
});

app.get('/post/:id', (req, res) => {
  const posts = loadPosts();
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).send('Post not found');
  }
  res.render('post', { post });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
