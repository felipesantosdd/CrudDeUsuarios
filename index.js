import express from 'express';
import { connectDB, sequelize } from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

const app = express();

connectDB();


sequelize.sync({ force: true })
    .then(() => console.log('Database & tables created!'));

app.use(express.json({ extended: false }));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;
