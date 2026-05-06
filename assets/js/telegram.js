
// telegram.js
const BOT_TOKEN = "8444694860:AAHCOKSRgS7oSQQo8FysQSogt1B4V_PN70k";
const CHAT_ID = "1736401983";

export function sendTelegram(text) {
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML"
    })
  }).catch(err => console.error("Telegram error:", err));
}
