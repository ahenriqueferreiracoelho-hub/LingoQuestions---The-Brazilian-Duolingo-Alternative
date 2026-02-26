// Comentário: Tela de login com autenticação por e-mail e senha.
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LingoQuestions</Text>
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Entrar" onPress={() => login(email, password).catch((e) => setError(e.message))} />
      <Button title="Criar conta" onPress={() => navigation.navigate('Cadastro')} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16, gap: 12 }, title: { fontSize: 24, fontWeight: '700' }, input: { borderWidth: 1, padding: 10, borderRadius: 8 }, error: { color: 'red' } });
