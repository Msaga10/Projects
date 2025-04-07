import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyASctW1CTB0vznayLe9xLLsNSgC3_DfDx4',
  authDomain: 'alot-657d4.firebaseapp.com',
  projectId: "alot-657d4",
  storageBucket: "alot-657d4.firebasestorage.app",
  messagingSenderId: "504490841580",
  appId: "1:504490841580:web:2b59e0f77414b77eee5cc9",
  measurementId: "G-X53M1K90PQ"
};

const app = initializeApp(firebaseConfig);
// Initialize messaging only if browser supports it
let messaging = null;
const initMessaging = async () => {
  try {
    const isSupportedResult = await isSupported();
    if (isSupportedResult) {
      messaging = getMessaging(app);
      
      // Handle foreground messages
      onMessage(messaging, (payload) => {
        console.log('Message received in foreground: ', payload);
        // You can show a custom notification here if needed
      });
    }
  } catch (error) {
    console.error('Firebase messaging not supported', error);
  }
};

// Initialize messaging
initMessaging();
export { messaging, app };