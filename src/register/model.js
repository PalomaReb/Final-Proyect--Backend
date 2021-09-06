import { MongoClient } from 'mongodb';
// import nodemailer from 'nodemailer'


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

