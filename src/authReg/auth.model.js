import { MongoClient } from 'mongodb';
import { URL, MyDDBB } from '../config/bbdd.js'



//--------------modelReg---------------------------------


export const validateReg = async (user, password) => {
    const loginValue = {
        email: user,
        password,
        type: 'SUCCESS'
    };
    const client = await MongoClient.connect(URL);
    const data = await client
        .db(MyDDBB)
        .collection("user-register")
        .findOne(loginValue)
    client.close();
    return data !== null;
}

export const createUser = async (user, password, alias) => {
    const loginValue = {
        email: user,
        password: password,
        alias: alias,
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


export const deleteToken = async (token) => {
    const tokenDelete = {
        token
    };
    try {
        const client = await MongoClient.connect(URL);
        const result = await client
            .db("FinalProyectDDBB")
            .collection("user-token")
            .deleteOne(tokenDelete)
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
    finally {
        if (client !== undefined) {
            await client.close()
        }
    }
}


// export const validateToken = async (token) => {
//     const email = await retrieveEmailByToken(token);
//     if (email) deleteToken(token);
//     console.log('email', email);
//     return email;
// }