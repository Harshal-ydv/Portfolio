"use client";

import type { ReactNode } from "react";
import Link from "next/link";

export function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    person: <><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.5-3.5 2.8-5.5 7-5.5s6.5 2 7 5.5"/></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
    badge: <><path d="M12 3 14.3 5l3-.2.7 2.9 2.5 1.7-1.1 2.8 1.1 2.8-2.5 1.7-.7 2.9-3-.2L12 21l-2.3-2-3 .2-.7-2.9-2.5-1.7 1.1-2.8-1.1-2.8L6 7.3l.7-2.9 3 .2L12 3Z"/><path d="m9 12 2 2 4-4"/></>,
    timeline: <><circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 6h8a2 2 0 0 1 2 2v8M16 18H8a2 2 0 0 1-2-2V8"/></>,
    spark: <><path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3Z"/><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4 4"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    cloud: <><path d="M6.5 18a4.5 4.5 0 1 1 .8-8.9A6 6 0 0 1 19 11a3.5 3.5 0 0 1-.5 7H6.5Z"/><path d="m10 15 2-3 2 3"/></>,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></>,
    external: <><path d="M14 4h6v6m-1-5-9 9"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
    pin: <><path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.2"/></>,
    code: <><path d="m8 8-4 4 4 4m8-8 4 4-4 4m-2-10-4 12"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">{paths[name] ?? paths.spark}</svg>;
}

export function SectionTitle({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return <div className="section-title"><div>{eyebrow && <span className="section-index">{eyebrow}</span>}<h2>{title}</h2></div>{children}</div>;
}

export function TagList({ items }: { items: string[] }) {
  return <div className="tag-list">{items.map((item) => <span className="tag" key={item}>{item}</span>)}</div>;
}

export function PageIntro({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return <div className="page-intro"><div><span className="eyebrow"><span className="eyebrow-dot"/>{eyebrow}</span><h1>{title}<span className="title-period">.</span></h1><div className="title-underline"/><p className="intro-deck">{subtitle}</p></div><span className="intro-serial">HY<span> / </span>{new Date().getFullYear()}</span></div>;
}

export function MoodHint() {
  return <Link href="/moods/" className="mood-hint" id="mood-hint">
    <span className="hint-icon"><Icon name="spark" size={19}/></span><span className="hint-copy"><strong>Try the Developer mood <span aria-hidden="true">↗</span></strong><small>Open the interactive terminal and type help to explore my work.</small></span><span className="hint-cta">EXPLORE</span>
  </Link>;
}
