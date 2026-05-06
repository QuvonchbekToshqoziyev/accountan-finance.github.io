import { auth, db } from "./firebase.js";

import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const organizationInput = document.getElementById("organization");
const phoneInput = document.getElementById("phone");
const statusText = document.getElementById("status");
const saveBtn = document.getElementById("saveProfile");

let currentUserId = null;

// 🔐 Login tekshirish + eski ma'lumotlarni yuklash
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  currentUserId = user.uid;

  const snap = await getDoc(doc(db, "users", currentUserId));
  if (snap.exists()) {
    const d = snap.data();
    firstNameInput.value = d.firstName || "";
    lastNameInput.value = d.lastName || "";
    organizationInput.value = d.organization || "";
    phoneInput.value = d.phone || "";
  }
});

// 💾 Saqlash
saveBtn.addEventListener("click", async () => {
  if (!currentUserId) return;

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const organization = organizationInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!firstName || !phone) {
    statusText.textContent = "Ism va telefon majburiy!";
    statusText.style.color = "orange";
    return;
  }

  try {
    await setDoc(
      doc(db, "users", currentUserId),
      {
        firstName,
        lastName,
        organization,
        phone
      },
      { merge: true } // 🔥 ASOSIY YECHIM SHU
    );

    statusText.textContent = "✅ Saqlandi";
    statusText.style.color = "#00ff9c";

    setTimeout(() => {
      window.location.href = "profile.html";
    }, 800);

  } catch (err) {
    statusText.textContent = "❌ Xatolik yuz berdi";
    statusText.style.color = "red";
    console.error(err);
  }
});
