"use client";

import { useState } from "react";
import { achievements, education, experience } from "@/content/experience";
import { Icon, PageIntro, TagList } from "../common";

export default function ExperiencePage() {
  const [tab, setTab] = useState("Experience");
  return <><PageIntro eyebrow="THE PATH SO FAR" title="Experience" subtitle="Community work, education and milestones that have shaped how I build."/><div className="segmented experience-tabs" role="tablist" aria-label="Experience sections">{["Experience", "Education", "Achievements"].map((item) => <button type="button" role="tab" aria-selected={tab === item} className={tab === item ? "selected" : ""} key={item} onClick={() => setTab(item)}>{item}</button>)}</div>
    {tab === "Experience" && <div className="experience-list">{experience.map((entry) => <article className="experience-entry" key={entry.title}><div className="experience-date"><span>{entry.period}</span><small>{entry.location}</small></div><div className="experience-detail"><span className="entry-index">EXPERIENCE</span><h2>{entry.title}</h2><strong className="organization">{entry.organization}</strong><ul>{entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><TagList items={entry.tags}/></div></article>)}</div>}
    {tab === "Education" && <div className="education-card"><div className="education-mark">RS</div><div><span className="entry-index">{education[0].period} · FORMAL EDUCATION</span><h2>{education[0].degree}</h2><strong className="organization">{education[0].institution}</strong><p>{education[0].score}</p><p>{education[0].notes}</p><TagList items={["Information Technology", "Cloud Computing", "Networking"]}/></div></div>}
    {tab === "Achievements" && <div className="achievement-list">{achievements.map((item, i) => <article className={`achievement-row ${item.highlight ? "highlight" : ""}`} key={item.title}><span className="achievement-number">{String(i + 1).padStart(2, "0")}</span><span className="achievement-date">{item.date}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div><Icon name="arrow" size={16}/></article>)}</div>}
  </>;
}
