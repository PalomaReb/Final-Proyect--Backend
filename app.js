import registerRouter from './src/authReg/auth.router.js'
import userRouter from './src/user/router.js'
import gamesRouter from './src/games/games.router.js'
import progressRouter from './src/user-progress/pro.router.js'
import express from "express";
import cors from 'cors';

const port = process.env.PORT || 5464;

const app = express();
app.use(express.json());
app.use(cors());

// app.use("/user", userRouter);

app.use("/auth", registerRouter)
// app.use('/user',)

app.use("/games", gamesRouter)

app.use("/user", userRouter)

app.use("/userProgress", progressRouter)

app.listen(port, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
