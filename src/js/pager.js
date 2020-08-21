import {Observable} from './utils'

export default class Pager extends Observable {
    constructor(data, pageSize = 30) {
        super();
        this.data = data;
        this.pageSize = pageSize;
        this._currentPage = 0;
        this.first()
    }

    getPage(pageNo) {
        const index = this.pageIndexes(pageNo);
        return this.data.slice(index.start, index.end);
    }

    page() {
        return this.getPage(this._currentPage);
    }

    first() {
        this._currentPage = 0;
        this.triggerEvent('pager.first', this)
        return this.page();
    }

    next() {
        if (this._currentPage < this.numPages - 1) {
            this._currentPage += 1;
            this.triggerEvent('pager.next', this)
            return this.page();
        }
    }

    previous() {
        this._currentPage -= 1;
        if (this._currentPage < 0)
            this._currentPage = 0;

        this.triggerEvent('pager.previous', this)

        return this.page()
    }

    toPage(page) {
        this._currentPage = page - 1;
        this.triggerEvent('pager.page', this)
        return this.page()
    }

    get numPages() {
        return Math.ceil(this.data.length / this.pageSize)
    }

    get currentPage() {
        return this._currentPage + 1;
    }

    get isFirst() {
        return this.currentPage == 1;
    }

    get isLast() {
        return this.currentPage == this.numPages;
    }

    pageIndexes(pageNo) {
        const startIdx = pageNo * this.pageSize;
        const endIdx = (pageNo + 1) * this.pageSize;

        return {
            start: startIdx,
            end: endIdx
        }
    }
}