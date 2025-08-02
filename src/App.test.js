import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('AWS Quest App - Nielsen Heuristics Interface', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders app header', () => {
    render(<App />);
    const headerElement = screen.getByText(/AWS Quest - Cards de Estudo/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders category filter with Nielsen H2 principles', () => {
    render(<App />);
    const filterLabel = screen.getByText(/📂 Escolha a categoria:/i);
    expect(filterLabel).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(<App />);
    const prevButton = screen.getByText(/← Anterior/);
    const nextButton = screen.getByText(/Próximo →/);
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  test('renders system status (Nielsen H1)', () => {
    render(<App />);
    const cardPosition = screen.getByText(/Card 1 de/);
    expect(cardPosition).toBeInTheDocument();
  });

  test('renders progress statistics', () => {
    render(<App />);
    const progressStats = screen.getByText(/📚 Estudados:/);
    expect(progressStats).toBeInTheDocument();
  });

  test('renders reset button with Nielsen H3 principles', () => {
    render(<App />);
    const resetButton = screen.getByText(/🔄 Recomeçar/);
    expect(resetButton).toBeInTheDocument();
  });

  test('category filter changes work', () => {
    render(<App />);
    const categorySelect = screen.getByDisplayValue(/📚 Todas as categorias/);
    
    fireEvent.change(categorySelect, { target: { value: 'Compute' } });
    
    // Check that the category status in header shows the selected category
    const categoryStatus = screen.getByText(/Card 1 de 1/);
    expect(categoryStatus).toBeInTheDocument();
  });

  test('keyboard shortcuts are displayed (Nielsen H6)', () => {
    render(<App />);
    const keyboardHint = screen.getByText(/⌨️ Atalhos:/);
    expect(keyboardHint).toBeInTheDocument();
  });

  test('progress bars are rendered (Nielsen H7)', () => {
    render(<App />);
    const categoryProgress = screen.getByText(/Categoria Atual/);
    const totalProgress = screen.getByText(/Progresso Total/);
    expect(categoryProgress).toBeInTheDocument();
    expect(totalProgress).toBeInTheDocument();
  });

  test('help section is available (Nielsen H10)', () => {
    render(<App />);
    const helpToggle = screen.getByText(/❓ Como usar/);
    expect(helpToggle).toBeInTheDocument();
  });

  test('accessibility attributes are present', () => {
    render(<App />);
    const categorySelect = screen.getByRole('combobox');
    const progressBars = screen.getAllByRole('progressbar');
    
    expect(categorySelect).toHaveAttribute('aria-describedby');
    expect(progressBars.length).toBeGreaterThan(0);
  });

  test('error prevention - empty state handling', () => {
    render(<App />);
    
    // Change to a category that might not exist
    const categorySelect = screen.getByDisplayValue(/📚 Todas as categorias/);
    fireEvent.change(categorySelect, { target: { value: 'NonExistent' } });
    
    // Should still render without crashing
    const headerElement = screen.getByText(/AWS Quest - Cards de Estudo/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('app renders without errors', () => {
    render(<App />);
    const appElement = screen.getByText(/AWS Quest - Cards de Estudo/i);
    expect(appElement).toBeInTheDocument();
  });
});
