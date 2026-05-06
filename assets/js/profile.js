import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const ADMIN_EMAILS = ["boshqaishlaruch@gmail.com"];

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  document.getElementById("userEmail").textContent =
    "Google email: " + user.email;

  const snap = await getDoc(doc(db, "users", user.uid));
  if (snap.exists()) {
    const d = snap.data();
    document.getElementById("userName").textContent =
      `Ism: ${d.firstName || ""} ${d.lastName || ""}`;
    document.getElementById("userPhone").textContent =
      `Telefon: ${d.phone || ""}`;
    document.getElementById("userOrg").textContent =
      `Tashkilot: ${d.organization || "—"}`;
  }

  // ADMIN BUTTON
  if (ADMIN_EMAILS.includes(user.email)) {
    const adminBtn = document.getElementById("adminBtn");
    adminBtn.style.display = "block";
    adminBtn.onclick = () => location.href = "admin.html";
  }
});

document.getElementById("logoutBtn").onclick = async () => {
  await signOut(auth);
  location.href = "index.html";
};
