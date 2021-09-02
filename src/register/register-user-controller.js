import { createUser } from './register-user-model.js'

export const retrieveUserInfoCtrl = (req, res) => {
    const userInfo = getUserInfoById(req.email);
    delete userInfo.password;
    res.send(userInfo);
}

export const createUserController = (req, res) => {
    createUser(req.body)
    res.status(201).send('creado')
}