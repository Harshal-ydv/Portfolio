"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { about } from "@/content/about";
import { certifications } from "@/content/certifications";
import { education, experience, achievements } from "@/content/experience";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import { contact, enabledMoodIds, moodPreviews } from "@/content/moods";
import { site } from "@/content/site";
import { developerMood } from "@/content/moods/developer";
import { navItems, type PageKey } from "@/core/nav";

type PanelTab = "terminal" | "problems" | "output" | "ports";
type Activity = "explorer" | "search" | "source" | "run" | "moods";

const pageFiles: Record<PageKey, string> = {
  about: "about.md",
  skills: "skills.ts",
  projects: "projects.tsx",
  certifications: "certs.yml",
  experience: "experience.json",
  moods: "moods/",
  contact: "contact.sh",
};
const fileKind = (page: PageKey) => page === "moods" ? "DIR" : pageFiles[page].split(".").pop()?.toUpperCase() ?? "FILE";

const terminalCommands = ["help", "whoami", "skills", "projects", "certs", "experience", "bugs", "debug", "contact", "theme", "clear", "secret", "sudo hire-me"];

function codeForPage(page: PageKey) {
  if (page === "about") return [
    `# ${site.name}`,
    "",
    `> ${about.taglines[0]}`,
    "",
    `role: ${site.roleLine}`,
    `location: ${contact.location}`,
    `focus: ${developerMood.currentFocus}`,
    `setup: ${developerMood.setup.editor} · ${developerMood.setup.shell}`,
    "",
    "## About",
    about.lead,
  ].join("\n");
  if (page === "skills") return `export const skills = ${JSON.stringify(skills.categories.map((category) => ({ category: category.name, skills: category.items.map(([name]) => name) })), null, 2)} as const;`;
  if (page === "projects") return `export const projects = ${JSON.stringify(projects.map(({ title, summary, tags, status, live, github }) => ({ title, summary, tags, status, ...(live ? { live } : {}), ...(github ? { github } : {}) })), null, 2)} as const;`;
  if (page === "certifications") return certifications.map((item) => `- title: "${item.title}"\n  issuer: "${item.issuer}"\n  type: "${item.type}"${item.date ? `\n  date: "${item.date}"` : ""}`).join("\n\n");
  if (page === "experience") return JSON.stringify({ experience, education, achievements }, null, 2);
  if (page === "contact") return ["#!/usr/bin/env bash", `# ${site.name} · ${site.roleLine}`, `email="${contact.email}"`, `location="${contact.location}"`, "", "# Open the contact form in Preview", `open "mailto:${contact.email}"`].join("\n");
  return moodPreviews
    .filter((mood) => enabledMoodIds.includes(mood.id))
    .map((mood) => `- ${mood.name}: available`)
    .join("\n");
}

function highlightLine(line: string) {
  const parts = line.split(/(\/\/.*|#.*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b(?:export|const|return|function|if|let|import|from|true|false|null|as)\b)/g).filter(Boolean);
  return parts.map((part, index) => {
    const className = part.startsWith("//") || part.startsWith("#") ? "code-comment" : /^['"]/.test(part) ? "code-string" : /^(export|const|return|function|if|let|import|from|true|false|null|as)$/.test(part) ? "code-keyword" : "";
    return <span className={className || undefined} key={`${index}-${part}`}>{part}</span>;
  });
}

function CodeView({ text, file }: { text: string; file: string }) {
  return <div className="dev-code-view" aria-label={`${file} source preview`}><div className="dev-code-title"><span className="code-file-icon">{file.endsWith(".md") ? "MD" : file.endsWith(".ts") ? "TS" : file.endsWith(".tsx") ? "TSX" : file.endsWith(".json") ? "{}" : file.endsWith(".yml") ? "YML" : "SH"}</span><span>{file}</span><small>CONTENT VIEW</small></div><pre><code>{text.split("\n").map((line, index) => <span className="dev-code-line" key={index}><span className="dev-line-no">{index + 1}</span><span className="dev-line-text">{highlightLine(line) || " "}</span></span>)}</code></pre></div>;
}

function AnimatedConstellation({ placement }: { placement: "top" | "bottom" }) {
  return <div className={`dev-constellation dev-constellation-${placement}`} aria-hidden="true"><svg viewBox="0 0 240 240">
    <g className="dev-constellation-cage">
      <path className="dev-constellation-shell" d="M120 20 190 59 207 145 120 218 33 165 45 66Z M120 20 120 111 190 59 M120 111 207 145 M120 111 120 218 M120 111 33 165 M120 111 45 66 M45 66 120 111 190 59 M33 165 120 111 207 145"/>
      <path className="dev-constellation-crosslinks" d="M45 66 207 145M33 165 190 59M120 20 33 165M120 218 190 59"/>
    </g>
    <g className="dev-constellation-orbit dev-constellation-orbit-a"><ellipse cx="120" cy="120" rx="103" ry="38" transform="rotate(-29 120 120)"/></g>
    <g className="dev-constellation-orbit dev-constellation-orbit-b"><ellipse cx="120" cy="120" rx="94" ry="31" transform="rotate(42 120 120)"/></g>
    <g className="dev-constellation-orbit dev-constellation-orbit-c"><ellipse cx="120" cy="120" rx="60" ry="105" transform="rotate(70 120 120)"/></g>
    <path className="dev-constellation-scan" d="M25 121H215"/>
    <circle className="dev-constellation-core-halo" cx="120" cy="120" r="18"/>
    <circle className="dev-constellation-core" cx="120" cy="120" r="5"/>
    <circle className="dev-constellation-node node-one" cx="45" cy="66" r="3"/>
    <circle className="dev-constellation-node node-two" cx="190" cy="59" r="3"/>
    <circle className="dev-constellation-node node-three" cx="207" cy="145" r="3"/>
    <circle className="dev-constellation-node node-four" cx="33" cy="165" r="3"/>
  </svg></div>;
}

function DeveloperBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastDraw = 0;
    let width = 0;
    let height = 0;
    let drops: number[] = [];
    let nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const glyphs = "01ABCDEF<>/{}[]$#";
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const columns = Math.ceil(width / 26);
      drops = Array.from({ length: columns }, () => Math.random() * height / 18);
      nodes = Array.from({ length: Math.min(32, Math.ceil(width * height / 52000)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }));
      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(2, 5, 3, .5)";
      context.fillRect(0, 0, width, height);
    };
    const draw = (now: number) => {
      if (document.hidden || reducedMotion.matches) { frame = 0; return; }
      if (now - lastDraw < 55) { frame = window.requestAnimationFrame(draw); return; }
      lastDraw = now;
      context.fillStyle = "rgba(2, 5, 3, .1)";
      context.fillRect(0, 0, width, height);
      context.font = "11px monospace";
      for (let index = 0; index < drops.length; index += 1) {
        const x = index * 26;
        const y = (drops[index] * 18) % (height + 30);
        context.fillStyle = index % 5 === 0 ? "rgba(57,255,20,.36)" : "rgba(0,255,136,.2)";
        context.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], x, y);
        drops[index] += index % 3 === 0 ? 0.7 : 0.42;
        if (y > height && Math.random() > 0.985) drops[index] = 0;
      }
      context.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        for (let j = i + 1; j < nodes.length; j += 1) {
          const other = nodes[j];
          const distance = Math.hypot(node.x - other.x, node.y - other.y);
          if (distance < 115) {
            context.strokeStyle = `rgba(0, 217, 197, ${0.11 * (1 - distance / 115)})`;
            context.beginPath(); context.moveTo(node.x, node.y); context.lineTo(other.x, other.y); context.stroke();
          }
        }
        context.fillStyle = "rgba(57,255,20,.58)";
        context.beginPath(); context.arc(node.x, node.y, 1.3, 0, Math.PI * 2); context.fill();
      }
      frame = window.requestAnimationFrame(draw);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const onVisibility = () => {
      window.cancelAnimationFrame(frame);
      if (!document.hidden && !reducedMotion.matches) frame = window.requestAnimationFrame(draw);
    };
    const onMotion = () => {
      window.cancelAnimationFrame(frame);
      resize();
      if (!document.hidden && !reducedMotion.matches) frame = window.requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", onMotion);
    if (!document.hidden && !reducedMotion.matches) frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", onMotion);
    };
  }, []);
  return <><canvas className="dev-backdrop-canvas" ref={canvasRef} aria-hidden="true"/><AnimatedConstellation placement="top"/><AnimatedConstellation placement="bottom"/></>;
}

function BootOverlay({ onFinish }: { onFinish: () => void }) {
  const [closing, setClosing] = useState(false);
  const finishing = useRef(false);
  const finish = useCallback(() => {
    if (finishing.current) return;
    finishing.current = true;
    setClosing(true);
    window.setTimeout(onFinish, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 120 : 280);
  }, [onFinish]);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(finish, reduced ? 600 : 1700);
    const escape = (event: globalThis.KeyboardEvent) => { if (event.key === "Escape") finish(); };
    window.addEventListener("keydown", escape);
    return () => { window.clearTimeout(timeout); window.removeEventListener("keydown", escape); };
  }, [finish]);
  return <button className={`dev-boot-overlay ${closing ? "boot-finishing" : ""}`} type="button" onClick={finish} aria-label="Skip Developer mood boot sequence"><span className="boot-brand">HARSHAL.YADAV</span><span className="boot-line">&gt; loading mood: developer</span><span className="boot-line">&gt; mounting portfolio files</span><span className="boot-line">&gt; opening interactive console</span><strong>PRESS ANY KEY · ESC TO SKIP</strong></button>;
}

function SideExplorer({ page, activity, onPageFeature }: { page: PageKey; activity: Activity; onPageFeature: (feature: string) => void }) {
  const [query, setQuery] = useState("");
  const visiblePages = navItems.filter((item) => `${item.label} ${pageFiles[item.key]}`.toLowerCase().includes(query.toLowerCase()));
  if (activity === "source") return <aside className="dev-explorer"><div className="dev-explorer-label">SOURCE CONTROL</div><p className="dev-side-note">Git Learning Log · portfolio story</p><button className="dev-tree-item" onClick={() => onPageFeature("git-log")} type="button"><span className="dev-git-mark">⑂</span>learning-log.md</button><div className="dev-branch-chip">LEARNING LOG · NOT REPOSITORY COMMITS</div></aside>;
  if (activity === "run") return <aside className="dev-explorer"><div className="dev-explorer-label">RUN & DEBUG</div><button className="dev-run-card" onClick={() => onPageFeature("find-bug")} type="button"><span>01 · INTERACTIVE</span><strong>Find the Bug</strong><small>Inspect a snippet and select the faulty line.</small></button><button className="dev-run-card" onClick={() => onPageFeature("debug-flow")} type="button"><span>02 · FIELD NOTES</span><strong>How I Debug</strong><small>Five steps from reproduction to verification.</small></button></aside>;
  if (activity === "search") return <aside className="dev-explorer"><div className="dev-explorer-label">SEARCH FILES</div><label className="dev-search-box"><span>⌕</span><input aria-label="Search portfolio files" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search files..."/></label><div className="dev-file-list">{visiblePages.map((item) => <Link key={item.key} className={page === item.key ? "selected" : ""} href={item.href}><span className="file-kind">{pageFiles[item.key].split(".").pop()?.toUpperCase()}</span><span>{pageFiles[item.key]}</span></Link>)}</div></aside>;
  return <aside className="dev-explorer"><div className="dev-explorer-heading"><span className="dev-explorer-label">EXPLORER</span><span>•••</span></div><div className="dev-folder-name">⌄ &nbsp;HARSHAL_PORTFOLIO</div><div className="dev-file-list">{navItems.map((item) => <Link key={item.key} className={page === item.key ? "selected" : ""} href={item.href} title={item.label}><span className={`file-kind kind-${item.key}`}>{fileKind(item.key)}</span><span>{pageFiles[item.key]}</span></Link>)}</div><div className="dev-explorer-label dev-console-label">DEV CONSOLE</div><button className="dev-tree-item" type="button" onClick={() => onPageFeature("find-bug")}><span className="file-kind kind-ts">TS</span>find-the-bug.ts</button><button className="dev-tree-item" type="button" onClick={() => onPageFeature("debug-flow")}><span className="file-kind kind-md">MD</span>how-i-debug.md</button><div className="dev-explorer-bottom"><span className="dev-small-dot"/>All portfolio sections stay available</div></aside>;
}

function BugReport({ bug }: { bug: (typeof developerMood.bugs)[number] }) {
  return <article className="dev-report"><span className="dev-view-eyebrow">INCIDENT REPORT · {bug.id.toUpperCase()}</span><h2>{bug.title}</h2><div className="dev-report-meta"><span>{bug.project}</span><span>{bug.timeToFix}</span><span className={`severity severity-${bug.severity}`}>{bug.severity.toUpperCase()}</span></div>{developerMood.draftsNeedReview && <p className="dev-draft-note">Draft case note · verify details before publishing</p>}<section><h3>Symptom</h3><p>{bug.symptom}</p></section><section><h3>Root cause</h3><p>{bug.rootCause}</p></section><section><h3>Fix</h3><p>{bug.fix}</p></section><section><h3>Lesson</h3><p>{bug.lesson}</p></section></article>;
}

function FindTheBug() {
  const [index, setIndex] = useState(0);
  const [chosenLine, setChosenLine] = useState<number | null>(null);
  const [hint, setHint] = useState(false);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const puzzle = developerMood.findTheBug[index];
  const solved = chosenLine === puzzle.bugLine;
  const lines = puzzle.code.split("\n");
  function changePuzzle(next: number) { setIndex((next + developerMood.findTheBug.length) % developerMood.findTheBug.length); setChosenLine(null); setHint(false); }
  return <section className="dev-feature-view"><div className="dev-view-head"><span className="dev-view-eyebrow">RUN & DEBUG · INTERACTIVE CHALLENGE</span><h2>Find the bug<span>_</span></h2><p>Read the snippet and select the line you think is causing the problem.</p></div><div className="dev-puzzle-bar"><span>{puzzle.language.toUpperCase()} · {puzzle.id}</span><strong>bugs squashed {solvedIds.length} / {developerMood.findTheBug.length}</strong></div><div className="dev-puzzle-title">{puzzle.title}</div><div className="dev-puzzle-code">{lines.map((line, i) => { const lineNo = i + 1; const isWrong = chosenLine === lineNo && !solved; const isCorrect = chosenLine === lineNo && solved; return <button type="button" key={`${puzzle.id}-${lineNo}`} onClick={() => { setChosenLine(lineNo); if (lineNo === puzzle.bugLine) setSolvedIds((current) => current.includes(puzzle.id) ? current : [...current, puzzle.id]); }} className={`dev-puzzle-line ${isWrong ? "line-wrong" : ""} ${isCorrect ? "line-correct" : ""}`} aria-label={`Select line ${lineNo}${isWrong ? ", incorrect" : isCorrect ? ", correct" : ""}`}><span>{String(lineNo).padStart(2, "0")}</span><code>{line || " "}</code>{isCorrect && <b>✓</b>}{isWrong && <b>×</b>}</button>; })}</div><div className="dev-puzzle-actions"><button className="dev-text-button" type="button" onClick={() => setHint((value) => !value)}>{hint ? "Hide hint" : "Need a hint?"}</button><button className="dev-button" type="button" onClick={() => changePuzzle(index + 1)}>Next snippet <span>→</span></button></div>{hint && <p className="dev-feedback feedback-hint">Hint: {puzzle.hint}</p>}{chosenLine !== null && <p className={`dev-feedback ${solved ? "feedback-correct" : "feedback-wrong"}`} role="status">{solved ? `Correct. ${puzzle.explanation}` : "Not that line. Trace what the code is doing, then try again."}</p>}<div className="dev-puzzle-dots" aria-label="Puzzle selection">{developerMood.findTheBug.map((item, i) => <button key={item.id} type="button" onClick={() => changePuzzle(i)} aria-label={`Open snippet ${i + 1}`} aria-current={i === index ? "step" : undefined}>{String(i + 1).padStart(2, "0")}</button>)}</div></section>;
}

function DebugFlow() {
  const [step, setStep] = useState(0);
  const current = developerMood.debugFlow[step];
  return <section className="dev-feature-view"><div className="dev-view-head"><span className="dev-view-eyebrow">FIELD NOTES · DEBUGGING PROCESS</span><h2>How I Debug<span>_</span></h2><p>A real example from the CORS issue in Cloud Fun Facts Generator.</p></div><div className="dev-stepper" role="tablist" aria-label="Debugging steps">{developerMood.debugFlow.map((item, i) => <button type="button" role="tab" aria-selected={i === step} className={i === step ? "active" : ""} onClick={() => setStep(i)} key={item.step}><span>{String(i + 1).padStart(2, "0")}</span><small>{item.step}</small></button>)}</div><article className="dev-step-card" role="tabpanel"><span>STEP {String(step + 1).padStart(2, "0")} / 05</span><h3>{current.step}</h3><p>{current.text}</p></article><div className="dev-step-actions"><button className="dev-button dev-button-muted" type="button" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>← Previous</button><button className="dev-button" type="button" onClick={() => setStep(Math.min(developerMood.debugFlow.length - 1, step + 1))} disabled={step === developerMood.debugFlow.length - 1}>Next step →</button></div>{developerMood.draftsNeedReview && <p className="dev-draft-note">Debugging notes are draft content pending your review.</p>}</section>;
}

function LearningLog() {
  const [open, setOpen] = useState<string | null>(null);
  return <section className="dev-feature-view"><div className="dev-view-head"><span className="dev-view-eyebrow">SOURCE CONTROL · LEARNING LOG</span><h2>Small commits, big lessons<span>_</span></h2><p>A timeline of skills and milestones, styled like a log. These are not repository commits.</p></div><div className="dev-learning-list">{developerMood.gitLog.map((item, i) => <button className="dev-learning-item" type="button" key={item.hash} aria-expanded={open === item.hash} onClick={() => setOpen(open === item.hash ? null : item.hash)}><span className="dev-learning-index">{item.hash}</span><span className="dev-learning-copy"><strong>{item.message}</strong><small>{item.date}</small>{open === item.hash && <em>{item.detail}</em>}</span><span className="dev-learning-arrow">{open === item.hash ? "−" : "+"}</span></button>)}</div></section>;
}

function TerminalPanel({ onDefault, onPanel }: { onDefault: () => void; onPanel: (panel: PanelTab) => void }) {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [records, setRecords] = useState<{ command: string; output: string[] }[]>([{ command: "", output: ["Developer console ready. Try `help` or choose a command below."] }]);
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => inputRef.current?.focus();
  function outputFor(raw: string) {
    const [command, ...rest] = raw.trim().split(/\s+/);
    const argument = rest.join(" ");
    if (command === "help") return ["Available commands:", ...terminalCommands.map((item) => `  ${item}`), "Tip: type `theme default` to return to the original portfolio."];
    if (command === "whoami") return [site.name, site.roleLine, developerMood.currentFocus, `Setup: ${developerMood.setup.editor} · ${developerMood.setup.shell}`];
    if (command === "skills") return skills.categories.map((category) => `${category.name}: ${category.items.map(([name]) => name).slice(0, 5).join(", ")}`);
    if (command === "projects") return projects.map((project) => `${project.title} · ${project.status}`);
    if (command === "certs") return certifications.map((item) => `${item.title} · ${item.issuer}`);
    if (command === "experience") return experience.map((item) => `${item.period} · ${item.title} — ${item.organization}`);
    if (command === "bugs") { onPanel("problems"); return developerMood.bugs.map((bug) => `${bug.id} · ${bug.title}`); }
    if (command === "debug") { onPanel("problems"); return developerMood.debugFlow.map((item, i) => `${i + 1}. ${item.step}: ${item.text}`); }
    if (command === "contact") return [`${contact.email}`, `${contact.location}`, "Use the Contact page to open a prefilled message."];
    if (command === "secret") return [developerMood.secretFact];
    if (command === "sudo" && argument === "hire-me") return [developerMood.hireMeLine];
    if (command === "theme") {
      if (argument === "default") { onDefault(); return ["Returning to Default mood…"]; }
      if (argument === "developer") return ["Developer mood is already active."];
      return ["Only `default` and `developer` are available right now."];
    }
    if (command === "clear") { setRecords([]); return []; }
    if (raw.trim()) return [`command not found: ${raw.trim()} — try 'help'`];
    return [];
  }
  function submit(raw = value) {
    const command = raw.trim();
    if (!command) return;
    const output = outputFor(command);
    if (command !== "clear") setRecords((current) => [...current, { command, output }].slice(-30));
    setHistory((current) => [...current, command].slice(-30));
    setHistoryIndex(-1);
    setValue("");
  }
  function handleKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") { event.preventDefault(); submit(); }
    if (event.key === "ArrowUp") { event.preventDefault(); setHistoryIndex((index) => { const next = Math.min(history.length - 1, index + 1); setValue(history[history.length - 1 - next] ?? ""); return next; }); }
    if (event.key === "ArrowDown") { event.preventDefault(); setHistoryIndex((index) => { const next = Math.max(-1, index - 1); setValue(next < 0 ? "" : history[history.length - 1 - next] ?? ""); return next; }); }
    if (event.key === "Tab") { event.preventDefault(); const candidate = terminalCommands.find((item) => item.startsWith(value.trim())); if (candidate) setValue(candidate); }
  }
  return <div className="dev-terminal-panel" onClick={focusInput}><div className="dev-terminal-output" aria-live="polite">{records.map((record, i) => <div className="dev-terminal-record" key={`${record.command}-${i}`}><div className="dev-terminal-prompt"><strong>user@portfolio</strong><span>~</span><b>%</b> {record.command}</div>{record.output.map((line, lineIndex) => <div className="dev-terminal-line" key={`${i}-${lineIndex}`}>{line}</div>)}</div>)}</div><div className="dev-terminal-chips">{["help", "whoami", "projects", "bugs", "secret", "sudo hire-me"].map((command) => <button type="button" onClick={(event) => { event.stopPropagation(); submit(command); }} key={command}>{command}</button>)}</div><label className="dev-terminal-input-row"><span>user@portfolio <i>~</i> <b>%</b></span><input ref={inputRef} value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={handleKeyDown} aria-label="Enter a terminal command" autoComplete="off" spellCheck={false}/><button type="button" onClick={(event) => { event.stopPropagation(); submit(); }} aria-label="Run command">↵</button></label></div>;
}

function BottomPanel({ onOpenBug }: { onOpenBug: (bug: (typeof developerMood.bugs)[number]) => void }) {
  const [tab, setTab] = useState<PanelTab>("terminal");
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const showProblems = () => { setTab("problems"); setOpen(true); };
    window.addEventListener("developer-open-problems", showProblems);
    return () => window.removeEventListener("developer-open-problems", showProblems);
  }, []);
  return <section className={`dev-bottom-panel ${open ? "panel-open" : "panel-closed"}`} aria-label="Developer tools panel"><div className="dev-bottom-tabs">{(["problems", "output", "terminal", "ports"] as PanelTab[]).map((item) => <button key={item} type="button" className={tab === item ? "active" : ""} onClick={() => { if (tab === item && open) setOpen(false); else { setTab(item); setOpen(true); } }}>{item.toUpperCase()}{item === "problems" && <i>{developerMood.bugs.length}</i>}</button>)}<button className="dev-panel-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Collapse tools panel" : "Expand tools panel"}>{open ? "⌄" : "⌃"}</button></div>{open && <div className="dev-bottom-content">{tab === "terminal" && <TerminalPanel onDefault={() => window.dispatchEvent(new CustomEvent("developer-mood-default"))} onPanel={(next) => { setTab(next); setOpen(true); }} />}{tab === "problems" && <><p className="dev-problems-draft">Draft incident notes · confirm details before publishing</p><div className="dev-problems-list">{developerMood.bugs.map((bug) => <button type="button" onClick={() => onOpenBug(bug)} key={bug.id}><span className={`severity-dot severity-${bug.severity}`}>{bug.severity === "error" ? "×" : "!"}</span><strong>{bug.title}</strong><small>{bug.project} · {bug.file}</small><span>→</span></button>)}</div></>}{tab === "output" && <div className="dev-empty-panel"><strong>Build log is waiting for real entries.</strong><p>Once the site is deployed, add verified steps to <code>developerMood.buildLog</code>.</p>{developerMood.buildLog.map((line) => <div key={`${line.timestamp}-${line.message}`}>{line.timestamp} · {line.message}</div>)}</div>}{tab === "ports" && <div className="dev-empty-panel"><strong>No forwarded ports</strong><p>This portfolio is a static site. There is no live server port to show here.</p></div>}</div>}</section>;
}

function PreviewFooter() {
  return <footer className="dev-preview-footer"><span>{site.footerCredit}</span><span>Built with curiosity · Pune, India</span></footer>;
}

export default function DeveloperWorkspace({ page, children, onDefault, onPalette }: { page: PageKey; children: ReactNode; onDefault: () => void; onPalette: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [activity, setActivity] = useState<Activity>("explorer");
  const [specialView, setSpecialView] = useState<string | null>(null);
  const [activeBug, setActiveBug] = useState<(typeof developerMood.bugs)[number] | null>(null);
  const [codeView, setCodeView] = useState(false);
  const [boot, setBoot] = useState(false);
  const [mobileExplorer, setMobileExplorer] = useState(false);
  const codeText = useMemo(() => codeForPage(page), [page]);
  const file = pageFiles[page];
  const closeBoot = useCallback(() => setBoot(false), []);
  const specialCode = useMemo(() => activeBug
    ? `# ${activeBug.title}\n\nproject: ${activeBug.project}\nfile: ${activeBug.file}\n\n## Symptom\n${activeBug.symptom}\n\n## Root cause\n${activeBug.rootCause}\n\n## Fix\n${activeBug.fix}\n\n## Lesson\n${activeBug.lesson}`
    : specialView === "find-bug"
      ? developerMood.findTheBug[0].code
      : specialView === "debug-flow"
        ? developerMood.debugFlow.map((item, index) => `## ${index + 1}. ${item.step}\n${item.text}`).join("\n\n")
        : specialView === "git-log"
          ? developerMood.gitLog.map((item) => `- ${item.date} · ${item.message}\n  ${item.detail}`).join("\n")
          : "", [activeBug, specialView]);

  useEffect(() => {
    const wasBooted = sessionStorage.getItem("portfolio-developer-booted");
    if (!wasBooted) { setBoot(true); sessionStorage.setItem("portfolio-developer-booted", "1"); }
    const preference = sessionStorage.getItem("portfolio-developer-code-view");
    setCodeView(preference ? preference === "code" : window.matchMedia("(min-width: 1101px)").matches);
  }, []);
  useEffect(() => { setSpecialView(null); setActiveBug(null); setMobileExplorer(false); }, [pathname]);
  useEffect(() => {
    const defaultEvent = () => onDefault();
    window.addEventListener("developer-mood-default", defaultEvent);
    return () => window.removeEventListener("developer-mood-default", defaultEvent);
  }, [onDefault]);
  const chooseView = (view: string) => { setSpecialView(view); setActiveBug(null); setActivity(view === "git-log" ? "source" : view === "find-bug" || view === "debug-flow" ? "run" : activity); };
  const selectBug = (bug: (typeof developerMood.bugs)[number]) => { setActiveBug(bug); setSpecialView(null); };
  const pageLabel = navItems.find((item) => item.key === page)?.label ?? "About";
  const specialFile = activeBug ? `${activeBug.id}.log` : specialView === "find-bug" ? "find-the-bug.ts" : specialView === "debug-flow" ? "how-i-debug.md" : specialView === "git-log" ? "learning-log.md" : "";
  const toggleCodeView = () => setCodeView((value) => { const next = !value; sessionStorage.setItem("portfolio-developer-code-view", next ? "code" : "preview"); return next; });

  return <>
    <DeveloperBackdrop/>
    <main className="site-wrap developer-site-wrap">
    {boot && <BootOverlay onFinish={closeBoot}/>}
    <header className="dev-titlebar"><div className="dev-window-controls" aria-hidden="true"><i/><i/><i/></div><div className="dev-window-title"><strong>{site.name.toLowerCase().replaceAll(" ", "-")}</strong><span>/ portfolio — {specialFile || file}</span></div><div className="dev-title-actions"><button type="button" onClick={onPalette} aria-label="Search portfolio"><kbd>⌘ K</kbd></button><span className="dev-mood-status"><i/>PHOSPHOR</span><button type="button" className="dev-default-button" onClick={onDefault}>↩ Default</button></div></header>
    <div className="dev-toolbar-mobile"><button type="button" onClick={() => setMobileExplorer((value) => !value)}>☰ Explorer</button><span>{specialFile || file}</span><button type="button" onClick={toggleCodeView}>{codeView ? "Preview" : "Code"}</button></div>
    <div className={`dev-ide-layout ${mobileExplorer ? "explorer-open" : ""}`}>
      <nav className="dev-activity-bar" aria-label="IDE tools">{(["explorer", "search", "source", "run", "moods"] as Activity[]).map((item) => <button type="button" key={item} className={activity === item ? "active" : ""} onClick={() => { setActivity(item); if (item === "source") chooseView("git-log"); else if (item === "run") chooseView("find-bug"); else if (item === "moods") router.push("/moods/"); else if (item === "explorer" || item === "search") { setSpecialView(null); setActiveBug(null); if (item === "search") setMobileExplorer(true); } }} aria-label={item === "source" ? "Source control learning log" : item === "run" ? "Run and debug" : item === "moods" ? "Open moods" : item}><span>{item === "explorer" ? "▣" : item === "search" ? "⌕" : item === "source" ? "⑂" : item === "run" ? "▷" : "✦"}</span><small>{item.toUpperCase()}</small></button>)}</nav>
      <div className="dev-explorer-wrap"><SideExplorer page={page} activity={activity} onPageFeature={chooseView}/></div>
      <section className="dev-editor surface" aria-label="Developer portfolio workspace">
        <div className="dev-editor-tabs"><Link className={!specialFile ? "active" : ""} href={navItems.find((item) => item.key === page)?.href ?? "/"}><span className={`file-kind kind-${page}`}>{fileKind(page)}</span>{file}<i>×</i></Link>{specialFile && <button type="button" className="active" onClick={() => { setSpecialView(null); setActiveBug(null); }}><span className="file-kind kind-md">{activeBug ? "LOG" : specialView === "find-bug" ? "TS" : "MD"}</span>{specialFile}<i>×</i></button>}<span className="dev-editor-tab-spacer"/><button className={`dev-view-toggle ${codeView ? "selected" : ""}`} type="button" onClick={toggleCodeView}><span>{codeView ? "{ }" : "◉"}</span>{codeView ? "Code" : "Preview"}</button></div>
        <div className="dev-breadcrumb"><span>portfolio</span><b>›</b><span>{specialFile || file}</span><span className="dev-breadcrumb-page">{activeBug ? "Incident report" : specialView === "find-bug" ? "Run & Debug" : specialView === "debug-flow" ? "Field notes" : specialView === "git-log" ? "Source Control" : pageLabel}</span></div>
        <div className="dev-editor-scroll" key={`${page}-${specialFile || "page"}`}>
          {specialFile && codeView ? <CodeView text={specialCode} file={specialFile}/> : activeBug ? <BugReport bug={activeBug}/> : specialView === "find-bug" ? <FindTheBug/> : specialView === "debug-flow" ? <DebugFlow/> : specialView === "git-log" ? <LearningLog/> : codeView ? <CodeView text={codeText} file={file}/> : <div className="dev-preview-content">{page === "about" && developerMood.draftsNeedReview && <p className="dev-draft-note">Developer setup and incident notes are draft content from the planning document; review before publishing.</p>}{children}<PreviewFooter/></div>}
        </div>
        <BottomPanel onOpenBug={selectBug}/>
        <footer className="dev-statusbar"><span><i/>STATIC PORTFOLIO</span><span>UTF-8</span><button type="button" onClick={() => { setActivity("explorer"); setSpecialView(null); setActiveBug(null); window.dispatchEvent(new CustomEvent("developer-open-problems")); }}>PROBLEMS · {developerMood.bugs.length}</button><span className="dev-status-mood">Developer mood</span></footer>
      </section>
    </div>
    {mobileExplorer && <button className="dev-explorer-scrim" type="button" aria-label="Close explorer" onClick={() => setMobileExplorer(false)}/>}
    </main>
  </>;
}
