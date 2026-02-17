// Comentário: Dados mockados usados no modo em memória para acelerar desenvolvimento e testes.
module.exports = {
  users: [],
  questions: [
    {
      id: 1,
      lessonId: 1,
      prompt: 'Qual é a tradução correta de "I am hungry"?',
      options: ['Eu estou com fome', 'Eu estou feliz', 'Eu estou cansado', 'Eu estou atrasado'],
      correctOption: 0,
      difficulty: 2
    },
    {
      id: 2,
      lessonId: 1,
      prompt: 'Complete: She ___ to school every day.',
      options: ['go', 'goes', 'going', 'gone'],
      correctOption: 1,
      difficulty: 3
    },
    {
      id: 3,
      lessonId: 2,
      prompt: 'Qual frase está no passado simples?',
      options: ['I play soccer', 'I was playing soccer', 'I played soccer', 'I have played soccer'],
      correctOption: 2,
      difficulty: 3
    }
  ],
  attempts: []
};
