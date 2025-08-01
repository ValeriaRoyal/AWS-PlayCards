import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import { awsCards } from './data/awsCards';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [studiedCards, setStudiedCards] = useState(new Set());
  const [sessionStats, setSessionStats] = useState({
    cardsStudied: 0,
    startTime: Date.now()
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('aws-quest-progress');
    if (savedProgress) {
      try {
        const { category, cardIndex, studied } = JSON.parse(savedProgress);
        setSelectedCategory(category || 'all');
        setCurrentCardIndex(cardIndex || 0);
        setStudiedCards(new Set(studied || []));
      } catch (error) {
        console.log('Error loading progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever state changes
  useEffect(() => {
    const progressData = {
      category: selectedCategory,
      cardIndex: currentCardIndex,
      studied: Array.from(studiedCards)
    };
    localStorage.setItem('aws-quest-progress', JSON.stringify(progressData));
  }, [selectedCategory, currentCardIndex, studiedCards]);

  // Obter categorias únicas
  const categories = ['all', ...new Set(awsCards.map(card => card.category))];

  // Filtrar cards por categoria
  const filteredCards = selectedCategory === 'all' 
    ? awsCards 
    : awsCards.filter(card => card.category === selectedCategory);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentCardIndex(0);
  };

  const markCardAsStudied = (cardId) => {
    if (!studiedCards.has(cardId)) {
      setStudiedCards(prev => new Set([...prev, cardId]));
      setSessionStats(prev => ({
        ...prev,
        cardsStudied: prev.cardsStudied + 1
      }));
    }
  };

  const nextCard = () => {
    if (filteredCards.length <= 1) return;
    markCardAsStudied(filteredCards[currentCardIndex].id);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCardIndex((prev) => 
        prev < filteredCards.length - 1 ? prev + 1 : 0
      );
      setIsTransitioning(false);
    }, 150);
  };

  const prevCard = () => {
    if (filteredCards.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentCardIndex((prev) => 
        prev > 0 ? prev - 1 : filteredCards.length - 1
      );
      setIsTransitioning(false);
    }, 150);
  };

  const resetProgress = () => {
    if (window.confirm('Tem certeza que deseja resetar todo o progresso?')) {
      setStudiedCards(new Set());
      setCurrentCardIndex(0);
      setSessionStats({
        cardsStudied: 0,
        startTime: Date.now()
      });
      localStorage.removeItem('aws-quest-progress');
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch(event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevCard();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextCard();
          break;
        case ' ':
          event.preventDefault();
          nextCard();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [filteredCards.length]);

  return (
    <div className="App">
      <header className="app-header">
        <h1>🚀 AWS Quest - Cards de Estudo</h1>
        <p>Prepare-se para a certificação AWS Cloud Practitioner</p>
      </header>

      <div className="controls">
        <div className="category-filter">
          <label>Filtrar por categoria:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Todas as categorias' : category}
              </option>
            ))}
          </select>
        </div>

        <div className="stats-section">
          <div className="card-counter">
            Card {currentCardIndex + 1} de {filteredCards.length}
          </div>
          <div className="progress-stats">
            📚 Estudados: {studiedCards.size}/{awsCards.length}
            {sessionStats.cardsStudied > 0 && (
              <span className="session-stats">
                | 🎯 Sessão: {sessionStats.cardsStudied}
              </span>
            )}
          </div>
        </div>

        <button 
          className="reset-button" 
          onClick={resetProgress}
          title="Resetar progresso"
        >
          🔄 Reset
        </button>
      </div>

      <div className={`card-container ${isTransitioning ? 'transitioning' : ''}`}>
        {filteredCards.length > 0 && (
          <Card card={filteredCards[currentCardIndex]} />
        )}
      </div>

      <div className="navigation">
        <button onClick={prevCard} disabled={filteredCards.length <= 1}>
          ← Anterior
        </button>
        <div className="keyboard-hint">
          Use ← → ou espaço para navegar
        </div>
        <button onClick={nextCard} disabled={filteredCards.length <= 1}>
          Próximo →
        </button>
      </div>

      <div className="progress-container">
        <div className="progress-label">
          Progresso da Categoria: {Math.round(((currentCardIndex + 1) / filteredCards.length) * 100)}%
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${((currentCardIndex + 1) / filteredCards.length) * 100}%` 
            }}
          ></div>
        </div>
        
        <div className="progress-label">
          Progresso Total: {Math.round((studiedCards.size / awsCards.length) * 100)}%
        </div>
        <div className="progress-bar total-progress">
          <div 
            className="progress-fill total-fill" 
            style={{ 
              width: `${(studiedCards.size / awsCards.length) * 100}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
