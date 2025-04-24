
// Challenge Types
export interface Challenge {
  id: string;
  title: string;
  description: string;
  expiresAt: Date;
  submissions: number;
  image?: string;
  active?: boolean;
  date?: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  username?: string;
  avatar: string;
  bio?: string;
  stats?: {
    submissions: number;
    streak: number;
    likes: number;
  };
}

// Submission Types
export interface Submission {
  id: string;
  user: User;
  image: string;
  likes: number;
  comments: number;
  createdAt: Date;
  liked: boolean;
  challenge?: string;
  date?: string;
}

// Context Types
export interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  currentChallenge: Challenge | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  submitPhoto: (photoUri: string, challengeId: string) => Promise<void>;
  likeSubmission: (submissionId: string) => Promise<void>;
}