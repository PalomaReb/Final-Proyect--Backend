import { validateReg } from "./model.js";

export const isValidateReg = async (req, res, next) => {
    console.log(req.body)
    const check = await validateReg(req.body.email)
    console.log(check)
    if (check) {
        console.log('ya reg')
        res.status(409).send('error');
    } else {
        next()
    }
}