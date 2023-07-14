import 'dotenv/config';
import './database';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/user.router';

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
