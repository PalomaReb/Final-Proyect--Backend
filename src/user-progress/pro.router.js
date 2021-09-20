import express from 'express'
import { progressController, updateUserGamePoints, UserGameInfoController } from './prog.controller.js';
import { validateJWTAuth } from '../authReg/auth.middleware.js';


const progressRouter = express.Router();

progressRouter.route('/userProgressData')
    .get(validateJWTAuth, UserGameInfoController)

    .post(validateJWTAuth, progressController)

    .patch(validateJWTAuth, updateUserGamePoints)

export default progressRouter;