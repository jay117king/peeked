import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, spacing } from '../constants/theme';
import { suggestGoals } from '../lib/suggestions';

export default function GoalScreen() {
  const [input, setInput] = useState('');
  const suggestions = useMemo(() => suggestGoals(input), [input]);

  function continueWith(refined: string) {
    router.push({
      pathname: '/questionnaire',
      params: { goalRaw: input.trim() || refined, goalRefined: refined },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What do you want to achieve?</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Read the Bible, Understand Java…"
        placeholderTextColor={colors.muted}
        value={input}
        onChangeText={setInput}
        autoFocus
      />

      {suggestions.length > 0 && (
        <>
          <Text style={styles.section}>Smart suggestions</Text>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.label}
            contentContainerStyle={{ gap: 10, paddingBottom: 40 }}
            renderItem={({ item }) => (
              <Pressable style={styles.card} onPress={() => continueWith(item.refinedGoal)}>
                <Text style={styles.cardTitle}>{item.label}</Text>
                <Text style={styles.cardDesc}>{item.description}</Text>
              </Pressable>
            )}
          />
        </>
      )}

      {input.trim().length > 2 && (
        <Pressable
          style={styles.btn}
          onPress={() => continueWith(input.trim())}
        >
          <Text style={styles.btnText}>Use my wording</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg },
  label: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 10 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
  },
  section: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  cardDesc: { marginTop: 4, fontSize: 14, color: colors.muted },
  btn: {
    marginTop: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700' },
});
