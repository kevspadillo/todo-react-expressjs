import {createConnection, Connection} from "typeorm"

export class DB {

    private conn: Promise<Connection>;

    constructor() {}

    /**
     * connect
     */
    public connect(): Promise<Connection> {
        if (!this.conn) {
            this.conn =  createConnection();
        }
        return this.conn.then((connection) => connection);
    }
}