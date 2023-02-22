import { DatabaseInformationObject } from "./DatabaseInformationObject";
import type { DatabaseTable } from "src/classes/DatabaseTable"

export class DatabaseConnectionManager {
    currentConnection?: DatabaseInformationObject
    //isConnected: boolean = false

    private databasesInfoUrl = "./src/assets/databases.json"

    private static singletonObject: DatabaseConnectionManager | undefined
    static get databaseConnectionManager(): DatabaseConnectionManager { //singleton
        if (!DatabaseConnectionManager.singletonObject) {
            DatabaseConnectionManager.singletonObject = new DatabaseConnectionManager()
        }
        return DatabaseConnectionManager.singletonObject
    }

    async getDatabaseList(): Promise<DatabaseInformationObject[]> {
        var databasesJson: DatabaseInformationObject[] = await (await fetch(this.databasesInfoUrl)).json()
        var databases: DatabaseInformationObject[] = []

        for (const database of databasesJson) {
            databases.push(new DatabaseInformationObject(database))
        }
        return databases
    }

    async connectToDatabase(database: DatabaseInformationObject) {
        console.log("connecting to: " + database.databaseName)
        this.currentConnection = database
    }

    async getDatabaseByName(name: string): Promise<DatabaseInformationObject> {
        const databaseObjects = await this.getDatabaseList()
        for (const database of databaseObjects) {
            if (database.databaseName == name) {
                return database
            }
        }
        throw Error("Database " + name + " not found")
    }

    async getDatabaseTables() :Promise<DatabaseTable[]> {
        if (!this.currentConnection) {
            throw Error("Not connected to any database")
        }

        const url = this.currentConnection.contextTableUrl
        return await (await fetch(url)).json()
    }

}