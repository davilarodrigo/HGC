import { NavigationFailureType } from "vue-router";
import { ConnectionManager } from "./ConnectionManager";
import type { Database } from "./Database";
import type { SqlPostedQuery } from "./SqlPostedQuery";
import { SqlTable } from "./SqlTable";
import type { TableInterface } from "./TableInterface";

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

    async getTables() {
        const url = this.database.contextTableUrl
        const response = await fetch(url)
        const data = await response.text()
        var tablesJson: TableInterface[] = []
        var tables: SqlTable[] = []
        tablesJson = JSON.parse(data)
        for (const tableJson of tablesJson) {
            var table = await SqlTable.createTable(tableJson.TableName, tableJson.TableSqlName, tableJson.TableUrl, this.database)
            tables.push(table)
        }
        return tables
    }

    async getQueries(): Promise<SqlPostedQuery[]> {
        const url = this.database.queriesUrl
        const response = await fetch(url)
        const data = await response.text()
        var queries: SqlPostedQuery[] = JSON.parse(data)
        //trim queries values
        for (const query of queries) {
            query.State= query.State.trim()
            query.CodeSource= query.CodeSource.trim()
        }
        return queries
    }

    async updateQuery(query: SqlPostedQuery) {
        const url = this.database.queriesPutUrl
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        })
        const data = await response.text()
        console.log(data)
    }
    
    async getTableByName(tableName: string) {
        throw Error("getTableByName: Not tested")
        const tables = await this.getTables()
        for (const table of tables) {
            if (table.name == tableName) {
                return table
            }
        }
        throw Error("Table not found")
    }

    async getTable(table: SqlTable) {
        throw Error("getTable: Not tested")
        const url = table.url
        const response = await fetch(url)
        const data = await response.text()
        var tablesJson: TableInterface[] = []
        var tables: SqlTable[] = []
        tablesJson = JSON.parse(data)
        for (const tableJson of tablesJson) {
            var table = await SqlTable.createTable(tableJson.TableName, tableJson.TableSqlName, tableJson.TableUrl, this.database)
            tables.push(table)
        }
        return tables
    }
}