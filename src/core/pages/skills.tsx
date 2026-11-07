"use client";

import { useState } from "react";
import Image from "next/image";
import { skills } from "@/content/skills";
import { Icon, PageIntro, SectionTitle } from "../common";

export default function SkillsPage() {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<string | null>(null);
  const filters = ["All", "AWS", "Google Cloud", "Languages", "Frameworks & Tools", "Fundamentals"];
  const categoryFilter = (name: string) => name.startsWith("AWS") ? "AWS" : name === "Google Cloud" ? "Google Cloud" : name === "Languages" ? "Languages" : name === "CS Fundamentals" ? "Fundamentals" : "Frameworks & Tools";
  const visible = skills.categories.filter((category) => filter === "All" || categoryFilter(category.name) === filter);

  return (
    <>
      <PageIntro eyebrow="CAPABILITIES" title="Skills" subtitle="Tools I’ve used, systems I’ve explored, and the places where I’m still learning." />
      <div className="filter-row" aria-label="Filter skill categories">
        {filters.map((item) => (
          <button type="button" key={item} className={"filter-pill" + (filter === item ? " active" : "")} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="skills-groups">
        {visible.map((category, ci) => (
          <section className="skill-category" key={category.name}>
            <SectionTitle eyebrow={String(ci + 1).padStart(2, "0")} title={category.name}>
              <span className="category-count">{String(category.items.length).padStart(2, "0")} skills</span>
            </SectionTitle>
            <div className="skill-grid">
              {category.items.map(([name, note, logos = [], fallback], i) => {
                const key = category.name + "-" + name;
                const monogram = fallback ?? name.split(/[ ·+\/&]/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
                const logoClass = "skill-logo" + (logos.length > 1 ? " skill-logo-multi" : "");
                return (
                  <button
                    className={"skill-card" + (open === key ? " skill-open" : "")}
                    type="button"
                    key={key}
                    onClick={() => setOpen(open === key ? null : key)}
                    aria-expanded={open === key}
                  >
                    <span className={logoClass}>
                      {logos.length
                        ? logos.map((logo) => (
                            <Image
                              className="skill-logo-img"
                              key={logo}
                              src={"/skill-logos/" + logo + ".svg"}
                              alt=""
                              aria-hidden="true"
                              width={logos.length > 1 ? 13 : 24}
                              height={logos.length > 1 ? 13 : 24}
                              unoptimized
                            />
                          ))
                        : monogram}
                    </span>
                    <span className="skill-name">{name}</span>
                    <span className="skill-note">{open === key ? note : "Tap to see where I used it"}</span>
                    <span className="skill-index">{String(i + 1).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <section className="learning-panel">
        <div>
          <span className="eyebrow"><Icon name="spark" size={13} /> IN PROGRESS</span>
          <h2>Currently learning</h2>
          <p>The next set of systems I’m working through.</p>
        </div>
        <div className="learning-tags">
          {skills.learning.map((item) => <span className="learning-chip" key={item}><i />{item}</span>)}
        </div>
      </section>
    </>
  );
}
