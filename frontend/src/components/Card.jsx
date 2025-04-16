import React, { useEffect, useRef } from "react";
import "./Card.css";

function Card({ quoteData, position = 'center', onClick, onNext, onPrev }) {
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      onNext(); // Swiped left
    } else if (diff < -50) {
      onPrev(); // Swiped right
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onNext, onPrev]);

  return (
    <div
      className={`card ${position}`}
      onClick={onClick}
    >
      <div
        className="poem-card"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* <div className="blurred-bg" /> */}
        <div className="poem-content">
          <h2>{quoteData?.title}</h2>
          <p className="author">~ {quoteData?.author}</p>
          <pre className="lines">{quoteData?.lines?.join("\n")}</pre>
          {/* <div className="nav-buttons">
            <button onClick={onPrev}>⟵</button>
            <button onClick={onNext}>⟶</button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Card;
