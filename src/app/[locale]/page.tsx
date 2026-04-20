import { fetchHomePageByType } from "@/src/sanity/queries/home";
import { SectionRenderer } from "@/src/components/sections/section-renderer";

const Home = async () => {
  const data = await fetchHomePageByType();

  return (
    <main className="overflow-hidden">
      {data.sections?.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
    </main>
  );
};

export default Home;
