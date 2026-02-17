// Comentário: Home com atalhos para estudar, ver estatísticas e configurações.
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export function HomeScreen({ navigation }) {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {user?.name} 👋</Text>
      <Text>XP: {user?.xp} | Nível: {user?.level} | Streak: {user?.streak}</Text>
      <Button title="Iniciar Lição" onPress={() => navigation.navigate('Lição')} />
      <Button title="Ver Estatísticas" onPress={() => navigation.navigate('Estatísticas')} />
      <Button title="Configurações" onPress={() => navigation.navigate('Configurações')} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16, gap: 12 }, title: { fontSize: 24, fontWeight: '700' } });
