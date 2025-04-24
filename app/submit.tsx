
import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { Camera as CameraIcon, Image as ImageIcon, Check, X } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function SubmitScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Handle loading state
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  // Handle permission denied state
  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>Camera permission required</Text>
        <Text style={styles.permissionText}>
          We need camera access to let you take photos for the challenge.
        </Text>
        <TouchableOpacity 
          style={styles.permissionButton} 
          onPress={async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
          }}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
        setIsCameraActive(false);
      } else {
        setIsCameraActive(false);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture. Please try again.');
      setIsCameraActive(false);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const handleSubmit = () => {
    if (!photo) return;
    
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setPhoto(null);
      Alert.alert(
        'Success!',
        'Your photo has been submitted for today\'s challenge.',
        [{ text: 'OK' }]
      );
    }, 1500);
  };

  const resetPhoto = () => {
    setPhoto(null);
  };

  if (isCameraActive) {
    // Instead of rendering a Camera component, we'll launch the camera directly
    takePicture();
    return (
      <View style={styles.cameraLoadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.cameraLoadingText}>Opening camera...</Text>
      </View>
    );
  }

  if (photo) {
    return (
      <Animated.View 
        style={styles.previewContainer}
        entering={FadeIn.duration(300)}
      >
        <Image source={{ uri: photo }} style={styles.previewImage} />
        
        <View style={styles.previewControls}>
          <TouchableOpacity 
            style={[styles.previewButton, styles.cancelPreviewButton]} 
            onPress={resetPhoto}
            disabled={isSubmitting}
          >
            <X size={24} color="#FF6B6B" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.previewButton, styles.submitButton]} 
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Check size={24} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View 
        style={styles.challengeInfo}
        entering={SlideInUp.springify().delay(200)}
      >
        <LinearGradient
          colors={['rgba(255, 107, 107, 0.8)', 'rgba(78, 205, 196, 0.8)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.challengeGradient}
        >
          <Text style={styles.challengeTitle}>Urban Shadows</Text>
          <Text style={styles.challengeDescription}>
            Capture the interplay of light and shadow in an urban environment.
          </Text>
          <Text style={styles.challengeTimeRemaining}>11h 23m remaining</Text>
        </LinearGradient>
      </Animated.View>
      
      <Animated.View 
        style={styles.optionsContainer}
        entering={SlideInUp.springify().delay(300)}
      >
        <TouchableOpacity 
          style={styles.optionButton} 
          onPress={() => setIsCameraActive(true)}
        >
          <CameraIcon size={32} color="#FF6B6B" />
          <Text style={styles.optionText}>Take Photo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.optionButton} 
          onPress={pickImage}
        >
          <ImageIcon size={32} color="#4ECDC4" />
          <Text style={styles.optionText}>Choose from Gallery</Text>
        </TouchableOpacity>
      </Animated.View>
      
      <Text style={styles.helpText}>
        You can submit one photo per challenge. Make it count!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 16,
    justifyContent: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  permissionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: '#2C363F',
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  permissionButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  challengeInfo: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  challengeGradient: {
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
    marginBottom: 12,
    lineHeight: 22,
  },
  challengeTimeRemaining: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    height: 140,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#2C363F',
    marginTop: 12,
    textAlign: 'center',
  },
  helpText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
  },
  cameraLoadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraLoadingText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    marginTop: 16,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  previewImage: {
    width: '100%',
    height: '70%',
    borderRadius: 16,
    resizeMode: 'cover',
  },
  previewControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  previewButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cancelPreviewButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  submitButton: {
    backgroundColor: '#4ECDC4',
  },
});