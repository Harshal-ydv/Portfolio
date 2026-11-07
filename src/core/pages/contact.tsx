"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/content/moods";
import { site } from "@/content/site";
import { Icon, PageIntro } from "../common";

export default function ContactPage() {
  const [notice, setNotice] = useState(""); const [copied, setCopied] = useState(false);
  async function copyEmail() { try { await navigator.clipboard.writeText(contact.email); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { setNotice(`Email: ${contact.email}`); } }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; if (!form.reportValidity()) return;
    const values = new FormData(form); const name = String(values.get("name") ?? ""); const email = String(values.get("email") ?? ""); const message = String(values.get("message") ?? "");
    if (String(values.get("website") ?? "").trim()) return;
    const subject = encodeURIComponent(`Portfolio message from ${name}`); const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setNotice("Your email app should open with the message ready. If it doesn’t, copy the email address on the left.");
  }
  return <><PageIntro eyebrow="LET’S TALK" title="Contact" subtitle={contact.intro}/><div className="contact-grid"><aside className="contact-info"><span className="micro-label">FIND ME HERE</span><div className="contact-info-block"><span className="contact-label">EMAIL</span><button className="contact-email" type="button" onClick={copyEmail}>{contact.email}<Icon name="copy" size={15}/></button>{copied && <small className="copy-feedback">Copied to clipboard</small>}</div><div className="contact-info-block"><span className="contact-label">BASED IN</span><strong><Icon name="pin" size={15}/>{contact.location}</strong></div><div className="contact-info-block"><span className="contact-label">ELSEWHERE</span><div className="contact-socials">{site.socials.map((social) => <a href={social.url} key={social.label} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}>{social.short}</a>)}</div></div><div className="availability-note"><i/>Open to cloud and DevOps internships</div></aside><form className="contact-form" onSubmit={submit}><div className="form-heading"><span className="micro-label">SEND A NOTE</span><span>Usually replies in a day or two</span></div><div className="form-row"><label>Your name<input name="name" autoComplete="name" required minLength={2} placeholder="Name"/></label><label>Email address<input type="email" name="email" autoComplete="email" required placeholder="you@example.com"/></label></div><label>Message<textarea name="message" required minLength={12} rows={5} placeholder="A little about what you’d like to discuss…"/></label><label className="honeypot" aria-hidden="true">Leave this empty<input name="website" tabIndex={-1} autoComplete="off"/></label><button className="button button-primary" type="submit"><Icon name="arrow" size={16}/> Open email app</button><p className="form-hint">This opens your email app with a prefilled message; it does not send anything automatically.</p>{notice && <p className="form-notice" role="status">{notice}</p>}</form></div></>;
}
