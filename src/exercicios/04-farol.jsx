import { useEffect, useState } from 'react'

export const titulo = '04 · Semáforo interativo'
export const descricao = 'Semáforo interativo e com alteração por tempo.'

// Etapa 1 - dados das luzes do semáforo
const luzes = [
  { nome: 'vermelho', cor: '#e53935' },
  { nome: 'amarelo', cor: '#fdd835' },
  { nome: 'verde', cor: '#43a047' },
]

// Etapa 2 - componente de cada luz, recebendo os dados por props
function Luz({ nome, cor, acesa }) {
  return (
    <div
      aria-label={`Luz ${nome}, ${acesa ? 'acesa' : 'apagada'}`}
      style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        backgroundColor: cor,
        opacity: acesa ? 1 : 0.25,
      }}
    />
  )
}

// Etapa 3 - componente que monta o semáforo usando as luzes
function Semaforo({ corAtiva }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: 16,
        backgroundColor: '#252525',
        borderRadius: 16,
      }}
    >
      {luzes.map((luz) => (
        <Luz
          key={luz.nome}
          nome={luz.nome}
          cor={luz.cor}
          acesa={corAtiva === luz.nome}
        />
      ))}
    </div>
  )
}

// Etapa 4 - define a próxima cor na sequência automática
function proximaCor(corAtual) {
  if (corAtual === 'vermelho') return 'verde'
  if (corAtual === 'verde') return 'amarelo'

  return 'vermelho'
}

// Etapa 5 - estado, temporizador e controles do semáforo
export default function Exercicio() {
  // useState: cria o estado corAtiva, iniciando com a luz vermelha.
  // setCorAtiva é usado para trocar a cor ativa nos botões e no temporizador.
  const [corAtiva, setCorAtiva] = useState('vermelho')

  // useEffect: configura um efeito que executa quando o componente é montado.
  // Aqui, inicia a troca automática das cores a cada 3 segundos.
  useEffect(() => {
    const intervalo = setInterval(() => {
      setCorAtiva((corAtual) => proximaCor(corAtual))
    }, 3000)

    // Limpa o temporizador quando o componente deixa de ser exibido.
    return () => clearInterval(intervalo)
  }, [])

  // Etapa 6 - renderização do semáforo e dos botões
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <Semaforo corAtiva={corAtiva} />

      <div
        style={{
          display: 'flex',
          gap: 8,
        }}
      >
        {/* Cada botão altera a cor ativa ao ser clicado */}
        <button onClick={() => setCorAtiva('vermelho')}>
          Vermelho
        </button>

        <button onClick={() => setCorAtiva('amarelo')}>
          Amarelo
        </button>

        <button onClick={() => setCorAtiva('verde')}>
          Verde
        </button>
      </div>
    </div>
  )
}
