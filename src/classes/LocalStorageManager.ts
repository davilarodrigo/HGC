export class LocalStorageManager {
    static saveInLocalStorage(key: string, object: any) {
        localStorage.setItem(key, JSON.stringify(object))
    }

    static getObjectFromLocalStorage(key: string, classType?: any) {
        const localStorageElement = localStorage.getItem(key)
        if (!localStorageElement) {
            return null
        }

        if (classType) {
            return new classType(JSON.parse(localStorageElement))
        }

        return JSON.parse(localStorageElement)
    }

    static removeItemFromLocalStorage(key: string) {
        localStorage.removeItem(key)
    }

    static getObjectWithClass(key: string, classType: any) {
        const localStorageElement = localStorage.getItem(key)

        if (!localStorageElement) {
            return null
        }

        return new classType(JSON.parse(localStorageElement))
    }
}