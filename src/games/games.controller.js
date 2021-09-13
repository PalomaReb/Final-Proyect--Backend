import { findGameById, insertUserProgressInDDBB } from './games.model.js'

export const gameController = async (req, res) => {
    console.log(req.params.id)
    const game = await findGameById(req.params.id);
    if (game !== null) {
        // enviar al cliente el juego
        console.log(game)
        res.send(game);
    } else {
        res.status(404).send();
    }
}


export const progressController = (req, res) => {
    insertUserProgressInDDBB(req.body);
    console.log(req.body);
    res.status(201).send('progreso de usuario metido con exito');


}
