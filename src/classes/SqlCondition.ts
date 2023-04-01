import type { SqlColumn } from "./sqlColumn"
import type { SqlOperators } from "./SqlOperators"

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
        var sql = "WHERE "
        sql += conditions.map(c => c.getSql()).join(" AND ")

        return sql
    }
}