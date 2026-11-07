import Link from "next/link";
import { moodPreviews } from "@/content/moods";
import { Icon } from "../common";

export default function MoodComingSoon({ slug }: { slug: string }) {
  const mood = moodPreviews.find((item) => item.id === slug);
  return <main className="coming-soon"><span className="eyebrow"><span className="eyebrow-dot"/>MOOD ENGINE · PHASE 1</span><span className="coming-mark">{mood?.mark ?? "✦"}</span><h1>{mood?.name ?? "Mood"} is coming soon<span className="title-period">.</span></h1><p>This mood will have its own look, story and interaction in a later phase.</p><Link href="/moods/" className="button button-primary">Back to all moods <Icon name="arrow" size={15}/></Link><Link href="/" className="back-default">Return to the default portfolio</Link></main>;
}
