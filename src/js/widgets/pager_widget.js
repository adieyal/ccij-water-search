import {Observable} from '../utils'

export default class PagerWidget extends Observable {

    constructor() {
        super();
        this.prepareDOM();
    }

    prepareDOM() {
        const paginationWrapper = $('.pagination-inner');
        this.prevButton = $('.pagination-button', paginationWrapper)[0];
        this.nextButton = $('.pagination-button', paginationWrapper)[1];
        this.pageNumberCurrent = $('.pagination-number--current', paginationWrapper)[0];
        this.pageNumberTotal = $('.pagination-number--total', paginationWrapper)[0];

        $(this.prevButton).click(ev => {
            this.triggerEvent('pagerwidget.previous', this)
        })

        $(this.nextButton).click(ev => {
            this.triggerEvent('pagerwidget.next', this)
        })
    }

    updatePageNumbers(pager) {
        $(this.pageNumberCurrent).text(pager.currentPage)
        $(this.pageNumberTotal).text(pager.numPages)
    }

    updateButtons(pager) {

        if (pager.isFirst) $(this.prevButton).addClass("disabled");
        else $(this.prevButton).removeClass("disabled");

        if (pager.isLast) $(this.nextButton).addClass("disabled");
        else $(this.nextButton).removeClass("disabled");
    }

    updateElements(pager) {
        this.updatePageNumbers(pager);
        this.updateButtons(pager);
    }

    onPrevious(payload) {
        this.updateElements(payload);
    }

    onFirst(payload) {
        this.updateElements(payload);
    }

    onNext(payload) {
        this.updateElements(payload);
    }

}