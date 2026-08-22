import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../constants/theme';
import { completedSteps, totalSteps } from '../lib/engine';
import { loadRoadmap, saveRoadmap } from '../lib/storage';
import type { MicroStep, Roadmap } from '../lib/types';

export default function RoadmapScreen() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadRoadmap().then(setRoadmap);
    }, [])
  );

  async function toggle(stepId: string) {
    if (!roadmap) return;
    const next: Roadmap = {
      ...roadmap,
      milestones: roadmap.milestones.map((m) => ({
        ...m,
        steps: m.steps.map((s) =>
          s.id === stepId ? { ...s, completed: !s.completed } : s
        ),
      })),
    };
    const was = roadmap.milestones
      .flatMap((m) => m.steps)
      .find((s) => s.id === stepId);
    if (was && !was.completed) {
      next.xp = roadmap.xp + 10 + Math.round(was.durationMin / 2);
    }
    setRoadmap(next);
    await saveRoadmap(next);
  }

  if (!roadmap) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No path yet. Set a goal first.</Text>
      </View>
    );
  }

  const done = completedSteps(roadmap);
  const total = totalSteps(roadmap);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.goal}>{roadmap.goalRefined}</Text>
      <Text style={styles.meta}>
        {done}/{total} steps · {roadmap.xp} XP
      </Text>

      {roadmap.milestones.map((ms) => (
        <View key={ms.id} style={styles.milestone}>
          <Text style={styles.msTitle}>{ms.title}</Text>
          {ms.steps.map((s) => (
            <StepRow key={s.id} step={s} onToggle={() => toggle(s.id)} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

function StepRow({ step, onToggle }: { step: MicroStep; onToggle: () => void }) {
  const kindColor =
    step.kind === 'breath'
      ? colors.breath
      : step.kind === 'memory'
        ? colors.memory
        : colors.primary;

  return (
    <Pressable onPress={onToggle} style={[styles.step, step.completed && styles.stepDone]}>
      <View style={[styles.check, step.completed && styles.checkOn]}>
        <Text style={styles.checkText}>{step.completed ? '✓' : ''}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.stepTitle, step.completed && styles.stepTitleDone]}>
          {step.title}
        </Text>
        <Text style={styles.stepMeta}>
          {step.durationMin} min · {step.kind}
          {step.successCriteria ? ` · ${step.successCriteria}` : ''}
        </Text>
        {step.rationale ? (
          <Text style={[styles.rationale, { color: kindColor }]}>{step.rationale}</Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, paddingBottom: 48, gap: 8 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: colors.muted },
  goal: { fontSize: 20, fontWeight: '800', color: colors.text },
  meta: { color: colors.muted, marginBottom: 12 },
  milestone: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
    gap: 8,
  },
  msTitle: { fontWeight: '800', fontSize: 16, color: colors.text, marginBottom: 4 },
  step: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepDone: { opacity: 0.7 },
  check: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOn: { backgroundColor: colors.success, borderColor: colors.success },
  checkText: { color: '#fff', fontWeight: '800' },
  stepTitle: { fontWeight: '700', color: colors.text, fontSize: 15 },
  stepTitleDone: { textDecorationLine: 'line-through', color: colors.muted },
  stepMeta: { fontSize: 12, color: colors.muted, marginTop: 2 },
  rationale: { fontSize: 11, marginTop: 4, lineHeight: 15 },
});
