import express from 'express';
import { getUserInfoController, addUserReview } from './controller.js'
import { validateJWTAuth } from '../authReg/auth.middleware.js';



const userRouter = express.Router();

userRouter.use(validateJWTAuth);

userRouter.route('/userInfo')
    .get(getUserInfoController); // es un get para obtener los datos del usuario


userRouter.route('/reviews')
    .post(addUserReview)


export default userRouter;