import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getDailyAffirmation, getRandomAffirmation } from '../data/affirmations';
import { useApp } from '../context/AppContext';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const [affirmation, setAffirmation] = useState(getDailyAffirmation());
  const { gratitudeEntries, moodEntries } = useApp();

  const refreshAffirmation = () => {
    setAffirmation(getRandomAffirmation());
  };

  const getTodaysMood = () => {
    const today = new Date().toISOString().split('T')[0];
    return moodEntries.find(entry => entry.date === today);
  };

  const getTodaysGratitude = () => {
    const today = new Date().toISOString().split('T')[0];
    return gratitudeEntries.filter(entry => entry.date === today);
  };

  const todaysMood = getTodaysMood();
  const todaysGratitude = getTodaysGratitude();

  const getMoodEmoji = (mood: string) => {
    const emojis: { [key: string]: string } = {
      great: '😊',
      good: '🙂',
      okay: '😐',
      low: '😔',
      difficult: '😢',
    };
    return emojis[mood] || '🙂';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'おはようございます';
    if (hour < 17) return 'こんにちは';
    return 'こんばんは';
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.subtitle}>今日も素敵な一日を</Text>
        </View>

        <View style={styles.affirmationCard}>
          <Text style={styles.affirmationLabel}>今日のアファメーション</Text>
          <Text style={styles.affirmationText}>"{affirmation}"</Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={refreshAffirmation}
          >
            <Text style={styles.refreshButtonText}>🔄 新しい言葉</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>📝</Text>
            <Text style={styles.statNumber}>{gratitudeEntries.length}</Text>
            <Text style={styles.statLabel}>感謝の記録</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>💭</Text>
            <Text style={styles.statNumber}>{moodEntries.length}</Text>
            <Text style={styles.statLabel}>気分の記録</Text>
          </View>
        </View>

        {todaysMood && (
          <View style={styles.todayCard}>
            <Text style={styles.todayTitle}>今日の気分</Text>
            <Text style={styles.todayEmoji}>{getMoodEmoji(todaysMood.mood)}</Text>
            {todaysMood.note && (
              <Text style={styles.todayNote}>{todaysMood.note}</Text>
            )}
          </View>
        )}

        {todaysGratitude.length > 0 && (
          <View style={styles.todayCard}>
            <Text style={styles.todayTitle}>今日の感謝</Text>
            {todaysGratitude.slice(0, 3).map((entry, index) => (
              <Text key={entry.id} style={styles.gratitudeItem}>
                ✨ {entry.text}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 マインドフルネスのコツ</Text>
          <Text style={styles.tipText}>
            日々の小さな幸せに意識を向けることで、{'\n'}
            心の余裕が生まれます。
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  affirmationCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  affirmationLabel: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  affirmationText: {
    fontSize: 20,
    color: '#333',
    lineHeight: 32,
    textAlign: 'center',
    fontWeight: '500',
  },
  refreshButton: {
    marginTop: 16,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  refreshButtonText: {
    fontSize: 14,
    color: '#667eea',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    padding: 20,
    width: (width - 52) / 2,
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  todayCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  todayTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 12,
  },
  todayEmoji: {
    fontSize: 40,
    textAlign: 'center',
  },
  todayNote: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 8,
  },
  gratitudeItem: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
    lineHeight: 20,
  },
  tipCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  tipTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
  },
});
