import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type BreathingPhase = 'idle' | 'inhale' | 'hold' | 'exhale' | 'rest';

interface BreathingPattern {
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  rest: number;
  cycles: number;
}

const PATTERNS: BreathingPattern[] = [
  {
    name: '4-7-8 呼吸法',
    description: 'リラックスと睡眠改善に効果的',
    inhale: 4,
    hold: 7,
    exhale: 8,
    rest: 0,
    cycles: 4,
  },
  {
    name: 'ボックス呼吸',
    description: '集中力とストレス軽減に',
    inhale: 4,
    hold: 4,
    exhale: 4,
    rest: 4,
    cycles: 4,
  },
  {
    name: 'シンプル呼吸',
    description: '初心者向けの基本呼吸',
    inhale: 4,
    hold: 0,
    exhale: 6,
    rest: 0,
    cycles: 6,
  },
];

export const BreathingScreen: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathingPhase>('idle');
  const [currentCycle, setCurrentCycle] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.5)).current;

  const pattern = PATTERNS[selectedPattern];

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return '吸う';
      case 'hold':
        return '止める';
      case 'exhale':
        return '吐く';
      case 'rest':
        return '休む';
      default:
        return 'スタート';
    }
  };

  const getPhaseColor = (): readonly [string, string] => {
    switch (phase) {
      case 'inhale':
        return ['#667eea', '#764ba2'] as const;
      case 'hold':
        return ['#f093fb', '#f5576c'] as const;
      case 'exhale':
        return ['#4facfe', '#00f2fe'] as const;
      case 'rest':
        return ['#43e97b', '#38f9d7'] as const;
      default:
        return ['#667eea', '#764ba2'] as const;
    }
  };

  useEffect(() => {
    if (!isActive) {
      scaleAnim.setValue(1);
      opacityAnim.setValue(0.5);
      return;
    }

    let cancelled = false;
    const runCycle = async (cycleNum: number) => {
      if (cancelled || cycleNum >= pattern.cycles) {
        setIsActive(false);
        setPhase('idle');
        setCurrentCycle(0);
        return;
      }

      setCurrentCycle(cycleNum + 1);

      // Inhale
      if (pattern.inhale > 0) {
        setPhase('inhale');
        setCountdown(pattern.inhale);
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.5,
            duration: pattern.inhale * 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: pattern.inhale * 1000,
            useNativeDriver: true,
          }),
        ]).start();

        for (let i = pattern.inhale; i > 0 && !cancelled; i--) {
          setCountdown(i);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      if (cancelled) return;

      // Hold
      if (pattern.hold > 0) {
        setPhase('hold');
        for (let i = pattern.hold; i > 0 && !cancelled; i--) {
          setCountdown(i);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      if (cancelled) return;

      // Exhale
      if (pattern.exhale > 0) {
        setPhase('exhale');
        setCountdown(pattern.exhale);
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: pattern.exhale * 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.5,
            duration: pattern.exhale * 1000,
            useNativeDriver: true,
          }),
        ]).start();

        for (let i = pattern.exhale; i > 0 && !cancelled; i--) {
          setCountdown(i);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      if (cancelled) return;

      // Rest
      if (pattern.rest > 0) {
        setPhase('rest');
        for (let i = pattern.rest; i > 0 && !cancelled; i--) {
          setCountdown(i);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      if (!cancelled) {
        runCycle(cycleNum + 1);
      }
    };

    runCycle(0);

    return () => {
      cancelled = true;
    };
  }, [isActive, selectedPattern]);

  const handleStart = () => {
    if (isActive) {
      setIsActive(false);
      setPhase('idle');
      setCurrentCycle(0);
      scaleAnim.setValue(1);
      opacityAnim.setValue(0.5);
    } else {
      setIsActive(true);
    }
  };

  return (
    <LinearGradient
      colors={getPhaseColor()}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>呼吸エクササイズ</Text>
        <Text style={styles.subtitle}>
          深い呼吸で心を落ち着けましょう
        </Text>
      </View>

      <View style={styles.patternSelector}>
        {PATTERNS.map((p, index) => (
          <TouchableOpacity
            key={p.name}
            style={[
              styles.patternButton,
              selectedPattern === index && styles.patternButtonActive,
            ]}
            onPress={() => {
              if (!isActive) setSelectedPattern(index);
            }}
            disabled={isActive}
          >
            <Text
              style={[
                styles.patternButtonText,
                selectedPattern === index && styles.patternButtonTextActive,
              ]}
            >
              {p.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.patternDescription}>{pattern.description}</Text>

      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            styles.breathCircle,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        />
        <View style={styles.circleContent}>
          <Text style={styles.phaseText}>{getPhaseText()}</Text>
          {isActive && (
            <>
              <Text style={styles.countdownText}>{countdown}</Text>
              <Text style={styles.cycleText}>
                {currentCycle} / {pattern.cycles}
              </Text>
            </>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.startButton, isActive && styles.stopButton]}
        onPress={handleStart}
      >
        <Text style={styles.startButtonText}>
          {isActive ? '停止' : '開始'}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>呼吸パターン</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>吸う:</Text>
          <Text style={styles.infoValue}>{pattern.inhale}秒</Text>
        </View>
        {pattern.hold > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>止める:</Text>
            <Text style={styles.infoValue}>{pattern.hold}秒</Text>
          </View>
        )}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>吐く:</Text>
          <Text style={styles.infoValue}>{pattern.exhale}秒</Text>
        </View>
        {pattern.rest > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>休む:</Text>
            <Text style={styles.infoValue}>{pattern.rest}秒</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    alignItems: 'center',
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
  patternSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  patternButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 4,
    marginBottom: 8,
  },
  patternButtonActive: {
    backgroundColor: '#fff',
  },
  patternButtonText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  patternButtonTextActive: {
    color: '#667eea',
  },
  patternDescription: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 24,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    marginBottom: 24,
  },
  breathCircle: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  circleContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  phaseText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  countdownText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  cycleText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
  },
  startButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 24,
  },
  stopButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
  },
  infoTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  infoValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
});
