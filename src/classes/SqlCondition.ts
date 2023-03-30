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
}