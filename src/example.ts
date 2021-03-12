import { calcularMinimoQuadrado } from './index';
import { Funcao, Valor } from './interface';

const valoresConhecidos: Array<Valor> = [
  {
    x: -1,
    y: 0,
  },
  {
    x: 0,
    y: 1,
  },
  {
    x: 1,
    y: 2,
  },
];

const funcoes: Array<Funcao> = [
  (x) => Math.exp(x ** 2),
  (x) => x ** 3,
];

console.log('Valores Conhecidos: ');
console.table(valoresConhecidos);
console.log('Equacao: a * e^(x²) + b * x³\n');
const minimoQuadrado = calcularMinimoQuadrado(funcoes, valoresConhecidos);
console.log('\nA solução para esse sistema é:');
minimoQuadrado.forEach((valor, index) => {
  console.log(`a${index} = ${valor}`);
});

// resolvido, só printar e enviar para o prof
