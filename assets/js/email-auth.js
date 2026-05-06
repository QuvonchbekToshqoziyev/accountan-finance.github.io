import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

export function initEmailAuth() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  document.getElementById("emailLogin")?.addEventListener("click", async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        emailInput.value,
        passwordInput.value
      );
      location.href = "/profile.html";
    } catch (e) {
      alert(e.message);
    }
  });

  document.getElementById("emailRegister")?.addEventListener("click", async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailInput.value,
        passwordInput.value
      );
      location.href = "/profile.html";
    } catch (e) {
      alert(e.message);
    }
  });
}
