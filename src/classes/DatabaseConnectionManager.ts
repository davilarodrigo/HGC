import { DatabaseInformationObject } from "./DatabaseInformationObject";
import type { DatabaseTable } from "src/classes/DatabaseTable"

export class DatabaseConnectionManager {
    currentConnection?: DatabaseInformationObject
    connectionStatus: "Connected" | "Disconnected" | "Connecting" | "Error" = "Disconnected"

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
        this.connectionStatus="Connecting"        

        try {
            const data =await fetch(this.currentConnection.contextTableUrl)
            console.log(data)
        } catch (error) {
            this.connectionStatus = "Error"            
            console.log("error connecting")            
            console.log("this.connectionStatus")
            console.log(this.connectionStatus)
            return
            //throw Error("Could not connect to " + database.databaseName)
        }
        this.connectionStatus = "Connected"
        
        console.log("successfully connected to: " + database.databaseName)
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

    async getDatabaseTables(): Promise<DatabaseTable[]> {
        if (!this.currentConnection) {
            throw Error("Not connected to any database")
        }

        const url = this.currentConnection.contextTableUrl
        return await (await fetch(url)).json()
    }

}