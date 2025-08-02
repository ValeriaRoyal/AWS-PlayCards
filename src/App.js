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
      {/* H1: Visibility of System Status */}
      <header className="app-header">
        <div className="header-content">
          <h1>🚀 AWS Quest - Cards de Estudo</h1>
          <p>Prepare-se para a certificação AWS Cloud Practitioner</p>
          
          {/* Status atual sempre visível */}
          <div className="system-status">
            <span className="current-position" aria-live="polite">
              Card {currentCardIndex + 1} de {filteredCards.length}
            </span>
            <span className="category-status">
              {selectedCategory === 'all' ? 'Todas as categorias' : selectedCategory}
            </span>
          </div>
        </div>
      </header>

      {/* H2: Match between system and real world */}
      <div className="controls-section">
        <div className="primary-controls">
          <div className="filter-control">
            <label htmlFor="category-select" className="control-label">
              📂 Escolha a categoria:
            </label>
            <select 
              id="category-select"
              value={selectedCategory} 
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="category-select"
              aria-describedby="category-help"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? '📚 Todas as categorias' : `🏷️ ${category}`}
                </option>
              ))}
            </select>
            <small id="category-help" className="help-text">
              Filtre os cards por área de conhecimento AWS
            </small>
          </div>

          {/* H3: User control and freedom */}
          <div className="action-controls">
            <button 
              className="reset-button secondary-button" 
              onClick={resetProgress}
              title="Limpar todo o progresso e recomeçar"
              aria-describedby="reset-help"
            >
              🔄 Recomeçar
            </button>
            <small id="reset-help" className="help-text">
              Remove todo o progresso salvo
            </small>
          </div>
        </div>

        {/* H4: Consistency and standards */}
        <div className="progress-overview">
          <div className="progress-stats">
            <div className="stat-item">
              <span className="stat-label">📚 Estudados:</span>
              <span className="stat-value">{studiedCards.size}/{awsCards.length}</span>
            </div>
            {sessionStats.cardsStudied > 0 && (
              <div className="stat-item session-stat">
                <span className="stat-label">🎯 Nesta sessão:</span>
                <span className="stat-value">{sessionStats.cardsStudied}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* H5: Error prevention - Clear content area */}
      <main className="main-content">
        <div className={`card-container ${isTransitioning ? 'transitioning' : ''}`}>
          {filteredCards.length > 0 ? (
            <Card card={filteredCards[currentCardIndex]} />
          ) : (
            <div className="empty-state">
              <h3>🔍 Nenhum card encontrado</h3>
              <p>Tente selecionar uma categoria diferente</p>
            </div>
          )}
        </div>

        {/* H6: Recognition rather than recall */}
        <div className="navigation-section">
          <div className="navigation-controls">
            <button 
              onClick={prevCard} 
              disabled={filteredCards.length <= 1}
              className="nav-button prev-button"
              aria-label="Card anterior"
              title="Voltar ao card anterior (tecla ←)"
            >
              ← Anterior
            </button>
            
            <div className="navigation-info">
              <div className="keyboard-shortcuts">
                <span className="shortcut-hint">⌨️ Atalhos:</span>
                <kbd>←</kbd> <kbd>→</kbd> <kbd>Espaço</kbd>
              </div>
            </div>
            
            <button 
              onClick={nextCard} 
              disabled={filteredCards.length <= 1}
              className="nav-button next-button primary-button"
              aria-label="Próximo card"
              title="Avançar para o próximo card (tecla → ou espaço)"
            >
              Próximo →
            </button>
          </div>
        </div>
      </main>

      {/* H7: Flexibility and efficiency of use */}
      <aside className="progress-sidebar">
        <h3 className="progress-title">📊 Seu Progresso</h3>
        
        <div className="progress-section">
          <div className="progress-item">
            <div className="progress-header">
              <span className="progress-label">Categoria Atual</span>
              <span className="progress-percentage">
                {Math.round(((currentCardIndex + 1) / filteredCards.length) * 100)}%
              </span>
            </div>
            <div className="progress-bar" role="progressbar" 
                 aria-valuenow={currentCardIndex + 1} 
                 aria-valuemax={filteredCards.length}
                 aria-label="Progresso na categoria atual">
              <div 
                className="progress-fill category-progress" 
                style={{ 
                  width: `${((currentCardIndex + 1) / filteredCards.length) * 100}%` 
                }}
              ></div>
            </div>
          </div>
          
          <div className="progress-item">
            <div className="progress-header">
              <span className="progress-label">Progresso Total</span>
              <span className="progress-percentage">
                {Math.round((studiedCards.size / awsCards.length) * 100)}%
              </span>
            </div>
            <div className="progress-bar" role="progressbar" 
                 aria-valuenow={studiedCards.size} 
                 aria-valuemax={awsCards.length}
                 aria-label="Progresso total de todos os cards">
              <div 
                className="progress-fill total-progress" 
                style={{ 
                  width: `${(studiedCards.size / awsCards.length) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* H8: Aesthetic and minimalist design */}
        <div className="quick-stats">
          <div className="quick-stat">
            <span className="stat-number">{awsCards.length}</span>
            <span className="stat-description">Total de Cards</span>
          </div>
          <div className="quick-stat">
            <span className="stat-number">{categories.length - 1}</span>
            <span className="stat-description">Categorias AWS</span>
          </div>
        </div>
      </aside>

      {/* H9: Help users recognize, diagnose, and recover from errors */}
      {filteredCards.length === 0 && (
        <div className="error-message" role="alert">
          <h4>⚠️ Nenhum conteúdo disponível</h4>
          <p>Não há cards para a categoria selecionada.</p>
          <button 
            onClick={() => setSelectedCategory('all')}
            className="recovery-button primary-button"
          >
            Ver todos os cards
          </button>
        </div>
      )}

      {/* H10: Help and documentation */}
      <footer className="app-footer">
        <details className="help-section">
          <summary className="help-toggle">❓ Como usar</summary>
          <div className="help-content">
            <h4>Navegação:</h4>
            <ul>
              <li><kbd>←</kbd> ou botão "Anterior": volta um card</li>
              <li><kbd>→</kbd> ou <kbd>Espaço</kbd>: avança um card</li>
              <li>Clique no card para ver a resposta</li>
            </ul>
            <h4>Filtros:</h4>
            <ul>
              <li>Use o seletor de categoria para focar em áreas específicas</li>
              <li>Seu progresso é salvo automaticamente</li>
            </ul>
          </div>
        </details>
      </footer>
    </div>
  );
}

export default App;
