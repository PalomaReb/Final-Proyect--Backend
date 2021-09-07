import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer'


const URL = 'mongodb+srv://palomiiiita:mypassword@cluster0.h80zk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


//--------------modelReg---------------------------------


export const validateReg = async (user) => {
    const loginValue = {
        email: user,
    };
    const client = await MongoClient.connect(URL);
    const data = await client
        .db("FinalProyectDDBB")
        .collection("user-register")
        .find(loginValue)
        .toArray();
    client.close();
    return data.length > 0;
}

export const createUser = async (user, password) => {
    const loginValue = {
        email: user,
        password: password,
        type: 'PENDING'
    };
    const client = await MongoClient.connect(URL);
    await client
        .db("FinalProyectDDBB")
        .collection("user-register")
        .insertOne(loginValue)
    client.close();
}

export const insertToken = async (user, token) => {
    const loginValue = {
        email: user,
        token: token,
    };
    console.log(loginValue);
    const client = await MongoClient.connect(URL);
    await client
        .db("FinalProyectDDBB")
        .collection("user-token")
        .insertOne(loginValue)

    //-----------------SEND EMAIL------------------------//
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'code.or.die2021@gmail.com',
            pass: 'kinwhqugrlbdqwuf',
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    await transporter.sendMail({
        from: 'code.or.die2021@gmail.com',
        to: user,
        subject: 'Message',
        html: '<p><b>Hola</p>' +
            `<p> Gracias por registrarte, verifica el email  <a href="http://localhost:3000/login?token=${token}">Verificar</a>`,
    })
}

export const validateToken = async (token) => {
    const loginValue = {
        token: token,
    };
    const client = await MongoClient.connect(URL);
    const data = await client
        .db("FinalProyectDDBB")
        .collection("user-token")
        .findOne(loginValue)
    return data
}

export const updateTokenUser = async (user) => {
    const loginValue = {
        email: user.email,

    };
    const pendingstatus = {
        $set: {
            type: 'SUCCESS',

        }

    };
    const client = await MongoClient.connect(URL);
    const data = await client
        .db("FinalProyectDDBB")
        .collection("user-register")
        .updateOne(loginValue, pendingstatus)
    return data
}


export const deleteToken = async (user) => {
    const loginValue = {
        id: user.id,

    };

    const client = await MongoClient.connect(URL);
    const data = await client
        .db("FinalProyectDDBB")
        .collection("user-token")
        .deleteOne(loginValue)
}
