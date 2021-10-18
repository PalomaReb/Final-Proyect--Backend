import { MongoClient } from 'mongodb';

const URL = 'mongodb+srv://palomiiiita:mypassword@cluster0.h80zk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


export const insertUserProgressInDDBB = async (user, gameList) => {
    const newGame = {
        user,
        gameList,
    }
    const client = await MongoClient.connect(URL);
    const data = await client
        .db("FinalProyectDDBB")
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
        .db("FinalProyectDDBB")
        .collection("user-game-progress")
        .findOne(query, last)
    await client
        .db("FinalProyectDDBB")
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
        .db("FinalProyectDDBB")
        .collection("user-game-progress")
        .findOne(userLastGame, last);
    console.log(data);
    client.close();
    return data;
}