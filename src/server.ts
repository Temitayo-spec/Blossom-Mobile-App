import express, { Request, Response } from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import userRoutes from './routes/user.routes';
import categoryRoutes from './routes/category.routes';
import taskRoutes from './routes/task.routes';
const app = express();

connectDB();

dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = 8080 || process.env.PORT!;

app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
