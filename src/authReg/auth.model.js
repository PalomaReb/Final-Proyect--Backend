import { MongoClient } from 'mongodb';
import { URL, MyDDBB } from '../config/bbdd.js'



//--------------modelReg---------------------------------


export const validateReg = async (user) => {
    const loginValue = {
        email: user,
        status: 'SUCCESS',
    };
    const client = await MongoClient.connect(URL);
    const data = await client
        .db(MyDDBB)
        .collection("user-register")
        .findOne(loginValue)
    client.close();
    // console.log(data)
    return data !== null;
}

export const createUser = async (user, password, alias, date) => {
    const loginValue = {
        email: user,
        password: password,
        alias: alias,
        status: 'PENDING',
        date,

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
    // console.log(loginValue);
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
            status: 'SUCCESS',

        }

    };
    const client = await MongoClient.connect(URL);
    const data = await client
        .db("FinalProyectDDBB")
        .collection("user-register")
        .updateOne(loginValue, pendingstatus)
    return data
}


export const deleteToken = async (email) => {
    const tokenDelete = {
        email
    };
    // try {
    const client = await MongoClient.connect(URL);
    const result = await client.db("FinalProyectDDBB").collection("user-token").deleteOne(tokenDelete)
        .then(r => console.log('Borrado'))
        .catch(err => console.error('Hubo un error aquí'))
    client.close();
    //console.log(result);
    //}
    // catch (error) {
    //     console.log(error);
    //     process.exit(1);
    // }
    // finally {
    //     if (client !== undefined) {
    //         await client.close()
    //     }
    // }
}


// export const validateToken = async (token) => {
//     const email = await retrieveEmailByToken(token);
//     if (email) deleteToken(token);
//     console.log('email', email);
//     return email;
// }