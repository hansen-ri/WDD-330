export default class QuoteGetter {
    constructor(authorId, quotesId) {
        this.authorId = authorId;
        this.quotesId = quotesId;
        this.quotes = [];
        this.quoteAuthors = [];
        this.init();
    }
    async init() {
        this.quotes = await this.getQuotes();
        // console.log(this.quotes);
        this.quoteAuthors = await this.extractAuthors();
        this.buildAuthorSelect();
    }
    getQuotes() {
        return fetch("https://type.fit/api/quotes")
            .then((response) =>response.json())
            .then((data) => data);
    }
    extractAuthors() {
        //Sets automatically remove diplicate records. So if we ise .map to send 
        // just the author for each quote into a Set it will give us a distinct list.
        const authors = new Set(this.quotes.map(quote => quote.author));
        // We need to turn our list back into an Array. Using the Spread operator is a slick way to do this.
        return [...authors];
    }
    buildAuthorSelect() {
        const element = document.getElementById(this.authorId);
        const authorHtml = this.quoteAuthors.map(author => `<option value="${author}">${author}</option>`);
        element.innerHTML = authorHtml.join('');
    }
    filterByAuthor(author) {
        const filtered = this.quotes.filter(quote => quote.author === author);
        this.renderQuotes(filtered);
    }
    renderQuotes(quotes) {
        const element = document.getElementById(this.quotesId);
        element.innerHTML = quotes.map(quote => `<li>${quote.text}</li>`).join('');
    }
}
