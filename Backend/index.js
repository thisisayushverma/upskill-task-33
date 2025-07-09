import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());


const reqLogger = (req,res,next)=>{
    console.log(req.url,req.method,req.body);
    next();
}

app.use(reqLogger)

app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'Ayush', {
    maxAge: 3600000, // 1 hour
    httpOnly: true,
  });
  res.json({ message: 'Cookie has been set!' });
});


app.get('/get-cookie', (req, res) => {
  const cookies = req.cookies;
  res.json({ message: 'Here are your cookies', cookies });
});


app.get('/status/ok', (req, res) => {
  res.status(200).json({ message: 'Everything is fine (200 OK)' });
});


app.post('/status/created', (req, res) => {
  res.status(201).json({ message: 'Resource created (201 Created)' });
});


app.get('/status/bad-request', (req, res) => {
  res.status(400).json({ error: 'Bad Request (400)' });
});


app.get('/status/not-found', (req, res) => {
  res.status(404).json({ error: 'Resource not found (404)' });
});


app.get('/status/server-error', (req, res) => {
  res.status(500).json({ error: 'Internal server error (500)' });
});



app.listen(3000, () => console.log("Server running on port 3000"));