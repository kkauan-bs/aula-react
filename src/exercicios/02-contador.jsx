import { useState } from 'react'

export const titulo = '02 · Contador'
export const descricao = 'Estado com useState e eventos de clique.'

export default function Exercicio() {
  const [valor, setValor] = useState(0)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button onClick={() => setValor(valor - 1)}>−</button>
      <strong style={{ fontSize: 24, minWidth: 40, textAlign: 'center' }}>{valor}</strong>
      <button onClick={() => setValor(valor + 1)}>+</button>
    </div>
  )
}
