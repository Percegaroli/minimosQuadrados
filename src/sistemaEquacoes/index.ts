// https://github.com/Percegaroli/sistemaDeEquacoes
import { Matriz, calcularDeterminanteMatriz } from './determinante';

const calcularPossiveisValores = (
  matriz: Matriz, resultadoEquacoes: Array<number>, determinanteMatrizOriginal: number,
) => {
  const valores: Array<number> = [];
  for (let i = 0; i < matriz.length; i += 1) {
    const matrizSubstituida = matriz.map((submatriz, index) => {
      const novaMatriz = [
        ...submatriz,

      ];
      novaMatriz[i] = resultadoEquacoes[index];
      return novaMatriz;
    });
    const valor = calcularDeterminanteMatriz(matrizSubstituida);
    if (valor) valores.push(valor / determinanteMatrizOriginal);
  }
  return valores;
};

export const resolverSistemaLinear = (
  matriz: Matriz, resultadoEquacoes: Array<number>,
) => {
  const determinante = calcularDeterminanteMatriz(matriz);
  if (!determinante) {
    throw new Error('A determinante não pode ser 0');
  }
  const valores = calcularPossiveisValores(matriz, resultadoEquacoes, determinante);
  return valores;
};

export default {};
