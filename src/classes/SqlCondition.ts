import type { SqlColumn } from "./SqlColumn"
import type { SqlOperators } from "../enums/SqlOperators"

export class SqlCondition {
   column : SqlColumn
   operator: SqlOperators
   value: any

    constructor(column: SqlColumn, operator: SqlOperators, value: any) {
        this.column = column
        this.operator = operator
        this.value = value
    }

    getSql() {
        var sql = ""
        sql += this.column.name
        sql += " "
        sql += this.operator
        sql += " "
        sql += this.value        
        return sql
    }

    static getConditionsAsSql(conditions: SqlCondition[]) {
        if (conditions.length == 0) {
            return ""
        }
        var sql = " WHERE "
        sql += conditions.map(c => c.getSql()).join(" AND ")

        return sql
    }
}