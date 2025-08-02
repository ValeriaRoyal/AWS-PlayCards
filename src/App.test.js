import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('AWS Quest App - Clean Interface', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders clean app header', () => {
    render(<App />);
    const headerElement = screen.getByText(/AWS Quest/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders status counter', () => {
    render(<App />);
    const statusElement = screen.getByText(/1 \/ 6/);
    expect(statusElement).toBeInTheDocument();
  });

  test('renders category filter', () => {
    render(<App />);
    const categorySelect = screen.getByDisplayValue(/Todas/);
    expect(categorySelect).toBeInTheDocument();
  });

  test('renders reset button', () => {
    render(<App />);
    const resetButton = screen.getByText(/Reset/);
    expect(resetButton).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(<App />);
    const navButtons = screen.getAllByRole('button');
    const prevButton = navButtons.find(button => button.textContent === '←');
    const nextButton = navButtons.find(button => button.textContent === '→');
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  test('renders keyboard shortcuts', () => {
    render(<App />);
    const spaceKey = screen.getByText('Space');
    expect(spaceKey).toBeInTheDocument();
  });

  test('renders progress bar', () => {
    render(<App />);
    const progressText = screen.getByText(/0\/6 estudados/);
    expect(progressText).toBeInTheDocument();
  });

  test('category filter works', () => {
    render(<App />);
    const categorySelect = screen.getByDisplayValue(/Todas/);
    
    fireEvent.change(categorySelect, { target: { value: 'Compute' } });
    
    const statusElement = screen.getByText(/1 \/ 1/);
    expect(statusElement).toBeInTheDocument();
  });

  test('empty state shows when no cards found', () => {
    render(<App />);
    const categorySelect = screen.getByDisplayValue(/Todas/);
    
    fireEvent.change(categorySelect, { target: { value: 'NonExistent' } });
    
    const emptyState = screen.getByText(/Nenhum card encontrado/);
    expect(emptyState).toBeInTheDocument();
  });

  test('app renders without errors', () => {
    render(<App />);
    const appElement = screen.getByText(/AWS Quest/i);
    expect(appElement).toBeInTheDocument();
  });
});
