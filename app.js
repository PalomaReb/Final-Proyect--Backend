
import express from "express";
import registerRouter from "./src/register/register-user-router.js";
import cors from 'cors';

const port = 5463;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", registerRouter);

app.listen(port, () => {
    console.log(`Welcome to hell, port number:  ${port}`);
});
