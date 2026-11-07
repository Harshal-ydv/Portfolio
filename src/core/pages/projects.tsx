"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { projects, type Project } from "@/content/projects";
import { Icon, PageIntro, TagList } from "../common";

function ProjectCard({ project, onSelect }: { project: Project; onSelect: (project: Project) => void }) {
  const label = project.featured ? "FEATURED BUILD" : project.category.toUpperCase();

  return (
    <article className={"project-card" + (project.featured ? " featured-project" : "")}>
      <button
        className="project-art"
        type="button"
        onClick={() => onSelect(project)}
        aria-label={"View details for " + project.title}
      >
        {project.image ? (
          <>
            <Image
              className="project-photo"
              src={project.image}
              alt={project.title + " project screenshot"}
              fill
              sizes={project.featured ? "(max-width: 900px) 100vw, 42vw" : "(max-width: 900px) 100vw, 32vw"}
            />
            <span className="project-photo-shade" aria-hidden="true" />
          </>
        ) : (
          <>
            <span className="art-grid" />
            <span className="art-orbit orbit-one" />
            <span className="art-orbit orbit-two" />
            <span className="art-core">
              <Icon name={project.category === "AI" ? "spark" : project.category === "Academic" ? "layers" : "cloud"} size={34} />
            </span>
            <span className="art-service service-a">{project.tags[0]}</span>
            <span className="art-service service-b">{project.tags[1]}</span>
            <span className="art-service service-c">{project.tags[2]}</span>
          </>
        )}
        <span className="project-art-index">{label}</span>
      </button>
      <div className="project-body">
        <div className="project-meta">
          <span className="project-category">{project.category}</span>
          <span className={"project-status " + project.status.toLowerCase().replaceAll(" ", "-")}><i />{project.status}</span>
        </div>
        <button className="project-title-button" type="button" onClick={() => onSelect(project)}>
          <h3>{project.title}</h3>
        </button>
        <p>{project.summary}</p>
        <TagList items={project.tags.slice(0, 4)} />
        <div className="project-links">
          <button type="button" className="text-link" onClick={() => onSelect(project)}>
            View project <Icon name="arrow" size={14} />
          </button>
          {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="text-link quiet-link">Live demo <Icon name="external" size={13} /></a>}
          {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="text-link quiet-link">GitHub <Icon name="external" size={13} /></a>}
        </div>
      </div>
    </article>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [onClose]);

  return (
    <div className="overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="dialog project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title">
        <button className="close-button" type="button" onClick={onClose} aria-label="Close project details"><Icon name="close" /></button>
        <span className="eyebrow">{project.category.toUpperCase()} · {project.status.toUpperCase()}</span>
        <h2 id="project-dialog-title">{project.title}</h2>
        <p className="dialog-summary">{project.summary}</p>
        <div className="detail-block"><h3>The problem</h3><p>{project.problem}</p></div>
        <div className="detail-block"><h3>What I built</h3><p>{project.solution}</p></div>
        <div className="detail-block"><h3>My role</h3><p>{project.role}</p></div>
        <div className="detail-block"><h3>What I learned</h3><p>{project.learned}</p></div>
        <div className="detail-block"><h3>Built with</h3><TagList items={project.techStack} /></div>
        <div className="dialog-links">
          {project.github && <a href={project.github} className="button button-primary" target="_blank" rel="noreferrer">GitHub repository <Icon name="external" size={15} /></a>}
          {project.live && <a href={project.live} className="button button-ghost" target="_blank" rel="noreferrer">Live project <Icon name="external" size={15} /></a>}
        </div>
      </section>
    </div>
  );
}

export default function ProjectsPage() {
  const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = projects.filter((project) => filter === "All" || project.category === filter);

  return (
    <>
      <PageIntro eyebrow="SELECTED WORK" title="Projects" subtitle="A collection of things I’ve built to learn how cloud systems work in the real world." />
      <div className="project-filter-row">
        {categories.map((item) => (
          <button
            type="button"
            className={"filter-pill" + (filter === item ? " active" : "")}
            onClick={() => setFilter(item)}
            key={item}
          >
            {item}<span>{item === "All" ? projects.length : projects.filter((project) => project.category === item).length}</span>
          </button>
        ))}
      </div>
      <div className="project-grid">
        {visible.map((project) => <ProjectCard key={project.slug} project={project} onSelect={setSelected} />)}
      </div>
      <p className="project-note">Select any project preview to explore the build story, my role, and what I learned.</p>
      {selected && <ProjectDialog project={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
