# Exercícios de React

Projeto Vite + React para rodar os exercícios da aula. Cada exercício é um arquivo em `src/exercicios/` e aparece sozinho no menu lateral.

## Como rodar

Precisa de Node 20 ou mais novo.

```bash
npm install
npm run dev
```

O navegador abre em `http://localhost:5173`.

## Adicionando um exercício

1. Crie um arquivo em `src/exercicios/`, por exemplo `04-props.jsx` (o número define a ordem no menu).
2. Faça `export default` de um componente.
3. Opcional: exporte `titulo` e `descricao`.

```jsx
export const titulo = '04 · Props'
export const descricao = 'Passando dados de pai para filho.'

export default function Exercicio() {
  return <p>Olá!</p>
}
```

Salvou, apareceu — o Vite recarrega sozinho. Há um modelo em `src/exercicios/_modelo.jsx.txt`.

## Recursos

- **Link direto**: cada exercício tem sua URL (`#02-contador`), útil para mandar para a turma.
- **Reiniciar**: o botão ↻ zera o estado do exercício.
- **Erros isolados**: se um exercício quebrar, o erro aparece na tela e os outros continuam funcionando.
