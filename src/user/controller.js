import { getUserInfo, updateUser, postUserReview } from './user.model.js'

export const getUserInfoController = async (req, res) => {
    console.log(`Obteniendo la información del usuario: ${req.email}`); // este property existe porque lo puso el middleware de auth
    const user = await getUserInfo(req.email);
    if (user !== undefined) {
        res.send(user);
    } else {
        res.status(404).send('no lo encuentro');
    }
}


export const updateUserController = async (req, res) => {
    console.log(`Actualizando la información del usuario: ${req.email}`); // este property existe porque lo puso el middleware de auth
    updateUser(req.email, req.body);
    res.send();
}

export const addUserReview = async (req, res) => {
    console.log('')
    postUserReview(req.body.alias, req.body.review)
    res.send('review mandado')
}