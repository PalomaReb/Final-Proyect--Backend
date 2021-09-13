import { findUserById, updateUser } from './user.model.js'

export const getUserController = async (req, res) => {
    console.log(`Obteniendo la información del usuario: ${req.email}`); // este property existe porque lo puso el middleware de auth
    const user = await findUserById(req.email);
    if (user !== null) {
        res.send(user);
    } else {
        res.status(404).send();
    }
}


export const updateUserController = async (req, res) => {
    console.log(`Actualizando la información del usuario: ${req.email}`); // este property existe porque lo puso el middleware de auth
    updateUser(req.email, req.body);
    res.send();
}