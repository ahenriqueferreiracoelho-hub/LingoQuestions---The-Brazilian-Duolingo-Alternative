// Comentário: Tela de lição com múltipla escolha e feedback imediato.
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { apiRequest } from '../api/client';
import { useAuth } from '../context/AuthContext';

export function LessonScreen() {
  const { token } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    apiRequest('/lessons/1/questions', 'GET', undefined, token).then(setQuestions).catch(() => setQuestions([]));
  }, [token]);

  const q = questions[index];
  if (!q) return <View style={styles.container}><Text>Carregando lição...</Text></View>;

  async function answer(optionIndex) {
    const result = await apiRequest('/lessons/answer', 'POST', { questionId: q.id, selectedOption: optionIndex }, token);
    setFeedback(result.correct ? `✅ +${result.xpGained} XP` : `❌ Resposta correta: ${result.correctOption + 1}`);
    setTimeout(() => {
      setFeedback('');
      setIndex((prev) => (prev + 1) % questions.length);
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{q.prompt}</Text>
      {q.options.map((option, i) => <Button key={option} title={`${i + 1}. ${option}`} onPress={() => answer(i)} />)}
      {feedback ? <Text>{feedback}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16, gap: 10 }, prompt: { fontSize: 20, fontWeight: '600' } });
