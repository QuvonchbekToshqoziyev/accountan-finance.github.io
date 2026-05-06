if (window.innerWidth <= 768) {
  document.querySelectorAll('.text-set').forEach((el, i) => {
    if (i !== 0) el.style.display = 'none';
  });
}


// ============================
// PARTICLES
// ============================
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 10 + 's';
    p.style.animationDuration = 15 + Math.random() * 10 + 's';
    container.appendChild(p);
  }
}
createParticles();

// ============================
// MOBILE MENU
// ============================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// ============================
// HERO TEXT ROTATION
// ============================
const textSets = document.querySelectorAll('.text-set');
let currentIndex = 0;

function wrapText(el) {
  const text = el.textContent;
  el.innerHTML = text
    .split('')
    .map(
      (c, i) =>
        `<span class="char" style="animation-delay:${i * 0.04}s">${
          c === ' ' ? '&nbsp;' : c
        }</span>`
    )
    .join('');
}

textSets.forEach((set, i) => {
  const h1 = set.querySelector('h1');
  wrapText(h1);
  set.classList.toggle('active', i === 0);
});

setInterval(() => {
  textSets[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % textSets.length;
  textSets[currentIndex].classList.add('active');

  const h1 = textSets[currentIndex].querySelector('h1');
  wrapText(h1);
}, 4000);

function closeAlert() {
  const sticky = document.getElementById('sticky-alert');
  if (!sticky) return;

  sticky.style.display = 'none';
  localStorage.setItem('sticky-alert-dismissed', 'true');
}

window.closeAlert = closeAlert;

document.addEventListener("DOMContentLoaded", () => {

  // ===== NEWS =====
  fetch("https://sheetdb.io/api/v1/yozez32tnbpdj")
    .then(res => res.json())
    .then(data => {
      if (!data || data.length === 0) return;

      const newsList = document.getElementById("news-list");
      const sticky = document.getElementById("sticky-alert");
      const stickyText = document.getElementById("sticky-text");

      if (!newsList) return;

      const stickyDismissed = localStorage.getItem('sticky-alert-dismissed') === 'true';

      if (sticky && stickyText) {
        if (stickyDismissed) {
          sticky.style.display = 'none';
        }
      }

      const lastIndex = data.length - 1;
      const last = data[lastIndex];

      // sticky
      if (sticky && stickyText && !stickyDismissed) {
        stickyText.textContent = last.text;
        sticky.style.display = "block";
      }

      // news
      data.slice(0, lastIndex).reverse().forEach(item => {
        const div = document.createElement("div");
        div.className = "news-item";
        div.innerHTML = `
          <h4>${item.title}</h4>
          <p>${item.text}</p>
          <small>${item.date}</small><br>
          <a href="${item.link}" target="_blank">Batafsil</a>
        `;
        newsList.appendChild(div);
      });
    })
    .catch(err => console.error("NEWS ERROR:", err));

  // ===== CURRENCY =====
  fetch("https://cbu.uz/oz/arkhiv-kursov-valyut/json/")
    .then(res => res.json())
    .then(data => {
      const usd = data.find(v => v.Ccy === "USD");
      const eur = data.find(v => v.Ccy === "EUR");
      const rub = data.find(v => v.Ccy === "RUB");

      document.getElementById("usd").textContent = `USD: ${usd.Rate} so‘m`;
      document.getElementById("eur").textContent = `EUR: ${eur.Rate} so‘m`;
      document.getElementById("rub").textContent = `RUB: ${rub.Rate} so‘m`;
    })
    .catch(err => console.error("CURRENCY ERROR:", err));

});










