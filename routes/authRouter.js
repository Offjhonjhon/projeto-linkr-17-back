import {Router} from 'express';

import {signIn, signUp} from '../controllers/authController.js';
import {validateUser} from '../middlewares/authMiddleware.js';

const authRouter = Router();

authRouter.post('/sign-up', validateUser, signUp);
authRouter.post('/sign-in', signIn);

export default authRouter;