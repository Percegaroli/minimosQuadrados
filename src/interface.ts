export interface Valor {
  x: number,
  y: number
}

export type Fileira = Array<number>

export type SistemaEquacoes = Array<Fileira>

// eslint-disable-next-line no-unused-vars
export type Funcao = (x: number) => number

export type MatrizFuncoes = Array<Array<Funcao>>
