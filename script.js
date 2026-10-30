/* ====== EDIT THIS PART ====== */
const CONFIG = {
  her: "Rancy", // her name or nickname
  me: "Sue", // your name, shown at the end of the letter
  photos: [
    // photo files go in the images/ folder
    ["images/photo1.jpeg", "Cutesy"],
    ["images/photo2.jpeg", "Beautiful"],
    ["images/photo3.jpeg", "Sexy"],
    ["images/photo4.jpeg", "Hot"],
    ["images/photo5.jpeg", "Dope"],
    ["images/photo6.jpeg", "More to come..."],
  ],
  letter: [
    "{her}, I don't say this enough, so I'm saying it properly now.",
    "Do you remember when my clothes got lost and I was too afraid to follow up? I kept telling myself I would go tomorrow. I didn't have the courage to stand up for myself. You did it for me. You walked in, spoke up, and did not stop until I had my things back.",
    "You have probably forgotten that day. I never will. It was never about the clothes. It was the first time I felt what it is like to have someone in my corner, someone who sees you struggling and simply steps in.",
    "That is who you are. Kind without making noise about it. Brave on behalf of the people you love. You made me braver, and I am still learning from you.",
    "Thank you for being exactly who you are. My life is better with you in it.",
  ],
  wishes: [
    "May you always have people who stand up for you the way you stand up for others.",
    "May your health be strong and your days be light.",
    "May every door you knock on open.",
    "May your dreams get so big they scare you, and may you chase them anyway.",
    "May money find you and peace stay with you.",
    "May you laugh so hard this year that your stomach hurts.",
    "May love, the real kind, find you and treat you the way you deserve.",
    "May God cover you and your family with favour.",
    "May you never shrink yourself for anyone.",
    "May this new chapter be your best one yet.",
  ],
  final: [
    "{her}, here is what I want you to know.",
    "You are loved. Not for what you do, but for who you are.",
    "The world is softer, kinder and funnier because you are in it. People are braver because of you. I am braver because of you.",
    "You are not lucky to be alive. We are lucky to have you.",
    "Happy Birthday, {her}. ❤️",
    "Forever your friend, {me}",
  ],
  prayerTitle: "BUT WAIT... 😂 My final birthday prayer for you! 💅🏽",
  prayer: [
    "Dear Birthday Girl,",
    "May God bless you abundantly.",
    "May your bank account never know the meaning of insufficient funds.",
    "May you own businesses, houses, hotels and all the beautiful things this world has to offer.",
    "May you become so rich that choosing between a Range Rover and a Mercedes becomes your biggest problem.",
    "AND MOST IMPORTANTLY...",
    "May you never forget your humble friend (ME 😂), who deserves VIP treatment, unlimited shopping trips and free rides wherever she wants to go.",
    'I don\'t want to hear "let\'s use a matatu." I want to hear "Madam, the car is outside." 😭😂',
    "Love you loads, future billionaire! ❤️",
    "HAPPY BIRTHDAY, RICH FRIEND! 🥂",
    "Your future personal passenger has spoken. 😂",
  ],
};
/* ====== END OF EDIT ====== */

const $ = (s) => document.querySelector(s),
  sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const fill = (t) => t.replace(/{her}/g, CONFIG.her).replace(/{me}/g, CONFIG.me);
document.title = "A birthday surprise for " + CONFIG.her;
document.querySelectorAll(".name").forEach((n) => (n.textContent = CONFIG.her));

let blown = false;
const song = $("#song"),
  mute = $("#mute");
mute.onclick = () => {
  const a = blown ? $("#finalSong") : song;
  if (a.paused) {
    a.play().catch(() => {});
    mute.classList.remove("off");
  } else {
    a.pause();
    mute.classList.add("off");
  }
};

let cur = 0;
function go(n) {
  document
    .querySelectorAll(".page")
    .forEach((p, i) => p.classList.toggle("active", i === n));
  cur = n;
  document.querySelectorAll(".page")[n].scrollTop = 0;
  if (n === 1) {
    burst();
    hearts(true);
  }
  if (n === 3) revealLetter();
  if (n === 5) hearts(true);
}
document
  .querySelectorAll(".next")
  .forEach((b) => (b.onclick = () => go(cur + 1)));

/* Page 1 */
$("#open").onclick = async () => {
  $("#env").classList.add("open");
  $("#open").hidden = true;
  song.play().catch(() => {});
  mute.hidden = false;
  await sleep(1900);
  go(1);
};

/* Page 3 */
$("#grid").innerHTML = CONFIG.photos
  .map(
    ([src, cap], i) =>
      `<div class="polaroid" style="--r:${[-3, 2, -2, 3, 2, -3][i % 6]}deg"><img src="${src}" alt="" onerror="this.outerHTML='<div class=ph>Add ${src.split("/")[1]} to the images folder</div>'"><p>${cap}</p></div>`,
  )
  .join("");

/* Page 4 */
$("#letter").innerHTML =
  CONFIG.letter.map((t) => `<p>${fill(t)}</p>`).join("") +
  `<p class="sig">With all my love,<br>${CONFIG.me}</p>`;
async function revealLetter() {
  const ps = document.querySelectorAll("#letter p");
  for (const p of ps) {
    await sleep(1800);
    if (cur !== 3) return;
    p.classList.add("show");
    p.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  await sleep(1500);
  $("#lnext").hidden = false;
}

/* Page 5 */
let w = 0;
$("#wbtn").onclick = () => {
  const li = document.createElement("li");
  li.textContent = w + 1 + ". " + CONFIG.wishes[w];
  $("#wishes").appendChild(li);
  li.scrollIntoView({ behavior: "smooth", block: "center" });
  w++;
  if (w < CONFIG.wishes.length)
    $("#wbtn").textContent = "Reveal wish " + (w + 1);
  else {
    $("#wbtn").hidden = true;
    $("#wnext").hidden = false;
    burst();
  }
};

/* Page 6 */
$("#cake").onclick = async () => {
  if (blown) return;
  blown = true;
  if ($("#finalSong").networkState !== 3) {
    song.pause();
    $("#finalSong")
      .play()
      .catch(() => song.play());
  }
  $("#cake").classList.add("out");
  $("#hint").hidden = true;
  burst();
  await sleep(400);
  burst();
  const f = $("#final");
  f.hidden = false;
  f.innerHTML = CONFIG.final
    .map(
      (t, i) =>
        `<p class="${i === CONFIG.final.length - 2 ? "big" : ""}">${fill(t)}</p>`,
    )
    .join("");
  for (const p of f.querySelectorAll("p")) {
    await sleep(2200);
    p.classList.add("show");
    p.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  await sleep(2500);
  const pr = $("#prayer");
  pr.hidden = false;
  pr.innerHTML =
    `<h3>${CONFIG.prayerTitle}</h3>` +
    CONFIG.prayer.map((t) => `<p>${fill(t)}</p>`).join("");
  burst();
  for (const p of pr.querySelectorAll("p")) {
    await sleep(1900);
    p.classList.add("show");
    p.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  await sleep(1500);
  const cb = $("#carBox");
  if (cb) {
    cb.hidden = false;
    cb.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  burst();
};

/* Effects */
function hearts(on) {
  clearInterval(hearts.t);
  if (!on) return;
  hearts.t = setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = ["❤️", "💖", "✨", "🎈"][(Math.random() * 4) | 0];
    h.style.cssText = `left:${Math.random() * 100}%;font-size:${14 + Math.random() * 22}px;animation-duration:${6 + Math.random() * 6}s`;
    $("#hearts").appendChild(h);
    setTimeout(() => h.remove(), 12000);
  }, 450);
}
const cv = $("#fx"),
  cx = cv.getContext("2d");
let bits = [];
function size() {
  cv.width = innerWidth;
  cv.height = innerHeight;
}
size();
addEventListener("resize", size);
function burst() {
  const cols = ["#f06a8d", "#f6cf7b", "#fff", "#8fd3ff", "#b99cff"];
  for (let i = 0; i < 140; i++)
    bits.push({
      x: cv.width / 2,
      y: cv.height / 3,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -13 - 3,
      s: 4 + Math.random() * 6,
      c: cols[i % 5],
      r: Math.random() * 6,
    });
  if (bits.length === 140) tick();
}
function tick() {
  cx.clearRect(0, 0, cv.width, cv.height);
  bits.forEach((b) => {
    b.x += b.vx;
    b.y += b.vy;
    b.vy += 0.3;
    b.r += 0.2;
    cx.fillStyle = b.c;
    cx.save();
    cx.translate(b.x, b.y);
    cx.rotate(b.r);
    cx.fillRect(-b.s / 2, -b.s / 2, b.s, b.s * 0.6);
    cx.restore();
  });
  bits = bits.filter((b) => b.y < cv.height + 20);
  if (bits.length) requestAnimationFrame(tick);
  else cx.clearRect(0, 0, cv.width, cv.height);
}
