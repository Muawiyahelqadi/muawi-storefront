import React from "react";
import Image from "next/image";

const About = () => {
  const paragraphs = [
    "Dr. Emily Sanchez is a highly skilled and compassionate physician with over 15 years of experience in internal medicine. She obtained her medical degree from Harvard Medical School, where she graduated with honors, showcasing her dedication to academic excellence.",
    "Dr. Sanchez completed her residency training at Massachusetts General Hospital, one of the nation's top-ranked hospitals, where she honed her clinical expertise and developed a deep understanding of complex medical conditions.",
    "Known for her warm bedside manner and empathetic approach, Dr. Sanchez takes the time to listen to her patients' concerns and collaborates with them to develop personalized treatment plans. She believes in the importance of holistic care, addressing not only the physical aspects of illness but also the emotional and psychological well-being of her patients.",
    "In her spare time, Dr. Sanchez enjoys hiking in the great outdoors and spending quality time with her family. She brings a genuine passion for healing and a deep sense of compassion to her practice, earning the trust and admiration of her patients and colleagues alike.",
  ];

  return (
    <section className="py-16 px-4" id="about">
      <div className="container mx-auto max-w-7xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col justify-center h-full">
            <h2 className="text-4xl font-bold mb-4">About Dr. Emily</h2>
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-muted-foreground my-2 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex justify-center lg:justify-end">
            <Image
              src="/images/about/profile-1.jpg"
              alt="Dr. Emily Sanchez"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
              width={200}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
