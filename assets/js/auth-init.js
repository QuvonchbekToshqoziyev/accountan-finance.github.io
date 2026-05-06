import { initEmailAuth } from "./email-auth.js";
import { initEmailLinkAuth } from "./email-link-auth.js";

// Google auth allaqachon bor — unga tegmaymiz

document.addEventListener("DOMContentLoaded", () => {
  initEmailAuth();
  initEmailLinkAuth();
});
