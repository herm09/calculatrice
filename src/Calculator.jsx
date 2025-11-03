import { useState } from 'react';
import { add, sub, mul, div } from './lib/calc';
import './Calculator.css';

function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleCalculate = () => {
    // Réinitialiser l'erreur
    setError('');

    // Vérifier que les champs sont remplis
    if (num1 === '' || num2 === '') {
      setError('Veuillez remplir les deux champs');
      setResult('');
      return;
    }

    // Convertir les strings en nombres
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    // Vérifier que les conversions sont valides
    if (isNaN(a) || isNaN(b)) {
      setError('Veuillez entrer des nombres valides');
      setResult('');
      return;
    }

    try {
      let calculatedResult;
      switch (operation) {
        case '+':
          calculatedResult = add(a, b);
          break;
        case '-':
          calculatedResult = sub(a, b);
          break;
        case '×':
          calculatedResult = mul(a, b);
          break;
        case '÷':
          calculatedResult = div(a, b);
          break;
        default:
          setError('Opération non reconnue');
          setResult('');
          return;
      }

      // Afficher le résultat (arrondir si nécessaire pour éviter les erreurs de précision)
      setResult(calculatedResult.toString());
    } catch (err) {
      // Gérer les erreurs (comme division par zéro)
      setError(err.message);
      setResult('');
    }
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
            value={result || error || ''}
            readOnly
            placeholder="Le résultat apparaîtra ici"
            className={`result-input ${error ? 'error' : ''}`}
          />
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Calculator;

