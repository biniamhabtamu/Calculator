import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState('');

  const colors = {
    primary: '#6c5ce7',
    secondary: '#a29bfe',
    accent: '#fd79a8',
    dark: '#2d3436',
    light: '#dfe6e9',
    numbers: '#636e72',
    operators: '#0984e3'
  };

  const handleNumberInput = (number) => {
    if (waitingForOperand) {
      setInput(String(number));
      setWaitingForOperand(false);
    } else {
      setInput(input === '0' ? String(number) : input + number);
    }
  };

  const handleDecimalInput = () => {
    if (waitingForOperand) {
      setInput('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!input.includes('.')) {
      setInput(input + '.');
    }
  };

  const handleOperatorInput = (nextOperator) => {
    const inputValue = parseFloat(input);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setHistory(input + ' ' + nextOperator + ' ');
    } else if (operator) {
      const currentValue = previousValue || 0;
      let newValue;
      
      switch (operator) {
        case '+': newValue = currentValue + inputValue; break;
        case '-': newValue = currentValue - inputValue; break;
        case '*': newValue = currentValue * inputValue; break;
        case '/': newValue = currentValue / inputValue; break;
        default: newValue = inputValue;
      }

      setPreviousValue(newValue);
      setInput(String(newValue));
      setHistory(newValue + ' ' + nextOperator + ' ');
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (!operator || previousValue === null) return;

    const inputValue = parseFloat(input);
    let newValue;
    
    switch (operator) {
      case '+': newValue = previousValue + inputValue; break;
      case '-': newValue = previousValue - inputValue; break;
      case '*': newValue = previousValue * inputValue; break;
      case '/': newValue = previousValue / inputValue; break;
      default: newValue = inputValue;
    }

    setInput(String(newValue));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
    setHistory(history + input + ' = ' + newValue);
  };

  const handleClear = () => {
    setInput('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setHistory('');
  };

  const handlePercentage = () => {
    const value = parseFloat(input) / 100;
    setInput(String(value));
  };

  const handleToggleSign = () => {
    const value = parseFloat(input) * -1;
    setInput(String(value));
  };

  const handleBackspace = () => {
    if (input.length === 1 || (input.length === 2 && input.startsWith('-'))) {
      setInput('0');
    } else {
      setInput(input.slice(0, -1));
    }
  };

  // Animation effect for buttons
  useEffect(() => {
    const buttons = document.querySelectorAll('.calculator-button');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
          button.style.transform = 'scale(1)';
        }, 100);
      });
    });

    return () => {
      buttons.forEach(button => {
        button.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="calculator-display">
          <div className="calculator-history">{history}</div>
          <div className="calculator-input">{input}</div>
        </div>
        <div className="calculator-buttons">
          <button 
            className="calculator-button function" 
            onClick={handleClear}
            style={{ backgroundColor: colors.accent }}
          >
            AC
          </button>
          <button 
            className="calculator-button function" 
            onClick={handleToggleSign}
            style={{ backgroundColor: colors.accent }}
          >
            +/-
          </button>
          <button 
            className="calculator-button function" 
            onClick={handlePercentage}
            style={{ backgroundColor: colors.accent }}
          >
            %
          </button>
          <button 
            className="calculator-button operator" 
            onClick={() => handleOperatorInput('/')}
            style={{ backgroundColor: colors.operators }}
          >
            ÷
          </button>

          <button 
            className="calculator-button number" 
            onClick={() => handleNumberInput(7)}
            style={{ backgroundColor: colors.numbers }}
          >
            7
          </button>
          <button 
            className="calculator-button number" 
            onClick={() => handleNumberInput(8)}
            style={{ backgroundColor: colors.numbers }}
          >
            8
          </button>
          <button 
            className="calculator-button number" 
            onClick={() => handleNumberInput(9)}
            style={{ backgroundColor: colors.numbers }}
          >
            9
          </button>
          <button 
            className="calculator-button operator" 
            onClick={() => handleOperatorInput('*')}
            style={{ backgroundColor: colors.operators }}
          >
            ×
          </button>

          <button 
            className="calculator-button number" 
            onClick={() => handleNumberInput(4)}
            style={{ backgroundColor: colors.numbers }}
          >
            4
          </button>
          <button 
            className="calculator-button number" 
            onClick={() => handleNumberInput(5)}
            style={{ backgroundColor: colors.numbers }}
          >
            5
          </button>
          <button 
            className="calculator-button number" 
            onClick={() => handleNumberInput(6)}
            style={{ backgroundColor: colors.numbers }}
          >
            6
          </button>
          <button 
            className="calculator-button operator" 
            onClick={() => handleOperatorInput('-')}
            style={{ backgroundColor: colors.operators }}
          >
            -
          </button>

          <button 
            className="calculator-button number" 
            onClick={() => handleNumberInput(1)}
            style={{ backgroundColor: colors.numbers }}
          >
            1
          </button>
          <button 
            className="calculator-button number" 
            onClick={() => handleNumberInput(2)}
            style={{ backgroundColor: colors.numbers }}
          >
            2
          </button>
          <button 
            className="calculator-button number" 
            onClick={() => handleNumberInput(3)}
            style={{ backgroundColor: colors.numbers }}
          >
            3
          </button>
          <button 
            className="calculator-button operator" 
            onClick={() => handleOperatorInput('+')}
            style={{ backgroundColor: colors.operators }}
          >
            +
          </button>

          <button 
            className="calculator-button number zero" 
            onClick={() => handleNumberInput(0)}
            style={{ backgroundColor: colors.numbers }}
          >
            0
          </button>
          <button 
            className="calculator-button number" 
            onClick={handleDecimalInput}
            style={{ backgroundColor: colors.numbers }}
          >
            .
          </button>
          <button 
            className="calculator-button operator equals" 
            onClick={handleEquals}
            style={{ backgroundColor: colors.primary }}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;