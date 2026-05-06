import { auth, db } from "./firebase.js";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const list = document.getElementById("requests");

onAuthStateChanged(auth, (user) => {
  if (!user) return;

  const q = query(
    collection(db, "support_requests"),
    where("uid", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snap) => {
    list.innerHTML = "";

    if (snap.empty) {
      list.innerHTML = `
        <div class="chat-card" style="opacity:.6">
          Hozircha murojaatlar yo‘q
        </div>`;
      return;
    }

    snap.forEach(docSnap => {
      const d = docSnap.data();
      const id = docSnap.id;

      list.innerHTML += `
        <div class="chat-card">
          <div class="user-msg">${d.message}</div>
          <div class="status">Holat: ${d.status || "new"}</div>
          <div class="replies" id="replies-${id}"></div>
        </div>
      `;

      // admin javoblari
      onSnapshot(
        query(
          collection(db, "support_requests", id, "replies"),
          orderBy("createdAt")
        ),
        (rsnap) => {
          const box = document.getElementById(`replies-${id}`);
          if (!box) return;

          box.innerHTML = "";
          rsnap.forEach(r => {
            box.innerHTML += `
              <div class="admin-msg">${r.data().text}</div>
            `;
          });
        }
      );
    });
  });
});


/* =====================
   TELEGRAM NOTIFICATION
===================== */

// 🔴 O'ZINGNIKI BILAN ALMASHTIR
const TELEGRAM_BOT_TOKEN = "8444694860:AAHCOKSRgS7oSQQo8FysQSogt1B4V_PN70k";
const TELEGRAM_CHAT_ID = "1736401983";

// yangi xabarlarni 1 marta yuborish uchun
const notifiedRequests = new Set();

function sendTelegram(text) {
  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text
    })
  }).catch(err => console.error("Telegram error:", err));
}

// 🔔 yangi murojaatni kuzatish
onAuthStateChanged(auth, (user) => {
  if (!user) return;

  const qNotify = query(
    collection(db, "support_requests"),
    where("uid", "==", user.uid)
  );

  onSnapshot(qNotify, (snap) => {
    snap.docChanges().forEach(change => {
      if (change.type === "added") {
        const id = change.doc.id;
        const d = change.doc.data();

        if (notifiedRequests.has(id)) return;
        notifiedRequests.add(id);

        sendTelegram(
          `🆕 Yangi murojaat\n\n📩 ${d.message}\n\n👤 UID: ${user.uid}`
        );
      }
    });
  });
});
