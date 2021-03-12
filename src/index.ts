import {
  Funcao, MatrizFuncoes, Valor,
} from './interface';

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

const calcularSistemaEquacoes = (
  sistemaNorma: MatrizFuncoes, valoresConhecidos: Array<Valor>,
) => sistemaNorma.map((fileira) => fileira.map((equacao) => {
  let resultado = 0;
  valoresConhecidos.forEach((valor) => {
    resultado += equacao(valor.x);
  });
  return resultado;
}));

export const calcularMinimoQuadrado = (funcoes: Array<Funcao>, valoresConhecidos: Array<Valor>) => {
  const sistemaNorma = criarSistemaNorma(funcoes, valoresConhecidos);
  const sistemaEquacoes = calcularSistemaEquacoes(sistemaNorma, valoresConhecidos);
  return sistemaEquacoes;
};

export default {};
