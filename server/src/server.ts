import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";

import indexRoutes from "./routes/indexRoutes";
import ProductRoutes from "./routes/ProductRoutes";

class Server {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        const MONGO_URI = "mongodb://localhost/test";
        mongoose.set("useFindAndModify", true);
        mongoose
            .connect(MONGO_URI || process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
            })
            .then((db) => console.log("DB is connected"));
        // settings
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use("/api/products", ProductRoutes);
    }

    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
        });
    }
}

const server = new Server();
server.start();
