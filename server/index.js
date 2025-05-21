import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectDB } from './src/lib/db.js';
import authRoutes from './src/routes/auth.route.js'

dotenv.config();
const app = express();

// middleware 
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is runing on :-  http://localhost:${PORT}`);
    connectDB();
});