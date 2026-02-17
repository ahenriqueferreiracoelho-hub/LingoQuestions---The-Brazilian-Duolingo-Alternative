// Comentário: Ponto de entrada para iniciar o servidor HTTP.
const { createApp } = require('./app');
const { port } = require('./config');

const app = createApp();
app.listen(port, () => {
  // Comentário: Log simples para confirmar subida do serviço.
  console.log(`LingoQuestions backend rodando na porta ${port}`);
});
