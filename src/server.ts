import express, { Request, Response } from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import userRoutes from './routes/user.routes';
const app = express();

connectDB();

dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = 8080 || process.env.PORT!;

app.use('/user', userRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
