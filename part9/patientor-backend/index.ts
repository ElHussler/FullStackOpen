import express from 'express';
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('ping endpoint called!');
  res.send('pong');  
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);  
});