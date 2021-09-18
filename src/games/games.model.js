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
    console.log(pushArray)

    const client = await MongoClient.connect(URL)
    await client
        .db("FinalProyectDDBB")
        .collection("user-game-progress")
        .updateOne(query, pushArray)
    client.close()
};


export const findUserLastGame = async (user) => {
    const userLastGame = {
        user,
    }
    const orderBy = {
        _id: -1,
    }
    const client = await MongoClient.connect(URL);
    const data = await client
        .db("FinalProyectDDBB")
        .collection("user-game-progress")
        .findOne(userLastGame, orderBy);
    client.close();
    if (data !== null) {
        console.log('yo soy ' + data)
        return data;
    }
    //si no hay juego, crear partida nueva

}
