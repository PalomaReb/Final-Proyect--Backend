import express from 'express'
import { gameController, progressController, updateUserGamePoints } from './games.controller.js';


const gamesRouter = express.Router();


gamesRouter.route('/:id')
    .get(gameController);

gamesRouter.route('/user-progress')
    .post(progressController)

    .patch(updateUserGamePoints);


export default gamesRouter;
