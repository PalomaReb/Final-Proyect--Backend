import { MongoClient } from 'mongodb';
import { URL, MyDDBB } from '../config/bbdd.js';


export const insertUserProgressInDDBB = async (user, gameList) => {
    const newGame = {
        user,
        gameList,
    }
    const client = await MongoClient.connect(URL);
    const data = await client
        .db(MyDDBB)
        .collection("user-game-progress")
        .insertOne(newGame);
    client.close();

}

export const updateUserArraybyID = async (user, gameList) => {
    const query = {
        user: user
    }
    const pushArray = {
        $push: {
            gameList: gameList,
        }
    }
    const last = {
        sort: {
            _id: -1,
        }
    }
    const client = await MongoClient.connect(URL)
    const player = await client
        .db(MyDDBB)
        .collection("user-game-progress")
        .findOne(query, last)
    await client
        .db(MyDDBB)
        .collection("user-game-progress")
        .updateOne({ _id: player._id }, pushArray)
    client.close()
};

export const findUserLastGame = async (user) => {
    const userLastGame = {
        user,
    }
    const last = {
        sort: {
            _id: -1,
        }
    }
    const client = await MongoClient.connect(URL);
    const data = await client
        .db(MyDDBB)
        .collection("user-game-progress")
        .findOne(userLastGame, last);
    // console.log(data);
    client.close();
    if (data !== null) {
        return data;
    } else {
        return false;

    }
}