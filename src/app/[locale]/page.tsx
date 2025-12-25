import { fetchHomePageByType } from "@/src/sanity/queries/home";
import { SectionRenderer } from "@/src/components/sections/section-renderer";

const Home = async () => {
  const data = await fetchHomePageByType();
  console.log({ data });
  return (
    <main className="pt-18">
      {data.sections.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
    </main>
  );
};

export default Home;
