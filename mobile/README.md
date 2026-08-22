# Pathbreak Mobile (Expo)

Science-backed goal tracker — React Native + Expo. Build an **Android APK** with EAS.

## Features (v1 foundation)

- Goal entry with **smart suggestions** (Bible, Java, generic)
- Personalization questionnaire (timeframe, skill, minutes/day, ADHD-friendly sizing)
- **Decomposition engine** → milestones + 15–45 min micro-steps
- Step completion + **XP**
- Optional **memory** + **breathing** mind-training screen
- Local persistence (AsyncStorage)

Marketing site remains at repo root for GitHub Pages.

## Quick start

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with Expo Go (Android/iOS), or press `a` for Android emulator.

## Build Android APK

1. Install EAS CLI and log in:

```bash
npm i -g eas-cli
eas login
cd mobile
eas build:configure
```

2. Create a preview APK:

```bash
eas build -p android --profile preview
```

3. Download the APK from the Expo dashboard link when the build finishes.

Production Play Store bundle:

```bash
eas build -p android --profile production
```

## Project layout

```
mobile/
  app/           # Expo Router screens
  lib/           # Engine, suggestions, storage, types
  constants/     # Theme
  eas.json       # APK / AAB build profiles
  app.json       # Bundle IDs, icons, splash
```

## Next engineering steps

- [ ] Real LLM + RAG over research corpus (replace heuristic `lib/engine.ts`)
- [ ] Document upload (Expo DocumentPicker + parsing)
- [ ] Skill-tree / journey map UI
- [ ] Cloud sync (optional Supabase)
- [ ] App icons in `assets/` (add `icon.png`, `splash.png`, `adaptive-icon.png`)
- [ ] Set real `extra.eas.projectId` after `eas init`

## License

Private / TBD — Pathbreak concept.
