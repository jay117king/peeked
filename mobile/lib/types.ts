export type Timeframe = '1w' | '1m' | '3m' | '6m' | '1y' | 'open';

export type LearningStyle = 'visual' | 'reading' | 'practice' | 'social' | 'mixed';

export type MotivationStyle = 'competition' | 'curiosity' | 'mastery' | 'accountability';

export interface Profile {
  timeframe: Timeframe;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  learningStyle: LearningStyle;
  minutesPerDay: number;
  energyPeak: 'morning' | 'afternoon' | 'evening' | 'flexible';
  motivation: MotivationStyle;
  hasAdhd: boolean;
  notes?: string;
}

export interface MicroStep {
  id: string;
  title: string;
  durationMin: number;
  successCriteria: string;
  rationale?: string;
  kind: 'task' | 'memory' | 'breath' | 'review';
  completed: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  steps: MicroStep[];
}

export interface Roadmap {
  id: string;
  goalRaw: string;
  goalRefined: string;
  createdAt: string;
  profile: Profile;
  xp: number;
  milestones: Milestone[];
}

export interface GoalSuggestion {
  label: string;
  refinedGoal: string;
  description: string;
}
