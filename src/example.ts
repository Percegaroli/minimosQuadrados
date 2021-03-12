import { valoresConhecidos, funcoes } from './valores';
import { calcularMinimoQuadrado } from './index';

const minimoQuadrado = calcularMinimoQuadrado(funcoes, valoresConhecidos);
console.log(minimoQuadrado);
