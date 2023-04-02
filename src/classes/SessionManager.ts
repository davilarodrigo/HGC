import { Database } from "./Database";
import { Connection } from "./Connection";
import { LocalStorageManager } from "./LocalStorageManager";

enum Roles {
    admin = "admin",
    reviewer = "reviewer",
    editor = "editor",
    noRole = "undefined"
}

class Session {
    username: string
    role?: Roles
    token: Token

    constructor(username: string, token: Token, role?: Roles) {
        this.username = username
        this.token = token
        this.role = role
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
    private constructor() { }
    private static singletonObject: SessionManager | undefined
    static get sessionManager(): SessionManager {
        if (!SessionManager.singletonObject) {
            SessionManager.singletonObject = new SessionManager()
        }
        return SessionManager.singletonObject
    }

    private generateToken(shortSession = true): Token {
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        var expiration = new Date()

        if (shortSession) {
            expiration.setSeconds(expiration.getSeconds() + 10)
            expiration.setHours(expiration.getHours() - 3)
        } else {
            expiration.setHours(expiration.getHours() + 1)
        }
        
        return new Token(token, expiration)
    }

    private sessionActive = false

    get isSessionActive(): boolean {
        if (!this.sessionActive) {
            this.validateSession()
        } else {
            return true
        }
        return this.currentSession != undefined
    }

    currentSession?: Session

    private validateSession() {
        try {
            const session = this.getSessionFromLocalStorage()
            const token = session.token
            const expiration = token.expiration
            const now = new Date()
                                    
            if (now > expiration) {
                this.removeSessionFromLocalStorage()
                throw Error("Token expired")
            }
            this.currentSession = session
            this.sessionActive = true                        
            return
        } catch (error) {
            console.log("Could not validate session")
        }
        this.sessionActive = false
        this.currentSession = undefined
    }

    private saveSessionInLocalStorage(session: Session) {
        LocalStorageManager.saveInLocalStorage("session", session)
    }

    private getSessionFromLocalStorage() {
        try {
            const session = LocalStorageManager.getObjectFromLocalStorage("session")
            return session as Session
        } catch (error) {
            throw Error("No session found in local storage")
        }
    }

    private removeSessionFromLocalStorage() {
        LocalStorageManager.removeItemFromLocalStorage("session")
    }

    logout() {
        this.removeSessionFromLocalStorage()
        this.currentSession = undefined
    }

    login(username: string, password: string): boolean {
        const users = this.getUsers()

        if (users) {
            for (const user of users) {
                if (user.username == username && user.password == password) {
                    const session = new Session(username, this.generateToken())
                    this.saveSessionInLocalStorage(session)
                    this.sessionActive = true
                    return true
                }
            }
        }
        return false
    }

    getUsers() {
        return LocalStorageManager.getObjectFromLocalStorage("users")
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