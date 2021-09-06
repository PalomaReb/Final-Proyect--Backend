import { createUser } from "./model.js"

/**
 * Este controller se encarga de registrar a un usuario en nuestro sistema
 */
export const registerUserController = async (req, res) => {
    createUser(req.body.email, req.body.password);

}


