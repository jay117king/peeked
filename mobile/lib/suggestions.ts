import type { GoalSuggestion } from './types';

const LIBRARY: { match: RegExp; suggestions: GoalSuggestion[] }[] = [
  {
    match: /bible|scripture|gospel/i,
    suggestions: [
      {
        label: 'New Testament only',
        refinedGoal: 'Read the New Testament with light context notes',
        description: 'Focused path through the Gospels and letters',
      },
      {
        label: 'Full Bible',
        refinedGoal: 'Read the full Bible at a sustainable pace',
        description: 'Old + New Testament with recovery buffers',
      },
      {
        label: 'Chronological order',
        refinedGoal: 'Read the Bible in chronological narrative order',
        description: 'Timeline-based sequence for story flow',
      },
      {
        label: 'Bible in a Year',
        refinedGoal: 'Complete a Bible-in-a-Year reading plan',
        description: 'Daily micro-readings sized to attention limits',
      },
      {
        label: 'Deep study mode',
        refinedGoal: 'Deep study one book at a time with notes',
        description: 'Slower pace, memory drills, reflection',
      },
    ],
  },
  {
    match: /java(?!script)|jvm|spring boot/i,
    suggestions: [
      {
        label: '1-week crash course',
        refinedGoal: 'Learn Java core syntax in 1 week with tiny projects',
        description: 'Variables, control flow, classes, simple CLI apps',
      },
      {
        label: '1-month curriculum',
        refinedGoal: 'Structured 1-month Java fundamentals path',
        description: 'OOP, collections, exceptions, unit tests',
      },
      {
        label: '3-month project track',
        refinedGoal: '3-month project-based Java mastery',
        description: 'Build real apps; deliberate practice blocks',
      },
      {
        label: '6-month backend path',
        refinedGoal: '6-month Java path including Spring Boot basics',
        description: 'APIs, persistence, testing, deploy a service',
      },
      {
        label: 'Interview prep',
        refinedGoal: 'Java interview prep with spaced problem practice',
        description: 'DSA + language fundamentals with memory drills',
      },
    ],
  },
];

export function suggestGoals(input: string): GoalSuggestion[] {
  const trimmed = input.trim();
  if (!trimmed) return [];

  for (const entry of LIBRARY) {
    if (entry.match.test(trimmed)) return entry.suggestions;
  }

  return [
    {
      label: 'Focused 1-month plan',
      refinedGoal: `${trimmed} (1-month focused plan)`,
      description: 'Milestones sized to ~15–45 min daily blocks',
    },
    {
      label: '3-month mastery path',
      refinedGoal: `${trimmed} (3-month mastery path)`,
      description: 'Deeper practice with memory reviews',
    },
    {
      label: 'Flexible open-ended',
      refinedGoal: `${trimmed} (flexible pace)`,
      description: 'Adaptive steps with recovery when needed',
    },
  ];
}
