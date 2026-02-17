-- Comentário: Dados mockados para testar o fluxo de lições e ranking.
INSERT INTO lessons (id, title, description) VALUES
(1, 'Inglês Básico', 'Frases essenciais para o dia a dia.'),
(2, 'Tempos Verbais', 'Foco em passado e presente.');

INSERT INTO questions (lesson_id, prompt, options, correct_option, difficulty) VALUES
(1, 'Qual é a tradução correta de "I am hungry"?', '["Eu estou com fome", "Eu estou feliz", "Eu estou cansado", "Eu estou atrasado"]', 0, 2),
(1, 'Complete: She ___ to school every day.', '["go", "goes", "going", "gone"]', 1, 3),
(2, 'Qual frase está no passado simples?', '["I play soccer", "I was playing soccer", "I played soccer", "I have played soccer"]', 2, 3);
