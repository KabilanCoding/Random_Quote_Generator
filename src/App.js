import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const QuoteBox = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://type.fit/api/quotes');
      const quotes = response.data;
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex].text);
      setAuthor(quotes[randomIndex].author || 'Unknown');
      setError(null); // Reset error if the request is successful
    } catch (err) {
      setError('Failed to fetch quote. Please try again later.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div id="quote-box" className="container">
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <p id="text">{quote}</p>
          <p id="author">- {author}</p>
        </>
      )}
      <button id="new-quote" className="btn btn-primary" onClick={fetchQuote}>New Quote</button>
      <a
        id="tweet-quote"
        className="btn btn-secondary"
        href={`https://twitter.com/intent/tweet?text=${quote} - ${author}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Tweet Quote
      </a>
    </div>
  );
};

export default QuoteBox;
