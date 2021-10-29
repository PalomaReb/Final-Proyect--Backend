import { MongoClient } from 'mongodb';
import { URL, MyDDBB } from '../config/bbdd.js'

export const findGameById = async (id) => {
    const gameValue = {
        id: id
    };
    const client = await MongoClient.connect(URL);
    const data = await client
        .db(MyDDBB)
        .collection("games")
        .findOne(gameValue);
    client.close();
    return data;

}
