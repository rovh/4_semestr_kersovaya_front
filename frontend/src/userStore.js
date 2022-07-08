import { makeAutoObservable } from "mobx"

class User {
    user = null

    constructor() {
        makeAutoObservable(this)
    }

    setUser(newUser) {
        this.user = newUser
    }

    getUser() {
        return this.user
    }
}

export default new User()