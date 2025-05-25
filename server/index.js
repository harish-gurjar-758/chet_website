import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectDB } from './src/lib/db.js';
import authRoutes from './src/routes/auth.route.js';
import messageRoutes from './src/routes/message.route.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
// middleware 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: `http://localhost:${PORT}`,
    credentials: true,
}))


app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
    console.log(`Server is runing on :-  http://localhost:${PORT}`);
    connectDB();
});