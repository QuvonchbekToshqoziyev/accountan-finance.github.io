import { auth, db } from "./firebase.js";
import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const emailEl = document.getElementById("email");
const status = document.getElementById("status");

let uid = null;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  uid = user.uid;
  emailEl.textContent = "Google email: " + user.email;
});

document.getElementById("completeBtn").onclick = async () => {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const organization = document.getElementById("organization").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!firstName || !lastName || !organization || !phone) {
    status.textContent = "❗ Barcha maydonlarni to‘ldiring";
    status.style.color = "#ffb400";
    return;
  }

  await setDoc(doc(db, "users", uid), {
    firstName,
    lastName,
    organization,
    phone,
    createdAt: new Date()
  });

  location.href = "profile.html";
};
