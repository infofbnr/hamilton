// app.js
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const exists = (sel) => document.querySelector(sel) !== null;
const CONNECT_LIMIT = 5;
const CONNECT_KEY = "connect_usage";

const DATA = window.HAMILT_DATA;
const characterImages = {
  "Hamilton": "/images/characters/hamilton.jpg",
  "Burr": "/images/characters/burr.jpg",
  "Eliza": "/images/characters/eliza.jpg",
  "Angelica": "/images/characters/angelica.png",
  "Washington": "/images/characters/washington.jpg",
  "Jefferson": "/images/characters/jefferson.jpg"
};
function canAttemptConnect() {
  const today = new Date().toISOString().slice(0, 10);
  const data = JSON.parse(localStorage.getItem(CONNECT_KEY) || "{}");

  if (data.date !== today) return true;
  return (data.count || 0) < CONNECT_LIMIT;
}

function incrementConnectUsage() {
  const today = new Date().toISOString().slice(0, 10);
  let data = JSON.parse(localStorage.getItem(CONNECT_KEY) || "{}");

  if (data.date !== today) {
    data = { date: today, count: 0 };
  }

  data.count++;
  localStorage.setItem(CONNECT_KEY, JSON.stringify(data));
}

function remainingConnects() {
  const today = new Date().toISOString().slice(0, 10);
  const data = JSON.parse(localStorage.getItem(CONNECT_KEY) || "{}");

  if (data.date !== today) return CONNECT_LIMIT;
  return Math.max(0, CONNECT_LIMIT - (data.count || 0));
}

// ==================== NAV ====================
$$(".navBtn").forEach(btn => {
  const target = btn.getAttribute("data-jump");
  if (!target) return;
  btn.addEventListener("click", () => {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ==================== HOME ====================
if (exists("#rotatingQuote") && exists("#newQuoteBtn")) {
  let quoteIdx = Math.floor(Math.random() * DATA.quotes.length);

  function setQuote(i){
    const q = DATA.quotes[i];
    $("#rotatingQuote").textContent = q.line;
    $("#quoteFrom").textContent = `— ${q.from}`;
  }

  $("#newQuoteBtn").addEventListener("click", () => {
    quoteIdx = (quoteIdx + 1) % DATA.quotes.length;
    setQuote(quoteIdx);
  });

  setQuote(quoteIdx);
}

if (exists("#statEvents")) {
  $("#statEvents").textContent = String(DATA.history.length);
}
if (exists("#statLyrics")) {
  $("#statLyrics").textContent = String(DATA.lyricsToLife.length);
}
if (exists("#statArchetypes")) {
  $("#statArchetypes").textContent = String(Object.keys(DATA.quiz.results).length);
}

// ==================== HISTORY ====================
if (exists("#historyGrid")) {
  const historyGrid = $("#historyGrid");
  const historySearch = $("#historySearch");
  const historyFilter = $("#historyFilter");

  if (historyFilter) {
    const themes = [...new Set(DATA.history.map(h => h.theme))].sort();
    themes.forEach(t => {
      const opt = document.createElement("option");
      opt.value = t;
      opt.textContent = t;
      historyFilter.appendChild(opt);
    });
  }

  function historyCard(e){
    const d = document.createElement("div");
    d.className = "card";

    const quote = Array.isArray(e.quotePool)
      ? e.quotePool[Math.floor(Math.random() * e.quotePool.length)]
      : "";

    const parallels = (e.parallels || []).map(p => `<li>${escapeHtml(p)}</li>`).join("");

    d.innerHTML = `
      <div class="cardTop">
        <div class="cardTitle">${escapeHtml(e.title)}</div>
        <div class="chip">${escapeHtml(e.theme)}</div>
      </div>
      <div class="cardLine">“${escapeHtml(quote)}”</div>
      <div class="cardText">${escapeHtml(e.summary)}</div>
      <div class="cardText">
        <b>Parallels:</b>
        <ul class="bullets">${parallels}</ul>
      </div>
    `;
    return d;
  }

  function renderHistory(){
    const q = (historySearch?.value || "").toLowerCase();
    const theme = historyFilter?.value || "all";

    const items = DATA.history.filter(e => {
      const matchesTheme = theme === "all" || e.theme === theme;
      const blob = `${e.title} ${e.summary} ${(e.tags||[]).join(" ")}`.toLowerCase();
      return matchesTheme && (!q || blob.includes(q));
    });

    historyGrid.innerHTML = "";
    items.forEach(e => historyGrid.appendChild(historyCard(e)));

    if (!items.length){
      historyGrid.innerHTML = `
        <div class="card">
          <div class="cardTitle">No matches</div>
          <div class="cardText">Try another keyword or theme.</div>
        </div>`;
    }
  }

  historySearch?.addEventListener("input", renderHistory);
  historyFilter?.addEventListener("change", renderHistory);
  renderHistory();
}

// ==================== LYRICS → LIFE ====================
if (exists("#lyricsGrid")) {
  const grid = $("#lyricsGrid");

  grid.innerHTML = DATA.lyricsToLife.map(item => `
    <div class="lyricCard">

      <div class="lyricLines">
        ${item.lines.map(l => `
          <div class="lyricLine">“${escapeHtml(l)}”</div>
        `).join("")}
      </div>

      <div class="lyricIdea">
        ${escapeHtml(item.idea)}
      </div>

      <div class="lyricApply">
        ${escapeHtml(item.apply)}
      </div>

      <div class="lyricDo">
        <div class="lyricDoTitle">Try this:</div>
        <ul>
          ${item.doThis.map(d => `<li>${escapeHtml(d)}</li>`).join("")}
        </ul>
      </div>

    </div>
  `).join("");
}

// ==================== MODERN ====================
if (exists("#modernGrid")) {
  const modernGrid = $("#modernGrid");

  DATA.modern.forEach(m => {
    const d = document.createElement("div");
    d.className = "card";
    d.innerHTML = `
      <div class="cardTop">
        <div class="cardTitle">${escapeHtml(m.title)}</div>
        <div class="chip">${escapeHtml(m.theme)}</div>
      </div>
      <div class="cardLine">“${escapeHtml(m.quote)}”</div>
      <div class="cardText">${escapeHtml(m.text)}</div>
    `;
    modernGrid.appendChild(d);
  });
}

// ==================== QUIZ ====================
if (exists("#quizCard")) {
  const quizCard = $("#quizCard");
  const quizResult = $("#quizResult");

  let quizIndex = 0;
  let quizScores = {};

  function resetQuiz(){
    quizIndex = 0;
    quizScores = {};

    // CLEAR RESULT CONTENT
    $("#resultName").textContent = "";
    $("#resultQuote").textContent = "";
    $("#resultStrengths").innerHTML = "";
    $("#resultFlaws").innerHTML = "";
    $("#resultExplain").textContent = "";

    // TOGGLE VISIBILITY
    quizResult.classList.add("hidden");
    quizCard.classList.remove("hidden");

    renderQuestion();
  }


  function renderQuestion(){
    const q = DATA.quiz.questions[quizIndex];
    quizCard.innerHTML = `
      <div class="qTitle">${escapeHtml(q.title)}</div>
      <div class="qSub">${escapeHtml(q.subtitle)}</div>
      <div class="answerGrid">
        ${q.answers.map((a,i)=>`<button class="answerBtn" data-i="${i}">${escapeHtml(a.text)}</button>`).join("")}
      </div>
    `;

    $$(".answerBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const ans = q.answers[btn.dataset.i];
        for (const k in ans.scores){
          quizScores[k] = (quizScores[k] || 0) + ans.scores[k];
        }
        quizIndex++;
        quizIndex >= DATA.quiz.questions.length ? showResult() : renderQuestion();
      });
    });
  }

  function showResult(){
    const winner = Object.keys(DATA.quiz.results)
      .reduce((a,b)=> (quizScores[a]||0) > (quizScores[b]||0) ? a : b);
    const img = $("#resultImage");

    if (img && characterImages[winner]) {
      img.src = characterImages[winner];
      img.alt = winner;
    } else if (img) {
      img.src = "";
      img.alt = "";
    }

    const r = DATA.quiz.results[winner];
    const quote = r.quotes[Math.floor(Math.random() * r.quotes.length)];

    $("#resultName").textContent = winner;
    $("#resultQuote").textContent = `“${quote}”`;
    $("#resultStrengths").innerHTML = r.strengths.map(x=>`<li>${escapeHtml(x)}</li>`).join("");
    $("#resultFlaws").innerHTML = r.flaws.map(x=>`<li>${escapeHtml(x)}</li>`).join("");
    $("#resultExplain").textContent = r.explain;

    quizCard.classList.add("hidden");
    quizResult.classList.remove("hidden");

    const retake = $("#retakeBtn");
    if (retake) {
      retake.onclick = resetQuiz;
    }
    const shareBtn = $("#shareBtn");

    if (shareBtn) {
      shareBtn.onclick = () => {
        const shareText = `
I got *${winner}* on the HamilVerse Hamilton quiz.

"${quote}"

Strengths:
${r.strengths.map(s => "• " + s).join("\n")}

Flaws:
${r.flaws.map(f => "• " + f).join("\n")}

Take the quiz:
${location.origin}/quiz
        `.trim();

        navigator.clipboard.writeText(shareText)
          .then(() => {
            shareBtn.textContent = "Copied!";
            setTimeout(() => {
              shareBtn.textContent = "Share result";
            }, 1500);
          })
          .catch(() => {
            alert("Could not copy. Try manually.");
          });
      };
    }

  }

  resetQuiz();
}

// ==================== FUN ====================
if (exists("#dayInput")) {
  const dayInput = $("#dayInput");
  const dayOutput = $("#dayOutput");

  $("#dayBtn")?.addEventListener("click", () => translate(dayInput.value));

  function translate(text){
    const match = DATA.dayTranslator.find(r => r.test(text));
    const fallback = { line:"History has its eyes on you.", explain:"Your choices matter." };
    const r = match || fallback;

    showOutput(dayOutput, r.line, r.explain);
  }
}

if (exists("#moodRow")) {
  const moodRow = $("#moodRow");
  const moodOutput = $("#moodOutput");

  DATA.moods.forEach(m => {
    const b = document.createElement("button");
    b.className = "pill";
    b.textContent = m.mood;
    b.onclick = () => {
      const line = m.picks[Math.floor(Math.random() * m.picks.length)];
      showOutput(moodOutput, line, m.explain);
    };
    moodRow.appendChild(b);
  });
}

// ==================== HELPERS ====================
function shuffleInPlace(arr){
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
if (exists("#connectBtn")) {
  const input = $("#connectInput");
  const out = $("#connectOutput");
  const limitText = $("#connectLimit");
  if (limitText) {
    limitText.textContent = `${remainingConnects()} connections left today`;
  }

$("#connectBtn").addEventListener("click", async () => {
  if (!canAttemptConnect()) {
    out.textContent =
      "Daily limit reached (5 connections per day). Come back tomorrow.";
    out.classList.remove("hidden");
    return;
  }

  const btn = $("#connectBtn");
  btn.disabled = true;

  try {
    await connectToHamilton(); // just runs the API
    incrementConnectUsage();   // ✅ count only AFTER success

    if (limitText) {
      limitText.textContent = `${remainingConnects()} connections left today`;
    }

  } catch (err) {
    // connectToHamilton already shows error text
    console.error(err);
  } finally {
    btn.disabled = false;
  }
});




  $("#randomBtn")?.addEventListener("click", () => {
    const prompts = ["Veronica Sawyer", "Chess", "Napoleon", "Minecraft", "Chocolate", "DDR5 RAM"];
    input.value = prompts[Math.floor(Math.random()*prompts.length)];
    input.focus();
  });

  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") $("#connectBtn").click();
  });
}
function showOutput(el, line, explain){
  el.classList.remove("hidden");
  el.innerHTML = `
    <div class="outputLine">${escapeHtml(line)}</div>
    <div class="outputExplain">${escapeHtml(explain)}</div>
  `;
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
// Simple XOR Obfuscation
function xorObfuscate(data, key) {
    return data.split('').map((char, i) => String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))).join('');
}

// Base64 Decode Function
function base64Decode(data) {
    return atob(data);
}

function canUseConnect() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  let data = JSON.parse(localStorage.getItem(CONNECT_KEY) || "{}");

  // reset if new day
  if (data.date !== today) {
    data = { date: today, count: 0 };
  }

  if (data.count >= CONNECT_LIMIT) {
    return false;
  }

  data.count++;
  localStorage.setItem(CONNECT_KEY, JSON.stringify(data));
  return true;
}

function remainingConnects() {
  const today = new Date().toISOString().slice(0, 10);
  const data = JSON.parse(localStorage.getItem(CONNECT_KEY) || "{}");

  if (data.date !== today) return CONNECT_LIMIT;
  return Math.max(0, CONNECT_LIMIT - (data.count || 0));
}
// Simple Decoding Function
function simpleDecode(encodedKey) {
    const decodedKey = base64Decode(encodedKey);  // Base64 decode
    const xorKey = 'simplekey';                   // Simple XOR key for obfuscation
    return xorObfuscate(decodedKey, xorKey);      // Reverse the XOR obfuscation
}


// Example encoded key from Python for decoding
const encodedKey = "AAJAAB4KAUg6KyxdFV4uPx89HThZAzMWXBABCRgDQFkmCS5KIAI7OAQHOSAJQlsUQCI/Gg4YHS89AQY6OScSGlgePhwuLCcPGi4yKQYAH1EuIj1eMgAHACMzMhkuAQ43BR9KGDhVERwpJQo3LAw5FDgyLxQDKiEsQzsSKlcvCjMPGAULL1c+O18HJTkyGDc7SxEYQQspCQY7LDk7FwE9X1c4ECg=" ;
const apiKey = simpleDecode(encodedKey);
async function connectToHamilton() {
  const inputEl = document.getElementById("connectInput");
  const outputEl = document.getElementById("connectOutput");
  const btn = document.getElementById("connectBtn");

  const topic = inputEl.value.trim();
  if (!topic) {
    outputEl.innerText = "Type something first.";
    return;
  }

  btn.disabled = true;
  outputEl.innerText = "Building the connection…";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}` // ⚠️ frontend key
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: `You are a classification engine.

Task:
Connect the given topic to the musical Hamilton using a logical category chain.

STRICT RULES:
- Output ONLY the chain
- Use the arrow symbol " → "
- Each step must be a SHORT DESCRIPTIVE PHRASE (2-5 words)
- Use as little steps as possible, but not little enough to skip logical connections.
- End the chain with "Hamilton". Only the musical, not the actual person.
- No explanations
- No metaphors
- No vague cultural jumps (e.g. "food culture", "general culture")
- No maximum number of steps, just make sure the chain is logical and complete.
- Capitalize proper nouns only

Example:
Veronica Sawyer → fictional musical character → Broadway stage productions → Hamilton

Now connect:
{TOPIC}

`
          },
          {
            role: "user",
            content: topic
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok || !data.choices) {
      throw new Error("OpenAI error");
    }

    const chain = data.choices[0].message.content.trim();
    outputEl.innerText = chain;
    outputEl.classList.remove("hidden");

    return true;
  } catch (err) {
    console.error(err);
    outputEl.innerText = "Could not build connection. Try again.";
    throw err;
  } finally {
    btn.disabled = false;
  }
}
