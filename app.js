import registerRouter from './src/register/router.js'
import express from "express";
import cors from 'cors';

const port = 5463;

const app = express();
app.use(express.json());
app.use(cors());

// app.use("/user", userRouter);

app.use("/auth", registerRouter)

app.listen(port, () => {
    console.log(`Welcome to hell, port number:  ${port}`);
});
