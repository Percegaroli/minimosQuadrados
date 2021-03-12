/* eslint-disable import/extensions */
import { Funcao, Valor } from './interface';

export const valoresConhecidos: Array<Valor> = [
  {
    x: 0,
    y: 1,
  },
  {
    x: 1.5,
    y: 1.57,
  },
  {
    x: 3,
    y: 2,
  },
  {
    x: 4.5,
    y: 4.3,
  },
  {
    x: 6,
    y: 7,
  },
];

export const funcoes: Array<Funcao> = [
  (x) => x,
  (x) => Math.cos(x),
];

export default {};
