import QuoteGetter from "./QuoteGetter.js";

const myGetter = new QuoteGetter('authorSelect', 'output');

function submit() {
    const author = document.querySelector("#authorSelect").value;
    myGetter.filterByAuthor(author);
}

document.querySelector("#authorButton").addEventListener("click", submit);