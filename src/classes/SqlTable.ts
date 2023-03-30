import type { Database } from "./Database"
import { SqlColumn } from "./sqlColumn"

export class SqlTable {
  name: string
  sqlName: string
  url: string

  database: Database
  columns: SqlColumn[] = []

  private constructor(name: string, sqlName: string, url: string, database: Database) {
    this.name = name
    this.sqlName = sqlName
    this.url = database.baseUrl + "/" + url
    this.database = database
  }

  static async createTable(name: string, sqlName: string, url: string, database: Database) {
    const table = new SqlTable(name, sqlName, url, database)
    await table.getColumns()
    return table
  }

  private getHeaders(data: Array<any>) {
    return Object.keys(data[0])
  }

  private async getColumns() {
    const data = await (await fetch(this.url)).json()
    const headers = this.getHeaders(data)
    //const types = getColumnsTypes(data)

    var columns: SqlColumn[] = []

    for (const i in headers) {
      const column = new SqlColumn(headers[i], "type")
      // var column: SqlColumn = {
      //   name: headers[i],
      //   ColumnType: types[i]
      // }
      columns.push(column)
    }

    this.columns = columns
    return columns
  }
}