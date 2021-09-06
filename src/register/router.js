/**
 * Define el router de auth y asocia a cada una de las rutas un 
 * controller
 */
import { isValidateReg } from './middleware.js'
import express from 'express';
// importo el controller para gestionar el login
import { registerUserController } from './controller.js'

const router = express.Router();

router.route('/register')
    .post(isValidateReg, registerUserController); // es un post porque creo un usuario



export default router;