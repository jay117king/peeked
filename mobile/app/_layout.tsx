import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerShadowVisible: false,
          headerTintColor: colors.primary,
          headerTitleStyle: { fontWeight: '700', color: colors.text },
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Pathbreak' }} />
        <Stack.Screen name="goal" options={{ title: 'Your goal' }} />
        <Stack.Screen name="questionnaire" options={{ title: 'Personalize' }} />
        <Stack.Screen name="roadmap" options={{ title: 'Your path' }} />
        <Stack.Screen name="mind" options={{ title: 'Mind training' }} />
      </Stack>
    </>
  );
}
