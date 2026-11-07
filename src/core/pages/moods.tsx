"use client";

import Link from "next/link";
import { enabledMoodIds, moodPreviews } from "@/content/moods";
import { Icon, PageIntro } from "../common";

const activeMoods = moodPreviews.filter((mood) => enabledMoodIds.includes(mood.id));

export default function MoodsPage() {
  return <>
    <PageIntro
      eyebrow="INTERACTIVE FEATURE"
      title="Developer Mode"
      subtitle="Step inside a VS Code-inspired view of my portfolio and explore how I learn, debug and build."
    />

    <div className="mood-intro-banner">
      <span className="mood-signal"><Icon name="spark" size={20}/></span>
      <div>
        <strong>A new perspective on the same portfolio.</strong>
        <p>Open the interactive terminal and type <code>help</code> to explore my skills, projects, debugging notes and a small secret.</p>
      </div>
      <span className="mood-ready">LIVE FEATURE</span>
    </div>

    <div className="mood-grid active-mood-grid">
      {activeMoods.map((mood) => (
        <article
          className="mood-card enabled-mood"
          key={mood.id}
          style={{ "--mood-a": mood.colors[0], "--mood-b": mood.colors[1], "--mood-c": mood.colors[2] } as React.CSSProperties}
        >
          <div className="mood-preview">
            <span className="mood-mark">{mood.mark}</span>
            <div className="mood-swatch-row" aria-label="Developer mode colors">
              {mood.colors.map((color) => <i key={color} style={{ background: color }}/>) }
            </div>
            <span className="mood-coming">AVAILABLE</span>
          </div>
          <div className="mood-card-body">
            <span className="section-index">CREATIVE FEATURE · 01</span>
            <h2>{mood.name} Workspace</h2>
            <p>{mood.tagline} Explore the pages, run terminal commands, inspect debugging stories and find the hidden fact.</p>
            <Link href={`/moods/${mood.id}/`} className="button button-primary">
              Enter Developer Mode <Icon name="arrow" size={15}/>
            </Link>
          </div>
        </article>
      ))}
    </div>

    <p className="mood-hub-footnote"><Icon name="sun" size={16}/> Switch back to the default portfolio any time with the mood control in the workspace bar.</p>
  </>;
}
