import { auth } from "./firebase.js";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const actionCodeSettings = {
  url: window.location.origin + "/login.html",
  handleCodeInApp: true
};

export function initEmailLinkAuth() {
  const emailInput = document.getElementById("linkEmail");
  const status = document.getElementById("status");

  document.getElementById("sendLink")?.addEventListener("click", async () => {
    try {
      await sendSignInLinkToEmail(auth, emailInput.value, actionCodeSettings);
      localStorage.setItem("emailForSignIn", emailInput.value);
      status.textContent = "📩 Emailingizga kirish linki yuborildi";
    } catch (e) {
      alert(e.message);
    }
  });

  if (isSignInWithEmailLink(auth, window.location.href)) {
    const email = localStorage.getItem("emailForSignIn");
    if (email) {
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          localStorage.removeItem("emailForSignIn");
          location.href = "/profile.html";
        })
        .catch(err => alert(err.message));
    }
  }
}
