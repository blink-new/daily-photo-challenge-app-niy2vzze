
import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Calendar, ChevronRight } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

// Mock data for past challenges
const PAST_CHALLENGES = [
  {
    id: '1',
    title: 'Urban Shadows',
    description: 'Capture the interplay of light and shadow in an urban environment.',
    date: 'Today',
    submissions: 24,
    image: 'https://images.unsplash.com/photo-1573455494060-c5595004fb6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    active: true,
  },
  {
    id: '2',
    title: 'Morning Rituals',
    description: 'Share your morning routine through a single, evocative image.',
    date: 'Yesterday',
    submissions: 42,
    image: 'https://images.unsplash.com/photo-1510711269019-4d0cf290442c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    active: false,
  },
  {
    id: '3',
    title: 'Reflections',
    description: 'Find and capture interesting reflections in your environment.',
    date: '2 days ago',
    submissions: 38,
    image: 'https://images.unsplash.com/photo-1551801691-f0bce83d4f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    active: false,
  },
  {
    id: '4',
    title: 'Vibrant Colors',
    description: 'Showcase the most vibrant colors you can find today.',
    date: '3 days ago',
    submissions: 56,
    image: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    active: false,
  },
  {
    id: '5',
    title: 'Minimalism',
    description: 'Less is more. Capture beauty in simplicity.',
    date: '4 days ago',
    submissions: 31,
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    active: false,
  },
];

const { width } = Dimensions.get('window');

export default function ChallengesScreen() {
  const [challenges] = useState(PAST_CHALLENGES);

  const renderChallenge = ({ item, index }: { item: typeof PAST_CHALLENGES[0], index: number }) => (
    <Animated.View 
      entering={FadeInRight.delay(index * 100).springify()} 
      style={styles.challengeCard}
    >
      <Image source={{ uri: item.image }} style={styles.challengeImage} />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.challengeGradient}
      >
        <View style={styles.challengeContent}>
          <View style={styles.challengeHeader}>
            <Text style={styles.challengeTitle}>{item.title}</Text>
            {item.active && <View style={styles.activeIndicator} />}
          </View>
          
          <Text style={styles.challengeDescription} numberOfLines={2}>
            {item.description}
          </Text>
          
          <View style={styles.challengeFooter}>
            <View style={styles.challengeInfo}>
              <Calendar size={14} color="#FFFFFF" />
              <Text style={styles.challengeDate}>{item.date}</Text>
            </View>
            
            <Text style={styles.submissionsCount}>
              {item.submissions} submissions
            </Text>
          </View>
        </View>
      </LinearGradient>
      
      <TouchableOpacity style={styles.viewButton} activeOpacity={0.8}>
        <Text style={styles.viewButtonText}>View All</Text>
        <ChevronRight size={16} color="#2C363F" />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={renderChallenge}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  listContent: {
    padding: 16,
  },
  challengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  challengeImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  challengeGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
    justifyContent: 'flex-end',
  },
  challengeContent: {
    padding: 16,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  challengeTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginRight: 8,
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ECDC4',
  },
  challengeDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    opacity: 0.9,
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeDate: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
    opacity: 0.8,
  },
  submissionsCount: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
    paddingVertical: 12,
  },
  viewButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#2C363F',
    marginRight: 4,
  },
});