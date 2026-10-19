import { useState } from 'react'

export const titulo = '03 · Lista de tarefas'
export const descricao = 'Formulário controlado e renderização de listas com key.'

export default function Exercicio() {
  const [texto, setTexto] = useState('')
  const [tarefas, setTarefas] = useState([])

  function adicionar(e) {
    e.preventDefault()
    if (!texto.trim()) return
    setTarefas([...tarefas, { id: Date.now(), texto, feita: false }])
    setTexto('')
  }

  function alternar(id) {
    setTarefas(tarefas.map((t) => (t.id === id ? { ...t, feita: !t.feita } : t)))
  }

  return (
    <div>
      <form onSubmit={adicionar} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Nova tarefa"
          style={{ flex: 1, padding: 6 }}
        />
        <button>Adicionar</button>
      </form>

      <ul>
        {tarefas.map((t) => (
          <li
            key={t.id}
            onClick={() => alternar(t.id)}
            style={{ cursor: 'pointer', textDecoration: t.feita ? 'line-through' : 'none' }}
          >
            {t.texto}
          </li>
        ))}
      </ul>
      {tarefas.length === 0 && <p style={{ color: '#888' }}>Nenhuma tarefa ainda.</p>}
    </div>
  )
}
