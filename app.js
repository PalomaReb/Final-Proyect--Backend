import registerRouter from './src/authReg/auth.router.js'
import gamesRouter from './src/games/games.router.js'
import express from "express";
import cors from 'cors';

const port = 5463;

const app = express();
app.use(express.json());
app.use(cors());

// app.use("/user", userRouter);

app.use("/auth", registerRouter)
// app.use('/user',)

app.use("/games", gamesRouter)

app.listen(port, () => {
    console.log(`Welcome to hell, port number:  ${port}`);
});
