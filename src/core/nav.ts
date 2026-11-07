export type PageKey = "about" | "skills" | "projects" | "certifications" | "experience" | "moods" | "contact";
export const navItems: { key: PageKey; label: string; href: string; icon: string }[] = [
  { key: "about", label: "About", href: "/", icon: "person" },
  { key: "skills", label: "Skills", href: "/skills/", icon: "grid" },
  { key: "projects", label: "Projects", href: "/projects/", icon: "layers" },
  { key: "certifications", label: "Certifications", href: "/certifications/", icon: "badge" },
  { key: "experience", label: "Experience", href: "/experience/", icon: "timeline" },
  { key: "moods", label: "Moods", href: "/moods/", icon: "spark" },
  { key: "contact", label: "Contact", href: "/contact/", icon: "mail" },
];
