import { MongoClient } from "mongodb";

const URL =
    "";

export const createUser = async (user) => {


    const client = await MongoClient.connect(URL);

    const data = await client
        .db("FinalProyectDDBB")
        .collection("user-register")
        .insertOne(user)
        .toArray();

    client.close();
    return data.length > 0;
};
