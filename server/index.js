import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/connectdb.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const port =  5000;

connectDb();

// Custom logger middleware
app.use((req, res, next) => {
  console.log(req.body);
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
