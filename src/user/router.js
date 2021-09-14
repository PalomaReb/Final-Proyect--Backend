import express from 'express';
import { getUserInfoController } from './controller.js'
import { validateJWTAuth } from '../authReg/auth.middleware.js';



const userRouter = express.Router();

userRouter.use(validateJWTAuth);

userRouter.route('/userInfo')
    .get(getUserInfoController); // es un get para obtener los datos del usuario



export default userRouter;