import {Observable} from '../utils'

export default class PagerWidget extends Observable {

    constructor() {
        super();
        this.prepareDOM();
    }

    prepareDOM() {
        const paginationWrapper = $('.pagination-inner');
        const prevButton = $('.pagination-button', paginationWrapper)[0];
        const nextButton = $('.pagination-button', paginationWrapper)[1];
        this.pageNumberCurrent = $('.pagination-number--current', paginationWrapper)[0];
        this.pageNumberTotal = $('.pagination-number--total', paginationWrapper)[0];

        $(prevButton).click(ev => {
            this.triggerEvent('pagerwidget.previous', this)
        })

        $(nextButton).click(ev => {
            this.triggerEvent('pagerwidget.next', this)
        })
    }

    updatePageNumbers(pager) {
        $(this.pageNumberCurrent).text(pager.currentPage)
        $(this.pageNumberTotal).text(pager.numPages)
    }

    onPrevious(payload) {
        this.updatePageNumbers(payload)

        console.log("Previous:")
        console.log(payload)
    }

    onFirst(payload) {
        this.updatePageNumbers(payload)
    }

    onNext(payload) {
        this.updatePageNumbers(payload)
    }

}