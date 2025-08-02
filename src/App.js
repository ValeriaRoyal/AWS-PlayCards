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
      {/* Header simples */}
      <header className="app-header">
        <h1>AWS Quest</h1>
        <div className="status">
          {currentCardIndex + 1} / {filteredCards.length}
        </div>
      </header>

      {/* Controles essenciais */}
      <div className="controls">
        <select 
          value={selectedCategory} 
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="category-select"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'Todas' : category}
            </option>
          ))}
        </select>

        <button 
          className="reset-btn" 
          onClick={resetProgress}
          title="Resetar progresso"
        >
          Reset
        </button>
      </div>

      {/* Card principal */}
      <main className="main-content">
        <div className={`card-container ${isTransitioning ? 'transitioning' : ''}`}>
          {filteredCards.length > 0 ? (
            <Card card={filteredCards[currentCardIndex]} />
          ) : (
            <div className="empty-state">
              <p>Nenhum card encontrado</p>
              <button onClick={() => setSelectedCategory('all')}>
                Ver todos
              </button>
            </div>
          )}
        </div>

        {/* Navegação simples */}
        <div className="navigation">
          <button 
            onClick={prevCard} 
            disabled={filteredCards.length <= 1}
            className="nav-btn"
          >
            ←
          </button>
          
          <div className="nav-info">
            <kbd>←</kbd> <kbd>→</kbd> <kbd>Space</kbd>
          </div>
          
          <button 
            onClick={nextCard} 
            disabled={filteredCards.length <= 1}
            className="nav-btn"
          >
            →
          </button>
        </div>
      </main>

      {/* Progresso minimalista */}
      <div className="progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(studiedCards.size / awsCards.length) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          {studiedCards.size}/{awsCards.length} estudados
        </span>
      </div>
    </div>
  );
}

export default App;
