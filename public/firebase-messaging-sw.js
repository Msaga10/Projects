importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: 'AIzaSyASctW1CTB0vznayLe9xLLsNSgC3_DfDx4',
    authDomain: 'alot-657d4.firebaseapp.com',
    projectId: "alot-657d4",
    storageBucket: "alot-657d4.firebasestorage.app",
    messagingSenderId: "504490841580",
    appId: "1:504490841580:web:2b59e0f77414b77eee5cc9",
    measurementId: "G-X53M1K90PQ"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body || '',
    icon: payload.notification.icon || 'favicon.ico',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
