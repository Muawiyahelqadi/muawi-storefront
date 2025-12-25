import React from "react";
import { Button } from "@/src/components/ui/button";
import { fetchFooterByType } from "@/src/sanity/queries/footer";
import { DynamicIcon } from "lucide-react/dynamic";

const Footer = async () => {
  const footer = await fetchFooterByType();
  return (
    <footer className="pt-4 pb-2.5 bg-[#f8f9fa] border-t border-[#e5e5e5] relative mt-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-center md:text-left">
            {footer.copyright && (
              <div className="text-sm text-[#6a6a6a]">
                {footer.copyright.replace(
                  "{year}",
                  new Date().getFullYear().toString(),
                )}
              </div>
            )}
          </div>

          <div className="text-center md:text-right">
            <ul className="flex items-center justify-center gap-4 m-0 p-0 list-none">
              {footer.socialMediaItems.map((social, index) => (
                <li key={`social-${social.url}-${index}`}>
                  <a
                    href={social.url}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <DynamicIcon name={social.iconName} className="w-5 h-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
