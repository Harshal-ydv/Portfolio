import { notFound } from "next/navigation";
import MoodComingSoon from "@/core/pages/mood-coming-soon";
import { enabledMoodIds, moodPreviews } from "@/content/moods";
import AboutPage from "@/core/pages/about";
import { PortfolioShell } from "@/core/shell";

export function generateStaticParams() {
  return moodPreviews
    .filter(({ id }) => enabledMoodIds.includes(id))
    .map(({ id }) => ({ slug: id }));
}
export const dynamicParams = false;

export default async function MoodRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!enabledMoodIds.includes(slug)) notFound();
  if (slug === "developer") return <PortfolioShell page="about"><AboutPage/></PortfolioShell>;
  return <MoodComingSoon slug={slug}/>;
}
