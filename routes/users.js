import express from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', auth, getAllUsers);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

export default router;
