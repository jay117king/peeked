import type { MicroStep, Milestone, Profile, Roadmap } from './types';

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function step(
  title: string,
  durationMin: number,
  successCriteria: string,
  kind: MicroStep['kind'] = 'task',
  rationale?: string
): MicroStep {
  return {
    id: id('step'),
    title,
    durationMin,
    successCriteria,
    kind,
    rationale,
    completed: false,
  };
}

/** Science-informed defaults: prefer 15–45 min units; smaller if ADHD flag. */
function targetDuration(profile: Profile): number {
  const base = Math.min(45, Math.max(15, profile.minutesPerDay || 25));
  return profile.hasAdhd ? Math.min(base, 25) : base;
}

export function generateRoadmap(
  goalRaw: string,
  goalRefined: string,
  profile: Profile
): Roadmap {
  const d = targetDuration(profile);
  const milestones: Milestone[] = [];

  const g = goalRefined.toLowerCase();

  if (/bible|testament|scripture/.test(g)) {
    milestones.push({
      id: id('ms'),
      title: 'Foundation & rhythm',
      steps: [
        step('Choose translation & reading format', Math.min(20, d), 'Format decided and saved', 'task',
          'Implementation intentions: decide when/where before starting (Gollwitzer).'),
        step('Box breathing before first session (2 min)', 2, 'Completed optional breath set', 'breath',
          'Optional regulation support (Zaccaro et al., 2018).'),
        step('Read first assigned passage', d, 'Passage read once without multitasking', 'task',
          'Single focus block sized near working-memory friendly duration.'),
        step('Write 3 bullet takeaways from memory', 10, '3 bullets written without re-reading first', 'memory',
          'Retrieval practice strengthens retention (Bjork; Cepeda et al.).'),
      ],
    });
    milestones.push({
      id: id('ms'),
      title: 'Sustainable cadence',
      steps: [
        step('Daily micro-reading block', d, 'Completed today’s reading unit', 'task'),
        step('Spaced review of prior notes', 12, 'Reviewed yesterday’s bullets', 'memory',
          'Distributed practice (Cepeda et al., 2006).'),
        step('Optional recovery day if energy is low', 5, 'Logged energy; skipped or shortened if needed', 'task',
          'ADHD/executive-function friendly recovery buffers (Barkley-informed design).'),
      ],
    });
  } else if (/java/.test(g)) {
    milestones.push({
      id: id('ms'),
      title: 'Environment & first programs',
      steps: [
        step('Install JDK + editor; verify `java -version`', Math.min(30, d), 'Version command succeeds', 'task'),
        step('Write and run Hello World', Math.min(25, d), 'Program compiles and runs', 'task'),
        step('Variables & types — read + 5 drills', d, '5 short exercises done', 'task',
          'Deliberate practice over passive reading (Ericsson).'),
        step('Active recall: list types without notes', 8, 'List written from memory', 'memory'),
      ],
    });
    milestones.push({
      id: id('ms'),
      title: 'Core syntax loops',
      steps: [
        step('Control flow exercises (if / loops)', d, '3 mini programs written', 'task'),
        step('Methods & simple classes', d, 'One class with 2 methods works', 'task'),
        step('Spaced mixed review set', 15, 'Mixed problems completed', 'memory',
          'Interleaving / desirable difficulties (Bjork & Bjork).'),
        step('Optional 2-min paced breathing before hard block', 2, 'Breath protocol done or skipped', 'breath'),
      ],
    });
  } else {
    milestones.push({
      id: id('ms'),
      title: 'Clarify & first wins',
      steps: [
        step(`Define success for: ${goalRefined}`, Math.min(20, d), '1–3 success criteria written', 'task',
          'Clear goals improve follow-through.'),
        step('Identify first 15–45 min action', 15, 'Next action is concrete and scheduled', 'task',
          'Implementation intentions (Gollwitzer).'),
        step('Complete first micro-step', d, 'First unit finished', 'task',
          'Goal-gradient: early visible progress (Hull; Kivetz).'),
        step('Optional breath reset', 2, 'Done or skipped', 'breath'),
      ],
    });
    milestones.push({
      id: id('ms'),
      title: 'Build the habit',
      steps: [
        step('Repeat daily block at energy peak', d, 'Session completed', 'task'),
        step('Weekly review from memory', 12, 'What worked / blocked written without notes first', 'memory'),
        step('Adjust step size if completion < 50%', 10, 'Plan updated', 'task',
          'Adaptive sizing reduces overwhelm.'),
      ],
    });
  }

  return {
    id: id('road'),
    goalRaw,
    goalRefined,
    createdAt: new Date().toISOString(),
    profile,
    xp: 0,
    milestones,
  };
}

export function totalSteps(r: Roadmap): number {
  return r.milestones.reduce((n, m) => n + m.steps.length, 0);
}

export function completedSteps(r: Roadmap): number {
  return r.milestones.reduce(
    (n, m) => n + m.steps.filter((s) => s.completed).length,
    0
  );
}
