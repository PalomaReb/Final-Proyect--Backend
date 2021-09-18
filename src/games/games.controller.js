import { findGameById, insertUserProgressInDDBB, updateUserArraybyID } from './games.model.js'

export const gameController = async (req, res) => {
    const game = await findGameById(req.params.id);
    if (game !== null) {
        // enviar al cliente el juego
        res.send(game);
    } else {
        res.status(404).send();
    }
}


export const progressController = (req, res) => {
    insertUserProgressInDDBB(req.email, req.body.gameList);

    res.status(201).send('progreso de usuario metido con exito');
}


export const updateUserGamePoints = (req, res) => {
    updateUserArraybyID(req.email, req.body.gameList[0]);
    res.status(200).send('user updated succesfully')

}

export const UserGameInfoController = async (req, res) => {
    console.log('voy por los datos');
    const user = await findUserLastGame(req.email);
    if (user !== undefined) {
        res.send(user);
        console.log('tengo los datos');
    } else {
        res.status(404).send('no lo encuentro');
    };
}

