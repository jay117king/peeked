# Pathbreak

Science-backed, game-like goal tracker that turns ambitions into neurologically optimized micro-steps.

| Surface | Location | URL / build |
|--------|----------|-------------|
| **Marketing website** | Repo root (`index.html`) | https://jay117king.github.io/peeked/ |
| **Mobile app (Expo)** | [`mobile/`](./mobile/) | Android APK via EAS — see [mobile/README.md](./mobile/README.md) |

---

## Website (GitHub Pages)

1. Repo **Settings → Pages**
2. Source: **Deploy from a branch** → `main` → `/ (root)` → Save
3. Open https://jay117king.github.io/peeked/

---

## Mobile app → APK

```bash
cd mobile
npm install
npx expo start          # dev in Expo Go

npm i -g eas-cli && eas login
eas build -p android --profile preview   # downloadable APK
```

Full instructions: **[mobile/README.md](./mobile/README.md)**

### App screens (v1)

1. **Home** — active path + XP progress  
2. **Goal** — entry + smart suggestions (Bible / Java / generic)  
3. **Questionnaire** — timeframe, skill, minutes/day, ADHD-friendly sizing  
4. **Roadmap** — milestones, micro-steps, rationales, completion + XP  
5. **Mind training** — retrieval practice tips + box-breathing cycle  

Decomposition lives in `mobile/lib/engine.ts` (heuristic v1; swap for LLM+RAG later).

---

Pathbreak — built for real human cognition.
