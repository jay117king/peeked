import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../constants/theme';

export default function MindScreen() {
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [count, setCount] = useState(4);

  function startBox() {
    let c = 4;
    setPhase('inhale');
    setCount(4);
    const tick = setInterval(() => {
      c -= 1;
      if (c > 0) {
        setCount(c);
        return;
      }
      setPhase((p) => {
        if (p === 'inhale') {
          c = 4;
          setCount(4);
          return 'hold';
        }
        if (p === 'hold') {
          c = 4;
          setCount(4);
          return 'exhale';
        }
        if (p === 'exhale') {
          clearInterval(tick);
          setCount(0);
          return 'idle';
        }
        return 'idle';
      });
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.tag}>Memory</Text>
        <Text style={styles.title}>Retrieval practice</Text>
        <Text style={styles.body}>
          After a learning step, close notes and write 3 bullets from memory. Check against source.
          Spaced review beats re-reading (Cepeda et al., 2006; Kang, 2016).
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={[styles.tag, { color: colors.breath }]}>Breathing</Text>
        <Text style={styles.title}>Box breath (optional)</Text>
        <Text style={styles.body}>
          4s inhale · 4s hold · 4s exhale. Optional before hard focus blocks. Not medical treatment
          (see Zaccaro et al., 2018; Balban et al., 2023).
        </Text>
        <View style={styles.breathBox}>
          <Text style={styles.phase}>{phase === 'idle' ? 'Ready' : phase}</Text>
          <Text style={styles.count}>{phase === 'idle' ? '—' : count}</Text>
        </View>
        <Pressable style={styles.btn} onPress={startBox} disabled={phase !== 'idle'}>
          <Text style={styles.btnText}>
            {phase === 'idle' ? 'Start 1 cycle' : 'In progress…'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, gap: 16 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  tag: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.memory,
    textTransform: 'uppercase',
  },
  title: { fontSize: 20, fontWeight: '800', color: colors.text },
  body: { fontSize: 14, color: colors.muted, lineHeight: 20 },
  breathBox: {
    marginTop: 8,
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(14,165,233,0.08)',
  },
  phase: { fontSize: 16, fontWeight: '700', color: colors.breath, textTransform: 'capitalize' },
  count: { fontSize: 40, fontWeight: '800', color: colors.text },
  btn: {
    marginTop: 8,
    backgroundColor: colors.breath,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700' },
});
