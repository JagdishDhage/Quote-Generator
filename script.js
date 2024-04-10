const templateContainer = document.getElementById("template-container");
const quotes = document.getElementById("qoute");
const author = document.getElementById("auther"); // Corrected spelling
const twitter = document.getElementById("twitter");
const newQuotes = document.getElementById("newquotes");
let apiQuotes = []; // Corrected pluralization

function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (!quote.author) {
    author.textContent = 'Unknown';
  } else {
    author.textContent = quote.author;
  }

  if (quote.text.length > 120) { 
    quotes.classList.add('long-quote');
  } else {
    quotes.classList.remove('long-quote');
  }

  quotes.textContent = quote.text;
}

async function getQuote() {
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.error("Error fetching quotes:", error); 
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quotes.textContent} - ${author.textContent}`;
  window.open(twitterUrl, '_blank');
}

newQuotes.addEventListener('click', newQuote); 
twitter.addEventListener('click', tweetQuote); 

getQuote();
