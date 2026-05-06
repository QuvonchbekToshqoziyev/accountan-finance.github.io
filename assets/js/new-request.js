import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { sendToTelegram } from "./telegram.js";

const form = document.getElementById("newRequestForm");
const input = document.getElementById("requestText");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  const user = auth.currentUser;
  if (!user) return;

  // 🔹 Firestore (ASOSIY ISH – O‘ZGARMADI)
  await addDoc(collection(db, "support_requests"), {
    uid: user.uid,
    email: user.email,
    message: text,
    status: "new",
    createdAt: serverTimestamp()
  });

  // 🔔 Telegram NOTIFIKATSIYA (YANGI)
  sendToTelegram(
    `<b>📩 Yangi murojaat</b>\n\n` +
    `👤 ${user.email}\n` +
    `📝 ${text}`
  );

  input.value = "";
});
