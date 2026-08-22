import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Roadmap } from './types';

const KEY = 'pathbreak_roadmap_v1';

export async function saveRoadmap(roadmap: Roadmap): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(roadmap));
}

export async function loadRoadmap(): Promise<Roadmap | null> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Roadmap;
  } catch {
    return null;
  }
}

export async function clearRoadmap(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}
