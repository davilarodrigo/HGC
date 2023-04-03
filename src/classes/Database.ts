export class Database {
    databaseName: string
   baseUrl: string
  private contextTableName: string
  private sqlSelectUrl: string
  private sentencesUrl: string
  //contextTable?: TableJson[]

  //constructor(json)
  //constructor(databaseName: string, baseUrl: string, contextTableUrl: string, sqlSelectUrl: string, sentencesUrl: string //, contextTable: TableJson[]

  constructor(database: Database
  ) {
    this.databaseName = database.databaseName
    this.baseUrl = database.baseUrl
    this.contextTableName = database.contextTableName
    this.sqlSelectUrl = database.sqlSelectUrl
    this.sentencesUrl = database.sentencesUrl
    //this.contextTable = contextTable
  }

  get contextTableUrl() {
    return this.baseUrl + this.contextTableName
  }

  get queriesUrl() {
    return this.baseUrl + this.sentencesUrl
  }

  get queriesPutUrl() {
    console.log("queriesPutUrl: " + this.baseUrl + this.sentencesUrl + "put")
    return this.baseUrl + this.sentencesUrl + "put"
  }
}

