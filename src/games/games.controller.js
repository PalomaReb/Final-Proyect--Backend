import { findGameById } from './games.model.js'

export const gameController = async (req, res) => {
    const game = await findGameById(req.params.id);
    if (game !== null) {
        // enviar al cliente el juego
        res.send(game);
    } else {
        res.status(404).send();
    }
}






