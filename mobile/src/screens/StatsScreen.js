// Comentário: Dashboard simples de estatísticas e ranking.
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { apiRequest } from '../api/client';
import { useAuth } from '../context/AuthContext';

export function StatsScreen() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    apiRequest('/stats/me', 'GET', undefined, token).then(setStats);
    apiRequest('/stats/leaderboard', 'GET', undefined, token).then(setLeaders);
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu Dashboard</Text>
      <Text>XP: {stats?.xp ?? '-'}</Text>
      <Text>Nível: {stats?.level ?? '-'}</Text>
      <Text>Streak: {stats?.streak ?? '-'}</Text>
      <Text>Acurácia: {stats?.accuracy ?? '-'}%</Text>
      <Text style={styles.subtitle}>Ranking</Text>
      {leaders.map((l) => <Text key={l.id}>{l.rank}. {l.name} - {l.xp} XP</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16, gap: 8 }, title: { fontSize: 24, fontWeight: '700' }, subtitle: { marginTop: 10, fontSize: 18, fontWeight: '600' } });
