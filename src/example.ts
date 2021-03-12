import { calcularMinimoQuadrado } from './index';
import { Funcao, Valor } from './interface';

const valoresConhecidos: Array<Valor> = [
  {
    x: 0.25,
    y: 0.20,
  },
  {
    x: 0.65,
    y: -0.25,
  },
  {
    x: 0.95,
    y: -1.10,
  },
  {
    x: 1.25,
    y: -0.45,
  },
  {
    x: 1.75,
    y: 0.25,
  },
  {
    x: 2,
    y: 0.10,
  },
  {
    x: 2.25,
    y: -0.30,
  },
  {
    x: 2.55,
    y: 0.25,
  },
  {
    x: 2.75,
    y: 0.55,
  },
  {
    x: 3.05,
    y: 1.05,
  },
];

const funcoes: Array<Funcao> = [
  (x) => Math.log(x),
  (x) => Math.cos(x),
  (x) => Math.exp(x),
];

const minimoQuadrado = calcularMinimoQuadrado(funcoes, valoresConhecidos);
console.log(minimoQuadrado);
