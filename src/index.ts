import {
  Funcao, MatrizFuncoes, Valor,
} from './interface';
import { Matriz } from './sistemaEquacoes/determinante';
import { resolverSistemaLinear } from './sistemaEquacoes';

const calcularProdutoEscalarFuncoes = (
  funcao1: Funcao, funcao2: Funcao, x: number,
) => funcao1(x) * funcao2(x);

const calcularY = (x: number, valoresConhecidos: Array<Valor>): number => {
  const valor = valoresConhecidos.find((valorConhecido) => valorConhecido.x === x);
  if (valor === undefined) {
    throw new Error(`Valor de Y não encontrado para x = ${x}`);
  }
  return valor.y;
};

const criarFileira = (
  funcoes: Array<Funcao>, numeroFileira: number, valoresConhecidos: Array<Valor>,
): Array<Funcao> => {
  const tamanhoMatriz = funcoes.length;
  const fileira: Array<Funcao> = [];
  for (let index = 0; index < tamanhoMatriz; index += 1) {
    fileira.push((x) => calcularProdutoEscalarFuncoes(funcoes[numeroFileira], funcoes[index], x));
  }
  fileira.push((x) => calcularProdutoEscalarFuncoes(
    () => calcularY(x, valoresConhecidos), funcoes[numeroFileira], x,
  ));
  return fileira;
};

const criarSistemaNorma = (
  funcoes: Array<Funcao>, valoresConhecidos: Array<Valor>,
): MatrizFuncoes => {
  const tamanhoMatriz = funcoes.length;
  const matrizFinal: MatrizFuncoes = [];
  for (let index = 0; index < tamanhoMatriz; index += 1) {
    matrizFinal.push(criarFileira(funcoes, index, valoresConhecidos));
  }
  return matrizFinal;
};

const printarSomatoria = (index: number) => {
  let somatoria = '';
  if (index === 0) {
    somatoria = 'Calculando somatoria de g0|g0 = (a * e^(xi²))², 0 <= i <= 2';
  }
  if (index === 1) {
    somatoria = 'Calulando somatoria de g0|g1 = (a * e^(xi²) * (x³), 0 <= i <= 2';
  }
  if (index === 2) {
    somatoria = 'Calculando somatoria de f(x)|g0 = f(x) * (a * e^(xi²)), 0 <= i <= 2';
  }
  if (index === 3) {
    somatoria = 'Calculando somatoria de g1|g1 = (x³)², 0 <= i <= 2';
  }
  if (index === 4) {
    somatoria = 'Calculando somatoria de g1|g0 = (a * e^(xi²) * (x³), 0 <= i <= 2';
  }
  if (index === 5) {
    somatoria = 'Calculando somatoria de f(x)|g1 = f(x) * (x³), 0 <= i <= 2';
  }
  console.log(somatoria);
};

const calcularSistemaEquacoes = (
  sistemaNorma: MatrizFuncoes, valoresConhecidos: Array<Valor>,
) => sistemaNorma.map((fileira) => fileira.map((equacao, index) => {
  let resultado = 0;
  printarSomatoria(index);
  valoresConhecidos.forEach((valor) => {
    resultado += equacao(valor.x);
  });
  console.log(`somatoria = ${resultado} \n`);
  return resultado;
}));

const criarMatrizResultados = (sistemaEquacoes: Array<Array<number>>): Array<number> => {
  const matrizResultados: Array<number> = [];
  sistemaEquacoes.forEach((fileira) => matrizResultados.push(fileira[fileira.length - 1]));
  return matrizResultados;
};

const criarMatrizCoeficientes = (sistemaEquacoes: Matriz): Matriz => {
  const indexResultado = sistemaEquacoes[0].length - 1;
  return sistemaEquacoes.map(
    (fileira) => fileira.filter((_, index) => index !== indexResultado),
  );
};

const resolverSistemaEquacoes = (sistemaEquacoes: Array<Array<number>>) => {
  const matrizResultados = criarMatrizResultados(sistemaEquacoes);
  const matrizCoeficientes = criarMatrizCoeficientes(sistemaEquacoes);
  return resolverSistemaLinear(matrizCoeficientes, matrizResultados);
};

const printarSistemaEquacoes = (sistemaEquacoes : Array<Array<number>>) => {
  console.log('O sistema de equações ficou:');
  sistemaEquacoes.forEach((fileira) => {
    let texto = '';
    fileira.forEach((resultado, index) => {
      if (index === 0) {
        texto = `a0 * ${resultado}`;
      } else if (index === fileira.length - 1) {
        texto = `${texto} = ${resultado}`;
      } else {
        texto = `${texto} + a${index} * ${resultado}`;
      }
    });
    console.log(texto);
  });
};

export const calcularMinimoQuadrado = (funcoes: Array<Funcao>, valoresConhecidos: Array<Valor>) => {
  const sistemaNorma = criarSistemaNorma(funcoes, valoresConhecidos);
  const sistemaEquacoes = calcularSistemaEquacoes(sistemaNorma, valoresConhecidos);
  printarSistemaEquacoes(sistemaEquacoes);
  const resolucaoSistema = resolverSistemaEquacoes(sistemaEquacoes);
  return resolucaoSistema;
};

export default {};
