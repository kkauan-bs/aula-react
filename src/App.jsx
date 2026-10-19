import { Component, useEffect, useState } from 'react'

// Carrega automaticamente todo arquivo .jsx dentro de src/exercicios/
// Basta criar um arquivo novo lá que ele aparece no menu.
const modulos = import.meta.glob('./exercicios/*.jsx', { eager: true })

const exercicios = Object.entries(modulos)
  .map(([caminho, mod]) => {
    const arquivo = caminho.split('/').pop().replace('.jsx', '')
    return {
      id: arquivo,
      titulo: mod.titulo ?? arquivo,
      descricao: mod.descricao ?? '',
      Componente: mod.default,
    }
  })
  .sort((a, b) => a.id.localeCompare(b.id, 'pt-BR', { numeric: true }))

// Mostra o erro na tela em vez de quebrar a aplicação inteira
class LimiteDeErro extends Component {
  state = { erro: null }
  static getDerivedStateFromError(erro) {
    return { erro }
  }
  render() {
    if (this.state.erro) {
      return (
        <div className="erro">
          <strong>O exercício lançou um erro:</strong>
          <pre>{String(this.state.erro?.message ?? this.state.erro)}</pre>
          <button onClick={() => this.setState({ erro: null })}>Tentar de novo</button>
        </div>
      )
    }
    return this.props.children
  }
}

function idDaUrl() {
  return decodeURIComponent(window.location.hash.slice(1))
}

export default function App() {
  const [atual, setAtual] = useState(() => idDaUrl() || exercicios[0]?.id)
  const [chave, setChave] = useState(0) // usada para reiniciar o exercício

  useEffect(() => {
    const aoMudar = () => setAtual(idDaUrl())
    window.addEventListener('hashchange', aoMudar)
    return () => window.removeEventListener('hashchange', aoMudar)
  }, [])

  const ex = exercicios.find((e) => e.id === atual) ?? exercicios[0]

  return (
    <div className="layout">
      <aside>
        <h1>Exercícios</h1>
        {exercicios.length === 0 && (
          <p className="vazio">Crie um arquivo .jsx em src/exercicios/</p>
        )}
        <nav>
          {exercicios.map((e) => (
            <a key={e.id} href={`#${e.id}`} className={e.id === ex?.id ? 'ativo' : ''}>
              {e.titulo}
            </a>
          ))}
        </nav>
      </aside>

      <main>
        {ex && (
          <>
            <header>
              <div>
                <h2>{ex.titulo}</h2>
                {ex.descricao && <p>{ex.descricao}</p>}
                <code>src/exercicios/{ex.id}.jsx</code>
              </div>
              <button onClick={() => setChave((k) => k + 1)}>↻ Reiniciar</button>
            </header>
            <section className="palco">
              <LimiteDeErro key={`${ex.id}-${chave}`}>
                {ex.Componente ? <ex.Componente /> : <p>Esse arquivo não tem export default.</p>}
              </LimiteDeErro>
            </section>
          </>
        )}
      </main>
    </div>
  )
}
