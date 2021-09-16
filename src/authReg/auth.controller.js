import { createUser, insertToken, validateToken, updateTokenUser, deleteToken, validateReg } from "./auth.model.js"
import { generateRandomEmailToken, encodePassword } from "./crypto.js";
import { getUserInfoByIdAndPassword } from '../user/user.model.js'
import jwt from "jsonwebtoken";
import { sendMail } from '../adapters/mail.js'
import { secret } from './auth.secret.js'

/**
 * Este controller se encarga de registrar a un usuario en nuestro sistema
 */
export const registerUserController = async (req, res) => {

    const passEncoded = encodePassword(req.body.password);

    await createUser(req.body.email, passEncoded, req.body.alias);

    const encodedToken = generateRandomEmailToken();
    console.log('esto es el token' + encodedToken)

    insertToken(req.body.email, encodedToken,);

    sendMail(req.body.email, 'Bienvenido...?', '<p><b>Hola usuario</p>' +
        `<p> Si quieres sobrevivir, haz click en este  <a href="http://localhost:3000/login?token=${encodedToken}"> link </a>`)
    res.send('check')
}
export const validateUserController = async (req, res) => {
    // llamo a mi modelo para que me diga si el token es valido o no
    console.log(req.query.token);
    const email = await validateToken(req.query.token);
    console.log(email)
    // si existe email es que es válido, sino no es válido
    if (email !== null) {
        // actualizo el estado del usuario en BBDD a SUCCESS
        updateTokenUser(email);
        deleteToken(email)
        //devuelvo al cliente un 200
        res.status(200).send();
    } else {
        // si el usuario ya existe mando al cliente un 409 (conflict), indicando que el usuario 
        // ya existe
        res.status(400).send('El token no es valido');
    }

}
export const loginJWTController = async (req, res) => {
    // deconstrucción del objeto body para quedarme con sus atributos
    // email, password
    const { email, password } = req.body;
    // codifico la password para hacer la query con lo que hay en BBDD
    const passEncoded = encodePassword(password);
    // obtengo la información de mi modelo del usuario por email
    const userInfo = getUserInfoByIdAndPassword(email, passEncoded);
    // compruebo que exista el usuario y que las password coincidan 
    console.log(userInfo);
    if (userInfo !== null) {
        // generar un token JWT 
        const token = jwt.sign({ user: email }, secret);
        //devolverselo al usuario en una propiedad llamada access_token
        res.send({
            access_token: token,
            // email,
        });
    } else {
        res.status(404).send('Usuario/Contraseña erróneos');
    }

}
