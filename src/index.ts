
import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import { enableProxy, env } from "./config";
import { crawRotuer } from "./routes/craw.router";
import helmet from "helmet";
import compression from 'compression';
import { historyRouter } from "./routes/history.router";

env();

if (process.env.PROXY == "1") {
    enableProxy();
}


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(helmet());
app.use(compression());
app.use(crawRotuer);
app.use(historyRouter)

app.use((req, res) => {
    res.status(400).json({
        message: "Not Found"
    });
});

const errorHanlder: ErrorRequestHandler = (err, req, res, next) => {
    res.status(500).json({ error: "Interval Error" });
}

app.use(errorHanlder);

(async () => {
    await import("./utils/db");
    app.listen(process.env.PORT, () => {
        console.log("Server Started on port:" + process.env.PORT)
    });
})()

