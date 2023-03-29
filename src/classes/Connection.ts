import { ConnectionManager } from "./ConnectionManager";
import type { Database } from "./Database";
import type { DatabaseTable } from "./DatabaseTable";

export class Connection {

    database: Database

    private constructor(database: Database) {
        this.database = database
    }

    static async createNewConnection(database: Database): Promise<Connection> {
        let connection = new Connection(database)
        try {
            await connection.getContextTable()
        } catch (error) {
            throw Error("Could not connect to " + database.databaseName)
        }
        return connection
    }

    async getContextTable() {
        const data = await fetch(this.database.contextTableUrl)
    }

    async getTables(){ 
        const url = this.database.contextTableUrl;
        const response = await fetch(url);
        const data = await response.text();
        const tables = JSON.parse(data);
        return tables;
    }
}