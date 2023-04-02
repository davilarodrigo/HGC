export interface SqlPostedQuery {
    Sentence: string
    State: string
    CodeSource: string
    UsrCreator_: string
    UsrAuthorizer: string
    DTcreation: string
    DTAuthorization: string
    CodeSentences: string

    /*example query
    "Sentence": "SELECT", 
    "CodeSource": "SELECT FirstName, LastName, Phone FROM dbo.Clients; ",
    "DTcreation": "2022-11-25T22:00:36.31",
    "DTAuthorization": "2022-11-25T22:00:59.62",
    "UsrCreator_": "admin1 ",
    "UsrAuthorizer": "admin1 ",
    "State": "Approved ",
    "CodeSentences": 31,
    */
}	