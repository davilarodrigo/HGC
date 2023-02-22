export class DatabaseInformationObject {
  databaseName: string
  baseUrl: string
  contextTableName: string
  sqlSelectUrl: string
  sentencesUrl: string
  //contextTable?: TableJson[]

  //constructor(json)
  //constructor(databaseName: string, baseUrl: string, contextTableUrl: string, sqlSelectUrl: string, sentencesUrl: string //, contextTable: TableJson[]

  constructor(database: DatabaseInformationObject
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
}

