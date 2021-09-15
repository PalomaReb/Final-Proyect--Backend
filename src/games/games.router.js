import express from 'express'
import { gameController, progressController, updateUserGamePoints } from './games.controller.js';
// import { validateJWTAuth } from '../authReg/auth.middleware.js';


const gamesRouter = express.Router();

// gamesRouter.use(validateJWTAuth);


gamesRouter.route('/:id')
    .get(gameController);

gamesRouter.route('/user-progress')
    .post(progressController)

    .patch(updateUserGamePoints);


export default gamesRouter;
