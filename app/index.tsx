
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';
import { Heart, MessageCircle, Clock } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { formatDistanceToNow } from 'date-fns';

// Mock data for today's challenge
const CHALLENGE = {
  id: '1',
  title: 'Urban Shadows',
  description: 'Capture the interplay of light and shadow in an urban environment.',
  expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
  submissions: 24,
};

// Mock data for submissions
const SUBMISSIONS = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Jessica Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    },
    image: 'https://images.unsplash.com/photo-1573455494060-c5595004fb6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    likes: 42,
    comments: 8,
    createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    liked: false,
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'Marcus Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    },
    image: 'https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    likes: 28,
    comments: 3,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    liked: true,
  },
  {
    id: '3',
    user: {
      id: '3',
      name: 'Sophia Williams',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    },
    image: 'https://images.unsplash.com/photo-1504972090022-6edb3f4d4dc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    likes: 56,
    comments: 12,
    createdAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000), // 3.5 hours ago
    liked: false,
  },
];

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [submissions, setSubmissions] = useState(SUBMISSIONS);
  const [refreshing, setRefreshing] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // Update time left every minute
    const interval = setInterval(() => {
      const now = new Date();
      const distance = CHALLENGE.expiresAt.getTime() - now.getTime();
      
      if (distance <= 0) {
        setTimeLeft('Challenge ended');
        clearInterval(interval);
      } else {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}h ${minutes}m remaining`);
      }
    }, 60000);
    
    // Initial calculation
    const now = new Date();
    const distance = CHALLENGE.expiresAt.getTime() - now.getTime();
    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    setTimeLeft(`${hours}h ${minutes}m remaining`);
    
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const toggleLike = (id: string) => {
    setSubmissions(submissions.map(submission => {
      if (submission.id === id) {
        const liked = !submission.liked;
        return {
          ...submission,
          liked,
          likes: liked ? submission.likes + 1 : submission.likes - 1,
        };
      }
      return submission;
    }));
  };

  const renderSubmission = ({ item, index }: { item: typeof SUBMISSIONS[0], index: number }) => (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).springify()} 
      style={styles.submissionCard}
    >
      <View style={styles.submissionHeader}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.timestamp}>{formatDistanceToNow(item.createdAt, { addSuffix: true })}</Text>
        </View>
      </View>
      
      <Image source={{ uri: item.image }} style={styles.submissionImage} />
      
      <View style={styles.submissionFooter}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => toggleLike(item.id)}
          activeOpacity={0.7}
        >
          <Heart 
            size={22} 
            color={item.liked ? '#FF6B6B' : '#2C363F'} 
            fill={item.liked ? '#FF6B6B' : 'transparent'} 
          />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <MessageCircle size={22} color="#2C363F" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={submissions}
        keyExtractor={(item) => item.id}
        renderItem={renderSubmission}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#FF6B6B"
            colors={['#FF6B6B']}
          />
        }
        ListHeaderComponent={
          <Animated.View entering={FadeIn.delay(200).springify()}>
            <View style={styles.challengeCard}>
              <LinearGradient
                colors={['rgba(255, 107, 107, 0.8)', 'rgba(78, 205, 196, 0.8)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.challengeGradient}
              >
                <View style={styles.challengeContent}>
                  <Text style={styles.challengeTitle}>{CHALLENGE.title}</Text>
                  <Text style={styles.challengeDescription}>{CHALLENGE.description}</Text>
                  
                  <View style={styles.challengeStats}>
                    <View style={styles.timerContainer}>
                      <Clock size={16} color="#FFFFFF" />
                      <Text style={styles.timerText}>{timeLeft}</Text>
                    </View>
                    
                    <View style={styles.submissionsContainer}>
                      <Text style={styles.submissionsText}>
                        {CHALLENGE.submissions} submissions
                      </Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </View>
            
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Latest Submissions</Text>
            </View>
          </Animated.View>
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
  challengeCard: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  challengeGradient: {
    width: '100%',
    height: '100%',
  },
  challengeContent: {
    padding: 20,
  },
  challengeTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  challengeDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
    lineHeight: 22,
  },
  challengeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timerText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 6,
  },
  submissionsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  submissionsText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F7F7F7',
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: '#2C363F',
  },
  submissionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  submissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: 12,
  },
  userName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: '#2C363F',
  },
  timestamp: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#6C757D',
  },
  submissionImage: {
    width: '100%',
    height: width - 32, // Square image
    resizeMode: 'cover',
  },
  submissionFooter: {
    flexDirection: 'row',
    padding: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#2C363F',
    marginLeft: 6,
  },
});