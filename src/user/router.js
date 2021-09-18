import express from 'express';
import { getUserInfoController, addUserReview, getReviewsController } from './controller.js'
import { validateJWTAuth } from '../authReg/auth.middleware.js';



const userRouter = express.Router();


userRouter.route('/userInfo')
    .get(validateJWTAuth, getUserInfoController); // es un get para obtener los datos del usuario


userRouter.route('/reviews')
    .post(validateJWTAuth, addUserReview)

userRouter.route('/reviews')
    .get(getReviewsController)


export default userRouter;