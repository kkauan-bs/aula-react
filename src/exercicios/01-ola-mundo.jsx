import Saudacao from '../functions/saudacao'

export const titulo = '01 · Olá, mundo'
export const descricao = 'Primeiro componente: JSX e props.'

export default function Exercicio() {
  return (
    <div> 
      <Saudacao nome="turma" />
      <Saudacao nome="professor" />
      <Saudacao nome="nobre" />
    </div>
  )
}
