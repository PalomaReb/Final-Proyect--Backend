import { MongoClient } from "mongodb";
import { MyDDBB, URL } from '../config/bbdd.js'


const COLLECTION_NAME = 'user-register'
const REVIEW_COLLECTION = 'user-review'

export const getUserInfo = async (email) => {
    const loginValue = {
        email,
    };
    const client = await MongoClient.connect(URL);
    const user = await client
        .db(MyDDBB)
        .collection(COLLECTION_NAME)
        .findOne(loginValue)
    client.close();
    return user
}

export const getUserInfoByIdAndPassword = async (email, password) => {
    const client = await MongoClient.connect(URL);
    const searchUser = {
        email,
        password,
        status: "SUCCESS",
    };
    const user = await client
        .db(MyDDBB)
        .collection(COLLECTION_NAME)
        .findOne(searchUser)
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

export const postUserReview = async (user, alias, review, date) => {
    const newReview = {
        user,
        alias,
        review,
        date,

    }

    const client = await MongoClient.connect(URL);
    await client
        .db(MyDDBB)
        .collection(REVIEW_COLLECTION)
        .insertOne(newReview)
    client.close()
}

export const retrievalReviews = async () => {
    const client = await MongoClient.connect(URL);
    const data = await client
        .db(MyDDBB)
        .collection(REVIEW_COLLECTION)
        .find().toArray()
    client.close()
    return data
}

