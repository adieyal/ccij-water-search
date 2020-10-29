import lunr from 'lunr';

export default class Search {
    constructor(data) {
        this.idx = lunr(function () {
            this.ref('id')
            this.field('summary')
            this.field('title')

            data.forEach(function (doc, pos) {
                doc.id = pos;
                this.add(doc)
            }, this)
        })
    }

    search(query) {
         return this.idx.search(query);
    }
}
