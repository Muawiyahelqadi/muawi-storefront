"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FeaturesSection } from "@/src/sanity/types/sections.types";
import { hasCta } from "@/src/utilities/utilities";
import AnimatedSection from "@/src/components/ui/animatedSection";
import InteractiveButton from "@/src/components/ui/interactiveButton";
import { Icon } from "@iconify/react";
import {
  extractPhoneNumber,
  formatPhoneNumber,
} from "@/src/utilities/phone-number";
import useTranslate, { isRtlOnClient } from "@/src/i18n/useTranslate";
import WhatsappIcon from "@/src/components/icons/whatsapp";
import { Phone, Mail } from "lucide-react";
import { useLocale } from "use-intl";

const Features = (props: FeaturesSection) => {
  const translate = useTranslate();
  const locale = useLocale();
  const isRtl = isRtlOnClient(locale);

  return (
    <section className="px-4 -mt-[70px] relative z-10">
      <div className="container mx-auto max-w-7xl">
        <AnimatedSection
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: {
              transition: {
                delayChildren: 0.8,
              },
            },
          }}
          className="flex flex-col lg:flex-row gap-5"
        >
          {props.items.map((feature) => (
            <AnimatedSection
              key={feature._key}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-1"
            >
              <Card className="h-full rounded-2xl shadow-[0px_0px_30px_0px_rgba(0,42,106,0.1)] border-0 hover:shadow-[0px_0px_40px_0px_rgba(0,42,106,0.15)] transition-shadow bg-white/65 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="mb-4">
                    <div className="inline-flex p-2.5 bg-blue-50 rounded-xl border border-transparent hover:scale-105 transition-transform duration-500 cursor-pointer">
                      <Icon
                        icon={feature.icon}
                        className="w-12 h-12 text-[#3364db]"
                      />
                    </div>
                  </div>
                  {feature.subtitle && (
                    <span className="text-sm font-medium text-muted-foreground">
                      {feature.subtitle}
                    </span>
                  )}
                  <h4 className="mt-2 mb-3">{feature.title}</h4>
                  {feature.description && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                  )}
                  {hasCta(feature.cta) && (
                    <InteractiveButton
                      className="mt-4"
                      withArrow={true}
                      href={feature.cta!.url}
                    >
                      {feature.cta!.text}
                    </InteractiveButton>
                  )}
                  {feature.contactLinks && feature.contactLinks.length > 0 && (
                    <div className="flex flex-col gap-4 mb-6">
                      {feature.contactLinks.map((item) => {
                        const { _type, _key } = item;

                        console.log(item);
                        if (_type === "emails" && !item.email) {
                          return null;
                        }
                        if (_type === "whatsappLink" && !item.url) {
                          return null;
                        }
                        if (_type === "phoneNumber" && !item.number) {
                          return null;
                        }

                        const urlMap = {
                          whatsappLink: item.url,
                          phoneNumber: `tel:${extractPhoneNumber(item.number)}`,
                          emails: `mailto:${item.email}`,
                        };

                        const displayTextMap = {
                          whatsappLink: translate("chat_on_whatsApp"),
                          phoneNumber: formatPhoneNumber(item.number),
                          emails: item.email,
                        };

                        const iconMap = {
                          whatsappLink: (
                            <WhatsappIcon className="w-5 h-5 text-muted-foreground" />
                          ),
                          phoneNumber: (
                            <Phone className="w-5 h-5 text-muted-foreground rtl:rotate-270" />
                          ),
                          emails: (
                            <Mail className="w-5 h-5 text-muted-foreground" />
                          ),
                        };

                        const url = urlMap[_type];
                        const displayText = displayTextMap[_type];
                        const icon = iconMap[_type];

                        // Only whatsapp text respects RTL; phone/email are always LTR
                        const textDir =
                          isRtl && _type === "whatsappLink" ? "rtl" : "ltr";

                        return (
                          <div className="flex items-center gap-3" key={_key}>
                            {icon}
                            <a href={url}>
                              <p
                                className="text-muted-foreground hover:text-primary mb-0 text-right"
                                dir="rtl"
                              >
                                <span dir={textDir}>{displayText}</span>
                              </p>
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Features;
