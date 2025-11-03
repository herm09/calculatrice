/**
 * Fonctions pures pour les opérations mathématiques
 */

/**
 * Addition de deux nombres
 * @param {number} a - Premier nombre
 * @param {number} b - Deuxième nombre
 * @returns {number} Résultat de l'addition
 */
export function add(a, b) {
  return a + b;
}

/**
 * Soustraction de deux nombres
 * @param {number} a - Premier nombre
 * @param {number} b - Deuxième nombre
 * @returns {number} Résultat de la soustraction
 */
export function sub(a, b) {
  return a - b;
}

/**
 * Multiplication de deux nombres
 * @param {number} a - Premier nombre
 * @param {number} b - Deuxième nombre
 * @returns {number} Résultat de la multiplication
 */
export function mul(a, b) {
  return a * b;
}

/**
 * Division de deux nombres
 * @param {number} a - Premier nombre (dividende)
 * @param {number} b - Deuxième nombre (diviseur)
 * @returns {number|string} Résultat de la division ou message d'erreur si division par zéro
 * @throws {Error} Si division par zéro
 */
export function div(a, b) {
  if (b === 0) {
    throw new Error('Division par zéro impossible');
  }
  return a / b;
}

