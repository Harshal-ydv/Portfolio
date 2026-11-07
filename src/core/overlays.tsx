"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { enabledMoodIds, moodPreviews } from "@/content/moods";
import { site } from "@/content/site";
import { Icon } from "./common";
import { navItems } from "./nav";

export function CommandPalette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState(""); const [active, setActive] = useState(0);
  const commands = useMemo(() => [
    ...navItems.map((item) => ({ label: item.label, href: item.href, icon: item.icon, hint: "Open page" })),
    ...moodPreviews.filter((mood) => enabledMoodIds.includes(mood.id)).map((mood) => ({ label: `Switch to ${mood.name} mood`, href: `/moods/${mood.id}/`, icon: "spark", hint: "Change mood" })),
    { label: "Copy email address", action: "copy-email", icon: "copy", hint: site.email },
    ...site.socials.map((social) => ({ label: `Open ${social.label}`, href: social.url, icon: "external", hint: "External link" })),
  ], []);
  const filtered = commands.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  useEffect(() => { const focus = window.setTimeout(() => document.getElementById("command-search")?.focus(), 30); return () => window.clearTimeout(focus); }, []);
  useEffect(() => { function key(event: KeyboardEvent) { if (event.key === "Escape") onClose(); if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => (value + 1) % Math.max(filtered.length, 1)); } if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => (value - 1 + filtered.length) % Math.max(filtered.length, 1)); } if (event.key === "Enter" && filtered[active]) activate(filtered[active]); if (event.key === "Tab") { const nodes = Array.from(document.querySelectorAll<HTMLElement>(".command-dialog input, .command-dialog a, .command-dialog button")); if (!nodes.length) return; const first = nodes[0], last = nodes[nodes.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } } } window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, [onClose, filtered, active]);
  function activate(item: { href?: string; action?: string }) { if (item.action === "copy-email") { void navigator.clipboard.writeText(site.email).catch(() => undefined); onClose(); return; } if (item.href?.startsWith("/")) window.location.href = item.href; else if (item.href) window.open(item.href, "_blank", "noopener,noreferrer"); onClose(); }
  return <div className="overlay palette-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="dialog command-dialog" role="dialog" aria-modal="true" aria-label="Search portfolio"><div className="command-search"><Icon name="search"/><input id="command-search" placeholder="Where would you like to go?" value={query} onChange={(event) => { setQuery(event.target.value); setActive(0); }}/><kbd>ESC</kbd></div><div className="command-group"><span className="micro-label">PAGES & QUICK ACTIONS</span>{filtered.map((item, index) => <button type="button" key={item.label} className={`command-item ${active === index ? "command-active" : ""}`} onMouseEnter={() => setActive(index)} onClick={() => activate(item)}><Icon name={item.icon}/><span>{item.label}</span><small>{item.hint}</small><kbd>↵</kbd></button>)}{!filtered.length && <p className="empty-search">No pages match “{query}”.</p>}</div><div className="command-footer"><span>Navigate with ↑ ↓ and Enter</span><span><kbd>⌘</kbd> + <kbd>K</kbd> to open</span></div></section></div>;
}

export function MenuDrawer({ onClose }: { onClose: () => void }) {
  return <div className="overlay drawer-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="dialog menu-drawer" role="dialog" aria-modal="true" aria-label="All pages"><div className="drawer-heading"><div><span className="micro-label">PORTFOLIO MENU</span><h2>Where to?</h2></div><button className="close-button" type="button" onClick={onClose} aria-label="Close menu"><Icon name="close"/></button></div>{navItems.map((item) => <Link key={item.href} href={item.href} onClick={onClose} className="drawer-link"><Icon name={item.icon}/><span>{item.label}</span><Icon name="arrow" size={15}/></Link>)}<button className="drawer-search" type="button" onClick={() => { onClose(); window.dispatchEvent(new CustomEvent("open-command-palette")); }}><Icon name="search"/>Search this portfolio <kbd>⌘ K</kbd></button></section></div>;
}
