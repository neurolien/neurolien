import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebaseConfig';

// Initialize Firebase
export const initFirebase = () => {
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const auth = getAuth(app);
 return { app, analytics, auth }
}