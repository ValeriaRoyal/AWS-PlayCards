import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('AWS Quest App', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  test('renders app header', () => {
    render(<App />);
    const headerElement = screen.getByText(/AWS Quest - Cards de Estudo/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders category filter', () => {
    render(<App />);
    const filterLabel = screen.getByText(/Filtrar por categoria:/i);
    expect(filterLabel).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(<App />);
    const prevButton = screen.getByText(/← Anterior/i);
    const nextButton = screen.getByText(/Próximo →/i);
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  test('renders card counter', () => {
    render(<App />);
    const cardCounter = screen.getByText(/Card \d+ de \d+/);
    expect(cardCounter).toBeInTheDocument();
  });

  test('renders progress statistics', () => {
    render(<App />);
    const progressStats = screen.getByText(/📚 Estudados:/);
    expect(progressStats).toBeInTheDocument();
  });

  test('renders reset button', () => {
    render(<App />);
    const resetButton = screen.getByText(/🔄 Reset/);
    expect(resetButton).toBeInTheDocument();
  });

  test('category filter changes work', () => {
    render(<App />);
    const select = screen.getByDisplayValue(/Todas as categorias/i);
    
    fireEvent.change(select, { target: { value: 'Compute' } });
    expect(select.value).toBe('Compute');
  });

  test('keyboard hint is displayed', () => {
    render(<App />);
    const keyboardHint = screen.getByText(/Use ← → ou espaço para navegar/i);
    expect(keyboardHint).toBeInTheDocument();
  });

  test('progress bars are rendered', () => {
    render(<App />);
    const progressBars = document.querySelectorAll('.progress-bar');
    expect(progressBars.length).toBeGreaterThan(0);
  });

  test('app renders without errors', () => {
    render(<App />);
    // If we get here without throwing, the test passes
    expect(true).toBe(true);
  });
});
