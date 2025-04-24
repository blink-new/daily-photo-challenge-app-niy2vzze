
import { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator } from 'react-native';
import { Camera, Home, User, Award } from 'lucide-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// This hook is required for the framework to function properly
// DO NOT REMOVE OR MODIFY THIS FUNCTION
function useFrameworkReady() {
  return true;
}

export default function Layout() {
  const isReady = useFrameworkReady();
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded || !isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7F7F7' }}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={{ marginTop: 20, fontWeight: '500', color: '#2C363F' }}>Loading...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FF6B6B',
          tabBarInactiveTintColor: '#2C363F',
          tabBarStyle: {
            height: 60,
            paddingBottom: 10,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            fontFamily: 'Inter_600SemiBold',
            fontSize: 12,
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontFamily: 'Inter_700Bold',
            fontSize: 18,
            color: '#2C363F',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Today's Challenge",
            tabBarLabel: "Today",
            tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="submit"
          options={{
            title: "Submit Photo",
            tabBarLabel: "Submit",
            tabBarIcon: ({ color }) => <Camera size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="challenges"
          options={{
            title: "Past Challenges",
            tabBarLabel: "Challenges",
            tabBarIcon: ({ color }) => <Award size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "My Profile",
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => <User size={24} color={color} />,
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}