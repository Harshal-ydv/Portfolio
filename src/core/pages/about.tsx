"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { about } from "@/content/about";
import { site } from "@/content/site";
import { Icon, MoodHint, SectionTitle } from "../common";

function StatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) return;
    const target = Number(match[1]); const suffix = match[2]; const decimals = match[1].split(".")[1]?.length ?? 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") return;
    let frame = 0;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect(); const start = performance.now(); setDisplay(`${(0).toFixed(decimals)}${suffix}`);
      const tick = (now: number) => { const progress = Math.min((now - start) / 720, 1); const eased = 1 - Math.pow(1 - progress, 3); setDisplay(`${(target * eased).toFixed(decimals)}${suffix}`); if (progress < 1) frame = requestAnimationFrame(tick); };
      frame = requestAnimationFrame(tick);
    }, { threshold: .35 });
    observer.observe(element); return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <span ref={ref} className="stat-number" aria-label={value}>{display}</span>;
}

export default function AboutPage() {
  const [tab, setTab] = useState("Stats"); const [taglineIndex, setTaglineIndex] = useState(0);
  useEffect(() => { const id = window.setInterval(() => setTaglineIndex((value) => (value + 1) % about.taglines.length), 4300); return () => window.clearInterval(id); }, []);
  return <>
    <div className="page-intro about-intro"><div><span className="eyebrow"><span className="eyebrow-dot"/>CLOUD · CODE · COMMUNITY</span><h1>About Me<span className="title-period">.</span></h1><div className="title-underline"/><p className="intro-deck">The person behind the projects: an IT student building a path into cloud engineering, one thoughtful deploy at a time.</p></div><div className="intro-mark"><span>HY</span><small>BUILD<br/>IN PUBLIC</small></div></div>
    <section className="hero-grid" aria-label="Profile">
      <div className="hero-copy"><div className="hero-greeting"><span className="tiny-orbit">✳</span> Hey, I’m Harshal.</div><h2>Curious mind.<br/><span>Cloud-first builder.</span></h2><p className="typed-line"><span className="typed-prefix">Currently:</span> {about.taglines[taglineIndex]}</p><div className="hero-actions"><Link className="button button-primary" href="/projects/">Explore my projects <Icon name="arrow" size={16}/></Link><Link className="button button-ghost" href="/contact/">Let’s connect <Icon name="arrow" size={15}/></Link></div><div className="hero-badge"><Icon name="spark" size={15}/>{site.specialBadge}</div></div>
      <aside className="facts-card"><div className="facts-heading"><span className="micro-label">A QUICK SNAPSHOT</span><span className="live-mark"><i/>OPEN TO LEARN</span></div>{about.facts.map((fact, i) => <div className="fact-row" key={fact.label}><span className="fact-index">{String(i + 1).padStart(2, "0")}</span><span className="fact-name">{fact.label}</span><strong>{fact.value}</strong></div>)}</aside>
    </section>
    <MoodHint/>
    <section className="story-intro"><div className="section-kicker"><span className="section-index">01</span><span>MY STORY</span></div><div><h2>Where ideas meet <span>infrastructure.</span></h2><p>{about.lead}</p></div></section>
    <section className="about-tabs-section">
      <div className="segmented" role="tablist" aria-label="About me sections">{["Stats", "Focus", "My Story"].map((item) => <button type="button" key={item} onClick={() => setTab(item)} className={tab === item ? "selected" : ""} role="tab" aria-selected={tab === item}>{item}</button>)}</div>
      {tab === "Stats" && <div className="stat-grid" role="tabpanel">{about.stats.map((stat, i) => <div className="stat-card" key={stat.label}><StatCounter value={stat.value}/><span className="stat-label">{stat.label}</span><span className="stat-index">0{i + 1}</span></div>)}</div>}
      {tab === "Focus" && <div className="focus-list" role="tabpanel">{about.focus.map((item, i) => <div className="focus-row" key={item}><span>{String(i + 1).padStart(2, "0")}</span><strong>{item}</strong><Icon name="arrow" size={17}/></div>)}</div>}
      {tab === "My Story" && <div className="timeline" role="tabpanel">{about.story.map((entry) => <article className="timeline-entry" key={entry.title}><span className="timeline-date">{entry.period}</span><div><h3>{entry.title}</h3><p>{entry.text}</p></div></article>)}</div>}
    </section>
    {tab !== "My Story" && <section className="interest-section"><SectionTitle eyebrow="02" title="What I’m drawn to"/><div className="interest-grid">{about.interests.map((interest, i) => <article className="interest-card" key={interest.title}><div className="interest-top"><span className="interest-number">0{i + 1}</span><span className="interest-symbol"><Icon name={interest.icon === "cloud" ? "cloud" : interest.icon === "people" ? "person" : interest.icon === "flow" ? "timeline" : "spark"}/></span></div><span className="interest-tag">{interest.tag}</span><h3>{interest.title}</h3><p>{interest.description}</p></article>)}</div></section>}
    <section className="community-section"><SectionTitle eyebrow="03" title="People & communities"/><div className="community-list">{about.communities.map((community, i) => <div className="community-row" key={community.name}><span className="community-monogram">{i === 0 ? "AWS" : i === 1 ? "GD" : "BC"}</span><span><strong>{community.name}</strong><small>{community.role}</small></span><Icon name="arrow" size={16}/></div>)}</div></section>
  </>;
}
