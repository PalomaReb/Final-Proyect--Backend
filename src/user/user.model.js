import { MongoClient } from "mongodb";


const URL = 'mongodb+srv://palomiiiita:mypassword@cluster0.h80zk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


export const getUserInfoByIdAndPassword = async (userId, password) => {
    const query = {
        email: userId,
        password: password,
        type: 'SUCCESS'
    };
    const client = await MongoClient.connect(URL);
    const data = await client
        .db("FinalProyectDDBB")
        .collection("user-register")
        .findOne(query)
    return data
}