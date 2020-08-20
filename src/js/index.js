import data from '../data/db.json'
import lottie from '../documents/lottieflow-scrolling-05-2-66aaf8-easey.json';
import lunr from 'lunr';

import Pager from './pager';
import PagerWidget from './widgets/pager_widget';

const pageSize = 18;

const elArticleLoadingWrapper = $('.articles-loading__wrapper');
const elArticleWrapper = $('.articles__wrapper')[0];
const elDropdownCountries = $('.dropdown-list__links');
const elSearch = $('.search__bar');

let templateArticles = []
const templateArticle = $('.article__wrap', elArticleWrapper)[0].cloneNode(true);
const templateDropdownLink = $('.dropdown-link', elDropdownCountries)[0].cloneNode(true);
const state = {
    country: null,
    query: "",
    pager: null
}

const pagerWidget = new PagerWidget();
pagerWidget.on('pagerwidget.previous', payload => {
    if (state.pager) {
        state.pager.previous()
        displayArticles(state.pager);
    }
})

pagerWidget.on('pagerwidget.next', payload => {
    if (state.pager) {
        state.pager.next()
        displayArticles(state.pager);
    }
})

let timer = null;
const delay = 200;

function delayBeforeFiltering() {
    if (timer != null) {
        clearTimeout(timer);
    }

    timer = setTimeout(filterArticles, delay);
}

function prepareElements() {
    elSearch.keyup(el => {
        const value = el.target.value;
        let searchResults = null;

        state.query = null;
        if (value.length > 3) {
            state.query = value;
        }

        delayBeforeFiltering();
    })

    $(elArticleWrapper).removeClass("hidden");
    $('.article__wrap', elArticleWrapper).remove();
    templateArticles = [...Array(pageSize)].map(() => {
        const elArticle = templateArticle.cloneNode(true);
        elArticleWrapper.append(elArticle);
        return elArticle;
    })

    elArticleLoadingWrapper.hide();

    const countries = extractCountries(data);
    populateCountryDropdown(countries);
}

function createSearchIndex() {
    const idx = lunr(function () {
        this.ref('id')
        this.field('summary')
        this.field('title')

        data.forEach(function (doc, pos) {
            doc.id = pos;
            this.add(doc)
        }, this)
    })
    return idx;
}

function extractCountries(data) {
    const countries = {}
    data.forEach(el => {
        countries[el.country] = 1
    })

    return Object.keys(countries).sort()
}

function populateCountryDropdown(countries) {
    $('.dropdown-link', elDropdownCountries).remove();

    countries = ["All Countries"].concat(countries);

    countries.forEach(el => {
        let element = $(templateDropdownLink.cloneNode(true));
        element.removeClass('active');
        element.text(el)
        elDropdownCountries.append(element);

        element.click(ev => {
            $('.dropdown-link', elDropdownCountries).removeClass('active');
            $(ev.target).addClass('active');
            const country = ev.target.text;
            state.country = country;
            filterArticles();
        })

    })
}

function filterArticles() {
    let articles = data;

    if (state.query != null) {
        const searchResults = searchIndex.search(state.query);
        articles = searchResults.map(el => {
            const id = el.ref;
            return data[id]
        })
    }

    articles = articles.filter(el => {
        if (state.country && state.country != 'All Countries') {
            if (el.country == state.country)
                return true;
            return false
        }
        return true;
    })

    state.pager = new Pager(articles, pageSize);
    state.pager.on("pager.previous", payload => pagerWidget.onPrevious(payload))
    state.pager.on("pager.next", payload => pagerWidget.onNext(payload))
    state.pager.on("pager.first", payload => pagerWidget.onFirst(payload))

    state.pager.first()

    displayArticles(state.pager);
}

function hideArticles() {
    templateArticles.forEach(el => {
        $(el).addClass("hidden");
    })
}

function resetArticle(article) {
    $('.article-content__country', article).text("Country")
    $('.article-author', article).text("Missing Author")
    $('.article-title', article).text("Missing Title")
    $('.article-date', article).text("Missing date")
    $('.article-publisher', article).text("Missing publisher")
    $('.article-image', article).css('background-image', 'none');
}


function displayArticles(pager) {
    hideArticles();

    let page = pager.page()
    // $('.article__wrap', elArticleWrapper).remove();

    page.forEach((el, idx) => {
        // let elArticleBlock = $(templateArticle.clone());
        let elArticleBlock = templateArticles[idx];
        resetArticle(elArticleBlock);

        $('.article-content__country', elArticleBlock).text(el.country)

        if (el.author)
            $('.article-author', elArticleBlock).text(el.author)

        if (el.title)
            $('.article-title', elArticleBlock).text(el.title)

        if (el.publish_date)
            $('.article-date', elArticleBlock).text(el.publish_date)

        if (el.publisher)
            $('.article-publisher', elArticleBlock).text(el.publisher)

        if (el.image)
            $('.article-image', elArticleBlock).css('background-image', `url(${el.image}`);

        $(elArticleBlock).attr('href', el.url);

        // elArticleWrapper.append(elArticleBlock);
        $(elArticleBlock).removeClass("hidden")
    })

    $(elArticleLoadingWrapper).addClass("hidden")
    $(elArticleWrapper).removeClass("hidden")

}

const searchIndex = createSearchIndex()
prepareElements();
filterArticles();
