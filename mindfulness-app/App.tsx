import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View, StyleSheet } from 'react-native';

import { AppProvider } from './src/context/AppContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { GratitudeScreen } from './src/screens/GratitudeScreen';
import { BreathingScreen } from './src/screens/BreathingScreen';
import { MoodScreen } from './src/screens/MoodScreen';

const Tab = createBottomTabNavigator();

interface TabBarIconProps {
  focused: boolean;
  emoji: string;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ focused, emoji }) => (
  <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
    <Text style={styles.icon}>{emoji}</Text>
  </View>
);

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: '#fff',
                borderTopWidth: 0,
                elevation: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                height: 80,
                paddingBottom: 20,
                paddingTop: 10,
              },
              tabBarActiveTintColor: '#667eea',
              tabBarInactiveTintColor: '#999',
              tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: '500',
              },
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: 'ホーム',
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon focused={focused} emoji="🏠" />
                ),
              }}
            />
            <Tab.Screen
              name="Gratitude"
              component={GratitudeScreen}
              options={{
                tabBarLabel: '感謝',
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon focused={focused} emoji="✨" />
                ),
              }}
            />
            <Tab.Screen
              name="Breathing"
              component={BreathingScreen}
              options={{
                tabBarLabel: '呼吸',
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon focused={focused} emoji="🌬️" />
                ),
              }}
            />
            <Tab.Screen
              name="Mood"
              component={MoodScreen}
              options={{
                tabBarLabel: '気分',
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon focused={focused} emoji="💭" />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 4,
  },
  iconContainerFocused: {
    transform: [{ scale: 1.1 }],
  },
  icon: {
    fontSize: 22,
  },
});
