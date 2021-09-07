import { validateReg } from "./auth.model.js";

export const isValidateReg = async (req, res, next) => {
    console.log(req.body)
    const check = await validateReg(req.body.email)
    console.log(check)
    if (check) {
        console.log('registered!!!!!')
        res.status(409).send('error');
    } else {
        next()
    }
}