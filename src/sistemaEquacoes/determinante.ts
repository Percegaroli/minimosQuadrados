type Fileira = Array<number>;
export type Matriz = Array<Fileira>;

const calcularDeterminante2x2 = (
  matriz: Matriz,
) => (matriz[0][0] * matriz[1][1]) - (matriz[0][1] * matriz[1][0]);

const verificarSeMatriz2x2 = (matriz: Matriz): boolean => {
  if (matriz.length !== 2) return false;
  return matriz.findIndex((submatriz) => submatriz.length !== 2) === -1;
};

const validarSeMatrizQuadrada = (
  matriz: Matriz,
): boolean => matriz.findIndex((subMatriz) => subMatriz.length !== matriz.length) === -1;

const reduzirMatriz = (matriz: Matriz, j: number) => {
  const matrizSemPrimeiraFileira = matriz.filter((_, index) => index !== 0);
  return matrizSemPrimeiraFileira.map((submatriz) => submatriz.filter((_, index) => index !== j));
};

const calcularDeterminante = (matriz: Matriz) => {
  let determinante = 0;
  for (let j = 0; j < matriz.length; j += 1) {
    const sinal = Math.pow(-1, 1 + (j + 1));
    const valorRemovido = matriz[0][j];
    const matrizReduzida = reduzirMatriz(matriz, j);
    const determinanteMatrizReduzida = verificarSeMatriz2x2(matrizReduzida)
      ? calcularDeterminante2x2(matrizReduzida)
      : calcularDeterminante(matrizReduzida);
    const valorASomar = sinal * valorRemovido * determinanteMatrizReduzida;
    determinante += valorASomar;
  }
  return determinante;
};

export const calcularDeterminanteMatriz = (matriz: Matriz) => {
  if (validarSeMatrizQuadrada(matriz)) {
    return calcularDeterminante(matriz);
  }

  console.log('A matriz não é quadrada');
};
