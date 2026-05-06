import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// URL dan request ID olish
const params = new URLSearchParams(window.location.search);
const requestId = params.get("id");

if (!requestId) {
  alert("Murojaat topilmadi");
  location.href = "my-requests.html";
}

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

auth.onAuthStateChanged(user => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  const repliesRef = collection(
    db,
    "support_requests",
    requestId,
    "replies"
  );

  const q = query(repliesRef, orderBy("createdAt"));

  // 🔴 REAL-TIME CHAT
  onSnapshot(q, snapshot => {
    messagesDiv.innerHTML = "";

    snapshot.forEach(doc => {
      const data = doc.data();

      const msg = document.createElement("div");
      msg.className =
        data.from === "admin"
          ? "chat-msg admin"
          : "chat-msg user";

      msg.textContent = data.text;
      messagesDiv.appendChild(msg);
    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });

  // ➕ MIJOZ XABAR YUBORISH
  sendBtn.onclick = async () => {
    const text = input.value.trim();
    if (!text) return;

    await addDoc(repliesRef, {
      text,
      from: "user",
      createdAt: serverTimestamp()
    });

    input.value = "";
  };
});
