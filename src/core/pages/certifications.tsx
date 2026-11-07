"use client";

import Image from "next/image";
import { useState } from "react";
import { certifications } from "@/content/certifications";
import { Icon, PageIntro } from "../common";

export default function CertificationsPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Certification", "Badge", "Hackathon"];
  const items = certifications.filter((item) => filter === "All" || item.type === filter);

  return (
    <>
      <PageIntro
        eyebrow="LEARNING MILESTONES"
        title="Certifications"
        subtitle="Certificates, digital badges, and hackathon milestones from my learning journey."
      />
      <div className="filter-row" aria-label="Filter credentials">
        {filters.map((item) => (
          <button
            type="button"
            className={"filter-pill" + (filter === item ? " active" : "")}
            key={item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="credential-grid">
        {items.map((item) => (
          <article className="credential-card" key={item.title}>
            <div className="credential-art has-credential-image">
              <Image
                className="credential-photo"
                src={item.image}
                alt={item.title + " certificate or badge"}
                fill
                sizes="(max-width: 700px) 100vw, 45vw"
              />
            </div>
            <div className="credential-body">
              <div className="project-meta">
                <span className="project-category">{item.type}</span>
                {item.date && <span className="credential-date">{item.date}</span>}
              </div>
              <h2>{item.title}</h2>
              <span className="credential-issuer">{item.issuer}</span>
              {item.badges && (
                <div className="credential-highlights">
                  {item.badges.map((badge) => <span className="credential-highlight" key={badge}>{badge}</span>)}
                </div>
              )}
              <p>{item.description}</p>
              {item.credentialUrl && (
                <a className="text-link" href={item.credentialUrl} target="_blank" rel="noreferrer">
                  View Credly profile <Icon name="external" size={14} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="content-callout">
        <Icon name="spark" />
        <p>New certificates, badges, and build milestones will appear here as I earn them.</p>
      </div>
    </>
  );
}
