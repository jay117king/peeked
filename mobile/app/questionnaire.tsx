import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../constants/theme';
import { generateRoadmap } from '../lib/engine';
import { saveRoadmap } from '../lib/storage';
import type { Profile, Timeframe } from '../lib/types';

const TIMEFRAMES: { id: Timeframe; label: string }[] = [
  { id: '1w', label: '1 week' },
  { id: '1m', label: '1 month' },
  { id: '3m', label: '3 months' },
  { id: '6m', label: '6 months' },
  { id: '1y', label: '1 year' },
  { id: 'open', label: 'Open' },
];

export default function QuestionnaireScreen() {
  const { goalRaw, goalRefined } = useLocalSearchParams<{
    goalRaw: string;
    goalRefined: string;
  }>();

  const [timeframe, setTimeframe] = useState<Timeframe>('1m');
  const [skillLevel, setSkillLevel] = useState<Profile['skillLevel']>('beginner');
  const [minutesPerDay, setMinutes] = useState(25);
  const [hasAdhd, setHasAdhd] = useState(false);
  const [busy, setBusy] = useState(false);

  async function build() {
    setBusy(true);
    const profile: Profile = {
      timeframe,
      skillLevel,
      learningStyle: 'mixed',
      minutesPerDay,
      energyPeak: 'flexible',
      motivation: 'mastery',
      hasAdhd,
    };
    const roadmap = generateRoadmap(
      goalRaw || goalRefined || 'My goal',
      goalRefined || goalRaw || 'My goal',
      profile
    );
    await saveRoadmap(roadmap);
    setBusy(false);
    router.replace('/roadmap');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.goal} numberOfLines={3}>
        {goalRefined || goalRaw}
      </Text>

      <Text style={styles.section}>Timeframe</Text>
      <View style={styles.chips}>
        {TIMEFRAMES.map((t) => (
          <Pressable
            key={t.id}
            onPress={() => setTimeframe(t.id)}
            style={[styles.chip, timeframe === t.id && styles.chipOn]}
          >
            <Text style={[styles.chipText, timeframe === t.id && styles.chipTextOn]}>
              {t.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.section}>Skill level</Text>
      <View style={styles.chips}>
        {(['beginner', 'intermediate', 'advanced'] as const).map((s) => (
          <Pressable
            key={s}
            onPress={() => setSkillLevel(s)}
            style={[styles.chip, skillLevel === s && styles.chipOn]}
          >
            <Text style={[styles.chipText, skillLevel === s && styles.chipTextOn]}>
              {s}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.section}>Minutes per day</Text>
      <View style={styles.chips}>
        {[15, 25, 45].map((m) => (
          <Pressable
            key={m}
            onPress={() => setMinutes(m)}
            style={[styles.chip, minutesPerDay === m && styles.chipOn]}
          >
            <Text style={[styles.chipText, minutesPerDay === m && styles.chipTextOn]}>
              {m} min
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.section}>Accessibility</Text>
      <Pressable
        onPress={() => setHasAdhd((v) => !v)}
        style={[styles.chip, hasAdhd && styles.chipOn, { alignSelf: 'flex-start' }]}
      >
        <Text style={[styles.chipText, hasAdhd && styles.chipTextOn]}>
          {hasAdhd ? '✓ ADHD-friendly step sizing' : 'Enable ADHD-friendly sizing'}
        </Text>
      </Pressable>

      <Pressable style={styles.btn} onPress={build} disabled={busy}>
        <Text style={styles.btnText}>{busy ? 'Building…' : 'Generate path'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, gap: 8, paddingBottom: 48 },
  goal: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 12 },
  section: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.text, fontWeight: '600', textTransform: 'capitalize' },
  chipTextOn: { color: '#fff' },
  btn: {
    marginTop: 28,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
