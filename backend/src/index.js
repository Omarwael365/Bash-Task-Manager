import express from "express";
import http from "http";
import cors from "cors";
import { WebSocketServer } from "ws";

import logger from "./middleware/logger.js";
import errorHandeler from "./middleware/error.js";
import notfound from "./middleware/notfound.js";

import reports from "./routes/reports.js";
import setupMonitorWS from "./ws/monitor.js";

const app = express();
const server = http.createServer(app);
const PORT = 8000;

/* middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(logger);

/* routes */
app.use("/reports", reports);

/* websocket */
const wss = new WebSocketServer({ server });
setupMonitorWS(wss);

/* errors */
app.use(notfound);
app.use(errorHandeler);

/* start server */
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
