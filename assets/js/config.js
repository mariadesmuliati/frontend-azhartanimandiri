// ================================================
// GANTI NILAI INI SESUAI SETUP KAMU
// ================================================

// URL Backend — ganti dengan URL Railway setelah deploy
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://backend-azhartanimandiri-production.up.railway.app/api'

// Firebase Config — copy dari Firebase Console
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBxTFGKZeMBdfv0tWBzZL7IxKzj5f39Pcg",
  authDomain: "azhar-tani-mandiri.firebaseapp.com",
  projectId: "azhar-tani-mandiri",
  storageBucket: "azhar-tani-mandiri.firebasestorage.app",
  messagingSenderId: "166962253863",
  appId: "1:166962253863:web:86f1aeda1ed1129b89be02"
};

