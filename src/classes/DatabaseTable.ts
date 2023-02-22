export class DatabaseTable {
    TableName: string
    TableUrl: string
    TableSqlName: string
  
    constructor(TableName: string, TableUrl: string, TableSqlName: string) {
      this.TableName = TableName
      this.TableUrl = TableUrl
      this.TableSqlName = TableSqlName
    }
  }