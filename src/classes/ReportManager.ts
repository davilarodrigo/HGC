import { LocalStorageManager } from "./LocalStorageManager"

export class Report {
    message: string
    date: Date

    constructor(message: string) {
        this.message = message
        this.date = new Date()
    }
}

export class ReportsManager {  
    static logReport(report: string) {
        var reports = ReportsManager.getReports()

        const reportObject = new Report(report)

        reports.push(reportObject)
        LocalStorageManager.saveInLocalStorage("reports", reports)        

        console.log(reportObject)
    }

    static getReports(): Report[] {
        var reports: Report[] = []
        LocalStorageManager.getObjectFromLocalStorage("reports")

        console.log(reports)

        return reports
    }
}