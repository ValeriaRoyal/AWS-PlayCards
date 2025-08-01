import React, { useState, useEffect } from 'react';
import './Card.css';

const Card = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
    setIsLoaded(false);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [card.id]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleFlip();
    }
  };

  return (
    <div 
      className={`card ${isFlipped ? 'flipped' : ''} ${isLoaded ? 'loaded' : ''}`} 
      onClick={handleFlip}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`Card sobre ${card.service}. ${isFlipped ? 'Mostrando resposta' : 'Mostrando pergunta'}. Pressione Enter para virar.`}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="card-header">
            <span className="category">{card.category}</span>
            <h3 className="service-name">{card.service}</h3>
          </div>
          <div className="card-content">
            <h4 className="question">{card.question}</h4>
            <div className="flip-hint">
              <span>💡 Clique para ver a resposta</span>
              <div className="hint-animation">↻</div>
            </div>
          </div>
        </div>
        
        <div className="card-back">
          <div className="card-header">
            <span className="category">{card.category}</span>
            <h3 className="service-name">{card.service}</h3>
          </div>
          <div className="card-content">
            <p className="answer">{card.answer}</p>
            {card.keyPoints && (
              <div className="key-points">
                <h5>✨ Pontos-chave:</h5>
                <ul>
                  {card.keyPoints.map((point, index) => (
                    <li key={index} style={{animationDelay: `${index * 0.1}s`}}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flip-hint">
              <span>🔄 Clique para voltar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
