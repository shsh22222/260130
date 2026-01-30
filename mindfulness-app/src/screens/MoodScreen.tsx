import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { MoodType, MoodOption, MoodEntry } from '../types';

const { width } = Dimensions.get('window');

const MOOD_OPTIONS: MoodOption[] = [
  { type: 'great', emoji: '😊', label: 'とても良い', color: '#4CAF50' },
  { type: 'good', emoji: '🙂', label: '良い', color: '#8BC34A' },
  { type: 'okay', emoji: '😐', label: 'まあまあ', color: '#FFC107' },
  { type: 'low', emoji: '😔', label: '少し落ち込み', color: '#FF9800' },
  { type: 'difficult', emoji: '😢', label: '辛い', color: '#f44336' },
];

export const MoodScreen: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const { moodEntries, addMoodEntry } = useApp();

  const handleSave = () => {
    if (selectedMood) {
      addMoodEntry(selectedMood, note);
      setSelectedMood(null);
      setNote('');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const weekday = weekdays[date.getDay()];
    return `${month}/${day} (${weekday})`;
  };

  const getMoodOption = (type: MoodType) => {
    return MOOD_OPTIONS.find(option => option.type === type);
  };

  const getRecentMoodStats = () => {
    const last7Days = moodEntries.slice(0, 7);
    if (last7Days.length === 0) return null;

    const moodScores: { [key in MoodType]: number } = {
      great: 5,
      good: 4,
      okay: 3,
      low: 2,
      difficult: 1,
    };

    const total = last7Days.reduce((sum, entry) => sum + moodScores[entry.mood], 0);
    const average = total / last7Days.length;

    return {
      average: average.toFixed(1),
      count: last7Days.length,
    };
  };

  const stats = getRecentMoodStats();

  const getTodaysMood = () => {
    const today = new Date().toISOString().split('T')[0];
    return moodEntries.find(entry => entry.date === today);
  };

  const todaysMood = getTodaysMood();

  return (
    <LinearGradient
      colors={['#4facfe', '#00f2fe']}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>気分トラッカー</Text>
          <Text style={styles.subtitle}>
            今の気持ちを記録しましょう
          </Text>
        </View>

        {todaysMood && !selectedMood && (
          <View style={styles.todayCard}>
            <Text style={styles.todayTitle}>今日の記録</Text>
            <Text style={styles.todayEmoji}>
              {getMoodOption(todaysMood.mood)?.emoji}
            </Text>
            <Text style={styles.todayLabel}>
              {getMoodOption(todaysMood.mood)?.label}
            </Text>
            {todaysMood.note && (
              <Text style={styles.todayNote}>{todaysMood.note}</Text>
            )}
          </View>
        )}

        <View style={styles.moodSelector}>
          <Text style={styles.sectionTitle}>今の気分は？</Text>
          <View style={styles.moodGrid}>
            {MOOD_OPTIONS.map(option => (
              <TouchableOpacity
                key={option.type}
                style={[
                  styles.moodButton,
                  selectedMood === option.type && styles.moodButtonSelected,
                  selectedMood === option.type && { borderColor: option.color },
                ]}
                onPress={() => setSelectedMood(option.type)}
              >
                <Text style={styles.moodEmoji}>{option.emoji}</Text>
                <Text
                  style={[
                    styles.moodLabel,
                    selectedMood === option.type && styles.moodLabelSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {selectedMood && (
          <View style={styles.noteContainer}>
            <Text style={styles.noteLabel}>メモ（任意）</Text>
            <TextInput
              style={styles.noteInput}
              placeholder="今日あったことや気持ちを..."
              placeholderTextColor="rgba(0,0,0,0.4)"
              value={note}
              onChangeText={setNote}
              multiline
              maxLength={200}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>記録する</Text>
            </TouchableOpacity>
          </View>
        )}

        {stats && (
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>最近の傾向</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.average}</Text>
                <Text style={styles.statLabel}>平均スコア</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.count}</Text>
                <Text style={styles.statLabel}>記録数</Text>
              </View>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.historyToggle}
          onPress={() => setShowHistory(!showHistory)}
        >
          <Text style={styles.historyToggleText}>
            {showHistory ? '履歴を隠す' : '履歴を見る'} {showHistory ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>

        {showHistory && (
          <View style={styles.historyContainer}>
            {moodEntries.length === 0 ? (
              <Text style={styles.emptyText}>まだ記録がありません</Text>
            ) : (
              moodEntries.slice(0, 14).map((entry: MoodEntry) => {
                const moodOption = getMoodOption(entry.mood);
                return (
                  <View key={entry.id} style={styles.historyItem}>
                    <View style={styles.historyLeft}>
                      <Text style={styles.historyEmoji}>{moodOption?.emoji}</Text>
                      <View>
                        <Text style={styles.historyDate}>
                          {formatDate(entry.date)}
                        </Text>
                        <Text style={styles.historyMood}>{moodOption?.label}</Text>
                      </View>
                    </View>
                    {entry.note && (
                      <Text style={styles.historyNote} numberOfLines={1}>
                        {entry.note}
                      </Text>
                    )}
                  </View>
                );
              })
            )}
          </View>
        )}

        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 気分を整えるヒント</Text>
          <Text style={styles.tipText}>・深呼吸を3回してみましょう</Text>
          <Text style={styles.tipText}>・感謝できることを3つ考えてみましょう</Text>
          <Text style={styles.tipText}>・体を動かすと気分が変わります</Text>
          <Text style={styles.tipText}>・十分な睡眠を取りましょう</Text>
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
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  todayCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  todayTitle: {
    fontSize: 12,
    color: '#4facfe',
    fontWeight: '600',
    marginBottom: 8,
  },
  todayEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  todayLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  todayNote: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  moodSelector: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  moodButton: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 16,
    margin: 6,
    alignItems: 'center',
    width: (width - 80) / 3,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  moodButtonSelected: {
    borderWidth: 3,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  moodLabelSelected: {
    fontWeight: '600',
    color: '#333',
  },
  noteContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  noteLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginBottom: 12,
  },
  noteInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#333',
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#4facfe',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  statsCard: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  historyToggle: {
    alignItems: 'center',
    marginBottom: 16,
  },
  historyToggleText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  historyContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  historyDate: {
    fontSize: 12,
    color: '#999',
  },
  historyMood: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  historyNote: {
    fontSize: 12,
    color: '#666',
    flex: 1,
    textAlign: 'right',
    marginLeft: 12,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    padding: 20,
  },
  tipsCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 6,
    lineHeight: 20,
  },
});
