import { SqlSyntaxHighlighter } from "./SqlSyntaxHighlighter"

interface QueryVariable {
    typeOfValue: "string" | "number"
    value: string
    textBefore: string
    textAfter: string
}

export class QueryTemplate {

    //completeQuery: (string|QueryVariable)[]

    baseText: string
    variables: QueryVariable[]
    name: string

    getAsSqlQuery(highlighted = false): string {
        var sqlQuery = this.baseText
        for (const variable of this.variables) {
            sqlQuery += variable.textBefore + variable.value + variable.textAfter
        }
        if (highlighted) {
            return SqlSyntaxHighlighter.highlightCompleteSqlQuery(sqlQuery)
        }

        return sqlQuery
    }

    addVariable(variable: QueryVariable) {
        this.variables.push(variable)
    }

    constructor(name: string, baseText: string, variables: QueryVariable[]) {
        this.name = name
        this.baseText = baseText
        this.variables = variables
    }
}