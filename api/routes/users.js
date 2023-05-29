import express from 'express';
import { getUser, updateUser, getUserNotFollow, getUsers, getUserFollowed } from '../controllers/user.js';

const router = express.Router();

router.get('/find/:userId', getUser);
router.get('/', getUsers);
router.get('/unfollowers/:userId', getUserNotFollow);
router.get('/followers/:userId', getUserFollowed);
router.put('/', updateUser);

export default router;
