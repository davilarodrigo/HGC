import { Database } from "./Database";
import { Connection } from "./Connection";
import { LocalStorageManager } from "./LocalStorageManager";
import { ReportsManager } from "./ReportManager";

enum Roles {
    admin = "admin",
    reviewer = "reviewer",
    editor = "editor",
    noRole = "undefined"
}

class Session {
    username: string
    roles?: Roles[]
    token: Token

    constructor(username: string, token: Token, roles?: Roles[]) {
        this.username = username
        this.token = token
        this.roles = roles
    }
}

class Token {
    token: string
    expiration: Date

    constructor(token: string, expiration: Date) {
        this.token = token
        this.expiration = expiration
    }
}
/*
class User {
    username: string
    password: string
    role?: Roles

    constructor(username: string, password: string, role?: Roles) {
        this.username = username
        this.password = password
        this.role = role
    }
}*/

export class SessionManager {
    private static singletonObject: SessionManager | undefined
    private privateCurrentSession: Session | false = false

    //singleton
    private constructor() { }
    static get sessionManager(): SessionManager {
        if (!SessionManager.singletonObject) {
            SessionManager.singletonObject = new SessionManager()
        }
        return SessionManager.singletonObject
    }

    get currentSession(): Session | false {
        this.validateSession()
        //if there is no current session, see if there is one in local storage and validate it

        return this.privateCurrentSession
    }

    logout() {
        if (!this.privateCurrentSession) {
            return
        }
        ReportsManager.logReport("User logged out: " + this.privateCurrentSession?.username)
        this.removeSessionFromLocalStorage()
        this.privateCurrentSession = false
    }

    login(username: string, password: string): boolean {
        const users = this.getUsers()

        if (users) {
            for (const user of users) {
                if (user.username == username && user.password == password) {
                    this.privateCurrentSession = new Session(username, this.generateToken())
                    this.saveSessionInLocalStorage(this.privateCurrentSession)
                    ReportsManager.logReport("User logged in: " + username)

                    return true
                }
            }
        }
        return false
    }

    getUsers() {
        return LocalStorageManager.getObjectFromLocalStorage("users")
    }

    private generateToken(shortSession = false): Token {
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        var expiration = new Date()

        if (shortSession) {
            expiration.setSeconds(expiration.getSeconds() + 10)
        } else {
            expiration.setHours(expiration.getHours() + 1)
        }

        return new Token(token, expiration)
    }

    private validateSession() {
        var session: Session

        //try to get session from local storage
        if (!this.privateCurrentSession) {
            try {
                session = this.getSessionFromLocalStorage()
            } catch (error) {
                //console.log("No session in local storage")
                return
            }
        } else {
            session = this.privateCurrentSession
        }

        //validate if session is expired
        if (session.token.expiration < new Date()) {
            alert("Session expired. Please log in again.")

            this.removeSessionFromLocalStorage()
            this.privateCurrentSession = false
            return
        } else {
            this.privateCurrentSession = session
        }
    }

    private saveSessionInLocalStorage(session: Session) {
        //save each attribute of the session in local storage separately        
        LocalStorageManager.saveInLocalStorage("userSession.activeSession", session)
        LocalStorageManager.saveInLocalStorage("userSession.token", session.token)
        LocalStorageManager.saveInLocalStorage("userSession.token.expiration", session.token.expiration)
    }

    private getSessionFromLocalStorage(): Session {
        try {
            const session = LocalStorageManager.getObjectFromLocalStorage("userSession.activeSession")
            session.token = LocalStorageManager.getObjectFromLocalStorage("userSession.token")
            session.token.expiration = new Date(JSON.parse(LocalStorageManager.getObjectFromLocalStorage("userSession.token.expiration",false)))

            return session
        } catch (error) {
            throw Error("No session found in local storage" + error)
        }
    }

    private removeSessionFromLocalStorage() {
        LocalStorageManager.removeItemFromLocalStorage("userSession.activeSession")
    }

    /*
    saveUser(user: User) {
        const users = this.getUsers()

        if (users) {
            users.push(user)
        } else {
            LocalStorageManager.saveInLocalStorage("users", [user])
        }
    }

    registerNewUser(username: string, password: string, role?: Roles) {
        const user = new User(username, password, role)
        this.saveUser(user)
        console.log("user registered: " + username)
    }*/
}