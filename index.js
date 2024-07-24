import express from 'express';
import { connectDB, sequelize } from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

const app = express();

connectDB();

// Sincronizar modelos com o banco de dados
sequelize.sync({ force: true }) // force: true irá recriar as tabelas
    .then(() => console.log('Database & tables created!'));

app.use(express.json({ extended: false }));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;
