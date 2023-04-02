import { Database } from "./Database";
import { Connection } from "./Connection";

export class ConnectionManager {
    currentConnection?: Connection
    connectionStatus: "Connected" | "Disconnected" | "Connecting" | "Error" = "Disconnected"

    private databasesInfoUrl = "./src/assets/databases.json"

    private constructor() { }

    private static singletonObject: ConnectionManager | undefined

    /**
     * get the singleton connection manager object
     * @returns connection manager singleton object
     */
    static get connectionManager(): ConnectionManager {
        if (!ConnectionManager.singletonObject) {
            ConnectionManager.singletonObject = new ConnectionManager()
        }
        return ConnectionManager.singletonObject
    }

    async getDatabaseList(): Promise<Database[]> {
        var databasesJson: Database[] = await (await fetch(this.databasesInfoUrl)).json()
        var databases: Database[] = []
        
        for (const database of databasesJson) {
            databases.push(new Database(database))
        }
        return databases
    }

    async disconnect() {
        if (this.connectionStatus != "Connected") {
            console.error("Not Connected to any database")
        }
        this.currentConnection = undefined
        this.connectionStatus = "Disconnected"
    }

    async connectToDatabase(database: Database, disconnectCurrentConnection = false) {
        if (this.currentConnection) {
            if (disconnectCurrentConnection) {
                this.disconnect()
            } else {
                throw Error("Already connected to " + this.currentConnection.database.databaseName)
            }
        }

        try {
            this.connectionStatus = "Connecting"
            this.currentConnection = await Connection.createNewConnection(database)
            this.connectionStatus = "Connected"
            console.log("successfully connected to: " + database.databaseName)
        } catch (error) {
            this.connectionStatus = "Error"
            this.currentConnection = undefined
        }
    }

    async getDatabaseByName(name: string): Promise<Database> {
        const databaseObjects = await this.getDatabaseList()
        for (const database of databaseObjects) {
            if (database.databaseName == name) {
                return database
            }
        }
        throw Error("Database " + name + " not found")
    }
}