export interface GratitudeEntry {
  id: string;
  text: string;
  date: string;
  createdAt: number;
}

export interface MoodEntry {
  id: string;
  mood: MoodType;
  note: string;
  date: string;
  createdAt: number;
}

export type MoodType = 'great' | 'good' | 'okay' | 'low' | 'difficult';

export interface MoodOption {
  type: MoodType;
  emoji: string;
  label: string;
  color: string;
}

export interface AppData {
  gratitudeEntries: GratitudeEntry[];
  moodEntries: MoodEntry[];
  lastAffirmationIndex: number;
}
