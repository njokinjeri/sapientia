const latinPhrase = document.getElementById("latin-text");
const latinTranslation = document.getElementById('translation');
const latinExplanation = document.getElementById('explanation');
const quoteSource = document.querySelector(".source");
const quoteLatinTheme = document.querySelector(".theme");
const NewQuoteBtn = document.getElementById("new-content-btn");

let quotesData = [];

const displayRandomQuote = () => {
    if (quotesData.length === 0) {
        console.warn("Quotes data not loaded yet.");
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotesData.length);
    const quote = quotesData[randomIndex];

    latinPhrase.textContent = quote.latin;
    latinTranslation.textContent = quote.translation;
    latinExplanation.textContent = quote.explanation;
    quoteSource.textContent = quote.source;
    quoteLatinTheme.textContent = quote.theme.latin;
    quoteLatinTheme.title = quote.theme.english;
};

fetch('../data/latin-quotes.json')
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        quotesData = data;
        displayRandomQuote();
        console.log("Data loaded successfully:", data);
        })
    .catch((error) => {
        console.error("Failed to load or parse data:", error)
    });

 NewQuoteBtn.addEventListener("click", displayRandomQuote);
