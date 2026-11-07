import Link from "next/link";
export default function NotFound() { return <main className="not-found"><span className="eyebrow">404 · ROUTE NOT FOUND</span><h1>This page got lost in the network<span className="title-period">.</span></h1><p>The link may be old, or the page hasn’t been added yet.</p><Link href="/" className="button button-primary">Back to About <span>→</span></Link></main>; }
