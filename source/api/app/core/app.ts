// core/app.ts

import * as express from "express";
import * as bodyParser from "body-parser";
import "reflect-metadata"
import {createConnection} from "typeorm"

import {Routes} from "./routes/app.routes";

class Application {

    public app: express.Application;
    public RouteProvider: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.RouteProvider.routes(this.app);
    }
    
    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());

        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new Application().app;