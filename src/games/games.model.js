import { MongoClient } from 'mongodb';

const URL = 'mongodb+srv://palomiiiita:mypassword@cluster0.h80zk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

export const findGameById = async (id) => {
    const gameValue = {
        id: id
    };
    const client = await MongoClient.connect(URL);
    const data = await client
        .db("FinalProyectDDBB")
        .collection("games")
        .findOne(gameValue);
    client.close();
    return data;

}
