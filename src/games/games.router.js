import express from 'express'
import { gameController, progressController, updateUserGamePoints, UserGameInfoController } from './games.controller.js';
import { validateJWTAuth } from '../authReg/auth.middleware.js';


const gamesRouter = express.Router();


gamesRouter.route('/:id')
    .get(gameController);

gamesRouter.route('/user-progress')
    .get(validateJWTAuth, UserGameInfoController)

    .post(validateJWTAuth, progressController)

    .patch(validateJWTAuth, updateUserGamePoints)


export default gamesRouter;
