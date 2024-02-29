const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const instaBtn = document.getElementById('instagram');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
} 

function newQuote() {
    loading();
    // Create a new quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author field is blank and replace with 'unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //check quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

//Get Quote From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (err) {
        console.log('whoops, no qoute', err);
    }
}

function postQuote() {
    const instaUrl = `https://www.instagram.com/create/story?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(instaUrl, '_blank');
}

//ivent listeners
newQuoteBtn.addEventListener('click', newQuote);
instaBtn.addEventListener('click', postQuote);

//On Load
getQuotes();
