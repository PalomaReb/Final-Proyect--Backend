import express from 'express'
import { gameController, progressController } from './games.controller.js';

const gamesRouter = express.Router();

gamesRouter.route('/:id')
    .get(gameController);

gamesRouter.route('/user-progress')
    .post(progressController);


export default gamesRouter;
