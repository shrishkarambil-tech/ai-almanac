/* ============================================================
   AI ALMANAC — BEHAVIOR
   Renders everything from data.js. No network calls, no storage.
   ============================================================ */

(function () {
  "use strict";

  // ---------- helpers ----------
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function ticks(rating) {
    let out = '<span class="meter-ticks">';
    for (let i = 1; i <= 5; i++) {
      out += `<span class="tick${i <= rating ? " on" : ""}"></span>`;
    }
    out += "</span>";
    return out;
  }

  function catLabel(id) {
    const c = CATEGORIES.find((c) => c.id === id);
    return c ? c.label : id;
  }

  // ---------- 1. populate finder selects ----------
  const capSelect = document.getElementById("capabilitySelect");
  const audSelect = document.getElementById("audienceSelect");

  CATEGORIES.forEach((c) => {
    capSelect.appendChild(el("option", null, c.label)).value = c.id;
  });
  const anyAud = el("option", null, "Anyone (skip this)");
  anyAud.value = "";
  audSelect.appendChild(anyAud);
  AUDIENCES.forEach((a) => {
    audSelect.appendChild(el("option", null, a.label)).value = a.id;
  });

  // ---------- 2. finder logic ----------
  const finderForm = document.getElementById("finderForm");
  const finderResults = document.getElementById("finderResults");

  function runFinder(catId, audId) {
    const scored = TOOLS.map((t) => {
      const base = t.ratings[catId] || 1;
      const audMatch = audId && t.audiences.includes(audId);
      return { tool: t, score: base * 10 + (audMatch ? 3 : 0), base, audMatch };
    }).sort((a, b) => b.score - a.score);

    const top = scored.slice(0, 3);
    finderResults.innerHTML = "";

    if (top[0].base <= 1) {
      finderResults.appendChild(
        el("p", "finder-empty", `No tool in this directory is built for “${catLabel(catId)}.” Try a different capability.`)
      );
      return;
    }

    top.forEach((entry, i) => {
      const card = el("div", "match-card");
      card.appendChild(el("div", "match-rank", String(i + 1)));
      const mid = el("div", null,
        `<div class="match-name">${entry.tool.name} <span style="color:var(--ink-soft); font-weight:400;">— ${entry.tool.maker}</span></div>
         <p class="match-reason">${entry.tool.blurb}${entry.audMatch ? ` Commonly used by people in your role.` : ""}</p>`
      );
      card.appendChild(mid);
      card.appendChild(el("div", "match-score", `${catLabel(catId)}: ${entry.base}/5`));
      finderResults.appendChild(card);
    });

    if (audId) {
      finderResults.appendChild(el("p", "finder-empty", AUDIENCE_NOTES[audId] || ""));
    }
  }

  finderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    runFinder(capSelect.value, audSelect.value);
  });

  // show an initial result on load (Thinking / Anyone)
  runFinder(CATEGORIES[0].id, "");

  // ---------- 2b. prompt builder ----------
  const promptRole = document.getElementById("promptRole");
  const promptOutcome = document.getElementById("promptOutcome");
  const promptForm = document.getElementById("promptForm");
  const promptOutput = document.getElementById("promptOutput");
  const promptTextEl = document.getElementById("promptText");
  const copyPromptBtn = document.getElementById("copyPromptBtn");

  PROMPT_ROLES.forEach((r) => {
    promptRole.appendChild(el("option", null, r)).value = r;
  });
  OUTCOME_FORMATS.forEach((o) => {
    promptOutcome.appendChild(el("option", null, o.label)).value = o.id;
  });

  const promptRoleOther = document.getElementById("promptRoleOther");
  const promptOutcomeOther = document.getElementById("promptOutcomeOther");

  promptRole.addEventListener("change", () => {
    promptRoleOther.style.display = promptRole.value === "Other" ? "block" : "none";
  });
  promptOutcome.addEventListener("change", () => {
    promptOutcomeOther.style.display = promptOutcome.value === "other" ? "block" : "none";
  });

  const OUTCOME_PHRASES = {
    bullets: "Present the answer as clear, short bullet points.",
    short: "Present the answer as a short paragraph.",
    long: "Present the answer as a long, detailed paragraph, covering the topic thoroughly.",
    steps: "Present the answer as a numbered, step-by-step guide.",
    table: "Present the answer as a table.",
    essay: "Present the answer as a structured essay, with an introduction, body and conclusion.",
    qna: "Present the answer in a question-and-answer format.",
    email: "Present the answer as a ready-to-send email.",
    comparison: "Present the answer as a pros-and-cons comparison.",
    script: "Present the answer as a script or dialogue.",
  };

  promptForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let role = promptRole.value;
    if (role === "Other") {
      role = promptRoleOther.value.trim() || "the role I specify";
    }
    const task = document.getElementById("promptTask").value.trim();
    const outcomeId = promptOutcome.value;
    const wordLimit = document.getElementById("promptWordLimit").value;

    if (!task) {
      promptOutput.style.display = "block";
      promptTextEl.textContent = "Describe what you want the AI to do first — even a line or two is enough.";
      return;
    }

    let outcomePhrase;
    if (outcomeId === "other") {
      const custom = promptOutcomeOther.value.trim();
      outcomePhrase = custom ? `Present the answer as: ${custom}.` : "Present the answer in whatever format best fits.";
    } else {
      outcomePhrase = OUTCOME_PHRASES[outcomeId];
    }

    let prompt = `Act as a ${role}.\n\n${task}\n\n${outcomePhrase}`;
    if (wordLimit) {
      prompt += ` Keep it to about ${wordLimit} words.`;
    }

    promptTextEl.textContent = prompt;
    promptOutput.style.display = "block";
    promptOutput.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  copyPromptBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(promptTextEl.textContent).then(() => {
      copyPromptBtn.textContent = "Copied!";
      setTimeout(() => { copyPromptBtn.textContent = "Copy"; }, 1500);
    });
  });

  // ---------- 3. directory grid ----------
  const toolGrid = document.getElementById("toolGrid");

  TOOLS.forEach((t) => {
    const card = el("div", "tool-card");
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-expanded", "false");

    const ledgerRows = CATEGORIES.map(
      (c) => `<div class="tool-ledger-row"><span class="cat">${c.label}</span>${ticks(t.ratings[c.id])}</div>`
    ).join("");

    card.innerHTML = `
      <div class="tool-card-head">
        <span class="tool-name">${t.name}</span>
        <span class="tool-tier">${t.tier}</span>
      </div>
      <div class="tool-maker">${t.maker}</div>
      <p class="tool-blurb">${t.blurb}</p>
      <span class="tool-toggle">+ show full ledger</span>
      <div class="tool-ledger">${ledgerRows}
        <a class="tool-link" href="${t.link}" target="_blank" rel="noopener">Visit official site →</a>
      </div>
    `;

    function toggle() {
      const open = card.classList.toggle("open");
      card.setAttribute("aria-expanded", String(open));
      card.querySelector(".tool-toggle").textContent = open ? "− hide ledger" : "+ show full ledger";
    }
    card.addEventListener("click", (e) => {
      if (e.target.closest(".tool-link")) return; // let the link work normally
      toggle();
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });

    toolGrid.appendChild(card);
  });

  // ---------- 4. best-by-category matrix ----------
  const matrixBody = document.querySelector("#matrixTable tbody");

  CATEGORIES.forEach((c) => {
    const ranked = [...TOOLS].sort((a, b) => b.ratings[c.id] - a.ratings[c.id]);
    const [first, second] = ranked;
    const row = el("tr", null,
      `<td>${c.label}</td>
       <td class="pick-primary">${first.name} <span style="color:var(--ink-soft); font-weight:400;">(${first.ratings[c.id]}/5)</span></td>
       <td>${second.name} <span style="color:var(--ink-soft);">(${second.ratings[c.id]}/5)</span></td>`
    );
    matrixBody.appendChild(row);
  });

  // ---------- 5. static content lists from data.js ----------
  function fillList(id, items) {
    const list = document.getElementById(id);
    if (!list) return;
    items.forEach((text) => list.appendChild(el("li", null, text)));
  }

  fillList("impactNow", IMPACT_NOW);
  fillList("impactFuture", IMPACT_FUTURE);
  fillList("jobsNow", JOBS_REPLACING_NOW);
  fillList("jobsFuture", JOBS_REPLACING_FUTURE);
  fillList("jobsSafe", JOBS_SAFE);
  fillList("learningNow", LEARNING_NOW);
  fillList("learningFuture", LEARNING_FUTURE);
  fillList("useWell", USE_EFFECTIVELY);

  // ---------- 6. cursor-tilt depth effect ----------
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsHoverTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function applyTilt(selector, maxTilt, lift) {
    if (prefersReducedMotion || !supportsHoverTilt) return;
    document.querySelectorAll(selector).forEach((el) => {
      el.style.transformStyle = "preserve-3d";
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * maxTilt;
        const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * maxTilt;
        el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${lift}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  applyTilt(".tool-card", 6, 4);
  applyTilt(".ledger-card", 5, 3);
  applyTilt(".match-card", 4, 3);
  applyTilt(".audience-col, .jobs-col", 4, 3);
})();

/* ---------- Prompt builder (appended module) ---------- */
(function () {
  "use strict";
  const roleSelect = document.getElementById("actAsSelect");
  const outcomeSelect = document.getElementById("outcomeSelect");
  if (!roleSelect || !outcomeSelect) return; // section not on the page yet

  PROMPT_ROLES.forEach((r) => {
    const opt = document.createElement("option");
    opt.value = r; opt.textContent = r;
    roleSelect.appendChild(opt);
  });
  OUTCOME_FORMATS.forEach((f) => {
    const opt = document.createElement("option");
    opt.value = f.label; opt.textContent = f.label;
    outcomeSelect.appendChild(opt);
  });

  const form = document.getElementById("promptForm");
  const output = document.getElementById("promptOutput");
  const promptText = document.getElementById("promptText");
  const copyBtn = document.getElementById("copyPromptBtn");
  const taskInput = document.getElementById("taskInput");
  const wordLimitInput = document.getElementById("wordLimitInput");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const role = roleSelect.value;
    const task = taskInput.value.trim();
    const outcome = outcomeSelect.value;
    const wordLimit = wordLimitInput.value.trim();

    if (!task) {
      promptText.textContent = "Please describe what you want the AI to do first.";
      output.style.display = "block";
      return;
    }

    const prompt = `Act as a(n) ${role}.\n\n${task}\n\nPlease respond in ${outcome.toLowerCase()}${wordLimit ? `, within about ${wordLimit} words.` : "."}`;
    promptText.textContent = prompt;
    output.style.display = "block";
  });

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(promptText.textContent).then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => { copyBtn.textContent = "Copy"; }, 1500);
    });
  });
})();
