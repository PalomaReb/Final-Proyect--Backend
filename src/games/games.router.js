import express from 'express'
import { gameController, } from './games.controller.js';


const gamesRouter = express.Router();


gamesRouter.route('/:id')
    .get(gameController);



export default gamesRouter;
