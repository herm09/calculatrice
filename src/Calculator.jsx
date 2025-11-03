import { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    // Logique de calcul à implémenter plus tard
    setResult('Résultat ici');
  };

  return (
    <div className="calculator">
      <h2>Calculatrice</h2>
      <div className="calculator-form">
        <div className="input-group">
          <label htmlFor="num1">Premier nombre</label>
          <input
            id="num1"
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Entrez un nombre"
          />
        </div>

        <div className="input-group">
          <label htmlFor="operation">Opération</label>
          <select
            id="operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="+">Addition (+)</option>
            <option value="-">Soustraction (−)</option>
            <option value="×">Multiplication (×)</option>
            <option value="÷">Division (÷)</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="num2">Deuxième nombre</label>
          <input
            id="num2"
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Entrez un nombre"
          />
        </div>

        <button onClick={handleCalculate} className="calculate-button">
          Calculer
        </button>

        <div className="result-group">
          <label htmlFor="result">Résultat</label>
          <input
            id="result"
            type="text"
            value={result}
            readOnly
            placeholder="Le résultat apparaîtra ici"
            className="result-input"
          />
        </div>
      </div>
    </div>
  );
}

export default Calculator;

