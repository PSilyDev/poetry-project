import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import SearchBox from "./components/SearchBox";
import Card from "./components/Card";

function App() {
  const [quoteData, setQuoteData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showHeading, setShowHeading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowHeading(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % quoteData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + quoteData.length) % quoteData.length);
  };

  return (
    <>
      <div className="base" style={{ position: "relative", overflow: "hidden" }}>
        <div className="background-gradient" /> 
        <div className="blur-fade-overlay"></div>
        <div className="content">
          <div className="master">
            <div className={`search_parent ${showHeading ? 'dropdown' : ''}`}>
              <div className="search_heading">
                <h1>Poetry Postcards</h1>
              </div>
            </div>
            <div className="left">
  
            <div className="card-carousel">
              {quoteData.length > 0 && (
                <>
                  <Card
                    quoteData={quoteData[(currentIndex - 1 + quoteData.length) % quoteData.length]}
                    position="left"
                    onClick={() => handlePrev()}
                  />
                  <Card
                    quoteData={quoteData[currentIndex]}
                    position="center"
                  />
                  <Card
                    quoteData={quoteData[(currentIndex + 1) % quoteData.length]}
                    position="right"
                    onClick={() => handleNext()}
                  />
                </>
              )}
            </div>

  
            </div>
          </div>
          <div className="search_left">
            <SearchBox setQuoteData={setQuoteData} setShowSearch={setShowSearch} />
          </div>
        </div>
  
        <div className="made_with_love">
          Made with love
          <FontAwesomeIcon
            icon={faHeart}
            size="sm"
            style={{ color: "#ff0000", marginLeft: "5px", marginRight: "5px" }}
          />
          by <em>Prakhar</em> and <em>Neelabh.</em>
        </div>
      </div>
    </>
  );
  
}

export default App;
