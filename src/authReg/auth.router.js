import { loginJWTController } from './auth.controller.js'
import { isValidateReg } from './auth.middleware.js'
import express from 'express';
// importo el controller para gestionar el login
import { registerUserController, validateUserController } from './auth.controller.js'

const router = express.Router();

router.route('/register')
    .post(isValidateReg, registerUserController); // es un post porque creo un usuario

router.route('/validate')
    .get(validateUserController); // es un get porque me dice si es válido o no

router.route('/login')
    .post(loginJWTController)


export default router;