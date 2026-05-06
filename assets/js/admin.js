import { auth, db } from "./firebase.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const list = document.getElementById("requests");

onAuthStateChanged(auth, (user) => {
  if (!user) return;

  const q = query(
    collection(db, "support_requests"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snap) => {
    list.innerHTML = "";

    snap.forEach((docSnap) => {
      const d = docSnap.data();
      const id = docSnap.id;

      const div = document.createElement("div");
      div.className = "chat-card admin-card";

      div.innerHTML = `
        <div class="chat-head">
          <b>${d.email}</b>
          <small>${new Date(d.createdAt?.seconds * 1000).toLocaleString()}</small>
        </div>

        <div class="user-msg">${d.message}</div>

        <div class="replies" id="replies-${id}"></div>

        <div class="reply-box">
          <textarea id="reply-${id}" placeholder="Javob yozing..."></textarea>
          <button data-id="${id}">Yuborish</button>
        </div>
      `;

      list.appendChild(div);

      // replies ni live yuklaymiz
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

    // javob yuborish
    list.querySelectorAll("button").forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.id;
        const input = document.getElementById(`reply-${id}`);
        const text = input.value.trim();
        if (!text) return;

        await addDoc(
          collection(db, "support_requests", id, "replies"),
          {
            text,
            from: "admin",
            createdAt: serverTimestamp()
          }
        );

        input.value = "";
      };
    });
  });
});
