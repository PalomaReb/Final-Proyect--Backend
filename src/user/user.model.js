import { MongoClient } from "mongodb";
import { MyDDBB, URL } from '../config/bbdd.js'


const COLLECTION_NAME = 'user-register'


export const findUserInfoById = async (email) => {
    const client = await MongoClient.connect(URL);
    const user = await client
        .db(MyDDBB)
        .collection(COLLECTION_NAME)
        .findOne({ email })
    client.close();
    return user
}

export const getUserInfoByIdAndPassword = async (email, password) => {
    const client = await MongoClient.connect(URL);
    const user = await client
        .db(MyDDBB)
        .collection(COLLECTION_NAME)
        .findOne({ email, password, status: 'SUCCESS' })
    client.close();
    return user
}

export const createUser = async (user) => {
    const client = await MongoClient.connect(URL);
    await client
        .db(MyDDBB)
        .collection(COLLECTION_NAME)
        .insertOne(user)
    client.close()
}

export const updateUser = async (email, partialUser) => {
    const client = await MongoClient.connect(URL);
    const updateUserObj = {
        $set: partialUser
    }
    await client
        .db(MyDDBB)
        .collection(COLLECTION_NAME)
        .updateOne({ email }, updateUserObj)
    client.close()
}
