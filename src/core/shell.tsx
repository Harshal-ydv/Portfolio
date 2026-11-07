"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { site } from "@/content/site";
import { Icon } from "./common";
import { navItems, type PageKey } from "./nav";
export { navItems } from "./nav";
export type { PageKey } from "./nav";
const CommandPalette = dynamic(() => import("./overlays").then((module) => module.CommandPalette));
const MenuDrawer = dynamic(() => import("./overlays").then((module) => module.MenuDrawer));
const DeveloperWorkspace = dynamic(() => import("@/moods/developer/workspace"));

function PortfolioHeader({ onPalette }: { onPalette: () => void }) {
  const [copied, setCopied] = useState(false);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(site.email); setCopied(true); window.setTimeout(() => setCopied(false), 1600); }
    catch { window.location.href = `mailto:${site.email}`; }
  }
  return <header className="profile-header surface">
    <Link href="/" className="identity" aria-label={`${site.name}, home`}>
      <span className="avatar"><span>HY</span><i aria-hidden="true"/></span>
      <span className="identity-copy"><strong>{site.name}</strong><span>{site.roleLine}</span></span>
    </Link>
    <div className="availability"><span className="micro-label">CURRENTLY</span><span className="availability-line"><i/>Building on AWS</span><small>{site.availability}</small></div>
    <div className="header-actions">
      <div className="header-buttons">
        <a className="button button-soft" href={site.cvFile} download><Icon name="code" size={15}/>Download CV</a>
        <Link className="icon-button mood-chip" href="/moods/" aria-label="Explore portfolio moods"><Icon name="spark" size={17}/><span>Default mood</span></Link>
      </div>
      <div className="header-meta"><button type="button" className="email-link" onClick={copyEmail}><Icon name="mail" size={14}/>{copied ? "Email copied" : site.email}</button><span className="social-links">{site.socials.slice(0, 2).map((social) => <a key={social.label} href={social.url} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}>{social.short}</a>)}</span><button className="icon-button search-trigger" type="button" onClick={onPalette} aria-label="Open site search"><Icon name="search" size={17}/><span>⌘ K</span></button></div>
    </div>
  </header>;
}

function SideNav({ page, onPalette, onMenu }: { page: PageKey; onPalette: () => void; onMenu: () => void }) {
  return <>
    <nav className="side-nav surface" aria-label="Main navigation">
      <div className="nav-caption">Explore</div>
      {navItems.map((item, index) => <Link className={`nav-link ${page === item.key ? "active" : ""}`} href={item.href} key={item.key} aria-current={page === item.key ? "page" : undefined}>
        <Icon name={item.icon}/><span>{item.label}</span><small>{String(index + 1).padStart(2, "0")}</small>
      </Link>)}
      <div className="nav-bottom"><div className="nav-status"><span className="status-orb"/>Portfolio · Default mood</div><button className="palette-nav" type="button" onClick={onPalette}><Icon name="search" size={16}/>Search pages <kbd>⌘ K</kbd></button></div>
    </nav>
    <nav className="mobile-dock surface" aria-label="Mobile navigation">
      {navItems.filter((item) => ["about", "skills", "projects", "moods"].includes(item.key)).map((item) => <Link key={item.key} className={page === item.key ? "current" : ""} href={item.href}><Icon name={item.icon} size={20}/><span>{item.label}</span></Link>)}
      <button type="button" onClick={onMenu}><Icon name="menu" size={20}/><span>Menu</span></button>
    </nav>
  </>;
}

function Footer() {
  return <footer className="site-footer"><span>{site.footerCredit}</span><span className="footer-note"><i/>Made with curiosity in Pune</span><Link href="/contact/">Say hello <Icon name="arrow" size={14}/></Link></footer>;
}

export function PortfolioShell({ page, children }: { page: PageKey; children: ReactNode }) {
  const pathname = usePathname(); const router = useRouter(); const [palette, setPalette] = useState(false); const [menu, setMenu] = useState(false); const [showTop, setShowTop] = useState(false);
  const [mood, setMood] = useState<"default" | "developer">(() => pathname.replace(/\/$/, "") === "/moods/developer" ? "developer" : typeof document !== "undefined" && document.documentElement.dataset.mood === "developer" ? "developer" : "default");
  useEffect(() => {
    const directMood = pathname.replace(/\/$/, "") === "/moods/developer";
    const storedMood = sessionStorage.getItem("portfolio-mood");
    const nextMood = directMood || storedMood === "developer" ? "developer" : "default";
    setMood(nextMood);
    document.documentElement.dataset.mood = nextMood;
    if (directMood) sessionStorage.setItem("portfolio-mood", "developer");
  }, [pathname]);
  function returnToDefault() {
    const root = document.documentElement;
    const directMood = pathname.replace(/\/$/, "") === "/moods/developer";
    const switchTheme = () => {
      sessionStorage.removeItem("portfolio-mood");
      root.dataset.mood = "default";
      setMood("default");
      if (directMood) router.replace("/");
    };
    if (root.dataset.moodTransition) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { switchTheme(); return; }
    root.dataset.moodTransition = "cover";
    window.setTimeout(() => {
      switchTheme();
      root.dataset.moodTransition = "reveal";
      window.setTimeout(() => { delete root.dataset.moodTransition; }, 320);
    }, 220);
  }
  useEffect(() => { const key = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setPalette(true); } if (event.key === "Escape") { setPalette(false); setMenu(false); } }; const custom = () => setPalette(true); window.addEventListener("keydown", key); window.addEventListener("open-command-palette", custom); return () => { window.removeEventListener("keydown", key); window.removeEventListener("open-command-palette", custom); }; }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [pathname]);
  useEffect(() => { const onScroll = () => setShowTop(window.scrollY > 420); window.addEventListener("scroll", onScroll, { passive: true }); onScroll(); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <>
    {mood === "developer" ? <DeveloperWorkspace page={page} onDefault={returnToDefault} onPalette={() => setPalette(true)}>{children}</DeveloperWorkspace> : <main className="site-wrap"><div className="network-art network-top" aria-hidden="true"/><div className="network-art network-bottom" aria-hidden="true"/><PortfolioHeader onPalette={() => setPalette(true)}/><div className="workspace"><SideNav page={page} onPalette={() => setPalette(true)} onMenu={() => setMenu(true)}/><section className="content-panel surface" aria-label={`${navItems.find((item) => item.key === page)?.label} page`}><div className="content-body">{children}</div><Footer/></section></div>{showTop && <button className="floating-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>}</main>}
    {palette && <CommandPalette onClose={() => setPalette(false)} />}{menu && <MenuDrawer onClose={() => setMenu(false)} />}
  </>;
}
