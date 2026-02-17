import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [page, setPage] = useState('home');
  const [xp, setXp] = useState(0);

  if (page === 'home') {
    return (
      <View style={s.container}>
        <Text style={s.logo}>LingoQuestions</Text>
        <Text style={s.stats}>✨ XP: {xp}</Text>
        <TouchableOpacity style={s.btn} onPress={() => setPage('quiz')}>
          <Text style={s.btnTxt}>ESTUDAR AGORA</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <Text style={s.q}>Como se diz "Bom dia"?</Text>
      <TouchableOpacity style={s.btn} onPress={() => { setXp(xp + 10); setPage('home'); Alert.alert("Acertou!", "+10 XP"); }}>
        <Text style={s.btnTxt}>Good Morning</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[s.btn, {marginTop: 10, backgroundColor: '#444'}]} onPress={() => setPage('home')}>
        <Text style={s.btnTxt}>VOLTAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', padding: 20 },
  logo: { color: '#BB86FC', fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  stats: { color: '#fff', fontSize: 20, marginBottom: 40 },
  btn: { backgroundColor: '#BB86FC', padding: 20, borderRadius: 10, width: '100%', alignItems: 'center' },
  btnTxt: { color: '#000', fontWeight: 'bold' },
  q: { color: '#fff', fontSize: 24, marginBottom: 30 }
});
