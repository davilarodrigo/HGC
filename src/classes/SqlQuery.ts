import type { SqlCommandTypes } from "@/enums/SqlCommandTypes";
import type { SqlCondition } from "./SqlCondition";

export class SqlQuery {
    type: SqlCommandTypes
    conditions: SqlCondition[]

    //valuesToInsert: any[]

    constructor(type: SqlCommandTypes, conditions: SqlCondition[]) {
        this.type = type
        this.conditions = conditions
    }

    //TODO use as base class, create SqlSelectQuery, SqlInsertQuery, SqlUpdateQuery, SqlDeleteQuery with specific properties 
}

