import { makeAutoObservable } from "mobx"

class News {
    news = []

    constructor() {
        makeAutoObservable(this)
    }

    setNews(list) {
        this.news = list
    }

    getNews() {
        return this.news
    }
}

export default new News()