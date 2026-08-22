import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../constants/theme';
import { loadRoadmap } from '../lib/storage';
import { completedSteps, totalSteps } from '../lib/engine';
import type { Roadmap } from '../lib/types';

export default function HomeScreen() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  useEffect(() => {
    loadRoadmap().then(setRoadmap);
  }, []);

  const progress =
    roadmap && totalSteps(roadmap) > 0
      ? Math.round((completedSteps(roadmap) / totalSteps(roadmap)) * 100)
      : 0;

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.badge}>Science-backed · Game-like</Text>
        <Text style={styles.title}>Pathbreak</Text>
        <Text style={styles.sub}>
          Turn any goal into neurologically sized micro-steps — with optional memory and breathing support.
        </Text>
      </View>

      {roadmap ? (
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Active path</Text>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {roadmap.goalRefined}
          </Text>
          <Text style={styles.meta}>
            {completedSteps(roadmap)}/{totalSteps(roadmap)} steps · {roadmap.xp} XP · {progress}%
          </Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${progress}%` }]} />
          </View>
          <Link href="/roadmap" asChild>
            <Pressable style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText}>Continue path</Text>
            </Pressable>
          </Link>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Start your first path</Text>
          <Text style={styles.meta}>
            Smart suggestions, adaptive steps, memory drills, and optional breath protocols.
          </Text>
          <Link href="/goal" asChild>
            <Pressable style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText}>Set a goal</Text>
            </Pressable>
          </Link>
        </View>
      )}

      <View style={styles.row}>
        <Link href="/mind" asChild>
          <Pressable style={styles.btnGhost}>
            <Text style={styles.btnGhostText}>Mind training</Text>
          </Pressable>
        </Link>
        {roadmap && (
          <Link href="/goal" asChild>
            <Pressable style={styles.btnGhost}>
              <Text style={styles.btnGhostText}>New goal</Text>
            </Pressable>
          </Link>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, gap: spacing.md },
  hero: { marginTop: spacing.sm, marginBottom: spacing.sm },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(79,70,229,0.1)',
    color: colors.primary,
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 10,
  },
  title: { fontSize: 34, fontWeight: '800', color: colors.text, letterSpacing: -0.5 },
  sub: { marginTop: 8, fontSize: 16, color: colors.muted, lineHeight: 22 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  cardLabel: { fontSize: 12, fontWeight: '700', color: colors.primary, textTransform: 'uppercase' },
  cardTitle: { fontSize: 20, fontWeight: '700', color: colors.text },
  meta: { fontSize: 14, color: colors.muted },
  barTrack: {
    height: 8,
    backgroundColor: 'rgba(15,23,42,0.08)',
    borderRadius: 999,
    overflow: 'hidden',
    marginVertical: 4,
  },
  barFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 999 },
  btnPrimary: {
    marginTop: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  row: { flexDirection: 'row', gap: 10 },
  btnGhost: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  btnGhostText: { color: colors.text, fontWeight: '600' },
});
