export const scrollToSection = (section?: string) => {
  if (!section || section === "#hero") {
    // Scroll to top if no section
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  // Remove leading "#" if present
  const id = section.startsWith("#") ? section.slice(1) : section;

  const element = document.getElementById(id);
  if (element) {
    const offset = 50; // Adjust this value for more/less offset
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  } else {
    console.warn(`No element found with id: ${id}`);
  }
};
