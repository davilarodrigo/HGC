/*example query 
UPDATE dbo.Clients
SET FirstName = 'pedro', Phone = '4774362', ClientId = 5
WHERE FirstName LIKE 'juan' AND ClientId >= 50

if the variables in the query are "FirstName", "phone" and the conditions "firstName" and "clientId" then the query variables are:

the base text would be "UPDATE dbo.Clients SET "

and the variables would be:

{typeOfValue: "string", 
textBefore: "FirstName = '",
 textAfter: "', ", 
 value: "pedro", 
 name: "set first name", 
 operator: "="},

{typeOfValue: "string", 
textBefore: "Phone = '",
 textAfter: "', ", 
 value: "4774362", 
 name: "set phone", 
 operator: "="},

and for the conditions:

{typeOfValue: "string", 
textBefore: "FirstName LIKE '",
 textAfter: "' AND ", 
 value: "juan", 
 name: "first name like", 
 operator: "LIKE"},
*/

import { SqlSyntaxHighlighter } from "./SqlSyntaxHighlighter"

export interface QueryVariable {
    typeOfValue: "string" | "number"
    textBefore: string
    textAfter: string
    value: string
    name: string
    operator: string
    placeholder?: string
}

export class QueryTemplate {

    //completeQuery: (string|QueryVariable)[]

    isFavorite: boolean = false
    baseText: string
    variables: QueryVariable[]
    name: string

    static getTemplatesFromLocalStorage(): QueryTemplate[] {
        const storedTemplates = localStorage.getItem("queryTemplates")
        var templates: QueryTemplate[] = []

        if (storedTemplates) {
            for (const template of JSON.parse(storedTemplates)) {
                templates.push(new QueryTemplate(template.name, template.baseText, template.variables, template.isFavorite))
            }
        }
        return templates
    }

    static saveTemplateInLocalStorage(template: QueryTemplate) {
        const templates = QueryTemplate.getTemplatesFromLocalStorage()

        //check if the template already exists
        for (const templateInLocalStorage of templates) {
            if (templateInLocalStorage.name === template.name) {
                return
            }
        }

        templates.push(template)
        localStorage.setItem("queryTemplates", JSON.stringify(templates))
    }

    static updateTemplateInLocalStorage(template: QueryTemplate) {
        const templates = QueryTemplate.getTemplatesFromLocalStorage()

        //check if the template already exists
        for (let i = 0; i < templates.length; i++) {
            if (templates[i].name === template.name) {
                templates[i] = template
                localStorage.setItem("queryTemplates", JSON.stringify(templates))
                console.log("template " + template.name + " updated in local storage")
                return
            }
        }
        console.log("template " + template.name + " does not exist in local storage")
    }

    static createAndSaveExampleTemplates() {
        const template = new QueryTemplate("example template", "UPDATE dbo.Clients SET ")

        template.addVariable({
            typeOfValue: "string",
            textBefore: "FirstName = '",
            textAfter: "', ",
            value: "",
            name: "set first name to",
            operator: "="
        })

        template.addVariable({
            typeOfValue: "string",
            textBefore: "Phone = '",
            textAfter: "', ",
            value: "",
            name: "set phone to",
            operator: "="
        })

        template.addVariable({
            typeOfValue: "string",
            textBefore: "WHERE FirstName LIKE '",
            textAfter: "' AND ",
            value: "",
            name: "first name like",
            operator: "LIKE"
        })

        template.addVariable({
            typeOfValue: "number",
            textBefore: "ClientId >= ",
            textAfter: "",
            value: "",
            name: "client id greater than or equal to",
            operator: ">="
        })

        QueryTemplate.saveTemplateInLocalStorage(template)

        const template2 = new QueryTemplate("Delete client by ID", "DELETE FROM dbo.Clients WHERE ")
        template2.addVariable({
            typeOfValue: "number",
            textBefore: "ClientId = ",
            textAfter: "",
            value: "",
            name: "client id",
            operator: "="
        })

        QueryTemplate.saveTemplateInLocalStorage(template2)

        /*SELECT *
FROM dbo.HGCSentences
WHERE Sentence LIKE 'asd' AND CodeSentences = 1*/

        const template3 = new QueryTemplate("Select by sentence and code", "SELECT * FROM dbo.HGCSentences WHERE ")

        template3.addVariable({
            typeOfValue: "string",
            textBefore: "Sentence LIKE '",
            textAfter: "' AND ",
            value: "",
            name: "sentence like",
            operator: "LIKE"
        })

        template3.addVariable({
            typeOfValue: "number",
            textBefore: "CodeSentences = ",
            textAfter: "",
            value: "",
            name: "code sentences",
            operator: "="
        })

        QueryTemplate.saveTemplateInLocalStorage(template3)
    }

    toggleFavorite() {
        this.isFavorite = !this.isFavorite
        QueryTemplate.updateTemplateInLocalStorage(this)
    }

    get completeSqlQuery(): string {
        var sqlQuery = this.baseText
        for (const variable of this.variables) {
            sqlQuery += variable.textBefore + variable.value + variable.textAfter
        }

        return sqlQuery
    }

    addVariable(variable: QueryVariable) {
        this.variables.push(variable)
    }

    get commandType(): string {
        return this.baseText.split(" ")[0]
    }

    constructor(name: string, baseText: string, variables?: QueryVariable[], isFavorite?: boolean) {
        this.name = name
        this.baseText = baseText
        this.variables = variables || []
        this.isFavorite = isFavorite || false
    }
}