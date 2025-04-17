import { useState } from 'react';
import './SearchBox.css';

const suggestions = ['Shakespeare', 'Emily Dickinson', 'Robert Frost', 'Maya Angelou', 'Walt Whitman', 'John Milton'];

function SearchBox({ setQuoteData, setShowSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState('');


  const handleSearch = async (term = searchTerm) => {
    console.log('clicked, searchTerm - ', term);
    if (!term.trim()) {
      alert('Please enter an author name.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/poems/${encodeURIComponent(term)}`);
      const data = await response.json();
      console.log('response received: ', data);
      setLoading(true);

      if (data?.length > 0) {
        setLoading(false);
        setQuoteData(data.map(poem => ({ ...poem, author: term })));
        setShowSearch(true);
      } else if (data.title === "Not Found") {
        alert(`No poems found for author: ${term}`);
      }
    } catch (error) {
      console.error("Error fetching poems:", error);
      alert("Failed to fetch poems. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search_box">
      <div className="suggestion_container">
        {suggestions.map((item, idx) => (
          <button
            key={idx}
            className={`suggestion_pill ${selectedAuthor === item ? 'selected' : ''}`}
            // className="suggestion_pill"
            onClick={() => {
              setSelectedAuthor(item);
              setSearchTerm(item);
              handleSearch(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBox;
