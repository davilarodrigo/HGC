import type { SqlDataTypes } from "../enums/SqlDataTypes"

export class SqlColumn {
  name: string
  type: SqlDataTypes

  constructor(name: string, type: SqlDataTypes) {

    this.name = name
    this.type = type
  }
}