
import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Settings, Award, Grid, Calendar, LogOut } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

// Mock user data
const USER = {
  name: 'Alex Morgan',
  username: '@alexmorgan',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  bio: 'Photography enthusiast. Capturing moments one day at a time.',
  stats: {
    submissions: 18,
    streak: 7,
    likes: 243,
  },
};

// Mock user submissions
const USER_SUBMISSIONS = [
  {
    id: '1',
    challenge: 'Urban Shadows',
    image: 'https://images.unsplash.com/photo-1573455494060-c5595004fb6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    likes: 42,
    date: 'Today',
  },
  {
    id: '2',
    challenge: 'Morning Rituals',
    image: 'https://images.unsplash.com/photo-1510711269019-4d0cf290442c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    likes: 28,
    date: 'Yesterday',
  },
  {
    id: '3',
    challenge: 'Reflections',
    image: 'https://images.unsplash.com/photo-1551801691-f0bce83d4f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    likes: 36,
    date: '2 days ago',
  },
  {
    id: '4',
    challenge: 'Vibrant Colors',
    image: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    likes: 51,
    date: '3 days ago',
  },
  {
    id: '5',
    challenge: 'Minimalism',
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    likes: 19,
    date: '4 days ago',
  },
  {
    id: '6',
    challenge: 'Patterns',
    image: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    likes: 33,
    date: '5 days ago',
  },
];

const { width } = Dimensions.get('window');
const imageSize = (width - 48) / 2; // 2 columns with padding

export default function ProfileScreen() {
  const [submissions] = useState(USER_SUBMISSIONS);

  const renderSubmission = ({ item }: { item: typeof USER_SUBMISSIONS[0] }) => (
    <TouchableOpacity style={styles.submissionItem} activeOpacity={0.9}>
      <Image source={{ uri: item.image }} style={styles.submissionImage} />
      <View style={styles.submissionInfo}>
        <Text style={styles.submissionChallenge} numberOfLines={1}>{item.challenge}</Text>
        <Text style={styles.submissionLikes}>{item.likes} likes</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={submissions}
        keyExtractor={(item) => item.id}
        renderItem={renderSubmission}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={
          <Animated.View entering={FadeIn.delay(200).springify()}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.settingsButton}>
                <Settings size={24} color="#2C363F" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.profileSection}>
              <Image source={{ uri: USER.avatar }} style={styles.avatar} />
              
              <Text style={styles.name}>{USER.name}</Text>
              <Text style={styles.username}>{USER.username}</Text>
              
              <Text style={styles.bio}>{USER.bio}</Text>
              
              <View style={styles.statsContainer}>
                <LinearGradient
                  colors={['rgba(255, 107, 107, 0.1)', 'rgba(78, 205, 196, 0.1)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.statsGradient}
                >
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{USER.stats.submissions}</Text>
                    <Text style={styles.statLabel}>Submissions</Text>
                  </View>
                  
                  <View style={styles.statDivider} />
                  
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{USER.stats.streak}</Text>
                    <Text style={styles.statLabel}>Day Streak</Text>
                  </View>
                  
                  <View style={styles.statDivider} />
                  
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{USER.stats.likes}</Text>
                    <Text style={styles.statLabel}>Likes</Text>
                  </View>
                </LinearGradient>
              </View>
              
              <View style={styles.achievementsContainer}>
                <View style={styles.achievementItem}>
                  <Award size={24} color="#FFD700" />
                </View>
                <View style={styles.achievementItem}>
                  <Calendar size={24} color="#FF6B6B" />
                </View>
                <View style={styles.achievementItem}>
                  <Grid size={24} color="#4ECDC4" />
                </View>
              </View>
            </View>
            
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>My Submissions</Text>
            </View>
          </Animated.View>
        }
        ListFooterComponent={
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={18} color="#FF6B6B" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        }
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
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  name: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: '#2C363F',
    marginBottom: 4,
  },
  username: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 12,
  },
  bio: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#2C363F',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  statsContainer: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statsGradient: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: '#2C363F',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#6C757D',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignSelf: 'center',
  },
  achievementsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  achievementItem: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: '#2C363F',
  },
  submissionItem: {
    width: imageSize,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  submissionImage: {
    width: '100%',
    height: imageSize,
    resizeMode: 'cover',
  },
  submissionInfo: {
    padding: 8,
  },
  submissionChallenge: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#2C363F',
    marginBottom: 2,
  },
  submissionLikes: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: '#6C757D',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    padding: 12,
  },
  logoutText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#FF6B6B',
    marginLeft: 8,
  },
});