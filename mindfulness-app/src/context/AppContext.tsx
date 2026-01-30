import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GratitudeEntry, MoodEntry, MoodType, AppData } from '../types';

interface AppContextType {
  gratitudeEntries: GratitudeEntry[];
  moodEntries: MoodEntry[];
  addGratitudeEntry: (text: string) => void;
  addMoodEntry: (mood: MoodType, note: string) => void;
  deleteGratitudeEntry: (id: string) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = '@mindfulness_app_data';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntry[]>([]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: AppData = JSON.parse(stored);
        setGratitudeEntries(data.gratitudeEntries || []);
        setMoodEntries(data.moodEntries || []);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = async (gratitude: GratitudeEntry[], mood: MoodEntry[]) => {
    try {
      const data: AppData = {
        gratitudeEntries: gratitude,
        moodEntries: mood,
        lastAffirmationIndex: 0,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  const addGratitudeEntry = (text: string) => {
    const newEntry: GratitudeEntry = {
      id: Date.now().toString(),
      text,
      date: new Date().toISOString().split('T')[0],
      createdAt: Date.now(),
    };
    const updated = [newEntry, ...gratitudeEntries];
    setGratitudeEntries(updated);
    saveData(updated, moodEntries);
  };

  const addMoodEntry = (mood: MoodType, note: string) => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      note,
      date: new Date().toISOString().split('T')[0],
      createdAt: Date.now(),
    };
    const updated = [newEntry, ...moodEntries];
    setMoodEntries(updated);
    saveData(gratitudeEntries, updated);
  };

  const deleteGratitudeEntry = (id: string) => {
    const updated = gratitudeEntries.filter(entry => entry.id !== id);
    setGratitudeEntries(updated);
    saveData(updated, moodEntries);
  };

  return (
    <AppContext.Provider
      value={{
        gratitudeEntries,
        moodEntries,
        addGratitudeEntry,
        addMoodEntry,
        deleteGratitudeEntry,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
