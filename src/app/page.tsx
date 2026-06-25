import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import { PromptExplorer } from "@/components/PromptExplorer";
import { fetchPrompts } from "@/lib/sheets";

export const revalidate = 60;

export default async function Home() {
  const rows = await fetchPrompts();

  return (
    <>
      <HeroSection />
      <PromptExplorer initialRows={rows} />
      <Footer />
    </>
  );
}
