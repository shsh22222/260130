import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';
import { GratitudeEntry } from '../types';

export const GratitudeScreen: React.FC = () => {
  const [newEntry, setNewEntry] = useState('');
  const { gratitudeEntries, addGratitudeEntry, deleteGratitudeEntry } = useApp();

  const handleAdd = () => {
    if (newEntry.trim()) {
      addGratitudeEntry(newEntry.trim());
      setNewEntry('');
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      '削除確認',
      'この感謝の記録を削除しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: '削除', style: 'destructive', onPress: () => deleteGratitudeEntry(id) },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  const groupEntriesByDate = () => {
    const grouped: { [key: string]: GratitudeEntry[] } = {};
    gratitudeEntries.forEach(entry => {
      if (!grouped[entry.date]) {
        grouped[entry.date] = [];
      }
      grouped[entry.date].push(entry);
    });
    return Object.entries(grouped).map(([date, entries]) => ({
      date,
      entries,
    }));
  };

  const groupedEntries = groupEntriesByDate();

  const renderEntry = ({ item }: { item: GratitudeEntry }) => (
    <TouchableOpacity
      style={styles.entryCard}
      onLongPress={() => handleDelete(item.id)}
    >
      <Text style={styles.entryText}>✨ {item.text}</Text>
    </TouchableOpacity>
  );

  const renderDateGroup = ({ item }: { item: { date: string; entries: GratitudeEntry[] } }) => (
    <View style={styles.dateGroup}>
      <Text style={styles.dateHeader}>{formatDate(item.date)}</Text>
      {item.entries.map(entry => (
        <TouchableOpacity
          key={entry.id}
          style={styles.entryCard}
          onLongPress={() => handleDelete(entry.id)}
        >
          <Text style={styles.entryText}>✨ {entry.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <LinearGradient
      colors={['#f093fb', '#f5576c']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <Text style={styles.title}>感謝日記</Text>
          <Text style={styles.subtitle}>
            日々の小さな幸せを記録しましょう
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="今日感謝していることは..."
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={newEntry}
            onChangeText={setNewEntry}
            multiline
            maxLength={200}
          />
          <TouchableOpacity
            style={[styles.addButton, !newEntry.trim() && styles.addButtonDisabled]}
            onPress={handleAdd}
            disabled={!newEntry.trim()}
          >
            <Text style={styles.addButtonText}>追加</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.promptsContainer}>
          <Text style={styles.promptsTitle}>書き方のヒント</Text>
          <Text style={styles.promptText}>・今日嬉しかったことは？</Text>
          <Text style={styles.promptText}>・誰かに感謝していることは？</Text>
          <Text style={styles.promptText}>・当たり前だけどありがたいことは？</Text>
        </View>

        {gratitudeEntries.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📝</Text>
            <Text style={styles.emptyText}>まだ記録がありません</Text>
            <Text style={styles.emptySubtext}>
              最初の感謝を記録してみましょう
            </Text>
          </View>
        ) : (
          <FlatList
            data={groupedEntries}
            renderItem={renderDateGroup}
            keyExtractor={item => item.date}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
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
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f5576c',
  },
  promptsContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  promptsTitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
  },
  promptText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 4,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  dateGroup: {
    marginBottom: 20,
  },
  dateHeader: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
    fontWeight: '600',
  },
  entryCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  entryText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
});
