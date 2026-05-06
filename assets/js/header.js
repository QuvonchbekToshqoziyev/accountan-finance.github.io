// js/header.js

auth.onAuthStateChanged(user => {
  const loginBtn = document.getElementById("nav-login");
  const profileBtn = document.getElementById("nav-profile");

  if (!loginBtn || !profileBtn) return;

  if (user) {
    loginBtn.style.display = "none";
    profileBtn.style.display = "inline-block";
  } else {
    loginBtn.style.display = "inline-block";
    profileBtn.style.display = "none";
  }
});
