
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera, Image as ImageIcon, AlertCircle } from 'lucide-react-native';

type EmptyStateType = 'noSubmissions' | 'noChallenges' | 'error' | 'noPhotos';

interface EmptyStateProps {
  type: EmptyStateType;
  message?: string;
  subMessage?: string;
}

export function EmptyState({ type, message, subMessage }: EmptyStateProps) {
  const getIcon = () => {
    switch (type) {
      case 'noSubmissions':
        return <Camera size={48} color="#6C757D" />;
      case 'noChallenges':
        return <ImageIcon size={48} color="#6C757D" />;
      case 'error':
        return <AlertCircle size={48} color="#FF6B6B" />;
      case 'noPhotos':
        return <Camera size={48} color="#6C757D" />;
      default:
        return <AlertCircle size={48} color="#6C757D" />;
    }
  };

  const getDefaultMessage = () => {
    switch (type) {
      case 'noSubmissions':
        return 'No submissions yet';
      case 'noChallenges':
        return 'No challenges available';
      case 'error':
        return 'Something went wrong';
      case 'noPhotos':
        return 'No photos yet';
      default:
        return 'Nothing to see here';
    }
  };

  const getDefaultSubMessage = () => {
    switch (type) {
      case 'noSubmissions':
        return 'Be the first to submit a photo for this challenge!';
      case 'noChallenges':
        return 'Check back soon for new challenges';
      case 'error':
        return 'Please try again later';
      case 'noPhotos':
        return 'Start capturing moments for your challenges';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{getIcon()}</View>
      <Text style={styles.message}>{message || getDefaultMessage()}</Text>
      <Text style={styles.subMessage}>{subMessage || getDefaultSubMessage()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  iconContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  message: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#2C363F',
    marginBottom: 8,
    textAlign: 'center',
  },
  subMessage: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 20,
  },
});