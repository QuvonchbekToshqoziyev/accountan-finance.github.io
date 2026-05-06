// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCtnXY6BcQ0YmOS3E_SFj0BLnzb4-ISe2c",
  authDomain: "accountan-finance.firebaseapp.com",
  projectId: "accountan-finance",
  storageBucket: "accountan-finance.appspot.com",
  messagingSenderId: "1057932521410",
  appId: "1:1057932521410:web:19183a86b5a4721db2f05b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // 🔥 ENG MUHIM QATOR
