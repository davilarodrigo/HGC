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

    async getTables(): Promise<DatabaseTable[]> {
        const url = this.database.contextTableUrl
        return await (await fetch(url)).json()
    }
}