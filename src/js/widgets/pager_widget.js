import {Observable} from '../utils'

class PaginationLinks extends Observable {
    constructor() {
        super();
        this.prepareDOM();
    }

    prepareDOM() {
        this.wrapper = $('.pagination__page-links__wrapper');
        this.prev2 = $('.pagination__page-value--2-previous');
        this.prev1 = $('.pagination__page-value--1-previous');
        this.current = $('.pagination__page-value--current');
        this.next1 = $('.pagination__page-value--1-next');
        this.next2 = $('.pagination__page-value--2-next');
        this.first = $('.pagination__page-value--first')
        this.last = $('.pagination__page-value--last')
        this.dots1 = $($('.pagination__dots')[0]);
        this.dots2 = $($('.pagination__dots')[1]);

        [this.first, this.prev2, this.prev1, this.next2, this.next1, this.last].forEach(el => {
            el.click(ev => this.triggerEvent('pagerwidget.page', ev.target.text))
        })
    }

    setLinks(pager) {

        function show(...args) {
            args.forEach(el => {
                el.show();
            })
        }

        function setText(...args) {
            args.forEach((el, idx) => {
                el.text(idx + 1);
            })
        }

        // this.wrapper.hide();
        this.first.hide();
        this.last.hide();
        this.prev2.hide();
        this.prev1.hide();
        this.next1.hide();
        this.next2.hide();
        this.dots1.show();
        this.dots2.show();
        const numPages = pager.numPages;
        const currentPage = pager.currentPage;
        // const numPages = 4;
        // const currentPage = 4;

        if (numPages == 1) {
            this.dots1.hide();
            this.dots2.hide();
            this.current.text(1);
        }
        else if (numPages == 2) {
            this.dots1.hide();
            this.dots2.hide();
            if (currentPage == 1) {
                setText(this.current, this.next1);
                show(this.next1);
            } else {
                setText(this.prev1, this.current);
                show(this.prev1)
            }
        } else if (numPages == 3) {
            this.dots1.hide();
            this.dots2.hide();
            if (currentPage == 1) {
                setText(this.current, this.next1, this.next2);
                show(this.next1, this.next2);
            } else if (currentPage == 2) {
                setText(this.prev1, this.current, this.next1);
                show(this.prev1, this.next1);
            } else if (currentPage == 3) {
                setText(this.prev2, this.prev1, this.current);
                show(this.prev2, this.prev1);
            }
        } else if (numPages == 4) {
            this.dots1.hide();
            this.dots2.hide();
            if (currentPage == 1) {
                setText(this.current, this.next1, this.next2, this.last);
                show(this.next1, this.next2, this.last);
            } else if (currentPage == 2) {
                setText(this.prev1, this.current, this.next1, this.next2);
                show(this.prev1, this.next1, this.next2);
            } else if (currentPage == 3) {
                setText(this.prev2, this.prev1, this.current, this.next1);
                show(this.prev2, this.prev1, this.next1);
            } else if (currentPage == 4) {
                setText(this.first, this.prev2, this.prev1, this.current);
                show(this.first, this.prev2, this.prev1);
            }
        } else if (numPages == 5) {
            if (currentPage == 1) {
                setText(this.current, this.next1, this.next2);
                show(this.next1, this.next2, this.last);
                this.last.text(numPages)
                this.dots1.hide();
            } else if (currentPage == 2) {
                setText(this.prev1, this.current, this.next1, this.next2, this.last);
                show(this.prev1, this.next1, this.next2, this.last);
                this.dots1.hide();
                this.dots2.hide();
            } else if (currentPage == 3) {
                setText(this.prev2, this.prev1, this.current, this.next1, this.next2);
                show(this.prev2, this.prev1, this.next1, this.next2);
                this.dots1.hide();
                this.dots2.hide();
            } else if (currentPage == 4) {
                setText(this.first, this.prev2, this.prev1, this.current, this.next1);
                show(this.first, this.prev2, this.prev1, this.next1);
                this.dots1.hide();
                this.dots2.hide();
            } else if (currentPage == 5) {
                setText(this.first, this.prev2, this.prev2, this.prev1, this.current);
                show(this.first, this.prev2, this.prev1);
                this.dots2.hide();
            }
        } else if (numPages == 6) {
            if (currentPage == 1) {
                setText(this.current, this.next1, this.next2);
                show(this.next1, this.next2, this.last);
                this.last.text(numPages)
                this.dots1.hide();
            } else if (currentPage == 2) {
                setText(this.prev1, this.current, this.next1, this.next2);
                show(this.prev1, this.next1, this.next2, this.last);
                this.last.text(numPages)
                this.dots1.hide();
            } else if (currentPage == 3) {
                setText(this.prev2, this.prev1, this.current, this.next1, this.next2, this.last);
                show(this.prev2, this.prev1, this.next1, this.next2, this.last);
                this.last.text(numPages)
                this.dots1.hide();
                this.dots2.hide();
            } else if (currentPage == 4) {
                setText(this.first, this.prev2, this.prev1, this.current, this.next1, this.next2);
                show(this.first, this.prev2, this.prev1, this.next1, this.next2);
                this.dots1.hide();
                this.dots2.hide();
            } else if (currentPage == 5) {
                setText(this.first, this.prev2, this.prev2, this.prev1, this.current, this.next1);
                show(this.first, this.prev2, this.prev1, this.next1);
                this.dots2.hide();
            } else if (currentPage == 6) {
                setText(this.first, this.prev2, this.prev2, this.prev2, this.prev1, this.current);
                show(this.first, this.prev2, this.prev1);
                this.dots2.hide();
            }
        } else if (numPages >= 7) {
            if (currentPage == 1) {
                setText(this.current, this.next1, this.next2);
                show(this.next1, this.next2, this.last);
                this.last.text(numPages)
                this.dots1.hide();
            } else if (currentPage == 2) {
                setText(this.prev1, this.current, this.next1, this.next2);
                show(this.prev1, this.next1, this.next2, this.last);
                this.last.text(numPages)
                this.dots1.hide();
            } else if (currentPage == 3) {
                setText(this.prev2, this.prev1, this.current, this.next1, this.next2);
                show(this.prev2, this.prev1, this.next1, this.next2, this.last);
                this.last.text(numPages)
                this.dots1.hide();
            } else if (currentPage == 4) {
                setText(this.first, this.prev2, this.prev1, this.current, this.next1, this.next2);
                show(this.first, this.prev2, this.prev1, this.next1, this.next2, this.last);
                this.last.text(numPages)
                this.dots1.hide();
            } else if (currentPage > 4 && currentPage <= numPages - 3) {
                this.first.text(1);
                this.prev2.text(currentPage - 2)
                this.prev1.text(currentPage - 1)
                this.current.text(currentPage)
                this.next1.text(currentPage + 1)
                this.next2.text(currentPage + 2)
                this.last.text(numPages)
                show(this.first, this.prev2, this.prev1, this.next1, this.next2, this.last);
            } else if (currentPage == numPages - 2) {
                this.first.text(1);
                this.prev2.text(currentPage - 2)
                this.prev1.text(currentPage - 1)
                this.current.text(currentPage)
                this.next1.text(currentPage + 1)
                this.next2.text(currentPage + 2)
                show(this.first, this.prev2, this.prev1, this.next1, this.next2);
                this.dots2.hide();
            } else if (currentPage == numPages - 1) {
                this.first.text(1);
                this.prev2.text(currentPage - 2)
                this.prev1.text(currentPage - 1)
                this.current.text(currentPage)
                this.next1.text(currentPage + 1)
                show(this.first, this.prev2, this.prev1, this.next1);
                this.dots2.hide();
            } else if (currentPage == numPages) {
                this.first.text(1);
                this.prev2.text(currentPage - 2)
                this.prev1.text(currentPage - 1)
                this.current.text(currentPage)
                show(this.first, this.prev2, this.prev1);
                this.dots2.hide();
            }
        }
    }
}

export default class PagerWidget extends Observable {

    constructor() {
        super();
        this.prepareDOM();
        this.paginationLinks = new PaginationLinks();
        this.bubbleEvent(this.paginationLinks, 'pagerwidget.page')
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
        // $(this.pageNumberCurrent).text(pager.currentPage)
        // $(this.pageNumberTotal).text(pager.numPages)
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
        this.paginationLinks.setLinks(pager);
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

    onPage(payload) {
        this.updateElements(payload);
    }

}