import { findUserLastGame, insertUserProgressInDDBB, updateUserArraybyID } from './prog.model.js'

export const UserGameInfoController = async (req, res) => {
    const user = await findUserLastGame(req.email);
    if (user !== undefined) {
        res.send(user);
    } else {
        res.status(404).send('no lo encuentro');
    };
}

export const progressController = (req, res) => {
    insertUserProgressInDDBB(req.email, req.body.gameList);

    res.status(201).send('progreso de usuario metido con exito');
}

export const updateUserGamePoints = (req, res) => {
    updateUserArraybyID(req.email, req.body.gameList[0]);
    res.status(200).send('user updated succesfully')

}


