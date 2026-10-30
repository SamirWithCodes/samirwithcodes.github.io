// ================= 1) TYPING ANIMATION (HERO) =================
const phrases = [
  "python analyze_dna.py",
  "git commit -m 'new project'",
  "nmap --secure ./my-skills",
  "echo 'Hello, World!'"
];
const el = document.getElementById("typing");
let p = 0, c = 0, deleting = false;

function type() {
  const text = phrases[p];
  el.textContent = text.slice(0, c);
  if (!deleting && c < text.length) { c++; setTimeout(type, 80); }
  else if (!deleting) { deleting = true; setTimeout(type, 1400); }
  else if (c > 0) { c--; setTimeout(type, 40); }
  else { deleting = false; p = (p + 1) % phrases.length; setTimeout(type, 400); }
}
type();

// ================= 2) FLOATING DNA LETTERS BACKGROUND =================
const canvas = document.getElementById("dna-bg");
const ctx = canvas.getContext("2d");
function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
resize();
addEventListener("resize", resize);

const bases = ["A", "T", "G", "C"];
const colors = { A: "#00ffa3", T: "#4da3ff", G: "#ffd166", C: "#ff6b9d" };
const letters = Array.from({ length: 60 }, () => ({
  x: Math.random() * innerWidth,
  y: Math.random() * innerHeight,
  s: Math.random() * 0.6 + 0.2,
  b: bases[Math.floor(Math.random() * 4)],
  size: Math.random() * 14 + 12
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  letters.forEach(l => {
    ctx.font = l.size + "px monospace";
    ctx.fillStyle = colors[l.b];
    ctx.globalAlpha = 0.18;
    ctx.fillText(l.b, l.x, l.y);
    l.y += l.s;
    if (l.y > canvas.height + 20) { l.y = -20; l.x = Math.random() * canvas.width; }
  });
  requestAnimationFrame(animate);
}
animate();

// ================= 3) MOBILE MENU =================
const menuBtn = document.getElementById("menuBtn");
const links = document.querySelector(".links");
menuBtn.addEventListener("click", () => links.classList.toggle("open"));
links.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => links.classList.remove("open"))
);

// ================= 4) SCROLL FADE-IN ANIMATION =================
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.15 });
document.querySelectorAll("section").forEach(s => observer.observe(s));

// ================= 5) BACK TO TOP BUTTON =================
const toTop = document.getElementById("toTop");
addEventListener("scroll", () => {
  toTop.style.display = scrollY > 400 ? "flex" : "none";
});